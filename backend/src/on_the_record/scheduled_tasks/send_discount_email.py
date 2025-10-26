from on_the_record.database import UserDB, get_db
from on_the_record.sendgrid.sendgrid import SendGrid
from sqlalchemy.orm import Session


def send_discount_email():
    db: Session = next(get_db())
    sg = SendGrid()

    users = db.query(UserDB).all()

    for user in users[:1]:
        dynamic_data = {
            "firstName": user.name.split(" ")[0],
            "discountPercentage": 20,
            "unsubscribeLink": "test",
            "discountCode": "123456",
        }
        sg.send_template_email(
            "jaydenpyles0524@gmail.com",
            "d-1ca6908368bd4b2c8435cf5ea97fdfe3",
            dynamic_data,
            "Testing",
        )

        print("success")
