from unittest.mock import patch, AsyncMock
import httpx
import pytest


def test_ask_advisor_missing_key(client):
    with patch("app.routers.advisor._get_gemini_key", return_value=None):
        r = client.post("/api/advisor/ask", json={"message": "Hello"})
        assert r.status_code == 503
        assert "not configured" in r.json()["detail"]


def test_ask_advisor_success(client):
    mock_gemini_response = {
        "candidates": [
            {"content": {"parts": [{"text": "Here is some career advice."}]}}
        ]
    }
    mock_request = httpx.Request("POST", "https://generativelanguage.googleapis.com/v1beta/models/gemini-3.8-flash:generateContent")
    mock_resp = httpx.Response(200, json=mock_gemini_response, request=mock_request)

    with patch("app.routers.advisor._get_gemini_key", return_value="test-key"):
        with patch("httpx.AsyncClient.post", new_callable=AsyncMock, return_value=mock_resp):
            r = client.post(
                "/api/advisor/ask",
                json={"message": "How do I prepare for interviews?"},
            )
            assert r.status_code == 200
            assert r.json()["reply"] == "Here is some career advice."


def test_ask_advisor_with_history(client):
    mock_gemini_response = {
        "candidates": [
            {"content": {"parts": [{"text": "Follow-up advice."}]}}
        ]
    }
    mock_request = httpx.Request("POST", "https://generativelanguage.googleapis.com/v1beta/models/gemini-3.8-flash:generateContent")
    mock_resp = httpx.Response(200, json=mock_gemini_response, request=mock_request)

    with patch("app.routers.advisor._get_gemini_key", return_value="test-key"):
        with patch("httpx.AsyncClient.post", new_callable=AsyncMock, return_value=mock_resp) as mock_post:
            r = client.post(
                "/api/advisor/ask",
                json={
                    "message": "What about salary?",
                    "history": [
                        {"role": "user", "text": "Hi"},
                        {"role": "assistant", "text": "Hello!"},
                    ],
                },
            )
            assert r.status_code == 200
            assert r.json()["reply"] == "Follow-up advice."
            call_kwargs = mock_post.call_args
            body = call_kwargs.kwargs.get("json") or call_kwargs[1].get("json")
            roles = [c["role"] for c in body["contents"]]
            assert roles[-1] == "user"


def test_ask_advisor_gemini_error(client):
    async def raise_error(*args, **kwargs):
        raise httpx.HTTPStatusError(
            "Server error",
            request=httpx.Request("POST", "https://example.com"),
            response=httpx.Response(500),
        )

    with patch("app.routers.advisor._get_gemini_key", return_value="test-key"):
        with patch("httpx.AsyncClient.post", new_callable=AsyncMock, side_effect=raise_error):
            r = client.post(
                "/api/advisor/ask",
                json={"message": "Help me"},
            )
            assert r.status_code == 502
            assert "AI service error" in r.json()["detail"]


def test_ask_advisor_invalid_body(client):
    r = client.post("/api/advisor/ask", json={})
    assert r.status_code == 422
