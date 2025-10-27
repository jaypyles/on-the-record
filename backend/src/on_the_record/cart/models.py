from typing import List, Optional

from pydantic import BaseModel


class ItemOut(BaseModel):
    id: int
    band: str
    title: Optional[str]
    price: float
    item_type: str
    image_url: str
    genre: Optional[str]
    format: Optional[str]
    quantity: Optional[int] = None
    image: str

    model_config = {"from_attributes": True}


class CartOut(BaseModel):
    items: List[ItemOut]
