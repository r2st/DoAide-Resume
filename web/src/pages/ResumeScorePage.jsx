import { useState } from 'react';
import { Link } from 'react-router-dom';
import usePageMeta from '../lib/usePageMeta';
import ShareButtons from '../components/ShareButtons';

const GRADE_COLORS = {
  'A+': '#059669', A: '#059669', 'B+': '#0D9488', B: '#0D9488',
  'C+': '#D97706', C: '#D97706', D: '#DC2626',
};

function ScoreRing({ score }) {
  const r = 52;
  const c = 2 * Math.PI * r;
  const color = score >= 75 ? '#059669' : score >= 50 ? '#D97706' : '#DC2626';
  return (
    <svg width="130" height="130" viewBox="0 0 130 130" role="img" aria-label={`Score ${score} out of 100`}>
      <circle cx="65" cy="65" r={r} fill="none" stroke="var(--da-border, #E2E8F0)" strokeWidth="10" />
      <circle
        cx="65" cy="65" r={r} fill="none" stroke={color} strokeWidth="10" strokeLinecap="round"
        strokeDasharray={c} strokeDashoffset={c - (c * score) / 100}
        transform="rotate(-90 65 65)"
      />
      <text x="65" y="72" textAnchor="middle" fontSize="28" fontWeight="700" fill={color}>{score}</text>
    </svg>
  );
}

export default function ResumeScorePage() {
  usePageMeta(
    'Free AI Resume Score & Grader | DoAide Resume',
    'Get your resume graded by AI in seconds — a score out of 100, section-by-section feedback, strengths and specific fixes. Free, no login required.'
  );

  const [resumeText, setResumeText] = useState('');
  const [targetRole, setTargetRole] = useState('');
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleAnalyze = async () => {
    setError('');
    setResult(null);
    if (resumeText.trim().length < 100) {
      setError('Paste your full resume text (at least 100 characters) so the AI has enough to grade.');
      return;
    }
    setLoading(true);
    try {
      const res = await fetch('/api/resume-score/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ resume_text: resumeText.slice(0, 15000), target_role: targetRole }),
      });
      if (res.ok) {
        setResult(await res.json());
      } else if (res.status === 503) {
        setError('The AI grader is temporarily unavailable. Please try again in a few minutes.');
      } else {
        const body = await res.json().catch(() => null);
        setError(body?.detail || 'Something went wrong while grading. Please try again.');
      }
    } catch {
      setError('Could not reach the server. Check your connection and try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <section className="bg-gradient-to-br from-emerald-600 via-emerald-700 to-teal-800 text-white">
        <div className="max-w-4xl mx-auto px-4 py-14 sm:py-20 text-center">
          <div className="inline-block bg-emerald-500/30 text-emerald-100 text-sm font-medium px-4 py-1.5 rounded-full mb-4">
            100% Free - No Login Required
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold leading-tight mb-4">
            AI Resume Score & Grader
          </h1>
          <p className="text-lg text-emerald-100 max-w-2xl mx-auto">
            Paste your resume and get an instant AI grade — a score out of 100, section-by-section feedback and specific fixes.
          </p>
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-4 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-4">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5">
              <h2 className="text-lg font-semibold text-gray-800 mb-3">Your Resume</h2>
              <textarea
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 min-h-[300px]"
                placeholder="Paste your full resume text here (copy everything from your resume document)..."
                value={resumeText}
                onChange={(e) => setResumeText(e.target.value)}
                maxLength={15000}
              />
              <div className="flex justify-between mt-1 text-xs text-gray-400">
                <span>{resumeText.length.toLocaleString()} / 15,000 characters</span>
              </div>
              <input
                className="w-full mt-3 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                placeholder="Target role (optional, e.g. Backend Engineer)"
                value={targetRole}
                onChange={(e) => setTargetRole(e.target.value)}
                maxLength={200}
              />
            </div>
            <button
              onClick={handleAnalyze}
              disabled={loading}
              className="w-full py-3 bg-emerald-600 text-white font-semibold rounded-xl hover:bg-emerald-700 transition text-lg disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading ? 'AI is grading your resume...' : 'Grade My Resume'}
            </button>
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 text-sm rounded-lg p-3" role="alert">{error}</div>
            )}
            <p className="text-xs text-gray-400">
              Your resume text is sent to our server only to generate this grade and is not stored.
            </p>
          </div>

          <div className="lg:sticky lg:top-4 lg:self-start">
            {result ? (
              <div className="space-y-4">
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 flex items-center gap-6">
                  <ScoreRing score={result.score} />
                  <div>
                    <div className="text-3xl font-extrabold" style={{ color: GRADE_COLORS[result.grade] || '#0D9488' }}>
                      Grade {result.grade}
                    </div>
                    <p className="text-sm text-gray-600 mt-2">{result.summary}</p>
                  </div>
                </div>

                {result.sections?.length > 0 && (
                  <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5">
                    <h3 className="font-semibold text-gray-800 mb-3">Section Breakdown</h3>
                    <div className="space-y-3">
                      {result.sections.map((s) => (
                        <div key={s.section}>
                          <div className="flex justify-between text-sm mb-1">
                            <span className="font-medium text-gray-700">{s.section}</span>
                            <span className="text-gray-500">{s.score}/100</span>
                          </div>
                          <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                            <div
                              className="h-full rounded-full"
                              style={{ width: `${s.score}%`, background: s.score >= 75 ? '#059669' : s.score >= 50 ? '#D97706' : '#DC2626' }}
                            />
                          </div>
                          <p className="text-xs text-gray-500 mt-1">{s.feedback}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {result.strengths?.length > 0 && (
                  <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-5">
                    <h3 className="font-semibold text-emerald-800 mb-2">Strengths</h3>
                    <ul className="text-sm text-emerald-700 space-y-1.5 list-disc pl-5">
                      {result.strengths.map((s) => <li key={s}>{s}</li>)}
                    </ul>
                  </div>
                )}

                {result.improvements?.length > 0 && (
                  <div className="bg-amber-50 border border-amber-200 rounded-xl p-5">
                    <h3 className="font-semibold text-amber-800 mb-2">What to Improve</h3>
                    <ul className="text-sm text-amber-700 space-y-1.5 list-disc pl-5">
                      {result.improvements.map((s) => <li key={s}>{s}</li>)}
                    </ul>
                  </div>
                )}

                <div className="bg-white rounded-xl border border-gray-200 p-5 text-center">
                  <p className="text-sm text-gray-600 mb-3">Fix these issues in minutes with the free builder:</p>
                  <Link to="/" className="inline-flex items-center px-5 py-2.5 bg-emerald-600 text-white font-medium rounded-lg hover:bg-emerald-700 transition text-sm no-underline">
                    Rebuild My Resume Free
                  </Link>
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 flex flex-col items-center justify-center min-h-[300px] text-gray-400">
                <svg className="w-12 h-12 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
                <p className="text-sm text-center">Paste your resume and click<br />"Grade My Resume"</p>
              </div>
            )}
          </div>
        </div>

        <div className="py-6">
          <ShareButtons text="I just got my resume graded by AI for free — try it!" toolName="AI Resume Score" />
        </div>

        <div className="mt-12">
          <h2 className="text-2xl font-bold text-gray-800 text-center mb-8">Frequently Asked Questions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl mx-auto">
            {[
              { q: 'How is the resume score calculated?', a: 'An AI model reviews your resume the way a recruiter would — structure, quantified achievements, action verbs, ATS-friendliness and relevance to your target role — and assigns a score out of 100 with section-level feedback.' },
              { q: 'Is this different from the ATS Checker?', a: 'Yes. The ATS Checker runs deterministic formatting and keyword rules in your browser. The AI grader reads your actual content and gives qualitative feedback, like a human reviewer.' },
              { q: 'Is my resume stored?', a: 'No. The text is sent to our server only to generate the grade and is not saved.' },
              { q: 'Is it really free?', a: 'Yes — free, unlimited, no login. If the AI service is briefly unavailable, try again after a few minutes.' },
            ].map((faq) => (
              <div key={faq.q} className="bg-white rounded-lg border border-gray-200 p-4">
                <h3 className="font-semibold text-gray-800 text-sm mb-1">{faq.q}</h3>
                <p className="text-sm text-gray-600">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="text-center mt-12 mb-8">
          <p className="text-gray-500 mb-3">Also try:</p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link to="/ats-checker" className="inline-flex items-center px-5 py-2.5 bg-gray-100 text-gray-700 font-medium rounded-lg hover:bg-gray-200 transition text-sm no-underline">ATS Checker</Link>
            <Link to="/keyword-optimizer" className="inline-flex items-center px-5 py-2.5 bg-gray-100 text-gray-700 font-medium rounded-lg hover:bg-gray-200 transition text-sm no-underline">Keyword Optimizer</Link>
            <Link to="/interview-questions" className="inline-flex items-center px-5 py-2.5 bg-gray-100 text-gray-700 font-medium rounded-lg hover:bg-gray-200 transition text-sm no-underline">Interview Questions</Link>
          </div>
        </div>
      </section>
    </div>
  );
}
