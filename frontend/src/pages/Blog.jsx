import { Link } from 'react-router-dom'

const POSTS = [
  {
    slug: 'ats-resume-tips',
    title: '15 ATS Resume Tips That Actually Work in 2025',
    excerpt: 'Learn the proven strategies to get your resume past ATS filters and into the hands of hiring managers.',
    date: 'Oct 2, 2025',
    readTime: '8 min read',
  },
  {
    slug: 'common-resume-mistakes',
    title: '10 Common Resume Mistakes That Get You Rejected Instantly',
    excerpt: 'Avoid these critical mistakes that cause ATS systems to reject your resume before a human ever sees it.',
    date: 'Sep 28, 2025',
    readTime: '6 min read',
  },
  {
    slug: 'how-ats-works',
    title: 'How ATS Systems Work: The Complete Guide for Job Seekers',
    excerpt: 'Understand exactly how Applicant Tracking Systems parse, score, and rank your resume.',
    date: 'Sep 25, 2025',
    readTime: '10 min read',
  },
]

export default function Blog() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="text-3xl md:text-4xl font-bold mb-3">
          Resume <span className="text-brand-gold">Blog</span>
        </h1>
        <p className="text-brand-muted">Expert tips and guides to help you create the perfect ATS-optimized resume</p>
      </div>

      <div className="space-y-6">
        {POSTS.map(post => (
          <Link
            key={post.slug}
            to={`/blog/${post.slug}`}
            className="block border border-brand-border rounded-xl p-6 bg-brand-card hover:border-brand-gold/50 transition-colors group"
          >
            <div className="flex items-center gap-3 text-brand-muted text-sm mb-3">
              <span>{post.date}</span>
              <span>·</span>
              <span>{post.readTime}</span>
            </div>
            <h2 className="text-xl font-bold mb-2 group-hover:text-brand-gold transition-colors">
              {post.title}
            </h2>
            <p className="text-brand-muted">{post.excerpt}</p>
          </Link>
        ))}
      </div>
    </div>
  )
}
