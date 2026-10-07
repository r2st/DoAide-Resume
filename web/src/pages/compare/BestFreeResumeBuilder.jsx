import { useEffect } from 'react';
import { Link } from 'react-router-dom';

const builders = [
  {
    rank: 1,
    name: 'DoAide Resume',
    tagline: 'Best Overall Free Resume Builder',
    price: 'Free',
    ats: '9/10',
    templates: '5 (all free)',
    ai: 'Yes',
    login: 'No',
    pros: [
      '100% free with zero paywalls — every feature available to every user',
      'Built-in ATS checker that scores and suggests improvements',
      'AI-powered bullet point enhancement and skill suggestions',
      'Designed specifically for Indian job market (CA, MBA, IT, fresher formats)',
      'Client-side processing — your data never leaves your browser',
      'No signup or login required — start building immediately',
      'Instant PDF download with professional formatting',
    ],
    cons: [
      'Smaller template library (5 templates) compared to some competitors',
      'No built-in cover letter builder yet',
      'No cloud save — resumes are stored in your browser locally',
    ],
    highlight: true,
  },
  {
    rank: 2,
    name: 'Canva',
    tagline: 'Best for Design-Heavy Resumes',
    price: 'Free (Pro: Rs 3,999/year)',
    ats: '4/10',
    templates: '1000+',
    ai: 'Limited',
    login: 'Required',
    pros: [
      'Massive template library with stunning visual designs',
      'Drag-and-drop editor is intuitive and easy to use',
      'Good for creative fields like design, marketing, and media',
      'Free tier is generous for basic resume creation',
    ],
    cons: [
      'Most templates are ATS-unfriendly (graphics, columns, icons confuse parsers)',
      'Not designed for resumes specifically — it is a general design tool',
      'Best templates require Canva Pro subscription',
      'Downloads as image-based PDF which ATS cannot parse reliably',
    ],
    highlight: false,
  },
  {
    rank: 3,
    name: 'Novoresume',
    tagline: 'Good Templates, Limited Free Tier',
    price: 'Free (Premium: $19.99/month)',
    ats: '7/10',
    templates: '20+ (few free)',
    ai: 'Premium only',
    login: 'Required',
    pros: [
      'Clean, professional templates with good design',
      'Built-in cover letter builder',
      'Content suggestions for different industries',
      'Cloud storage across devices',
    ],
    cons: [
      'Free tier limited to 1 resume with basic templates',
      'Premium pricing is steep for Indian users (Rs 1,600+/month)',
      'Best features locked behind paywall',
      'No India-specific customization',
    ],
    highlight: false,
  },
  {
    rank: 4,
    name: 'Indeed Resume Builder',
    tagline: 'Best for Indeed Job Applications',
    price: 'Free',
    ats: '7/10',
    templates: '3',
    ai: 'No',
    login: 'Required',
    pros: [
      'Completely free with no premium tier',
      'Directly integrated with Indeed job search and applications',
      'Simple, ATS-compatible templates',
      'Auto-fills applications when applying through Indeed',
    ],
    cons: [
      'Very basic templates with limited customization',
      'Only useful if you primarily apply through Indeed',
      'No AI features or content suggestions',
      'Limited template variety — all look similar',
    ],
    highlight: false,
  },
  {
    rank: 5,
    name: 'Google Docs',
    tagline: 'Best for Simplicity',
    price: 'Free',
    ats: '6/10',
    templates: '5',
    ai: 'No',
    login: 'Required (Google account)',
    pros: [
      'Completely free with Google account',
      'Built-in resume templates available',
      'Easy collaboration and sharing',
      'Works across all devices with cloud sync',
      'Full control over formatting',
    ],
    cons: [
      'No guidance on what to write or how to optimize',
      'No ATS optimization or scoring',
      'Templates are basic and look generic',
      'No AI assistance or content suggestions',
      'Requires manual formatting which can break across devices',
    ],
    highlight: false,
  },
  {
    rank: 6,
    name: 'FlowCV',
    tagline: 'Good Free Option with Clean Design',
    price: 'Free (Pro: $19/month)',
    ats: '7/10',
    templates: '10+ (limited free)',
    ai: 'No',
    login: 'Required',
    pros: [
      'Clean, modern templates that look professional',
      'Free tier allows multiple resumes',
      'Real-time preview as you type',
      'Color and font customization in free tier',
    ],
    cons: [
      'Best templates require Pro subscription',
      'No AI features for content writing',
      'No India-specific templates or suggestions',
      'Limited export options in free tier',
    ],
    highlight: false,
  },
  {
    rank: 7,
    name: 'Resume.io',
    tagline: 'Nice UI, Limited Free Downloads',
    price: 'Free trial (Plans from $7.99/month)',
    ats: '7/10',
    templates: '25+',
    ai: 'Premium',
    login: 'Required',
    pros: [
      'Attractive, well-designed templates',
      'Good step-by-step resume building process',
      'Pre-written content suggestions by job title',
      'Multiple export formats',
    ],
    cons: [
      'Free tier is essentially a trial — you cannot download without paying',
      'Subscription auto-renews and is difficult to cancel',
      'Aggressive upselling during the resume creation process',
      'Not transparent about pricing upfront',
    ],
    highlight: false,
  },
  {
    rank: 8,
    name: 'Zety',
    tagline: 'Powerful but Aggressively Upsells',
    price: 'Free to build ($2.70/week access)',
    ats: '8/10',
    templates: '20+',
    ai: 'Yes (paid)',
    login: 'Required',
    pros: [
      'Excellent AI-powered content suggestions',
      'Wide range of professional templates',
      'Strong ATS optimization features',
      'Step-by-step wizard makes resume building easy',
    ],
    cons: [
      'The most deceptive "free" model — you build the entire resume for free but must pay to download it',
      'Pricing is intentionally confusing (weekly billing that auto-renews)',
      'Very difficult to cancel subscription',
      'Users report unauthorized charges after trial period',
    ],
    highlight: false,
  },
  {
    rank: 9,
    name: 'Overleaf / LaTeX',
    tagline: 'Best for Academic & Research Resumes',
    price: 'Free',
    ats: '8/10',
    templates: '100+ (community)',
    ai: 'No',
    login: 'Required',
    pros: [
      'Produces the most professionally typeset resumes',
      'Huge community template library on Overleaf',
      'Perfect for academic CVs, research positions, and PhD applications',
      'Full control over every aspect of formatting',
      'ATS-friendly text output',
    ],
    cons: [
      'Steep learning curve — requires LaTeX knowledge',
      'Not practical for non-technical users',
      'No drag-and-drop or visual editing',
      'Debugging formatting errors can take hours',
      'Overkill for standard industry job applications',
    ],
    highlight: false,
  },
  {
    rank: 10,
    name: 'Kickresume',
    tagline: 'Decent Free Tier with AI Behind Paywall',
    price: 'Free (Premium: $19/month)',
    ats: '6/10',
    templates: '30+',
    ai: 'Premium only',
    login: 'Required',
    pros: [
      'Large template selection with creative designs',
      'AI resume writer available in premium',
      'Personal website builder included',
      'Cover letter and portfolio features',
    ],
    cons: [
      'Free tier limited to 1 resume with basic templates',
      'AI features require premium subscription',
      'Some templates are not ATS-compatible',
      'Premium pricing is high for Indian users',
    ],
    highlight: false,
  },
];

export default function BestFreeResumeBuilder() {
  useEffect(() => {
    document.title = '10 Best Free Resume Builders India 2026 — Compared | DoAide Resume';
  }, []);

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-purple-600 via-purple-700 to-indigo-800 text-white">
        <div className="max-w-4xl mx-auto px-4 py-16 sm:py-20 text-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold leading-tight mb-6">
            10 Best Free Resume Builders India 2026 — Compared
          </h1>
          <p className="text-lg sm:text-xl text-purple-100 max-w-3xl mx-auto leading-relaxed">
            We tested every popular resume builder and ranked them on what actually matters: Is it truly free? Does it pass ATS? Does it work for Indian job seekers? Here are the results.
          </p>
        </div>
      </section>

      {/* What Makes a Great Free Resume Builder */}
      <section className="max-w-4xl mx-auto px-4 py-12">
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-6">What Makes a Great Free Resume Builder?</h2>
        <p className="text-gray-700 leading-relaxed mb-4">
          Before diving into the rankings, here are the five criteria we used to evaluate each builder. These are not arbitrary preferences — they reflect what Indian job seekers actually need in 2026:
        </p>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
          <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
            <h3 className="font-semibold text-purple-800 mb-2">Truly Free</h3>
            <p className="text-purple-700 text-sm">No bait-and-switch. You should be able to create, edit, and download a professional resume without paying. "Build for free, pay to download" is not free.</p>
          </div>
          <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
            <h3 className="font-semibold text-purple-800 mb-2">ATS-Friendly</h3>
            <p className="text-purple-700 text-sm">Over 90% of large Indian employers use ATS to filter resumes. A beautiful resume that cannot be parsed by software is useless for most corporate applications.</p>
          </div>
          <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
            <h3 className="font-semibold text-purple-800 mb-2">PDF Download</h3>
            <p className="text-purple-700 text-sm">PDF is the standard format for resume submissions in India. Any builder that does not let you download a clean PDF in the free tier fails this basic test.</p>
          </div>
          <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
            <h3 className="font-semibold text-purple-800 mb-2">No Login Required</h3>
            <p className="text-purple-700 text-sm">Creating an account adds friction and means your personal data is stored on someone else's server. The best builders let you start immediately.</p>
          </div>
          <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
            <h3 className="font-semibold text-purple-800 mb-2">India-Relevant</h3>
            <p className="text-purple-700 text-sm">Indian resumes have unique conventions — CGPA display, project sections for freshers, CA/MBA-specific formats. A global builder may miss these nuances.</p>
          </div>
        </div>
      </section>

      {/* Ranked List */}
      <article className="max-w-4xl mx-auto px-4 pb-12">
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-8">The Top 10 Free Resume Builders — Ranked</h2>

        <div className="space-y-8">
          {builders.map((builder) => (
            <section
              key={builder.rank}
              className={`rounded-xl border p-6 ${
                builder.highlight
                  ? 'bg-blue-50 border-blue-300 shadow-md'
                  : 'bg-white border-gray-200 shadow-sm'
              }`}
            >
              <div className="flex flex-wrap items-start justify-between gap-2 mb-3">
                <div>
                  <h3 className="text-xl font-bold text-gray-800">
                    <span className={`inline-flex items-center justify-center w-8 h-8 rounded-full text-sm font-bold mr-2 ${
                      builder.highlight ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'
                    }`}>
                      {builder.rank}
                    </span>
                    {builder.name}
                  </h3>
                  <p className="text-gray-500 text-sm mt-1 ml-10">{builder.tagline}</p>
                </div>
                <span className={`text-sm font-semibold px-3 py-1 rounded-full ${
                  builder.price === 'Free'
                    ? 'bg-green-100 text-green-700'
                    : 'bg-gray-100 text-gray-600'
                }`}>
                  {builder.price}
                </span>
              </div>

              <div className="grid sm:grid-cols-2 gap-4 mt-4">
                <div>
                  <h4 className="text-sm font-semibold text-green-700 mb-2 uppercase tracking-wide">Pros</h4>
                  <ul className="space-y-1">
                    {builder.pros.map((pro, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
                        <svg className="w-4 h-4 text-green-500 mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        {pro}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-red-600 mb-2 uppercase tracking-wide">Cons</h4>
                  <ul className="space-y-1">
                    {builder.cons.map((con, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
                        <svg className="w-4 h-4 text-red-400 mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                        {con}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </section>
          ))}
        </div>
      </article>

      {/* Comparison Table */}
      <section className="max-w-4xl mx-auto px-4 pb-12">
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-6">Side-by-Side Comparison</h2>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse bg-white rounded-xl shadow-sm border border-gray-200 text-sm">
            <thead>
              <tr className="bg-gray-50">
                <th className="px-3 py-3 text-left font-semibold text-gray-800 border-b border-gray-200">Name</th>
                <th className="px-3 py-3 text-center font-semibold text-gray-800 border-b border-gray-200">Price</th>
                <th className="px-3 py-3 text-center font-semibold text-gray-800 border-b border-gray-200">ATS Score</th>
                <th className="px-3 py-3 text-center font-semibold text-gray-800 border-b border-gray-200">Templates</th>
                <th className="px-3 py-3 text-center font-semibold text-gray-800 border-b border-gray-200">AI</th>
                <th className="px-3 py-3 text-center font-semibold text-gray-800 border-b border-gray-200">No Login</th>
              </tr>
            </thead>
            <tbody>
              {builders.map((b, i) => (
                <tr key={i} className={`${i % 2 === 0 ? '' : 'bg-gray-50'} ${b.highlight ? 'bg-blue-50 font-medium' : ''}`}>
                  <td className="px-3 py-2 text-gray-700 border-b border-gray-100 whitespace-nowrap">{b.name}</td>
                  <td className="px-3 py-2 text-center text-gray-600 border-b border-gray-100">{b.price}</td>
                  <td className="px-3 py-2 text-center text-gray-600 border-b border-gray-100">{b.ats}</td>
                  <td className="px-3 py-2 text-center text-gray-600 border-b border-gray-100">{b.templates}</td>
                  <td className="px-3 py-2 text-center border-b border-gray-100">
                    {b.ai === 'Yes' ? (
                      <span className="text-green-600 font-semibold">Yes</span>
                    ) : b.ai === 'No' ? (
                      <span className="text-red-500">No</span>
                    ) : (
                      <span className="text-yellow-600">{b.ai}</span>
                    )}
                  </td>
                  <td className="px-3 py-2 text-center border-b border-gray-100">
                    {b.login === 'No' ? (
                      <span className="text-green-600 font-semibold">Yes</span>
                    ) : (
                      <span className="text-red-500">No</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Recommendations by Use Case */}
      <section className="max-w-4xl mx-auto px-4 pb-16">
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-6">Which One Should You Choose?</h2>
        <p className="text-gray-700 leading-relaxed mb-6">
          The best resume builder depends on your specific situation. Here are our recommendations based on common use cases:
        </p>

        <div className="grid sm:grid-cols-2 gap-4">
          <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
            <h3 className="font-bold text-gray-800 mb-2">Freshers & College Students</h3>
            <p className="text-gray-600 text-sm mb-3">
              You need a free tool that understands Indian fresher resume conventions — project sections, CGPA display, internship formatting. You probably do not want to create yet another account.
            </p>
            <p className="text-blue-700 font-semibold text-sm">Recommended: DoAide Resume</p>
          </div>

          <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
            <h3 className="font-bold text-gray-800 mb-2">Experienced Professionals (3-10 years)</h3>
            <p className="text-gray-600 text-sm mb-3">
              You need strong ATS optimization and AI-powered bullet points to highlight your achievements. Free tools that deliver enterprise-grade features matter when you are targeting competitive roles.
            </p>
            <p className="text-blue-700 font-semibold text-sm">Recommended: DoAide Resume or Novoresume (if willing to pay)</p>
          </div>

          <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
            <h3 className="font-bold text-gray-800 mb-2">Designers & Creatives</h3>
            <p className="text-gray-600 text-sm mb-3">
              Visual impact matters in your field. You need a tool with creative templates, color customization, and portfolio integration. ATS is less critical since many creative roles use different screening.
            </p>
            <p className="text-blue-700 font-semibold text-sm">Recommended: Canva or Kickresume</p>
          </div>

          <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
            <h3 className="font-bold text-gray-800 mb-2">Academics & Researchers</h3>
            <p className="text-gray-600 text-sm mb-3">
              Academic CVs have unique requirements — publication lists, grant history, conference presentations. You need precise typographic control and formats that academic institutions expect.
            </p>
            <p className="text-blue-700 font-semibold text-sm">Recommended: Overleaf/LaTeX or Google Docs</p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-br from-purple-600 via-purple-700 to-indigo-800 text-white py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4">
            Ready to Build Your Resume?
          </h2>
          <p className="text-lg text-purple-100 mb-8 max-w-2xl mx-auto">
            DoAide Resume is 100% free, requires no login, and is built for the Indian job market. Choose from 5 professional ATS-optimized templates, enhance your content with AI, and download your resume as PDF in minutes.
          </p>
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-8 py-4 bg-white text-purple-700 font-bold text-lg rounded-xl shadow-lg hover:shadow-xl hover:bg-purple-50 transition-all transform hover:-translate-y-0.5"
          >
            Start Building Your Resume
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </section>
    </div>
  );
}
