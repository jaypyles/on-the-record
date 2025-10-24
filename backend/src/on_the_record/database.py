from datetime import datetime

from sqlalchemy import Column, DateTime, Float, Integer, String, create_engine, func
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
