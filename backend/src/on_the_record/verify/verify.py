from on_the_record.constants import ACCOUNT_SID, AUTH_TOKEN, SERVICE_SID
from twilio.rest import Client


class Verify:
    def __init__(self) -> None:
        self.account_sid = ACCOUNT_SID
        self.token = AUTH_TOKEN
        self.service_sid = SERVICE_SID
        self.client = Client(self.account_sid, self.token)

    def send_verification(self):
        verification = self.client.verify.services(
            self.service_sid
        ).verifications.create(
            to="jaydenpyles0524@gmail.com",
            channel="email",
        )

        print(verification.status)

    def check_verification(self, to_email: str, code: str):
        verification_check = self.client.verify.services(
            self.service_sid
        ).verification_checks.create(to=to_email, code=code)
        print("Check status:", verification_check.status)
        return verification_check.status == "approved"
