import { Link } from 'react-router-dom'

export default function ATSResumeTips() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <Link to="/blog" className="text-brand-gold text-sm mb-6 inline-block hover:underline">← Back to Blog</Link>

      <article>
        <h1 className="text-3xl md:text-4xl font-bold mb-4">15 ATS Resume Tips That Actually Work in 2025</h1>
        <div className="text-brand-muted text-sm mb-8">Oct 2, 2025 · 8 min read</div>

        <div className="prose prose-invert max-w-none space-y-6 text-gray-300 leading-relaxed">
          <p>With over 98% of Fortune 500 companies using Applicant Tracking Systems (ATS), your resume needs to be optimized for both machines and humans. Here are 15 proven tips to help your resume pass ATS screening.</p>

          <h2 className="text-xl font-bold text-white mt-8 mb-3">1. Use Standard Section Headings</h2>
          <p>ATS systems look for specific section headers like &quot;Experience,&quot; &quot;Education,&quot; and &quot;Skills.&quot; Creative alternatives like &quot;My Journey&quot; or &quot;What I Bring&quot; confuse the parser. Stick to conventional headings that every ATS recognizes.</p>

          <h2 className="text-xl font-bold text-white mt-8 mb-3">2. Match Keywords from the Job Description</h2>
          <p>ATS systems rank candidates by keyword relevance. Read the job posting carefully and incorporate exact keywords into your resume. If they say &quot;project management,&quot; use that exact phrase — not &quot;managing projects.&quot;</p>

          <h2 className="text-xl font-bold text-white mt-8 mb-3">3. Use a Clean, Simple Format</h2>
          <p>Avoid tables, text boxes, headers/footers, images, and graphics. ATS parsers often cannot read content inside these elements. Use a single-column layout with clear section breaks.</p>

          <h2 className="text-xl font-bold text-white mt-8 mb-3">4. Save as PDF or DOCX</h2>
          <p>Most modern ATS systems handle both PDF and DOCX well. However, always check the job posting for format requirements. When in doubt, DOCX is the safest choice for older systems.</p>

          <h2 className="text-xl font-bold text-white mt-8 mb-3">5. Include Your Contact Information at the Top</h2>
          <p>Place your name, email, phone number, and LinkedIn URL in a simple text format at the top of your resume. Do not put contact info in headers or footers — many ATS systems skip those.</p>

          <h2 className="text-xl font-bold text-white mt-8 mb-3">6. Use Standard Fonts</h2>
          <p>Stick to Arial, Calibri, Times New Roman, or other standard fonts. Unusual fonts can cause character recognition issues in some ATS systems.</p>

          <h2 className="text-xl font-bold text-white mt-8 mb-3">7. Spell Out Acronyms</h2>
          <p>The first time you use an acronym, spell it out: &quot;Search Engine Optimization (SEO).&quot; This ensures the ATS catches the keyword whether it searches for the full term or the abbreviation.</p>

          <h2 className="text-xl font-bold text-white mt-8 mb-3">8. Use Bullet Points for Achievements</h2>
          <p>Bullet points make your resume scannable for both ATS and human reviewers. Start each bullet with a strong action verb and quantify your impact wherever possible.</p>

          <h2 className="text-xl font-bold text-white mt-8 mb-3">9. Include Dates for Every Position</h2>
          <p>ATS systems use dates to calculate your experience level. Include month and year for each role in a consistent format (e.g., &quot;Jan 2020 – Dec 2022&quot;).</p>

          <h2 className="text-xl font-bold text-white mt-8 mb-3">10. Tailor Your Resume for Each Application</h2>
          <p>A generic resume scores lower in ATS screening. Customize your skills and experience descriptions to match each job posting. Our <Link to="/job-match" className="text-brand-gold hover:underline">Job Match Scorer</Link> can help you identify gaps.</p>

          <h2 className="text-xl font-bold text-white mt-8 mb-3">11. Keep It to 1-2 Pages</h2>
          <p>While ATS systems can process longer documents, hiring managers prefer concise resumes. Aim for one page for early career, two pages for senior roles.</p>

          <h2 className="text-xl font-bold text-white mt-8 mb-3">12. Add a Skills Section</h2>
          <p>A dedicated skills section helps ATS systems quickly identify your competencies. List both hard skills (Python, SQL, Adobe Photoshop) and relevant soft skills (leadership, communication).</p>

          <h2 className="text-xl font-bold text-white mt-8 mb-3">13. Use Standard Job Titles</h2>
          <p>If your actual title was creative (like &quot;Growth Ninja&quot;), add the standard equivalent in parentheses: &quot;Growth Ninja (Digital Marketing Manager).&quot; This ensures ATS keyword matching works.</p>

          <h2 className="text-xl font-bold text-white mt-8 mb-3">14. Avoid Special Characters</h2>
          <p>Stick to standard characters. Special symbols, emojis, and decorative characters can confuse ATS parsers and may appear as garbled text.</p>

          <h2 className="text-xl font-bold text-white mt-8 mb-3">15. Test Your Resume Before Applying</h2>
          <p>Use our free <Link to="/ats-checker" className="text-brand-gold hover:underline">ATS Score Checker</Link> to test your resume before submitting it. This gives you a chance to fix issues and improve your score.</p>

          <div className="mt-12 p-6 border border-brand-gold/30 rounded-xl bg-brand-gold/5">
            <h3 className="text-lg font-bold text-brand-gold mb-2">Ready to Check Your Resume?</h3>
            <p className="mb-4">Use our free ATS Resume Score Checker to see how your resume performs.</p>
            <Link to="/ats-checker" className="inline-block px-6 py-3 bg-brand-gold text-brand-dark font-bold rounded-xl hover:bg-brand-gold-hover transition-colors">
              Check My ATS Score →
            </Link>
          </div>
        </div>
      </article>
    </div>
  )
}
