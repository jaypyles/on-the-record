from typing import List, Optional

from fastapi import APIRouter, Depends, Query
from on_the_record.database import ArticleDB, get_db
from sqlalchemy.orm import Session

router = APIRouter(prefix="/articles", tags=["articles"])


@router.get("", response_model=dict)
def get_articles(
    db: Session = Depends(get_db),
    page: int = Query(1, ge=1),
    size: int = Query(20, ge=1, le=100),
    title: Optional[str] = Query(None),
    type: Optional[str] = Query(None),
):
    """
    Search articles with optional title filter and pagination.
    """
    query = db.query(ArticleDB)

    if title:
        query = query.filter(ArticleDB.title.ilike(f"%{title}%"))

    if type and type.lower() != "all":
        query = query.filter(ArticleDB.type == type.lower())

    total = query.count()

    offset = (page - 1) * size
    items = query.offset(offset).limit(size).all()

    return {
        "items": [
            {
                "id": item.id,
                "title": item.title,
                "subTitle": item.subTitle,
                "author": item.author,
                "created": item.createdAt.isoformat() if item.createdAt else None,
                "content": item.content,
                "image": item.image,
                "type": item.type,
            }
            for item in items
        ],
        "total": total,
    }
