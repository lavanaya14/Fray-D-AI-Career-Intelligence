import requests

def search_jobs(role, page=1):

    try:

        url = "https://remotive.com/api/remote-jobs"

        response = requests.get(
            url,
            timeout=20
        )

        jobs = response.json().get("jobs", [])

        role = (role or "").lower()

        filtered = []

        for job in jobs:

            title = (
                job.get("title") or ""
            ).lower()

            description = (
                job.get("description") or ""
            ).lower()

            if (
                role in title
                or role in description
                or any(
                    word in title
                    for word in role.split()
                )
            ):

                filtered.append({
                    "title": job.get("title"),
                    "company": job.get("company_name"),
                    "location": job.get(
                        "candidate_required_location"
                    ),
                    "salary": "Not Disclosed",
                    "apply_link": job.get("url")
                })

        # fallback
        if len(filtered) < 20:

            filtered = [
                {
                    "title": j.get("title"),
                    "company": j.get("company_name"),
                    "location": j.get(
                        "candidate_required_location"
                    ),
                    "salary": "Not Disclosed",
                    "apply_link": j.get("url")
                }
                for j in jobs
            ]

        # pagination
        page_size = 15

        start = (page - 1) * page_size
        end = start + page_size

        return filtered[start:end]

    except Exception as e:

        print(e)

        return []