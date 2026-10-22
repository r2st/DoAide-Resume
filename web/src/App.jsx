import { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import ErrorBoundary from './components/ErrorBoundary';
import Header from './components/Header';
import Footer from './components/Footer';
import ToolTracker from './components/ToolTracker';
import ReferralBanner from './components/ReferralBanner';
import HomePage from './pages/HomePage';
const TemplatesPage = lazy(() => import('./pages/TemplatesPage'));
const AtsCheckerPage = lazy(() => import('./pages/AtsCheckerPage'));
const ResumeWritingGuide = lazy(() => import('./pages/guides/ResumeWritingGuide'));
const AtsResumeGuide = lazy(() => import('./pages/guides/AtsResumeGuide'));
const FresherResumeGuide = lazy(() => import('./pages/guides/FresherResumeGuide'));
const CoverLetterGuide = lazy(() => import('./pages/guides/CoverLetterGuide'));
const CoverLetterGenerator = lazy(() => import('./pages/CoverLetterGenerator'));
const LinkedinSummaryGenerator = lazy(() => import('./pages/LinkedinSummaryGenerator'));
const VsNovoresume = lazy(() => import('./pages/compare/VsNovoresume'));
const BestFreeResumeBuilder = lazy(() => import('./pages/compare/BestFreeResumeBuilder'));
const VsCanva = lazy(() => import('./pages/compare/VsCanva'));
const BestResumeBuilders = lazy(() => import('./pages/compare/BestResumeBuilders'));
const InterviewPrepPage = lazy(() => import('./pages/InterviewPrepPage'));
const BestResumeFormatIndia = lazy(() => import('./pages/guides/BestResumeFormatIndia'));
const FresherResumeTemplate = lazy(() => import('./pages/guides/FresherResumeTemplate'));
const BestResumeFormatFreshers2026 = lazy(() => import('./pages/guides/BestResumeFormatFreshers2026'));
const CoverLetterForITJobs = lazy(() => import('./pages/guides/CoverLetterForITJobs'));
const VsZety = lazy(() => import('./pages/compare/VsZety'));
const InterviewPrepChecklist = lazy(() => import('./pages/tools/InterviewPrepChecklist'));
const AdvisorPage = lazy(() => import('./pages/AdvisorPage'));
const ResumeBuilding2026 = lazy(() => import('./pages/blog/ResumeBuilding2026'));
const AtsOptimization2026 = lazy(() => import('./pages/blog/AtsOptimization2026'));
const ResumeFormatFreshers2026 = lazy(() => import('./pages/blog/ResumeFormatFreshers2026'));
const AtsFriendlyResume = lazy(() => import('./pages/blog/AtsFriendlyResume'));
const ResumeMistakes = lazy(() => import('./pages/blog/ResumeMistakes'));
const AiResumeBuilderFreshers2026 = lazy(() => import('./pages/blog/AiResumeBuilderFreshers2026'));
const ResumeWithNoExperience = lazy(() => import('./pages/blog/ResumeWithNoExperience'));
const BlogIndex = lazy(() => import('./pages/blog/BlogIndex'));
const MarkdownPost = lazy(() => import('./pages/blog/MarkdownPost'));
import AtsFloatingWidget from './components/AtsFloatingWidget';
import FeedbackWidget from './components/FeedbackWidget';

function RouteLoader() {
  return (
    <div data-route-loading role="status" aria-label="Loading page" className="flex items-center justify-center py-24">
      <div className="w-8 h-8 rounded-full animate-spin" style={{ border: '2px solid var(--da-border, #E2E8F0)', borderTopColor: '#0D9488' }} />
    </div>
  );
}

export default function App() {
  return (
    <div className="min-h-screen flex flex-col" style={{ background: 'var(--da-bg)' }}>
      <Header />
      <ToolTracker />
      <main className="flex-1">
        <ErrorBoundary>
        <Suspense fallback={<RouteLoader />}>
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
          <Route path="/blog/ai-resume-builder-freshers-2026" element={<AiResumeBuilderFreshers2026 />} />
          <Route path="/blog/resume-with-no-experience" element={<ResumeWithNoExperience />} />
          <Route path="/blog" element={<BlogIndex />} />
          <Route path="/blog/:slug" element={<MarkdownPost />} />
        </Routes>
        </Suspense>
        </ErrorBoundary>
      </main>
      <Footer />
      <ReferralBanner />
      <AtsFloatingWidget />
      <FeedbackWidget />
    </div>
  );
}
