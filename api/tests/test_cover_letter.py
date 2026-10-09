from unittest.mock import patch, AsyncMock
import httpx


def test_cover_letter_missing_key(client):
    with patch("app.routers.cover_letter._get_gemini_key", return_value=None):
        r = client.post("/api/cover-letter/generate", json={"job_title": "Engineer", "company": "Google"})
        assert r.status_code == 503
        assert "not configured" in r.json()["detail"]


def test_cover_letter_missing_fields(client):
    with patch("app.routers.cover_letter._get_gemini_key", return_value="test-key"):
        r = client.post("/api/cover-letter/generate", json={"job_title": "", "company": ""})
        assert r.status_code == 400
        assert "required" in r.json()["detail"]


def test_cover_letter_success(client):
    cover_letter_text = (
        "Dear Hiring Manager,\n\nI am writing to express my interest in the Software Engineer "
        "position at Google. With 5 years of experience in full-stack development...\n\n"
        "Sincerely,\n"
    )
    mock_gemini_response = {
        "candidates": [
            {"content": {"parts": [{"text": cover_letter_text}]}}
        ]
    }
    mock_request = httpx.Request("POST", "https://generativelanguage.googleapis.com/v1beta/models/gemini-3.8-flash:generateContent")
    mock_resp = httpx.Response(200, json=mock_gemini_response, request=mock_request)

    with patch("app.routers.cover_letter._get_gemini_key", return_value="test-key"):
        with patch("httpx.AsyncClient.post", new_callable=AsyncMock, return_value=mock_resp):
            r = client.post(
                "/api/cover-letter/generate",
                json={
                    "job_title": "Software Engineer",
                    "company": "Google",
                    "qualifications": "Python, React, AWS",
                    "experience_years": "5",
                    "tone": "professional",
                },
            )
            assert r.status_code == 200
            data = r.json()
            assert data["ai_generated"] is True
            assert data["word_count"] > 0
            assert "Google" in data["cover_letter"]


def test_cover_letter_gemini_error(client):
    async def raise_error(*args, **kwargs):
        raise httpx.HTTPStatusError(
            "Server error",
            request=httpx.Request("POST", "https://example.com"),
            response=httpx.Response(500),
        )

    with patch("app.routers.cover_letter._get_gemini_key", return_value="test-key"):
        with patch("httpx.AsyncClient.post", new_callable=AsyncMock, side_effect=raise_error):
            r = client.post(
                "/api/cover-letter/generate",
                json={"job_title": "Engineer", "company": "Acme"},
            )
            assert r.status_code == 502
            assert "AI service error" in r.json()["detail"]


def test_cover_letter_invalid_body(client):
    r = client.post("/api/cover-letter/generate", json={})
    assert r.status_code == 422
