import random
import string
from datetime import datetime

from on_the_record.code.map import DISCOUNT_MAP
from on_the_record.database import DiscountCodeDB
from sqlalchemy.orm import Session


class DiscountCodeHelper:

    @staticmethod
    def generate_code(length: int = 6) -> str:
        """Generate a random alphanumeric code."""
        return "".join(random.choices(string.ascii_uppercase + string.digits, k=length))

    @staticmethod
    def create_code(session: Session, key: str) -> DiscountCodeDB:
        """Create and save a new discount code."""

        while True:
            code = DiscountCodeHelper.generate_code()
            existing = session.query(DiscountCodeDB).filter_by(code=code).first()
            if not existing:
                break

        discount = DiscountCodeDB(code=code, key=key)
        session.add(discount)
        session.commit()
        session.refresh(discount)
        return discount

    @staticmethod
    def redeem_code(session: Session, code: str, user_id: str) -> bool:
        """Mark a code as redeemed by a user."""
        discount = session.query(DiscountCodeDB).filter_by(code=code).first()
        if not discount:
            return False  # code doesn't exist
        if discount.redeemed_at is not None:
            return False  # already redeemed

        discount.redeemed_by = user_id
        discount.redeemed_at = datetime.utcnow()
        session.commit()
        return True

    @staticmethod
    def is_valid(session: Session, code: str) -> str | None:
        """Check if a code exists and hasn't been redeemed."""
        discount = session.query(DiscountCodeDB).filter_by(code=code).first()

        if discount is not None and discount.redeemed_at is None:
            return discount.key

        return None

    @staticmethod
    def apply_code(total: float, code: str) -> float:
        """Apply a discount code to a total amount."""
        func = DISCOUNT_MAP.get(code)

        if func:
            return func(total)

        return total
