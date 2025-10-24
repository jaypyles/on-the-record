import csv
from typing import Optional

from pydantic import BaseModel, HttpUrl, ValidationError
from sqlalchemy import Column, Float, Integer, String, create_engine
from sqlalchemy.orm import declarative_base, sessionmaker


# -----------------------
# 1. Pydantic model
# -----------------------
class BandItem(BaseModel):
    band: str
    title: Optional[str] = None
    price: float
    item_type: str
    image_url: HttpUrl
    genre: Optional[str] = None
    format: Optional[str] = None


# -----------------------
# 2. SQLAlchemy setup
# -----------------------
Base = declarative_base()


class BandItemDB(Base):
    __tablename__ = "band_items"
    id = Column(Integer, primary_key=True, autoincrement=True)
    band = Column(String, nullable=False)
    price = Column(Float, nullable=False)
    title = Column(String)
    item_type = Column(String, nullable=False)
    image_url = Column(String, nullable=False)
    genre = Column(String)
    format = Column(String)


# Replace with your DB URL
DATABASE_URL = "sqlite:///users.db"
engine = create_engine(DATABASE_URL)
Session = sessionmaker(bind=engine)
session = Session()

# Create table if it doesn't exist
Base.metadata.drop_all(engine)
Base.metadata.create_all(engine)

# -----------------------
# 3. Read CSV and insert
# -----------------------
csv_path = "data/data.csv"

with open(csv_path, newline="", encoding="utf-8") as csvfile:
    reader = csv.DictReader(csvfile)
    for row in reader:
        try:
            # Use a placeholder image URL if empty
            image_url = row.get("url") or "https://via.placeholder.com/300"

            item = BandItem(
                band=row["band"],
                title=row.get("title") or None,
                price=row.get("price"),
                item_type=row.get("type") or "album",
                image_url=image_url,
                genre=row.get("genre") or None,
                format=row.get("format") or None,
            )

            db_item = BandItemDB(
                band=item.band,
                title=item.title,
                price=item.price,
                item_type=item.item_type,
                image_url=str(item.image_url),
                genre=item.genre,
                format=item.format,
            )

            session.add(db_item)

        except ValidationError as e:
            print(f"Skipping row due to validation error: {row}")
            print(e)

session.commit()
print("Imported CSV into database successfully.")
