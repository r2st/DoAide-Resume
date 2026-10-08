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

const FAQ_ITEMS = [
  {
    q: 'Is DoAide Resume better than Canva for resumes?',
    a: 'For ATS-optimized resumes, yes. DoAide Resume is built specifically for job applications — every template passes ATS scanners, and the AI bullet enhancer helps write professional content. Canva is a general design tool with beautiful templates but many are not ATS-friendly.',
  },
  {
    q: 'Is DoAide Resume really 100% free?',
    a: 'Yes. DoAide Resume is completely free with no paywall, no watermark, and no premium tier. You can create unlimited resumes and download PDFs without signing up. Canva requires a paid Pro plan (Rs 3,999/year) for many resume features.',
  },
  {
    q: 'Can I download my resume as PDF without paying?',
    a: 'Yes, DoAide Resume lets you download unlimited PDFs for free with no watermarks. On Canva, PDF download is free for basic templates but many premium templates and features require Canva Pro.',
  },
  {
    q: 'Which resume builder is better for freshers in India?',
    a: 'DoAide Resume is better for Indian freshers — it includes India-specific content suggestions, ATS optimization tips, and fresher-friendly templates. Canva templates are more design-focused and lack India-specific guidance.',
  },
  {
    q: 'Does Canva Resume pass ATS screening?',
    a: 'Many Canva resume templates use graphics, columns, and text boxes that ATS systems cannot parse correctly. DoAide Resume templates are specifically designed to be ATS-compatible while still looking professional.',
  },
  {
    q: 'Is my data safe on DoAide Resume?',
    a: 'Yes. DoAide Resume processes everything in your browser. No data is uploaded to any server, no account is needed, and your resume content stays on your device. Canva stores your data on their cloud servers.',
  },
];

export default function VsCanva() {
  useEffect(() => {
    document.title = 'DoAide Resume vs Canva Resume 2026: Honest Comparison | DoAide Resume';
    const desc = 'Compare DoAide Resume with Canva Resume Builder. Free vs freemium, ATS optimization, templates, privacy — feature-by-feature comparison for Indian job seekers.';

    const setMeta = (attr, key, content) => {
      let el = document.querySelector(`meta[${attr}="${key}"]`);
      if (!el) { el = document.createElement('meta'); el.setAttribute(attr, key); document.head.appendChild(el); }
      el.setAttribute('content', content);
    };
    setMeta('name', 'description', desc);
    setMeta('name', 'keywords', 'DoAide Resume vs Canva, Canva resume builder alternative, free resume builder India, ATS resume builder, best resume builder 2026');
    setMeta('property', 'og:title', document.title);
    setMeta('property', 'og:description', desc);
    setMeta('property', 'og:url', 'https://resume.doaide.com/compare/canva');

    let canonical = document.querySelector("link[rel='canonical']");
    if (!canonical) { canonical = document.createElement('link'); canonical.setAttribute('rel', 'canonical'); document.head.appendChild(canonical); }
    canonical.setAttribute('href', 'https://resume.doaide.com/compare/canva');

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

  const comparisonData = [
    { feature: '100% Free (no paywall)', doaide: 'check', canva: 'cross' },
    { feature: 'No Login Required', doaide: 'check', canva: 'cross' },
    { feature: 'ATS-Optimized Templates', doaide: 'check', canva: 'partial' },
    { feature: 'AI Bullet Enhancement', doaide: 'check', canva: 'cross' },
    { feature: 'ATS Score Checker', doaide: 'check', canva: 'cross' },
    { feature: 'PDF Download (Free)', doaide: 'check', canva: 'partial' },
    { feature: 'India-Focused Content', doaide: 'check', canva: 'cross' },
    { feature: 'Client-Side Processing', doaide: 'check', canva: 'cross' },
    { feature: 'Skill Suggestions', doaide: 'check', canva: 'cross' },
    { feature: 'No Data Stored on Servers', doaide: 'check', canva: 'cross' },
    { feature: 'Large Template Library (50+)', doaide: 'cross', canva: 'check' },
    { feature: 'Graphic Design Elements', doaide: 'cross', canva: 'check' },
    { feature: 'Drag-and-Drop Editor', doaide: 'cross', canva: 'check' },
    { feature: 'Cover Letter Builder', doaide: 'check', canva: 'partial' },
  ];

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
            DoAide Resume vs Canva Resume 2026
          </h1>
          <p className="text-lg sm:text-xl text-blue-100 max-w-3xl mx-auto leading-relaxed">
            Canva is a great design tool, but is it the best choice for building a resume that
            gets past ATS scanners and lands interviews? Here is an honest comparison.
          </p>
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-4 py-12">
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-6 text-center">Feature Comparison</h2>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse bg-white rounded-xl shadow-sm border border-gray-200">
            <thead>
              <tr className="bg-gray-50">
                <th className="px-4 py-3 text-left font-semibold text-gray-800 border-b border-gray-200">Feature</th>
                <th className="px-4 py-3 text-center font-semibold text-blue-700 border-b border-gray-200">DoAide Resume</th>
                <th className="px-4 py-3 text-center font-semibold text-gray-600 border-b border-gray-200">Canva</th>
              </tr>
            </thead>
            <tbody>
              {comparisonData.map((row, i) => (
                <tr key={i} className={i % 2 === 0 ? '' : 'bg-gray-50'}>
                  <td className="px-4 py-3 text-gray-700 border-b border-gray-100 text-sm sm:text-base">{row.feature}</td>
                  <td className="px-4 py-3 border-b border-gray-100">
                    <div className="flex justify-center">{renderIcon(row.doaide)}</div>
                  </td>
                  <td className="px-4 py-3 border-b border-gray-100">
                    <div className="flex justify-center">{renderIcon(row.canva)}</div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-sm text-gray-500 mt-3 text-center">
          <span className="inline-flex items-center gap-1"><CheckIcon /> = Yes</span>
          {' '}<span className="inline-flex items-center gap-1 ml-3"><PartialIcon /> = Limited / Paid only</span>
          {' '}<span className="inline-flex items-center gap-1 ml-3"><CrossIcon /> = No</span>
        </p>
      </section>

      <section className="max-w-4xl mx-auto px-4 py-8">
        <div className="grid sm:grid-cols-2 gap-6">
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
            <h3 className="text-xl font-bold text-blue-800 mb-3">Pricing Comparison</h3>
            <div className="space-y-4">
              <div>
                <div className="font-semibold text-blue-700">DoAide Resume</div>
                <div className="text-2xl font-bold text-green-600">Free Forever</div>
                <p className="text-sm text-gray-600 mt-1">All features, unlimited resumes, unlimited PDF downloads. No credit card ever.</p>
              </div>
              <div className="border-t border-blue-200 pt-4">
                <div className="font-semibold text-gray-600">Canva</div>
                <div className="text-2xl font-bold text-gray-800">Rs 3,999/year</div>
                <p className="text-sm text-gray-600 mt-1">Free tier available with limited templates. Premium templates, brand kit, and advanced features require Canva Pro.</p>
              </div>
            </div>
          </div>

          <div className="bg-green-50 border border-green-200 rounded-xl p-6">
            <h3 className="text-xl font-bold text-green-800 mb-3">Why Choose DoAide Resume</h3>
            <ul className="space-y-2 text-sm text-gray-700">
              <li className="flex gap-2"><CheckIcon /><span>Every template is ATS-optimized</span></li>
              <li className="flex gap-2"><CheckIcon /><span>AI enhances your bullet points</span></li>
              <li className="flex gap-2"><CheckIcon /><span>Built-in ATS score checker</span></li>
              <li className="flex gap-2"><CheckIcon /><span>India-specific content and formatting</span></li>
              <li className="flex gap-2"><CheckIcon /><span>100% privacy — data stays on your device</span></li>
              <li className="flex gap-2"><CheckIcon /><span>No signup, no watermark, no paywall</span></li>
            </ul>
          </div>
        </div>
      </section>

      <article className="max-w-4xl mx-auto px-4 pb-8">
        <div className="prose prose-lg max-w-none">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-6">When to Use Each Tool</h2>

          <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">Choose DoAide Resume When:</h3>
          <ul className="text-gray-600 space-y-1">
            <li>You are applying to companies that use ATS (most large companies)</li>
            <li>You want a professional resume without paying anything</li>
            <li>You are a fresher or job seeker in India</li>
            <li>Privacy matters — you do not want your resume data on cloud servers</li>
            <li>You need AI help writing better bullet points</li>
          </ul>

          <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">Choose Canva When:</h3>
          <ul className="text-gray-600 space-y-1">
            <li>You need a highly visual or creative resume (design, art, marketing roles)</li>
            <li>You already have Canva Pro and want to use the template library</li>
            <li>ATS compatibility is not a concern (direct email applications)</li>
            <li>You want drag-and-drop design flexibility</li>
          </ul>
        </div>
      </article>

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
          <h2 className="text-2xl sm:text-3xl font-bold mb-4">Build Your ATS-Ready Resume Free</h2>
          <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
            No signup, no payment, no watermark. Create a professional resume that passes ATS scanners in minutes.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/" className="inline-block bg-white text-blue-700 font-bold px-8 py-3 rounded-lg hover:bg-blue-50 transition-colors">
              Build Resume Free →
            </Link>
            <Link to="/ats-checker" className="inline-block bg-transparent border-2 border-white text-white font-bold px-8 py-3 rounded-lg hover:bg-white/10 transition-colors">
              Check ATS Score
            </Link>
          </div>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4 py-6 text-center text-sm text-gray-500">
        <Link to="/compare/novoresume" className="text-blue-600 hover:underline mr-4">vs Novoresume</Link>
        <Link to="/best-free-resume-builder" className="text-blue-600 hover:underline">Best Free Resume Builders</Link>
      </div>
    </div>
  );
}
