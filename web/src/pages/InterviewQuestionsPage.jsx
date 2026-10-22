import { useState } from 'react';
import { Link } from 'react-router-dom';
import usePageMeta from '../lib/usePageMeta';
import ShareButtons from '../components/ShareButtons';

const CATEGORY_STYLES = {
  'Resume Deep-Dive': 'bg-violet-100 text-violet-700',
  Technical: 'bg-blue-100 text-blue-700',
  Behavioral: 'bg-emerald-100 text-emerald-700',
  'Role Fit': 'bg-amber-100 text-amber-700',
};

export default function InterviewQuestionsPage() {
  usePageMeta(
    'AI Interview Questions Generator From Your Resume | DoAide Resume',
    'Paste your resume and get the interview questions you are most likely to face — grounded in your actual projects and skills, with hints on answering each. Free.'
  );

  const [resumeText, setResumeText] = useState('');
  const [targetRole, setTargetRole] = useState('');
  const [questions, setQuestions] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [openIdx, setOpenIdx] = useState(null);

  const handleGenerate = async () => {
    setError('');
    setQuestions(null);
    setOpenIdx(null);
    if (resumeText.trim().length < 100) {
      setError('Paste your full resume text (at least 100 characters) so the questions reflect your real experience.');
      return;
    }
    setLoading(true);
    try {
      const res = await fetch('/api/interview-questions/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ resume_text: resumeText.slice(0, 15000), target_role: targetRole }),
      });
      if (res.ok) {
        const data = await res.json();
        setQuestions(data.questions || []);
      } else if (res.status === 503) {
        setError('The AI generator is temporarily unavailable. Please try again in a few minutes.');
      } else {
        const body = await res.json().catch(() => null);
        setError(body?.detail || 'Something went wrong. Please try again.');
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
            Interview Questions From Your Resume
          </h1>
          <p className="text-lg text-emerald-100 max-w-2xl mx-auto">
            Interviewers build questions from your resume. So do we — paste it and prepare for the questions you'll actually get.
          </p>
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-4 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-4">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5">
              <h2 className="text-lg font-semibold text-gray-800 mb-3">Your Resume</h2>
              <textarea
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 min-h-[280px]"
                placeholder="Paste your full resume text here..."
                value={resumeText}
                onChange={(e) => setResumeText(e.target.value)}
                maxLength={15000}
              />
              <input
                className="w-full mt-3 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                placeholder="Target role (optional, e.g. Product Manager)"
                value={targetRole}
                onChange={(e) => setTargetRole(e.target.value)}
                maxLength={200}
              />
            </div>
            <button
              onClick={handleGenerate}
              disabled={loading}
              className="w-full py-3 bg-emerald-600 text-white font-semibold rounded-xl hover:bg-emerald-700 transition text-lg disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading ? 'Generating your questions...' : 'Generate My Interview Questions'}
            </button>
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 text-sm rounded-lg p-3" role="alert">{error}</div>
            )}
            <p className="text-xs text-gray-400">
              Your resume text is sent to our server only to generate questions and is not stored.
            </p>
          </div>

          <div>
            {questions ? (
              <div className="space-y-3">
                <h2 className="text-lg font-semibold text-gray-800">{questions.length} likely questions</h2>
                {questions.map((q, i) => (
                  <div key={i} className="bg-white rounded-xl shadow-sm border border-gray-200">
                    <button
                      className="w-full text-left p-4 flex items-start gap-3"
                      onClick={() => setOpenIdx(openIdx === i ? null : i)}
                      aria-expanded={openIdx === i}
                    >
                      <span className={`shrink-0 text-xs font-medium px-2 py-0.5 rounded-full mt-0.5 ${CATEGORY_STYLES[q.category] || 'bg-gray-100 text-gray-600'}`}>
                        {q.category}
                      </span>
                      <span className="text-sm font-medium text-gray-800 flex-1">{q.question}</span>
                      <span className="text-gray-400 text-sm">{openIdx === i ? '−' : '+'}</span>
                    </button>
                    {openIdx === i && q.hint && (
                      <div className="px-4 pb-4 -mt-1">
                        <p className="text-sm text-gray-600 bg-emerald-50 border border-emerald-100 rounded-lg p-3">
                          <span className="font-medium text-emerald-700">How to answer: </span>{q.hint}
                        </p>
                      </div>
                    )}
                  </div>
                ))}
                <div className="bg-white rounded-xl border border-gray-200 p-5 text-center">
                  <p className="text-sm text-gray-600 mb-3">Want a structured prep plan too?</p>
                  <Link to="/tools/interview-prep" className="inline-flex items-center px-5 py-2.5 bg-emerald-600 text-white font-medium rounded-lg hover:bg-emerald-700 transition text-sm no-underline">
                    Interview Prep Checklist
                  </Link>
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 flex flex-col items-center justify-center min-h-[300px] text-gray-400">
                <svg className="w-12 h-12 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <p className="text-sm text-center">Paste your resume to see<br />your likely interview questions</p>
              </div>
            )}
          </div>
        </div>

        <div className="py-6">
          <ShareButtons text="This free tool generates interview questions from your resume — brilliant for prep!" toolName="Interview Questions Generator" />
        </div>

        <div className="mt-12">
          <h2 className="text-2xl font-bold text-gray-800 text-center mb-8">Frequently Asked Questions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl mx-auto">
            {[
              { q: 'How are the questions generated?', a: 'An AI model reads your resume the way an interviewer does and produces questions grounded in your specific projects, companies, skills and any visible gaps — plus behavioral and role-fit questions.' },
              { q: 'How is this different from generic question lists?', a: 'Generic lists cover "tell me about yourself". These questions cite your actual resume — the project you listed, the gap in 2024, the tech stack you claim — which is exactly what real interviewers probe.' },
              { q: 'Is my resume stored?', a: 'No. The text is used only to generate the questions and is not saved.' },
              { q: 'Should I prepare written answers?', a: 'Prepare bullet-point stories using the STAR method (Situation, Task, Action, Result) rather than scripts — you want structured recall, not memorised paragraphs.' },
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
            <Link to="/interview-preparation" className="inline-flex items-center px-5 py-2.5 bg-gray-100 text-gray-700 font-medium rounded-lg hover:bg-gray-200 transition text-sm no-underline">Interview Prep Guide</Link>
            <Link to="/resume-score" className="inline-flex items-center px-5 py-2.5 bg-gray-100 text-gray-700 font-medium rounded-lg hover:bg-gray-200 transition text-sm no-underline">AI Resume Score</Link>
            <Link to="/" className="inline-flex items-center px-5 py-2.5 bg-gray-100 text-gray-700 font-medium rounded-lg hover:bg-gray-200 transition text-sm no-underline">Resume Builder</Link>
          </div>
        </div>
      </section>
    </div>
  );
}
