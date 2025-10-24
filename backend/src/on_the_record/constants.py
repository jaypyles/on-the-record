import os

from dotenv import load_dotenv

load_dotenv()

SENDGRID_API_KEY = os.getenv("SENDGRID_API_KEY", "")
FROM_EMAIL = os.getenv("EMAIL_FROM", "")

ACCOUNT_SID = os.getenv("TWILIO_ACCOUNT_SID", "")
AUTH_TOKEN = os.getenv("TWILIO_AUTH_TOKEN", "")
SERVICE_SID = os.getenv("VERIFY_SERVICE_SID", "")

BYPASS_VERIFY = os.getenv("BYPASS_VERIFY", "false").lower() == "true"
