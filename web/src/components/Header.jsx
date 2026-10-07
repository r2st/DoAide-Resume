import { Link } from 'react-router-dom';

export default function Header() {
  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-14">
          <Link to="/" className="flex items-center gap-2">
            <span className="text-2xl font-bold text-blue-600">DoAide</span>
            <span className="text-lg font-medium text-gray-500">Resume</span>
          </Link>
          <nav className="hidden md:flex items-center gap-6">
            <Link to="/" className="text-gray-600 hover:text-blue-600 text-sm font-medium">Builder</Link>
            <Link to="/templates" className="text-gray-600 hover:text-blue-600 text-sm font-medium">Templates</Link>
            <Link to="/ats-checker" className="text-gray-600 hover:text-blue-600 text-sm font-medium">ATS Checker</Link>
            <Link to="/cover-letter-generator" className="text-gray-600 hover:text-blue-600 text-sm font-medium">Cover Letter</Link>
            <Link to="/linkedin-summary-generator" className="text-gray-600 hover:text-blue-600 text-sm font-medium">LinkedIn</Link>
            <Link to="/guides/resume-writing" className="text-gray-600 hover:text-blue-600 text-sm font-medium">Guides</Link>
          </nav>
          <a href="/" className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors">
            Build Resume Free
          </a>
        </div>
      </div>
    </header>
  );
}
