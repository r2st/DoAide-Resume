import { useEffect } from 'react';
import { Link } from 'react-router-dom';

const CheckIcon = () => (
  <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
  </svg>
);

const CrossIcon = () => (
  <svg className="w-5 h-5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
  </svg>
);

const PartialIcon = () => (
  <svg className="w-5 h-5 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
  </svg>
);

const TOOLS = [
  {
    rank: 1, name: 'DoAide Resume', pricing: 'Free Forever', free: true,
    features: ['ATS-optimized templates', 'AI bullet enhancer', 'ATS score checker', 'PDF download (free)', 'India-focused content', 'No login needed', 'Client-side processing', 'Cover letter builder'],
    verdict: 'Best free resume builder for Indian job seekers. ATS-optimized, AI-powered, completely private.',
    rating: '4.8', url: '/',
  },
  {
    rank: 2, name: 'Canva', pricing: 'Free / Rs 3,999/yr', free: false,
    features: ['50+ templates', 'Drag-and-drop editor', 'Design elements', 'PDF download'],
    verdict: 'Great for creative resumes. Many templates are not ATS-friendly. Premium features require Canva Pro.',
    rating: '4.5', url: '/compare/canva',
  },
  {
    rank: 3, name: 'Novoresume', pricing: 'Free / $16/mo', free: false,
    features: ['Modern templates', 'Content suggestions', 'Multiple formats', 'Cover letter'],
    verdict: 'Polished templates but free tier limits PDF downloads. One-page limit on free plan.',
    rating: '4.3', url: '/compare/novoresume',
  },
  {
    rank: 4, name: 'Zety', pricing: '$2.70/week trial', free: false,
    features: ['Professional templates', 'Content tips', 'Multiple formats'],
    verdict: 'No truly free tier — requires payment after creating your resume. Templates are professional but generic.',
    rating: '4.1', url: null,
  },
  {
    rank: 5, name: 'Resume.io', pricing: 'Free / $7.99/mo', free: false,
    features: ['Simple editor', 'Templates', 'PDF download', 'Cover letter'],
    verdict: 'Free plan limited to one resume with watermark. Paid plans for full features.',
    rating: '4.0', url: null,
  },
];

const COMPARISON = [
  { feature: '100% Free (All Features)', vals: ['check', 'cross', 'cross', 'cross', 'cross'] },
  { feature: 'No Login Required', vals: ['check', 'cross', 'cross', 'cross', 'cross'] },
  { feature: 'ATS-Optimized Templates', vals: ['check', 'partial', 'check', 'check', 'check'] },
  { feature: 'AI Content Enhancement', vals: ['check', 'cross', 'partial', 'partial', 'cross'] },
  { feature: 'ATS Score Checker', vals: ['check', 'cross', 'cross', 'cross', 'cross'] },
  { feature: 'Free PDF Download', vals: ['check', 'partial', 'cross', 'cross', 'partial'] },
  { feature: 'No Watermark', vals: ['check', 'check', 'cross', 'cross', 'cross'] },
  { feature: 'India-Focused Content', vals: ['check', 'cross', 'cross', 'cross', 'cross'] },
  { feature: 'Privacy (No Cloud Storage)', vals: ['check', 'cross', 'cross', 'cross', 'cross'] },
  { feature: 'Cover Letter Builder', vals: ['check', 'partial', 'check', 'check', 'check'] },
  { feature: 'Large Template Library', vals: ['cross', 'check', 'check', 'check', 'check'] },
  { feature: 'Drag-and-Drop Editor', vals: ['cross', 'check', 'cross', 'cross', 'cross'] },
];

const TOOL_NAMES = ['DoAide', 'Canva', 'Novoresume', 'Zety', 'Resume.io'];

const FAQ_ITEMS = [
  {
    q: 'What is the best free resume builder in India in 2026?',
    a: 'DoAide Resume is the best free resume builder in India in 2026. It offers ATS-optimized templates, AI bullet point enhancement, an ATS score checker, and free PDF downloads — all without any signup, payment, or watermark. It also includes India-specific content suggestions for freshers and experienced professionals.',
  },
  {
    q: 'Which resume builder is best for freshers?',
    a: 'DoAide Resume is ideal for freshers. It includes fresher-friendly templates, AI-powered bullet point suggestions to improve weak experience sections, and India-specific content tips. Unlike Canva or Novoresume, there is no paywall or premium tier.',
  },
  {
    q: 'Are free resume builders good enough?',
    a: 'Yes. DoAide Resume proves that a free resume builder can be professional-grade. Its ATS-optimized templates pass the same screening systems used by top companies. The AI enhancer helps write compelling bullet points. Many paid builders do not offer features like ATS scoring that DoAide includes for free.',
  },
  {
    q: 'Do I need an ATS-friendly resume?',
    a: 'Yes, if you are applying through job portals or company career pages. Over 95% of large companies use ATS (Applicant Tracking Systems) to screen resumes. A resume with graphics, columns, or unusual formatting may be rejected before a human ever sees it. DoAide Resume templates are specifically designed to pass ATS scanners.',
  },
  {
    q: 'Is Canva good for making resumes?',
    a: 'Canva is good for visually creative resumes, but many of its templates use design elements (text boxes, columns, graphics) that ATS systems cannot parse. For most job applications in India, an ATS-optimized builder like DoAide Resume is a better choice.',
  },
  {
    q: 'Can I make a resume without signing up?',
    a: 'Yes. DoAide Resume works instantly without any signup, email, or phone number. Your resume data stays in your browser and is never uploaded to any server. Most other builders (Canva, Novoresume, Zety, Resume.io) require account creation.',
  },
];

export default function BestResumeBuilders() {
  useEffect(() => {
    document.title = 'Best Free Resume Builder India 2026 — Top 5 Compared | DoAide Resume';
    const desc = 'Compare the best free resume builders in India for 2026. DoAide Resume, Canva, Novoresume, Zety, Resume.io — features, pricing, ATS compatibility compared.';

    const setMeta = (attr, key, content) => {
      let el = document.querySelector(`meta[${attr}="${key}"]`);
      if (!el) { el = document.createElement('meta'); el.setAttribute(attr, key); document.head.appendChild(el); }
      el.setAttribute('content', content);
    };
    setMeta('name', 'description', desc);
    setMeta('name', 'keywords', 'best free resume builder India 2026, free resume maker, ATS resume builder, resume builder comparison, Canva resume alternative');
    setMeta('property', 'og:title', document.title);
    setMeta('property', 'og:description', desc);
    setMeta('property', 'og:url', 'https://resume.doaide.com/compare/best-resume-builders');

    let canonical = document.querySelector("link[rel='canonical']");
    if (!canonical) { canonical = document.createElement('link'); canonical.setAttribute('rel', 'canonical'); document.head.appendChild(canonical); }
    canonical.setAttribute('href', 'https://resume.doaide.com/compare/best-resume-builders');

    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.textContent = JSON.stringify({
      '@context': 'https://schema.org', '@type': 'FAQPage',
      mainEntity: FAQ_ITEMS.map(item => ({
        '@type': 'Question', name: item.q,
        acceptedAnswer: { '@type': 'Answer', text: item.a },
      })),
    });
    document.head.appendChild(script);
    return () => script.remove();
  }, []);

  const renderIcon = (type) => {
    if (type === 'check') return <CheckIcon />;
    if (type === 'cross') return <CrossIcon />;
    return <PartialIcon />;
  };

  return (
    <div>
      <section className="bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 text-white">
        <div className="max-w-4xl mx-auto px-4 py-16 sm:py-20 text-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold leading-tight mb-6">
            Best Free Resume Builder India 2026
          </h1>
          <p className="text-lg sm:text-xl text-blue-100 max-w-3xl mx-auto leading-relaxed">
            We compared the top 5 resume builders on features, pricing, ATS compatibility, and
            privacy to help Indian job seekers find the right tool.
          </p>
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-4 py-12">
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-6 text-center">Top 5 Resume Builders</h2>
        <div className="space-y-4">
          {TOOLS.map((tool) => (
            <div key={tool.rank} className={`bg-white rounded-xl p-5 shadow-sm border ${tool.rank === 1 ? 'border-blue-300 ring-2 ring-blue-100' : 'border-gray-200'}`}>
              <div className="flex items-center gap-3 mb-2">
                <span className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${tool.rank === 1 ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-500'}`}>
                  #{tool.rank}
                </span>
                <h3 className="text-lg font-bold text-gray-800">{tool.name}</h3>
                {tool.free && <span className="text-xs px-2 py-0.5 rounded-full bg-green-100 text-green-700 font-semibold">FREE</span>}
              </div>
              <div className="text-blue-600 font-semibold text-sm mb-2">{tool.pricing}</div>
              <p className="text-sm text-gray-600 mb-3">{tool.verdict}</p>
              <div className="flex flex-wrap gap-1.5 mb-3">
                {tool.features.map((f) => (
                  <span key={f} className="text-xs px-2 py-0.5 rounded bg-gray-100 text-gray-600">{f}</span>
                ))}
              </div>
              <div className="flex items-center gap-4 text-xs text-gray-400">
                <span>⭐ {tool.rating}/5</span>
                {tool.url && <Link to={tool.url} className="text-blue-600 font-medium">
                  {tool.rank === 1 ? 'Build Resume Free →' : 'See comparison →'}
                </Link>}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-4 py-8">
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-6 text-center">Feature Comparison</h2>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse bg-white rounded-xl shadow-sm border border-gray-200">
            <thead>
              <tr className="bg-gray-50">
                <th className="px-3 py-3 text-left font-semibold text-gray-800 border-b border-gray-200 text-sm">Feature</th>
                {TOOL_NAMES.map((n, i) => (
                  <th key={n} className={`px-2 py-3 text-center font-semibold border-b border-gray-200 text-xs ${i === 0 ? 'text-blue-700' : 'text-gray-600'}`}>{n}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {COMPARISON.map((row, i) => (
                <tr key={row.feature} className={i % 2 === 0 ? '' : 'bg-gray-50'}>
                  <td className="px-3 py-3 text-gray-700 border-b border-gray-100 text-sm">{row.feature}</td>
                  {row.vals.map((v, j) => (
                    <td key={j} className="px-2 py-3 border-b border-gray-100">
                      <div className="flex justify-center">{renderIcon(v)}</div>
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-4 py-8">
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
          <h2 className="text-xl font-bold text-blue-800 mb-3">Our Verdict</h2>
          <p className="text-gray-700 leading-relaxed mb-3">
            <strong>DoAide Resume</strong> is the clear winner for Indian job seekers who need a free, ATS-optimized
            resume builder with no compromises. It is the only builder that offers AI content enhancement, ATS scoring,
            and unlimited free PDF downloads — all without any signup.
          </p>
          <p className="text-gray-700 leading-relaxed">
            <strong>Canva</strong> is a good choice if you need creative visual resumes for design roles.
            <strong> Novoresume</strong> is solid if you are willing to pay for a polished international template.
          </p>
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-4 py-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">Frequently Asked Questions</h2>
        <div className="space-y-3">
          {FAQ_ITEMS.map((item, i) => (
            <details key={i} className="bg-white border border-gray-200 rounded-lg">
              <summary className="px-4 py-3 font-medium text-gray-800 cursor-pointer hover:bg-gray-50">
                {item.q}
              </summary>
              <p className="px-4 pb-4 text-sm text-gray-600 leading-relaxed">{item.a}</p>
            </details>
          ))}
        </div>
      </section>

      <section className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-12 mt-8">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4">Build Your Resume Free — Right Now</h2>
          <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
            No signup. No payment. No watermark. ATS-optimized templates with AI-powered content.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/" className="inline-block bg-white text-blue-700 font-bold px-8 py-3 rounded-lg hover:bg-blue-50 transition-colors">
              Build Resume Free →
            </Link>
            <Link to="/templates" className="inline-block bg-transparent border-2 border-white text-white font-bold px-8 py-3 rounded-lg hover:bg-white/10 transition-colors">
              Browse Templates
            </Link>
          </div>
          <div className="flex justify-center gap-6 mt-6 text-sm text-blue-200">
            <span>✓ Free Forever</span>
            <span>✓ No Login</span>
            <span>✓ Made in India</span>
          </div>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4 py-6 text-center text-sm text-gray-500">
        <Link to="/compare/canva" className="text-blue-600 hover:underline mr-4">vs Canva</Link>
        <Link to="/compare/novoresume" className="text-blue-600 hover:underline mr-4">vs Novoresume</Link>
        <Link to="/best-free-resume-builder" className="text-blue-600 hover:underline">Free Resume Builder</Link>
      </div>
    </div>
  );
}
