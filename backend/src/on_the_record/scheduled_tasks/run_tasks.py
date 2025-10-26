import logging

from on_the_record.database import UserDB, get_db
from on_the_record.profiles import Profiles
from on_the_record.scheduled_tasks.send_discount_email import send_discount_email
from sqlalchemy.orm import Session

logger = logging.getLogger("uvicorn")

AUDIENCE_TO_TASK = {
    "abandoned_cart": "",
    "potential_large_spenders": send_discount_email,
}


def do_tasks():
    db: Session = next(get_db())
    users = db.query(UserDB).all()

    for user in users:
        logger.info(f"Searching for user: {user.email} {user.name}")

        audiences = {}

        try:
            audiences = Profiles.get_user_audience(user.id)
        except:
            continue

        for k in audiences.keys():
            task = AUDIENCE_TO_TASK.get(k)
            if task:
                task(user, db)
                logger.info(f"Succesfully ran task for audience: {k}")
