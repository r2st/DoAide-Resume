import os
import httpx
from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import List, Optional

router = APIRouter(tags=["advisor"])

GEMINI_MODEL = "gemini-3.8-flash"
GEMINI_URL = f"https://generativelanguage.googleapis.com/v1beta/models/{GEMINI_MODEL}:generateContent"

SYSTEM_PROMPT = (
    "You are a career advisor helping Indian job seekers with resume writing, "
    "interview preparation, salary negotiation, and career planning. "
    "Give practical, actionable advice. Keep responses concise (under 200 words). "
    "Use simple language. When relevant, mention Indian-specific context like "
    "Naukri, LinkedIn India, campus placements, GATE, CAT, etc."
)


def _get_gemini_key() -> str | None:
    key = os.environ.get("GEMINI_API_KEY")
    if key:
        return key
    key_file = os.path.join(os.path.dirname(__file__), "..", "..", "keys", "gemini-api-key")
    try:
        with open(key_file) as f:
            return f.read().strip()
    except FileNotFoundError:
        return None


class HistoryItem(BaseModel):
    role: str
    text: str


class AdvisorRequest(BaseModel):
    message: str
    history: Optional[List[HistoryItem]] = None


class AdvisorResponse(BaseModel):
    reply: str


@router.post("/advisor/ask", response_model=AdvisorResponse)
async def ask_advisor(req: AdvisorRequest):
    api_key = _get_gemini_key()
    if not api_key:
        raise HTTPException(status_code=503, detail="AI advisor not configured")

    contents = [{"role": "user", "parts": [{"text": SYSTEM_PROMPT}]},
                {"role": "model", "parts": [{"text": "Understood. I'm ready to help with career advice."}]}]

    if req.history:
        for item in req.history[-6:]:
            role = "user" if item.role == "user" else "model"
            contents.append({"role": role, "parts": [{"text": item.text}]})

    contents.append({"role": "user", "parts": [{"text": req.message}]})

    try:
        async with httpx.AsyncClient(timeout=30.0) as client:
            resp = await client.post(
                f"{GEMINI_URL}?key={api_key}",
                json={"contents": contents},
                headers={"Content-Type": "application/json"},
            )
            resp.raise_for_status()
            data = resp.json()
            reply = data["candidates"][0]["content"]["parts"][0]["text"]
            return AdvisorResponse(reply=reply)
    except Exception as e:
        raise HTTPException(status_code=502, detail=f"AI service error: {str(e)}")
