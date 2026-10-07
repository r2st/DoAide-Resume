from fastapi import APIRouter

router = APIRouter(tags=["seo"])

PAGE_METADATA = [
    {
        "path": "/",
        "title": "DoAide Resume - Free AI Resume Builder | ATS-Friendly Templates",
        "description": "Build professional, ATS-optimized resumes for free with DoAide Resume. AI-powered suggestions, modern templates, and instant PDF export.",
        "keywords": ["free resume builder", "AI resume builder", "ATS-friendly resume", "online resume maker"],
        "og_image": "https://resume.doaide.com/og-home.png",
    },
    {
        "path": "/templates",
        "title": "Free Resume Templates - ATS-Optimized & Professional | DoAide Resume",
        "description": "Choose from professionally designed, ATS-friendly resume templates. Modern, classic, and creative layouts optimized for applicant tracking systems.",
        "keywords": ["resume templates", "free resume templates", "ATS resume templates", "professional resume layout"],
        "og_image": "https://resume.doaide.com/og-templates.png",
    },
    {
        "path": "/ats-checker",
        "title": "Free ATS Resume Checker - Score & Optimize Your Resume | DoAide Resume",
        "description": "Check your resume's ATS compatibility score for free. Get actionable tips to pass applicant tracking systems and land more interviews.",
        "keywords": ["ATS checker", "resume score", "ATS compatibility", "resume optimizer"],
        "og_image": "https://resume.doaide.com/og-ats-checker.png",
    },
    {
        "path": "/guides/resume-writing",
        "title": "How to Write a Resume in 2025 - Complete Guide | DoAide Resume",
        "description": "Step-by-step guide to writing a professional resume. Learn formatting, content tips, and strategies that get you hired.",
        "keywords": ["how to write a resume", "resume writing guide", "resume tips", "resume format"],
        "og_image": "https://resume.doaide.com/og-guide-writing.png",
    },
    {
        "path": "/guides/ats-resume",
        "title": "ATS Resume Guide - Beat Applicant Tracking Systems | DoAide Resume",
        "description": "Learn how to create an ATS-friendly resume that passes automated screening. Formatting rules, keyword optimization, and common mistakes to avoid.",
        "keywords": ["ATS resume", "applicant tracking system", "ATS-friendly format", "resume keywords"],
        "og_image": "https://resume.doaide.com/og-guide-ats.png",
    },
    {
        "path": "/guides/fresher-resume",
        "title": "Fresher Resume Guide - No Experience Resume Tips | DoAide Resume",
        "description": "Build an impressive resume with no work experience. Tips for freshers, recent graduates, and career changers to showcase skills and potential.",
        "keywords": ["fresher resume", "no experience resume", "graduate resume", "entry level resume"],
        "og_image": "https://resume.doaide.com/og-guide-fresher.png",
    },
    {
        "path": "/guides/cover-letter",
        "title": "Cover Letter Writing Guide - Templates & Examples | DoAide Resume",
        "description": "Write compelling cover letters that complement your resume. Templates, examples, and tips for every industry and experience level.",
        "keywords": ["cover letter guide", "cover letter template", "how to write cover letter", "cover letter examples"],
        "og_image": "https://resume.doaide.com/og-guide-cover-letter.png",
    },
    {
        "path": "/cover-letter-generator",
        "title": "Free Cover Letter Generator India | DoAide Resume",
        "description": "Generate professional cover letters in seconds. Templates for freshers, experienced professionals, and career changers. 100% free, no login required.",
        "keywords": ["cover letter generator", "free cover letter", "cover letter format India", "cover letter template"],
        "og_image": "https://resume.doaide.com/og-cover-letter-gen.png",
    },
    {
        "path": "/linkedin-summary-generator",
        "title": "Free LinkedIn Summary Generator | DoAide Resume",
        "description": "Create compelling LinkedIn About sections that get you noticed by recruiters. Professional, storytelling, and results-driven styles. Optimised for Indian professionals.",
        "keywords": ["LinkedIn summary generator", "LinkedIn about section", "LinkedIn profile summary", "LinkedIn bio generator"],
        "og_image": "https://resume.doaide.com/og-linkedin-gen.png",
    },
    {
        "path": "/compare/novoresume",
        "title": "DoAide Resume vs Novoresume - Free Resume Builder Comparison",
        "description": "Compare DoAide Resume with Novoresume. See why DoAide offers more free features, better ATS optimization, and no hidden paywalls.",
        "keywords": ["novoresume alternative", "novoresume vs", "free resume builder comparison", "best resume builder"],
        "og_image": "https://resume.doaide.com/og-compare-novoresume.png",
    },
    {
        "path": "/best-free-resume-builder",
        "title": "Best Free Resume Builder 2025 - No Hidden Costs | DoAide Resume",
        "description": "Looking for the best free resume builder? DoAide Resume offers AI-powered writing, ATS optimization, and PDF export with zero cost.",
        "keywords": ["best free resume builder", "free resume builder no cost", "resume builder 2025", "truly free resume maker"],
        "og_image": "https://resume.doaide.com/og-best-free.png",
    },
]


@router.get("/pages")
async def get_pages():
    return {"pages": PAGE_METADATA}
