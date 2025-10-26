import csv

from on_the_record.database import BandItemDB
from on_the_record.models.artist import BandItem
from on_the_record.scripts.seed_articles import seed_articles_from_csv
from pydantic import ValidationError
from sqlalchemy import create_engine
from sqlalchemy.orm import declarative_base, sessionmaker

Base = declarative_base()


DATABASE_URL = "sqlite:///users.db"
engine = create_engine(DATABASE_URL)
Session = sessionmaker(bind=engine)
session = Session()

Base.metadata.drop_all(engine)
Base.metadata.create_all(engine)

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
                image=row.get("image"),
            )

            db_item = BandItemDB(
                band=item.band,
                title=item.title,
                price=item.price,
                item_type=item.item_type,
                image_url=str(item.image_url),
                genre=item.genre,
                format=item.format,
                image=item.image,
            )

            session.add(db_item)

        except ValidationError as e:
            print(f"Skipping row due to validation error: {row}")
            print(e)

# seed_articles_from_csv(session)
session.commit()
print("Imported CSV into database successfully.")
