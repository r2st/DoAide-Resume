import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ShareButtons from '../components/ShareButtons';

const TONES = [
  { id: 'professional', label: 'Professional', desc: 'Formal and polished' },
  { id: 'confident', label: 'Confident', desc: 'Strong and assertive' },
  { id: 'enthusiastic', label: 'Enthusiastic', desc: 'Warm and eager' },
  { id: 'concise', label: 'Concise', desc: 'Brief and direct' },
];

const TEMPLATES = {
  experienced: {
    label: 'Experienced Professional',
    generate: (d) => `Dear ${d.hiringManager || 'Hiring Manager'},

I am writing to express my interest in the ${d.jobTitle} position at ${d.company}. With ${d.yearsExp || 'several'} years of experience in ${d.industry || 'the industry'}, I am confident in my ability to contribute meaningfully to your team.

${d.currentRole ? `In my current role as ${d.currentRole}${d.currentCompany ? ` at ${d.currentCompany}` : ''}, I have ${d.achievement1 || 'delivered impactful results that align with the requirements of this position'}.` : ''}

${d.achievement2 ? `Additionally, ${d.achievement2}.` : ''}

${d.whyCompany ? `I am particularly drawn to ${d.company} because ${d.whyCompany}.` : `I am excited about the opportunity to bring my expertise to ${d.company} and contribute to your continued success.`}

${d.skills ? `My core competencies include ${d.skills}, which I believe align well with the requirements outlined in the job description.` : ''}

I would welcome the opportunity to discuss how my background and skills can benefit ${d.company}. Thank you for considering my application. I look forward to hearing from you.

Sincerely,
${d.name || '[Your Name]'}
${d.email ? d.email : ''}${d.phone ? '\n' + d.phone : ''}`,
  },
  fresher: {
    label: 'Fresher / Graduate',
    generate: (d) => `Dear ${d.hiringManager || 'Hiring Manager'},

I am writing to apply for the ${d.jobTitle} position at ${d.company}. As a recent ${d.degree || 'graduate'} from ${d.institution || '[University Name]'}, I am eager to begin my professional career and contribute to your organisation.

During my academic tenure, ${d.achievement1 || 'I developed strong analytical and problem-solving skills through coursework and projects'}. ${d.achievement2 ? d.achievement2 + '.' : ''}

${d.skills ? `I have developed proficiency in ${d.skills} through academic projects, internships, and self-directed learning.` : ''}

${d.whyCompany ? `I am particularly interested in ${d.company} because ${d.whyCompany}.` : `${d.company}'s reputation for innovation and growth makes it the ideal place to launch my career.`}

I am a quick learner with a strong work ethic and am excited about the opportunity to grow with your team. Thank you for considering my application.

Sincerely,
${d.name || '[Your Name]'}
${d.email ? d.email : ''}${d.phone ? '\n' + d.phone : ''}`,
  },
  it_professional: {
    label: 'IT / Software Engineer',
    generate: (d) => `Dear ${d.hiringManager || 'Hiring Manager'},

I am writing to apply for the ${d.jobTitle} position at ${d.company}. With ${d.yearsExp || 'significant'} years of experience in software development and IT, I bring a strong track record of delivering scalable, production-grade solutions.

${d.currentRole ? `As a ${d.currentRole}${d.currentCompany ? ` at ${d.currentCompany}` : ''}, ${d.achievement1 || 'I have architected and shipped features used by thousands of users while maintaining high code quality and test coverage'}.` : ''}

${d.achievement2 ? `${d.achievement2}.` : ''}

${d.skills ? `My technical stack includes ${d.skills}. I follow engineering best practices including code reviews, CI/CD pipelines, and agile methodologies.` : 'I am proficient across the modern development stack and follow engineering best practices including code reviews, CI/CD pipelines, and agile methodologies.'}

${d.whyCompany ? `I am particularly interested in ${d.company} because ${d.whyCompany}.` : `I am drawn to ${d.company}'s engineering culture and the opportunity to solve complex technical challenges at scale.`}

I am comfortable working in fast-paced environments, collaborating with cross-functional teams, and mentoring junior developers. I would welcome the chance to discuss how I can contribute to ${d.company}'s engineering goals.

Thank you for your consideration.

Best regards,
${d.name || '[Your Name]'}
${d.email ? d.email : ''}${d.phone ? '\n' + d.phone : ''}${d.linkedin ? '\n' + d.linkedin : ''}`,
  },
  career_change: {
    label: 'Career Change',
    generate: (d) => `Dear ${d.hiringManager || 'Hiring Manager'},

I am writing to express my interest in the ${d.jobTitle} position at ${d.company}. While my background is in ${d.previousField || 'a different domain'}, I have developed transferable skills that make me a strong candidate for this role.

${d.currentRole ? `In my ${d.yearsExp || ''} years as ${d.currentRole}${d.currentCompany ? ` at ${d.currentCompany}` : ''}, I have ${d.achievement1 || 'honed skills in communication, problem-solving, and project management'}.` : ''}

${d.achievement2 ? `${d.achievement2}.` : ''}

${d.whyCompany ? `I am drawn to ${d.company} because ${d.whyCompany}.` : `I believe that my unique perspective combined with my enthusiasm for ${d.industry || 'this field'} will enable me to contribute fresh ideas to your team.`}

${d.skills ? `I have invested in building relevant skills including ${d.skills} to ensure a smooth transition.` : ''}

I am eager to discuss how my diverse experience can add value to ${d.company}. Thank you for your time and consideration.

Sincerely,
${d.name || '[Your Name]'}
${d.email ? d.email : ''}${d.phone ? '\n' + d.phone : ''}`,
  },
};

export default function CoverLetterGenerator() {
  const [form, setForm] = useState({
    name: '', email: '', phone: '', linkedin: '',
    jobTitle: '', company: '', hiringManager: '',
    currentRole: '', currentCompany: '', yearsExp: '',
    industry: '', previousField: '',
    degree: '', institution: '',
    achievement1: '', achievement2: '',
    whyCompany: '', skills: '',
  });
  const [template, setTemplate] = useState('experienced');
  const [tone, setTone] = useState('professional');
  const [generated, setGenerated] = useState('');
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    document.title = 'Free Cover Letter Generator India | DoAide Resume';
    const meta = document.querySelector('meta[name="description"]');
    if (meta) meta.content = 'Generate professional cover letters for free. Templates for freshers, experienced professionals, and career changers. No login required.';
  }, []);

  const handleChange = (field) => (e) => setForm((prev) => ({ ...prev, [field]: e.target.value }));

  const handleGenerate = () => {
    const tmpl = TEMPLATES[template];
    let text = tmpl.generate(form);
    if (tone === 'confident') {
      text = text.replace(/I believe/g, 'I am certain').replace(/I am confident/g, 'I am fully confident');
    } else if (tone === 'enthusiastic') {
      text = text.replace(/I am writing/g, 'I am thrilled to be writing').replace(/I am eager/g, 'I am extremely eager');
    } else if (tone === 'concise') {
      text = text.split('\n').filter((l) => l.trim()).join('\n\n');
    }
    setGenerated(text);
  };

  const handleCopy = async () => {
    await navigator.clipboard.writeText(generated);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const blob = new Blob([generated], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `cover-letter-${form.company || 'draft'}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const wordCount = generated ? generated.split(/\s+/).filter(Boolean).length : 0;

  return (
    <div>
      <section className="bg-gradient-to-br from-emerald-600 via-emerald-700 to-teal-800 text-white">
        <div className="max-w-4xl mx-auto px-4 py-14 sm:py-20 text-center">
          <div className="inline-block bg-emerald-500/30 text-emerald-100 text-sm font-medium px-4 py-1.5 rounded-full mb-4">
            100% Free - No Login Required
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold leading-tight mb-4">
            Free Cover Letter Generator
          </h1>
          <p className="text-lg text-emerald-100 max-w-2xl mx-auto">
            Generate professional cover letters in seconds. Choose a template, fill in your details, and download — completely free.
          </p>
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-4 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left: Form */}
          <div className="space-y-6">
            {/* Template Selection */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5">
              <h2 className="text-lg font-semibold text-gray-800 mb-3">Choose Template</h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                {Object.entries(TEMPLATES).map(([key, tmpl]) => (
                  <button
                    key={key}
                    onClick={() => setTemplate(key)}
                    className={`p-3 rounded-lg border text-sm font-medium transition ${
                      template === key
                        ? 'border-emerald-500 bg-emerald-50 text-emerald-700'
                        : 'border-gray-200 hover:border-gray-300 text-gray-600'
                    }`}
                  >
                    {tmpl.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Tone Selection */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5">
              <h2 className="text-lg font-semibold text-gray-800 mb-3">Tone</h2>
              <div className="flex flex-wrap gap-2">
                {TONES.map((t) => (
                  <button
                    key={t.id}
                    onClick={() => setTone(t.id)}
                    className={`px-3 py-1.5 rounded-full text-sm font-medium transition ${
                      tone === t.id
                        ? 'bg-emerald-600 text-white'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                    title={t.desc}
                  >
                    {t.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Personal Details */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5">
              <h2 className="text-lg font-semibold text-gray-800 mb-3">Your Details</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <input className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500" placeholder="Full Name" value={form.name} onChange={handleChange('name')} />
                <input className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500" placeholder="Email" value={form.email} onChange={handleChange('email')} />
                <input className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500" placeholder="Phone" value={form.phone} onChange={handleChange('phone')} />
                <input className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500" placeholder="Years of Experience" value={form.yearsExp} onChange={handleChange('yearsExp')} />
                {template === 'it_professional' && (
                  <input className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 col-span-full" placeholder="LinkedIn Profile URL (optional)" value={form.linkedin} onChange={handleChange('linkedin')} />
                )}
              </div>
            </div>

            {/* Job Details */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5">
              <h2 className="text-lg font-semibold text-gray-800 mb-3">Job Details</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <input className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500" placeholder="Job Title" value={form.jobTitle} onChange={handleChange('jobTitle')} />
                <input className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500" placeholder="Company Name" value={form.company} onChange={handleChange('company')} />
                <input className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500" placeholder="Hiring Manager Name (optional)" value={form.hiringManager} onChange={handleChange('hiringManager')} />
                <input className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500" placeholder="Industry" value={form.industry} onChange={handleChange('industry')} />
              </div>
            </div>

            {/* Current/Past Role */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5">
              <h2 className="text-lg font-semibold text-gray-800 mb-3">
                {template === 'fresher' ? 'Education' : 'Current Role'}
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {template === 'fresher' ? (
                  <>
                    <input className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500" placeholder="Degree (e.g., B.Tech in CS)" value={form.degree} onChange={handleChange('degree')} />
                    <input className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500" placeholder="University/College" value={form.institution} onChange={handleChange('institution')} />
                  </>
                ) : (
                  <>
                    <input className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500" placeholder="Current Job Title" value={form.currentRole} onChange={handleChange('currentRole')} />
                    <input className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500" placeholder="Current Company" value={form.currentCompany} onChange={handleChange('currentCompany')} />
                  </>
                )}
                {template === 'career_change' && (
                  <input className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 col-span-full" placeholder="Previous field (e.g., Teaching, Marketing)" value={form.previousField} onChange={handleChange('previousField')} />
                )}
              </div>
            </div>

            {/* Achievements and Skills */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5">
              <h2 className="text-lg font-semibold text-gray-800 mb-3">Highlights</h2>
              <div className="space-y-3">
                <textarea className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500" rows={2} placeholder="Key achievement #1 (e.g., Led a team of 10 and delivered project 2 weeks early)" value={form.achievement1} onChange={handleChange('achievement1')} />
                <textarea className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500" rows={2} placeholder="Key achievement #2 (optional)" value={form.achievement2} onChange={handleChange('achievement2')} />
                <input className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500" placeholder="Key skills (comma-separated)" value={form.skills} onChange={handleChange('skills')} />
                <textarea className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500" rows={2} placeholder="Why this company? (optional)" value={form.whyCompany} onChange={handleChange('whyCompany')} />
              </div>
            </div>

            <button
              onClick={handleGenerate}
              className="w-full py-3 bg-emerald-600 text-white font-semibold rounded-xl hover:bg-emerald-700 transition text-lg"
            >
              Generate Cover Letter
            </button>
          </div>

          {/* Right: Output */}
          <div className="lg:sticky lg:top-4 lg:self-start">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 min-h-[400px]">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-gray-800">Preview</h2>
                {generated && (
                  <span className="text-xs text-gray-400">{wordCount} words</span>
                )}
              </div>
              {generated ? (
                <>
                  <div className="whitespace-pre-wrap text-sm text-gray-700 leading-relaxed border border-gray-100 rounded-lg p-4 bg-gray-50 mb-4 max-h-[60vh] overflow-y-auto">
                    {generated}
                  </div>
                  <div className="flex gap-3">
                    <button
                      onClick={handleCopy}
                      className="flex-1 py-2.5 bg-emerald-600 text-white font-medium rounded-lg hover:bg-emerald-700 transition text-sm"
                    >
                      {copied ? 'Copied!' : 'Copy to Clipboard'}
                    </button>
                    <button
                      onClick={handleDownload}
                      className="flex-1 py-2.5 bg-gray-100 text-gray-700 font-medium rounded-lg hover:bg-gray-200 transition text-sm"
                    >
                      Download .txt
                    </button>
                  </div>
                </>
              ) : (
                <div className="flex flex-col items-center justify-center h-64 text-gray-400">
                  <svg className="w-12 h-12 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  <p className="text-sm">Fill in details and click Generate</p>
                </div>
              )}
            </div>

            {/* Tips */}
            <div className="mt-6 bg-emerald-50 border border-emerald-200 rounded-xl p-5">
              <h3 className="font-semibold text-emerald-800 mb-2">Cover Letter Tips</h3>
              <ul className="text-sm text-emerald-700 space-y-1.5">
                <li>- Keep it under 400 words (one page)</li>
                <li>- Address the hiring manager by name when possible</li>
                <li>- Quantify achievements with numbers</li>
                <li>- Customise for each application</li>
                <li>- Proofread before sending</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="py-6">
          <ShareButtons text="Generate a professional cover letter for free — no login needed!" toolName="Cover Letter Generator" />
        </div>

        {/* FAQ Section */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-gray-800 text-center mb-8">Frequently Asked Questions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl mx-auto">
            {[
              { q: 'Is this cover letter generator free?', a: 'Yes, completely free with no login required. Generate and download unlimited cover letters.' },
              { q: 'Should I send a cover letter with my resume?', a: 'Yes, especially when applying to Indian companies. A cover letter shows genuine interest and professionalism.' },
              { q: 'How long should a cover letter be?', a: 'Keep it to one page, ideally 250-400 words. Hiring managers spend less than a minute reviewing it.' },
              { q: 'Can I edit the generated cover letter?', a: 'You should! The generated letter is a starting point. Customise it for each job application for best results.' },
            ].map((faq) => (
              <div key={faq.q} className="bg-white rounded-lg border border-gray-200 p-4">
                <h3 className="font-semibold text-gray-800 text-sm mb-1">{faq.q}</h3>
                <p className="text-sm text-gray-600">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center mt-12 mb-8">
          <p className="text-gray-500 mb-3">Need a resume too?</p>
          <Link to="/" className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white font-medium rounded-xl hover:bg-blue-700 transition">
            Build Your Resume Free
          </Link>
        </div>
      </section>
    </div>
  );
}
