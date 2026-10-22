import { useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { getMarkdownPost } from './markdownPosts';

const SITE_URL = 'https://resume.doaide.com';

function setMeta(attr, key, content) {
  let el = document.querySelector(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
}

export default function MarkdownPost() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const post = getMarkdownPost(slug);

  useEffect(() => {
    if (!post) return;
    const url = `${SITE_URL}/blog/${post.slug}`;
    const title = `${post.title} | DoAide Resume`;
    document.title = title;
    setMeta('name', 'description', post.description);
    setMeta('name', 'keywords', post.keywords);
    setMeta('property', 'og:title', title);
    setMeta('property', 'og:description', post.description);
    setMeta('property', 'og:type', 'article');

    const schemas = [
      {
        '@context': 'https://schema.org',
        '@type': 'BlogPosting',
        headline: post.title,
        description: post.description,
        url,
        datePublished: post.date,
        dateModified: post.date,
        author: { '@type': 'Organization', name: 'DoAide', url: 'https://doaide.com' },
        publisher: { '@type': 'Organization', name: 'DoAide', url: 'https://doaide.com' },
        mainEntityOfPage: { '@type': 'WebPage', '@id': url },
        inLanguage: 'en-IN',
      },
    ];
    if (post.faq.length) {
      schemas.push({
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: post.faq.map((i) => ({
          '@type': 'Question',
          name: i.q,
          acceptedAnswer: { '@type': 'Answer', text: i.a },
        })),
      });
    }
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.textContent = JSON.stringify(schemas);
    document.head.appendChild(script);
    return () => script.remove();
  }, [post]);

  if (!post) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-16 text-center">
        <p className="mb-4" style={{ color: 'var(--da-text-secondary, #64748B)' }}>This article could not be found.</p>
        <Link to="/blog" style={{ color: '#0D9488' }}>Browse all articles &rarr;</Link>
      </div>
    );
  }

  // Keep in-app links inside the SPA instead of doing a full page load.
  const onClick = (e) => {
    const a = e.target.closest('a');
    const href = a?.getAttribute('href');
    if (!href || !href.startsWith('/') || e.metaKey || e.ctrlKey || e.shiftKey || a.target) return;
    e.preventDefault();
    navigate(href);
  };

  return (
    <div>
      <section style={{ background: 'linear-gradient(135deg, #7C3AED, #0D9488)' }} className="text-white">
        <div className="max-w-3xl mx-auto px-4 py-14 sm:py-20 text-center">
          <div className="inline-block bg-white/20 text-white text-sm font-medium px-4 py-1.5 rounded-full mb-4">
            {post.category}
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold leading-tight mb-4">{post.title}</h1>
          <p className="text-lg text-white/90 max-w-2xl mx-auto">{post.description}</p>
          <div className="mt-4 text-sm text-white/80">
            {new Date(post.date).toLocaleDateString('en-IN', { month: 'long', year: 'numeric' })} &middot; {post.readTime}
          </div>
        </div>
      </section>

      <article className="max-w-3xl mx-auto px-4 py-12" style={{ background: 'var(--da-bg, #FFFFFF)' }}>
        <div className="md-post" onClick={onClick} dangerouslySetInnerHTML={{ __html: post.html }} />
        {post.faq.length > 0 && (
          <section className="md-post mt-10">
            <h2>Frequently Asked Questions</h2>
            {post.faq.map((item) => (
              <details key={item.q} className="md-faq">
                <summary>{item.q}</summary>
                <p>{item.a}</p>
              </details>
            ))}
          </section>
        )}
        <div className="mt-10 text-center">
          <Link to="/blog" style={{ color: '#0D9488' }} className="font-medium">&larr; More resume & career articles</Link>
        </div>
      </article>
    </div>
  );
}
