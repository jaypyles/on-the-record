from on_the_record.database import CartDB
from sqlalchemy.orm import Session


class CartHelper:
    @staticmethod
    def merge_carts(db: Session, session_id: str, user_id: str):
        guest_cart = db.query(CartDB).filter(CartDB.session_id == session_id).first()
        user_cart = db.query(CartDB).filter(CartDB.user_id == user_id).first()

        if not user_cart:
            user_cart = CartDB(user_id=user_id, items=[])
            db.add(user_cart)

        if guest_cart:
            for guest_item in guest_cart.items:
                existing = next(
                    (i for i in user_cart.items if i["id"] == guest_item["id"]), None
                )
                if existing:
                    existing["quantity"] += guest_item["quantity"]
                else:
                    user_cart.items.append(guest_item)

            db.delete(guest_cart)

        db.commit()

        return user_cart
