// Generates a self-contained, single-file HTML portfolio page from form data.
// Everything is inlined (CSS included) so the file works opened from disk or
// uploaded to any static host (GitHub Pages, Netlify Drop, S3).

function esc(s) {
  return String(s || '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function escUrl(url) {
  const u = String(url || '').trim();
  if (!u) return '';
  if (/^https?:\/\//i.test(u)) return esc(u);
  if (/^[\w.+-]+@[\w-]+\.[\w.-]+$/.test(u)) return `mailto:${esc(u)}`;
  // Allow bare domains; refuse anything with a scheme we don't recognise.
  if (/^[a-z0-9][\w.-]*\.[a-z]{2,}([/?#]\S*)?$/i.test(u)) return `https://${esc(u)}`;
  return '';
}

export const ACCENTS = {
  teal: '#0D9488',
  blue: '#2563EB',
  violet: '#7C3AED',
  rose: '#E11D48',
  amber: '#D97706',
};

export function generatePortfolioHtml(data) {
  const {
    name = '', title = '', about = '', location = '',
    email = '', linkedin = '', github = '', website = '',
    skills = [], projects = [], accent = 'teal',
  } = data;

  const color = ACCENTS[accent] || ACCENTS.teal;
  const safeName = esc(name) || 'My Portfolio';

  const contactLinks = [
    email && { label: 'Email', href: escUrl(email) },
    linkedin && { label: 'LinkedIn', href: escUrl(linkedin) },
    github && { label: 'GitHub', href: escUrl(github) },
    website && { label: 'Website', href: escUrl(website) },
  ].filter((l) => l && l.href);

  const skillChips = skills.filter(Boolean).map((s) => `<span class="chip">${esc(s)}</span>`).join('\n        ');

  const projectCards = projects
    .filter((p) => p && (p.name || p.description))
    .map((p) => {
      const link = escUrl(p.link);
      const header = link
        ? `<a href="${link}" target="_blank" rel="noopener noreferrer">${esc(p.name)}</a>`
        : esc(p.name);
      const tech = (p.tech || '').trim();
      return `      <article class="card">
        <h3>${header}</h3>
        <p>${esc(p.description)}</p>
        ${tech ? `<p class="tech">${esc(tech)}</p>` : ''}
      </article>`;
    })
    .join('\n');

  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${safeName}${title ? ` — ${esc(title)}` : ''}</title>
<meta name="description" content="${esc(about).slice(0, 160)}">
<style>
  :root { --accent: ${color}; --text: #1E293B; --muted: #64748B; --border: #E2E8F0; --bg: #FFFFFF; --surface: #F8FAFC; }
  @media (prefers-color-scheme: dark) {
    :root { --text: #E2E8F0; --muted: #94A3B8; --border: #334155; --bg: #0F172A; --surface: #1E293B; }
  }
  * { box-sizing: border-box; margin: 0; }
  body { font-family: system-ui, -apple-system, 'Segoe UI', sans-serif; color: var(--text); background: var(--bg); line-height: 1.6; }
  main { max-width: 720px; margin: 0 auto; padding: 48px 20px 80px; }
  h1 { font-size: 2.2rem; line-height: 1.2; }
  .title { color: var(--accent); font-weight: 600; font-size: 1.15rem; margin-top: 4px; }
  .location { color: var(--muted); font-size: .95rem; margin-top: 2px; }
  .links { display: flex; flex-wrap: wrap; gap: 10px; margin: 18px 0 0; }
  .links a { color: var(--accent); text-decoration: none; border: 1px solid var(--border); border-radius: 999px; padding: 6px 14px; font-size: .9rem; }
  .links a:hover { background: var(--surface); }
  section { margin-top: 40px; }
  h2 { font-size: 1.2rem; text-transform: uppercase; letter-spacing: .05em; color: var(--muted); border-bottom: 2px solid var(--accent); display: inline-block; padding-bottom: 4px; margin-bottom: 16px; }
  .about { font-size: 1.05rem; white-space: pre-line; }
  .chips { display: flex; flex-wrap: wrap; gap: 8px; }
  .chip { background: var(--surface); border: 1px solid var(--border); border-radius: 999px; padding: 5px 13px; font-size: .9rem; }
  .card { border: 1px solid var(--border); border-radius: 12px; padding: 18px 20px; margin-bottom: 14px; background: var(--surface); }
  .card h3 { font-size: 1.05rem; margin-bottom: 6px; }
  .card a { color: var(--accent); text-decoration: none; }
  .card a:hover { text-decoration: underline; }
  .card p { font-size: .95rem; color: var(--muted); }
  .card .tech { margin-top: 8px; font-size: .85rem; color: var(--accent); }
  footer { margin-top: 56px; font-size: .85rem; color: var(--muted); text-align: center; }
</style>
</head>
<body>
<main>
  <header>
    <h1>${safeName}</h1>
    ${title ? `<p class="title">${esc(title)}</p>` : ''}
    ${location ? `<p class="location">${esc(location)}</p>` : ''}
    ${contactLinks.length ? `<nav class="links">\n      ${contactLinks.map((l) => `<a href="${l.href}" ${l.href.startsWith('mailto:') ? '' : 'target="_blank" rel="noopener noreferrer"'}>${l.label}</a>`).join('\n      ')}\n    </nav>` : ''}
  </header>
  ${about ? `<section>\n    <h2>About</h2>\n    <p class="about">${esc(about)}</p>\n  </section>` : ''}
  ${skillChips ? `<section>\n    <h2>Skills</h2>\n    <div class="chips">\n        ${skillChips}\n    </div>\n  </section>` : ''}
  ${projectCards ? `<section>\n    <h2>Projects</h2>\n${projectCards}\n  </section>` : ''}
  <footer>Built with the free <a href="https://resume.doaide.com/portfolio-builder" style="color:var(--accent)">DoAide Portfolio Builder</a></footer>
</main>
</body>
</html>`;
}
