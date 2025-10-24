from typing import List, Optional

from fastapi import APIRouter, Depends, Query
from on_the_record.database import BandItemDB, get_db
from sqlalchemy.orm import Session

router = APIRouter(prefix="/artists", tags=["artists"])


@router.get("", response_model=List[dict])
def get_artists(
    db: Session = Depends(get_db),
    page: int = Query(1, ge=1),
    size: int = Query(20, ge=1, le=100),
    artist: Optional[str] = Query(None),
):
    """
    Search artists with optional name filter and pagination.
    """
    query = db.query(BandItemDB)

    if artist:
        query = query.filter(BandItemDB.band.ilike(f"%{artist}%"))

    offset = (page - 1) * size
    items = query.offset(offset).limit(size).all()

    return [
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
