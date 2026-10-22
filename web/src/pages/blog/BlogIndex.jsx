import { useEffect } from 'react';
import { Link } from 'react-router-dom';

export const POSTS = [
  {
    slug: 'resume-with-no-experience',
    title: 'How to Write a Resume With No Experience (With Examples)',
    description: 'What to include instead of jobs, a skills-first structure and before-and-after bullet examples for students, freshers and career restarters.',
    date: '2026-10-22',
  },
  {
    slug: 'ai-resume-builder-freshers-2026',
    title: 'Best Free AI Resume Builder for Freshers 2026: How to Use AI Without Sounding Generic',
    description: 'What to look for in a free AI resume builder and a 6-step workflow to write a first resume that sounds specific and honest.',
    date: '2026-10-22',
  },
  {
    slug: 'resume-mistakes',
    title: 'Top 10 Resume Mistakes That Cost You Interviews',
    description: 'The 10 most common resume mistakes Indian job seekers make and how to fix each one.',
    date: '2026-10-10',
  },
  {
    slug: 'ats-friendly-resume',
    title: 'ATS-Friendly Resume: How to Beat Applicant Tracking Systems',
    description: 'Formatting rules, keyword strategy and section-by-section tips to get your resume past applicant tracking systems.',
    date: '2026-10-10',
  },
  {
    slug: 'resume-format-freshers-2026',
    title: 'Resume Format for Freshers 2026: Complete Guide with Examples',
    description: 'The best resume format for freshers in 2026, with essential sections, formatting rules and common mistakes.',
    date: '2026-10-10',
  },
  {
    slug: 'ats-optimization-2026',
    title: 'ATS Optimization: Beat Applicant Tracking Systems in 2026',
    description: 'Keyword strategy, formatting rules and the ATS platforms commonly used by employers in India.',
    date: '2026-10-10',
  },
  {
    slug: 'resume-building-2026',
    title: 'How to Build a Resume That Gets Interviews in 2026',
    description: 'Essential sections, action verbs, formatting best practices and how to use AI tools to improve your resume.',
    date: '2026-10-10',
  },
];

export default function BlogIndex() {
  useEffect(() => {
    document.title = 'Resume & Career Blog — Tips for Indian Job Seekers | DoAide Resume';
    const meta = document.querySelector('meta[name="description"]');
    if (meta) meta.content = 'Resume writing tips, ATS guides, fresher advice and AI resume builder guides for Indian job seekers in 2026.';

    const schema = document.createElement('script');
    schema.type = 'application/ld+json';
    schema.textContent = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "Blog",
      "name": "DoAide Resume Blog",
      "url": "https://resume.doaide.com/blog",
      "description": "Resume writing tips, ATS guides and career advice for Indian job seekers.",
      "publisher": { "@type": "Organization", "name": "DoAide", "url": "https://doaide.com" },
      "blogPost": POSTS.map((post) => ({
        "@type": "BlogPosting",
        "headline": post.title,
        "url": `https://resume.doaide.com/blog/${post.slug}`,
        "datePublished": post.date,
      })),
    });
    document.head.appendChild(schema);

    return () => {
      document.head.removeChild(schema);
    };
  }, []);

  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <h1 className="text-3xl sm:text-4xl font-extrabold mb-2" style={{ color: 'var(--da-text, #1E293B)' }}>Resume & Career Blog</h1>
      <p className="mb-8" style={{ color: 'var(--da-text-secondary, #64748B)' }}>
        Practical resume, ATS and job search advice for Indian job seekers.
      </p>
      <div className="space-y-4">
        {POSTS.map((post) => (
          <Link
            key={post.slug}
            to={`/blog/${post.slug}`}
            className="block rounded-xl p-5 no-underline transition hover:shadow-md"
            style={{ background: 'var(--da-surface, #F8FFFE)', border: '1px solid var(--da-border, #E2E8F0)' }}
          >
            <h2 className="text-lg font-bold mb-1" style={{ color: 'var(--da-text, #1E293B)' }}>{post.title}</h2>
            <p className="text-sm mb-2" style={{ color: 'var(--da-text-secondary, #64748B)' }}>{post.description}</p>
            <span className="text-sm font-medium" style={{ color: '#0D9488' }}>Read more &rarr;</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
