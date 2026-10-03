import { Link } from 'react-router-dom'

const FEATURES = [
  {
    icon: '📊',
    title: 'ATS Score Checker',
    desc: 'Get an instant ATS compatibility score with detailed breakdown and improvement suggestions.',
    link: '/ats-checker',
  },
  {
    icon: '🎯',
    title: 'Job Match Scorer',
    desc: 'Compare your resume against any job description and see exactly what keywords you\'re missing.',
    link: '/job-match',
  },
  {
    icon: '🤖',
    title: 'AI Resume Builder',
    desc: 'Generate ATS-optimized resume sections using AI. Just enter your experience and skills.',
    link: '/resume-builder',
  },
  {
    icon: '💡',
    title: 'Resume Tips',
    desc: 'Get personalized improvement suggestions based on your specific resume content.',
    link: '/ats-checker',
  },
]

const STATS = [
  { value: '75%', label: 'of resumes are rejected by ATS before a human sees them' },
  { value: '98%', label: 'of Fortune 500 companies use ATS software' },
  { value: '2x', label: 'more interviews with an ATS-optimized resume' },
]

export default function Home() {
  return (
    <div>
      <section className="py-20 md:py-32 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-block px-4 py-1.5 rounded-full border border-brand-gold/30 text-brand-gold text-sm mb-6">
            100% Free — No Login Required
          </div>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
            Check Your Resume&apos;s<br />
            <span className="text-brand-gold">ATS Score</span> — Free
          </h1>
          <p className="text-brand-muted text-lg md:text-xl mb-10 max-w-2xl mx-auto">
            75% of resumes are rejected by Applicant Tracking Systems before a human ever sees them. Check yours in seconds.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/ats-checker"
              className="px-8 py-4 bg-brand-gold text-brand-dark font-bold rounded-xl text-lg hover:bg-brand-gold-hover transition-colors pulse-gold"
            >
              Check My Resume Score
            </Link>
            <Link
              to="/resume-builder"
              className="px-8 py-4 border border-brand-border text-white font-bold rounded-xl text-lg hover:border-brand-gold hover:text-brand-gold transition-colors"
            >
              Build ATS Resume
            </Link>
          </div>
        </div>
      </section>

      <section className="py-16 px-4 border-y border-brand-border bg-brand-card/50">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          {STATS.map((stat, i) => (
            <div key={i} className="text-center">
              <div className="text-4xl font-bold text-brand-gold mb-2">{stat.value}</div>
              <div className="text-brand-muted text-sm">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-4">Free Resume Tools</h2>
          <p className="text-brand-muted text-center mb-12 max-w-2xl mx-auto">
            Everything you need to land more interviews. All tools are free with no account required.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {FEATURES.map((feature, i) => (
              <Link
                key={i}
                to={feature.link}
                className="p-6 rounded-xl border border-brand-border bg-brand-card hover:border-brand-gold/50 transition-colors group"
              >
                <div className="text-3xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-2 group-hover:text-brand-gold transition-colors">
                  {feature.title}
                </h3>
                <p className="text-brand-muted text-sm">{feature.desc}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-4 bg-brand-card/50 border-t border-brand-border">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
            <div>
              <div className="w-12 h-12 rounded-full bg-brand-gold/10 text-brand-gold flex items-center justify-center text-xl font-bold mx-auto mb-4">1</div>
              <h3 className="font-semibold mb-2">Paste or Upload</h3>
              <p className="text-brand-muted text-sm">Copy-paste your resume text or upload a PDF/DOCX file</p>
            </div>
            <div>
              <div className="w-12 h-12 rounded-full bg-brand-gold/10 text-brand-gold flex items-center justify-center text-xl font-bold mx-auto mb-4">2</div>
              <h3 className="font-semibold mb-2">Get Your Score</h3>
              <p className="text-brand-muted text-sm">Our AI analyzes your resume across 7 key ATS categories</p>
            </div>
            <div>
              <div className="w-12 h-12 rounded-full bg-brand-gold/10 text-brand-gold flex items-center justify-center text-xl font-bold mx-auto mb-4">3</div>
              <h3 className="font-semibold mb-2">Improve &amp; Apply</h3>
              <p className="text-brand-muted text-sm">Follow actionable tips to optimize your resume and land more interviews</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
