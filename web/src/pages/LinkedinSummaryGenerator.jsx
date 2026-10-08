import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ShareButtons from '../components/ShareButtons';

const ROLES = {
  'Software Engineer': { keywords: ['software development', 'scalable systems', 'engineering'], tone: 'technical' },
  'Data Scientist': { keywords: ['machine learning', 'data-driven insights', 'analytics'], tone: 'analytical' },
  'Product Manager': { keywords: ['product strategy', 'cross-functional collaboration', 'roadmap'], tone: 'strategic' },
  'Marketing Manager': { keywords: ['brand growth', 'digital marketing', 'campaign management'], tone: 'creative' },
  'CA / Finance': { keywords: ['financial analysis', 'audit', 'tax compliance'], tone: 'formal' },
  'HR Professional': { keywords: ['talent acquisition', 'employee engagement', 'organisational development'], tone: 'people' },
  'Business Analyst': { keywords: ['process improvement', 'stakeholder management', 'data analysis'], tone: 'analytical' },
  'Sales Executive': { keywords: ['revenue growth', 'client relationship', 'pipeline management'], tone: 'results' },
  'Designer': { keywords: ['user experience', 'visual design', 'creative problem-solving'], tone: 'creative' },
  'Teacher / Educator': { keywords: ['curriculum development', 'student mentoring', 'pedagogy'], tone: 'nurturing' },
  'Fresher': { keywords: ['quick learner', 'recent graduate', 'eager to contribute'], tone: 'eager' },
};

const STYLES = [
  { id: 'professional', label: 'Professional', icon: '💼' },
  { id: 'storytelling', label: 'Storytelling', icon: '📖' },
  { id: 'results-driven', label: 'Results-Driven', icon: '📈' },
  { id: 'conversational', label: 'Conversational', icon: '💬' },
];

function generateSummary(form) {
  const { name, role, yearsExp, industry, skills, achievement, goal, style } = form;
  const roleData = ROLES[role] || { keywords: [], tone: 'professional' };
  const displayName = name || '[Your Name]';
  const displayRole = role || '[Your Role]';
  const expText = yearsExp ? `${yearsExp}+ years` : 'extensive experience';

  if (style === 'storytelling') {
    return `What drives me? The intersection of ${industry || 'technology'} and impact.

I'm ${displayName}, a ${displayRole} with ${expText} of turning complex challenges into elegant solutions. ${achievement ? `One of my proudest moments: ${achievement}.` : ''}

${skills ? `My toolkit: ${skills}.` : `My core strengths span ${roleData.keywords.join(', ')}.`}

${goal ? goal : `I'm passionate about ${roleData.keywords[0] || 'building great things'} and always looking for opportunities to create meaningful impact.`}

Let's connect — I'd love to exchange ideas.`;
  }

  if (style === 'results-driven') {
    return `${displayRole} | ${expText} in ${industry || 'the industry'}

${achievement ? `★ ${achievement}` : `★ Proven track record in ${roleData.keywords.join(', ')}`}

${skills ? `Core expertise: ${skills}` : `Specialising in ${roleData.keywords.join(' | ')}`}

${goal ? goal : `Focused on driving measurable outcomes through ${roleData.keywords[0] || 'strategic execution'}.`}

Open to connecting with professionals who value impact over activity.`;
  }

  if (style === 'conversational') {
    return `Hey there! I'm ${displayName} 👋

I've spent ${expText} working in ${industry || 'my field'} as a ${displayRole.toLowerCase()}. ${achievement ? `Recently, ${achievement.charAt(0).toLowerCase() + achievement.slice(1)}.` : ''}

${skills ? `I geek out about: ${skills}.` : `I'm deeply interested in ${roleData.keywords.join(', ')}.`}

${goal ? goal : `Always up for interesting conversations about ${industry || roleData.keywords[0] || 'what comes next'}.`}

Feel free to connect — I don't bite! 😄`;
  }

  // Default: Professional
  return `${displayRole} with ${expText} in ${industry || 'the industry'}, specialising in ${roleData.keywords.join(', ')}.

${achievement ? achievement + '.' : `Proven track record of delivering results through ${roleData.keywords[0] || 'strategic thinking'} and ${roleData.keywords[1] || 'execution'}.`}

${skills ? `Key competencies: ${skills}.` : ''}

${goal ? goal : `Seeking opportunities to leverage my expertise in ${roleData.keywords[0] || 'my domain'} to drive meaningful outcomes.`}

Open to connecting with like-minded professionals.`;
}

export default function LinkedinSummaryGenerator() {
  const [form, setForm] = useState({
    name: '', role: '', yearsExp: '', industry: '',
    skills: '', achievement: '', goal: '', style: 'professional',
  });
  const [generated, setGenerated] = useState('');
  const [copied, setCopied] = useState(false);
  const [charCount, setCharCount] = useState(0);

  useEffect(() => {
    document.title = 'Free LinkedIn Summary Generator | DoAide Resume';
    const meta = document.querySelector('meta[name="description"]');
    if (meta) meta.content = 'Generate professional LinkedIn About section summaries for free. Templates for freshers and experienced professionals. Optimised for Indian job market.';
  }, []);

  const handleChange = (field) => (e) => setForm((prev) => ({ ...prev, [field]: e.target.value }));

  const handleGenerate = () => {
    const text = generateSummary(form);
    setGenerated(text);
    setCharCount(text.length);
  };

  const handleCopy = async () => {
    await navigator.clipboard.writeText(generated);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div>
      <section className="bg-gradient-to-br from-blue-700 via-blue-800 to-indigo-900 text-white">
        <div className="max-w-4xl mx-auto px-4 py-14 sm:py-20 text-center">
          <div className="inline-block bg-blue-500/30 text-blue-100 text-sm font-medium px-4 py-1.5 rounded-full mb-4">
            100% Free - No Login Required
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold leading-tight mb-4">
            LinkedIn Summary Generator
          </h1>
          <p className="text-lg text-blue-100 max-w-2xl mx-auto">
            Create a compelling LinkedIn "About" section that gets you noticed by recruiters. Optimised for the Indian job market.
          </p>
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-4 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left: Form */}
          <div className="space-y-6">
            {/* Style Selection */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5">
              <h2 className="text-lg font-semibold text-gray-800 mb-3">Writing Style</h2>
              <div className="grid grid-cols-2 gap-2">
                {STYLES.map((s) => (
                  <button
                    key={s.id}
                    onClick={() => setForm((prev) => ({ ...prev, style: s.id }))}
                    className={`p-3 rounded-lg border text-sm font-medium transition flex items-center gap-2 ${
                      form.style === s.id
                        ? 'border-blue-500 bg-blue-50 text-blue-700'
                        : 'border-gray-200 hover:border-gray-300 text-gray-600'
                    }`}
                  >
                    <span>{s.icon}</span> {s.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Basic Info */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5">
              <h2 className="text-lg font-semibold text-gray-800 mb-3">About You</h2>
              <div className="space-y-3">
                <input className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500" placeholder="Your Name" value={form.name} onChange={handleChange('name')} />
                <select
                  value={form.role}
                  onChange={handleChange('role')}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
                >
                  <option value="">Select your role...</option>
                  {Object.keys(ROLES).map((r) => (
                    <option key={r} value={r}>{r}</option>
                  ))}
                </select>
                <div className="grid grid-cols-2 gap-3">
                  <input className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500" placeholder="Years of Experience" value={form.yearsExp} onChange={handleChange('yearsExp')} />
                  <input className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500" placeholder="Industry" value={form.industry} onChange={handleChange('industry')} />
                </div>
              </div>
            </div>

            {/* Details */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5">
              <h2 className="text-lg font-semibold text-gray-800 mb-3">Details</h2>
              <div className="space-y-3">
                <input className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500" placeholder="Key skills (comma-separated)" value={form.skills} onChange={handleChange('skills')} />
                <textarea className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500" rows={2} placeholder="Biggest achievement (e.g., Led digital transformation saving ₹2Cr annually)" value={form.achievement} onChange={handleChange('achievement')} />
                <textarea className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500" rows={2} placeholder="Career goal or call to action (optional)" value={form.goal} onChange={handleChange('goal')} />
              </div>
            </div>

            <button
              onClick={handleGenerate}
              className="w-full py-3 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition text-lg"
            >
              Generate LinkedIn Summary
            </button>
          </div>

          {/* Right: Output */}
          <div className="lg:sticky lg:top-4 lg:self-start">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 min-h-[400px]">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-gray-800">Preview</h2>
                {generated && (
                  <span className={`text-xs ${charCount > 2600 ? 'text-red-500' : 'text-gray-400'}`}>
                    {charCount}/2,600 chars
                  </span>
                )}
              </div>
              {generated ? (
                <>
                  <div className="whitespace-pre-wrap text-sm text-gray-700 leading-relaxed border border-gray-100 rounded-lg p-4 bg-gray-50 mb-4 max-h-[50vh] overflow-y-auto">
                    {generated}
                  </div>
                  {charCount > 2600 && (
                    <div className="text-xs text-red-500 mb-3">
                      LinkedIn's About section has a 2,600 character limit. Consider shortening your summary.
                    </div>
                  )}
                  <button
                    onClick={handleCopy}
                    className="w-full py-2.5 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition text-sm"
                  >
                    {copied ? 'Copied!' : 'Copy to Clipboard'}
                  </button>
                </>
              ) : (
                <div className="flex flex-col items-center justify-center h-64 text-gray-400">
                  <svg className="w-12 h-12 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  <p className="text-sm">Fill in your details and click Generate</p>
                </div>
              )}
            </div>

            {/* Tips */}
            <div className="mt-6 bg-blue-50 border border-blue-200 rounded-xl p-5">
              <h3 className="font-semibold text-blue-800 mb-2">LinkedIn Summary Tips</h3>
              <ul className="text-sm text-blue-700 space-y-1.5">
                <li>- Use first person ("I" not "He/She")</li>
                <li>- Include industry keywords for searchability</li>
                <li>- Keep it under 2,600 characters</li>
                <li>- Add a call to action at the end</li>
                <li>- Update it every 3-6 months</li>
              </ul>
            </div>

            {/* Role Keywords */}
            {form.role && ROLES[form.role] && (
              <div className="mt-4 bg-gray-50 border border-gray-200 rounded-xl p-5">
                <h3 className="font-semibold text-gray-700 mb-2">Suggested Keywords for {form.role}</h3>
                <div className="flex flex-wrap gap-2">
                  {ROLES[form.role].keywords.map((kw) => (
                    <span key={kw} className="px-2.5 py-1 bg-white border border-gray-200 rounded-full text-xs text-gray-600">
                      {kw}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="py-6">
          <ShareButtons text="Generate a LinkedIn summary for free — no login needed!" toolName="LinkedIn Summary Generator" />
        </div>

        {/* FAQ Section */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-gray-800 text-center mb-8">Frequently Asked Questions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl mx-auto">
            {[
              { q: 'What is a LinkedIn summary?', a: 'The "About" section on your LinkedIn profile. It\'s your professional elevator pitch — recruiters read it to quickly understand who you are.' },
              { q: 'How long should a LinkedIn summary be?', a: 'LinkedIn allows up to 2,600 characters. Aim for 200-400 words that highlight your experience, skills, and goals.' },
              { q: 'Do recruiters read LinkedIn summaries?', a: 'Yes! In India, over 80% of recruiters check LinkedIn profiles. A well-written summary significantly increases profile views.' },
              { q: 'Can I use this for free?', a: 'Absolutely. Generate unlimited LinkedIn summaries with no login and no charges.' },
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
          <p className="text-gray-500 mb-3">Need a resume to go with it?</p>
          <Link to="/" className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white font-medium rounded-xl hover:bg-blue-700 transition">
            Build Your Resume Free
          </Link>
        </div>
      </section>
    </div>
  );
}
