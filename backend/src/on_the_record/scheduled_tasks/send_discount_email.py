import logging

from on_the_record.code.helper import DiscountCodeHelper
from on_the_record.database import ActionsDB, UserDB
from on_the_record.sendgrid.sendgrid import SendGrid
from sqlalchemy.orm import Session

logger = logging.getLogger("uvicorn")


def send_discount_email(user: UserDB, db: Session):
    sg = SendGrid()

    action_occurred = (
        db.query(ActionsDB)
        .filter(ActionsDB.action == "discount_sent", ActionsDB.user_id == user.id)
        .one_or_none()
    )

    if not action_occurred:
        logger.info(f"Discount Sent has not yet occurred for {user.email}")
        discount_code = DiscountCodeHelper.create_code(db, "20_OFF")

        dynamic_data = {
            "firstName": user.name.split(" ")[0],
            "discountPercentage": 20,
            "unsubscribeLink": "test",
            "discountCode": discount_code.code,
        }

        sg.send_template_email(
            "jaydenpyles0524@gmail.com",
            "d-1ca6908368bd4b2c8435cf5ea97fdfe3",
            dynamic_data,
            "You've earned a discount on your next purchase!",
            from_email="customerservice@readontherecord.com",
        )

        db.add(ActionsDB(action="discount_sent", user_id=user.id))
        db.commit()
        return

    logger.info(f"Discount Sent has already occurred for {user.email}")
