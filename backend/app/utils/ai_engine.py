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


# def recommend_job_roles(text: str):

#     text = text.lower()

#     roles = []

#     if "react" in text:
#         roles.append("React Developer")

#     if "node" in text:
#         roles.append("Backend Developer")

#     if "python" in text:
#         roles.append("Python Developer")

#     if "java" in text:
#         roles.append("Java Developer")

#     if "aws" in text:
#         roles.append("Cloud Engineer")

#     if "docker" in text:
#         roles.append("DevOps Engineer")

#     if "sql" in text:
#         roles.append("Database Developer")

#     if not roles:
#         roles = [
#             "Software Developer",
#             "Backend Developer",
#             "Frontend Developer"
#         ]

#     best_matches = []

#     score = 95

#     for role in roles[:3]:
#         best_matches.append({
#             "role": role,
#             "match": score
#         })
#         score -= 5

#     other_roles = [
#         "Full Stack Developer",
#         "Frontend Developer",
#         "Backend Developer",
#         "React Developer",
#         "Node.js Developer",
#         "Python Developer",
#         "Java Developer",
#         "Software Engineer",
#         "Cloud Engineer",
#         "DevOps Engineer",
#         "Data Analyst",
#         "AI Engineer",
#         "Machine Learning Engineer",
#         "Database Developer",
#         "Mobile App Developer"
#     ]

#     return {
#         "best_matches": best_matches,
#         "other_roles": other_roles
#     }





def recommend_job_roles(text: str):
    if not text or not text.strip():
        return {
            "domain": "Unknown",
            "best_matches": [],
            "other_roles": []
        }

    try:
        response = client.chat.completions.create(
            model="openai/gpt-oss-20b",
            response_format={"type": "json_object"},
            messages=[
                {
                    "role": "system",
                    "content": """
You are an AI career recommendation expert.

Analyze the candidate's resume and recommend jobs
that genuinely match their professional background.

Return ONLY valid JSON in this format:
{
    "domain": "candidate's main professional domain",
    "best_matches": [
        {"role": "job title", "match": 90}
    ],
    "other_roles": ["job title 1", "job title 2"]
}

Rules:
1. Identify the candidate's domain, such as IT, Legal,
   Education, HR, Sales, Finance, Marketing, Healthcare,
   Operations or another suitable profession.
2. Generate 3 to 5 best_matches with match scores from 1 to 100.
3. Generate at least 10 relevant other_roles when the resume
   contains enough information.
4. Base recommendations on the candidate's actual skills,
   education, projects and work experience.
5. Consider fresher and experienced roles appropriately.
6. Do not recommend unrelated jobs just to fill the list.
7. Do not assume the candidate is an IT professional.
8. Use realistic job titles that can be searched on job portals.
9. Do not invent qualifications or experience.
"""
                },
                {
                    "role": "user",
                    "content": f"Analyze this resume and recommend suitable jobs:\n\n{text[:12000]}"
                }
            ]
        )

        result = response.choices[0].message.content
        data = json.loads(result)

        domain = data.get("domain", "Other")
        best_matches = data.get("best_matches", [])
        other_roles = data.get("other_roles", [])

        if not isinstance(best_matches, list):
            best_matches = []

        if not isinstance(other_roles, list):
            other_roles = []

        # Validate the AI-generated job titles and scores.
        valid_matches = []

        for item in best_matches:
            if not isinstance(item, dict):
                continue

            role = item.get("role")
            score = item.get("match")

            if not isinstance(role, str) or not role.strip():
                continue

            try:
                score = max(1, min(100, int(score)))
            except (ValueError, TypeError):
                score = 50

            valid_matches.append({
                "role": role.strip(),
                "match": score
            })

        valid_other_roles = [
            role.strip()
            for role in other_roles
            if isinstance(role, str) and role.strip()
        ]

        # Remove duplicate titles.
        seen = set()
        unique_matches = []

        for item in valid_matches:
            key = item["role"].lower()
            if key not in seen:
                seen.add(key)
                unique_matches.append(item)

        unique_other_roles = []

        for role in valid_other_roles:
            key = role.lower()
            if key not in seen:
                seen.add(key)
                unique_other_roles.append(role)

        return {
            "domain": domain,
            "best_matches": unique_matches[:5],
            "other_roles": unique_other_roles[:15]
        }

    except Exception as e:
        print("JOB RECOMMENDATION ERROR =", str(e))

        return {
            "domain": "Unknown",
            "best_matches": [],
            "other_roles": [],
            "error": "Unable to generate career recommendations."
        }
