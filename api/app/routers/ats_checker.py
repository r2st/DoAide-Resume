import os
import json
import httpx
from fastapi import APIRouter, HTTPException
from pydantic import BaseModel

router = APIRouter(tags=["ats"])

GEMINI_MODEL = "gemini-3.8-flash"
GEMINI_URL = f"https://generativelanguage.googleapis.com/v1beta/models/{GEMINI_MODEL}:generateContent"


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


class AtsCheckRequest(BaseModel):
    resume_text: str
    job_description: str = ""


class AtsCheckResponse(BaseModel):
    score: int
    summary: str
    keyword_matches: list[str]
    missing_keywords: list[str]
    suggestions: list[str]
    section_scores: dict[str, int]
    ai_generated: bool


SYSTEM_PROMPT = """You are an expert ATS (Applicant Tracking System) analyst. Analyze the resume against the job description and return a JSON object with exactly these keys:
- "score": integer 0-100 representing overall ATS compatibility
- "summary": one-sentence summary of the resume's ATS fitness
- "keyword_matches": array of keywords found in both resume and job description
- "missing_keywords": array of important job description keywords missing from resume
- "suggestions": array of 3-5 actionable improvement suggestions
- "section_scores": object with keys "contact", "summary", "experience", "education", "skills", "formatting" each valued 0-100

Return ONLY valid JSON, no markdown fences, no extra text."""


@router.post("/ats/check", response_model=AtsCheckResponse)
async def check_ats(req: AtsCheckRequest):
    api_key = _get_gemini_key()
    if not api_key:
        raise HTTPException(status_code=503, detail="AI service not configured")

    if not req.resume_text.strip():
        raise HTTPException(status_code=400, detail="Resume text is required")

    user_prompt = f"RESUME:\n{req.resume_text[:5000]}"
    if req.job_description.strip():
        user_prompt += f"\n\nJOB DESCRIPTION:\n{req.job_description[:3000]}"
    else:
        user_prompt += "\n\nNo job description provided. Analyze the resume for general ATS compatibility."

    contents = [
        {"role": "user", "parts": [{"text": SYSTEM_PROMPT}]},
        {"role": "model", "parts": [{"text": "Understood. I will analyze the resume and return only valid JSON."}]},
        {"role": "user", "parts": [{"text": user_prompt}]},
    ]

    try:
        async with httpx.AsyncClient(timeout=30.0) as client:
            resp = await client.post(
                f"{GEMINI_URL}?key={api_key}",
                json={"contents": contents},
                headers={"Content-Type": "application/json"},
            )
            resp.raise_for_status()
            data = resp.json()
            text = data["candidates"][0]["content"]["parts"][0]["text"]
            text = text.strip()
            if text.startswith("```"):
                text = text.split("\n", 1)[1] if "\n" in text else text[3:]
                text = text.rsplit("```", 1)[0]
            result = json.loads(text)
            return AtsCheckResponse(
                score=max(0, min(100, int(result.get("score", 50)))),
                summary=str(result.get("summary", "Analysis complete.")),
                keyword_matches=result.get("keyword_matches", [])[:20],
                missing_keywords=result.get("missing_keywords", [])[:20],
                suggestions=result.get("suggestions", [])[:5],
                section_scores=result.get("section_scores", {}),
                ai_generated=True,
            )
    except json.JSONDecodeError:
        raise HTTPException(status_code=502, detail="Failed to parse AI response")
    except httpx.HTTPStatusError as e:
        raise HTTPException(status_code=502, detail=f"AI service error: {e.response.status_code}")
    except Exception as e:
        raise HTTPException(status_code=502, detail=f"AI service error: {str(e)}")
