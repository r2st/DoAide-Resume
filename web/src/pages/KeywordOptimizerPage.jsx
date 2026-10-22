import { useState } from 'react';
import { Link } from 'react-router-dom';
import usePageMeta from '../lib/usePageMeta';
import ShareButtons from '../components/ShareButtons';
import { analyzeKeywords, suggestionFor } from '../lib/keywordOptimizer';

export default function KeywordOptimizerPage() {
  usePageMeta(
    'Resume Keyword Optimizer for Job Descriptions | DoAide Resume',
    'Paste your resume and a job description to see which keywords you match, which you are missing, and how to add them. Free, runs in your browser.'
  );

  const [resumeText, setResumeText] = useState('');
  const [jobDescription, setJobDescription] = useState('');
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');

  const handleAnalyze = () => {
    setError('');
    if (resumeText.trim().length < 50 || jobDescription.trim().length < 50) {
      setError('Paste both your resume and the job description (at least a few lines each).');
      setResult(null);
      return;
    }
    setResult(analyzeKeywords(resumeText, jobDescription));
  };

  const coverageColor = result ? (result.coverage >= 70 ? '#059669' : result.coverage >= 40 ? '#D97706' : '#DC2626') : '#0D9488';

  return (
    <div>
      <section className="bg-gradient-to-br from-emerald-600 via-emerald-700 to-teal-800 text-white">
        <div className="max-w-4xl mx-auto px-4 py-14 sm:py-20 text-center">
          <div className="inline-block bg-emerald-500/30 text-emerald-100 text-sm font-medium px-4 py-1.5 rounded-full mb-4">
            100% Free - Runs in Your Browser
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold leading-tight mb-4">
            Resume Keyword Optimizer
          </h1>
          <p className="text-lg text-emerald-100 max-w-2xl mx-auto">
            Match your resume against any job description. See the keywords recruiters' ATS filters look for — and which ones you're missing.
          </p>
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-4 py-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5">
            <h2 className="text-lg font-semibold text-gray-800 mb-3">Your Resume</h2>
            <textarea
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 min-h-[220px]"
              placeholder="Paste your resume text here..."
              value={resumeText}
              onChange={(e) => setResumeText(e.target.value)}
            />
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5">
            <h2 className="text-lg font-semibold text-gray-800 mb-3">Job Description</h2>
            <textarea
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 min-h-[220px]"
              placeholder="Paste the job description you're applying for..."
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
            />
          </div>
        </div>

        <button
          onClick={handleAnalyze}
          className="w-full mt-6 py-3 bg-emerald-600 text-white font-semibold rounded-xl hover:bg-emerald-700 transition text-lg"
        >
          Analyze Keywords
        </button>
        {error && (
          <div className="mt-3 bg-red-50 border border-red-200 text-red-700 text-sm rounded-lg p-3" role="alert">{error}</div>
        )}
        <p className="text-xs text-gray-400 mt-2 text-center">
          Analysis runs entirely in your browser — nothing is uploaded.
        </p>

        {result && (
          <div className="mt-8 space-y-6">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 text-center">
              <div className="text-5xl font-extrabold" style={{ color: coverageColor }}>{result.coverage}%</div>
              <p className="text-gray-600 mt-1">keyword coverage — {result.matched.length} of {result.matched.length + result.missing.length} top keywords found in your resume</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-amber-50 border border-amber-200 rounded-xl p-5">
                <h3 className="font-semibold text-amber-800 mb-3">Missing Keywords ({result.missing.length})</h3>
                {result.missing.length ? (
                  <div className="flex flex-wrap gap-2">
                    {result.missing.map((k) => (
                      <span key={k.keyword} title={suggestionFor(k.keyword)} className="px-3 py-1 bg-white border border-amber-300 text-amber-800 rounded-full text-sm">
                        {k.keyword} <span className="text-amber-500 text-xs">×{k.count}</span>
                      </span>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-amber-700">None — your resume covers every top keyword in this JD.</p>
                )}
                {result.missing.length > 0 && (
                  <p className="text-xs text-amber-700 mt-3">
                    Add the ones that are genuinely true of your experience — ideally inside achievement bullets, not just a skills list. Never add skills you don't have.
                  </p>
                )}
              </div>

              <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-5">
                <h3 className="font-semibold text-emerald-800 mb-3">Matched Keywords ({result.matched.length})</h3>
                {result.matched.length ? (
                  <div className="flex flex-wrap gap-2">
                    {result.matched.map((k) => (
                      <span key={k.keyword} className="px-3 py-1 bg-white border border-emerald-300 text-emerald-800 rounded-full text-sm">
                        {k.keyword} <span className="text-emerald-500 text-xs">×{k.count}</span>
                      </span>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-emerald-700">No overlap found yet — tailor your resume to this role.</p>
                )}
              </div>
            </div>

            <div className="bg-white rounded-xl border border-gray-200 p-5 text-center">
              <p className="text-sm text-gray-600 mb-3">Update your resume with these keywords in the free builder:</p>
              <Link to="/" className="inline-flex items-center px-5 py-2.5 bg-emerald-600 text-white font-medium rounded-lg hover:bg-emerald-700 transition text-sm no-underline">
                Open Resume Builder
              </Link>
            </div>
          </div>
        )}

        <div className="py-6">
          <ShareButtons text="Free tool: match your resume keywords against any job description!" toolName="Keyword Optimizer" />
        </div>

        <div className="mt-12">
          <h2 className="text-2xl font-bold text-gray-800 text-center mb-8">Frequently Asked Questions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl mx-auto">
            {[
              { q: 'How does the keyword optimizer work?', a: 'It extracts the most frequent meaningful words and two-word phrases from the job description, filters out filler, and checks which of them appear in your resume. The ranking mirrors what keyword-based ATS filters reward.' },
              { q: 'Should I add every missing keyword?', a: 'No — only the ones that are true of your experience. Keyword stuffing is obvious to recruiters and can get you rejected at the interview stage.' },
              { q: 'Is my data uploaded anywhere?', a: 'No. This tool runs entirely in your browser; neither your resume nor the job description leaves your device.' },
              { q: 'What coverage score should I aim for?', a: 'There is no magic number, but 60-80% coverage of the top keywords usually means your resume is well-tailored. Below 40% suggests the resume was not customised for this role.' },
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
            <Link to="/resume-score" className="inline-flex items-center px-5 py-2.5 bg-gray-100 text-gray-700 font-medium rounded-lg hover:bg-gray-200 transition text-sm no-underline">AI Resume Score</Link>
            <Link to="/ats-checker" className="inline-flex items-center px-5 py-2.5 bg-gray-100 text-gray-700 font-medium rounded-lg hover:bg-gray-200 transition text-sm no-underline">ATS Checker</Link>
            <Link to="/cover-letter-generator" className="inline-flex items-center px-5 py-2.5 bg-gray-100 text-gray-700 font-medium rounded-lg hover:bg-gray-200 transition text-sm no-underline">Cover Letter Generator</Link>
          </div>
        </div>
      </section>
    </div>
  );
}
