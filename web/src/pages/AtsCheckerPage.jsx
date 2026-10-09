import { useState } from 'react';
import { Link } from 'react-router-dom';
import AtsScoreCard from '../components/AtsScoreCard';
import { checkAtsScore } from '../lib/atsChecker';
import ShareButtons from '../components/ShareButtons';

function parseResumeText(text) {
  if (!text || !text.trim()) return null;

  const lines = text.split('\n').map((l) => l.trim()).filter(Boolean);

  const personalInfo = { name: '', email: '', phone: '', location: '' };
  const emailMatch = text.match(/[\w.-]+@[\w.-]+\.\w+/);
  if (emailMatch) personalInfo.email = emailMatch[0];
  const phoneMatch = text.match(/(\+?\d[\d\s\-()]{7,}\d)/);
  if (phoneMatch) personalInfo.phone = phoneMatch[1];
  if (lines.length > 0) personalInfo.name = lines[0];

  let summary = '';
  const bullets = [];
  const skillItems = [];

  const summaryKeywords = ['summary', 'objective', 'profile', 'about'];
  const expKeywords = ['experience', 'employment', 'work history'];
  const skillKeywords = ['skills', 'competencies', 'technologies', 'technical'];
  const eduKeywords = ['education', 'qualification', 'academic'];

  let currentSection = '';

  for (const line of lines) {
    const lower = line.toLowerCase();

    if (summaryKeywords.some((k) => lower.includes(k) && lower.length < 40)) {
      currentSection = 'summary';
      continue;
    }
    if (expKeywords.some((k) => lower.includes(k) && lower.length < 40)) {
      currentSection = 'experience';
      continue;
    }
    if (skillKeywords.some((k) => lower.includes(k) && lower.length < 40)) {
      currentSection = 'skills';
      continue;
    }
    if (eduKeywords.some((k) => lower.includes(k) && lower.length < 40)) {
      currentSection = 'education';
      continue;
    }

    if (currentSection === 'summary') {
      summary += (summary ? ' ' : '') + line;
    } else if (currentSection === 'experience') {
      if (line.startsWith('-') || line.startsWith('*') || line.match(/^[A-Z]/)) {
        bullets.push(line.replace(/^[-*]\s*/, ''));
      }
    } else if (currentSection === 'skills') {
      const items = line.split(/[,|;]/).map((s) => s.trim()).filter(Boolean);
      skillItems.push(...items);
    }
  }

  return {
    personalInfo,
    summary,
    experience: bullets.length > 0
      ? [{ company: 'Parsed', title: 'Parsed', startDate: '2020', bullets }]
      : [],
    education: text.toLowerCase().includes('education')
      ? [{ degree: 'Parsed', institution: 'Parsed', year: '2020' }]
      : [],
    skills: skillItems.length > 0
      ? [{ category: 'Parsed', items: skillItems }]
      : [],
  };
}

async function fetchAiAnalysis(resumeText, jobDescription) {
  try {
    const res = await fetch('/api/ats/check', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ resume_text: resumeText, job_description: jobDescription }),
    });
    if (!res.ok) return null;
    return await res.json();
  } catch {
    return null;
  }
}

const atsTips = [
  {
    title: 'Use Standard Section Headings',
    description: 'Stick to headings like "Work Experience", "Education", "Skills". ATS systems look for these standard labels.',
  },
  {
    title: 'Avoid Graphics and Tables',
    description: 'ATS cannot read images, icons, or complex table layouts. Use plain text formatting.',
  },
  {
    title: 'Include Keywords from the Job Description',
    description: 'Mirror the exact keywords and phrases from the job posting. If they say "project management", use that exact phrase.',
  },
  {
    title: 'Use a Clean File Format',
    description: 'Submit as PDF or DOCX. Avoid unconventional file types that ATS may not parse correctly.',
  },
  {
    title: 'Spell Out Acronyms',
    description: 'Write "Search Engine Optimization (SEO)" the first time. ATS might search for either the full term or the acronym.',
  },
  {
    title: 'Use Standard Fonts',
    description: 'Arial, Calibri, Times New Roman, and similar fonts parse well. Avoid decorative or custom fonts.',
  },
  {
    title: 'Quantify Your Achievements',
    description: 'Numbers stand out: "increased sales by 30%" is better than "significantly increased sales".',
  },
  {
    title: 'Keep Formatting Simple',
    description: 'Avoid headers/footers, text boxes, and columns. A single-column layout works best for ATS.',
  },
];

export default function AtsCheckerPage() {
  const [resumeText, setResumeText] = useState('');
  const [jobDescription, setJobDescription] = useState('');
  const [atsScore, setAtsScore] = useState(null);
  const [aiAnalysis, setAiAnalysis] = useState(null);
  const [isChecking, setIsChecking] = useState(false);

  const handleCheck = async () => {
    if (!resumeText.trim()) {
      alert('Please paste your resume text first.');
      return;
    }

    setIsChecking(true);
    setAiAnalysis(null);

    const parsedData = parseResumeText(resumeText);
    const result = checkAtsScore(parsedData, jobDescription);
    setAtsScore({
      overall: result.score,
      breakdown: result.breakdown.map((item) => ({
        category: item.category,
        score: item.maxScore > 0 ? Math.round((item.score / item.maxScore) * 100) : 0,
        rawScore: item.score,
        maxScore: item.maxScore,
        tips: item.tips || [],
      })),
      keywordsFound: result.keywords.found || [],
      keywordsMissing: result.keywords.missing || [],
      tips: [
        ...result.overallTips,
        ...result.breakdown.flatMap((item) => item.tips || []),
      ],
    });

    const ai = await fetchAiAnalysis(resumeText, jobDescription);
    if (ai) setAiAnalysis(ai);
    setIsChecking(false);
  };

  return (
    <div>
      {/* Hero */}
      <section className="bg-gradient-to-br from-amber-500 to-orange-600 text-white py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-3xl sm:text-4xl font-extrabold mb-4">
            Free ATS Resume Score Checker
          </h1>
          <p className="text-lg text-amber-100 max-w-2xl mx-auto">
            Over 90% of large companies use Applicant Tracking Systems to filter resumes before a human ever sees them.
            Check your resume's ATS compatibility score and get actionable improvement tips.
          </p>
        </div>
      </section>

      {/* How ATS Works */}
      <section className="bg-white border-b border-gray-100">
        <div className="max-w-4xl mx-auto px-4 py-10">
          <h2 className="text-xl font-bold text-gray-800 mb-3">How Does ATS Work?</h2>
          <p className="text-gray-600 leading-relaxed">
            An Applicant Tracking System (ATS) scans your resume for relevant keywords, proper formatting,
            and structured sections. It ranks candidates based on how well their resume matches the job description.
            Resumes that score below the threshold are automatically rejected -- even if the candidate is qualified.
            Our checker analyzes your resume against the same criteria these systems use, so you can fix issues before applying.
          </p>
        </div>
      </section>

      {/* Checker Interface */}
      <section className="max-w-5xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Resume Text */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Paste Your Resume Text
            </label>
            <textarea
              value={resumeText}
              onChange={(e) => setResumeText(e.target.value)}
              placeholder={"Paste the full text of your resume here...\n\nExample:\nJohn Doe\njohn@email.com | +91 98765 43210\n\nSummary\nExperienced software engineer with 5+ years...\n\nExperience\n- Led a team of 5 engineers at XYZ Corp\n- Developed REST APIs serving 100K users\n\nSkills\nJavaScript, React, Node.js, Python, AWS"}
              rows={16}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 resize-y font-mono"
            />
            <p className="mt-1 text-xs text-gray-400">
              {resumeText.length > 0 ? `${resumeText.split(/\s+/).filter(Boolean).length} words` : 'Tip: Copy all the text from your resume file and paste it here'}
            </p>
          </div>

          {/* Job Description */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Paste Job Description <span className="text-gray-400 font-normal">(optional)</span>
            </label>
            <textarea
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
              placeholder={"Paste the job description here for keyword matching...\n\nThis helps us check how well your resume aligns with the specific role you're applying for.\n\nExample:\nWe are looking for a Senior Software Engineer with experience in React, Node.js, and AWS. The candidate should have 5+ years of experience building scalable web applications..."}
              rows={16}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 resize-y font-mono"
            />
            <p className="mt-1 text-xs text-gray-400">
              {jobDescription.length > 0 ? `${jobDescription.split(/\s+/).filter(Boolean).length} words` : 'Adding a job description enables keyword matching analysis'}
            </p>
          </div>
        </div>

        {/* Check Button */}
        <div className="mt-6 text-center">
          <button
            onClick={handleCheck}
            disabled={isChecking || !resumeText.trim()}
            className="inline-flex items-center gap-2 px-8 py-3 bg-amber-500 text-white font-bold text-lg rounded-xl hover:bg-amber-600 transition disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
          >
            {isChecking ? (
              <>
                <svg className="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
                Analyzing...
              </>
            ) : (
              <>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Check ATS Score
              </>
            )}
          </button>
        </div>

        {/* Inline suggestion */}
        <div className="mt-8 p-4 bg-blue-50 border border-blue-200 rounded-xl text-center">
          <p className="text-sm text-blue-700">
            Want a structured resume that scores higher?{' '}
            <Link to="/" className="font-semibold underline hover:text-blue-900">
              Use our free resume builder
            </Link>{' '}
            -- it creates ATS-optimized resumes automatically.
          </p>
        </div>
      </section>

      {/* ATS Score Modal */}
      {atsScore && (
        <AtsScoreCard score={atsScore} onClose={() => setAtsScore(null)} />
      )}

      {/* AI-Powered Analysis */}
      {aiAnalysis && (
        <section className="max-w-5xl mx-auto px-4 py-8">
          <div className="rounded-2xl border border-amber-200 bg-amber-50 p-6 sm:p-8">
            <div className="flex items-center gap-2 mb-4">
              <svg className="w-5 h-5 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              <h2 className="text-xl font-bold text-gray-800">AI-Powered Analysis</h2>
              <span className="text-xs bg-amber-200 text-amber-800 px-2 py-0.5 rounded-full font-medium">Gemini AI</span>
            </div>

            {/* AI Score */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-6">
              <div className="flex items-center gap-3">
                <div className={`text-4xl font-extrabold ${aiAnalysis.score >= 70 ? 'text-green-600' : aiAnalysis.score >= 50 ? 'text-amber-600' : 'text-red-600'}`}>
                  {aiAnalysis.score}
                </div>
                <div className="text-sm text-gray-500">/ 100</div>
              </div>
              <p className="text-sm text-gray-700 leading-relaxed">{aiAnalysis.summary}</p>
            </div>

            {/* Section Scores */}
            {aiAnalysis.section_scores && Object.keys(aiAnalysis.section_scores).length > 0 && (
              <div className="mb-6">
                <h3 className="text-sm font-semibold text-gray-700 mb-3">Section Breakdown</h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {Object.entries(aiAnalysis.section_scores).map(([key, val]) => (
                    <div key={key} className="bg-white rounded-lg border border-gray-100 p-3">
                      <div className="text-xs text-gray-500 capitalize mb-1">{key}</div>
                      <div className="flex items-center gap-2">
                        <div className="flex-1 bg-gray-100 rounded-full h-2">
                          <div className={`h-2 rounded-full ${val >= 70 ? 'bg-green-500' : val >= 50 ? 'bg-amber-500' : 'bg-red-500'}`} style={{ width: `${val}%` }} />
                        </div>
                        <span className="text-sm font-semibold text-gray-700">{val}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Keywords */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
              {aiAnalysis.keyword_matches.length > 0 && (
                <div>
                  <h3 className="text-sm font-semibold text-green-700 mb-2">Keywords Found ({aiAnalysis.keyword_matches.length})</h3>
                  <div className="flex flex-wrap gap-1.5">
                    {aiAnalysis.keyword_matches.map((kw, i) => (
                      <span key={i} className="px-2 py-0.5 bg-green-100 text-green-800 text-xs rounded-full">{kw}</span>
                    ))}
                  </div>
                </div>
              )}
              {aiAnalysis.missing_keywords.length > 0 && (
                <div>
                  <h3 className="text-sm font-semibold text-red-700 mb-2">Missing Keywords ({aiAnalysis.missing_keywords.length})</h3>
                  <div className="flex flex-wrap gap-1.5">
                    {aiAnalysis.missing_keywords.map((kw, i) => (
                      <span key={i} className="px-2 py-0.5 bg-red-100 text-red-800 text-xs rounded-full">{kw}</span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Suggestions */}
            {aiAnalysis.suggestions.length > 0 && (
              <div>
                <h3 className="text-sm font-semibold text-gray-700 mb-2">Improvement Suggestions</h3>
                <ul className="space-y-2">
                  {aiAnalysis.suggestions.map((s, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
                      <span className="flex-shrink-0 w-5 h-5 bg-amber-100 text-amber-700 rounded-full flex items-center justify-center text-xs font-bold mt-0.5">{i + 1}</span>
                      {s}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </section>
      )}

      <div className="max-w-4xl mx-auto px-4 py-6">
        <ShareButtons text="Check your resume's ATS score for free — no login needed!" toolName="ATS Resume Checker" />
      </div>

      {/* ATS Optimization Tips */}
      <section className="bg-gray-50 py-16">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-2xl font-bold text-gray-800 mb-2 text-center">
            ATS Optimization Tips
          </h2>
          <p className="text-gray-500 text-center mb-10">
            Follow these tips to ensure your resume passes through ATS filters.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {atsTips.map((tip, idx) => (
              <div
                key={idx}
                className="p-5 bg-white rounded-xl border border-gray-100 shadow-sm"
              >
                <div className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-7 h-7 bg-amber-100 text-amber-700 rounded-full flex items-center justify-center text-sm font-bold">
                    {idx + 1}
                  </span>
                  <div>
                    <h3 className="font-semibold text-gray-800 mb-1">{tip.title}</h3>
                    <p className="text-sm text-gray-600 leading-relaxed">{tip.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
