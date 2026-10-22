import json
from unittest.mock import patch, AsyncMock

import httpx

VALID_RESUME = (
    "Rahul Sharma — Software Engineer. rahul@example.com, +91 98765 43210, Bengaluru.\n"
    "Experience: Senior Developer at Infosys (2021-present). Built payment APIs in Python "
    "serving 2M requests/day, cut latency 40%. Led a team of 4.\n"
    "Education: B.Tech CSE, VIT Vellore, 2019. Skills: Python, FastAPI, PostgreSQL, AWS."
)

GEMINI_JSON = {
    "score": 82,
    "grade": "A",
    "summary": "A strong, quantified resume with clear impact.",
    "sections": [
        {"section": "Experience", "score": 90, "feedback": "Well quantified."},
        {"section": "Skills", "score": 75, "feedback": "Add cloud certifications."},
    ],
    "strengths": ["Quantified achievements", "Clear structure", "Relevant stack"],
    "improvements": ["Add a summary line", "Mention CI/CD exposure", "List certifications"],
}


def _gemini_response(text):
    body = {"candidates": [{"content": {"parts": [{"text": text}]}}]}
    request = httpx.Request("POST", "https://generativelanguage.googleapis.com/v1beta/models/gemini-3.8-flash:generateContent")
    return httpx.Response(200, json=body, request=request)


def test_resume_score_missing_key(client):
    with patch("app.routers.resume_score._get_gemini_key", return_value=None):
        r = client.post("/api/resume-score/analyze", json={"resume_text": VALID_RESUME})
        assert r.status_code == 503
        assert "not configured" in r.json()["detail"]


def test_resume_score_too_short(client):
    with patch("app.routers.resume_score._get_gemini_key", return_value="test-key"):
        r = client.post("/api/resume-score/analyze", json={"resume_text": "too short"})
        assert r.status_code == 400


def test_resume_score_too_long_rejected(client):
    with patch("app.routers.resume_score._get_gemini_key", return_value="test-key"):
        r = client.post("/api/resume-score/analyze", json={"resume_text": "x" * 20000})
        assert r.status_code == 422


def test_resume_score_success(client):
    mock_resp = _gemini_response(json.dumps(GEMINI_JSON))
    with patch("app.routers.resume_score._get_gemini_key", return_value="test-key"):
        with patch("httpx.AsyncClient.post", new_callable=AsyncMock, return_value=mock_resp):
            r = client.post(
                "/api/resume-score/analyze",
                json={"resume_text": VALID_RESUME, "target_role": "Backend Engineer"},
            )
            assert r.status_code == 200
            data = r.json()
            assert data["score"] == 82
            assert data["grade"] == "A"
            assert len(data["sections"]) == 2
            assert data["sections"][0]["section"] == "Experience"
            assert len(data["strengths"]) == 3
            assert data["ai_generated"] is True


def test_resume_score_fenced_json(client):
    mock_resp = _gemini_response("```json\n" + json.dumps(GEMINI_JSON) + "\n```")
    with patch("app.routers.resume_score._get_gemini_key", return_value="test-key"):
        with patch("httpx.AsyncClient.post", new_callable=AsyncMock, return_value=mock_resp):
            r = client.post("/api/resume-score/analyze", json={"resume_text": VALID_RESUME})
            assert r.status_code == 200
            assert r.json()["score"] == 82


def test_resume_score_clamps_out_of_range(client):
    weird = dict(GEMINI_JSON, score=150)
    mock_resp = _gemini_response(json.dumps(weird))
    with patch("app.routers.resume_score._get_gemini_key", return_value="test-key"):
        with patch("httpx.AsyncClient.post", new_callable=AsyncMock, return_value=mock_resp):
            r = client.post("/api/resume-score/analyze", json={"resume_text": VALID_RESUME})
            assert r.status_code == 200
            assert r.json()["score"] == 100


def test_resume_score_garbage_reply(client):
    mock_resp = _gemini_response("I cannot grade this resume, sorry.")
    with patch("app.routers.resume_score._get_gemini_key", return_value="test-key"):
        with patch("httpx.AsyncClient.post", new_callable=AsyncMock, return_value=mock_resp):
            r = client.post("/api/resume-score/analyze", json={"resume_text": VALID_RESUME})
            assert r.status_code == 502
            assert "unexpected format" in r.json()["detail"]


def test_resume_score_gemini_error(client):
    async def raise_error(*args, **kwargs):
        raise httpx.HTTPStatusError(
            "Server error",
            request=httpx.Request("POST", "https://example.com"),
            response=httpx.Response(500),
        )

    with patch("app.routers.resume_score._get_gemini_key", return_value="test-key"):
        with patch("httpx.AsyncClient.post", side_effect=raise_error):
            r = client.post("/api/resume-score/analyze", json={"resume_text": VALID_RESUME})
            assert r.status_code == 502
