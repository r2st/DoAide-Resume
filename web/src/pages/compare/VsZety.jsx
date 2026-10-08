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

export default function VsZety() {
  useEffect(() => {
    document.title = 'DoAide Resume vs Zety 2026: Honest Comparison | DoAide Resume';
  }, []);

  const comparisonData = [
    { feature: '100% Free (no paywall)', doaide: 'check', zety: 'cross' },
    { feature: 'No Login Required', doaide: 'check', zety: 'cross' },
    { feature: 'ATS Optimization', doaide: 'check', zety: 'partial' },
    { feature: 'AI Bullet Enhancement', doaide: 'check', zety: 'partial' },
    { feature: 'Multiple Templates', doaide: 'check', zety: 'check' },
    { feature: 'PDF Without Watermark', doaide: 'check', zety: 'cross' },
    { feature: 'India-Focused Content', doaide: 'check', zety: 'cross' },
    { feature: 'Client-Side Processing', doaide: 'check', zety: 'cross' },
    { feature: 'Skill Suggestions', doaide: 'check', zety: 'partial' },
    { feature: 'No Data Stored on Servers', doaide: 'check', zety: 'cross' },
    { feature: 'Cover Letter Builder', doaide: 'check', zety: 'check' },
    { feature: 'Large Template Library (20+)', doaide: 'cross', zety: 'check' },
  ];

  const renderIcon = (type) => {
    if (type === 'check') return <CheckIcon />;
    if (type === 'cross') return <CrossIcon />;
    return <PartialIcon />;
  };

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 text-white">
        <div className="max-w-4xl mx-auto px-4 py-16 sm:py-20 text-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold leading-tight mb-6">
            DoAide Resume vs Zety 2026: Honest Comparison
          </h1>
          <p className="text-lg sm:text-xl text-blue-100 max-w-3xl mx-auto leading-relaxed">
            Zety is one of the most advertised resume builders online, but is it worth the price? Here is a feature-by-feature comparison with DoAide Resume to help Indian job seekers make the right choice.
          </p>
        </div>
      </section>

      {/* Quick Comparison Table */}
      <section className="max-w-4xl mx-auto px-4 py-12">
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-6 text-center">Quick Comparison</h2>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse bg-white rounded-xl shadow-sm border border-gray-200">
            <thead>
              <tr className="bg-gray-50">
                <th className="px-4 py-3 text-left font-semibold text-gray-800 border-b border-gray-200">Feature</th>
                <th className="px-4 py-3 text-center font-semibold text-blue-700 border-b border-gray-200">DoAide Resume</th>
                <th className="px-4 py-3 text-center font-semibold text-gray-600 border-b border-gray-200">Zety</th>
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
                    <div className="flex justify-center">{renderIcon(row.zety)}</div>
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

      {/* Detailed Comparison */}
      <article className="max-w-4xl mx-auto px-4 pb-16">
        <div className="prose prose-lg max-w-none">

          <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-6">Feature-by-Feature Breakdown</h2>

          {/* Pricing */}
          <section className="mb-10">
            <h3 className="text-xl font-semibold text-gray-800 mb-3 flex items-center gap-2">
              <span className="text-2xl">1.</span> Pricing
            </h3>
            <div className="grid sm:grid-cols-2 gap-4 mb-4">
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h4 className="font-semibold text-blue-800 mb-2">DoAide Resume</h4>
                <p className="text-blue-700 text-sm">100% free. Every feature, every template, every download. No hidden paywalls, no premium tier, no credit card required.</p>
              </div>
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                <h4 className="font-semibold text-gray-800 mb-2">Zety</h4>
                <p className="text-gray-600 text-sm">Lets you build a resume for free but charges $23.80/month (or $71.40 for 3 months) to download. Many users report being surprised by the paywall at the final step.</p>
              </div>
            </div>
            <p className="text-gray-700 leading-relaxed">
              Zety's pricing model is particularly frustrating because you invest time filling out your resume before discovering you need to pay to download it. At roughly Rs 2,000/month, this is a significant cost for Indian job seekers — especially freshers and students who are already on tight budgets. DoAide lets you download your resume as PDF for free, with no watermarks and no surprise charges.
            </p>
          </section>

          {/* Templates */}
          <section className="mb-10">
            <h3 className="text-xl font-semibold text-gray-800 mb-3 flex items-center gap-2">
              <span className="text-2xl">2.</span> Templates
            </h3>
            <div className="grid sm:grid-cols-2 gap-4 mb-4">
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h4 className="font-semibold text-blue-800 mb-2">DoAide Resume</h4>
                <p className="text-blue-700 text-sm">5 professional templates — Modern, Classic, Minimalist, Creative, and ATS-friendly. All free, all optimized for Indian job applications.</p>
              </div>
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                <h4 className="font-semibold text-gray-800 mb-2">Zety</h4>
                <p className="text-gray-600 text-sm">20+ templates with various designs. The variety is impressive, but many use complex layouts that do not parse well through ATS systems. All require payment to download.</p>
              </div>
            </div>
            <p className="text-gray-700 leading-relaxed">
              Zety has more templates in raw numbers, but quantity does not equal effectiveness. Many of their visually appealing templates use two-column layouts, icons, and graphics that confuse ATS parsers. Since 90% of large Indian employers use ATS, a beautiful template that gets auto-rejected is worse than a clean one that gets read.
            </p>
          </section>

          {/* ATS */}
          <section className="mb-10">
            <h3 className="text-xl font-semibold text-gray-800 mb-3 flex items-center gap-2">
              <span className="text-2xl">3.</span> ATS Optimization
            </h3>
            <div className="grid sm:grid-cols-2 gap-4 mb-4">
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h4 className="font-semibold text-blue-800 mb-2">DoAide Resume</h4>
                <p className="text-blue-700 text-sm">Built-in free ATS checker that scores your resume across multiple dimensions — structure, keywords, formatting, and content. Every template is pre-optimized for ATS.</p>
              </div>
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                <h4 className="font-semibold text-gray-800 mb-2">Zety</h4>
                <p className="text-gray-600 text-sm">Claims ATS-friendly templates but does not offer a standalone ATS checker. Some templates use design elements that can trip up ATS parsers.</p>
              </div>
            </div>
            <p className="text-gray-700 leading-relaxed">
              DoAide's ATS checker analyzes your resume section by section and gives you a score with actionable improvement tips. You can check your score unlimited times as you refine your resume. Zety mentions ATS compatibility but does not provide a way to verify your resume passes ATS filters.
            </p>
          </section>

          {/* Privacy */}
          <section className="mb-10">
            <h3 className="text-xl font-semibold text-gray-800 mb-3 flex items-center gap-2">
              <span className="text-2xl">4.</span> Privacy &amp; Data Handling
            </h3>
            <div className="grid sm:grid-cols-2 gap-4 mb-4">
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h4 className="font-semibold text-blue-800 mb-2">DoAide Resume</h4>
                <p className="text-blue-700 text-sm">100% client-side processing. Your resume data never leaves your browser. No account needed, no data stored on any server.</p>
              </div>
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                <h4 className="font-semibold text-gray-800 mb-2">Zety</h4>
                <p className="text-gray-600 text-sm">Requires account creation with email. Resume data is stored on their servers. Subject to their privacy policy and potential marketing emails.</p>
              </div>
            </div>
            <p className="text-gray-700 leading-relaxed">
              Your resume contains your full name, phone number, email address, work history, and education — sensitive personal data. DoAide processes everything in your browser using JavaScript, so your information never reaches a server. Zety stores your data in the cloud, which means it could be subject to breaches, marketing use, or data sharing.
            </p>
          </section>

          {/* India Focus */}
          <section className="mb-10">
            <h3 className="text-xl font-semibold text-gray-800 mb-3 flex items-center gap-2">
              <span className="text-2xl">5.</span> India Focus
            </h3>
            <div className="grid sm:grid-cols-2 gap-4 mb-4">
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h4 className="font-semibold text-blue-800 mb-2">DoAide Resume</h4>
                <p className="text-blue-700 text-sm">Designed specifically for Indian job seekers. Templates follow Indian resume conventions. Role-specific suggestions for IT, CA, MBA, engineering, and fresher profiles.</p>
              </div>
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                <h4 className="font-semibold text-gray-800 mb-2">Zety</h4>
                <p className="text-gray-600 text-sm">US-focused platform. Templates and content suggestions follow American resume conventions. No India-specific formatting or content guidance.</p>
              </div>
            </div>
            <p className="text-gray-700 leading-relaxed">
              Indian resumes differ from American ones in several ways. Freshers need to highlight CGPA and projects prominently. CA resumes have specific formats that Indian firms expect. Many Indian companies expect a photo on the resume (though it is optional). DoAide understands these conventions; Zety does not.
            </p>
          </section>

          {/* PDF Download */}
          <section className="mb-10">
            <h3 className="text-xl font-semibold text-gray-800 mb-3 flex items-center gap-2">
              <span className="text-2xl">6.</span> PDF Download
            </h3>
            <div className="grid sm:grid-cols-2 gap-4 mb-4">
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h4 className="font-semibold text-blue-800 mb-2">DoAide Resume</h4>
                <p className="text-blue-700 text-sm">Instant PDF download with no watermarks. Download as many times as you want. No login, no payment.</p>
              </div>
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                <h4 className="font-semibold text-gray-800 mb-2">Zety</h4>
                <p className="text-gray-600 text-sm">PDF download requires paid subscription. Free tier only allows a text-based download. The PDF you worked on is locked behind the paywall.</p>
              </div>
            </div>
            <p className="text-gray-700 leading-relaxed">
              This is where Zety's free tier falls apart. You spend 30 minutes crafting your resume, click download, and hit a payment screen. DoAide never gates the download — you can export your resume as a professional PDF instantly, every time.
            </p>
          </section>

          {/* Verdict */}
          <section className="mb-10">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-4">The Verdict</h2>
            <div className="bg-blue-50 border-l-4 border-blue-500 p-6 rounded-r-lg">
              <p className="text-blue-800 leading-relaxed mb-4">
                <strong>DoAide Resume is the better choice for Indian job seekers</strong> who want a genuinely free resume builder with ATS optimization, AI-powered content suggestions, and India-specific templates. No surprises, no paywalls, no watermarks.
              </p>
              <p className="text-blue-800 leading-relaxed mb-4">
                <strong>Zety may appeal to users</strong> who want a wider variety of visual templates and do not mind paying $24/month for the privilege. If budget is not a concern, Zety has a polished interface.
              </p>
              <p className="text-blue-800 leading-relaxed">
                For freshers, students, and professionals applying to Indian companies, DoAide Resume delivers everything you need at zero cost — which is exactly what a resume builder should be.
              </p>
            </div>
          </section>

        </div>
      </article>

      {/* CTA Section */}
      <section className="bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 text-white py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4">
            Try DoAide Resume — It Is Free, Truly
          </h2>
          <p className="text-lg text-blue-100 mb-8 max-w-2xl mx-auto">
            No signup, no paywall, no hidden costs. Build your ATS-optimized resume right now with AI-powered content suggestions and professional templates designed for the Indian job market.
          </p>
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-8 py-4 bg-white text-blue-700 font-bold text-lg rounded-xl shadow-lg hover:shadow-xl hover:bg-blue-50 transition-all transform hover:-translate-y-0.5"
          >
            Build Your Free Resume
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </section>
    </div>
  );
}
