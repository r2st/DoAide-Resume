from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routers import health, sitemap, seo, ai_enhance, advisor

app = FastAPI(title="DoAide Resume API", version="1.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["https://resume.doaide.com", "http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(health.router, prefix="/api")
app.include_router(sitemap.router)
app.include_router(seo.router, prefix="/api")
app.include_router(ai_enhance.router, prefix="/api")
app.include_router(advisor.router, prefix="/api")
