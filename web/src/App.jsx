import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import TemplatesPage from './pages/TemplatesPage';
import AtsCheckerPage from './pages/AtsCheckerPage';
import ResumeWritingGuide from './pages/guides/ResumeWritingGuide';
import AtsResumeGuide from './pages/guides/AtsResumeGuide';
import FresherResumeGuide from './pages/guides/FresherResumeGuide';
import CoverLetterGuide from './pages/guides/CoverLetterGuide';
import VsNovoresume from './pages/compare/VsNovoresume';
import BestFreeResumeBuilder from './pages/compare/BestFreeResumeBuilder';

export default function App() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/templates" element={<TemplatesPage />} />
          <Route path="/ats-checker" element={<AtsCheckerPage />} />
          <Route path="/guides/resume-writing" element={<ResumeWritingGuide />} />
          <Route path="/guides/ats-resume" element={<AtsResumeGuide />} />
          <Route path="/guides/fresher-resume" element={<FresherResumeGuide />} />
          <Route path="/guides/cover-letter" element={<CoverLetterGuide />} />
          <Route path="/compare/novoresume" element={<VsNovoresume />} />
          <Route path="/best-free-resume-builder" element={<BestFreeResumeBuilder />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}
