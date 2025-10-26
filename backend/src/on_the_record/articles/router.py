from typing import Optional

from fastapi import APIRouter, Depends, Query
from on_the_record.auth.auth import AuthHelper
from on_the_record.database import ArticleDB, get_db
from on_the_record.profiles import Profiles
from sqlalchemy import func
from sqlalchemy.orm import Session

router = APIRouter(prefix="/articles", tags=["articles"])


@router.get("", response_model=dict)
def get_articles(
    db: Session = Depends(get_db),
    user: Optional[dict] = Depends(AuthHelper.get_optional_current_user),
    page: int = Query(1, ge=1),
    size: int = Query(20, ge=1, le=100),
    title: Optional[str] = Query(None),
    type: Optional[str] = Query(None),
    id: Optional[str] = Query(None),
    get_favorite: Optional[bool] = Query(False),
):
    """
    Search articles with optional title filter and pagination.
    """
    favorite = None

    if user and get_favorite:
        traits_response = Profiles.get_user_traits(user["id"])

        if traits_response and "favorite_article_type" in traits_response:
            favorite = traits_response["favorite_article_type"]

    query = db.query(ArticleDB)

    if title:
        query = query.filter(ArticleDB.title.ilike(f"%{title}%"))

    if type and type.lower() != "all":
        query = query.filter(ArticleDB.type == type.lower())

    if id:
        query = query.filter(ArticleDB.id == id)

    if favorite:
        query = query.filter(ArticleDB.genre == favorite)
        query = query.order_by(func.random())

    if size == 4:
        query = query.order_by(func.random())

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
                "genre": item.genre,
            }
            for item in items
        ],
        "total": total,
    }
