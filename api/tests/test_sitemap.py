import xml.etree.ElementTree as ET


def test_sitemap_returns_xml(client):
    r = client.get("/sitemap.xml")
    assert r.status_code == 200
    assert "application/xml" in r.headers["content-type"]


def test_sitemap_valid_xml(client):
    r = client.get("/sitemap.xml")
    root = ET.fromstring(r.text)
    ns = {"s": "http://www.sitemaps.org/schemas/sitemap/0.9"}
    urls = root.findall("s:url", ns)
    assert len(urls) == 26


def test_sitemap_contains_homepage(client):
    r = client.get("/sitemap.xml")
    assert "https://resume.doaide.com/" in r.text


def test_sitemap_contains_new_tools(client):
    r = client.get("/sitemap.xml")
    assert "https://resume.doaide.com/cover-letter-generator" in r.text
    assert "https://resume.doaide.com/linkedin-summary-generator" in r.text


def test_sitemap_contains_all_pages(client):
    r = client.get("/sitemap.xml")
    for path in [
        "/templates",
        "/ats-checker",
        "/cover-letter-generator",
        "/linkedin-summary-generator",
        "/interview-preparation",
        "/advisor",
        "/tools/interview-prep",
        "/guides/resume-writing",
        "/guides/ats-resume",
        "/guides/fresher-resume",
        "/guides/cover-letter",
        "/guides/best-resume-format-india",
        "/compare/novoresume",
        "/compare/canva",
        "/compare/zety",
        "/best-free-resume-builder",
        "/blog/resume-building-2026",
        "/blog/ats-optimization-2026",
    ]:
        assert f"https://resume.doaide.com{path}" in r.text


def test_robots_txt(client):
    r = client.get("/robots.txt")
    assert r.status_code == 200
    assert "text/plain" in r.headers["content-type"]
    assert "Sitemap: https://resume.doaide.com/sitemap.xml" in r.text
