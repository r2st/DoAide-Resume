import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import ToolTracker from './components/ToolTracker';
import SocialProofBar from './components/SocialProofBar';
import ReferralBanner from './components/ReferralBanner';
import HomePage from './pages/HomePage';
import TemplatesPage from './pages/TemplatesPage';
import AtsCheckerPage from './pages/AtsCheckerPage';
import ResumeWritingGuide from './pages/guides/ResumeWritingGuide';
import AtsResumeGuide from './pages/guides/AtsResumeGuide';
import FresherResumeGuide from './pages/guides/FresherResumeGuide';
import CoverLetterGuide from './pages/guides/CoverLetterGuide';
import CoverLetterGenerator from './pages/CoverLetterGenerator';
import LinkedinSummaryGenerator from './pages/LinkedinSummaryGenerator';
import VsNovoresume from './pages/compare/VsNovoresume';
import BestFreeResumeBuilder from './pages/compare/BestFreeResumeBuilder';
import VsCanva from './pages/compare/VsCanva';
import BestResumeBuilders from './pages/compare/BestResumeBuilders';
import InterviewPrepPage from './pages/InterviewPrepPage';
import BestResumeFormatIndia from './pages/guides/BestResumeFormatIndia';
import FresherResumeTemplate from './pages/guides/FresherResumeTemplate';
import BestResumeFormatFreshers2026 from './pages/guides/BestResumeFormatFreshers2026';
import CoverLetterForITJobs from './pages/guides/CoverLetterForITJobs';
import VsZety from './pages/compare/VsZety';
import InterviewPrepChecklist from './pages/tools/InterviewPrepChecklist';
import AdvisorPage from './pages/AdvisorPage';
import ResumeBuilding2026 from './pages/blog/ResumeBuilding2026';
import AtsOptimization2026 from './pages/blog/AtsOptimization2026';
import ResumeFormatFreshers2026 from './pages/blog/ResumeFormatFreshers2026';
import AtsFriendlyResume from './pages/blog/AtsFriendlyResume';
import ResumeMistakes from './pages/blog/ResumeMistakes';
import AtsFloatingWidget from './components/AtsFloatingWidget';
import FeedbackWidget from './components/FeedbackWidget';

export default function App() {
  return (
    <div className="min-h-screen flex flex-col" style={{ background: '#0A0A0B' }}>
      <Header />
      <ToolTracker />
      <main className="flex-1">
        <SocialProofBar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/templates" element={<TemplatesPage />} />
          <Route path="/ats-checker" element={<AtsCheckerPage />} />
          <Route path="/cover-letter-generator" element={<CoverLetterGenerator />} />
          <Route path="/linkedin-summary-generator" element={<LinkedinSummaryGenerator />} />
          <Route path="/guides/resume-writing" element={<ResumeWritingGuide />} />
          <Route path="/guides/ats-resume" element={<AtsResumeGuide />} />
          <Route path="/guides/fresher-resume" element={<FresherResumeGuide />} />
          <Route path="/guides/cover-letter" element={<CoverLetterGuide />} />
          <Route path="/compare/novoresume" element={<VsNovoresume />} />
          <Route path="/best-free-resume-builder" element={<BestFreeResumeBuilder />} />
          <Route path="/compare/canva" element={<VsCanva />} />
          <Route path="/compare/best-resume-builders" element={<BestResumeBuilders />} />
          <Route path="/interview-preparation" element={<InterviewPrepPage />} />
          <Route path="/guides/best-resume-format-india" element={<BestResumeFormatIndia />} />
          <Route path="/guides/fresher-resume-template" element={<FresherResumeTemplate />} />
          <Route path="/guides/best-resume-format-freshers-2026" element={<BestResumeFormatFreshers2026 />} />
          <Route path="/guides/cover-letter-it-jobs" element={<CoverLetterForITJobs />} />
          <Route path="/compare/zety" element={<VsZety />} />
          <Route path="/tools/interview-prep" element={<InterviewPrepChecklist />} />
          <Route path="/advisor" element={<AdvisorPage />} />
          <Route path="/blog/resume-building-2026" element={<ResumeBuilding2026 />} />
          <Route path="/blog/ats-optimization-2026" element={<AtsOptimization2026 />} />
          <Route path="/blog/resume-format-freshers-2026" element={<ResumeFormatFreshers2026 />} />
          <Route path="/blog/ats-friendly-resume" element={<AtsFriendlyResume />} />
          <Route path="/blog/resume-mistakes" element={<ResumeMistakes />} />
        </Routes>
      </main>
      <Footer />
      <ReferralBanner />
      <AtsFloatingWidget />
      <FeedbackWidget />
    </div>
  );
}
