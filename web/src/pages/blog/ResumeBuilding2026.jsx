import { useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function ResumeBuilding2026() {
  useEffect(() => {
    document.title = 'How to Build a Resume That Gets Interviews in 2026 | DoAide Resume';
    const meta = document.querySelector('meta[name="description"]');
    if (meta) meta.content = 'Complete guide to building a resume that gets interviews in 2026. ATS optimization, formatting tips, action verbs, and AI tools for Indian job seekers.';
  }, []);

  const h2 = { fontSize: '1.5rem', fontWeight: '700', color: '#F0B429', marginTop: '2.5rem', marginBottom: '0.75rem' };
  const h3 = { fontSize: '1.15rem', fontWeight: '600', color: '#E5E7EB', marginTop: '1.5rem', marginBottom: '0.5rem' };
  const p = { color: '#9CA3AF', lineHeight: '1.75', marginBottom: '1rem', fontSize: '0.95rem' };
  const li = { color: '#9CA3AF', lineHeight: '1.75', marginBottom: '0.5rem', fontSize: '0.95rem', paddingLeft: '0.5rem' };

  return (
    <div>
      <section style={{ background: 'linear-gradient(135deg, #D97706, #B45309)' }} className="text-white">
        <div className="max-w-3xl mx-auto px-4 py-14 sm:py-20 text-center">
          <div className="inline-block bg-white/20 text-white text-sm font-medium px-4 py-1.5 rounded-full mb-4">
            Career Guide
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold leading-tight mb-4">
            How to Build a Resume That Gets Interviews in 2026
          </h1>
          <p className="text-lg text-amber-100 max-w-2xl mx-auto">
            A complete, practical guide for Indian job seekers — from formatting to AI-powered optimization.
          </p>
          <div className="mt-4 text-sm text-amber-200">October 2026 &middot; 10 min read</div>
        </div>
      </section>

      <article className="max-w-3xl mx-auto px-4 py-12" style={{ background: '#0A0A0B' }}>
        <p style={p}>
          The Indian job market in 2026 is more competitive than ever. With over 1.5 million engineering graduates entering the workforce annually and companies receiving hundreds of applications for every opening, your resume has roughly 6-7 seconds to make an impression. Whether you are a fresher from IIT, a mid-career professional switching from TCS to a startup, or an MBA graduate targeting consulting firms, the fundamentals of a strong resume remain the same — but the tools and expectations have evolved significantly.
        </p>
        <p style={p}>
          This guide walks you through everything you need to know to build a resume that not only passes automated screening systems but also convinces hiring managers to pick up the phone and call you.
        </p>

        <h2 style={h2}>The 2026 Job Market Reality</h2>
        <p style={p}>
          Here is what has changed: over 90% of large Indian companies — Infosys, Wipro, HCL, Reliance, and the Big 4 — now use Applicant Tracking Systems (ATS) to filter resumes before a human ever sees them. Platforms like Naukri, LinkedIn India, and Indeed India also apply their own ranking algorithms. If your resume is not optimized for these systems, you are invisible regardless of your qualifications.
        </p>
        <p style={p}>
          At the same time, hiring managers have become more discerning. Generic resumes with vague descriptions like "responsible for team management" no longer cut it. They want to see specific, quantified achievements that demonstrate impact.
        </p>

        <h2 style={h2}>Essential Resume Sections</h2>

        <h3 style={h3}>1. Contact Information</h3>
        <p style={p}>
          Place your full name, professional email, phone number, and city at the top. Include your LinkedIn profile URL — recruiters in India check LinkedIn for nearly every shortlisted candidate. If you have a portfolio or GitHub, add it. Skip your full address, date of birth, and photograph unless specifically requested.
        </p>

        <h3 style={h3}>2. Professional Summary</h3>
        <p style={p}>
          Write 2-3 sentences that capture who you are, your years of experience, key expertise, and what you bring to the table. This is your elevator pitch. A strong summary for a software engineer might read: "Full-stack developer with 4+ years building scalable web applications using React and Node.js. Led migration of monolithic architecture to microservices, reducing deployment time by 60%. Passionate about clean code and mentoring junior developers."
        </p>

        <h3 style={h3}>3. Work Experience</h3>
        <p style={p}>
          This is the heart of your resume. For each role, include your job title, company name, location, and dates. Then add 3-5 bullet points that follow the formula: <strong style={{ color: '#E5E7EB' }}>Action Verb + Task + Result</strong>. Always quantify when possible.
        </p>
        <ul style={{ listStyle: 'disc', paddingLeft: '1.5rem', marginBottom: '1rem' }}>
          <li style={li}>Weak: "Worked on customer projects"</li>
          <li style={li}>Strong: "Delivered 12 client projects worth Rs 2.5 Cr, achieving 98% on-time delivery rate"</li>
        </ul>

        <h3 style={h3}>4. Education</h3>
        <p style={p}>
          List your highest degree first. Include the institution name, degree, field of study, and graduation year. Freshers should include CGPA if it is above 7.0. Experienced professionals can skip the GPA — your work experience speaks louder.
        </p>

        <h3 style={h3}>5. Skills</h3>
        <p style={p}>
          Organize skills into categories: Technical Skills, Tools, Soft Skills. Use the exact terminology from job descriptions. If the posting says "Python", do not write "python programming language". ATS systems match keywords literally.
        </p>

        <h2 style={h2}>Action Verbs That Work</h2>
        <p style={p}>
          Start every bullet point with a powerful action verb. Here are the most effective ones categorized by impact:
        </p>
        <ul style={{ listStyle: 'disc', paddingLeft: '1.5rem', marginBottom: '1rem' }}>
          <li style={li}><strong style={{ color: '#E5E7EB' }}>Leadership:</strong> Led, Directed, Managed, Orchestrated, Spearheaded</li>
          <li style={li}><strong style={{ color: '#E5E7EB' }}>Achievement:</strong> Achieved, Delivered, Exceeded, Surpassed, Boosted</li>
          <li style={li}><strong style={{ color: '#E5E7EB' }}>Technical:</strong> Developed, Engineered, Architected, Implemented, Automated</li>
          <li style={li}><strong style={{ color: '#E5E7EB' }}>Efficiency:</strong> Streamlined, Optimized, Reduced, Consolidated, Accelerated</li>
          <li style={li}><strong style={{ color: '#E5E7EB' }}>Collaboration:</strong> Coordinated, Facilitated, Mentored, Partnered, Trained</li>
        </ul>

        <h2 style={h2}>Formatting Best Practices</h2>
        <p style={p}>
          Formatting can make or break your resume's chances with ATS systems. Follow these rules:
        </p>
        <ul style={{ listStyle: 'disc', paddingLeft: '1.5rem', marginBottom: '1rem' }}>
          <li style={li}>Use standard fonts: Arial, Calibri, or Times New Roman at 10-12pt</li>
          <li style={li}>Maintain consistent spacing: 1.0-1.15 line spacing works best</li>
          <li style={li}>Keep it to 1 page for freshers, 2 pages max for experienced professionals</li>
          <li style={li}>Use standard section headings: "Experience", "Education", "Skills" — not "My Journey" or "What I Know"</li>
          <li style={li}>Avoid tables, text boxes, headers/footers, and multi-column layouts for ATS submissions</li>
          <li style={li}>Save as PDF unless the posting specifically requests DOCX</li>
          <li style={li}>Use bullet points, not paragraphs, for experience descriptions</li>
        </ul>

        <h2 style={h2}>Common Mistakes to Avoid</h2>
        <ul style={{ listStyle: 'disc', paddingLeft: '1.5rem', marginBottom: '1rem' }}>
          <li style={li}><strong style={{ color: '#E5E7EB' }}>Sending the same resume everywhere</strong> — Customize for each role. Mirror the job description's keywords.</li>
          <li style={li}><strong style={{ color: '#E5E7EB' }}>Including irrelevant information</strong> — Your 10th class marks and hobbies like "listening to music" do not belong on an experienced professional's resume.</li>
          <li style={li}><strong style={{ color: '#E5E7EB' }}>Using an unprofessional email</strong> — coolboy2003@gmail.com will get your resume rejected before anyone reads it.</li>
          <li style={li}><strong style={{ color: '#E5E7EB' }}>Listing duties instead of achievements</strong> — "Responsible for testing" says nothing. "Reduced production bugs by 40% through automated testing framework" says everything.</li>
          <li style={li}><strong style={{ color: '#E5E7EB' }}>Typos and grammatical errors</strong> — Proofread twice. Have someone else review it. Use spell-check tools.</li>
          <li style={li}><strong style={{ color: '#E5E7EB' }}>Ignoring ATS optimization</strong> — A beautiful resume that gets filtered out by ATS is useless. <Link to="/ats-checker" style={{ color: '#F0B429' }}>Check your ATS score</Link> before applying.</li>
        </ul>

        <h2 style={h2}>Using AI Tools to Improve Your Resume</h2>
        <p style={p}>
          AI has transformed resume building in 2026. Here is how to use it effectively without making your resume sound robotic:
        </p>
        <ul style={{ listStyle: 'disc', paddingLeft: '1.5rem', marginBottom: '1rem' }}>
          <li style={li}><strong style={{ color: '#E5E7EB' }}>AI bullet point enhancement:</strong> Take your raw achievement and let AI rewrite it with stronger action verbs and better structure. Our <Link to="/" style={{ color: '#F0B429' }}>free resume builder</Link> does this automatically.</li>
          <li style={li}><strong style={{ color: '#E5E7EB' }}>ATS score checking:</strong> Run your resume through an <Link to="/ats-checker" style={{ color: '#F0B429' }}>ATS checker</Link> to identify missing keywords and formatting issues before you apply.</li>
          <li style={li}><strong style={{ color: '#E5E7EB' }}>Cover letter generation:</strong> Use AI to draft a <Link to="/cover-letter-generator" style={{ color: '#F0B429' }}>tailored cover letter</Link> that matches your resume to the specific job.</li>
          <li style={li}><strong style={{ color: '#E5E7EB' }}>Skills suggestions:</strong> AI can recommend relevant skills based on your target job title, ensuring you do not miss critical keywords.</li>
        </ul>
        <p style={p}>
          The key is to use AI as a starting point, then personalize. Hiring managers can spot a fully AI-generated resume — it lacks the specific details and authentic voice that make a candidate memorable.
        </p>

        <h2 style={h2}>Final Checklist</h2>
        <p style={p}>Before you hit submit on your next application, verify:</p>
        <ul style={{ listStyle: 'none', paddingLeft: '0', marginBottom: '1rem' }}>
          {[
            'Contact information is complete and professional',
            'Professional summary is tailored to the target role',
            'Every bullet point starts with an action verb',
            'Achievements are quantified with numbers',
            'Keywords from the job description are included',
            'Formatting is clean and ATS-compatible',
            'No typos or grammatical errors',
            'File is saved as PDF with a professional filename',
          ].map((item, i) => (
            <li key={i} style={{ ...li, display: 'flex', alignItems: 'flex-start', gap: '0.5rem', paddingLeft: 0 }}>
              <span style={{ color: '#F0B429', fontWeight: 'bold' }}>&#10003;</span> {item}
            </li>
          ))}
        </ul>

        <div className="mt-12 p-6 rounded-xl text-center" style={{ background: '#1A1A1D', border: '1px solid #2A2A2D' }}>
          <h3 className="text-xl font-bold mb-2" style={{ color: '#E5E7EB' }}>Ready to build your resume?</h3>
          <p className="text-sm mb-4" style={{ color: '#9CA3AF' }}>Use our free AI-powered resume builder — 10 professional templates, ATS optimization, instant PDF. No login required.</p>
          <Link to="/" className="inline-flex items-center gap-2 px-6 py-3 font-semibold rounded-xl transition no-underline" style={{ background: '#F0B429', color: '#0A0A0B' }}>
            Start Building Free
          </Link>
        </div>

        <div className="mt-8 flex flex-wrap gap-4 text-sm" style={{ color: '#6B7280' }}>
          <span>Related:</span>
          <Link to="/guides/ats-resume" className="no-underline" style={{ color: '#F0B429' }}>ATS Resume Guide</Link>
          <Link to="/ats-checker" className="no-underline" style={{ color: '#F0B429' }}>Free ATS Checker</Link>
          <Link to="/templates" className="no-underline" style={{ color: '#F0B429' }}>Resume Templates</Link>
          <Link to="/cover-letter-generator" className="no-underline" style={{ color: '#F0B429' }}>Cover Letter Generator</Link>
        </div>
      </article>
    </div>
  );
}
