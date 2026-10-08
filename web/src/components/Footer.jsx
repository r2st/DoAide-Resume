import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {/* Branding */}
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-xl font-bold text-blue-400">DoAide</span>
              <span className="text-base font-medium text-gray-400">Resume</span>
            </div>
            <p className="text-sm text-gray-400 leading-relaxed">
              Free resume builder for Indian professionals. Create ATS-friendly resumes in minutes.
            </p>
            <p className="text-sm text-gray-500 mt-3">Made with &#10084;&#65039; in India</p>
          </div>

          {/* Product Links */}
          <div>
            <h4 className="text-sm font-semibold text-gray-300 uppercase tracking-wider mb-3">Product</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-sm text-gray-400 hover:text-white transition-colors">
                  Resume Builder
                </Link>
              </li>
              <li>
                <Link to="/templates" className="text-sm text-gray-400 hover:text-white transition-colors">
                  Templates
                </Link>
              </li>
              <li>
                <Link to="/ats-checker" className="text-sm text-gray-400 hover:text-white transition-colors">
                  ATS Checker
                </Link>
              </li>
            </ul>
          </div>

          {/* Guide Links */}
          <div>
            <h4 className="text-sm font-semibold text-gray-300 uppercase tracking-wider mb-3">Guides</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/guides/resume-writing" className="text-sm text-gray-400 hover:text-white transition-colors">
                  Resume Writing
                </Link>
              </li>
              <li>
                <Link to="/guides/ats-resume" className="text-sm text-gray-400 hover:text-white transition-colors">
                  ATS Resume
                </Link>
              </li>
              <li>
                <Link to="/guides/fresher-resume" className="text-sm text-gray-400 hover:text-white transition-colors">
                  Fresher Resume
                </Link>
              </li>
              <li>
                <Link to="/guides/cover-letter" className="text-sm text-gray-400 hover:text-white transition-colors">
                  Cover Letter
                </Link>
              </li>
            </ul>
          </div>

          {/* Other DoAide Products */}
          <div>
            <h4 className="text-sm font-semibold text-gray-300 uppercase tracking-wider mb-3">More from DoAide</h4>
            <ul className="space-y-2">
              <li>
                <a href="https://docs.doaide.com" target="_blank" rel="noopener noreferrer" className="text-sm text-gray-400 hover:text-white transition-colors">
                  Docs
                </a>
              </li>
              <li>
                <a href="https://gst.doaide.com" target="_blank" rel="noopener noreferrer" className="text-sm text-gray-400 hover:text-white transition-colors">
                  GST Bot
                </a>
              </li>
              <li>
                <a href="https://409a.doaide.com" target="_blank" rel="noopener noreferrer" className="text-sm text-gray-400 hover:text-white transition-colors">
                  409A Valuations
                </a>
              </li>
              <li>
                <a href="https://insure.doaide.com" target="_blank" rel="noopener noreferrer" className="text-sm text-gray-400 hover:text-white transition-colors">
                  InsureKit
                </a>
              </li>
              <li>
                <a href="https://tax.doaide.com" target="_blank" rel="noopener noreferrer" className="text-sm text-gray-400 hover:text-white transition-colors">
                  TaxFile
                </a>
              </li>
              <li>
                <a href="https://pulse.doaide.com" target="_blank" rel="noopener noreferrer" className="text-sm text-gray-400 hover:text-white transition-colors">
                  Pulse
                </a>
              </li>
              <li>
                <a href="https://contracts.doaide.com" target="_blank" rel="noopener noreferrer" className="text-sm text-gray-400 hover:text-white transition-colors">
                  Contracts
                </a>
              </li>
              <li>
                <a href="https://invoicer.doaide.com" target="_blank" rel="noopener noreferrer" className="text-sm text-gray-400 hover:text-white transition-colors">
                  Invoicer
                </a>
              </li>
              <li>
                <a href="https://homenex.aiknol.com" target="_blank" rel="noopener noreferrer" className="text-sm text-gray-400 hover:text-white transition-colors">
                  HomeNex
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-10 pt-6 text-center">
          <p className="text-sm text-gray-500">
            &copy; 2026 DoAide. Free tools for Indian professionals.
          </p>
        </div>
      </div>
    </footer>
  );
}
