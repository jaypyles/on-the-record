import sqlite3
from datetime import datetime

import asyncpg
from on_the_record.constants import PG_DB, PG_HOST, PG_PASSWORD, PG_PORT, PG_USER
from sqlalchemy import Column, DateTime, Float, Integer, String, create_engine
from sqlalchemy.orm import Session, declarative_base, sessionmaker

Base = declarative_base()


class BandItemDB(Base):
    __tablename__ = "band_items"

    id = Column(Integer, primary_key=True, autoincrement=True)
    band = Column(String, nullable=False)
    title = Column(String)
    price = Column(Float, nullable=False)
    item_type = Column(String, nullable=False)
    image_url = Column(String, nullable=False)
    genre = Column(String)
    format = Column(String)


class ArticleDB(Base):
    __tablename__ = "articles"

    id = Column(Integer, primary_key=True, autoincrement=True)
    title = Column(String, nullable=False)
    subTitle = Column(String, nullable=False)
    author = Column(String)
    createdAt = Column(DateTime, nullable=False, default=datetime.utcnow)
    content = Column(String, nullable=False)
    image = Column(String)
    type = Column(String)


class UserDB(Base):
    __tablename__ = "users"

    id = Column(String, primary_key=True)
    name = Column(String, nullable=False)
    email = Column(String, unique=True, nullable=False)
    password = Column(String, nullable=False)
    verified = Column(Integer, nullable=False, default=0)

    def __repr__(self):
        return f"<User(id={self.id}, email={self.email}, name={self.name})>"


DATABASE_URL = "sqlite:///users.db"
engine = create_engine(
    DATABASE_URL, connect_args={"check_same_thread": False}
)  # sqlite-specific
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# Create tables if not exists
Base.metadata.create_all(bind=engine)


def get_db() -> Session:
    """Yields a SQLAlchemy session, closes automatically after use."""
    db = SessionLocal()
    try:
        yield db
        db.commit()
    except:
        db.rollback()
        raise
    finally:
        db.close()


def get_pure_db():
    conn = sqlite3.connect("users.db", check_same_thread=False)
    conn.row_factory = sqlite3.Row
    conn.execute(
        """
        CREATE TABLE IF NOT EXISTS users (
            id TEXT PRIMARY KEY,
            name TEXT NOT NULL,
            email TEXT UNIQUE NOT NULL,
            password TEXT NOT NULL,
            verified INTEGER NOT NULL DEFAULT 0
        )
        """
    )
    try:
        yield conn
        conn.commit()
    finally:
        conn.close()


_pg_pool: asyncpg.pool.Pool | None = None


async def get_pg_pool() -> asyncpg.pool.Pool:
    global _pg_pool
    if not _pg_pool:
        _pg_pool = await asyncpg.create_pool(
            user=PG_USER,
            password=PG_PASSWORD,
            database=PG_DB,
            host=PG_HOST,
            port=PG_PORT,
            min_size=1,
            max_size=10,
        )
    return _pg_pool
