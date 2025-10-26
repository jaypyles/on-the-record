import csv
from datetime import datetime

from on_the_record.database import ArticleDB
from sqlalchemy import insert


def seed_articles_from_csv(session, csv_path="data/articles.csv"):
    articles = []

    with open(csv_path, newline="", encoding="utf-8") as csvfile:
        reader = csv.DictReader(csvfile)
        for row in reader:
            created_at_str = (row.get("created_at") or "").strip()
            created_at = None

            for fmt in ("%m/%d/%Y", "%Y-%m-%d"):
                try:
                    created_at = datetime.strptime(created_at_str, fmt)
                    break
                except ValueError:
                    continue

            if not created_at:
                created_at = datetime.utcnow()

            article = {
                "title": row.get("title", "").strip(),
                "subTitle": row.get("subtitle", "").strip(),
                "image": row.get("image_url") or "https://via.placeholder.com/600x400",
                "genre": row.get("genre", "unknown").strip(),
                "createdAt": created_at,
                "band": row.get("band", "").strip(),
                "content": row.get("content", "").strip(),
                "author": row.get("author", "").strip(),
                "type": row.get("type", "news").strip(),
            }

            if not article["title"]:
                print("Skipping row with missing title:", row)
                continue

            articles.append(article)

    if not articles:
        print("No valid articles found in CSV.")
        return

    stmt = insert(ArticleDB)
    session.execute(stmt, articles)
    session.commit()
    print(f"Seeded {len(articles)} articles from {csv_path}")
