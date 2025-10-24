from on_the_record.constants import FROM_EMAIL, SENDGRID_API_KEY
from sendgrid import Mail, MailSettings, SandBoxMode, SendGridAPIClient


class SendGrid:
    def __init__(self) -> None:
        self.settings = MailSettings()
        self.settings.sandbox_mode = SandBoxMode(enable=True)
        self.key = SENDGRID_API_KEY
        self.from_mail = FROM_EMAIL
        self.client = SendGridAPIClient(self.key)

    def create_mail(self):
        # Create the message
        message = Mail(
            from_email=self.from_mail,
            to_emails="test@mailinator.com",
            subject="SendGrid Sandbox Test",
            plain_text_content="This is a sandbox test",
            html_content="<strong>This is a sandbox test</strong>",
        )

        message.mail_settings = self.settings
        response = self.client.send(message)
        print("Status code:", response.status_code)
        return response
