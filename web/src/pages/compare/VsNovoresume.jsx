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

export default function VsNovoresume() {
  useEffect(() => {
    document.title = 'DoAide Resume vs Novoresume 2026: Honest Comparison | DoAide Resume';
  }, []);

  const comparisonData = [
    { feature: '100% Free (no paywall)', doaide: 'check', novo: 'cross' },
    { feature: 'No Login Required', doaide: 'check', novo: 'cross' },
    { feature: 'ATS Optimization', doaide: 'check', novo: 'partial' },
    { feature: 'AI Bullet Enhancement', doaide: 'check', novo: 'partial' },
    { feature: 'Multiple Templates', doaide: 'check', novo: 'check' },
    { feature: 'PDF Download', doaide: 'check', novo: 'partial' },
    { feature: 'India-Focused Content', doaide: 'check', novo: 'cross' },
    { feature: 'Client-Side Processing', doaide: 'check', novo: 'cross' },
    { feature: 'Skill Suggestions', doaide: 'check', novo: 'partial' },
    { feature: 'No Data Stored on Servers', doaide: 'check', novo: 'cross' },
    { feature: 'Cover Letter Builder', doaide: 'cross', novo: 'check' },
    { feature: 'Large Template Library (20+)', doaide: 'cross', novo: 'check' },
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
            DoAide Resume vs Novoresume 2026: Honest Comparison
          </h1>
          <p className="text-lg sm:text-xl text-blue-100 max-w-3xl mx-auto leading-relaxed">
            Both are popular resume builders, but they take very different approaches to pricing, privacy, and features. Here is an honest, feature-by-feature comparison to help you choose the right one.
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
                <th className="px-4 py-3 text-center font-semibold text-gray-600 border-b border-gray-200">Novoresume</th>
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
                    <div className="flex justify-center">{renderIcon(row.novo)}</div>
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
                <p className="text-blue-700 text-sm">100% free. Every feature, every template, every download. No hidden paywalls, no premium tier, no credit card required. What you see is what you get.</p>
              </div>
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                <h4 className="font-semibold text-gray-800 mb-2">Novoresume</h4>
                <p className="text-gray-600 text-sm">Free tier limits you to 1 resume with basic templates. Premium plans start at $19.99/month (billed annually) or $24.99 for month-to-month. Many templates and features are locked behind the paywall.</p>
              </div>
            </div>
            <p className="text-gray-700 leading-relaxed">
              The pricing difference is significant for Indian job seekers. At Rs 1,600-2,000 per month, Novoresume's premium plan is a substantial cost — especially for freshers and early-career professionals. DoAide's completely free model removes any financial barrier. You can create as many resumes as you need, try all templates, and download unlimited PDFs without spending a rupee.
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
                <p className="text-blue-700 text-sm">5 professional templates — all free, all ATS-optimized. Designed specifically for Indian job market conventions (CA, MBA, engineering, fresher formats).</p>
              </div>
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                <h4 className="font-semibold text-gray-800 mb-2">Novoresume</h4>
                <p className="text-gray-600 text-sm">Larger template library (20+ designs), but many of the best templates are premium-only. Free users get access to basic templates that may look dated.</p>
              </div>
            </div>
            <p className="text-gray-700 leading-relaxed">
              Novoresume has more templates in absolute numbers, but quantity does not always mean quality. Many of their visually appealing templates use complex layouts with columns, icons, and graphics that confuse ATS parsers. DoAide's templates are designed to be both professional-looking and machine-readable — the two requirements that actually matter when applying for jobs.
            </p>
          </section>

          {/* ATS Optimization */}
          <section className="mb-10">
            <h3 className="text-xl font-semibold text-gray-800 mb-3 flex items-center gap-2">
              <span className="text-2xl">3.</span> ATS Optimization
            </h3>
            <div className="grid sm:grid-cols-2 gap-4 mb-4">
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h4 className="font-semibold text-blue-800 mb-2">DoAide Resume</h4>
                <p className="text-blue-700 text-sm">Built-in ATS checker that scores your resume and suggests improvements. Available free for all users. Every template is pre-optimized for ATS compatibility.</p>
              </div>
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                <h4 className="font-semibold text-gray-800 mb-2">Novoresume</h4>
                <p className="text-gray-600 text-sm">Basic ATS tips in free tier. Advanced ATS features and content analysis require premium subscription. Some creative templates are not ATS-friendly.</p>
              </div>
            </div>
            <p className="text-gray-700 leading-relaxed">
              ATS (Applicant Tracking System) compatibility is non-negotiable in 2026. Over 90% of large Indian employers — from TCS and Infosys to Flipkart and Zomato — use ATS to filter resumes before a human ever sees them. DoAide's free ATS checker analyzes your resume structure, keyword density, formatting, and section organization to ensure your resume passes these automated filters.
            </p>
          </section>

          {/* AI Features */}
          <section className="mb-10">
            <h3 className="text-xl font-semibold text-gray-800 mb-3 flex items-center gap-2">
              <span className="text-2xl">4.</span> AI Features
            </h3>
            <div className="grid sm:grid-cols-2 gap-4 mb-4">
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h4 className="font-semibold text-blue-800 mb-2">DoAide Resume</h4>
                <p className="text-blue-700 text-sm">AI-powered bullet point enhancement, role-specific skill suggestions, and content optimization — all free. AI helps transform weak descriptions into achievement-oriented bullets.</p>
              </div>
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                <h4 className="font-semibold text-gray-800 mb-2">Novoresume</h4>
                <p className="text-gray-600 text-sm">Some AI content suggestions available. Advanced AI writing assistance is a premium feature. Free tier gets basic pre-written bullet point suggestions.</p>
              </div>
            </div>
            <p className="text-gray-700 leading-relaxed">
              Both platforms use AI to help users write better resumes, but the access model is different. DoAide gives all users full access to AI bullet enhancement — type a rough description of what you did, and AI rewrites it into a polished, quantified achievement statement. Novoresume gates its most useful AI writing features behind the premium paywall, leaving free users with only basic content templates.
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
                <p className="text-blue-700 text-sm">Built specifically for the Indian job market. Templates follow Indian resume conventions. Skill suggestions are relevant to Indian industries (IT, CA, MBA, engineering).</p>
              </div>
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                <h4 className="font-semibold text-gray-800 mb-2">Novoresume</h4>
                <p className="text-gray-600 text-sm">Global platform based in Denmark. Templates and suggestions follow Western resume conventions. No India-specific customization.</p>
              </div>
            </div>
            <p className="text-gray-700 leading-relaxed">
              This is a critical differentiator. Indian resumes have unique conventions that global platforms often miss. For example, Indian freshers are expected to list their aggregate percentage or CGPA prominently. CA (Chartered Accountant) resumes have specific formats that Indian firms expect. MBA resumes from IIM graduates follow a particular structure. DoAide understands these nuances because it was designed for this market.
            </p>
          </section>

          {/* Privacy */}
          <section className="mb-10">
            <h3 className="text-xl font-semibold text-gray-800 mb-3 flex items-center gap-2">
              <span className="text-2xl">6.</span> Privacy & Data Handling
            </h3>
            <div className="grid sm:grid-cols-2 gap-4 mb-4">
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h4 className="font-semibold text-blue-800 mb-2">DoAide Resume</h4>
                <p className="text-blue-700 text-sm">All resume processing happens client-side in your browser. Your data never leaves your device. No account, no cloud storage, no tracking. Maximum privacy.</p>
              </div>
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                <h4 className="font-semibold text-gray-800 mb-2">Novoresume</h4>
                <p className="text-gray-600 text-sm">Requires account creation. Your resume data is stored on their servers. Subject to their privacy policy and data retention terms. Data stored in EU servers.</p>
              </div>
            </div>
            <p className="text-gray-700 leading-relaxed">
              Privacy matters more than most people realize when building a resume. Your resume contains your full name, address, phone number, email, work history, and education — essentially a profile that could be used for identity theft or unsolicited marketing. DoAide processes everything in your browser using client-side JavaScript. Your resume data is never sent to a server, never stored in a database, and never shared with third parties.
            </p>
          </section>

          {/* Login */}
          <section className="mb-10">
            <h3 className="text-xl font-semibold text-gray-800 mb-3 flex items-center gap-2">
              <span className="text-2xl">7.</span> Login Requirement
            </h3>
            <div className="grid sm:grid-cols-2 gap-4 mb-4">
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h4 className="font-semibold text-blue-800 mb-2">DoAide Resume</h4>
                <p className="text-blue-700 text-sm">No signup, no login, no email required. Open the website and start building immediately. Zero friction.</p>
              </div>
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                <h4 className="font-semibold text-gray-800 mb-2">Novoresume</h4>
                <p className="text-gray-600 text-sm">Requires email signup or Google/Facebook login before you can create a resume. This is needed to save your data on their servers.</p>
              </div>
            </div>
            <p className="text-gray-700 leading-relaxed">
              The no-login approach has a practical advantage beyond convenience. When you are applying for jobs urgently — perhaps you found a listing that closes tonight — you do not want to spend time creating yet another account, verifying your email, and navigating onboarding screens. DoAide lets you go from zero to finished resume in minutes, not hours.
            </p>
          </section>

          {/* Verdict */}
          <section className="mb-10">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-4">The Verdict</h2>
            <div className="bg-blue-50 border-l-4 border-blue-500 p-6 rounded-r-lg">
              <p className="text-blue-800 leading-relaxed mb-4">
                <strong>DoAide Resume is the better choice for Indian job seekers</strong> who want a truly free, privacy-respecting resume builder with no strings attached. You get ATS optimization, AI-powered content enhancement, and India-specific templates without paying a rupee or creating an account.
              </p>
              <p className="text-blue-800 leading-relaxed mb-4">
                <strong>Novoresume is worth considering</strong> if you want a larger variety of visual templates, need a built-in cover letter builder, or prefer cloud storage so you can access your resume from any device. However, be prepared to pay $20+/month for the full experience.
              </p>
              <p className="text-blue-800 leading-relaxed">
                For freshers, students, and professionals who want to build a professional resume quickly without cost barriers, DoAide Resume is the clear winner.
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
