from typing import Optional
from uuid import uuid4

from fastapi import APIRouter, Depends, HTTPException, Request, Response
from on_the_record.auth.auth import AuthHelper
from on_the_record.database import BandItemDB, CartDB, OrderDB, get_db
from on_the_record.factories.database_factory import DatabaseFactory
from on_the_record.segment import Segment
from sqlalchemy.exc import IdentifierError
from sqlalchemy.orm import Session

from .models import CartOut, ItemOut

router = APIRouter(prefix="/cart", tags=["cart"])


def get_or_create_cart(
    db: Session, request: Request, response: Response, user: Optional[dict] = None
):
    if user:
        cart = db.query(CartDB).filter_by(user_id=user["id"]).first()

        if not cart:
            cart = CartDB(user_id=user["id"], items=[])
            db.add(cart)
            db.commit()

        return cart

    session_id = request.cookies.get("session_id")

    if not session_id:
        session_id = str(uuid4())
        response.set_cookie("session_id", session_id)

    cart = db.query(CartDB).filter_by(session_id=session_id).first()

    if not cart:
        cart = CartDB(session_id=session_id, items=[])
        db.add(cart)
        db.commit()

    return cart


@router.get("", response_model=CartOut)
def get_cart(
    request: Request,
    response: Response,
    db: Session = Depends(get_db),
    user: Optional[dict] = Depends(AuthHelper.get_optional_current_user),
):
    cart = get_or_create_cart(db, request, response, user)
    items_out = []

    for item_entry in cart.items:
        item_db = db.query(BandItemDB).filter_by(id=item_entry["id"]).first()

        if item_db:
            item_out = ItemOut.model_validate(item_db)
            item_out.quantity = item_entry["quantity"]
            items_out.append(item_out)

    return {
        "items": [
            {**DatabaseFactory.artist_factory(i), "quantity": i.quantity}
            for i in items_out
        ]
    }


@router.post("/add/{item_id}")
def add_to_cart(
    item_id: int,
    quantity: int = 1,
    request: Request = None,
    response: Response = None,
    db: Session = Depends(get_db),
    user: Optional[dict] = Depends(AuthHelper.get_optional_current_user),
):
    item = db.query(BandItemDB).filter_by(id=item_id).first()
    if not item:
        raise HTTPException(status_code=404, detail="Item not found")

    cart = get_or_create_cart(db, request, response, user)

    existing = next((i for i in cart.items if i["id"] == item_id), None)

    if existing:
        cart.items = [
            (
                {"id": i["id"], "quantity": i["quantity"] + quantity}
                if i["id"] == item_id
                else i
            )
            for i in cart.items
        ]
    else:
        cart.items.append({"id": item_id, "quantity": quantity})

    db.commit()

    db_item = DatabaseFactory.artist_factory(
        db.query(BandItemDB).filter(BandItemDB.id == item_id).one()
    )

    # TODO: anonymous tracking of events

    session_id = request.cookies.get("session_id")
    Segment.track_add_to_cart(user["id"] if user else None, db_item, session_id)

    return {"message": "Item added to cart", "cart": cart.items}


@router.post("/remove/{item_id}")
def remove_from_cart(
    item_id: int,
    request: Request,
    response: Response,
    db: Session = Depends(get_db),
    user: Optional[dict] = Depends(AuthHelper.get_optional_current_user),
):
    cart = get_or_create_cart(db, request, response, user)
    cart.items = [i for i in cart.items if i["id"] != item_id]
    db.commit()

    db_item = DatabaseFactory.artist_factory(
        db.query(BandItemDB).filter(BandItemDB.id == item_id).one()
    )

    session_id = request.cookies.get("session_id")
    Segment.track_remove_from_cart(user["id"] if user else None, db_item, session_id)

    return {"message": "Item removed from cart", "cart": cart.items}


@router.post("/clear")
def clear_cart(
    request: Request,
    response: Response,
    db: Session = Depends(get_db),
    user: Optional[dict] = Depends(AuthHelper.get_optional_current_user),
):
    cart = get_or_create_cart(db, request, response, user)
    items = cart.items
    cart.items = []
    db.commit()

    items_db = (
        DatabaseFactory.artist_factory(i)
        for i in db.query(BandItemDB)
        .filter(BandItemDB.id.in_([i["id"] for i in items]))
        .all()
    )

    session_id = request.cookies.get("session_id")

    for i in items_db:
        Segment.track_remove_from_cart(user["id"] if user else None, i, session_id)

    return {"message": "Cart cleared", "cart": items_db}


@router.post("/checkout")
def checkout_cart(
    request: Request,
    response: Response,
    db: Session = Depends(get_db),
    user: Optional[dict] = Depends(AuthHelper.get_optional_current_user),
):
    cart = get_or_create_cart(db, request, response, user)

    if not cart.items:
        raise HTTPException(status_code=400, detail="Cart is empty")

    items_db = (
        db.query(BandItemDB)
        .filter(BandItemDB.id.in_([i["id"] for i in cart.items]))
        .all()
    )
    total = sum(
        item.price * next((c["quantity"] for c in cart.items if c["id"] == item.id), 1)
        for item in items_db
    )

    cart.items = []

    session_id = request.cookies.get("session_id")

    order = OrderDB(
        user_id=user["id"] if user else None,
        session_id=session_id,
        items=cart.items,
        total=total,
    )

    db.add(order)
    db.commit()

    Segment.track_checkout(
        user["id"] if user else None,
        total,
        [DatabaseFactory.artist_factory(i) for i in items_db],
        session_id,
    )

    return {"message": "Checkout successful", "total": total}
