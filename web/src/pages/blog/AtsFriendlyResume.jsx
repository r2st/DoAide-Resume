import { useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function AtsFriendlyResume() {
  useEffect(() => {
    document.title = 'ATS-Friendly Resume: How to Beat Applicant Tracking Systems | DoAide Resume';
    const meta = document.querySelector('meta[name="description"]');
    if (meta) meta.content = 'Learn how to create an ATS-friendly resume that passes automated screening. Formatting rules, keyword strategies, and free ATS checker for Indian job seekers.';

    const blogSchema = document.createElement('script');
    blogSchema.type = 'application/ld+json';
    blogSchema.textContent = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      "headline": "ATS-Friendly Resume: How to Beat Applicant Tracking Systems",
      "description": "Complete guide to creating an ATS-friendly resume. Learn formatting rules, keyword optimization, and section-by-section strategies to pass automated screening systems used by Indian companies.",
      "url": "https://resume.doaide.com/blog/ats-friendly-resume",
      "datePublished": "2026-10-10",
      "dateModified": "2026-10-10",
      "author": { "@type": "Organization", "name": "DoAide", "url": "https://doaide.com" },
      "publisher": { "@type": "Organization", "name": "DoAide", "url": "https://doaide.com", "logo": { "@type": "ImageObject", "url": "https://doaide.com/logo.png" } },
      "mainEntityOfPage": { "@type": "WebPage", "@id": "https://resume.doaide.com/blog/ats-friendly-resume" },
      "wordCount": 1050,
      "inLanguage": "en"
    });
    document.head.appendChild(blogSchema);

    const faqSchema = document.createElement('script');
    faqSchema.type = 'application/ld+json';
    faqSchema.textContent = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "What does ATS-friendly mean?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "An ATS-friendly resume is formatted so that Applicant Tracking Systems can accurately parse and extract your information. This means using standard section headings, simple formatting, no images or tables, and keywords that match the job description."
          }
        },
        {
          "@type": "Question",
          "name": "Which file format is best for ATS?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "PDF is the safest choice for modern ATS systems. Most systems in 2026, including Workday, Greenhouse, and Lever, parse PDFs accurately. Only use DOCX if the job posting specifically requests it. Never submit image-based PDFs or scanned documents."
          }
        },
        {
          "@type": "Question",
          "name": "Can I use a creative resume template and still pass ATS?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Most creative templates with multi-column layouts, graphics, icons, and skill bars fail ATS parsing. Use a clean, single-column template for online applications. Save creative designs for networking events or direct emails where you know a human will read it first."
          }
        },
        {
          "@type": "Question",
          "name": "How do I find the right keywords for my resume?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Read the job description carefully and identify required skills, tools, certifications, and industry terms that appear repeatedly. Include both the full form and abbreviation (e.g., 'Search Engine Optimization (SEO)'). Use an ATS checker to verify your keyword coverage before applying."
          }
        },
        {
          "@type": "Question",
          "name": "Do Indian companies use ATS?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes. Over 90% of large Indian companies including Infosys, TCS, Wipro, HCL, Reliance, and the Big 4 use ATS. Startups commonly use Greenhouse or Lever. Job portals like Naukri and LinkedIn India also apply their own screening algorithms."
          }
        }
      ]
    });
    document.head.appendChild(faqSchema);

    return () => {
      document.head.removeChild(blogSchema);
      document.head.removeChild(faqSchema);
    };
  }, []);

  const h2 = { fontSize: '1.5rem', fontWeight: '700', color: '#F0B429', marginTop: '2.5rem', marginBottom: '0.75rem' };
  const h3 = { fontSize: '1.15rem', fontWeight: '600', color: '#E5E7EB', marginTop: '1.5rem', marginBottom: '0.5rem' };
  const p = { color: '#9CA3AF', lineHeight: '1.75', marginBottom: '1rem', fontSize: '0.95rem' };
  const li = { color: '#9CA3AF', lineHeight: '1.75', marginBottom: '0.5rem', fontSize: '0.95rem', paddingLeft: '0.5rem' };

  return (
    <div>
      <section style={{ background: 'linear-gradient(135deg, #059669, #0D9488)' }} className="text-white">
        <div className="max-w-3xl mx-auto px-4 py-14 sm:py-20 text-center">
          <div className="inline-block bg-white/20 text-white text-sm font-medium px-4 py-1.5 rounded-full mb-4">
            ATS Mastery
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold leading-tight mb-4">
            ATS-Friendly Resume: How to Beat Applicant Tracking Systems
          </h1>
          <p className="text-lg text-emerald-100 max-w-2xl mx-auto">
            Your resume is being judged by software before any human sees it. Here is exactly how to make sure it passes.
          </p>
          <div className="mt-4 text-sm text-emerald-200">October 2026 &middot; 14 min read</div>
        </div>
      </section>

      <article className="max-w-3xl mx-auto px-4 py-12" style={{ background: '#0A0A0B' }}>
        <p style={p}>
          You have the right skills, the right experience, and you apply to the perfect job. Two weeks pass with no response. You assume the company found a better candidate — but the truth is, no human ever read your resume. An Applicant Tracking System rejected it automatically because of formatting issues, missing keywords, or both.
        </p>
        <p style={p}>
          This is not a rare scenario. Research shows that up to 75% of resumes are filtered out by ATS before reaching a recruiter. In India, where companies like Infosys, TCS, and Wipro receive lakhs of applications annually, ATS is not just common — it is the default. If your resume is not ATS-friendly, you are invisible.
        </p>

        <h2 style={h2}>What Exactly Does an ATS Do?</h2>
        <p style={p}>
          An Applicant Tracking System is software that automates the hiring pipeline. When you submit a resume through Naukri, LinkedIn India, a company careers page, or even email, the ATS performs three critical functions:
        </p>
        <ul style={{ listStyle: 'decimal', paddingLeft: '1.5rem', marginBottom: '1rem' }}>
          <li style={li}><strong style={{ color: '#E5E7EB' }}>Parsing:</strong> The system extracts data from your resume — name, contact details, work history, education, skills — and converts it into a structured database record.</li>
          <li style={li}><strong style={{ color: '#E5E7EB' }}>Scoring:</strong> It compares your parsed data against the job requirements, assigning a relevance score based on keyword matches, experience level, and qualifications.</li>
          <li style={li}><strong style={{ color: '#E5E7EB' }}>Ranking:</strong> Candidates are ranked by score. Only the top 10-25% are forwarded to human recruiters for review.</li>
        </ul>
        <p style={p}>
          If the ATS cannot parse your resume correctly, your score drops to zero regardless of your actual qualifications. This is why formatting matters as much as content.
        </p>

        <h2 style={h2}>The ATS-Friendly Resume: Step-by-Step</h2>

        <h3 style={h3}>Step 1: Choose the Right File Format</h3>
        <p style={p}>
          Save your resume as a PDF. Modern ATS systems — Workday, Greenhouse, Lever, iCIMS — parse PDFs accurately. The only exception is when the job posting explicitly asks for a DOCX file. Never submit image-based PDFs (scanned copies), Google Docs links, or JPG files. These are either unreadable or get deprioritised.
        </p>

        <h3 style={h3}>Step 2: Use a Single-Column Layout</h3>
        <p style={p}>
          Multi-column layouts are the number one ATS killer. When a resume uses two or three columns, the parser reads content in the wrong order — mixing skills with job titles, shuffling dates, and producing garbled output. Stick to a clean, single-column layout. All our <Link to="/templates" style={{ color: '#F0B429' }}>resume templates</Link> are designed with this in mind.
        </p>

        <h3 style={h3}>Step 3: Use Standard Section Headings</h3>
        <p style={p}>
          ATS systems look for specific section headings to categorise your content. Use these standard labels:
        </p>
        <ul style={{ listStyle: 'disc', paddingLeft: '1.5rem', marginBottom: '1rem' }}>
          <li style={li}>"Professional Summary" or "Summary" (not "About Me" or "Who I Am")</li>
          <li style={li}>"Work Experience" or "Professional Experience" (not "My Career Journey")</li>
          <li style={li}>"Education" (not "Academic Background")</li>
          <li style={li}>"Skills" or "Technical Skills" (not "What I Know")</li>
          <li style={li}>"Certifications" (not "Credentials" or "Badges")</li>
        </ul>

        <h3 style={h3}>Step 4: Pick ATS-Safe Fonts and Formatting</h3>
        <p style={p}>
          Use standard fonts: Arial, Calibri, Helvetica, or Times New Roman at 10-12pt. Avoid decorative, script, or custom fonts — the ATS may not recognise characters correctly. Use bold and italic sparingly for emphasis. Do not use underlines for anything except hyperlinks, as underlines can confuse parsers.
        </p>

        <h3 style={h3}>Step 5: Remove Images, Tables, and Graphics</h3>
        <p style={p}>
          ATS systems cannot interpret visual elements. This means removing:
        </p>
        <ul style={{ listStyle: 'disc', paddingLeft: '1.5rem', marginBottom: '1rem' }}>
          <li style={li}>Photographs and headshots</li>
          <li style={li}>Company logos</li>
          <li style={li}>Skill bars and proficiency meters (that "85% in Python" bar is invisible to ATS)</li>
          <li style={li}>Icons and emojis</li>
          <li style={li}>Tables (even simple ones — use plain text formatting instead)</li>
          <li style={li}>Text boxes and shapes</li>
          <li style={li}>Content placed in headers or footers (many ATS skip these entirely)</li>
        </ul>

        <h2 style={h2}>Mastering ATS Keyword Strategy</h2>
        <p style={p}>
          Keywords are the single most important factor in your ATS score. Here is a systematic approach to finding and using them:
        </p>

        <h3 style={h3}>Extract Keywords from the Job Description</h3>
        <p style={p}>
          Read the job posting line by line. Identify: required technical skills, tools and platforms, certifications mentioned, industry terminology, and soft skills the company values. Pay special attention to words that appear more than once — repetition indicates high priority.
        </p>

        <h3 style={h3}>Include Both Long-Form and Abbreviations</h3>
        <p style={p}>
          Write "Search Engine Optimization (SEO)" on first mention, then use "SEO" subsequently. This covers both search patterns. Apply the same technique to "Artificial Intelligence (AI)", "Customer Relationship Management (CRM)", "Machine Learning (ML)", and "Application Programming Interface (API)."
        </p>

        <h3 style={h3}>Integrate Keywords Naturally</h3>
        <p style={p}>
          Do not dump keywords into a hidden section or stuff them randomly. Weave them into your experience bullets:
        </p>
        <ul style={{ listStyle: 'disc', paddingLeft: '1.5rem', marginBottom: '1rem' }}>
          <li style={li}><strong style={{ color: '#E5E7EB' }}>Poor:</strong> "Skills: Python, Machine Learning, Data Analysis, SQL, TensorFlow"</li>
          <li style={li}><strong style={{ color: '#E5E7EB' }}>Good:</strong> "Built a Machine Learning pipeline using Python and TensorFlow that automated Data Analysis for 50,000+ customer records, reducing processing time by 65%. Wrote SQL queries for ETL workflows."</li>
        </ul>

        <h3 style={h3}>Verify Your Keywords</h3>
        <p style={p}>
          Use the <Link to="/ats-checker" style={{ color: '#F0B429' }}>free ATS Score Checker</Link> to see exactly which keywords match the job description and which are missing. It gives you an actionable report with specific suggestions for improvement.
        </p>

        <h2 style={h2}>Section-by-Section ATS Optimization</h2>

        <h3 style={h3}>Contact Information</h3>
        <p style={p}>
          Place your name, email, phone, city, and LinkedIn URL in the main body of the resume — never in a header or footer. Many ATS systems ignore header and footer content entirely, meaning your contact information disappears.
        </p>

        <h3 style={h3}>Professional Summary</h3>
        <p style={p}>
          Front-load this section with your target job title and 2-3 primary keywords. "Senior Java Developer with 6 years of experience in microservices architecture, Spring Boot, and AWS cloud deployment" immediately signals relevance to both ATS and human readers.
        </p>

        <h3 style={h3}>Work Experience</h3>
        <p style={p}>
          Use the structure: Job Title | Company Name | Date Range. This is what every ATS expects. Each bullet point should contain at least one keyword from the job description, combined with a quantified achievement. The <Link to="/" style={{ color: '#F0B429' }}>DoAide resume builder</Link> automatically suggests improvements to your bullet points.
        </p>

        <h3 style={h3}>Skills Section</h3>
        <p style={p}>
          Create a dedicated skills section with keywords listed plainly, grouped by category. This is your keyword goldmine — include every relevant skill from the job description that you genuinely possess. Do not list skills you cannot demonstrate in an interview.
        </p>

        <h3 style={h3}>Education</h3>
        <p style={p}>
          List your degree, institution, field of study, and graduation year. For freshers, include CGPA if above 7.0. ATS systems use education data to match minimum qualification requirements — ensure your degree name matches what the job posting asks for.
        </p>

        <h2 style={h2}>Common ATS Mistakes and How to Fix Them</h2>
        <ul style={{ listStyle: 'disc', paddingLeft: '1.5rem', marginBottom: '1rem' }}>
          <li style={li}><strong style={{ color: '#E5E7EB' }}>Using fancy templates:</strong> Canva templates with sidebars, icons, and skill meters look good to humans but fail ATS parsing. Switch to a clean <Link to="/templates" style={{ color: '#F0B429' }}>ATS-optimised template</Link>.</li>
          <li style={li}><strong style={{ color: '#E5E7EB' }}>Keyword stuffing with white text:</strong> Some candidates hide keywords in white-coloured text. Modern ATS systems detect this and flag your application for rejection. Never do this.</li>
          <li style={li}><strong style={{ color: '#E5E7EB' }}>Sending the same resume to every job:</strong> Each job description has unique keyword requirements. Customise your resume for every application. It takes 15 minutes and doubles your callback rate.</li>
          <li style={li}><strong style={{ color: '#E5E7EB' }}>Using non-standard date formats:</strong> Stick to "Jan 2024 - Present" or "2024 - Present". Avoid formats like "1/2024" or "January 2024 to current" that some parsers misinterpret.</li>
          <li style={li}><strong style={{ color: '#E5E7EB' }}>Forgetting the cover letter:</strong> Many ATS systems accept and parse cover letters alongside resumes. A well-written <Link to="/cover-letter-generator" style={{ color: '#F0B429' }}>cover letter</Link> adds more keyword matches and shows genuine interest.</li>
        </ul>

        <h2 style={h2}>How to Test Your Resume's ATS Score</h2>
        <p style={p}>
          Before submitting any application, follow this testing process:
        </p>
        <ul style={{ listStyle: 'decimal', paddingLeft: '1.5rem', marginBottom: '1rem' }}>
          <li style={li}>Paste your resume text and the job description into the <Link to="/ats-checker" style={{ color: '#F0B429' }}>ATS Score Checker</Link>.</li>
          <li style={li}>Review the keyword match report — aim for 70% or higher coverage.</li>
          <li style={li}>Check the section analysis to ensure all sections are detected correctly.</li>
          <li style={li}>Copy your resume into a plain text editor (Notepad or TextEdit). If the content appears garbled, jumbled, or in the wrong order, ATS will struggle too.</li>
          <li style={li}>Make the recommended changes and re-test until your score is strong.</li>
        </ul>

        <h2 style={h2}>ATS-Friendly Resume Checklist</h2>
        <ul style={{ listStyle: 'none', paddingLeft: '0', marginBottom: '1rem' }}>
          {[
            'Single-column layout with no tables or text boxes',
            'Standard section headings (Summary, Experience, Education, Skills)',
            'Standard fonts (Arial, Calibri, Helvetica) at 10-12pt',
            'No images, logos, icons, or skill bars',
            'Contact info in the body, not header/footer',
            'Keywords from the job description used naturally throughout',
            'Both abbreviations and full forms included',
            'Date format is consistent (e.g., Jan 2024 - Present)',
            'Saved as PDF with professional filename',
            'ATS score above 70% verified with checker tool',
          ].map((item, i) => (
            <li key={i} style={{ ...li, display: 'flex', alignItems: 'flex-start', gap: '0.5rem', paddingLeft: 0 }}>
              <span style={{ color: '#F0B429', fontWeight: 'bold' }}>&#10003;</span> {item}
            </li>
          ))}
        </ul>

        <div className="mt-12 p-6 rounded-xl text-center" style={{ background: '#1A1A1D', border: '1px solid #2A2A2D' }}>
          <h3 className="text-xl font-bold mb-2" style={{ color: '#E5E7EB' }}>Check your resume's ATS score now</h3>
          <p className="text-sm mb-4" style={{ color: '#9CA3AF' }}>Paste your resume and job description to get an AI-powered ATS compatibility analysis — keyword matching, formatting checks, and improvement suggestions. 100% free.</p>
          <Link to="/ats-checker" className="inline-flex items-center gap-2 px-6 py-3 font-semibold rounded-xl transition no-underline" style={{ background: '#F0B429', color: '#0A0A0B' }}>
            Check ATS Score Free
          </Link>
        </div>

        <div className="mt-8 flex flex-wrap gap-4 text-sm" style={{ color: '#6B7280' }}>
          <span>Related:</span>
          <Link to="/blog/resume-building-2026" className="no-underline" style={{ color: '#F0B429' }}>Resume Building Guide 2026</Link>
          <Link to="/blog/resume-format-freshers-2026" className="no-underline" style={{ color: '#F0B429' }}>Fresher Resume Format Guide</Link>
          <Link to="/" className="no-underline" style={{ color: '#F0B429' }}>Free Resume Builder</Link>
          <Link to="/cover-letter-generator" className="no-underline" style={{ color: '#F0B429' }}>Cover Letter Generator</Link>
        </div>
      </article>
    </div>
  );
}
