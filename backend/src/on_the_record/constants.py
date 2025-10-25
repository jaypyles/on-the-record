import os

from dotenv import load_dotenv

load_dotenv()

SENDGRID_API_KEY = os.getenv("SENDGRID_API_KEY", "")
FROM_EMAIL = os.getenv("EMAIL_FROM", "")

ACCOUNT_SID = os.getenv("TWILIO_ACCOUNT_SID", "")
AUTH_TOKEN = os.getenv("TWILIO_AUTH_TOKEN", "")
SERVICE_SID = os.getenv("VERIFY_SERVICE_SID", "")

BYPASS_VERIFY = os.getenv("BYPASS_VERIFY", "false").lower() == "true"

SECRET_KEY = os.environ.get("NEXTAUTH_SECRET", "supersecret")
ALGORITHM = "HS256"

PG_USER = os.getenv("PG_USER", "your_user")
PG_PASSWORD = os.getenv("PG_PASSWORD", "your_password")
PG_DB = os.getenv("PG_DB", "otr-warehouse")
PG_HOST = os.getenv("PG_HOST", "localhost")
PG_PORT = int(os.getenv("PG_PORT", 5432))
