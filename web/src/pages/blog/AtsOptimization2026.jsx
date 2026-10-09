import { useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function AtsOptimization2026() {
  useEffect(() => {
    document.title = 'ATS Optimization: Beat Applicant Tracking Systems in 2026 | DoAide Resume';
    const meta = document.querySelector('meta[name="description"]');
    if (meta) meta.content = 'Learn how to beat ATS in 2026. Keyword strategy, formatting rules, section optimization, and common myths debunked. Free ATS checker included.';
  }, []);

  const h2 = { fontSize: '1.5rem', fontWeight: '700', color: '#F0B429', marginTop: '2.5rem', marginBottom: '0.75rem' };
  const h3 = { fontSize: '1.15rem', fontWeight: '600', color: '#E5E7EB', marginTop: '1.5rem', marginBottom: '0.5rem' };
  const p = { color: '#9CA3AF', lineHeight: '1.75', marginBottom: '1rem', fontSize: '0.95rem' };
  const li = { color: '#9CA3AF', lineHeight: '1.75', marginBottom: '0.5rem', fontSize: '0.95rem', paddingLeft: '0.5rem' };

  return (
    <div>
      <section style={{ background: 'linear-gradient(135deg, #F59E0B, #DC2626)' }} className="text-white">
        <div className="max-w-3xl mx-auto px-4 py-14 sm:py-20 text-center">
          <div className="inline-block bg-white/20 text-white text-sm font-medium px-4 py-1.5 rounded-full mb-4">
            ATS Deep Dive
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold leading-tight mb-4">
            ATS Optimization: How to Beat Applicant Tracking Systems in 2026
          </h1>
          <p className="text-lg text-amber-100 max-w-2xl mx-auto">
            Why 75% of resumes get rejected before a human sees them — and exactly how to make sure yours is not one of them.
          </p>
          <div className="mt-4 text-sm text-amber-200">October 2026 &middot; 12 min read</div>
        </div>
      </section>

      <article className="max-w-3xl mx-auto px-4 py-12" style={{ background: '#0A0A0B' }}>
        <p style={p}>
          You spent hours perfecting your resume. You tailored it for the role, triple-checked for typos, and hit "Apply" with confidence. Two weeks later — silence. No rejection email, no interview call, nothing. What happened?
        </p>
        <p style={p}>
          In most cases, a human never saw your resume. An Applicant Tracking System (ATS) scanned it, could not parse your formatting or find the right keywords, and automatically moved you to the rejection pile. In India's competitive job market, understanding ATS is not optional — it is essential.
        </p>

        <h2 style={h2}>What is an ATS?</h2>
        <p style={p}>
          An Applicant Tracking System is software that companies use to collect, sort, scan, and rank job applications. Think of it as a digital gatekeeper. When you apply through Naukri, LinkedIn India, a company careers page, or even email, your resume typically passes through an ATS before reaching a recruiter.
        </p>
        <p style={p}>
          The ATS parses your resume into structured data — extracting your name, contact details, work history, education, and skills. It then scores your application based on how well it matches the job description's requirements. Only the top-scoring candidates get forwarded to human reviewers.
        </p>

        <h2 style={h2}>Why 75% of Resumes Get Rejected</h2>
        <p style={p}>
          Studies consistently show that up to 75% of resumes are rejected by ATS before a recruiter ever sees them. Here is why:
        </p>
        <ul style={{ listStyle: 'disc', paddingLeft: '1.5rem', marginBottom: '1rem' }}>
          <li style={li}><strong style={{ color: '#E5E7EB' }}>Poor formatting:</strong> Tables, text boxes, columns, headers/footers, and graphics confuse ATS parsers. The system cannot extract your data correctly.</li>
          <li style={li}><strong style={{ color: '#E5E7EB' }}>Missing keywords:</strong> If the job posting says "Machine Learning" and your resume says "ML", some ATS systems will not make the connection.</li>
          <li style={li}><strong style={{ color: '#E5E7EB' }}>Non-standard section headings:</strong> Using "My Professional Journey" instead of "Work Experience" means the ATS cannot categorize your content.</li>
          <li style={li}><strong style={{ color: '#E5E7EB' }}>Wrong file format:</strong> Some ATS systems struggle with certain PDF types. An image-based PDF (scanned document) is completely unreadable.</li>
          <li style={li}><strong style={{ color: '#E5E7EB' }}>Lack of relevant content:</strong> Even with perfect formatting, if your resume does not contain the skills and experience the role requires, the ATS will score you low.</li>
        </ul>

        <h2 style={h2}>Top ATS Systems Used in India</h2>
        <p style={p}>
          Understanding which ATS your target companies use can help you optimize better:
        </p>
        <ul style={{ listStyle: 'disc', paddingLeft: '1.5rem', marginBottom: '1rem' }}>
          <li style={li}><strong style={{ color: '#E5E7EB' }}>Workday</strong> — Used by Deloitte, Infosys, and many MNCs. Strict formatting requirements.</li>
          <li style={li}><strong style={{ color: '#E5E7EB' }}>Taleo (Oracle)</strong> — Common in large Indian enterprises and government PSUs. Keyword-heavy matching.</li>
          <li style={li}><strong style={{ color: '#E5E7EB' }}>Greenhouse</strong> — Popular with Indian startups and tech companies. More modern parser.</li>
          <li style={li}><strong style={{ color: '#E5E7EB' }}>iCIMS</strong> — Used by several IT services companies. Good at parsing standard formats.</li>
          <li style={li}><strong style={{ color: '#E5E7EB' }}>Lever</strong> — Common in product companies and funded startups. Handles modern formats better.</li>
          <li style={li}><strong style={{ color: '#E5E7EB' }}>Naukri's RMS</strong> — Naukri's own system used by companies posting on the platform. Favours structured, keyword-rich resumes.</li>
        </ul>

        <h2 style={h2}>Keyword Strategy</h2>
        <p style={p}>
          Keywords are the single most important factor in ATS scoring. Here is a systematic approach:
        </p>

        <h3 style={h3}>Step 1: Extract Keywords from the Job Description</h3>
        <p style={p}>
          Read the job posting carefully and identify: required skills (both technical and soft), tools and technologies mentioned, certifications, job-specific terminology, and industry jargon. Pay special attention to words that appear multiple times — repetition signals importance.
        </p>

        <h3 style={h3}>Step 2: Match Keywords Naturally</h3>
        <p style={p}>
          Do not stuff keywords randomly. Weave them into your experience bullets, skills section, and summary. If the job requires "Agile methodology", include it where you have actually used it: "Led sprint planning and retrospectives using Agile methodology, delivering features 20% faster."
        </p>

        <h3 style={h3}>Step 3: Use Both Long-Form and Abbreviations</h3>
        <p style={p}>
          Write "Search Engine Optimization (SEO)" the first time, then use "SEO" subsequently. This covers both search patterns. Same applies to "Artificial Intelligence (AI)", "Customer Relationship Management (CRM)", and similar terms.
        </p>

        <h3 style={h3}>Step 4: Verify with an ATS Checker</h3>
        <p style={p}>
          Use our free <Link to="/ats-checker" style={{ color: '#F0B429' }}>ATS Score Checker</Link> to see exactly which keywords match and which are missing. It gives you an actionable report with AI-powered suggestions.
        </p>

        <h2 style={h2}>Formatting Rules for ATS</h2>
        <p style={p}>
          Follow these formatting rules to ensure maximum ATS compatibility:
        </p>
        <ul style={{ listStyle: 'disc', paddingLeft: '1.5rem', marginBottom: '1rem' }}>
          <li style={li}><strong style={{ color: '#E5E7EB' }}>Single-column layout:</strong> Multi-column resumes confuse most ATS parsers. Stick to a single column for the main content.</li>
          <li style={li}><strong style={{ color: '#E5E7EB' }}>Standard fonts:</strong> Use Arial, Calibri, Helvetica, or Times New Roman. Decorative fonts may not render correctly.</li>
          <li style={li}><strong style={{ color: '#E5E7EB' }}>No images or graphics:</strong> ATS cannot read logos, icons, skill bars, or infographics. That "85% proficiency in Python" bar chart is invisible to ATS.</li>
          <li style={li}><strong style={{ color: '#E5E7EB' }}>Standard section headings:</strong> Use "Work Experience" or "Professional Experience", "Education", "Skills", "Certifications". Not creative alternatives.</li>
          <li style={li}><strong style={{ color: '#E5E7EB' }}>Consistent date format:</strong> Use "Jan 2023 – Present" or "2023 – Present". Be consistent throughout.</li>
          <li style={li}><strong style={{ color: '#E5E7EB' }}>Bullet points:</strong> Use simple bullets (•) not custom symbols, arrows, or emojis.</li>
          <li style={li}><strong style={{ color: '#E5E7EB' }}>File format:</strong> PDF is safest for most systems. If the application specifically asks for DOCX, use that.</li>
        </ul>

        <h2 style={h2}>Section-by-Section Optimization</h2>

        <h3 style={h3}>Contact Section</h3>
        <p style={p}>
          Place your name, email, phone, and LinkedIn in the main body of the document — never in headers or footers. Many ATS systems skip header/footer content entirely.
        </p>

        <h3 style={h3}>Summary / Objective</h3>
        <p style={p}>
          Front-load this section with your target job title and top 2-3 relevant keywords. "Experienced Data Scientist with expertise in Machine Learning, Python, and SQL" immediately tells the ATS you are relevant.
        </p>

        <h3 style={h3}>Experience</h3>
        <p style={p}>
          Use the format: Job Title | Company Name | Date Range. This is the structure most ATS systems expect. Each bullet should contain at least one keyword from the job description.
        </p>

        <h3 style={h3}>Skills</h3>
        <p style={p}>
          Create a dedicated skills section with keywords listed plainly. Group by category if you have many. This is your keyword goldmine — include every relevant skill from the job description that you genuinely possess.
        </p>

        <h2 style={h2}>Testing Your Resume</h2>
        <p style={p}>
          Before applying to any job, test your resume:
        </p>
        <ul style={{ listStyle: 'decimal', paddingLeft: '1.5rem', marginBottom: '1rem' }}>
          <li style={li}>Run it through an <Link to="/ats-checker" style={{ color: '#F0B429' }}>ATS checker</Link> with the job description pasted in</li>
          <li style={li}>Copy-paste your resume into a plain text editor — if the content looks garbled or out of order, ATS will struggle too</li>
          <li style={li}>Check that all sections are properly identified and keywords match</li>
          <li style={li}>Aim for a score above 70% for the best results</li>
          <li style={li}>Revise and re-test until you achieve a strong match</li>
        </ul>

        <h2 style={h2}>Common ATS Myths Debunked</h2>
        <ul style={{ listStyle: 'disc', paddingLeft: '1.5rem', marginBottom: '1rem' }}>
          <li style={li}><strong style={{ color: '#E5E7EB' }}>Myth: "ATS rejects creative resumes"</strong> — Partially true. You can use a creative template for networking and direct emails, but use an ATS-optimized version for online applications. Our <Link to="/templates" style={{ color: '#F0B429' }}>ATS-Friendly template</Link> is designed for exactly this.</li>
          <li style={li}><strong style={{ color: '#E5E7EB' }}>Myth: "White text keyword stuffing works"</strong> — It used to. Modern ATS systems detect hidden text and flag it. Some will automatically reject your application. Do not do this.</li>
          <li style={li}><strong style={{ color: '#E5E7EB' }}>Myth: "PDF is always better than DOCX"</strong> — Not always. Some older ATS systems parse DOCX better. Check the application instructions. When in doubt, PDF is the safer choice for modern systems.</li>
          <li style={li}><strong style={{ color: '#E5E7EB' }}>Myth: "ATS only looks at keywords"</strong> — Modern ATS considers context. Listing "Python" in your skills is good, but mentioning "developed RESTful APIs using Python Flask, handling 10,000 requests per minute" is significantly more powerful.</li>
          <li style={li}><strong style={{ color: '#E5E7EB' }}>Myth: "One resume fits all"</strong> — The biggest myth. Customize your resume for each application. The effort of tailoring keywords and phrasing to each job description dramatically improves your ATS score.</li>
        </ul>

        <h2 style={h2}>Your ATS Optimization Checklist</h2>
        <ul style={{ listStyle: 'none', paddingLeft: '0', marginBottom: '1rem' }}>
          {[
            'Resume uses a single-column, ATS-friendly layout',
            'Standard section headings used throughout',
            'Keywords from the job description are included naturally',
            'Both abbreviations and full forms are present',
            'No images, graphics, or skill bars',
            'Contact info is in the body, not header/footer',
            'File saved as PDF with a clean filename',
            'ATS score is above 70%',
            'Resume tested with a plain text copy-paste check',
          ].map((item, i) => (
            <li key={i} style={{ ...li, display: 'flex', alignItems: 'flex-start', gap: '0.5rem', paddingLeft: 0 }}>
              <span style={{ color: '#F0B429', fontWeight: 'bold' }}>&#10003;</span> {item}
            </li>
          ))}
        </ul>

        <div className="mt-12 p-6 rounded-xl text-center" style={{ background: '#1A1A1D', border: '1px solid #2A2A2D' }}>
          <h3 className="text-xl font-bold mb-2" style={{ color: '#E5E7EB' }}>Check your resume's ATS score now</h3>
          <p className="text-sm mb-4" style={{ color: '#9CA3AF' }}>Paste your resume and job description to get an AI-powered ATS analysis — keyword matching, section scores, and improvement suggestions. Completely free.</p>
          <Link to="/ats-checker" className="inline-flex items-center gap-2 px-6 py-3 font-semibold rounded-xl transition no-underline" style={{ background: '#F0B429', color: '#0A0A0B' }}>
            Check ATS Score Free
          </Link>
        </div>

        <div className="mt-8 flex flex-wrap gap-4 text-sm" style={{ color: '#6B7280' }}>
          <span>Related:</span>
          <Link to="/blog/resume-building-2026" className="no-underline" style={{ color: '#F0B429' }}>Resume Building Guide 2026</Link>
          <Link to="/" className="no-underline" style={{ color: '#F0B429' }}>Free Resume Builder</Link>
          <Link to="/templates" className="no-underline" style={{ color: '#F0B429' }}>Resume Templates</Link>
          <Link to="/cover-letter-generator" className="no-underline" style={{ color: '#F0B429' }}>Cover Letter Generator</Link>
        </div>
      </article>
    </div>
  );
}
