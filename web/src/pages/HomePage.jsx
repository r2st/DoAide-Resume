import { useState, useRef, useEffect, useCallback } from 'react';
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

function AnimatedCounter() {
  const [count, setCount] = useState(0);
  const [started, setStarted] = useState(false);
  const ref = useRef(null);
  const target = 50000;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !started) {
        setStarted(true);
        obs.disconnect();
      }
    }, { threshold: 0.3 });
    obs.observe(el);
    return () => obs.disconnect();
  }, [started]);

  useEffect(() => {
    if (!started) return;
    const duration = 2000;
    const steps = 60;
    const inc = target / steps;
    let current = 0;
    const interval = setInterval(() => {
      current += inc;
      if (current >= target) {
        setCount(target);
        clearInterval(interval);
      } else {
        setCount(Math.floor(current));
      }
    }, duration / steps);
    return () => clearInterval(interval);
  }, [started]);

  return (
    <div ref={ref} className="py-8 text-center" style={{ background: '#0A0A0B' }}>
      <div className="text-5xl font-light" style={{ fontFamily: "'Instrument Serif', Georgia, serif", color: '#F0B429' }}>
        {count.toLocaleString('en-IN')}+
      </div>
      <div className="text-base mt-1" style={{ color: '#9CA3AF' }}>Resumes Created</div>
    </div>
  );
}

const features = [
  {
    title: 'Free Forever',
    description: 'No hidden charges, no premium plans, no login required. Build and download your resume completely free.',
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="#F0B429" strokeWidth="1.5" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  {
    title: 'AI Enhancement',
    description: 'Improve your bullet points and summary with AI-powered suggestions tailored to your industry.',
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="#F0B429" strokeWidth="1.5" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
      </svg>
    ),
  },
  {
    title: '5 Professional Templates',
    description: 'Modern, Classic, Minimalist, Creative, and ATS-Friendly templates to match any job application.',
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="#F0B429" strokeWidth="1.5" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
      </svg>
    ),
  },
  {
    title: 'ATS Optimized',
    description: 'Check your resume against ATS systems. Get a score and actionable tips to improve your chances.',
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="#F0B429" strokeWidth="1.5" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  {
    title: 'Instant PDF Download',
    description: 'Download your resume as a professional PDF with one click. No watermarks, no sign-up.',
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="#F0B429" strokeWidth="1.5" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    ),
  },
  {
    title: 'Made for India',
    description: 'Templates designed for CA, MBA, Engineers, Teachers, and freshers applying to Indian companies.',
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="#F0B429" strokeWidth="1.5" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
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
      <section style={{ background: '#0A0A0B' }}>
        <div className="max-w-6xl mx-auto px-4 py-16 sm:py-24 text-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold leading-tight mb-6" style={{ fontFamily: "'Instrument Serif', Georgia, serif", color: '#E5E7EB' }}>
            Build your resume.<br /><span style={{ color: '#F0B429', fontStyle: 'italic' }}>Land the job.</span>
          </h1>
          <p className="text-lg sm:text-xl max-w-3xl mx-auto mb-8 leading-relaxed" style={{ color: '#9CA3AF' }}>
            AI-powered resume builder for Indian job seekers — professional templates,
            ATS optimization, instant PDF. No login required.
          </p>
          <button
            onClick={scrollToBuilder}
            className="inline-flex items-center justify-center gap-2 px-8 py-4 min-h-[48px] w-full sm:w-auto font-bold text-lg rounded-xl transition-all transform hover:-translate-y-0.5"
            style={{ background: '#F0B429', color: '#0A0A0B', boxShadow: '0 0 20px rgba(240,180,41,0.15)' }}
            onMouseEnter={e => e.currentTarget.style.background = '#D4A017'}
            onMouseLeave={e => e.currentTarget.style.background = '#F0B429'}
          >
            Start Building Your Resume
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </button>
        </div>
      </section>

      <AnimatedCounter />

      <RecentTools />

      {/* Career Tools Section */}
      <section className="max-w-5xl mx-auto px-4 py-10">
        <h2 className="text-xl font-bold text-center mb-2" style={{ color: '#E5E7EB' }}>More Free Career Tools</h2>
        <p className="text-center text-sm mb-6" style={{ color: '#6B7280' }}>No login required — use any tool instantly</p>
        <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
          {[
            { to: '/templates', icon: '🎨', name: 'Templates', desc: '5 professional designs' },
            { to: '/ats-checker', icon: '✅', name: 'ATS Checker', desc: 'Check ATS compatibility' },
            { to: '/cover-letter-generator', icon: '✉️', name: 'Cover Letter', desc: 'Generate cover letters' },
            { to: '/linkedin-summary-generator', icon: '💼', name: 'LinkedIn Summary', desc: 'Optimize your profile' },
            { to: '/interview-preparation', icon: '🎯', name: 'Interview Prep', desc: 'Practice questions' },
          ].map((tool) => (
            <Link key={tool.to} to={tool.to} className="group flex sm:block items-center gap-3 sm:text-center p-4 min-h-[44px] rounded-xl transition-all no-underline" style={{ background: '#1A1A1D', border: '1px solid #2A2A2D' }}>
              <span className="text-2xl sm:block sm:mb-2">{tool.icon}</span>
              <div>
                <div className="text-sm font-semibold transition-colors" style={{ color: '#E5E7EB' }}>{tool.name}</div>
                <div className="text-xs mt-0.5 sm:mt-1" style={{ color: '#6B7280' }}>{tool.desc}</div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Builder Section */}
      <section ref={builderRef} className="max-w-[1400px] mx-auto px-4 py-10" id="builder">
        {/* Job Role Selector and Export Buttons */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
          <div className="w-full sm:w-auto">
            <label className="block text-sm font-medium mb-1" style={{ color: '#9CA3AF' }}>
              Quick fill by job role
            </label>
            <select
              value={selectedRole}
              onChange={(e) => handleRoleSelect(e.target.value)}
              className="w-full sm:w-72 px-3 py-2.5 min-h-[44px] rounded-lg text-base sm:text-sm focus:outline-none focus:ring-2"
              style={{ background: '#111113', border: '1px solid #2A2A2D', color: '#E5E7EB' }}
            >
              <option value="">Select a role for suggestions...</option>
              {Object.keys(jobRoleSuggestions).map((role) => (
                <option key={role} value={role}>{role}</option>
              ))}
            </select>
          </div>
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full sm:w-auto">
            <button
              onClick={handleExportPdf}
              disabled={isExporting}
              className="inline-flex items-center justify-center gap-2 px-5 py-2.5 min-h-[44px] font-medium rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed text-sm"
              style={{ background: '#F0B429', color: '#0A0A0B' }}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              {isExporting ? 'Exporting...' : 'Download PDF'}
            </button>
            <button
              onClick={handleCheckAts}
              className="inline-flex items-center justify-center gap-2 px-5 py-2.5 min-h-[44px] font-medium rounded-lg transition text-sm"
              style={{ background: '#1A1A1D', color: '#F0B429', border: '1px solid #2A2A2D' }}
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
                className="inline-flex items-center gap-2 px-4 py-2 min-h-[44px] text-sm font-medium rounded-lg transition"
                style={{ background: '#1A1A1D', border: '1px solid #2A2A2D', color: '#E5E7EB' }}
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6z" />
                </svg>
                {showTemplateSelector ? 'Hide Templates' : 'Choose Template & Color'}
              </button>
            </div>
            {showTemplateSelector && (
              <div className="mb-6 p-4 rounded-xl shadow-sm" style={{ background: '#1A1A1D', border: '1px solid #2A2A2D' }}>
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
      <section className="py-16" style={{ background: '#0A0A0B' }}>
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-2xl sm:text-3xl font-bold text-center mb-4" style={{ color: '#E5E7EB', fontFamily: "'Instrument Serif', Georgia, serif" }}>
            Everything you need to <span style={{ color: '#F0B429', fontStyle: 'italic' }}>land the job</span>
          </h2>
          <p className="text-center mb-12 max-w-2xl mx-auto" style={{ color: '#6B7280' }}>
            A complete resume building toolkit — no sign-up, no hidden fees, no watermarks.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="p-6 rounded-xl transition-shadow hover:shadow-lg"
                style={{ background: '#1A1A1D', border: '1px solid #2A2A2D' }}
              >
                <div className="mb-4">{feature.icon}</div>
                <h3 className="text-lg font-semibold mb-2" style={{ color: '#E5E7EB' }}>{feature.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: '#9CA3AF' }}>{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <TrendingTools />

      {/* You Might Also Need */}
      <section className="py-16" style={{ background: '#111113' }}>
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-2xl font-bold text-center mb-2" style={{ color: '#E5E7EB' }}>You Might Also Need</h2>
          <p className="text-center mb-10" style={{ color: '#6B7280' }}>More free tools from DoAide to help your career and business</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <a href="https://docs.doaide.com" target="_blank" rel="noopener noreferrer" className="block p-5 rounded-xl transition-all no-underline" style={{ background: '#1A1A1D', border: '1px solid #2A2A2D' }}>
              <span className="text-2xl mb-2 block">📄</span>
              <h3 className="text-base font-semibold mb-1" style={{ color: '#E5E7EB' }}>Document Generator</h3>
              <p className="text-sm leading-relaxed" style={{ color: '#6B7280' }}>Rent receipts, salary slips, experience letters — free PDF download.</p>
            </a>
            <a href="https://gst.doaide.com" target="_blank" rel="noopener noreferrer" className="block p-5 rounded-xl transition-all no-underline" style={{ background: '#1A1A1D', border: '1px solid #2A2A2D' }}>
              <span className="text-2xl mb-2 block">🏷️</span>
              <h3 className="text-base font-semibold mb-1" style={{ color: '#E5E7EB' }}>GST Tools</h3>
              <p className="text-sm leading-relaxed" style={{ color: '#6B7280' }}>GST calculator, GSTIN verification, HSN code lookup, and filing dates.</p>
            </a>
            <a href="https://409a.doaide.com" target="_blank" rel="noopener noreferrer" className="block p-5 rounded-xl transition-all no-underline" style={{ background: '#1A1A1D', border: '1px solid #2A2A2D' }}>
              <span className="text-2xl mb-2 block">📊</span>
              <h3 className="text-base font-semibold mb-1" style={{ color: '#E5E7EB' }}>409A Valuations</h3>
              <p className="text-sm leading-relaxed" style={{ color: '#6B7280' }}>Independent, defensible startup valuations with AI-assisted intake.</p>
            </a>
            <a href="https://job.doaide.com" target="_blank" rel="noopener noreferrer" className="block p-5 rounded-xl transition-all no-underline" style={{ background: '#1A1A1D', border: '1px solid #2A2A2D' }}>
              <span className="text-2xl mb-2 block">💼</span>
              <h3 className="text-base font-semibold mb-1" style={{ color: '#E5E7EB' }}>AutoApply Jobs</h3>
              <p className="text-sm leading-relaxed" style={{ color: '#6B7280' }}>AI finds, matches, and applies to jobs for you.</p>
            </a>
          </div>
          <p className="text-center mt-6">
            <a href="https://doaide.com" target="_blank" rel="noopener noreferrer" className="text-sm font-medium no-underline" style={{ color: '#F0B429' }}>
              Explore all DoAide tools &rarr;
            </a>
          </p>
        </div>
      </section>
    </div>
  );
}
