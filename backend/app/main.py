from fastapi import FastAPI
from sqlalchemy import text

from app.database import engine

app = FastAPI(
    title="AI Career Assistant"
)


@app.get("/")
def root():

    with engine.connect() as conn:
        conn.execute(text("SELECT 1"))

    return {
        "message": "Database Connected Successfully"
    }