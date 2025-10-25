from typing import Optional

import asyncpg
from fastapi import APIRouter, Depends, Header, Query
from on_the_record.auth.auth import AuthHelper
from on_the_record.database import BandItemDB, get_db, get_pg_pool
from on_the_record.models.artist import BandItem
from sqlalchemy.orm import Session

router = APIRouter(prefix="/artists", tags=["artists"])


def artist_factory(item: BandItemDB):
    return {
        "id": item.id,
        "band": item.band,
        "title": item.title,
        "item_type": item.item_type,
        "image_url": item.image_url,
        "genre": item.genre,
        "format": item.format,
        "price": item.price,
    }


@router.get("", response_model=dict)
def get_artists(
    db: Session = Depends(get_db),
    page: int = Query(1, ge=1),
    size: int = Query(20, ge=1, le=100),
    artist: Optional[str] = Query(None),
    type: Optional[str] = Query(None),
    price: Optional[str] = Query(None),
):
    """
    Search artists with optional name filter and pagination.
    """
    query = db.query(BandItemDB)

    if artist:
        query = query.filter(BandItemDB.band.ilike(f"%{artist}%"))

    if type and type.lower() != "all":
        query = query.filter(BandItemDB.item_type == type.lower())

    if price:
        try:
            _min, _max = price.split("-")
            _min = float(_min)
            _max = float(_max)
            query = query.filter(BandItemDB.price.between(_min, _max))
        except ValueError:
            pass

    total = query.count()

    offset = (page - 1) * size
    items = query.offset(offset).limit(size).all()

    return {
        "items": [artist_factory(item) for item in items],
        "total": total,
    }


@router.get("/recently-viewed", response_model=dict)
async def recently_viewed(
    db: Session = Depends(get_db),
    warehouse: asyncpg.pool.Pool = Depends(get_pg_pool),
    authorization: str = Header(None),
):
    auth = AuthHelper(db)
    user = auth.get_user_from_jwt(authorization)

    if not user:
        query = db.query(BandItemDB).limit(6)
        return {"user": user, "items": [artist_factory(item) for item in query.all()]}

    async with warehouse.acquire() as conn:
        rows = await conn.fetch(
            'SELECT _id FROM "on_the_record".clicked_item '
            "WHERE user_id=$1 ORDER BY timestamp DESC LIMIT 6",
            user["id"],
        )
        item_ids = list(set([r["_id"] for r in rows]))  # dedupe items

    if not item_ids:
        query = db.query(BandItem).limit(6)
        return {"user": user, "items": [artist_factory(item) for item in query.all()]}

    items_query = db.query(BandItemDB).filter(BandItemDB.id.in_(item_ids))
    items = items_query.all()

    items_list = [
        {
            "id": item.id,
            "band": item.band,
            "title": item.title,
            "item_type": item.item_type,
            "image_url": item.image_url,
            "genre": item.genre,
            "format": item.format,
            "price": item.price,
        }
        for item in items
    ]

    return {"user": user, "items": items_list}
