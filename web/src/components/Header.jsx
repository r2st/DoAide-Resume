import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

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

const NAV_LINKS = [
  { to: '/', label: 'Builder' },
  { to: '/templates', label: 'Templates' },
  { to: '/ats-checker', label: 'ATS Checker' },
  { to: '/cover-letter-generator', label: 'Cover Letter' },
  { to: '/guides/resume-writing', label: 'Guides' },
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => { setMenuOpen(false); }, [location.pathname]);

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
          <nav className="hidden md:flex items-center gap-4">
            {NAV_LINKS.map((link) => (
              <Link key={link.to} to={link.to} className="text-sm font-medium no-underline min-h-[44px] inline-flex items-center px-1" style={{ color: '#9CA3AF' }} onMouseEnter={e => e.target.style.color = '#F0B429'} onMouseLeave={e => e.target.style.color = '#9CA3AF'}>{link.label}</Link>
            ))}
          </nav>
          <div className="flex items-center gap-2">
            <a href="#builder" className="hidden sm:inline-flex items-center min-h-[44px] px-4 rounded-lg text-sm font-medium transition-colors no-underline" style={{ background: '#F0B429', color: '#0A0A0B' }} onMouseEnter={e => e.target.style.background = '#D4A017'} onMouseLeave={e => e.target.style.background = '#F0B429'}>
              Build Resume Free
            </a>
            <button
              type="button"
              className="md:hidden flex items-center justify-center w-[44px] h-[44px] rounded-lg"
              style={{ background: '#222225', border: '1px solid #2A2A2D' }}
              aria-expanded={menuOpen}
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
              onClick={() => setMenuOpen(!menuOpen)}
            >
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="#E5E7EB" strokeWidth="1.5" strokeLinecap="round">
                {menuOpen ? (
                  <>
                    <line x1="5" y1="5" x2="15" y2="15" />
                    <line x1="15" y1="5" x2="5" y2="15" />
                  </>
                ) : (
                  <>
                    <line x1="3" y1="6" x2="17" y2="6" />
                    <line x1="3" y1="10" x2="17" y2="10" />
                    <line x1="3" y1="14" x2="17" y2="14" />
                  </>
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>
      {menuOpen && (
        <nav className="md:hidden px-4 pb-4 flex flex-col gap-1" style={{ borderTop: '1px solid #2A2A2D' }}>
          {NAV_LINKS.map((link) => (
            <Link key={link.to} to={link.to} className="block text-sm font-medium no-underline min-h-[44px] flex items-center px-2 rounded-lg" style={{ color: '#9CA3AF' }}>
              {link.label}
            </Link>
          ))}
          <a href="#builder" className="inline-flex items-center justify-center min-h-[44px] px-4 rounded-lg text-sm font-medium no-underline mt-1" style={{ background: '#F0B429', color: '#0A0A0B' }}>
            Build Resume Free
          </a>
        </nav>
      )}
    </header>
  );
}
