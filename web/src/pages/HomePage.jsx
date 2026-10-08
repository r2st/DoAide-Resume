import { useState, useRef, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import ResumeEditor from '../components/ResumeEditor';
import RecentTools from '../components/RecentTools';
import TrendingTools from '../components/TrendingTools';
import ResumePreview from '../components/ResumePreview';
import TemplateSelector from '../components/TemplateSelector';
import AtsScoreCard from '../components/AtsScoreCard';
import { exportToPdf } from '../lib/pdfExport';
import { checkAtsScore } from '../lib/atsChecker';
import { jobRoleSuggestions } from '../lib/jobSuggestions';

const defaultResumeData = {
  personal: { name: '', email: '', phone: '', location: '', linkedin: '', website: '' },
  summary: '',
  experience: [{ company: '', title: '', location: '', startDate: '', endDate: '', current: false, bullets: [''] }],
  education: [{ institution: '', degree: '', field: '', startDate: '', endDate: '', gpa: '' }],
  skills: [{ category: 'Technical', items: [] }],
  projects: [],
  certifications: [],
  languages: [],
  hobbies: [],
};

const features = [
  {
    title: 'Free Forever',
    description: 'No hidden charges, no premium plans, no login required. Build and download your resume completely free.',
    icon: (
      <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  {
    title: 'AI Enhancement',
    description: 'Improve your bullet points and summary with AI-powered suggestions tailored to your industry.',
    icon: (
      <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
      </svg>
    ),
  },
  {
    title: '5 Professional Templates',
    description: 'Modern, Classic, Minimalist, Creative, and ATS-Friendly templates to match any job application.',
    icon: (
      <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
      </svg>
    ),
  },
  {
    title: 'ATS Optimized',
    description: 'Check your resume against ATS systems. Get a score and actionable tips to improve your chances.',
    icon: (
      <svg className="w-8 h-8 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  {
    title: 'Instant PDF Download',
    description: 'Download your resume as a professional PDF with one click. No watermarks, no sign-up.',
    icon: (
      <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    ),
  },
  {
    title: 'Made for India',
    description: 'Templates designed for CA, MBA, Engineers, Teachers, and freshers applying to Indian companies.',
    icon: (
      <svg className="w-8 h-8 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
];

export default function HomePage() {
  const [resumeData, setResumeData] = useState(defaultResumeData);
  const [selectedTemplate, setSelectedTemplate] = useState('modern');
  const [templateColor, setTemplateColor] = useState('#2563eb');
  const [atsScore, setAtsScore] = useState(null);
  const [selectedRole, setSelectedRole] = useState('');
  const [isExporting, setIsExporting] = useState(false);
  const [showTemplateSelector, setShowTemplateSelector] = useState(false);
  const builderRef = useRef(null);
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const tmpl = searchParams.get('template');
    if (tmpl && ['modern', 'classic', 'minimalist', 'creative', 'ats'].includes(tmpl)) {
      setSelectedTemplate(tmpl);
      builderRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [searchParams]);

  const scrollToBuilder = () => {
    builderRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleRoleSelect = (role) => {
    setSelectedRole(role);
    if (!role) return;
    const suggestion = jobRoleSuggestions[role];
    if (!suggestion) return;

    setResumeData((prev) => ({
      ...prev,
      skills: [{ category: 'Technical', items: [...suggestion.skills] }],
      experience: prev.experience.map((exp, i) =>
        i === 0
          ? { ...exp, bullets: suggestion.bullets.slice(0, 3) }
          : exp
      ),
    }));
  };

  const handleAiEnhance = async (type, data) => {
    try {
      const res = await fetch(`/api/ai/${type}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      return await res.json();
    } catch (err) {
      console.error('AI enhance failed:', err);
      return null;
    }
  };

  const handleExportPdf = async () => {
    setIsExporting(true);
    try {
      await exportToPdf('resume-preview', `${resumeData.personal.name || 'resume'}.pdf`);
    } catch (err) {
      console.error('PDF export failed:', err);
      alert('Failed to export PDF. Please try again.');
    } finally {
      setIsExporting(false);
    }
  };

  const handleCheckAts = () => {
    const adaptedData = {
      personalInfo: resumeData.personal,
      summary: resumeData.summary,
      experience: resumeData.experience,
      education: resumeData.education,
      skills: resumeData.skills,
    };
    const result = checkAtsScore(adaptedData);
    setAtsScore({
      overall: result.score,
      breakdown: result.breakdown.map((item) => ({
        category: item.category,
        score: item.maxScore > 0 ? Math.round((item.score / item.maxScore) * 100) : 0,
      })),
      keywordsFound: result.keywords.found || [],
      keywordsMissing: result.keywords.missing || [],
      tips: [
        ...result.overallTips,
        ...result.breakdown.flatMap((item) => item.tips || []),
      ],
    });
  };

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 text-white">
        <div className="max-w-6xl mx-auto px-4 py-16 sm:py-24 text-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold leading-tight mb-6">
            Build Your Resume in Minutes — 100% Free
          </h1>
          <p className="text-lg sm:text-xl text-blue-100 max-w-3xl mx-auto mb-8 leading-relaxed">
            AI-powered resume builder designed for Indian job seekers. Professional templates,
            ATS optimization, instant PDF download. No login required.
          </p>
          <button
            onClick={scrollToBuilder}
            className="inline-flex items-center gap-2 px-8 py-4 bg-white text-blue-700 font-bold text-lg rounded-xl shadow-lg hover:shadow-xl hover:bg-blue-50 transition-all transform hover:-translate-y-0.5"
          >
            Start Building Your Resume
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </button>
        </div>
      </section>

      <RecentTools />

      {/* Career Tools Section */}
      <section className="max-w-5xl mx-auto px-4 py-10">
        <h2 className="text-xl font-bold text-gray-800 text-center mb-2">More Free Career Tools</h2>
        <p className="text-gray-500 text-center text-sm mb-6">No login required — use any tool instantly</p>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
          <Link to="/templates" className="group block p-4 bg-white rounded-xl border border-gray-200 hover:border-blue-300 hover:shadow-md transition-all text-center no-underline">
            <span className="text-2xl block mb-2">🎨</span>
            <div className="text-sm font-semibold text-gray-800 group-hover:text-blue-600 transition-colors">Templates</div>
            <div className="text-xs text-gray-400 mt-1">5 professional designs</div>
            <span className="text-xs font-bold text-blue-600 mt-2 block opacity-0 group-hover:opacity-100 transition-opacity">Try Now →</span>
          </Link>
          <Link to="/ats-checker" className="group block p-4 bg-white rounded-xl border border-gray-200 hover:border-blue-300 hover:shadow-md transition-all text-center no-underline">
            <span className="text-2xl block mb-2">✅</span>
            <div className="text-sm font-semibold text-gray-800 group-hover:text-blue-600 transition-colors">ATS Checker</div>
            <div className="text-xs text-gray-400 mt-1">Check ATS compatibility</div>
            <span className="text-xs font-bold text-blue-600 mt-2 block opacity-0 group-hover:opacity-100 transition-opacity">Try Now →</span>
          </Link>
          <Link to="/cover-letter-generator" className="group block p-4 bg-white rounded-xl border border-gray-200 hover:border-blue-300 hover:shadow-md transition-all text-center no-underline">
            <span className="text-2xl block mb-2">✉️</span>
            <div className="text-sm font-semibold text-gray-800 group-hover:text-blue-600 transition-colors">Cover Letter</div>
            <div className="text-xs text-gray-400 mt-1">Generate cover letters</div>
            <span className="text-xs font-bold text-blue-600 mt-2 block opacity-0 group-hover:opacity-100 transition-opacity">Try Now →</span>
          </Link>
          <Link to="/linkedin-summary-generator" className="group block p-4 bg-white rounded-xl border border-gray-200 hover:border-blue-300 hover:shadow-md transition-all text-center no-underline">
            <span className="text-2xl block mb-2">💼</span>
            <div className="text-sm font-semibold text-gray-800 group-hover:text-blue-600 transition-colors">LinkedIn Summary</div>
            <div className="text-xs text-gray-400 mt-1">Optimize your profile</div>
            <span className="text-xs font-bold text-blue-600 mt-2 block opacity-0 group-hover:opacity-100 transition-opacity">Try Now →</span>
          </Link>
          <Link to="/interview-preparation" className="group block p-4 bg-white rounded-xl border border-gray-200 hover:border-blue-300 hover:shadow-md transition-all text-center no-underline">
            <span className="text-2xl block mb-2">🎯</span>
            <div className="text-sm font-semibold text-gray-800 group-hover:text-blue-600 transition-colors">Interview Prep</div>
            <div className="text-xs text-gray-400 mt-1">Practice questions</div>
            <span className="text-xs font-bold text-blue-600 mt-2 block opacity-0 group-hover:opacity-100 transition-opacity">Try Now →</span>
          </Link>
        </div>
      </section>

      {/* Builder Section */}
      <section ref={builderRef} className="max-w-[1400px] mx-auto px-4 py-10" id="builder">
        {/* Job Role Selector and Export Buttons */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
          <div className="w-full sm:w-auto">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Quick fill by job role
            </label>
            <select
              value={selectedRole}
              onChange={(e) => handleRoleSelect(e.target.value)}
              className="w-full sm:w-72 px-3 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
            >
              <option value="">Select a role for suggestions...</option>
              {Object.keys(jobRoleSuggestions).map((role) => (
                <option key={role} value={role}>{role}</option>
              ))}
            </select>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={handleExportPdf}
              disabled={isExporting}
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed text-sm"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              {isExporting ? 'Exporting...' : 'Download PDF'}
            </button>
            <button
              onClick={handleCheckAts}
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-amber-500 text-white font-medium rounded-lg hover:bg-amber-600 transition text-sm"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Check ATS Score
            </button>
          </div>
        </div>

        {/* Two-column Builder Layout */}
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Left Panel: Editor */}
          <div className="w-full lg:w-[40%] lg:sticky lg:top-4 lg:self-start lg:max-h-[calc(100vh-2rem)] lg:overflow-y-auto">
            <ResumeEditor
              data={resumeData}
              setData={setResumeData}
              onAiEnhance={handleAiEnhance}
            />
          </div>

          {/* Right Panel: Template Selector + Preview */}
          <div className="w-full lg:w-[60%]">
            {/* Toggle Template Selector */}
            <div className="mb-4">
              <button
                onClick={() => setShowTemplateSelector(!showTemplateSelector)}
                className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6z" />
                </svg>
                {showTemplateSelector ? 'Hide Templates' : 'Choose Template & Color'}
              </button>
            </div>
            {showTemplateSelector && (
              <div className="mb-6 p-4 bg-white rounded-xl shadow-sm border border-gray-200">
                <TemplateSelector
                  selected={selectedTemplate}
                  onSelect={setSelectedTemplate}
                  color={templateColor}
                  onColorChange={setTemplateColor}
                />
              </div>
            )}

            {/* Resume Preview */}
            <div className="bg-gray-100 rounded-xl p-4 min-h-[600px] overflow-auto">
              <ResumePreview
                data={resumeData}
                template={selectedTemplate}
                templateColor={templateColor}
              />
            </div>
          </div>
        </div>
      </section>

      {/* ATS Score Modal */}
      {atsScore && (
        <AtsScoreCard score={atsScore} onClose={() => setAtsScore(null)} />
      )}

      {/* Features Grid */}
      <section className="bg-white py-16">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-2xl sm:text-3xl font-bold text-center text-gray-800 mb-4">
            Everything You Need to Land Your Dream Job
          </h2>
          <p className="text-gray-500 text-center mb-12 max-w-2xl mx-auto">
            A complete resume building toolkit -- no sign-up, no hidden fees, no watermarks.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="p-6 bg-gray-50 rounded-xl border border-gray-100 hover:shadow-md transition-shadow"
              >
                <div className="mb-4">{feature.icon}</div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">{feature.title}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <TrendingTools />

      {/* You Might Also Need */}
      <section className="bg-gray-50 py-16">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-2xl font-bold text-center text-gray-800 mb-2">You Might Also Need</h2>
          <p className="text-gray-500 text-center mb-10">More free tools from DoAide to help your career and business</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <a href="https://docs.doaide.com" target="_blank" rel="noopener noreferrer" className="block p-5 bg-white rounded-xl border border-gray-200 hover:shadow-md hover:border-blue-300 transition-all no-underline">
              <span className="text-2xl mb-2 block">📄</span>
              <h3 className="text-base font-semibold text-gray-800 mb-1">Document Generator</h3>
              <p className="text-sm text-gray-500 leading-relaxed">Rent receipts, salary slips, experience letters — free PDF download.</p>
            </a>
            <a href="https://gst.doaide.com" target="_blank" rel="noopener noreferrer" className="block p-5 bg-white rounded-xl border border-gray-200 hover:shadow-md hover:border-blue-300 transition-all no-underline">
              <span className="text-2xl mb-2 block">🏷️</span>
              <h3 className="text-base font-semibold text-gray-800 mb-1">GST Tools</h3>
              <p className="text-sm text-gray-500 leading-relaxed">GST calculator, GSTIN verification, HSN code lookup, and filing dates.</p>
            </a>
            <a href="https://409a.doaide.com" target="_blank" rel="noopener noreferrer" className="block p-5 bg-white rounded-xl border border-gray-200 hover:shadow-md hover:border-blue-300 transition-all no-underline">
              <span className="text-2xl mb-2 block">📊</span>
              <h3 className="text-base font-semibold text-gray-800 mb-1">409A Valuations</h3>
              <p className="text-sm text-gray-500 leading-relaxed">Independent, defensible startup valuations with AI-assisted intake.</p>
            </a>
            <a href="https://contracts.doaide.com" target="_blank" rel="noopener noreferrer" className="block p-5 bg-white rounded-xl border border-gray-200 hover:shadow-md hover:border-blue-300 transition-all no-underline">
              <span className="text-2xl mb-2 block">📋</span>
              <h3 className="text-base font-semibold text-gray-800 mb-1">Contracts</h3>
              <p className="text-sm text-gray-500 leading-relaxed">Draft NDAs, service agreements, and employment contracts with AI.</p>
            </a>
          </div>
          <p className="text-center mt-6">
            <a href="https://doaide.com" target="_blank" rel="noopener noreferrer" className="text-sm text-blue-600 hover:text-blue-700 font-medium no-underline">
              Explore all DoAide tools &rarr;
            </a>
          </p>
        </div>
      </section>
    </div>
  );
}
