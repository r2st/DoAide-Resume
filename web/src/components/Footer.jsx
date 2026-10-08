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

function RobotFace({ size = 16 }) {
  return (
    <svg viewBox="0 0 32 32" width={size} height={size} aria-hidden="true">
      <line x1="16" y1="6" x2="16" y2="2" stroke="#F0B429" strokeWidth="1.5" strokeLinecap="round"/>
      <circle cx="16" cy="1.5" r="1.5" fill="#F0B429"/>
      <rect x="5" y="6" width="22" height="17" rx="5" fill="#F0B429"/>
      <ellipse cx="11" cy="13" rx="2.5" ry="3" fill="#0A0A0B"/>
      <ellipse cx="21" cy="13" rx="2.5" ry="3" fill="#0A0A0B"/>
      <circle cx="11.5" cy="12.5" r="1" fill="#F7CC5F"/>
      <circle cx="21.5" cy="12.5" r="1" fill="#F7CC5F"/>
      <path d="M12 19Q16 22 20 19" stroke="#0A0A0B" strokeWidth="1.2" fill="none" strokeLinecap="round"/>
      <rect x="1" y="10" width="4" height="5" rx="2" fill="#D4A017"/>
      <rect x="27" y="10" width="4" height="5" rx="2" fill="#D4A017"/>
    </svg>
  );
}

export default function Footer() {
  return (
    <footer style={{ background: '#0A0A0B', borderTop: '1px solid #2A2A2D', color: '#9CA3AF' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2 mb-3">
              <RobotFace size={20} />
              <span style={{ fontFamily: "'Instrument Serif', Georgia, serif", fontSize: '1.1rem', color: '#E5E7EB' }}>
                DoAide <em style={{ color: '#F0B429', fontStyle: 'italic' }}>Resume</em>
              </span>
            </div>
            <p className="text-sm leading-relaxed" style={{ color: '#6B7280' }}>
              Free resume builder for Indian professionals. Create ATS-friendly resumes in minutes.
            </p>
          </div>

          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider mb-3" style={{ color: '#E5E7EB' }}>Product</h4>
            <ul className="space-y-2">
              <li><Link to="/" className="text-sm hover:text-white transition-colors no-underline" style={{ color: '#6B7280' }}>Resume Builder</Link></li>
              <li><Link to="/templates" className="text-sm hover:text-white transition-colors no-underline" style={{ color: '#6B7280' }}>Templates</Link></li>
              <li><Link to="/ats-checker" className="text-sm hover:text-white transition-colors no-underline" style={{ color: '#6B7280' }}>ATS Checker</Link></li>
              <li><Link to="/cover-letter-generator" className="text-sm hover:text-white transition-colors no-underline" style={{ color: '#6B7280' }}>Cover Letter</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider mb-3" style={{ color: '#E5E7EB' }}>Guides</h4>
            <ul className="space-y-2">
              <li><Link to="/guides/resume-writing" className="text-sm hover:text-white transition-colors no-underline" style={{ color: '#6B7280' }}>Resume Writing</Link></li>
              <li><Link to="/guides/ats-resume" className="text-sm hover:text-white transition-colors no-underline" style={{ color: '#6B7280' }}>ATS Resume</Link></li>
              <li><Link to="/guides/fresher-resume" className="text-sm hover:text-white transition-colors no-underline" style={{ color: '#6B7280' }}>Fresher Resume</Link></li>
              <li><Link to="/guides/cover-letter" className="text-sm hover:text-white transition-colors no-underline" style={{ color: '#6B7280' }}>Cover Letter</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider mb-3" style={{ color: '#E5E7EB' }}>More from DoAide</h4>
            <ul className="space-y-2">
              <li><a href="https://docs.doaide.com" target="_blank" rel="noopener noreferrer" className="text-sm hover:text-white transition-colors no-underline" style={{ color: '#6B7280' }}>Docs</a></li>
              <li><a href="https://gst.doaide.com" target="_blank" rel="noopener noreferrer" className="text-sm hover:text-white transition-colors no-underline" style={{ color: '#6B7280' }}>GST Bot</a></li>
              <li><a href="https://409a.doaide.com" target="_blank" rel="noopener noreferrer" className="text-sm hover:text-white transition-colors no-underline" style={{ color: '#6B7280' }}>409A Valuations</a></li>
              <li><a href="https://job.doaide.com" target="_blank" rel="noopener noreferrer" className="text-sm hover:text-white transition-colors no-underline" style={{ color: '#6B7280' }}>Jobs</a></li>
            </ul>
          </div>
        </div>

        <div className="flex flex-wrap justify-center gap-4 mt-10 pt-6" style={{ borderTop: '1px solid #2A2A2D' }}>
          {DOAIDE_PRODUCTS.map((p) => (
            <a key={p.name} href={p.url} target="_blank" rel="noopener noreferrer" className="text-xs no-underline transition-colors" style={{ color: '#6B7280' }} onMouseEnter={e => e.target.style.color = '#F0B429'} onMouseLeave={e => e.target.style.color = '#6B7280'}>
              {p.name}
            </a>
          ))}
        </div>

        <div className="flex items-center justify-center gap-3 mt-4">
          <a href="https://doaide.com" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-xs no-underline" style={{ color: '#6B7280' }}>
            <RobotFace size={14} />
            doaide.com
          </a>
          <span className="text-xs" style={{ color: '#4B5563' }}>&copy; 2026 DoAide</span>
        </div>
      </div>
    </footer>
  );
}
