import os
from dotenv import load_dotenv
from groq import Groq

load_dotenv()

# SAFE INIT 
api_key = os.getenv("GROQ_API_KEY")

client = Groq(api_key=api_key) if api_key else None


# CHAT FUNCTION 
def career_chat(user_message: str):

    if not user_message:
        return "Please ask a valid question."

    # IF GROQ NOT CONFIGURED
    if client is None:
        return "Chatbot is not configured. Please set GROQ_API_KEY in .env file."

    try:
        response = client.chat.completions.create(
            # model="llama-3.1-8b-instant",
            model="openai/gpt-oss-20b",
            messages=[
                {
                    "role": "system",
                    "content": """
You are Fray-D, an AI Career Intelligence Assistant.

You help users with:
- Career guidance
- Resume improvement
- Interview preparation
- Job search advice
- Skills and technology recommendations
- Backend and frontend development
- MERN stack
- FastAPI
- AI and software development

Give clear, practical and concise answers.
"""
                },
                {
                    "role": "user",
                    "content": user_message
                }
            ]
        )

        return response.choices[0].message.content

    except Exception as e:
        return f"Chatbot error: {str(e)}"