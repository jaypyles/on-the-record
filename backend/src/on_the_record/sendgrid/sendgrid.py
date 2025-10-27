from on_the_record.code import DiscountCodeHelper
from on_the_record.constants import FROM_EMAIL, SENDGRID_API_KEY
from sendgrid import From, SendGridAPIClient
from sendgrid.helpers.mail import Content, Email, Mail, To
from sqlalchemy.orm import Session


class SendGrid:
    def __init__(self) -> None:
        self.key = SENDGRID_API_KEY
        self.from_mail = FROM_EMAIL
        self.client = SendGridAPIClient(self.key)

    def create_mail(self):
        # Create the message
        from_email = Email("verify@readontherecord.com")
        to_email = To("jaydenpyles0524@gmail.com")
        subject = "Sending with SendGrid is Fun"
        content = Content("text/plain", "and easy to do anywhere, even with Python")
        mail = Mail(from_email, to_email, subject, content)

        mail_json = mail.get()

        response = self.client.send(mail_json)
        return response

    def send_template_email(
        self,
        to_email: str,
        template_id: str,
        dynamic_data: dict = None,
        subject: str = "",
        from_email: str = "verify@readontherecord.com",
    ):
        mail = Mail(
            from_email=Email(from_email),
            to_emails=To(to_email),
            subject=subject,
        )

        mail.template_id = template_id

        if dynamic_data:
            mail.dynamic_template_data = dynamic_data

        mail_json = mail.get()
        print(mail_json)

        response = self.client.send(mail_json)
        return response

    def send_10_off_code(self, db: Session):
        code = DiscountCodeHelper.create_code(db, "10_OFF")
        data = {"discountCode": code.code, "unsubscribeLink": "test"}
        self.send_template_email(
            "jaydenpyles0524@gmail.com",
            "d-3d536f000cf34dd9968ea5969b7a91ea",
            data,
            subject="Thanks for Registering!",
            from_email="customerservice@readontherecord.com",
        )
