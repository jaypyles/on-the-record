from typing import Optional

import jwt
from fastapi import Depends, Header, HTTPException
from on_the_record.constants import ALGORITHM, SECRET_KEY
from on_the_record.database import UserDB, get_db
from sqlalchemy.orm import Session


class AuthHelper:
    def __init__(self, db_session: Session):
        self.db = db_session

    def get_user_from_jwt(self, authorization: Optional[str] = Header(None)):
        """
        Reads JWT from Authorization header and returns the user from DB.
        Returns None if header missing.
        """
        if not authorization:
            return None

        try:
            scheme, token = authorization.split()
            if scheme.lower() != "bearer":
                raise HTTPException(status_code=401, detail="Invalid auth scheme")

            payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
            user_id = payload.get("id")
            if not user_id:
                raise HTTPException(status_code=401, detail="Invalid token payload")

            user = self.db.query(UserDB).filter(UserDB.id == user_id).first()
            if not user:
                raise HTTPException(status_code=404, detail="User not found")

            return {"id": user.id, "name": user.name, "email": user.email}

        except jwt.ExpiredSignatureError:
            raise HTTPException(status_code=401, detail="Token expired")
        except jwt.InvalidTokenError:
            raise HTTPException(status_code=401, detail="Invalid token")

    @staticmethod
    async def get_current_user(
        db: Session = Depends(get_db),
        authorization: Optional[str] = Header(None),
    ) -> dict:
        if not authorization:
            raise HTTPException(status_code=401, detail="Authorization header missing")

        auth = AuthHelper(db)
        user = auth.get_user_from_jwt(authorization)
        if not user:
            raise HTTPException(status_code=401, detail="Invalid token")

        return user

    @staticmethod
    async def get_optional_current_user(
        db: Session = Depends(get_db),
        authorization: Optional[str] = Header(None),
    ) -> dict:
        auth = AuthHelper(db)

        try:
            user = auth.get_user_from_jwt(authorization)
        except jwt.InvalidTokenError:
            return None

        return user
