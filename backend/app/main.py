import hashlib
import json
from datetime import datetime, timezone
from pathlib import Path
from contextlib import asynccontextmanager

from fastapi import FastAPI, UploadFile, File, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field

from app.database import init_db, get_db
from app.models import (
    ResumeTextInput, JobMatchInput, ResumeBuilderInput,
    ATSScoreResult, JobMatchResult, ResumeTipsResult,
)
from app.scorer import score_resume, match_job, get_resume_tips
from app.ai_builder import generate_resume_sections

FEEDBACK_FILE = Path(__file__).resolve().parent.parent / "feedback.json"


class FeedbackInput(BaseModel):
    message: str = Field(..., min_length=1, max_length=2000)


@asynccontextmanager
async def lifespan(app: FastAPI):
    await init_db()
    yield


app = FastAPI(
    title="DoAide Resume AI",
    description="ATS Resume Scorer & AI Resume Builder API",
    version="1.0.0",
    lifespan=lifespan,
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/health")
async def health():
    return {"status": "ok", "service": "DoAide Resume AI"}


async def _extract_file_text(file: UploadFile) -> str:
    content = await file.read()
    filename = file.filename or ""

    if filename.endswith(".txt"):
        return content.decode("utf-8", errors="replace")

    if filename.endswith(".pdf"):
        try:
            import io
            from PyPDF2 import PdfReader
            reader = PdfReader(io.BytesIO(content))
            text = ""
            for page in reader.pages:
                text += page.extract_text() or ""
            return text
        except Exception:
            raise HTTPException(status_code=400, detail="Could not parse PDF file")

    if filename.endswith(".docx"):
        try:
            import io
            from docx import Document
            doc = Document(io.BytesIO(content))
            return "\n".join(p.text for p in doc.paragraphs)
        except Exception:
            raise HTTPException(status_code=400, detail="Could not parse DOCX file")

    return content.decode("utf-8", errors="replace")


async def _save_history(db, analysis_type: str, text: str, score: int, result: dict):
    input_hash = hashlib.md5(text.encode()).hexdigest()
    await db.execute(
        "INSERT INTO analysis_history (type, input_hash, score, result_json) VALUES (?, ?, ?, ?)",
        (analysis_type, input_hash, score, json.dumps(result)),
    )
    await db.commit()


@app.post("/api/ats-score", response_model=ATSScoreResult)
async def ats_score_text(input_data: ResumeTextInput):
    result = score_resume(input_data.text)
    async for db in get_db():
        await _save_history(db, "ats_score", input_data.text, result.overall_score, result.model_dump())
    return result


@app.post("/api/ats-score/upload", response_model=ATSScoreResult)
async def ats_score_upload(file: UploadFile = File(...)):
    text = await _extract_file_text(file)
    if len(text.strip()) < 10:
        raise HTTPException(status_code=400, detail="File appears to be empty or unreadable")
    result = score_resume(text)
    async for db in get_db():
        await _save_history(db, "ats_score", text, result.overall_score, result.model_dump())
    return result


@app.post("/api/job-match", response_model=JobMatchResult)
async def job_match(input_data: JobMatchInput):
    result = match_job(input_data.resume_text, input_data.job_description)
    async for db in get_db():
        await _save_history(db, "job_match", input_data.resume_text, result.match_percentage, result.model_dump())
    return result


@app.post("/api/resume-builder")
async def resume_builder(input_data: ResumeBuilderInput):
    result = await generate_resume_sections(input_data.model_dump())
    return result


@app.post("/api/resume-tips", response_model=ResumeTipsResult)
async def resume_tips(input_data: ResumeTextInput):
    result = get_resume_tips(input_data.text)
    return result


@app.get("/api/history")
async def get_history(limit: int = 20):
    async for db in get_db():
        cursor = await db.execute(
            "SELECT id, type, score, created_at FROM analysis_history ORDER BY created_at DESC LIMIT ?",
            (limit,),
        )
        rows = await cursor.fetchall()
        return [{"id": r[0], "type": r[1], "score": r[2], "created_at": r[3]} for r in rows]


@app.post("/api/feedback")
async def submit_feedback(input_data: FeedbackInput):
    entry = {
        "message": input_data.message,
        "timestamp": datetime.now(timezone.utc).isoformat(),
    }
    data = []
    if FEEDBACK_FILE.exists():
        try:
            data = json.loads(FEEDBACK_FILE.read_text())
        except (json.JSONDecodeError, OSError):
            data = []
    data.append(entry)
    FEEDBACK_FILE.write_text(json.dumps(data, indent=2))
    return {"status": "ok"}
