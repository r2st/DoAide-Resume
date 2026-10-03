import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'
import ATSChecker from './pages/ATSChecker'
import JobMatch from './pages/JobMatch'
import ResumeBuilder from './pages/ResumeBuilder'
import Tools from './pages/Tools'
import Blog from './pages/Blog'
import Embed from './pages/Embed'
import ATSResumeTips from './pages/blog/ATSResumeTips'
import CommonResumeMistakes from './pages/blog/CommonResumeMistakes'
import HowATSWorks from './pages/blog/HowATSWorks'

export default function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/ats-checker" element={<ATSChecker />} />
        <Route path="/job-match" element={<JobMatch />} />
        <Route path="/resume-builder" element={<ResumeBuilder />} />
        <Route path="/tools" element={<Tools />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/blog/ats-resume-tips" element={<ATSResumeTips />} />
        <Route path="/blog/common-resume-mistakes" element={<CommonResumeMistakes />} />
        <Route path="/blog/how-ats-works" element={<HowATSWorks />} />
        <Route path="/embed" element={<Embed />} />
      </Routes>
    </Layout>
  )
}
