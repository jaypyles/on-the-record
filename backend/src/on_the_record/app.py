import sqlite3

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from jose import jwt
from passlib.hash import bcrypt
from pydantic import BaseModel

SECRET_KEY = "supersecret"
ALGORITHM = "HS256"

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class User(BaseModel):
    email: str
    password: str


def get_db():
    conn = sqlite3.connect("users.db")
    conn.execute(
        "CREATE TABLE IF NOT EXISTS users (email TEXT PRIMARY KEY, password TEXT)"
    )
    return conn


@app.post("/register")
def register(user: User):
    db = get_db()
    hashed = bcrypt.hash(user.password)
    try:
        db.execute("INSERT INTO users VALUES (?, ?)", (user.email, hashed))
        db.commit()
        return {"msg": "User registered"}
    except:
        raise HTTPException(status_code=400, detail="User already exists")


@app.post("/login")
def login(user: User):
    db = get_db()
    cur = db.execute("SELECT password FROM users WHERE email = ?", (user.email,))
    row = cur.fetchone()
    if not row or not bcrypt.verify(user.password, row[0]):
        raise HTTPException(status_code=401, detail="Invalid credentials")
    token = jwt.encode({"email": user.email}, SECRET_KEY, algorithm=ALGORITHM)
    return {"token": token, "email": user.email}
