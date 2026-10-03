import pytest

GOOD_RESUME = """John Doe
john.doe@email.com | (555) 123-4567 | linkedin.com/in/johndoe

PROFESSIONAL SUMMARY
Results-driven software engineer with 5 years of experience in full-stack development.

EXPERIENCE
Senior Software Engineer | TechCorp | Jan 2021 - Present
• Led a team of 6 engineers to deliver a microservices platform
• Developed RESTful APIs using Python and FastAPI
• Improved system performance by 40% through database optimization
• Managed CI/CD pipelines with GitHub Actions

Software Engineer | StartupXYZ | Jun 2018 - Dec 2020
• Built responsive web applications using React and TypeScript
• Implemented automated testing, achieving 90% code coverage
• Designed database schemas for PostgreSQL

EDUCATION
B.S. Computer Science | State University | 2018

SKILLS
Python, JavaScript, TypeScript, React, FastAPI, PostgreSQL, Docker, AWS, Git
"""

MINIMAL_RESUME = "This is a very short resume with barely any content at all."

JOB_DESC = """Senior Software Engineer
Requirements:
- 5+ years experience with Python and JavaScript
- Experience with React and TypeScript
- Familiarity with cloud services (AWS, GCP)
- Strong knowledge of PostgreSQL and database design
- Experience with Docker and Kubernetes
- CI/CD pipeline management
- Team leadership experience
"""


@pytest.mark.anyio
async def test_health(client):
    res = await client.get("/health")
    assert res.status_code == 200
    data = res.json()
    assert data["status"] == "ok"
    assert data["service"] == "DoAide Resume AI"


@pytest.mark.anyio
async def test_ats_score_good_resume(client):
    res = await client.post("/api/ats-score", json={"text": GOOD_RESUME})
    assert res.status_code == 200
    data = res.json()
    assert "overall_score" in data
    assert 0 <= data["overall_score"] <= 100
    assert data["overall_score"] >= 60
    assert len(data["sections"]) == 7


@pytest.mark.anyio
async def test_ats_score_minimal_resume(client):
    res = await client.post("/api/ats-score", json={"text": MINIMAL_RESUME})
    assert res.status_code == 200
    data = res.json()
    assert data["overall_score"] < 50


@pytest.mark.anyio
async def test_ats_score_too_short(client):
    res = await client.post("/api/ats-score", json={"text": "short"})
    assert res.status_code == 422


@pytest.mark.anyio
async def test_ats_score_sections_structure(client):
    res = await client.post("/api/ats-score", json={"text": GOOD_RESUME})
    data = res.json()
    for section in data["sections"]:
        assert "name" in section
        assert "score" in section
        assert "max_score" in section
        assert "feedback" in section
        assert section["score"] <= section["max_score"]


@pytest.mark.anyio
async def test_ats_score_summary_present(client):
    res = await client.post("/api/ats-score", json={"text": GOOD_RESUME})
    data = res.json()
    assert "summary" in data
    assert len(data["summary"]) > 10


@pytest.mark.anyio
async def test_job_match(client):
    res = await client.post("/api/job-match", json={
        "resume_text": GOOD_RESUME,
        "job_description": JOB_DESC,
    })
    assert res.status_code == 200
    data = res.json()
    assert "match_percentage" in data
    assert 0 <= data["match_percentage"] <= 100
    assert "matched_keywords" in data
    assert "missing_keywords" in data
    assert "suggestions" in data


@pytest.mark.anyio
async def test_job_match_high_relevance(client):
    res = await client.post("/api/job-match", json={
        "resume_text": GOOD_RESUME,
        "job_description": JOB_DESC,
    })
    data = res.json()
    assert data["match_percentage"] >= 30


@pytest.mark.anyio
async def test_job_match_too_short(client):
    res = await client.post("/api/job-match", json={
        "resume_text": "short",
        "job_description": "short",
    })
    assert res.status_code == 422


@pytest.mark.anyio
async def test_resume_tips(client):
    res = await client.post("/api/resume-tips", json={"text": GOOD_RESUME})
    assert res.status_code == 200
    data = res.json()
    assert "tips" in data
    assert "overall_assessment" in data
    assert len(data["tips"]) > 0


@pytest.mark.anyio
async def test_resume_tips_minimal(client):
    res = await client.post("/api/resume-tips", json={"text": MINIMAL_RESUME})
    data = res.json()
    high_priority = [t for t in data["tips"] if t["priority"] == "high"]
    assert len(high_priority) >= 3


@pytest.mark.anyio
async def test_resume_tips_structure(client):
    res = await client.post("/api/resume-tips", json={"text": GOOD_RESUME})
    data = res.json()
    for tip in data["tips"]:
        assert "category" in tip
        assert "tip" in tip
        assert "priority" in tip
        assert tip["priority"] in ("high", "medium", "low")


@pytest.mark.anyio
async def test_history_empty(client):
    res = await client.get("/api/history")
    assert res.status_code == 200
    assert isinstance(res.json(), list)


@pytest.mark.anyio
async def test_history_after_score(client):
    await client.post("/api/ats-score", json={"text": GOOD_RESUME})
    res = await client.get("/api/history")
    data = res.json()
    assert len(data) >= 1
    assert data[0]["type"] == "ats_score"


@pytest.mark.anyio
async def test_upload_txt(client):
    from io import BytesIO
    content = GOOD_RESUME.encode("utf-8")
    res = await client.post("/api/ats-score/upload", files={"file": ("resume.txt", BytesIO(content), "text/plain")})
    assert res.status_code == 200
    data = res.json()
    assert data["overall_score"] >= 60


@pytest.mark.anyio
async def test_upload_empty_file(client):
    from io import BytesIO
    res = await client.post("/api/ats-score/upload", files={"file": ("resume.txt", BytesIO(b"short"), "text/plain")})
    assert res.status_code == 400
