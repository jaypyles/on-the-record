import sqlite3
import uuid

from fastapi import Depends, FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from jose import jwt
from on_the_record.articles import article_router
from on_the_record.artists import artist_router
from on_the_record.constants import BYPASS_VERIFY
from on_the_record.sendgrid.sendgrid import SendGrid
from on_the_record.verify.verify import Verify
from passlib.hash import bcrypt
from pydantic import BaseModel

SECRET_KEY = "supersecret"
ALGORITHM = "HS256"

sg = SendGrid()
v = Verify()

app = FastAPI()

app.include_router(artist_router)
app.include_router(article_router)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class LoginUser(BaseModel):
    email: str
    password: str


class RegisterUser(LoginUser):
    name: str


class DbUser(RegisterUser):
    id: str


class VerifyRequest(BaseModel):
    email: str
    code: str


def get_db():
    conn = sqlite3.connect("users.db", check_same_thread=False)
    conn.row_factory = sqlite3.Row
    conn.execute(
        """
        CREATE TABLE IF NOT EXISTS users (
            id TEXT PRIMARY KEY,
            name TEXT NOT NULL,
            email TEXT UNIQUE NOT NULL,
            password TEXT NOT NULL,
            verified INTEGER NOT NULL DEFAULT 0
        )
        """
    )
    try:
        yield conn
        conn.commit()
    finally:
        conn.close()


@app.post("/register")
def register(user: RegisterUser, db: sqlite3.Connection = Depends(get_db)):
    hashed = bcrypt.hash(user.password)
    id = uuid.uuid4().hex

    try:
        db.execute(
            "INSERT INTO users (id, name, email, password, verified) VALUES (?, ?, ?, ?, ?)",
            (id, user.name, user.email, hashed, 0),
        )

        db.commit()
        return {"msg": "User registered"}
    except:
        raise HTTPException(status_code=400, detail="User already exists")


@app.post("/login")
def login(user: LoginUser, db: sqlite3.Connection = Depends(get_db)):
    cur = db.execute("SELECT * FROM users WHERE email = ?", (user.email,))
    row = cur.fetchone()

    print(user)
    print(dict(row))

    if not row or not bcrypt.verify(user.password, row["password"]):
        raise HTTPException(status_code=401, detail="Invalid credentials")

    if not row["verified"] and not BYPASS_VERIFY:
        v.send_verification()
        return {"verified": False, "email": user.email}

    token = jwt.encode(
        {"email": user.email, "id": row["id"]}, SECRET_KEY, algorithm=ALGORITHM
    )

    return {
        "message": "Email verified successfully!",
        "success": True,
        "token": token,
        "email": user.email,
        "name": row["name"],
        "id": row["id"],
        "verified": True,
    }


@app.post("/verify")
def verify_email(req: VerifyRequest, db: sqlite3.Connection = Depends(get_db)):
    cur = db.execute(
        "SELECT id, name, password FROM users WHERE email = ?", (req.email,)
    )

    row = cur.fetchone()

    verification_check = v.check_verification(req.email, req.code)

    if verification_check:
        token = jwt.encode(
            {"email": req.email, "id": row["id"]}, SECRET_KEY, algorithm=ALGORITHM
        )

        cur.execute("UPDATE users SET verified = 1 WHERE email = ?", (req.email,))

        return {
            "message": "Email verified successfully!",
            "success": True,
            "token": token,
            "email": req.email,
            "name": row["name"],
            "id": row["id"],
        }
    else:
        raise HTTPException(status_code=400, detail="Invalid verification code")
