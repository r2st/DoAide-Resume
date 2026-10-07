import os
import httpx
from fastapi import APIRouter, HTTPException
from pydantic import BaseModel

router = APIRouter(tags=["ai"])

OPENROUTER_URL = "https://openrouter.ai/api/v1/chat/completions"
MODEL = "mistralai/mistral-7b-instruct:free"


def _get_api_key() -> str | None:
    return os.environ.get("OPENROUTER_API_KEY")


async def _call_openrouter(system_prompt: str, user_prompt: str) -> str | None:
    api_key = _get_api_key()
    if not api_key:
        return None

    headers = {
        "Authorization": f"Bearer {api_key}",
        "Content-Type": "application/json",
        "HTTP-Referer": "https://resume.doaide.com",
        "X-Title": "DoAide Resume",
    }
    payload = {
        "model": MODEL,
        "messages": [
            {"role": "system", "content": system_prompt},
            {"role": "user", "content": user_prompt},
        ],
        "max_tokens": 512,
        "temperature": 0.7,
    }

    try:
        async with httpx.AsyncClient(timeout=30.0) as client:
            response = await client.post(OPENROUTER_URL, json=payload, headers=headers)
            response.raise_for_status()
            data = response.json()
            return data["choices"][0]["message"]["content"].strip()
    except Exception:
        return None


# ---------------------------------------------------------------------------
# POST /api/ai/enhance-bullet
# ---------------------------------------------------------------------------

class EnhanceBulletRequest(BaseModel):
    text: str


class EnhanceBulletResponse(BaseModel):
    original: str
    enhanced: str
    ai_generated: bool


@router.post("/ai/enhance-bullet", response_model=EnhanceBulletResponse)
async def enhance_bullet(req: EnhanceBulletRequest):
    system = (
        "You are a professional resume writer. Improve the given resume bullet point "
        "to be more impactful using action verbs, quantifiable results, and concise language. "
        "Return ONLY the improved bullet point, nothing else."
    )
    result = await _call_openrouter(system, req.text)

    if result:
        return EnhanceBulletResponse(original=req.text, enhanced=result, ai_generated=True)

    # Fallback without AI
    tips = (
        "Tip: Start with a strong action verb (Led, Designed, Implemented). "
        "Add metrics where possible (increased revenue by 20%). "
        "Keep it concise and results-focused."
    )
    return EnhanceBulletResponse(original=req.text, enhanced=tips, ai_generated=False)


# ---------------------------------------------------------------------------
# POST /api/ai/suggest-skills
# ---------------------------------------------------------------------------

class SuggestSkillsRequest(BaseModel):
    job_title: str


class SuggestSkillsResponse(BaseModel):
    job_title: str
    skills: list[str]
    ai_generated: bool


FALLBACK_SKILLS = {
    "default": [
        "Communication", "Problem Solving", "Teamwork", "Time Management",
        "Critical Thinking", "Adaptability", "Leadership", "Attention to Detail",
    ],
    "software engineer": [
        "Python", "JavaScript", "SQL", "Git", "REST APIs", "System Design",
        "Data Structures", "Algorithms", "CI/CD", "Cloud Services (AWS/GCP)",
    ],
    "data scientist": [
        "Python", "R", "SQL", "Machine Learning", "TensorFlow", "Pandas",
        "Data Visualization", "Statistical Analysis", "Deep Learning", "NLP",
    ],
    "product manager": [
        "Product Strategy", "Agile/Scrum", "User Research", "Roadmapping",
        "A/B Testing", "Stakeholder Management", "SQL", "Wireframing", "Jira", "Analytics",
    ],
}


@router.post("/ai/suggest-skills", response_model=SuggestSkillsResponse)
async def suggest_skills(req: SuggestSkillsRequest):
    system = (
        "You are a career advisor. Given a job title, suggest 10 relevant technical and soft skills "
        "for a resume. Return ONLY a comma-separated list of skills, nothing else."
    )
    result = await _call_openrouter(system, f"Job title: {req.job_title}")

    if result:
        skills = [s.strip() for s in result.split(",") if s.strip()]
        return SuggestSkillsResponse(job_title=req.job_title, skills=skills[:10], ai_generated=True)

    # Fallback
    key = req.job_title.lower().strip()
    skills = FALLBACK_SKILLS.get(key, FALLBACK_SKILLS["default"])
    return SuggestSkillsResponse(job_title=req.job_title, skills=skills, ai_generated=False)


# ---------------------------------------------------------------------------
# POST /api/ai/ats-optimize
# ---------------------------------------------------------------------------

class ATSOptimizeRequest(BaseModel):
    resume_text: str
    job_description: str


class ATSOptimizeResponse(BaseModel):
    suggestions: list[str]
    keyword_matches: list[str]
    missing_keywords: list[str]
    ai_generated: bool


@router.post("/ai/ats-optimize", response_model=ATSOptimizeResponse)
async def ats_optimize(req: ATSOptimizeRequest):
    system = (
        "You are an ATS optimization expert. Analyze the resume against the job description. "
        "Return your analysis in this exact format:\n"
        "SUGGESTIONS: suggestion1 | suggestion2 | suggestion3\n"
        "MATCHING_KEYWORDS: keyword1 | keyword2\n"
        "MISSING_KEYWORDS: keyword1 | keyword2"
    )
    user_prompt = f"RESUME:\n{req.resume_text}\n\nJOB DESCRIPTION:\n{req.job_description}"
    result = await _call_openrouter(system, user_prompt)

    if result:
        suggestions = []
        keyword_matches = []
        missing_keywords = []
        for line in result.split("\n"):
            line = line.strip()
            if line.upper().startswith("SUGGESTIONS:"):
                suggestions = [s.strip() for s in line.split(":", 1)[1].split("|") if s.strip()]
            elif line.upper().startswith("MATCHING_KEYWORDS:"):
                keyword_matches = [s.strip() for s in line.split(":", 1)[1].split("|") if s.strip()]
            elif line.upper().startswith("MISSING_KEYWORDS:"):
                missing_keywords = [s.strip() for s in line.split(":", 1)[1].split("|") if s.strip()]
        return ATSOptimizeResponse(
            suggestions=suggestions or ["Review your resume for keyword alignment with the job description."],
            keyword_matches=keyword_matches,
            missing_keywords=missing_keywords,
            ai_generated=True,
        )

    # Fallback
    return ATSOptimizeResponse(
        suggestions=[
            "Use keywords from the job description throughout your resume.",
            "Match your job titles closely to the role you are applying for.",
            "Include measurable achievements (numbers, percentages, dollar amounts).",
            "Use standard section headings: Experience, Education, Skills.",
            "Avoid graphics, tables, and columns that ATS cannot parse.",
        ],
        keyword_matches=[],
        missing_keywords=[],
        ai_generated=False,
    )


# ---------------------------------------------------------------------------
# POST /api/ai/generate-summary
# ---------------------------------------------------------------------------

class GenerateSummaryRequest(BaseModel):
    job_title: str
    years_experience: int | None = None
    key_skills: list[str] | None = None
    industry: str | None = None


class GenerateSummaryResponse(BaseModel):
    summary: str
    ai_generated: bool


@router.post("/ai/generate-summary", response_model=GenerateSummaryResponse)
async def generate_summary(req: GenerateSummaryRequest):
    system = (
        "You are a professional resume writer. Write a compelling 2-3 sentence professional summary "
        "for a resume based on the provided career information. Return ONLY the summary, nothing else."
    )
    parts = [f"Job title: {req.job_title}"]
    if req.years_experience is not None:
        parts.append(f"Years of experience: {req.years_experience}")
    if req.key_skills:
        parts.append(f"Key skills: {', '.join(req.key_skills)}")
    if req.industry:
        parts.append(f"Industry: {req.industry}")

    user_prompt = "\n".join(parts)
    result = await _call_openrouter(system, user_prompt)

    if result:
        return GenerateSummaryResponse(summary=result, ai_generated=True)

    # Fallback
    exp = f" with {req.years_experience}+ years of experience" if req.years_experience else ""
    skills = f" skilled in {', '.join(req.key_skills[:3])}" if req.key_skills else ""
    industry_text = f" in the {req.industry} industry" if req.industry else ""
    fallback = (
        f"Results-driven {req.job_title}{exp}{industry_text}. "
        f"Proven track record of delivering impactful solutions{skills}. "
        f"Seeking to leverage expertise to drive success in a challenging new role."
    )
    return GenerateSummaryResponse(summary=fallback, ai_generated=False)
