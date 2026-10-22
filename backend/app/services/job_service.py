# # import requests
# # import re


# # def normalize_text(value):
# #     value = (value or "").lower()
# #     return re.sub(r"[^a-z0-9+#]+", " ", value).strip()


# # def search_jobs(role, page=1):
# #     try:
# #         if isinstance(role, str):
# #             roles = [role]
# #         elif isinstance(role, list):
# #             roles = role
# #         else:
# #             roles = []

# #         roles = [
# #             normalize_text(r)
# #             for r in roles
# #             if isinstance(r, str) and r.strip()
# #         ]

# #         if not roles:
# #             return []

# #         all_jobs = []

# #         # Fetch a few pages of current job listings.
# #         for api_page in range(1, 4):
# #             response = requests.get(
# #                 "https://www.arbeitnow.com/api/job-board-api",
# #                 params={"page": api_page},
# #                 timeout=20
# #             )
# #             response.raise_for_status()

# #             data = response.json().get("data", [])
# #             if not data:
# #                 break

# #             all_jobs.extend(data)

# #         filtered = []
# #         seen_urls = set()
        
# #         india_terms = ["india", "remote india", "pan india"]
# #         remote_terms = ["remote", "worldwide", "anywhere"]

# #         exclude_terms = [
# #             "marketing operations",
# #             "revenue operations",
# #             "sales operations",
# #             "gtm operations",
# #             "talent acquisition operations"
# #         ]

# #         for job in all_jobs:
# #             title = normalize_text(job.get("title"))
# #             location = normalize_text(job.get("location"))
# #             description = normalize_text(job.get("description"))
# #             tags = job.get("tags") or []
            
# #             if not title:
# #                 continue

# #     #         title_words = set(title.split())
# #     #         matched = False

# #     #         for role_text in roles:
# #     #             role_words = set(role_text.split())

# #     #             if role_text in title:
# #     #                 matched = True
# #     #                 break

# #     #             # Require at least two shared title words
# #     #             # for multi-word roles.
# #     #             if len(role_words) > 1:
# #     #                 meaningful_words = role_words - {
# #     #                     "and", "or", "the", "of", "in", "for"
# #     #                 }
# #     #                 common = meaningful_words & title_words

# #     #                 if len(common) >= min(2, len(meaningful_words)):
# #     #                     matched = True
# #     #                     break

# #     #         if not matched:
# #     #             continue

# #     #         apply_link = job.get("url")
# #     #         if not apply_link or apply_link in seen_urls:
# #     #             continue

# #     #         seen_urls.add(apply_link)

# #     #         filtered.append({
# #     #             "title": job.get("title"),
# #     #             "company": job.get("company_name"),
# #     #             "location": job.get("location") or "Not specified",
# #     #             "salary": "Not Disclosed",
# #     #             "apply_link": apply_link,
# #     #             "source": "Arbeitnow"
# #     #         })

# #     #     print("TOTAL JOBS FETCHED:", len(all_jobs))
# #     #     print("MATCHED JOBS:", len(filtered))

# #     #     page_size = 15
# #     #     start = max(0, page - 1) * page_size
# #     #     return filtered[start:start + page_size]

# #     # except Exception as e:
# #     #     print("JOB SEARCH ERROR =", repr(e))
# #     #     return []




# def search_jobs(role, page=1):
#     try:
#         if isinstance(role, str):
#             roles = [role]
#         elif isinstance(role, list):
#             roles = role
#         else:
#             roles = []

#         roles = [
#             normalize_text(r)
#             for r in roles
#             if isinstance(r, str) and r.strip()
#         ]

#         if not roles:
#             return []

#         all_jobs = []

#         for api_page in range(1, 4):
#             response = requests.get(
#                 "https://www.arbeitnow.com/api/job-board-api",
#                 params={"page": api_page},
#                 timeout=20
#             )
#             response.raise_for_status()
#             data = response.json().get("data", [])
#             if not data:
#                 break
#             all_jobs.extend(data)

#         filtered = []
#         seen_urls = set()

#         india_terms = ["india", "remote india", "pan india"]
#         remote_terms = ["remote", "worldwide", "anywhere"]

#         exclude_terms = [
#             "marketing operations",
#             "revenue operations",
#             "sales operations",
#             "gtm operations",
#             "talent acquisition operations"
#         ]

#         for job in all_jobs:
#             title = normalize_text(job.get("title"))
#             location = normalize_text(job.get("location"))
#             description = normalize_text(job.get("description"))
#             tags = job.get("tags") or []
            
#             for job in data[:5]:
#                 print({
#                     "title": job.get("title"),
#                     "location": job.get("location"),
#                     "remote": job.get("remote"),
#                     "tags": job.get("tags")
#     })

#             if not title:
#                 continue

#             if any(term in title for term in exclude_terms):
#                 continue

#             # Only include India-based or explicitly remote listings.
#             is_india = any(term in location for term in india_terms)
#             is_remote = (
#                 job.get("remote") is True
#                 or any(term in location for term in remote_terms)
#             )

#             if not (is_india or is_remote):
#                 continue

#             matched = False

#             for role_text in roles:
#                 words = set(role_text.split())
#                 title_words = set(title.split())

#                 if role_text in title:
#                     matched = True
#                     break

#                 meaningful_words = words - {
#                     "and", "or", "the", "of", "in", "for"
#                 }

#                 if (
#                     len(meaningful_words) >= 2
#                     and len(meaningful_words & title_words) >= 2
#                 ):
#                     matched = True
#                     break

#             # Check logistics/operations keywords in title or description.
#             if not matched:
#                 job_text = title + " " + description + " " + " ".join(
#                     str(tag).lower() for tag in tags
#                 )
#                 domain_terms = [
#                     "logistics", "supply chain", "warehouse",
#                     "inventory", "fleet", "transportation",
#                     "distribution", "delivery operations",
#                     "operations supervisor", "operations manager"
#                 ]
#                 matched = any(term in job_text for term in domain_terms)

#             if not matched:
#                 continue

#             apply_link = job.get("url")
#             if not apply_link or apply_link in seen_urls:
#                 continue

#             seen_urls.add(apply_link)

#             filtered.append({
#                 "title": job.get("title"),
#                 "company": job.get("company_name"),
#                 "location": job.get("location") or "Not specified",
#                 "salary": "Not Disclosed",
#                 "apply_link": apply_link,
#                 "source": "Arbeitnow"
#             })

#         print("TOTAL JOBS FETCHED:", len(all_jobs))
#         print("INDIA/REMOTE MATCHES:", len(filtered))

#         page_size = 15
#         start = max(0, page - 1) * page_size
#         return filtered[start:start + page_size]

#     except Exception as e:
#         print("JOB SEARCH ERROR =", repr(e))
#         return []






# import requests
# import re


# def normalize_text(value):
#     """Normalize text for consistent matching."""
#     value = (value or "").lower()
#     return re.sub(r"[^a-z0-9+#]+", " ", value).strip()


# def search_jobs(role, page=1):
#     try:
#         # Accept either a single role or multiple recommended roles.
#         if isinstance(role, str):
#             roles = [role]
#         elif isinstance(role, list):
#             roles = role
#         else:
#             roles = []

#         roles = [
#             normalize_text(item)
#             for item in roles
#             if isinstance(item, str) and item.strip()
#         ]

#         if not roles:
#             print("JOB SEARCH: No roles supplied")
#             return []

#         # Fetch jobs from Arbeitnow.
#         all_jobs = []

#         for api_page in range(1, 4):
#             response = requests.get(
#                 "https://www.arbeitnow.com/api/job-board-api",
#                 params={"page": api_page},
#                 timeout=20
#             )
#             response.raise_for_status()

#             data = response.json().get("data", [])

#             print(f"API PAGE {api_page}: {len(data)} jobs")

#             # Print a few records to inspect the actual API fields.
#             for item in data[:3]:
#                 print({
#                     "title": item.get("title"),
#                     "location": item.get("location"),
#                     "remote": item.get("remote"),
#                     "tags": item.get("tags")
#                 })

#             if not data:
#                 break

#             all_jobs.extend(data)

#         print("TOTAL JOBS FETCHED:", len(all_jobs))
#         print("SEARCH ROLES:", roles)

#         filtered = []
#         seen_urls = set()

#         india_terms = [
#             "india",
#             "remote india",
#             "pan india"
#         ]

#         remote_terms = [
#             "remote",
#             "worldwide",
#             "anywhere"
#         ]

#         excluded_title_terms = [
#             "marketing operations",
#             "revenue operations",
#             "sales operations",
#             "gtm operations",
#             "talent acquisition operations"
#         ]

#         domain_terms = [
#             "logistics",
#             "supply chain",
#             "warehouse",
#             "inventory",
#             "fleet",
#             "transportation",
#             "distribution",
#             "delivery operations",
#             "operations supervisor",
#             "operations manager",
#             "shipping",
#             "dispatch",
#             "fulfillment"
#         ]

#         for job in all_jobs:
#             original_title = job.get("title") or ""
#             title = normalize_text(original_title)
#             location_raw = job.get("location") or ""
#             location = normalize_text(location_raw)
#             description = normalize_text(job.get("description"))
#             tags = job.get("tags") or []

#             if not title:
#                 continue

#             # Exclude unrelated operations roles.
#             if any(
#                 normalize_text(term) in title
#                 for term in excluded_title_terms
#             ):
#                 continue

#             # Accept India-based jobs or jobs explicitly marked remote.
#             is_india = any(term in location for term in india_terms)

#             remote_value = job.get("remote")
#             is_remote = (
#                 remote_value is True
#                 or str(remote_value).lower() == "true"
#                 or any(term in location for term in remote_terms)
#             )

#             if not (is_india or is_remote):
#                 continue

#             # Match recommended roles against job titles.
#             matched = False

#             for recommended_role in roles:
#                 if recommended_role in title:
#                     matched = True
#                     break

#                 role_words = set(recommended_role.split())
#                 title_words = set(title.split())

#                 ignored_words = {
#                     "and", "or", "the", "of", "in", "for"
#                 }

#                 meaningful_words = role_words - ignored_words
#                 common_words = meaningful_words & title_words

#                 if (
#                     len(meaningful_words) >= 2
#                     and len(common_words) >= min(
#                         2, len(meaningful_words)
#                     )
#                 ):
#                     matched = True
#                     break

#             # Also allow clearly relevant logistics job titles.
#             # Description-only matches are not enough to accept a job.
#             if not matched:
#                 matched = any(
#                     term in title for term in domain_terms
#                 )

#             if not matched:
#                 continue

#             apply_link = job.get("url")

#             if not apply_link or apply_link in seen_urls:
#                 continue

#             seen_urls.add(apply_link)

#             filtered.append({
#                 "title": original_title,
#                 "company": job.get("company_name"),
#                 "location": location_raw or "Not specified",
#                 "salary": "Not Disclosed",
#                 "apply_link": apply_link,
#                 "source": "Arbeitnow"
#             })

#         print("INDIA/REMOTE MATCHES:", len(filtered))

#         # Pagination.
#         page_size = 15
#         start = max(0, page - 1) * page_size

#         return filtered[start:start + page_size]

#     except requests.RequestException as e:
#         print("JOB API ERROR:", repr(e))
#         return []

#     except Exception as e:
#         print("JOB SEARCH ERROR:", repr(e))
#         return []





import requests
import re


def normalize_text(value):
    """Normalize text for consistent matching."""
    value = (value or "").lower()
    return re.sub(r"[^a-z0-9+#]+", " ", value).strip()


# Common equivalent titles across different professions.
# AI-recommended roles are still the main source of matching.
ROLE_ALIASES = {
    "teacher": ["teaching", "educator", "school teacher", "subject teacher", "instructor"],
    "sales": ["sales executive", "sales representative", "sales associate", "salesperson"],
    "human resources": ["hr", "human resources", "hr executive", "hr recruiter", "recruiter"],
    "hr": ["human resources", "hr executive", "hr recruiter", "recruiter"],
    "accountant": ["accounting", "accounts executive", "accounts assistant", "bookkeeper"],
    "marketing": ["digital marketing", "marketing executive", "marketing specialist"],
    "customer support": ["customer service", "customer care", "support representative"],
    "customer service": ["customer support", "customer care", "support representative"],
    "nurse": ["nursing", "registered nurse", "staff nurse"],
    "doctor": ["physician", "medical doctor"],
    "lawyer": ["legal counsel", "legal associate", "advocate"],
    "software developer": ["software engineer", "programmer", "application developer"],
    "web developer": ["frontend developer", "front end developer", "backend developer", "web engineer"],
    "logistics": ["supply chain", "warehouse", "dispatch", "transportation", "fulfillment"],
    "operations": ["operations executive", "operations coordinator", "operations supervisor"],
}


def expand_roles(roles):
    """Expand recommended roles into common equivalent job titles."""
    expanded = []

    for role in roles:
        normalized_role = normalize_text(role)

        if normalized_role:
            expanded.append(normalized_role)

        for key, aliases in ROLE_ALIASES.items():
            if key in normalized_role:
                expanded.extend(normalize_text(alias) for alias in aliases)

    # Remove duplicates while preserving order.
    return list(dict.fromkeys(role for role in expanded if role))


def search_jobs(role, page=1):
    try:
        # Accept one role or a list of recommended roles.
        if isinstance(role, str):
            roles = [role]
        elif isinstance(role, list):
            roles = role
        else:
            roles = []

        roles = [
            item.strip()
            for item in roles
            if isinstance(item, str) and item.strip()
        ]

        if not roles:
            print("JOB SEARCH: No roles supplied")
            return []

        search_terms = expand_roles(roles)
        print("SEARCH ROLES:", roles)

        # Fetch job listings from Arbeitnow.
        all_jobs = []

        for api_page in range(1, 4):
            response = requests.get(
                "https://www.arbeitnow.com/api/job-board-api",
                params={"page": api_page},
                timeout=20
            )
            response.raise_for_status()

            data = response.json().get("data", [])
            print(f"API PAGE {api_page}: {len(data)} jobs")

            if not data:
                break

            all_jobs.extend(data)

        print("TOTAL JOBS FETCHED:", len(all_jobs))

        filtered = []
        seen_urls = set()

        for job in all_jobs:
            original_title = job.get("title") or ""
            title = normalize_text(original_title)
            location_raw = job.get("location") or ""
            location = normalize_text(location_raw)

            tags = job.get("tags") or []
            if isinstance(tags, list):
                tags_text = normalize_text(" ".join(str(tag) for tag in tags))
            else:
                tags_text = normalize_text(str(tags))

            if not title:
                continue

            # Keep India-based listings and jobs marked as remote.
            is_india = "india" in location or "pan india" in location

            remote_value = job.get("remote")
            is_remote = (
                remote_value is True
                or str(remote_value).lower() == "true"
                or "remote" in location
                or "worldwide" in location
                or "anywhere" in location
            )

            if not (is_india or is_remote):
                continue

            # Match job titles and tags against AI-recommended roles.
            # Do not rely on a fixed list of logistics keywords.
            searchable_text = f"{title} {tags_text}"
            matched = False

            for term in search_terms:
                if term and term in searchable_text:
                    matched = True
                    break

                # Allow partial matches for meaningful words.
                role_words = {
                    word for word in term.split()
                    if word not in {
                        "and", "or", "the", "of", "in", "for",
                        "a", "an", "to", "with"
                    }
                }

                title_words = set(searchable_text.split())

                if not role_words:
                    continue

                common_words = role_words & title_words

                # A one-word role needs that word to match.
                # For multi-word roles, at least half the words must match.
                minimum_match = 1 if len(role_words) == 1 else max(
                    1, (len(role_words) + 1) // 2
                )

                if len(common_words) >= minimum_match:
                    matched = True
                    break

            if not matched:
                continue

            apply_link = job.get("url")

            if not apply_link or apply_link in seen_urls:
                continue

            seen_urls.add(apply_link)

            filtered.append({
                "title": original_title,
                "company": job.get("company_name") or "Not specified",
                "location": location_raw or "Not specified",
                "salary": "Not Disclosed",
                "apply_link": apply_link,
                "source": "Arbeitnow"
            })

        print("INDIA/REMOTE MATCHES:", len(filtered))

        # Return 15 results per page.
        page_size = 15
        start = max(0, page - 1) * page_size

        return filtered[start:start + page_size]

    except requests.RequestException as e:
        print("JOB API ERROR:", repr(e))
        return []

    except Exception as e:
        print("JOB SEARCH ERROR:", repr(e))
        return []