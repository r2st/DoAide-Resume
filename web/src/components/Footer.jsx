import { Link } from 'react-router-dom';

const DOAIDE_PRODUCTS = [
  { name: 'Desk', url: 'https://desk.doaide.com' },
  { name: 'Jobs', url: 'https://job.doaide.com' },
  { name: '409A', url: 'https://409a.doaide.com' },
  { name: 'GST', url: 'https://gst.doaide.com' },
  { name: 'Pulse', url: 'https://pulse.doaide.com' },
  { name: 'Med', url: 'https://med.doaide.com' },
  { name: 'Realty', url: 'https://realty.doaide.com' },
  { name: 'Reach', url: 'https://reach.doaide.com' },
  { name: 'Trade', url: 'https://trade.doaide.com' },
];

export default function Footer() {
  return (
    <footer style={{ background: 'var(--da-surface)', borderTop: '1px solid var(--da-border)', color: 'var(--da-text-secondary)' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-1.5 mb-3">
              <span style={{ fontFamily: "'Inter', system-ui, sans-serif", fontSize: '1.1rem', fontWeight: 600, color: 'var(--da-text)' }}>
                DoAide <span style={{ color: 'var(--da-text-muted)' }}>|</span> <span style={{ color: '#0D9488' }}>Resume</span>
              </span>
            </div>
            <p className="text-sm leading-relaxed" style={{ color: 'var(--da-text-muted)' }}>
              Free resume builder for Indian professionals. Create ATS-friendly resumes in minutes.
            </p>
          </div>

          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider mb-3" style={{ color: 'var(--da-text)' }}>Product</h4>
            <ul className="space-y-0">
              <li><Link to="/" className="text-sm hover:text-teal-600 transition-colors no-underline min-h-[44px] flex items-center" style={{ color: 'var(--da-text-muted)' }}>Resume Builder</Link></li>
              <li><Link to="/templates" className="text-sm hover:text-teal-600 transition-colors no-underline min-h-[44px] flex items-center" style={{ color: 'var(--da-text-muted)' }}>Templates</Link></li>
              <li><Link to="/ats-checker" className="text-sm hover:text-teal-600 transition-colors no-underline min-h-[44px] flex items-center" style={{ color: 'var(--da-text-muted)' }}>ATS Checker</Link></li>
              <li><Link to="/cover-letter-generator" className="text-sm hover:text-teal-600 transition-colors no-underline min-h-[44px] flex items-center" style={{ color: 'var(--da-text-muted)' }}>Cover Letter</Link></li>
              <li><Link to="/resume-score" className="text-sm hover:text-teal-600 transition-colors no-underline min-h-[44px] flex items-center" style={{ color: 'var(--da-text-muted)' }}>AI Resume Score</Link></li>
              <li><Link to="/keyword-optimizer" className="text-sm hover:text-teal-600 transition-colors no-underline min-h-[44px] flex items-center" style={{ color: 'var(--da-text-muted)' }}>Keyword Optimizer</Link></li>
              <li><Link to="/portfolio-builder" className="text-sm hover:text-teal-600 transition-colors no-underline min-h-[44px] flex items-center" style={{ color: 'var(--da-text-muted)' }}>Portfolio Builder</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider mb-3" style={{ color: 'var(--da-text)' }}>Guides & Blog</h4>
            <ul className="space-y-0">
              <li><Link to="/guides/resume-writing" className="text-sm hover:text-teal-600 transition-colors no-underline min-h-[44px] flex items-center" style={{ color: 'var(--da-text-muted)' }}>Resume Writing</Link></li>
              <li><Link to="/guides/ats-resume" className="text-sm hover:text-teal-600 transition-colors no-underline min-h-[44px] flex items-center" style={{ color: 'var(--da-text-muted)' }}>ATS Resume</Link></li>
              <li><Link to="/blog/resume-building-2026" className="text-sm hover:text-teal-600 transition-colors no-underline min-h-[44px] flex items-center" style={{ color: 'var(--da-text-muted)' }}>Resume Building 2026</Link></li>
              <li><Link to="/blog/ats-optimization-2026" className="text-sm hover:text-teal-600 transition-colors no-underline min-h-[44px] flex items-center" style={{ color: 'var(--da-text-muted)' }}>ATS Optimization 2026</Link></li>
              <li><Link to="/blog" className="text-sm hover:text-teal-600 transition-colors no-underline min-h-[44px] flex items-center" style={{ color: 'var(--da-text-muted)' }}>All Blog Posts</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider mb-3" style={{ color: 'var(--da-text)' }}>More from DoAide</h4>
            <ul className="space-y-0">
              <li><a href="https://docs.doaide.com" target="_blank" rel="noopener noreferrer" className="text-sm hover:text-teal-600 transition-colors no-underline min-h-[44px] flex items-center" style={{ color: 'var(--da-text-muted)' }}>Docs</a></li>
              <li><a href="https://gst.doaide.com" target="_blank" rel="noopener noreferrer" className="text-sm hover:text-teal-600 transition-colors no-underline min-h-[44px] flex items-center" style={{ color: 'var(--da-text-muted)' }}>GST Bot</a></li>
              <li><a href="https://409a.doaide.com" target="_blank" rel="noopener noreferrer" className="text-sm hover:text-teal-600 transition-colors no-underline min-h-[44px] flex items-center" style={{ color: 'var(--da-text-muted)' }}>409A Valuations</a></li>
              <li><a href="https://job.doaide.com" target="_blank" rel="noopener noreferrer" className="text-sm hover:text-teal-600 transition-colors no-underline min-h-[44px] flex items-center" style={{ color: 'var(--da-text-muted)' }}>Jobs</a></li>
            </ul>
          </div>
        </div>

        <div className="flex flex-wrap justify-center gap-2 mt-10 pt-6" style={{ borderTop: '1px solid var(--da-border)' }}>
          {DOAIDE_PRODUCTS.map((p) => (
            <a key={p.name} href={p.url} target="_blank" rel="noopener noreferrer" className="text-xs no-underline transition-colors min-h-[44px] inline-flex items-center px-2" style={{ color: 'var(--da-text-muted)' }} onMouseEnter={e => e.target.style.color = '#0D9488'} onMouseLeave={e => e.target.style.color = 'var(--da-text-muted)'}>
              {p.name}
            </a>
          ))}
        </div>

        <div className="flex items-center justify-center gap-3 mt-4">
          <a href="https://doaide.com" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-xs no-underline px-3 py-1.5 rounded-full" style={{ color: '#0D9488', background: 'var(--da-primary-bg, rgba(13,148,136,0.1))' }}>
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#0D9488', display: 'inline-block' }} />
            A DoAide Product
          </a>
          <span className="text-xs" style={{ color: 'var(--da-text-muted)' }}>&copy; 2026 DoAide</span>
        </div>
      </div>
    </footer>
  );
}
