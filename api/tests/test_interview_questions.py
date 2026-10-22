import json
from unittest.mock import patch, AsyncMock

import httpx

VALID_RESUME = (
    "Priya Nair — Data Analyst. priya@example.com, Mumbai.\n"
    "Experience: Analyst at TCS (2022-present). Automated reporting with Python and Power BI, "
    "saving 10 hours/week. Built churn model improving retention 8%.\n"
    "Education: B.Sc Statistics, Mumbai University, 2021. Skills: Python, SQL, Power BI, Excel."
)

GEMINI_JSON = {
    "questions": [
        {"category": "Resume Deep-Dive", "question": "Walk me through the churn model you built at TCS.", "hint": "Use STAR; quantify the 8% retention gain."},
        {"category": "Technical", "question": "How would you detect data drift in a production model?", "hint": "Mention monitoring distributions and retraining triggers."},
        {"category": "Behavioral", "question": "Tell me about a time a stakeholder disagreed with your analysis.", "hint": "Show how you used data to build consensus."},
    ]
}


def _gemini_response(text):
    body = {"candidates": [{"content": {"parts": [{"text": text}]}}]}
    request = httpx.Request("POST", "https://generativelanguage.googleapis.com/v1beta/models/gemini-3.8-flash:generateContent")
    return httpx.Response(200, json=body, request=request)


def test_interview_questions_missing_key(client):
    with patch("app.routers.interview_questions._get_gemini_key", return_value=None):
        r = client.post("/api/interview-questions/generate", json={"resume_text": VALID_RESUME})
        assert r.status_code == 503


def test_interview_questions_too_short(client):
    with patch("app.routers.interview_questions._get_gemini_key", return_value="test-key"):
        r = client.post("/api/interview-questions/generate", json={"resume_text": "hi"})
        assert r.status_code == 400


def test_interview_questions_success(client):
    mock_resp = _gemini_response(json.dumps(GEMINI_JSON))
    with patch("app.routers.interview_questions._get_gemini_key", return_value="test-key"):
        with patch("httpx.AsyncClient.post", new_callable=AsyncMock, return_value=mock_resp):
            r = client.post(
                "/api/interview-questions/generate",
                json={"resume_text": VALID_RESUME, "target_role": "Senior Data Analyst"},
            )
            assert r.status_code == 200
            data = r.json()
            assert len(data["questions"]) == 3
            assert data["questions"][0]["category"] == "Resume Deep-Dive"
            assert "churn model" in data["questions"][0]["question"]
            assert data["ai_generated"] is True


def test_interview_questions_fenced_json(client):
    mock_resp = _gemini_response("```json\n" + json.dumps(GEMINI_JSON) + "\n```")
    with patch("app.routers.interview_questions._get_gemini_key", return_value="test-key"):
        with patch("httpx.AsyncClient.post", new_callable=AsyncMock, return_value=mock_resp):
            r = client.post("/api/interview-questions/generate", json={"resume_text": VALID_RESUME})
            assert r.status_code == 200
            assert len(r.json()["questions"]) == 3


def test_interview_questions_empty_reply(client):
    mock_resp = _gemini_response(json.dumps({"questions": []}))
    with patch("app.routers.interview_questions._get_gemini_key", return_value="test-key"):
        with patch("httpx.AsyncClient.post", new_callable=AsyncMock, return_value=mock_resp):
            r = client.post("/api/interview-questions/generate", json={"resume_text": VALID_RESUME})
            assert r.status_code == 502


def test_interview_questions_gemini_error(client):
    async def raise_error(*args, **kwargs):
        raise httpx.HTTPStatusError(
            "Server error",
            request=httpx.Request("POST", "https://example.com"),
            response=httpx.Response(500),
        )

    with patch("app.routers.interview_questions._get_gemini_key", return_value="test-key"):
        with patch("httpx.AsyncClient.post", side_effect=raise_error):
            r = client.post("/api/interview-questions/generate", json={"resume_text": VALID_RESUME})
            assert r.status_code == 502
