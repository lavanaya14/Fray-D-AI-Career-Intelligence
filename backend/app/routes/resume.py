from fastapi import APIRouter, UploadFile, File, Depends
from sqlalchemy.orm import Session
from app.utils.security import get_current_user
from app.models.user import User
import shutil
import os

from app.database import get_db
from app.models.resume import Resume
from app.utils.pdf_parser import extract_text_from_pdf
from app.utils.ai_engine import (
    analyze_resume_ai,
    recommend_job_roles
)
from app.services.job_service import search_jobs

router = APIRouter(
    prefix="/resume",
    tags=["Resume"]
)

# ---------------- UPLOAD ----------------

@router.post("/upload")
def upload_resume(
    file: UploadFile = File(...),
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):


    os.makedirs("uploads", exist_ok=True)

    file_path = os.path.join(
        "uploads",
        file.filename
    )

    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    extracted_text = extract_text_from_pdf(file_path)

    if not extracted_text:
        extracted_text = ""

    resume = Resume(
        filename=file.filename,
        file_path=file_path,
        parsed_text=extracted_text,
        user_id=current_user.id
    )

    db.add(resume)
    db.commit()
    db.refresh(resume)

    return {
        "resume_id": resume.id
    }
    
   
# @router.get("/dashboard/{resume_id}")

@router.get("/dashboard")
def dashboard_data(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    resume = (
    db.query(Resume)
    .filter(Resume.user_id == current_user.id)
    .order_by(Resume.id.desc())
    .first()
)

    
    if not resume:
          return {
              "uploaded": False,
              "ats_score": 0,
              "skills": [],
              "weak_areas": [],
              "suggestions": [],
              "job_count": 0,
              "ai_insights": 0
    }
        
    print("RESUME TEXT:")
   

    analysis = analyze_resume_ai( resume.parsed_text or "" )
    
    jobs = search_jobs(
    role="Software Developer",
    page=1
)

    return {
        "uploaded": True,
        "resume": {
            "filename": resume.filename
        },
        "ats_score": analysis.get("ats_score", 0),
        "skills": analysis.get("skills", []),
        "weak_areas": analysis.get("weak_areas", []),
        "strengths": analysis.get("strengths", []),
        "suggestions": analysis.get("suggestions", []),
        "job_count": len(jobs),
        "ai_insights": len(analysis.get("suggestions", []))
    }

# ---------------- ATS ANALYSIS ----------------

@router.get("/analyze/{resume_id}")
def analyze_resume(
    resume_id: int,
    db: Session = Depends(get_db)
):

    resume = (
        db.query(Resume)
        .filter(Resume.id == resume_id)
        .first()
    )

    if not resume:
        return {
            "error": "Resume not found"
        }

    return analyze_resume_ai(
        resume.parsed_text or ""
    )
    

# ---------------- CAREER RECOMMENDATIONS ----------------
    
# @router.get("/job-match/{resume_id}")
# def job_match(
#     resume_id: int,
#     db: Session = Depends(get_db)
# ):

#     resume = (
#         db.query(Resume)
#         .filter(Resume.id == resume_id)
#         .first()
#     )

#     if not resume:
#         return {
#             "error": "Resume not found"
#         }

#     analysis = recommend_job_roles(
#         resume.parsed_text or ""
#     )

#     skills = analysis.get("skills", [])

#     best_role = "Software Developer"

#     if "react" in skills:
#         best_role = "React Developer"

#     elif "python" in skills:
#         best_role = "Backend Developer"

#     elif "aws" in skills:
#         best_role = "Cloud Developer"

#     return {
#         "best_matches": [
#             {
#                 "role": best_role,
#                 "match": 95
#             }
#         ],

#         "other_roles": [
#             "React Developer",
#             "Backend Developer",
#             "Cloud Developer",
#             "DevOps Engineer",
#             "Full Stack Developer",
#             "Software Engineer",
#             "Java Developer",
#             "Python Developer",
#             "Data Analyst",
#             "AI Engineer"
#         ]
#     } 
    
    

@router.get("/job-match/{resume_id}")
def job_match(
    resume_id: int,
    db: Session = Depends(get_db)
):
    resume = (
        db.query(Resume)
        .filter(Resume.id == resume_id)
        .first()
    )

    if not resume:
        return {"error": "Resume not found"}

    analysis = recommend_job_roles(resume.parsed_text or "")

    return {
        "domain": analysis.get("domain", "Unknown"),
        "best_matches": analysis.get("best_matches", []),
        "other_roles": analysis.get("other_roles", []),
        "error": analysis.get("error")
    }


    
    #  ---------------- LIVE JOBS ----------------
    
# @router.get("/jobs/{resume_id}")
# def get_jobs(
#     resume_id: int,
#     role: str = "Software Developer",
#     page: int = 1
# ):

#     jobs = search_jobs(
#         role=role,
#         page=page
#     )

#     return {
#         "recommended_role": role,
#         "jobs": jobs,

#         "other_roles": [
#     "React Developer",
#     "Backend Developer",
#     "Cloud Developer",
#     "DevOps Engineer",
#     "Full Stack Developer",
#     "Java Developer",
#     "Python Developer",
#     "Software Engineer",
#     "Frontend Developer",
#     "Data Analyst",
#     "Data Scientist",
#     "AI Engineer",
#     "Machine Learning Engineer",
#     "Cyber Security Analyst",
#     "Mobile App Developer",
#     "Android Developer",
#     "iOS Developer",
#     "QA Engineer",
#     "Site Reliability Engineer",
#     "Product Engineer"
# ]
#     }    



@router.get("/jobs/{resume_id}")
def get_jobs(
    resume_id: int,
    role: str | None = None,
    page: int = 1,
    db: Session = Depends(get_db)
):
    resume = (
        db.query(Resume)
        .filter(Resume.id == resume_id)
        .first()
    )

    if not resume:
        return {"error": "Resume not found", "jobs": []}

    recommendations = recommend_job_roles(
        resume.parsed_text or ""
    )

    best_matches = recommendations.get("best_matches", [])
    other_roles = recommendations.get("other_roles", [])

    # Use a selected role if it belongs to the AI recommendations.
    recommended_roles = [
        item["role"]
        for item in best_matches
        if isinstance(item, dict) and item.get("role")
    ]

    recommended_roles.extend(
        item for item in other_roles
        if isinstance(item, str) and item.strip()
    )

    if role and role.strip():
        allowed_roles = {
            item.lower() for item in recommended_roles
        }

        # Prevent unrelated/default IT roles from overriding
        # the resume's AI-generated recommendations.
        if role.strip().lower() in allowed_roles:
            search_role = role.strip()
        else:
            search_role = recommended_roles[:5]
    else:
        search_role = recommended_roles[:5]

    jobs = search_jobs(
        role=search_role,
        page=page
    )

    return {
        "domain": recommendations.get("domain", "Unknown"),
        "recommended_role": search_role,
        "jobs": jobs,
        "other_roles": other_roles
    }


# ---------------- GET RESUME ----------------

@router.get("/{resume_id}")
def get_resume(
    resume_id: int,
    db: Session = Depends(get_db)
):

    resume = (
        db.query(Resume)
        .filter(Resume.id == resume_id)
        .first()
    )

    if not resume:
        return {
            "error": "Resume not found"
        }

    return {
        "id": resume.id,
        "filename": resume.filename,
        "parsed_text": resume.parsed_text
    }


