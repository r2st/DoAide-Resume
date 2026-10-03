from pydantic import BaseModel, Field


class ResumeTextInput(BaseModel):
    text: str = Field(..., min_length=10, description="Resume text content")


class JobMatchInput(BaseModel):
    resume_text: str = Field(..., min_length=10)
    job_description: str = Field(..., min_length=10)


class ResumeBuilderInput(BaseModel):
    full_name: str
    email: str = ""
    phone: str = ""
    location: str = ""
    summary: str = ""
    experience: list[dict] = Field(default_factory=list)
    education: list[dict] = Field(default_factory=list)
    skills: list[str] = Field(default_factory=list)
    target_role: str = ""


class SectionScore(BaseModel):
    name: str
    score: int
    max_score: int
    feedback: str


class ATSScoreResult(BaseModel):
    overall_score: int
    sections: list[SectionScore]
    summary: str
    top_issues: list[str]


class KeywordMatch(BaseModel):
    keyword: str
    found: bool


class JobMatchResult(BaseModel):
    match_percentage: int
    matched_keywords: list[KeywordMatch]
    missing_keywords: list[str]
    suggestions: list[str]
    summary: str


class ResumeTip(BaseModel):
    category: str
    tip: str
    priority: str


class ResumeTipsResult(BaseModel):
    tips: list[ResumeTip]
    overall_assessment: str
