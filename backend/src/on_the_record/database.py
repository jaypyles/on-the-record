from contextlib import contextmanager

from sqlalchemy import Column, Float, Integer, String, create_engine
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
