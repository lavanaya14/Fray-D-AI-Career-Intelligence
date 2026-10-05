from sqlalchemy import Column, Integer, String, Text, ForeignKey
from app.database import Base

class Resume(Base):
    __tablename__ = "resumes"

    id = Column(Integer, primary_key=True, index=True)

    filename = Column(String(255))

    file_path = Column(String(500))
    
    
    parsed_text = Column(Text)

    user_id = Column(
        Integer,
        ForeignKey("users.id")
    )