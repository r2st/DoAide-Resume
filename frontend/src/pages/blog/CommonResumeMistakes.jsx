import { Link } from 'react-router-dom'

export default function CommonResumeMistakes() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <Link to="/blog" className="text-brand-gold text-sm mb-6 inline-block hover:underline">← Back to Blog</Link>

      <article>
        <h1 className="text-3xl md:text-4xl font-bold mb-4">10 Common Resume Mistakes That Get You Rejected Instantly</h1>
        <div className="text-brand-muted text-sm mb-8">Sep 28, 2025 · 6 min read</div>

        <div className="prose prose-invert max-w-none space-y-6 text-gray-300 leading-relaxed">
          <p>Your resume has about 6 seconds to make an impression — and that is after it passes the ATS filter. Here are the most common mistakes that cause instant rejection.</p>

          <h2 className="text-xl font-bold text-white mt-8 mb-3">1. Using a Generic Resume for Every Application</h2>
          <p>The biggest mistake job seekers make is sending the same resume everywhere. ATS systems rank candidates based on keyword relevance to the specific job posting. A tailored resume can score 30-50% higher than a generic one.</p>

          <h2 className="text-xl font-bold text-white mt-8 mb-3">2. Including Photos or Graphics</h2>
          <p>While a photo might seem professional, most ATS systems cannot parse images. They can also introduce unconscious bias. In North America and many other regions, leave the photo off entirely.</p>

          <h2 className="text-xl font-bold text-white mt-8 mb-3">3. Using Fancy Formatting</h2>
          <p>Multi-column layouts, text boxes, infographic elements, and creative designs look great to humans but are a nightmare for ATS parsers. The system may scramble your content or skip entire sections.</p>

          <h2 className="text-xl font-bold text-white mt-8 mb-3">4. Missing Contact Information</h2>
          <p>It sounds obvious, but many resumes lack a phone number, have a typo in the email, or use an unprofessional email address. Double-check every piece of contact information.</p>

          <h2 className="text-xl font-bold text-white mt-8 mb-3">5. Writing Duties Instead of Achievements</h2>
          <p>&quot;Responsible for managing a team&quot; tells the reader nothing about your impact. Instead, write &quot;Led a team of 8 engineers, delivering 3 major product launches that increased revenue by 40%.&quot; Quantify everything you can.</p>

          <h2 className="text-xl font-bold text-white mt-8 mb-3">6. Typos and Grammar Errors</h2>
          <p>A single typo can disqualify you. It signals carelessness. Read your resume backward, use spell-check, and have someone else review it before submitting.</p>

          <h2 className="text-xl font-bold text-white mt-8 mb-3">7. Making It Too Long</h2>
          <p>Unless you have 15+ years of relevant experience, keep it to one page. Hiring managers spend an average of 6-7 seconds on initial resume screening. Respect their time.</p>

          <h2 className="text-xl font-bold text-white mt-8 mb-3">8. Using an Objective Statement</h2>
          <p>Objective statements are outdated. Replace them with a professional summary that highlights your key qualifications and what you bring to the role. Focus on value, not what you want.</p>

          <h2 className="text-xl font-bold text-white mt-8 mb-3">9. Listing Irrelevant Experience</h2>
          <p>Your summer job at a coffee shop does not belong on a senior engineering resume. Every line on your resume should be relevant to the position you are applying for.</p>

          <h2 className="text-xl font-bold text-white mt-8 mb-3">10. Not Including a Skills Section</h2>
          <p>ATS systems scan for specific keywords, and a skills section is the fastest way to ensure they are found. List technical skills, tools, certifications, and relevant competencies.</p>

          <div className="mt-12 p-6 border border-brand-gold/30 rounded-xl bg-brand-gold/5">
            <h3 className="text-lg font-bold text-brand-gold mb-2">Find Mistakes in Your Resume</h3>
            <p className="mb-4">Our free ATS checker identifies these mistakes and more — try it now.</p>
            <Link to="/ats-checker" className="inline-block px-6 py-3 bg-brand-gold text-brand-dark font-bold rounded-xl hover:bg-brand-gold-hover transition-colors">
              Check My Resume →
            </Link>
          </div>
        </div>
      </article>
    </div>
  )
}
