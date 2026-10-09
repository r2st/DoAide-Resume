from unittest.mock import patch, AsyncMock
import json
import httpx


def test_ats_check_missing_key(client):
    with patch("app.routers.ats_checker._get_gemini_key", return_value=None):
        r = client.post("/api/ats/check", json={"resume_text": "Some resume text"})
        assert r.status_code == 503
        assert "not configured" in r.json()["detail"]


def test_ats_check_empty_resume(client):
    with patch("app.routers.ats_checker._get_gemini_key", return_value="test-key"):
        r = client.post("/api/ats/check", json={"resume_text": ""})
        assert r.status_code == 400
        assert "required" in r.json()["detail"]


def test_ats_check_success(client):
    ai_result = {
        "score": 72,
        "summary": "Good resume with room for improvement.",
        "keyword_matches": ["Python", "React", "AWS"],
        "missing_keywords": ["Docker", "Kubernetes"],
        "suggestions": ["Add more quantified achievements", "Include Docker experience"],
        "section_scores": {"contact": 90, "summary": 75, "experience": 70, "education": 80, "skills": 65, "formatting": 85},
    }
    mock_gemini_response = {
        "candidates": [
            {"content": {"parts": [{"text": json.dumps(ai_result)}]}}
        ]
    }
    mock_request = httpx.Request("POST", "https://generativelanguage.googleapis.com/v1beta/models/gemini-3.8-flash:generateContent")
    mock_resp = httpx.Response(200, json=mock_gemini_response, request=mock_request)

    with patch("app.routers.ats_checker._get_gemini_key", return_value="test-key"):
        with patch("httpx.AsyncClient.post", new_callable=AsyncMock, return_value=mock_resp):
            r = client.post(
                "/api/ats/check",
                json={"resume_text": "John Doe, Software Engineer", "job_description": "Looking for a Python developer"},
            )
            assert r.status_code == 200
            data = r.json()
            assert data["score"] == 72
            assert data["ai_generated"] is True
            assert "Python" in data["keyword_matches"]
            assert "Docker" in data["missing_keywords"]
            assert len(data["suggestions"]) > 0


def test_ats_check_gemini_error(client):
    async def raise_error(*args, **kwargs):
        raise httpx.HTTPStatusError(
            "Server error",
            request=httpx.Request("POST", "https://example.com"),
            response=httpx.Response(500),
        )

    with patch("app.routers.ats_checker._get_gemini_key", return_value="test-key"):
        with patch("httpx.AsyncClient.post", new_callable=AsyncMock, side_effect=raise_error):
            r = client.post(
                "/api/ats/check",
                json={"resume_text": "Some resume text"},
            )
            assert r.status_code == 502
            assert "AI service error" in r.json()["detail"]


def test_ats_check_invalid_body(client):
    r = client.post("/api/ats/check", json={})
    assert r.status_code == 422


def test_ats_check_strips_markdown_fences(client):
    ai_result = {
        "score": 65,
        "summary": "Average resume.",
        "keyword_matches": ["Java"],
        "missing_keywords": ["Spring"],
        "suggestions": ["Add Spring framework"],
        "section_scores": {"contact": 80, "skills": 60},
    }
    fenced_text = f"```json\n{json.dumps(ai_result)}\n```"
    mock_gemini_response = {
        "candidates": [
            {"content": {"parts": [{"text": fenced_text}]}}
        ]
    }
    mock_request = httpx.Request("POST", "https://generativelanguage.googleapis.com/v1beta/models/gemini-3.8-flash:generateContent")
    mock_resp = httpx.Response(200, json=mock_gemini_response, request=mock_request)

    with patch("app.routers.ats_checker._get_gemini_key", return_value="test-key"):
        with patch("httpx.AsyncClient.post", new_callable=AsyncMock, return_value=mock_resp):
            r = client.post(
                "/api/ats/check",
                json={"resume_text": "Java developer with 5 years experience"},
            )
            assert r.status_code == 200
            assert r.json()["score"] == 65
