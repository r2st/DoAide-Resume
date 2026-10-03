import re
from app.models import SectionScore, ATSScoreResult, KeywordMatch, JobMatchResult, ResumeTip, ResumeTipsResult


def _has_contact_info(text: str) -> dict:
    email = bool(re.search(r"[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}", text))
    phone = bool(re.search(r"[\+]?[\d\s\-\(\)]{7,15}", text))
    linkedin = bool(re.search(r"linkedin\.com/in/", text, re.IGNORECASE))
    return {"email": email, "phone": phone, "linkedin": linkedin}


def _check_sections(text: str) -> dict:
    text_lower = text.lower()
    sections = {
        "experience": any(k in text_lower for k in ["experience", "work history", "employment", "professional experience"]),
        "education": any(k in text_lower for k in ["education", "academic", "degree", "university", "college"]),
        "skills": any(k in text_lower for k in ["skills", "technical skills", "competencies", "proficiencies"]),
        "summary": any(k in text_lower for k in ["summary", "objective", "profile", "about me", "professional summary"]),
    }
    return sections


def _check_formatting(text: str) -> dict:
    lines = text.strip().split("\n")
    word_count = len(text.split())
    has_bullets = any(line.strip().startswith(("•", "-", "*", "·")) for line in lines)
    has_dates = bool(re.search(r"\b(19|20)\d{2}\b", text))
    has_action_verbs = bool(re.search(
        r"\b(managed|led|developed|created|implemented|designed|built|achieved|improved|increased|decreased|delivered|launched|organized|coordinated|analyzed|established)\b",
        text, re.IGNORECASE
    ))
    return {
        "word_count": word_count,
        "line_count": len(lines),
        "has_bullets": has_bullets,
        "has_dates": has_dates,
        "has_action_verbs": has_action_verbs,
        "optimal_length": 300 <= word_count <= 1000,
    }


def _check_ats_issues(text: str) -> list[str]:
    issues = []
    if "\t" in text:
        issues.append("Contains tab characters that may confuse ATS parsers")
    if re.search(r"[│┃┆┇┊┋╎╏║]", text):
        issues.append("Contains table/box-drawing characters — use simple text formatting")
    if len(re.findall(r"[^\x00-\x7F]", text)) > 10:
        issues.append("Contains many non-ASCII characters — some ATS systems may not parse them correctly")
    if re.search(r"(\.{3,}|_{3,}|-{5,})", text):
        issues.append("Contains filler characters (dots, underscores) that ATS may misread")
    lines = text.split("\n")
    all_caps_lines = sum(1 for l in lines if l.strip() and l.strip() == l.strip().upper() and len(l.strip()) > 3)
    if all_caps_lines > 5:
        issues.append("Excessive ALL CAPS text — use title case for headings")
    return issues


def score_resume(text: str) -> ATSScoreResult:
    contact = _has_contact_info(text)
    sections = _check_sections(text)
    formatting = _check_formatting(text)
    ats_issues = _check_ats_issues(text)

    section_scores = []

    contact_score = sum([contact["email"] * 5, contact["phone"] * 3, contact["linkedin"] * 2])
    contact_feedback = []
    if not contact["email"]:
        contact_feedback.append("Missing email address")
    if not contact["phone"]:
        contact_feedback.append("Missing phone number")
    if not contact["linkedin"]:
        contact_feedback.append("Consider adding LinkedIn profile URL")
    section_scores.append(SectionScore(
        name="Contact Information",
        score=contact_score,
        max_score=10,
        feedback="; ".join(contact_feedback) if contact_feedback else "Contact information looks complete"
    ))

    exp_score = 0
    exp_feedback = []
    if sections["experience"]:
        exp_score += 10
        if formatting["has_dates"]:
            exp_score += 5
        else:
            exp_feedback.append("Add dates to your experience entries")
        if formatting["has_action_verbs"]:
            exp_score += 5
        else:
            exp_feedback.append("Use strong action verbs (managed, developed, led)")
        if formatting["has_bullets"]:
            exp_score += 5
        else:
            exp_feedback.append("Use bullet points for readability")
    else:
        exp_feedback.append("Missing experience/work history section")
    section_scores.append(SectionScore(
        name="Work Experience",
        score=min(exp_score, 25),
        max_score=25,
        feedback="; ".join(exp_feedback) if exp_feedback else "Experience section is well-structured"
    ))

    edu_score = 15 if sections["education"] else 0
    section_scores.append(SectionScore(
        name="Education",
        score=edu_score,
        max_score=15,
        feedback="Education section present" if sections["education"] else "Missing education section"
    ))

    skills_score = 15 if sections["skills"] else 0
    section_scores.append(SectionScore(
        name="Skills",
        score=skills_score,
        max_score=15,
        feedback="Skills section present" if sections["skills"] else "Missing skills section — ATS systems scan for specific skill keywords"
    ))

    summary_score = 10 if sections["summary"] else 0
    section_scores.append(SectionScore(
        name="Professional Summary",
        score=summary_score,
        max_score=10,
        feedback="Summary/objective present" if sections["summary"] else "Add a professional summary at the top"
    ))

    length_score = 0
    if formatting["optimal_length"]:
        length_score = 15
        length_fb = "Resume length is optimal"
    elif formatting["word_count"] < 300:
        length_score = 5
        length_fb = f"Resume is too short ({formatting['word_count']} words). Aim for 300-1000 words."
    elif formatting["word_count"] > 1000:
        length_score = 10
        length_fb = f"Resume is long ({formatting['word_count']} words). Consider condensing to 1-2 pages."
    else:
        length_score = 15
        length_fb = "Resume length is acceptable"
    section_scores.append(SectionScore(
        name="Length & Format",
        score=length_score,
        max_score=15,
        feedback=length_fb
    ))

    ats_compat_score = 10 - min(len(ats_issues) * 2, 10)
    section_scores.append(SectionScore(
        name="ATS Compatibility",
        score=max(ats_compat_score, 0),
        max_score=10,
        feedback="; ".join(ats_issues) if ats_issues else "No ATS compatibility issues detected"
    ))

    overall = sum(s.score for s in section_scores)

    top_issues = []
    for s in section_scores:
        if s.score < s.max_score:
            top_issues.append(f"{s.name}: {s.feedback}")
    top_issues = top_issues[:5]

    if overall >= 80:
        summary = "Your resume is well-optimized for ATS systems."
    elif overall >= 60:
        summary = "Your resume has a good foundation but needs some improvements for better ATS compatibility."
    elif overall >= 40:
        summary = "Your resume needs significant improvements to pass ATS screening."
    else:
        summary = "Your resume needs major revisions to be ATS-compatible. Focus on adding missing sections and proper formatting."

    return ATSScoreResult(
        overall_score=overall,
        sections=section_scores,
        summary=summary,
        top_issues=top_issues,
    )


def match_job(resume_text: str, job_description: str) -> JobMatchResult:
    jd_lower = job_description.lower()
    resume_lower = resume_text.lower()

    jd_words = set(re.findall(r"\b[a-z]{3,}\b", jd_lower))
    stop_words = {
        "the", "and", "for", "are", "but", "not", "you", "all", "can", "had", "her",
        "was", "one", "our", "out", "day", "get", "has", "him", "his", "how", "its",
        "may", "new", "now", "old", "see", "way", "who", "boy", "did", "let", "put",
        "say", "she", "too", "use", "with", "have", "from", "this", "that", "will",
        "been", "call", "each", "make", "like", "long", "look", "many", "most",
        "over", "such", "take", "than", "them", "then", "they", "time", "very",
        "when", "come", "could", "just", "into", "more", "some", "what", "about",
        "which", "would", "there", "their", "other", "were", "also", "able",
        "work", "working", "must", "should", "including", "within", "based",
        "role", "position", "looking", "join", "team", "company", "experience",
        "year", "years", "strong", "well", "great", "good", "best", "please",
        "apply", "equal", "opportunity", "employer",
    }
    keywords = [w for w in jd_words if w not in stop_words and len(w) > 2]

    freq = {}
    for w in re.findall(r"\b[a-z]{3,}\b", jd_lower):
        if w not in stop_words:
            freq[w] = freq.get(w, 0) + 1
    top_keywords = sorted(freq.items(), key=lambda x: -x[1])[:40]
    keywords = [k for k, _ in top_keywords]

    matched = []
    missing = []
    for kw in keywords:
        found = kw in resume_lower
        matched.append(KeywordMatch(keyword=kw, found=found))
        if not found:
            missing.append(kw)

    if keywords:
        match_pct = int((len(keywords) - len(missing)) / len(keywords) * 100)
    else:
        match_pct = 0

    suggestions = []
    if missing:
        top_missing = missing[:10]
        suggestions.append(f"Add these missing keywords to your resume: {', '.join(top_missing)}")
    if match_pct < 50:
        suggestions.append("Your resume needs significant tailoring for this role")
    if match_pct >= 70:
        suggestions.append("Good keyword match — focus on quantifying your achievements")

    if match_pct >= 80:
        summary = "Excellent match! Your resume aligns very well with this job description."
    elif match_pct >= 60:
        summary = "Good match with room for improvement. Add missing keywords where relevant."
    elif match_pct >= 40:
        summary = "Moderate match. Consider tailoring your resume more specifically to this role."
    else:
        summary = "Low match. Your resume needs significant customization for this position."

    return JobMatchResult(
        match_percentage=match_pct,
        matched_keywords=matched,
        missing_keywords=missing[:15],
        suggestions=suggestions,
        summary=summary,
    )


def get_resume_tips(text: str) -> ResumeTipsResult:
    contact = _has_contact_info(text)
    sections = _check_sections(text)
    formatting = _check_formatting(text)

    tips = []

    if not contact["email"]:
        tips.append(ResumeTip(category="Contact", tip="Add a professional email address", priority="high"))
    if not contact["phone"]:
        tips.append(ResumeTip(category="Contact", tip="Include a phone number", priority="high"))
    if not contact["linkedin"]:
        tips.append(ResumeTip(category="Contact", tip="Add your LinkedIn profile URL", priority="medium"))

    if not sections["summary"]:
        tips.append(ResumeTip(category="Content", tip="Add a professional summary (2-3 sentences) at the top of your resume", priority="high"))
    if not sections["skills"]:
        tips.append(ResumeTip(category="Content", tip="Create a dedicated Skills section with relevant technical and soft skills", priority="high"))
    if not sections["experience"]:
        tips.append(ResumeTip(category="Content", tip="Add a detailed work experience section with job titles, companies, and dates", priority="high"))
    if not sections["education"]:
        tips.append(ResumeTip(category="Content", tip="Include your educational background", priority="medium"))

    if not formatting["has_action_verbs"]:
        tips.append(ResumeTip(category="Language", tip="Start bullet points with strong action verbs (Led, Developed, Implemented, Achieved)", priority="high"))
    if not formatting["has_bullets"]:
        tips.append(ResumeTip(category="Formatting", tip="Use bullet points instead of paragraphs for better readability", priority="medium"))
    if not formatting["has_dates"]:
        tips.append(ResumeTip(category="Formatting", tip="Include dates (month/year) for each position and education entry", priority="medium"))
    if not formatting["optimal_length"]:
        if formatting["word_count"] < 300:
            tips.append(ResumeTip(category="Length", tip="Your resume is too short. Add more detail about your experience and achievements.", priority="high"))
        else:
            tips.append(ResumeTip(category="Length", tip="Your resume is long. Trim to the most relevant 1-2 pages.", priority="medium"))

    tips.append(ResumeTip(category="ATS", tip="Use standard section headings (Experience, Education, Skills) for ATS parsing", priority="medium"))
    tips.append(ResumeTip(category="ATS", tip="Avoid images, tables, and graphics — ATS cannot read them", priority="medium"))
    tips.append(ResumeTip(category="Impact", tip="Quantify achievements where possible (e.g., 'Increased sales by 25%')", priority="high"))

    high_priority = sum(1 for t in tips if t.priority == "high")
    if high_priority == 0:
        assessment = "Your resume is well-structured. Focus on fine-tuning the details."
    elif high_priority <= 2:
        assessment = "Your resume has a solid foundation with a few key areas to improve."
    else:
        assessment = "Your resume needs attention in several critical areas. Start with the high-priority items."

    return ResumeTipsResult(tips=tips, overall_assessment=assessment)
