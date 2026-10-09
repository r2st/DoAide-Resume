import json
import pytest


@pytest.mark.anyio
async def test_feedback_submit(client, tmp_path, monkeypatch):
    feedback_file = tmp_path / "feedback.json"
    monkeypatch.setattr("app.main.FEEDBACK_FILE", feedback_file)

    res = await client.post("/api/feedback", json={"message": "Great tool!"})
    assert res.status_code == 200
    assert res.json()["status"] == "ok"

    data = json.loads(feedback_file.read_text())
    assert len(data) == 1
    assert data[0]["message"] == "Great tool!"
    assert "timestamp" in data[0]


@pytest.mark.anyio
async def test_feedback_appends(client, tmp_path, monkeypatch):
    feedback_file = tmp_path / "feedback.json"
    feedback_file.write_text(json.dumps([{"message": "first", "timestamp": "t1"}]))
    monkeypatch.setattr("app.main.FEEDBACK_FILE", feedback_file)

    res = await client.post("/api/feedback", json={"message": "second"})
    assert res.status_code == 200

    data = json.loads(feedback_file.read_text())
    assert len(data) == 2
    assert data[1]["message"] == "second"


@pytest.mark.anyio
async def test_feedback_empty_rejected(client):
    res = await client.post("/api/feedback", json={"message": ""})
    assert res.status_code == 422


@pytest.mark.anyio
async def test_feedback_missing_field(client):
    res = await client.post("/api/feedback", json={})
    assert res.status_code == 422
