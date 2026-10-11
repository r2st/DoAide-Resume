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
    <div className="min-h-screen flex flex-col bg-white dark:bg-slate-900">
      <header className="border-b border-slate-200 dark:border-slate-700 bg-white/95 dark:bg-slate-900/95 backdrop-blur sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-1.5 text-xl font-semibold no-underline">
            <span className="text-slate-900 dark:text-white">DoAide</span>
            <span className="text-slate-400">|</span>
            <span className="text-teal-600">Resume</span>
          </Link>

          <nav className="hidden md:flex items-center gap-6">
            {NAV_ITEMS.map(item => (
              <Link
                key={item.path}
                to={item.path}
                className={`text-sm transition-colors ${
                  location.pathname === item.path
                    ? 'text-teal-600 font-medium'
                    : 'text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white'
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden text-slate-900 dark:text-white p-2"
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
          <nav className="md:hidden border-t border-slate-200 dark:border-slate-700 px-4 py-3 space-y-2">
            {NAV_ITEMS.map(item => (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setMenuOpen(false)}
                className={`block py-2 text-sm ${
                  location.pathname === item.path
                    ? 'text-teal-600 font-medium'
                    : 'text-slate-500 dark:text-slate-400'
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        )}
      </header>

      <main className="flex-1">{children}</main>

      <footer className="border-t border-slate-200 dark:border-slate-700 py-8 mt-16 bg-slate-50 dark:bg-slate-900">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="font-semibold mb-3 text-slate-900 dark:text-white">DoAide <span className="text-slate-400">|</span> <span className="text-teal-600">Resume</span></h3>
              <p className="text-slate-500 dark:text-slate-400 text-sm">Free ATS resume checker and AI-powered resume builder. No login required.</p>
            </div>
            <div>
              <h4 className="font-semibold mb-3 text-sm text-slate-900 dark:text-white">Tools</h4>
              <div className="space-y-2">
                <Link to="/ats-checker" className="block text-slate-500 dark:text-slate-400 text-sm hover:text-teal-600">ATS Score Checker</Link>
                <Link to="/job-match" className="block text-slate-500 dark:text-slate-400 text-sm hover:text-teal-600">Job Match Scorer</Link>
                <Link to="/resume-builder" className="block text-slate-500 dark:text-slate-400 text-sm hover:text-teal-600">AI Resume Builder</Link>
                <Link to="/tools" className="block text-slate-500 dark:text-slate-400 text-sm hover:text-teal-600">All Free Tools</Link>
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-3 text-sm text-slate-900 dark:text-white">Resources</h4>
              <div className="space-y-2">
                <Link to="/blog/ats-resume-tips" className="block text-slate-500 dark:text-slate-400 text-sm hover:text-teal-600">ATS Resume Tips</Link>
                <Link to="/blog/common-resume-mistakes" className="block text-slate-500 dark:text-slate-400 text-sm hover:text-teal-600">Common Resume Mistakes</Link>
                <Link to="/blog/how-ats-works" className="block text-slate-500 dark:text-slate-400 text-sm hover:text-teal-600">How ATS Systems Work</Link>
                <Link to="/embed" className="block text-slate-500 dark:text-slate-400 text-sm hover:text-teal-600">Embed Widget</Link>
              </div>
            </div>
          </div>
          <div className="mt-8 pt-6 border-t border-slate-200 dark:border-slate-700 flex items-center justify-center gap-3">
            <a href="https://doaide.com" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-xs no-underline px-3 py-1.5 rounded-full text-teal-600 bg-teal-50 dark:bg-teal-900/20">
              <span className="w-1.5 h-1.5 rounded-full bg-teal-600 inline-block" />
              A DoAide Product
            </a>
            <span className="text-slate-400 dark:text-slate-500 text-xs">&copy; {new Date().getFullYear()} DoAide</span>
          </div>
        </div>
      </footer>
    </div>
  )
}
