import json
import os
import re

import httpx
from fastapi import APIRouter, HTTPException
from pydantic import BaseModel, Field

router = APIRouter(tags=["interview_questions"])

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


class InterviewQuestionsRequest(BaseModel):
    resume_text: str = Field(..., max_length=MAX_RESUME_CHARS)
    target_role: str = Field("", max_length=200)


class InterviewQuestion(BaseModel):
    category: str
    question: str
    hint: str


class InterviewQuestionsResponse(BaseModel):
    questions: list[InterviewQuestion]
    ai_generated: bool = True


SYSTEM_PROMPT = """You are an experienced interviewer preparing questions for a candidate
based on their resume. Generate 10-12 interview questions they are genuinely likely to face,
grounded in the specific projects, companies, skills and gaps visible in the resume.

Return ONLY a JSON object (no markdown fences, no commentary):
{
  "questions": [
    {"category": "<one of: Resume Deep-Dive, Technical, Behavioral, Role Fit>",
     "question": "<the question, referencing their actual resume content where possible>",
     "hint": "<1-2 sentences on how to answer it well>"}
  ]
}

Mix categories. Make Resume Deep-Dive questions cite specifics from the resume
(a project, an employment gap, a tech choice). If a target role is given, bias
Technical and Role Fit questions toward it."""


def _extract_json(text: str) -> dict:
    text = text.strip()
    fence = re.search(r"```(?:json)?\s*([\s\S]*?)```", text)
    if fence:
        text = fence.group(1).strip()
    start = text.find("{")
    end = text.rfind("}")
    if start == -1 or end == -1 or end <= start:
        raise ValueError("no JSON object in model reply")
    return json.loads(text[start:end + 1])


@router.post("/interview-questions/generate", response_model=InterviewQuestionsResponse)
async def generate_questions(req: InterviewQuestionsRequest):
    api_key = _get_gemini_key()
    if not api_key:
        raise HTTPException(status_code=503, detail="AI service not configured")

    resume_text = req.resume_text.strip()
    if len(resume_text) < 100:
        raise HTTPException(status_code=400, detail="Resume text is too short (minimum 100 characters)")

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
        questions = [
            InterviewQuestion(
                category=str(q.get("category", "General")),
                question=str(q.get("question", "")),
                hint=str(q.get("hint", "")),
            )
            for q in parsed.get("questions", [])
            if q.get("question")
        ]
        if not questions:
            raise ValueError("model returned no questions")
        return InterviewQuestionsResponse(questions=questions)
    except (ValueError, KeyError, TypeError) as e:
        raise HTTPException(status_code=502, detail=f"AI returned an unexpected format: {str(e)}")
