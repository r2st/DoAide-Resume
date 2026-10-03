import os
import json
from openai import AsyncOpenAI

OPENROUTER_API_KEY = os.environ.get("OPENROUTER_API_KEY", "")
MODEL = "meta-llama/llama-4-scout:free"


def _get_client() -> AsyncOpenAI:
    return AsyncOpenAI(
        base_url="https://openrouter.ai/api/v1",
        api_key=OPENROUTER_API_KEY,
    )


async def generate_resume_sections(data: dict) -> dict:
    client = _get_client()

    prompt = f"""Generate ATS-optimized resume content based on this information. Return a JSON object with these keys:
- "summary": A 2-3 sentence professional summary
- "experience": Array of objects with "title", "company", "dates", "bullets" (array of 3-4 achievement-focused bullet points starting with action verbs)
- "skills_section": A formatted skills string grouping skills by category
- "full_resume": The complete resume as formatted plain text

Input information:
Name: {data.get('full_name', 'N/A')}
Email: {data.get('email', '')}
Phone: {data.get('phone', '')}
Location: {data.get('location', '')}
Target Role: {data.get('target_role', '')}
Summary: {data.get('summary', '')}
Skills: {', '.join(data.get('skills', []))}
Experience: {json.dumps(data.get('experience', []))}
Education: {json.dumps(data.get('education', []))}

Important: Use strong action verbs, quantify achievements where possible, and include relevant keywords for the target role. Return ONLY valid JSON."""

    try:
        response = await client.chat.completions.create(
            model=MODEL,
            messages=[
                {"role": "system", "content": "You are an expert resume writer specializing in ATS-optimized resumes. Always respond with valid JSON only."},
                {"role": "user", "content": prompt},
            ],
            temperature=0.7,
            max_tokens=2000,
        )
        content = response.choices[0].message.content.strip()
        if content.startswith("```"):
            content = content.split("\n", 1)[1]
            if content.endswith("```"):
                content = content[:-3]
        return json.loads(content)
    except json.JSONDecodeError:
        return _build_fallback(data)
    except Exception as e:
        return _build_fallback(data, str(e))


def _build_fallback(data: dict, error: str = "") -> dict:
    name = data.get("full_name", "")
    target = data.get("target_role", "professional")
    skills = data.get("skills", [])

    summary = f"Results-driven {target} with expertise in {', '.join(skills[:3]) if skills else 'various technologies'}. Proven track record of delivering high-quality results."

    experience_items = []
    for exp in data.get("experience", []):
        experience_items.append({
            "title": exp.get("title", ""),
            "company": exp.get("company", ""),
            "dates": exp.get("dates", ""),
            "bullets": [
                f"Contributed to key projects as {exp.get('title', 'team member')}",
                "Collaborated with cross-functional teams to deliver results",
                "Applied technical skills to solve complex challenges",
            ]
        })

    lines = [name, data.get("email", ""), data.get("phone", ""), data.get("location", ""), "", "PROFESSIONAL SUMMARY", summary, ""]
    if experience_items:
        lines.append("EXPERIENCE")
        for e in experience_items:
            lines.append(f"{e['title']} | {e['company']} | {e['dates']}")
            for b in e["bullets"]:
                lines.append(f"• {b}")
            lines.append("")
    if skills:
        lines.append("SKILLS")
        lines.append(", ".join(skills))
        lines.append("")
    for edu in data.get("education", []):
        lines.append("EDUCATION")
        lines.append(f"{edu.get('degree', '')} | {edu.get('school', '')} | {edu.get('year', '')}")

    return {
        "summary": summary,
        "experience": experience_items,
        "skills_section": ", ".join(skills),
        "full_resume": "\n".join(lines),
        "note": "Generated with fallback template" + (f" (AI error: {error})" if error else ""),
    }
