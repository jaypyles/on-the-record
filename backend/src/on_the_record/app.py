import sqlite3
import uuid

from dotenv import load_dotenv
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from jose import jwt
from on_the_record.sendgrid.sendgrid import SendGrid
from passlib.hash import bcrypt
from pydantic import BaseModel

load_dotenv()

SECRET_KEY = "supersecret"
ALGORITHM = "HS256"

sg = SendGrid()

app = FastAPI()

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


def get_db():
    conn = sqlite3.connect("users.db")
    conn.row_factory = sqlite3.Row
    conn.execute(
        """
        CREATE TABLE IF NOT EXISTS users (
            id TEXT PRIMARY KEY,
            name TEXT NOT NULL,
            email TEXT UNIQUE NOT NULL,
            password TEXT NOT NULL
        )
        """
    )
    return conn


@app.post("/register")
def register(user: RegisterUser):
    db = get_db()
    hashed = bcrypt.hash(user.password)
    id = uuid.uuid4().hex

    try:
        db.execute(
            "INSERT INTO users VALUES (?, ?, ?, ?)", (id, user.name, user.email, hashed)
        )
        db.commit()
        return {"msg": "User registered"}
    except:
        raise HTTPException(status_code=400, detail="User already exists")


@app.post("/login")
def login(user: LoginUser):
    db = get_db()
    cur = db.execute(
        "SELECT id, name, password FROM users WHERE email = ?", (user.email,)
    )
    row = cur.fetchone()

    if not row or not bcrypt.verify(user.password, row["password"]):
        raise HTTPException(status_code=401, detail="Invalid credentials")

    token = jwt.encode({"email": user.email}, SECRET_KEY, algorithm=ALGORITHM)
    sg.create_mail()
    return {
        "token": token,
        "email": user.email,
        "name": row["name"],
        "id": row["id"],
    }
