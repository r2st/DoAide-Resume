import json
import os
import re

import httpx
from fastapi import APIRouter, HTTPException
from pydantic import BaseModel, Field

router = APIRouter(tags=["resume_score"])

GEMINI_MODEL = "gemini-3.8-flash"
GEMINI_URL = f"https://generativelanguage.googleapis.com/v1beta/models/{GEMINI_MODEL}:generateContent"

MAX_RESUME_CHARS = 15000


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


class ResumeScoreRequest(BaseModel):
    resume_text: str = Field(..., max_length=MAX_RESUME_CHARS)
    target_role: str = Field("", max_length=200)


class SectionScore(BaseModel):
    section: str
    score: int
    feedback: str


class ResumeScoreResponse(BaseModel):
    score: int
    grade: str
    summary: str
    sections: list[SectionScore]
    strengths: list[str]
    improvements: list[str]
    ai_generated: bool = True


SYSTEM_PROMPT = """You are an expert resume reviewer for the Indian job market. Grade the resume below.

Return ONLY a JSON object (no markdown fences, no commentary) with exactly these keys:
{
  "score": <integer 0-100, overall quality>,
  "grade": "<one of: A+, A, B+, B, C+, C, D>",
  "summary": "<2-3 sentence overall verdict>",
  "sections": [
    {"section": "<name, e.g. Contact Info, Summary, Experience, Education, Skills, Formatting>",
     "score": <integer 0-100>,
     "feedback": "<1-2 specific sentences>"}
  ],
  "strengths": ["<specific strength>", ...3-5 items],
  "improvements": ["<specific, actionable improvement>", ...3-6 items]
}

Grade strictly: quantified achievements, strong action verbs, ATS-friendly structure,
relevance to the target role (if given), and absence of filler. Mention Indian-market
specifics (Naukri keywords, fresher norms) only where relevant."""


def _extract_json(text: str) -> dict:
    """Gemini sometimes wraps JSON in ``` fences or adds stray text — dig the object out."""
    text = text.strip()
    fence = re.search(r"```(?:json)?\s*([\s\S]*?)```", text)
    if fence:
        text = fence.group(1).strip()
    start = text.find("{")
    end = text.rfind("}")
    if start == -1 or end == -1 or end <= start:
        raise ValueError("no JSON object in model reply")
    return json.loads(text[start:end + 1])


@router.post("/resume-score/analyze", response_model=ResumeScoreResponse)
async def analyze_resume(req: ResumeScoreRequest):
    api_key = _get_gemini_key()
    if not api_key:
        raise HTTPException(status_code=503, detail="AI service not configured")

    resume_text = req.resume_text.strip()
    if len(resume_text) < 100:
        raise HTTPException(status_code=400, detail="Resume text is too short to score (minimum 100 characters)")

    user_prompt = f"Resume:\n{resume_text}"
    if req.target_role.strip():
        user_prompt = f"Target role: {req.target_role.strip()}\n\n{user_prompt}"

    contents = [
        {"role": "user", "parts": [{"text": SYSTEM_PROMPT}]},
        {"role": "model", "parts": [{"text": "Understood. I will return only the JSON object."}]},
        {"role": "user", "parts": [{"text": user_prompt}]},
    ]

    try:
        async with httpx.AsyncClient(timeout=45.0) as client:
            resp = await client.post(
                f"{GEMINI_URL}?key={api_key}",
                json={"contents": contents},
                headers={"Content-Type": "application/json"},
            )
            resp.raise_for_status()
            data = resp.json()
            reply = data["candidates"][0]["content"]["parts"][0]["text"]
    except Exception as e:
        raise HTTPException(status_code=502, detail=f"AI service error: {str(e)}")

    try:
        parsed = _extract_json(reply)
        return ResumeScoreResponse(
            score=max(0, min(100, int(parsed["score"]))),
            grade=str(parsed.get("grade", "B")),
            summary=str(parsed.get("summary", "")),
            sections=[
                SectionScore(
                    section=str(s.get("section", "")),
                    score=max(0, min(100, int(s.get("score", 0)))),
                    feedback=str(s.get("feedback", "")),
                )
                for s in parsed.get("sections", [])
            ],
            strengths=[str(s) for s in parsed.get("strengths", [])],
            improvements=[str(s) for s in parsed.get("improvements", [])],
        )
    except (ValueError, KeyError, TypeError) as e:
        raise HTTPException(status_code=502, detail=f"AI returned an unexpected format: {str(e)}")
