import { useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function ResumeMistakes() {
  useEffect(() => {
    document.title = 'Top 10 Resume Mistakes That Cost You Interviews | DoAide Resume';
    const meta = document.querySelector('meta[name="description"]');
    if (meta) meta.content = 'Avoid these 10 common resume mistakes that get your application rejected. With examples, fixes, and free tools for Indian job seekers in 2026.';

    const blogSchema = document.createElement('script');
    blogSchema.type = 'application/ld+json';
    blogSchema.textContent = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      "headline": "Top 10 Resume Mistakes That Cost You Interviews",
      "description": "The 10 most common resume mistakes Indian job seekers make and how to fix each one. Includes examples, actionable advice, and free resume tools.",
      "url": "https://resume.doaide.com/blog/resume-mistakes",
      "datePublished": "2026-10-10",
      "dateModified": "2026-10-10",
      "author": { "@type": "Organization", "name": "DoAide", "url": "https://doaide.com" },
      "publisher": { "@type": "Organization", "name": "DoAide", "url": "https://doaide.com", "logo": { "@type": "ImageObject", "url": "https://doaide.com/logo.png" } },
      "mainEntityOfPage": { "@type": "WebPage", "@id": "https://resume.doaide.com/blog/resume-mistakes" },
      "wordCount": 1100,
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
          "name": "What is the biggest resume mistake job seekers make?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "The single biggest mistake is sending the same generic resume to every job. Each application should be tailored with keywords and phrasing from the specific job description. Customising takes 15 minutes and can double your interview callback rate."
          }
        },
        {
          "@type": "Question",
          "name": "Should I include a photo on my resume in India?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "No. Unless the job posting specifically requests a photograph, leave it off. Photos take up valuable space, can trigger unconscious bias, and may cause ATS parsing errors. Focus that space on your skills and achievements instead."
          }
        },
        {
          "@type": "Question",
          "name": "How many pages should my resume be?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "One page for freshers and professionals with less than 5 years of experience. Two pages maximum for senior professionals with 5+ years. If you are a fresher with a two-page resume, you are including too much irrelevant information."
          }
        },
        {
          "@type": "Question",
          "name": "Is it a mistake to not include a cover letter?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes, especially in India where many hiring managers see it as a sign of genuine interest. A tailored cover letter adds keyword matches for ATS, demonstrates communication skills, and explains any career gaps or transitions."
          }
        },
        {
          "@type": "Question",
          "name": "Can one typo really get my resume rejected?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes. Surveys show that 77% of hiring managers will reject a resume with typos or grammatical errors. A typo signals carelessness — if you cannot get your own resume right, employers question the quality of your work."
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
  const p = { color: '#9CA3AF', lineHeight: '1.75', marginBottom: '1rem', fontSize: '0.95rem' };
  const li = { color: '#9CA3AF', lineHeight: '1.75', marginBottom: '0.5rem', fontSize: '0.95rem', paddingLeft: '0.5rem' };

  return (
    <div>
      <section style={{ background: 'linear-gradient(135deg, #DC2626, #9333EA)' }} className="text-white">
        <div className="max-w-3xl mx-auto px-4 py-14 sm:py-20 text-center">
          <div className="inline-block bg-white/20 text-white text-sm font-medium px-4 py-1.5 rounded-full mb-4">
            Career Advice
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold leading-tight mb-4">
            Top 10 Resume Mistakes That Cost You Interviews
          </h1>
          <p className="text-lg text-red-100 max-w-2xl mx-auto">
            Your resume might be sabotaging your job search without you knowing it. Here are the 10 mistakes to fix today.
          </p>
          <div className="mt-4 text-sm text-red-200">October 2026 &middot; 11 min read</div>
        </div>
      </section>

      <article className="max-w-3xl mx-auto px-4 py-12" style={{ background: '#0A0A0B' }}>
        <p style={p}>
          You have applied to 50 jobs in the past month. You have the right qualifications. Your skills match the job descriptions. Yet your inbox remains empty — no interview calls, no rejection emails, nothing. Before you blame the job market, take a hard look at your resume.
        </p>
        <p style={p}>
          After analysing thousands of resumes from Indian job seekers, we have identified the 10 most common mistakes that get applications rejected. Some are obvious, others are subtle, but each one can cost you the interview you deserve. Here is what to fix and exactly how to fix it.
        </p>

        <h2 style={h2}>1. Using a Generic One-Size-Fits-All Resume</h2>
        <p style={p}>
          This is the single most damaging mistake you can make. Sending the same resume to every job opening means your keywords never match the specific job description. ATS systems score your resume based on keyword relevance — a generic resume will score low on almost every application.
        </p>
        <p style={p}>
          <strong style={{ color: '#E5E7EB' }}>The fix:</strong> Customise your resume for each application. Read the job description carefully, identify the key skills and qualifications mentioned, and mirror that language in your resume. This does not mean rewriting from scratch — adjust your summary, reorder your skills, and tweak your bullet points. It takes 15 minutes and can double your callback rate. Use the <Link to="/ats-checker" style={{ color: '#F0B429' }}>ATS Score Checker</Link> to verify keyword coverage before applying.
        </p>

        <h2 style={h2}>2. Listing Duties Instead of Achievements</h2>
        <p style={p}>
          "Responsible for managing a team" tells the recruiter nothing about how well you did the job. It describes a duty, not an achievement. Every candidate who held a similar role had the same duties — what separates you is the results you delivered.
        </p>
        <ul style={{ listStyle: 'disc', paddingLeft: '1.5rem', marginBottom: '1rem' }}>
          <li style={li}><strong style={{ color: '#E5E7EB' }}>Weak:</strong> "Responsible for handling customer complaints"</li>
          <li style={li}><strong style={{ color: '#E5E7EB' }}>Strong:</strong> "Resolved 150+ customer complaints monthly, improving customer satisfaction score from 72% to 94% in 6 months"</li>
        </ul>
        <p style={p}>
          <strong style={{ color: '#E5E7EB' }}>The fix:</strong> For every bullet point, use the formula: <strong style={{ color: '#E5E7EB' }}>Action Verb + Task + Quantified Result</strong>. If you cannot quantify a result, describe the scope or impact instead. Our <Link to="/" style={{ color: '#F0B429' }}>AI resume builder</Link> automatically suggests stronger versions of your bullet points.
        </p>

        <h2 style={h2}>3. Ignoring ATS Optimization</h2>
        <p style={p}>
          Over 90% of large Indian companies use Applicant Tracking Systems to screen resumes. If your resume uses fancy formatting, non-standard section headings, or misses critical keywords, it will be rejected before a human ever sees it. You could be the perfect candidate and still get filtered out.
        </p>
        <p style={p}>
          <strong style={{ color: '#E5E7EB' }}>The fix:</strong> Use a single-column layout, standard section headings (Experience, Education, Skills), and keywords from the job description. Test your resume with the <Link to="/ats-checker" style={{ color: '#F0B429' }}>free ATS checker</Link> and aim for a score above 70%. Read our complete <Link to="/blog/ats-friendly-resume" style={{ color: '#F0B429' }}>ATS-friendly resume guide</Link> for detailed strategies.
        </p>

        <h2 style={h2}>4. Poor Formatting and Design Choices</h2>
        <p style={p}>
          Fancy templates from Canva with multiple columns, skill bars, icons, and decorative elements look impressive on screen — but they are resume killers. ATS systems cannot parse multi-column layouts, read images, or interpret progress bars. Even for human readers, overly designed resumes are harder to scan quickly.
        </p>
        <p style={p}>
          <strong style={{ color: '#E5E7EB' }}>The fix:</strong> Use a clean, professional, single-column template. Standard fonts (Arial, Calibri) at 10-12pt. No images, tables, or graphics. Our <Link to="/templates" style={{ color: '#F0B429' }}>ATS-friendly templates</Link> give you a professional look without sacrificing parsability.
        </p>

        <h2 style={h2}>5. Including Irrelevant Personal Information</h2>
        <p style={p}>
          Indian resumes frequently include date of birth, father's name, marital status, nationality, passport number, and a photograph. None of this information helps your candidacy. Worse, it takes up valuable space that could showcase your skills and achievements, and some of it can trigger unconscious bias.
        </p>
        <p style={p}>
          <strong style={{ color: '#E5E7EB' }}>The fix:</strong> Include only: full name, professional email, phone number, city, and LinkedIn profile URL. That is it. Remove everything else. Skip the "Personal Details" section entirely — it is a relic from an older era of Indian resume writing.
        </p>

        <h2 style={h2}>6. Typos and Grammatical Errors</h2>
        <p style={p}>
          According to hiring surveys, 77% of recruiters will immediately reject a resume with spelling or grammar mistakes. A typo in your resume signals carelessness — if you cannot proofread your own career document, employers question the quality of your professional work. Common offenders: "managment" instead of "management", "proficient in Exel", and inconsistent tense usage.
        </p>
        <p style={p}>
          <strong style={{ color: '#E5E7EB' }}>The fix:</strong> Proofread your resume at least twice. Read it aloud — your ear catches errors your eyes miss. Use a spell-checker, then ask a friend or family member to review it. Pay special attention to company names and technical terms.
        </p>

        <h2 style={h2}>7. Writing a Weak or Missing Professional Summary</h2>
        <p style={p}>
          Your professional summary (or career objective for freshers) is the first thing a recruiter reads. If it is generic — "Seeking a challenging position in a reputed organisation where I can utilise my skills" — you have already lost their interest. This statement says nothing about who you are, what you have done, or what you bring to the role.
        </p>
        <p style={p}>
          <strong style={{ color: '#E5E7EB' }}>The fix:</strong> Write a specific, targeted summary in 2-3 sentences. Include your years of experience, primary domain, 2-3 key skills, and your most impressive achievement. For freshers: mention your degree, specialisation, relevant projects, and target role.
        </p>
        <ul style={{ listStyle: 'disc', paddingLeft: '1.5rem', marginBottom: '1rem' }}>
          <li style={li}><strong style={{ color: '#E5E7EB' }}>Weak:</strong> "Hardworking professional seeking growth opportunities."</li>
          <li style={li}><strong style={{ color: '#E5E7EB' }}>Strong:</strong> "Full-stack developer with 3 years of experience building React and Node.js applications. Led the migration of a legacy monolith to microservices at Razorpay, reducing API latency by 45%. Seeking a senior engineering role at a product company."</li>
        </ul>

        <h2 style={h2}>8. Not Quantifying Achievements</h2>
        <p style={p}>
          Numbers are the most powerful tool on your resume. "Increased sales" is vague and forgettable. "Increased quarterly sales by Rs 45 lakhs (32% growth) through targeted WhatsApp marketing campaigns" is specific, credible, and memorable. Recruiters remember numbers.
        </p>
        <p style={p}>
          <strong style={{ color: '#E5E7EB' }}>The fix:</strong> For every achievement, try to include at least one number — revenue generated, percentage improvement, time saved, team size managed, customer count, project budget, or users served. If exact numbers are confidential, use approximations: "reduced costs by approximately 25%" is far better than "reduced costs."
        </p>

        <h2 style={h2}>9. Making the Resume Too Long or Too Short</h2>
        <p style={p}>
          A fresher with a three-page resume is including too much irrelevant information (10th class marks, hobbies, family details). An experienced professional with 10 years of work squeezed into half a page is not doing justice to their career. Both extremes hurt you.
        </p>
        <p style={p}>
          <strong style={{ color: '#E5E7EB' }}>The fix:</strong> Follow these length guidelines:
        </p>
        <ul style={{ listStyle: 'disc', paddingLeft: '1.5rem', marginBottom: '1rem' }}>
          <li style={li}><strong style={{ color: '#E5E7EB' }}>Freshers and 0-5 years experience:</strong> Strictly 1 page</li>
          <li style={li}><strong style={{ color: '#E5E7EB' }}>5-15 years experience:</strong> 1-2 pages</li>
          <li style={li}><strong style={{ color: '#E5E7EB' }}>15+ years or executive level:</strong> 2 pages maximum (3 only for academic CVs)</li>
        </ul>
        <p style={p}>
          If your resume is too long, cut the weakest content first: old certifications, irrelevant coursework, generic soft skills, and outdated technologies. Read our <Link to="/blog/resume-format-freshers-2026" style={{ color: '#F0B429' }}>fresher resume format guide</Link> for specific advice on page length.
        </p>

        <h2 style={h2}>10. Not Including a Cover Letter</h2>
        <p style={p}>
          Many Indian job seekers skip the cover letter entirely, assuming nobody reads them. This is a mistake. A tailored cover letter adds additional keyword matches for ATS, demonstrates genuine interest in the specific company, explains career gaps or transitions, and gives you space to show personality and enthusiasm that a resume cannot convey.
        </p>
        <p style={p}>
          <strong style={{ color: '#E5E7EB' }}>The fix:</strong> Write a cover letter for every application that accepts one. Keep it under 400 words and tailor it to the specific role and company. Use the <Link to="/cover-letter-generator" style={{ color: '#F0B429' }}>free cover letter generator</Link> to create a professional draft in seconds, then personalise it.
        </p>

        <h2 style={h2}>Quick Fix Summary</h2>
        <ul style={{ listStyle: 'none', paddingLeft: '0', marginBottom: '1rem' }}>
          {[
            'Customise your resume for every job application',
            'Replace duty descriptions with quantified achievements',
            'Use ATS-friendly formatting (single column, standard fonts)',
            'Remove all images, tables, skill bars, and decorative elements',
            'Delete irrelevant personal information (DOB, photo, marital status)',
            'Proofread twice and have someone else review',
            'Write a specific professional summary, not a generic objective',
            'Add numbers to every achievement (Rs, %, count, time)',
            'Keep length to 1 page (freshers) or 2 pages max (experienced)',
            'Include a tailored cover letter with every application',
          ].map((item, i) => (
            <li key={i} style={{ ...li, display: 'flex', alignItems: 'flex-start', gap: '0.5rem', paddingLeft: 0 }}>
              <span style={{ color: '#F0B429', fontWeight: 'bold' }}>&#10003;</span> {item}
            </li>
          ))}
        </ul>

        <div className="mt-12 p-6 rounded-xl text-center" style={{ background: '#1A1A1D', border: '1px solid #2A2A2D' }}>
          <h3 className="text-xl font-bold mb-2" style={{ color: '#E5E7EB' }}>Fix your resume in minutes</h3>
          <p className="text-sm mb-4" style={{ color: '#9CA3AF' }}>Use our free AI-powered resume builder with 10 professional templates, ATS optimization, and instant PDF download. No login, no hidden charges.</p>
          <Link to="/" className="inline-flex items-center gap-2 px-6 py-3 font-semibold rounded-xl transition no-underline" style={{ background: '#F0B429', color: '#0A0A0B' }}>
            Build Your Resume Free
          </Link>
        </div>

        <div className="mt-8 flex flex-wrap gap-4 text-sm" style={{ color: '#6B7280' }}>
          <span>Related:</span>
          <Link to="/blog/resume-building-2026" className="no-underline" style={{ color: '#F0B429' }}>Resume Building Guide 2026</Link>
          <Link to="/blog/ats-friendly-resume" className="no-underline" style={{ color: '#F0B429' }}>ATS-Friendly Resume Guide</Link>
          <Link to="/ats-checker" className="no-underline" style={{ color: '#F0B429' }}>Free ATS Checker</Link>
          <Link to="/interview-preparation" className="no-underline" style={{ color: '#F0B429' }}>Interview Preparation</Link>
        </div>
      </article>
    </div>
  );
}
