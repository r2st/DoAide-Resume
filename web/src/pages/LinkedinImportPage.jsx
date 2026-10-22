import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import usePageMeta from '../lib/usePageMeta';
import ShareButtons from '../components/ShareButtons';
import { parseLinkedinProfile, importStats, IMPORT_STORAGE_KEY } from '../lib/linkedinParser';

const STEPS = [
  { step: '1', title: 'Open your LinkedIn profile', desc: 'Go to linkedin.com and open your own profile page.' },
  { step: '2', title: 'Copy your profile text', desc: 'Select everything from your name down to your last section and copy it (Ctrl/Cmd+A on the profile also works). Or use More → Save to PDF and copy the text from the PDF.' },
  { step: '3', title: 'Paste it below', desc: 'We detect your experience, education, skills, and certifications automatically — right in your browser.' },
  { step: '4', title: 'Edit & download', desc: 'Your details open in the free builder. Pick a template, fine-tune, and download your PDF resume.' },
];

const FAQS = [
  {
    q: 'How do I convert my LinkedIn profile to a resume?',
    a: 'Copy the text of your LinkedIn profile (or its Save to PDF export), paste it into the box above, and click Import. Your experience, education, and skills are detected automatically and opened in the free resume builder, where you can pick a template and download a PDF.',
  },
  {
    q: 'Is my LinkedIn data uploaded to a server?',
    a: 'No. The import runs entirely in your browser using JavaScript. Your profile text never leaves your device.',
  },
  {
    q: 'Does this work with the LinkedIn "Save to PDF" export?',
    a: 'Yes. Open the PDF LinkedIn generates, select all text, copy it, and paste it here. The parser understands both the profile page layout and the PDF export layout.',
  },
  {
    q: 'What if some sections are not detected?',
    a: 'The import gives you a head start, not a finished resume. Anything the parser misses can be added in the builder in seconds — all sections stay fully editable.',
  },
  {
    q: 'Is the LinkedIn resume import free?',
    a: 'Yes, completely free with no login, no watermarks, and no hidden limits — like every other DoAide Resume tool.',
  },
];

export default function LinkedinImportPage() {
  usePageMeta(
    'LinkedIn to Resume Converter — Free Import Tool | DoAide Resume',
    'Convert your LinkedIn profile into a professional resume for free. Paste your profile text, we parse experience, education and skills in your browser, then download a PDF. No login.'
  );

  const navigate = useNavigate();
  const [text, setText] = useState('');
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');

  const handleImport = () => {
    setError('');
    if (text.trim().length < 40) {
      setError('That looks too short to be a LinkedIn profile. Paste the full text of your profile (name, experience, education…).');
      setResult(null);
      return;
    }
    const data = parseLinkedinProfile(text);
    const stats = importStats(data);
    if (!stats.hasName && !stats.experience && !stats.education && !stats.skills) {
      setError("We couldn't recognise any sections. Make sure the pasted text includes headings like Experience, Education, or Skills.");
      setResult(null);
      return;
    }
    setResult({ data, stats });
  };

  const handleOpenBuilder = () => {
    try {
      localStorage.setItem(IMPORT_STORAGE_KEY, JSON.stringify(result.data));
    } catch {
      // Storage unavailable (private mode) — still navigate; builder starts blank.
    }
    navigate('/?import=linkedin');
  };

  return (
    <div>
      <section className="bg-gradient-to-br from-blue-700 via-blue-800 to-indigo-900 text-white">
        <div className="max-w-4xl mx-auto px-4 py-14 sm:py-20 text-center">
          <div className="inline-block bg-blue-500/30 text-blue-100 text-sm font-medium px-4 py-1.5 rounded-full mb-4">
            100% Free — Runs in Your Browser
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold leading-tight mb-4">
            LinkedIn to Resume Converter
          </h1>
          <p className="text-lg text-blue-100 max-w-2xl mx-auto">
            Paste your LinkedIn profile and get a ready-to-edit resume in seconds. Your data never leaves your device — no login, no upload, no watermarks.
          </p>
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-4 py-10">
        {/* How it works */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
          {STEPS.map((s) => (
            <div key={s.step} className="bg-white rounded-xl shadow-sm border border-gray-200 p-5">
              <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold mb-3">{s.step}</div>
              <h3 className="text-sm font-semibold text-gray-800 mb-1">{s.title}</h3>
              <p className="text-xs text-gray-500 leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>

        {/* Import box */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5 sm:p-8">
          <h2 className="text-lg font-semibold text-gray-800 mb-3">Paste your LinkedIn profile text</h2>
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            rows={12}
            placeholder={'Priya Sharma\nSenior Software Engineer at Acme\nBengaluru, Karnataka, India\n\nAbout\nEngineer with 6 years of experience...\n\nExperience\nSenior Software Engineer\nAcme Technologies\nJan 2021 - Present\n...'}
            className="w-full border border-gray-300 rounded-lg p-4 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {error && <p className="mt-3 text-sm text-red-600">{error}</p>}
          <div className="mt-4 flex flex-wrap items-center gap-3">
            <button
              onClick={handleImport}
              className="px-6 py-3 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700 transition"
            >
              Import from LinkedIn
            </button>
            <span className="text-xs text-gray-400">Nothing is uploaded — parsing happens locally in your browser.</span>
          </div>

          {result && (
            <div className="mt-6 border-t border-gray-100 pt-6">
              <h3 className="text-base font-semibold text-gray-800 mb-3">Here's what we found</h3>
              <ul className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-sm text-gray-700 mb-5">
                <li className="bg-gray-50 rounded-lg px-3 py-2">👤 Name: {result.stats.hasName ? result.data.personal.name : 'not detected'}</li>
                <li className="bg-gray-50 rounded-lg px-3 py-2">💼 Experience: {result.stats.experience} role{result.stats.experience === 1 ? '' : 's'}</li>
                <li className="bg-gray-50 rounded-lg px-3 py-2">🎓 Education: {result.stats.education} entr{result.stats.education === 1 ? 'y' : 'ies'}</li>
                <li className="bg-gray-50 rounded-lg px-3 py-2">🛠️ Skills: {result.stats.skills}</li>
                <li className="bg-gray-50 rounded-lg px-3 py-2">📜 Certifications: {result.stats.certifications}</li>
                <li className="bg-gray-50 rounded-lg px-3 py-2">🗣️ Languages: {result.stats.languages}</li>
              </ul>
              <button
                onClick={handleOpenBuilder}
                className="px-6 py-3 rounded-lg bg-teal-600 text-white font-semibold hover:bg-teal-700 transition"
              >
                Open in Resume Builder →
              </button>
            </div>
          )}
        </div>

        {/* Why */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { title: 'Private by design', desc: 'Unlike other LinkedIn-to-resume tools, nothing is sent to a server. The parser is plain JavaScript running on this page.' },
            { title: '11 free templates', desc: 'Modern, ATS-friendly, Fresher, Technical, Academic and more — switch templates with one click after importing.' },
            { title: 'ATS score included', desc: 'Run the built-in ATS checker on your imported resume and fix issues before you apply.' },
          ].map((f) => (
            <div key={f.title} className="bg-white rounded-xl shadow-sm border border-gray-200 p-5">
              <h3 className="text-sm font-semibold text-gray-800 mb-1">{f.title}</h3>
              <p className="text-sm text-gray-500 leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>

        {/* FAQ */}
        <div className="mt-12">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Frequently Asked Questions</h2>
          <div className="space-y-3">
            {FAQS.map((f) => (
              <details key={f.q} className="bg-white rounded-xl border border-gray-200 p-4">
                <summary className="text-sm font-semibold text-gray-800 cursor-pointer">{f.q}</summary>
                <p className="mt-2 text-sm text-gray-600 leading-relaxed">{f.a}</p>
              </details>
            ))}
          </div>
        </div>

        <div className="mt-10 text-sm text-gray-600">
          Prefer to start from scratch? Use the <Link to="/" className="text-blue-600 font-medium">free resume builder</Link>, browse{' '}
          <Link to="/templates" className="text-blue-600 font-medium">resume templates</Link>, or polish your profile with the{' '}
          <Link to="/linkedin-summary-generator" className="text-blue-600 font-medium">LinkedIn summary generator</Link>.
        </div>

        <div className="mt-8">
          <ShareButtons text="Convert your LinkedIn profile to a resume for free — no login, data stays in your browser:" />
        </div>
      </section>
    </div>
  );
}
