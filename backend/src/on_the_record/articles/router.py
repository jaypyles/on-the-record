from typing import List, Optional

from fastapi import APIRouter, Depends, Query
from on_the_record.database import ArticleDB, BandItemDB, get_db
from sqlalchemy.orm import Session

router = APIRouter(prefix="/articles", tags=["articles"])


@router.get("", response_model=List[dict])
def get_articles(
    db: Session = Depends(get_db),
    page: int = Query(1, ge=1),
    size: int = Query(20, ge=1, le=100),
    title: Optional[str] = Query(None),
    type: Optional[str] = Query(None),
):
    """
    Search artists with optional name filter and pagination.
    """
    query = db.query(ArticleDB)

    if title:
        query = query.filter(ArticleDB.title.ilike(f"%{title}%"))

    if type and type.lower() != "all":
        query = query.filter(ArticleDB.type == type.lower())

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
