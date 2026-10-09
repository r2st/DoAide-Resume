from unittest.mock import AsyncMock, patch

import httpx
import pytest


@pytest.mark.anyio
async def test_advisor_missing_api_key(client, monkeypatch):
    monkeypatch.setattr("app.routers.advisor.GEMINI_API_KEY", "")
    res = await client.post("/api/advisor/ask", json={"message": "Hello"})
    assert res.status_code == 500
    assert "not configured" in res.json()["detail"]


@pytest.mark.anyio
async def test_advisor_empty_message(client):
    res = await client.post("/api/advisor/ask", json={"message": ""})
    assert res.status_code == 422


@pytest.mark.anyio
async def test_advisor_missing_message(client):
    res = await client.post("/api/advisor/ask", json={})
    assert res.status_code == 422


@pytest.mark.anyio
async def test_advisor_success(client, monkeypatch):
    monkeypatch.setattr("app.routers.advisor.GEMINI_API_KEY", "test-key")

    gemini_response = httpx.Response(
        200,
        json={
            "candidates": [
                {"content": {"parts": [{"text": "Here is my advice."}]}}
            ]
        },
    )

    with patch("app.routers.advisor.httpx.AsyncClient") as mock_client_cls:
        mock_client = AsyncMock()
        mock_client.post.return_value = gemini_response
        mock_client.__aenter__ = AsyncMock(return_value=mock_client)
        mock_client.__aexit__ = AsyncMock(return_value=False)
        mock_client_cls.return_value = mock_client

        res = await client.post("/api/advisor/ask", json={"message": "How to write a resume?"})

    assert res.status_code == 200
    data = res.json()
    assert data["reply"] == "Here is my advice."


@pytest.mark.anyio
async def test_advisor_with_history(client, monkeypatch):
    monkeypatch.setattr("app.routers.advisor.GEMINI_API_KEY", "test-key")

    gemini_response = httpx.Response(
        200,
        json={
            "candidates": [
                {"content": {"parts": [{"text": "Follow-up advice."}]}}
            ]
        },
    )

    with patch("app.routers.advisor.httpx.AsyncClient") as mock_client_cls:
        mock_client = AsyncMock()
        mock_client.post.return_value = gemini_response
        mock_client.__aenter__ = AsyncMock(return_value=mock_client)
        mock_client.__aexit__ = AsyncMock(return_value=False)
        mock_client_cls.return_value = mock_client

        res = await client.post("/api/advisor/ask", json={
            "message": "What about for IT jobs?",
            "history": [
                {"role": "user", "text": "How to write a resume?"},
                {"role": "assistant", "text": "Start with a summary."},
            ],
        })

    assert res.status_code == 200
    assert res.json()["reply"] == "Follow-up advice."

    call_args = mock_client.post.call_args
    payload = call_args.kwargs.get("json") or call_args[1].get("json")
    assert len(payload["contents"]) == 3


@pytest.mark.anyio
async def test_advisor_gemini_error(client, monkeypatch):
    monkeypatch.setattr("app.routers.advisor.GEMINI_API_KEY", "test-key")

    gemini_response = httpx.Response(500, json={"error": "internal"})

    with patch("app.routers.advisor.httpx.AsyncClient") as mock_client_cls:
        mock_client = AsyncMock()
        mock_client.post.return_value = gemini_response
        mock_client.__aenter__ = AsyncMock(return_value=mock_client)
        mock_client.__aexit__ = AsyncMock(return_value=False)
        mock_client_cls.return_value = mock_client

        res = await client.post("/api/advisor/ask", json={"message": "Hello"})

    assert res.status_code == 502


@pytest.mark.anyio
async def test_advisor_rate_limit(client, monkeypatch):
    monkeypatch.setattr("app.routers.advisor.GEMINI_API_KEY", "test-key")
    monkeypatch.setattr("app.routers.advisor.RATE_LIMIT", 2)

    gemini_response = httpx.Response(
        200,
        json={"candidates": [{"content": {"parts": [{"text": "ok"}]}}]},
    )

    with patch("app.routers.advisor.httpx.AsyncClient") as mock_client_cls:
        mock_client = AsyncMock()
        mock_client.post.return_value = gemini_response
        mock_client.__aenter__ = AsyncMock(return_value=mock_client)
        mock_client.__aexit__ = AsyncMock(return_value=False)
        mock_client_cls.return_value = mock_client

        await client.post("/api/advisor/ask", json={"message": "1"})
        await client.post("/api/advisor/ask", json={"message": "2"})
        res = await client.post("/api/advisor/ask", json={"message": "3"})

    assert res.status_code == 429
    assert "Rate limit" in res.json()["detail"]
