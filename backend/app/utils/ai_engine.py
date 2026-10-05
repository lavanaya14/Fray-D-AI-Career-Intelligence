from groq import Groq
from dotenv import load_dotenv
import os
import json

load_dotenv()

api_key = os.getenv("GROQ_API_KEY")

# print("GROQ KEY FOUND =", bool(api_key))

if not api_key:
    raise Exception("GROQ_API_KEY not found in .env")

client = Groq(
    api_key=os.getenv("GROQ_API_KEY")
)


# RESUME ANALYZER


def analyze_resume_ai(text: str):

    if not text:
        return {}

    response = client.chat.completions.create(
    model="openai/gpt-oss-20b",
    response_format={"type": "json_object"},
        messages=[
            {
                "role": "system",
                "content": """
You are an ATS Resume Analyzer.

Return ONLY valid JSON.

Format:

{
  "skills": [],
  "weak_areas": [],
  "suggestions": []
}
"""
            },
            {
                "role": "user",
                "content": f"""
Analyze this resume and extract:

1. Skills
2. Weak Areas
3. Suggestions

Resume:

{text}
"""
            }
        ]
    )

    result = response.choices[0].message.content

    try:
        data = json.loads(result)

        skills = data.get("skills", [])
        weak_areas = data.get("weak_areas", [])

        resume_text = text.lower()

        if "communication" not in resume_text:
            weak_areas.append(
                "Communication skills not mentioned"
            )

        if "leadership" not in resume_text:
            weak_areas.append(
                "Leadership experience not highlighted"
            )

        if "certification" not in resume_text:
            weak_areas.append(
                "No certifications found"
            )

        if "achievement" not in resume_text:
            weak_areas.append(
                "Achievements are not quantified"
            )

        weak_areas = list(set(weak_areas))

       
        # ATS SCORE CALCULATION
        

        score = 50

        score += min(len(skills) * 4, 30)

        if "Communication skills not mentioned" not in weak_areas:
            score += 5

        if "Leadership experience not highlighted" not in weak_areas:
            score += 5

        if "No certifications found" not in weak_areas:
            score += 5

        if "Achievements are not quantified" not in weak_areas:
            score += 5

        ats_score = min(score, 100)

        data["weak_areas"] = weak_areas
        data["ats_score"] = ats_score

        return data

    except Exception as e:

        return {
            "skills": [],
            "weak_areas": [
                "Unable to analyze resume properly"
            ],
            "suggestions": [],
            "ats_score": 0,
            "error": str(e)
        }


def recommend_job_roles(text: str):

    text = text.lower()

    roles = []

    if "react" in text:
        roles.append("React Developer")

    if "node" in text:
        roles.append("Backend Developer")

    if "python" in text:
        roles.append("Python Developer")

    if "java" in text:
        roles.append("Java Developer")

    if "aws" in text:
        roles.append("Cloud Engineer")

    if "docker" in text:
        roles.append("DevOps Engineer")

    if "sql" in text:
        roles.append("Database Developer")

    if not roles:
        roles = [
            "Software Developer",
            "Backend Developer",
            "Frontend Developer"
        ]

    best_matches = []

    score = 95

    for role in roles[:3]:
        best_matches.append({
            "role": role,
            "match": score
        })
        score -= 5

    other_roles = [
        "Full Stack Developer",
        "Frontend Developer",
        "Backend Developer",
        "React Developer",
        "Node.js Developer",
        "Python Developer",
        "Java Developer",
        "Software Engineer",
        "Cloud Engineer",
        "DevOps Engineer",
        "Data Analyst",
        "AI Engineer",
        "Machine Learning Engineer",
        "Database Developer",
        "Mobile App Developer"
    ]

    return {
        "best_matches": best_matches,
        "other_roles": other_roles
    }