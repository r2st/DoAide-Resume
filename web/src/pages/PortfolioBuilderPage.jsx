import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import usePageMeta from '../lib/usePageMeta';
import ShareButtons from '../components/ShareButtons';
import { ACCENTS, generatePortfolioHtml } from '../lib/portfolioGenerator';

const emptyProject = () => ({ name: '', description: '', tech: '', link: '' });

export default function PortfolioBuilderPage() {
  usePageMeta(
    'Free Portfolio Page Builder — One-File HTML Portfolio | DoAide Resume',
    'Build a clean personal portfolio page in minutes and download it as a single HTML file. Host it free on GitHub Pages or Netlify. No login, no watermark.'
  );

  const [form, setForm] = useState({
    name: '', title: '', about: '', location: '',
    email: '', linkedin: '', github: '', website: '',
  });
  const [skillsText, setSkillsText] = useState('');
  const [projects, setProjects] = useState([emptyProject()]);
  const [accent, setAccent] = useState('teal');
  const [showPreview, setShowPreview] = useState(false);

  const handleChange = (field) => (e) => setForm((prev) => ({ ...prev, [field]: e.target.value }));

  const updateProject = (i, field, value) =>
    setProjects((prev) => prev.map((p, idx) => (idx === i ? { ...p, [field]: value } : p)));

  const html = useMemo(() => generatePortfolioHtml({
    ...form,
    skills: skillsText.split(',').map((s) => s.trim()).filter(Boolean),
    projects,
    accent,
  }), [form, skillsText, projects, accent]);

  const handleDownload = () => {
    const blob = new Blob([html], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${(form.name || 'portfolio').toLowerCase().replace(/\s+/g, '-')}.html`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const inputCls = 'px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500';

  return (
    <div>
      <section className="bg-gradient-to-br from-emerald-600 via-emerald-700 to-teal-800 text-white">
        <div className="max-w-4xl mx-auto px-4 py-14 sm:py-20 text-center">
          <div className="inline-block bg-emerald-500/30 text-emerald-100 text-sm font-medium px-4 py-1.5 rounded-full mb-4">
            100% Free - Runs in Your Browser
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold leading-tight mb-4">
            Portfolio Page Builder
          </h1>
          <p className="text-lg text-emerald-100 max-w-2xl mx-auto">
            A personal site makes your applications stand out. Fill the form, download one HTML file, host it free on GitHub Pages or Netlify.
          </p>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-5">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5">
              <h2 className="text-lg font-semibold text-gray-800 mb-3">About You</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <input className={inputCls} placeholder="Full Name" value={form.name} onChange={handleChange('name')} />
                <input className={inputCls} placeholder="Title (e.g. Frontend Developer)" value={form.title} onChange={handleChange('title')} />
                <input className={`${inputCls} col-span-full`} placeholder="Location (e.g. Pune, India)" value={form.location} onChange={handleChange('location')} />
                <textarea className={`${inputCls} col-span-full`} rows={3} placeholder="Short bio — who you are, what you build, what you're looking for" value={form.about} onChange={handleChange('about')} />
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5">
              <h2 className="text-lg font-semibold text-gray-800 mb-3">Links</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <input className={inputCls} placeholder="Email" value={form.email} onChange={handleChange('email')} />
                <input className={inputCls} placeholder="LinkedIn URL" value={form.linkedin} onChange={handleChange('linkedin')} />
                <input className={inputCls} placeholder="GitHub URL" value={form.github} onChange={handleChange('github')} />
                <input className={inputCls} placeholder="Personal website (optional)" value={form.website} onChange={handleChange('website')} />
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5">
              <h2 className="text-lg font-semibold text-gray-800 mb-3">Skills</h2>
              <input className={`${inputCls} w-full`} placeholder="Comma-separated (e.g. React, Node.js, PostgreSQL, Figma)" value={skillsText} onChange={(e) => setSkillsText(e.target.value)} />
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5">
              <div className="flex items-center justify-between mb-3">
                <h2 className="text-lg font-semibold text-gray-800">Projects</h2>
                <button
                  onClick={() => setProjects((prev) => [...prev, emptyProject()])}
                  className="text-sm font-medium text-emerald-600 hover:text-emerald-700"
                >
                  + Add project
                </button>
              </div>
              <div className="space-y-4">
                {projects.map((p, i) => (
                  <div key={i} className="border border-gray-100 rounded-lg p-3 space-y-2">
                    <div className="flex gap-2">
                      <input className={`${inputCls} flex-1`} placeholder="Project name" value={p.name} onChange={(e) => updateProject(i, 'name', e.target.value)} />
                      {projects.length > 1 && (
                        <button onClick={() => setProjects((prev) => prev.filter((_, idx) => idx !== i))} className="text-red-400 hover:text-red-600 text-sm px-2" aria-label="Remove project">✕</button>
                      )}
                    </div>
                    <textarea className={`${inputCls} w-full`} rows={2} placeholder="What it does, your role, the impact" value={p.description} onChange={(e) => updateProject(i, 'description', e.target.value)} />
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      <input className={inputCls} placeholder="Tech used (e.g. React, Flask)" value={p.tech} onChange={(e) => updateProject(i, 'tech', e.target.value)} />
                      <input className={inputCls} placeholder="Live/demo/repo link" value={p.link} onChange={(e) => updateProject(i, 'link', e.target.value)} />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5">
              <h2 className="text-lg font-semibold text-gray-800 mb-3">Accent Colour</h2>
              <div className="flex gap-3">
                {Object.entries(ACCENTS).map(([key, color]) => (
                  <button
                    key={key}
                    onClick={() => setAccent(key)}
                    aria-label={`Accent ${key}`}
                    className={`w-9 h-9 rounded-full border-2 transition ${accent === key ? 'border-gray-800 scale-110' : 'border-transparent'}`}
                    style={{ background: color }}
                  />
                ))}
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={handleDownload}
                className="flex-1 py-3 bg-emerald-600 text-white font-semibold rounded-xl hover:bg-emerald-700 transition"
              >
                Download portfolio.html
              </button>
              <button
                onClick={() => setShowPreview((v) => !v)}
                className="flex-1 py-3 bg-gray-100 text-gray-700 font-semibold rounded-xl hover:bg-gray-200 transition lg:hidden"
              >
                {showPreview ? 'Hide Preview' : 'Show Preview'}
              </button>
            </div>
          </div>

          <div className={`${showPreview ? '' : 'hidden'} lg:block lg:sticky lg:top-4 lg:self-start`}>
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
              <div className="px-4 py-2 border-b border-gray-100 flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-red-400" />
                <span className="w-2.5 h-2.5 rounded-full bg-yellow-400" />
                <span className="w-2.5 h-2.5 rounded-full bg-green-400" />
                <span className="text-xs text-gray-400 ml-2">Live preview</span>
              </div>
              <iframe
                title="Portfolio preview"
                srcDoc={html}
                sandbox=""
                className="w-full"
                style={{ height: '70vh', border: 'none' }}
              />
            </div>
          </div>
        </div>

        <div className="mt-10 bg-emerald-50 border border-emerald-200 rounded-xl p-5 max-w-3xl mx-auto">
          <h3 className="font-semibold text-emerald-800 mb-2">How to publish your portfolio for free</h3>
          <ol className="text-sm text-emerald-700 space-y-1.5 list-decimal pl-5">
            <li>Download the HTML file above.</li>
            <li>GitHub Pages: create a repo named <code>yourusername.github.io</code>, upload the file as <code>index.html</code>, done.</li>
            <li>Netlify: drag-and-drop the file at app.netlify.com/drop — you get a URL instantly.</li>
            <li>Add the URL to your resume header and LinkedIn profile.</li>
          </ol>
        </div>

        <div className="py-6">
          <ShareButtons text="I built a free portfolio page in 5 minutes with this tool!" toolName="Portfolio Builder" />
        </div>

        <div className="mt-8">
          <h2 className="text-2xl font-bold text-gray-800 text-center mb-8">Frequently Asked Questions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl mx-auto">
            {[
              { q: 'Do I need to know HTML?', a: 'No. Fill in the form and download the finished file. If you later want to tweak something, the file is plain, readable HTML and CSS.' },
              { q: 'Where can I host it for free?', a: 'GitHub Pages, Netlify Drop, Cloudflare Pages, and Vercel all host a single HTML file for free. The steps above take under 10 minutes.' },
              { q: 'Is my data uploaded?', a: 'No. The page is generated entirely in your browser — nothing you type leaves your device.' },
              { q: 'Does a portfolio actually help?', a: 'For developers, designers and writers, yes — a link in your resume header gives recruiters proof of work in one click, which plain resumes cannot.' },
            ].map((faq) => (
              <div key={faq.q} className="bg-white rounded-lg border border-gray-200 p-4">
                <h3 className="font-semibold text-gray-800 text-sm mb-1">{faq.q}</h3>
                <p className="text-sm text-gray-600">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="text-center mt-12 mb-8">
          <p className="text-gray-500 mb-3">Pair it with a strong resume:</p>
          <Link to="/" className="inline-flex items-center gap-2 px-6 py-3 bg-emerald-600 text-white font-medium rounded-xl hover:bg-emerald-700 transition no-underline">
            Build Your Resume Free
          </Link>
        </div>
      </section>
    </div>
  );
}
