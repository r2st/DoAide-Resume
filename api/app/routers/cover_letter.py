import os
import httpx
from fastapi import APIRouter, HTTPException
from pydantic import BaseModel

router = APIRouter(tags=["cover_letter"])

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


class CoverLetterRequest(BaseModel):
    job_title: str
    company: str
    qualifications: str = ""
    experience_years: str = ""
    tone: str = "professional"


class CoverLetterResponse(BaseModel):
    cover_letter: str
    word_count: int
    ai_generated: bool


SYSTEM_PROMPT = """You are a professional cover letter writer. Write a tailored, compelling cover letter based on the provided details. Requirements:
- 250-350 words
- Professional format with greeting, 3-4 paragraphs, and closing
- Highlight relevant qualifications and enthusiasm for the role
- Use the specified tone
- Do NOT include placeholder brackets like [Your Name] - use realistic phrasing
- Start with "Dear Hiring Manager," unless a specific name is given
- End with "Sincerely," followed by a blank line for the signature

Return ONLY the cover letter text, no extra commentary."""


@router.post("/cover-letter/generate", response_model=CoverLetterResponse)
async def generate_cover_letter(req: CoverLetterRequest):
    api_key = _get_gemini_key()
    if not api_key:
        raise HTTPException(status_code=503, detail="AI service not configured")

    if not req.job_title.strip() or not req.company.strip():
        raise HTTPException(status_code=400, detail="Job title and company are required")

    parts = [f"Job Title: {req.job_title}", f"Company: {req.company}"]
    if req.qualifications.strip():
        parts.append(f"Key Qualifications: {req.qualifications}")
    if req.experience_years.strip():
        parts.append(f"Years of Experience: {req.experience_years}")
    parts.append(f"Tone: {req.tone}")

    user_prompt = "\n".join(parts)

    contents = [
        {"role": "user", "parts": [{"text": SYSTEM_PROMPT}]},
        {"role": "model", "parts": [{"text": "Understood. I will write a tailored cover letter."}]},
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
            text = data["candidates"][0]["content"]["parts"][0]["text"].strip()
            word_count = len(text.split())
            return CoverLetterResponse(
                cover_letter=text,
                word_count=word_count,
                ai_generated=True,
            )
    except httpx.HTTPStatusError as e:
        raise HTTPException(status_code=502, detail=f"AI service error: {e.response.status_code}")
    except Exception as e:
        raise HTTPException(status_code=502, detail=f"AI service error: {str(e)}")
