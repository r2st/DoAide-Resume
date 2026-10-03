import { Link } from 'react-router-dom'

export default function HowATSWorks() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <Link to="/blog" className="text-brand-gold text-sm mb-6 inline-block hover:underline">← Back to Blog</Link>

      <article>
        <h1 className="text-3xl md:text-4xl font-bold mb-4">How ATS Systems Work: The Complete Guide for Job Seekers</h1>
        <div className="text-brand-muted text-sm mb-8">Sep 25, 2025 · 10 min read</div>

        <div className="prose prose-invert max-w-none space-y-6 text-gray-300 leading-relaxed">
          <p>Applicant Tracking Systems (ATS) are software applications that manage the recruitment process for employers. Understanding how they work is the key to getting your resume seen by a human.</p>

          <h2 className="text-xl font-bold text-white mt-8 mb-3">What Is an ATS?</h2>
          <p>An ATS is a software application that automates the hiring process. Companies receive hundreds or thousands of applications for each position. The ATS filters, sorts, and ranks resumes before a recruiter ever sees them. Popular ATS platforms include Workday, Taleo, Greenhouse, Lever, and iCIMS.</p>

          <h2 className="text-xl font-bold text-white mt-8 mb-3">How Does an ATS Parse Your Resume?</h2>
          <p>When you submit your resume, the ATS performs several operations:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong className="text-white">Text extraction</strong> — The system converts your file (PDF, DOCX) into plain text, stripping formatting</li>
            <li><strong className="text-white">Section identification</strong> — It identifies sections like Experience, Education, and Skills based on headers</li>
            <li><strong className="text-white">Entity extraction</strong> — It pulls out specific data: names, dates, job titles, companies, skills, degrees</li>
            <li><strong className="text-white">Keyword matching</strong> — It compares extracted content against the job requirements</li>
            <li><strong className="text-white">Scoring and ranking</strong> — Candidates are ranked by relevance, with top matches surfaced to recruiters</li>
          </ul>

          <h2 className="text-xl font-bold text-white mt-8 mb-3">The Keyword Matching Process</h2>
          <p>Keyword matching is the core of ATS filtering. The system compares your resume against a list of required and preferred qualifications from the job posting. Modern ATS systems use several matching approaches:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong className="text-white">Exact match</strong> — Looking for the precise keyword or phrase</li>
            <li><strong className="text-white">Semantic matching</strong> — Understanding that &quot;JavaScript&quot; and &quot;JS&quot; mean the same thing</li>
            <li><strong className="text-white">Context weighting</strong> — Keywords in your Skills section may be weighted differently than those in a job description</li>
            <li><strong className="text-white">Frequency analysis</strong> — How often a keyword appears can affect scoring</li>
          </ul>

          <h2 className="text-xl font-bold text-white mt-8 mb-3">What Gets Filtered Out?</h2>
          <p>Common reasons resumes get filtered out by ATS:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Missing required keywords or skills</li>
            <li>Insufficient experience (based on dates parsed)</li>
            <li>Formatting that prevents proper parsing</li>
            <li>Missing required sections (like Education for roles requiring a degree)</li>
            <li>File format issues (corrupted files, scanned images)</li>
          </ul>

          <h2 className="text-xl font-bold text-white mt-8 mb-3">Common ATS Platforms and Their Quirks</h2>
          <p><strong className="text-white">Workday</strong> often asks candidates to fill out separate fields, but still parses the uploaded resume. <strong className="text-white">Taleo</strong> (used by many large corporations) is known for strict keyword matching. <strong className="text-white">Greenhouse</strong> and <strong className="text-white">Lever</strong>, popular with tech companies, tend to have more sophisticated parsing.</p>

          <h2 className="text-xl font-bold text-white mt-8 mb-3">How to Beat the ATS</h2>
          <p>You cannot &quot;trick&quot; an ATS, but you can optimize your resume to work with the system:</p>
          <ol className="list-decimal pl-6 space-y-2">
            <li>Mirror the language of the job posting</li>
            <li>Use standard formatting that parses cleanly</li>
            <li>Include all relevant keywords naturally</li>
            <li>Use a chronological or hybrid resume format</li>
            <li>Test your resume with an ATS checker before submitting</li>
          </ol>

          <h2 className="text-xl font-bold text-white mt-8 mb-3">The Human Factor</h2>
          <p>Remember: passing the ATS is just the first step. Your resume also needs to impress the recruiter who reviews it. The best resumes are optimized for both machines and humans — clear formatting, relevant keywords, and compelling achievements.</p>

          <div className="mt-12 p-6 border border-brand-gold/30 rounded-xl bg-brand-gold/5">
            <h3 className="text-lg font-bold text-brand-gold mb-2">Test Your Resume Against ATS</h3>
            <p className="mb-4">See how your resume performs with our free ATS Score Checker — instant results, no signup required.</p>
            <Link to="/ats-checker" className="inline-block px-6 py-3 bg-brand-gold text-brand-dark font-bold rounded-xl hover:bg-brand-gold-hover transition-colors">
              Check My ATS Score →
            </Link>
          </div>
        </div>
      </article>
    </div>
  )
}
