import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

const NAV_LINKS = [
  { to: '/', label: 'Builder' },
  { to: '/templates', label: 'Templates' },
  { to: '/ats-checker', label: 'ATS Checker' },
  { to: '/cover-letter-generator', label: 'Cover Letter' },
  { to: '/tools/interview-prep', label: 'Interview Prep' },
  { to: '/advisor', label: 'Career Advisor' },
  { to: '/guides/resume-writing', label: 'Guides' },
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => { setMenuOpen(false); }, [location.pathname]);

  return (
    <header className="sticky top-0 z-50" style={{ background: 'var(--da-bg)', borderBottom: '1px solid var(--da-border)' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-14">
          <Link to="/" className="flex items-center gap-1.5 no-underline">
            <span style={{ fontFamily: "'Inter', system-ui, sans-serif", fontSize: '1.25rem', fontWeight: 600, color: 'var(--da-text)' }}>
              DoAide <span style={{ color: 'var(--da-text-muted)' }}>|</span> <span style={{ color: '#0D9488' }}>Resume</span>
            </span>
          </Link>
          <nav className="hidden md:flex items-center gap-4">
            {NAV_LINKS.map((link) => (
              <Link key={link.to} to={link.to} className="text-sm font-medium no-underline min-h-[44px] inline-flex items-center px-1" style={{ color: 'var(--da-text-secondary)' }} onMouseEnter={e => e.target.style.color = '#0D9488'} onMouseLeave={e => e.target.style.color = 'var(--da-text-secondary)'}>{link.label}</Link>
            ))}
          </nav>
          <div className="flex items-center gap-2">
            <a href="#builder" className="hidden sm:inline-flex items-center min-h-[44px] px-4 rounded-lg text-sm font-medium transition-colors no-underline" style={{ background: '#0D9488', color: '#FFFFFF' }} onMouseEnter={e => e.target.style.background = '#0F766E'} onMouseLeave={e => e.target.style.background = '#0D9488'}>
              Build Resume Free
            </a>
            <button
              type="button"
              className="md:hidden flex items-center justify-center w-[44px] h-[44px] rounded-lg"
              style={{ background: 'var(--da-surface)', border: '1px solid var(--da-border)' }}
              aria-expanded={menuOpen}
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
              onClick={() => setMenuOpen(!menuOpen)}
            >
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="var(--da-text)" strokeWidth="1.5" strokeLinecap="round">
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
        <nav className="md:hidden px-4 pb-4 flex flex-col gap-1" style={{ borderTop: '1px solid var(--da-border)' }}>
          {NAV_LINKS.map((link) => (
            <Link key={link.to} to={link.to} className="block text-sm font-medium no-underline min-h-[44px] flex items-center px-2 rounded-lg" style={{ color: 'var(--da-text-secondary)' }}>
              {link.label}
            </Link>
          ))}
          <a href="#builder" className="inline-flex items-center justify-center min-h-[44px] px-4 rounded-lg text-sm font-medium no-underline mt-1" style={{ background: '#0D9488', color: '#FFFFFF' }}>
            Build Resume Free
          </a>
        </nav>
      )}
    </header>
  );
}
