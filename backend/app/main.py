from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from dotenv import load_dotenv


load_dotenv()

from app.database import Base, engine
from app.routes.auth import router as auth_router
from app.routes.resume import router as resume_router
from app.routes import chatbot


Base.metadata.create_all(bind=engine)


app = FastAPI(title="AI Career Assistant")

app.mount(
    "/uploads",
    StaticFiles(directory="uploads"),
    name="uploads"
)


app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


app.include_router(auth_router)
app.include_router(resume_router)
app.include_router(chatbot.router)



@app.get("/")
def root():
    return {
        "message": "AI Career Assistant Running 🚀"
    }