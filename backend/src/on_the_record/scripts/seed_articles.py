import random
from datetime import datetime

from on_the_record.database import ArticleDB
from sqlalchemy import insert

MUSICIANS = [
    "Billie Eilish",
    "Dua Lipa",
    "The Weeknd",
    "Olivia Rodrigo",
    "Doja Cat",
    "Harry Styles",
    "BTS",
    "Adele",
    "Bad Bunny",
    "Taylor Swift",
    "Ed Sheeran",
    "Drake",
    "Bruno Mars",
    "SZA",
    "Lizzo",
    "Post Malone",
]

ARTICLE_TYPES = ["news", "release"]


def article_factory():
    musician = random.choice(MUSICIANS)
    return {
        "title": f"{musician} {random.choice(['Announces New Tour', 'Drops New Album', 'Interview', 'Single Release'])}",
        "subTitle": float(random.randint(1, 100)),
        "author": musician,
        "createdAt": datetime.utcnow(),
        "image": f"https://example.com/images/{musician.replace(' ', '_')}.jpg",
        "type": random.choice(ARTICLE_TYPES),
        "content": "",
    }


def seed_articles(session, count: int = 20):
    articles_data = [article_factory() for _ in range(count)]

    stmt = insert(ArticleDB)  # SQLAlchemy Core insert
    session.execute(stmt, articles_data)
    session.commit()
    print(f"Seeded {count} articles!")
