from datetime import datetime
from fastapi import APIRouter
from fastapi.responses import Response

router = APIRouter(tags=["sitemap"])

BASE_URL = "https://resume.doaide.com"

PAGES = [
    {"loc": "/", "priority": "1.0", "changefreq": "weekly"},
    {"loc": "/templates", "priority": "0.9", "changefreq": "weekly"},
    {"loc": "/ats-checker", "priority": "0.9", "changefreq": "monthly"},
    {"loc": "/guides/resume-writing", "priority": "0.8", "changefreq": "monthly"},
    {"loc": "/guides/ats-resume", "priority": "0.8", "changefreq": "monthly"},
    {"loc": "/guides/fresher-resume", "priority": "0.8", "changefreq": "monthly"},
    {"loc": "/guides/cover-letter", "priority": "0.8", "changefreq": "monthly"},
    {"loc": "/cover-letter-generator", "priority": "0.9", "changefreq": "monthly"},
    {"loc": "/linkedin-summary-generator", "priority": "0.9", "changefreq": "monthly"},
    {"loc": "/compare/novoresume", "priority": "0.7", "changefreq": "monthly"},
    {"loc": "/best-free-resume-builder", "priority": "0.7", "changefreq": "monthly"},
]


@router.get("/sitemap.xml")
async def sitemap():
    today = datetime.utcnow().strftime("%Y-%m-%d")
    urls = ""
    for page in PAGES:
        urls += f"""  <url>
    <loc>{BASE_URL}{page["loc"]}</loc>
    <lastmod>{today}</lastmod>
    <changefreq>{page["changefreq"]}</changefreq>
    <priority>{page["priority"]}</priority>
  </url>
"""
    xml = f"""<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
{urls}</urlset>
"""
    return Response(content=xml.strip(), media_type="application/xml")


@router.get("/robots.txt")
async def robots():
    content = f"""User-agent: *
Allow: /

Sitemap: {BASE_URL}/sitemap.xml
"""
    return Response(content=content.strip(), media_type="text/plain")
