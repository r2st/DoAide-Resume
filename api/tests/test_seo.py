def test_pages_endpoint(client):
    r = client.get("/api/pages")
    assert r.status_code == 200
    data = r.json()
    pages = data["pages"]
    assert len(pages) == 14


def test_pages_have_required_fields(client):
    r = client.get("/api/pages")
    for page in r.json()["pages"]:
        assert "path" in page
        assert "title" in page
        assert "description" in page
        assert "keywords" in page
        assert len(page["title"]) > 10
        assert len(page["description"]) > 20


def test_new_tools_in_seo(client):
    r = client.get("/api/pages")
    paths = [p["path"] for p in r.json()["pages"]]
    assert "/cover-letter-generator" in paths
    assert "/linkedin-summary-generator" in paths


def test_pages_match_sitemap(client):
    seo_r = client.get("/api/pages")
    sitemap_r = client.get("/sitemap.xml")
    for page in seo_r.json()["pages"]:
        assert page["path"] in sitemap_r.text or page["path"] == "/"
