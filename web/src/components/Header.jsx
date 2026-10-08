import { Link } from 'react-router-dom';

function RobotFace({ size = 28 }) {
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

export default function Header() {
  return (
    <header className="sticky top-0 z-50" style={{ background: '#1A1A1D', borderBottom: '1px solid #2A2A2D' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-14">
          <Link to="/" className="flex items-center gap-2 no-underline">
            <RobotFace />
            <span style={{ fontFamily: "'Instrument Serif', Georgia, serif", fontSize: '1.25rem', color: '#E5E7EB' }}>
              DoAide <em style={{ color: '#F0B429', fontStyle: 'italic' }}>Resume</em>
            </span>
          </Link>
          <nav className="hidden md:flex items-center gap-6">
            <Link to="/" className="text-sm font-medium no-underline" style={{ color: '#9CA3AF' }} onMouseEnter={e => e.target.style.color = '#F0B429'} onMouseLeave={e => e.target.style.color = '#9CA3AF'}>Builder</Link>
            <Link to="/templates" className="text-sm font-medium no-underline" style={{ color: '#9CA3AF' }} onMouseEnter={e => e.target.style.color = '#F0B429'} onMouseLeave={e => e.target.style.color = '#9CA3AF'}>Templates</Link>
            <Link to="/ats-checker" className="text-sm font-medium no-underline" style={{ color: '#9CA3AF' }} onMouseEnter={e => e.target.style.color = '#F0B429'} onMouseLeave={e => e.target.style.color = '#9CA3AF'}>ATS Checker</Link>
            <Link to="/cover-letter-generator" className="text-sm font-medium no-underline" style={{ color: '#9CA3AF' }} onMouseEnter={e => e.target.style.color = '#F0B429'} onMouseLeave={e => e.target.style.color = '#9CA3AF'}>Cover Letter</Link>
            <Link to="/guides/resume-writing" className="text-sm font-medium no-underline" style={{ color: '#9CA3AF' }} onMouseEnter={e => e.target.style.color = '#F0B429'} onMouseLeave={e => e.target.style.color = '#9CA3AF'}>Guides</Link>
          </nav>
          <a href="#builder" className="px-4 py-2 rounded-lg text-sm font-medium transition-colors no-underline" style={{ background: '#F0B429', color: '#0A0A0B' }} onMouseEnter={e => e.target.style.background = '#D4A017'} onMouseLeave={e => e.target.style.background = '#F0B429'}>
            Build Resume Free
          </a>
        </div>
      </div>
    </header>
  );
}
