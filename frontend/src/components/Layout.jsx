import { Link, useLocation } from 'react-router-dom'
import { useState } from 'react'

const NAV_ITEMS = [
  { path: '/', label: 'Home' },
  { path: '/ats-checker', label: 'ATS Checker' },
  { path: '/job-match', label: 'Job Match' },
  { path: '/resume-builder', label: 'Resume Builder' },
  { path: '/tools', label: 'Free Tools' },
  { path: '/blog', label: 'Blog' },
]

export default function Layout({ children }) {
  const location = useLocation()
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <div className="min-h-screen flex flex-col">
      <header className="border-b border-brand-border bg-brand-dark/95 backdrop-blur sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 text-xl font-bold">
            <span className="text-brand-gold">DoAide</span>
            <span className="text-white">Resume AI</span>
          </Link>

          <nav className="hidden md:flex items-center gap-6">
            {NAV_ITEMS.map(item => (
              <Link
                key={item.path}
                to={item.path}
                className={`text-sm transition-colors ${
                  location.pathname === item.path
                    ? 'text-brand-gold font-medium'
                    : 'text-brand-muted hover:text-white'
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden text-white p-2"
            aria-label="Toggle menu"
          >
            <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2">
              {menuOpen ? (
                <path d="M6 6l12 12M6 18L18 6" />
              ) : (
                <path d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {menuOpen && (
          <nav className="md:hidden border-t border-brand-border px-4 py-3 space-y-2">
            {NAV_ITEMS.map(item => (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setMenuOpen(false)}
                className={`block py-2 text-sm ${
                  location.pathname === item.path
                    ? 'text-brand-gold font-medium'
                    : 'text-brand-muted'
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        )}
      </header>

      <main className="flex-1">{children}</main>

      <footer className="border-t border-brand-border py-8 mt-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-brand-gold font-bold mb-3">DoAide Resume AI</h3>
              <p className="text-brand-muted text-sm">Free ATS resume checker and AI-powered resume builder. No login required.</p>
            </div>
            <div>
              <h4 className="font-semibold mb-3 text-sm">Tools</h4>
              <div className="space-y-2">
                <Link to="/ats-checker" className="block text-brand-muted text-sm hover:text-white">ATS Score Checker</Link>
                <Link to="/job-match" className="block text-brand-muted text-sm hover:text-white">Job Match Scorer</Link>
                <Link to="/resume-builder" className="block text-brand-muted text-sm hover:text-white">AI Resume Builder</Link>
                <Link to="/tools" className="block text-brand-muted text-sm hover:text-white">All Free Tools</Link>
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-3 text-sm">Resources</h4>
              <div className="space-y-2">
                <Link to="/blog/ats-resume-tips" className="block text-brand-muted text-sm hover:text-white">ATS Resume Tips</Link>
                <Link to="/blog/common-resume-mistakes" className="block text-brand-muted text-sm hover:text-white">Common Resume Mistakes</Link>
                <Link to="/blog/how-ats-works" className="block text-brand-muted text-sm hover:text-white">How ATS Systems Work</Link>
                <Link to="/embed" className="block text-brand-muted text-sm hover:text-white">Embed Widget</Link>
              </div>
            </div>
          </div>
          <div className="mt-8 pt-6 border-t border-brand-border text-center text-brand-muted text-xs">
            &copy; {new Date().getFullYear()} DoAide. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  )
}
