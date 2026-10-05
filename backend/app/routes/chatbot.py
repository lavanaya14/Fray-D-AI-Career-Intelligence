from fastapi import APIRouter
from pydantic import BaseModel

from app.utils.chatbot_ai import career_chat

router = APIRouter(
    prefix="/chatbot",
    tags=["Chatbot"]
)

class ChatRequest(BaseModel):
    message: str

@router.post("/")
def chat(request: ChatRequest):

    answer = career_chat(
        request.message
    )

    return {
        "response": answer
    }