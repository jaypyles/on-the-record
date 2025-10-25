from uuid import uuid4

from fastapi import APIRouter, Request, Response

router = APIRouter()

SESSION_COOKIE_NAME = "session_id"


@router.get("/session")
def get_or_create_session(request: Request, response: Response):
    session_id = request.cookies.get(SESSION_COOKIE_NAME)

    if not session_id:
        session_id = str(uuid4())
        response.set_cookie(
            key=SESSION_COOKIE_NAME,
            value=session_id,
            httponly=True,
            secure=False,
            samesite="lax",
            max_age=60 * 60 * 24 * 7,
        )

    return {"session_id": session_id}
