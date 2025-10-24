from typing import Optional

from pydantic import BaseModel, HttpUrl


class BandItem(BaseModel):
    band: str  # e.g. "Metallica"
    price: float
    title: Optional[str] = None  # e.g. album name
    item_type: str  # e.g. "album", "shirt", "vinyl", "CD"
    image_url: HttpUrl  # URL to image
    genre: Optional[str] = None  # e.g. "Metal"
    format: Optional[str] = None  # e.g. "CD", "Vinyl", None for merch
