import { Link } from 'react-router-dom'

const TOOLS = [
  {
    icon: '📊',
    title: 'ATS Resume Score Checker',
    desc: 'Upload or paste your resume and get an instant ATS compatibility score with a detailed breakdown across 7 categories.',
    link: '/ats-checker',
    tag: 'Most Popular',
  },
  {
    icon: '🎯',
    title: 'Job Description Match Scorer',
    desc: 'See how well your resume matches a specific job posting. Find missing keywords and get targeted suggestions.',
    link: '/job-match',
    tag: 'Recommended',
  },
  {
    icon: '🤖',
    title: 'AI Resume Builder',
    desc: 'Input your experience and skills, and our AI generates ATS-optimized resume sections with strong action verbs.',
    link: '/resume-builder',
    tag: 'AI Powered',
  },
  {
    icon: '💡',
    title: 'Resume Tips & Suggestions',
    desc: 'Get personalized, prioritized improvement suggestions based on your resume content. Included with ATS score check.',
    link: '/ats-checker',
    tag: 'Free',
  },
]

export default function Tools() {
  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="text-3xl md:text-4xl font-bold mb-3">
          Free Resume <span className="text-brand-gold">Tools</span>
        </h1>
        <p className="text-brand-muted max-w-2xl mx-auto">
          All tools are completely free with no login or account required. Optimize your resume and land more interviews.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {TOOLS.map((tool, i) => (
          <Link
            key={i}
            to={tool.link}
            className="border border-brand-border rounded-xl p-6 bg-brand-card hover:border-brand-gold/50 transition-all group"
          >
            <div className="flex items-start justify-between mb-4">
              <span className="text-3xl">{tool.icon}</span>
              <span className="px-2 py-0.5 rounded text-xs font-medium bg-brand-gold/10 text-brand-gold">
                {tool.tag}
              </span>
            </div>
            <h2 className="text-lg font-bold mb-2 group-hover:text-brand-gold transition-colors">
              {tool.title}
            </h2>
            <p className="text-brand-muted text-sm mb-4">{tool.desc}</p>
            <span className="text-brand-gold text-sm font-medium">Try it free →</span>
          </Link>
        ))}
      </div>

      <div className="mt-16 border border-brand-border rounded-xl p-8 bg-brand-card text-center">
        <h2 className="text-2xl font-bold mb-3">Why Use DoAide Resume AI?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          <div>
            <div className="text-brand-gold text-2xl mb-2">🔒</div>
            <h3 className="font-semibold mb-1">Private & Secure</h3>
            <p className="text-brand-muted text-sm">Your resume data is never stored or shared. Analysis happens in real-time.</p>
          </div>
          <div>
            <div className="text-brand-gold text-2xl mb-2">⚡</div>
            <h3 className="font-semibold mb-1">Instant Results</h3>
            <p className="text-brand-muted text-sm">Get your ATS score and recommendations in under 3 seconds.</p>
          </div>
          <div>
            <div className="text-brand-gold text-2xl mb-2">🆓</div>
            <h3 className="font-semibold mb-1">100% Free</h3>
            <p className="text-brand-muted text-sm">No signup, no credit card, no hidden limits. Use all tools unlimited.</p>
          </div>
        </div>
      </div>
    </div>
  )
}
