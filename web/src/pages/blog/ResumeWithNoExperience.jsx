import { useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function ResumeWithNoExperience() {
  useEffect(() => {
    document.title = 'How to Write a Resume With No Experience (With Examples) | DoAide Resume';
    const meta = document.querySelector('meta[name="description"]');
    if (meta) meta.content = 'How to write a resume with no work experience in 2026. What to include instead of jobs, a section-by-section template, and before-and-after bullet examples for students, freshers and career restarters.';

    const blogSchema = document.createElement('script');
    blogSchema.type = 'application/ld+json';
    blogSchema.textContent = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      "headline": "How to Write a Resume With No Experience (With Examples)",
      "description": "Step-by-step guide to writing a resume with no work experience, with what to include instead of jobs and before-and-after examples.",
      "url": "https://resume.doaide.com/blog/resume-with-no-experience",
      "datePublished": "2026-10-22",
      "dateModified": "2026-10-22",
      "author": {
        "@type": "Organization",
        "name": "DoAide",
        "url": "https://doaide.com"
      },
      "publisher": {
        "@type": "Organization",
        "name": "DoAide",
        "url": "https://doaide.com",
        "logo": {
          "@type": "ImageObject",
          "url": "https://doaide.com/logo.png"
        }
      },
      "mainEntityOfPage": {
        "@type": "WebPage",
        "@id": "https://resume.doaide.com/blog/resume-with-no-experience"
      },
      "wordCount": 1270,
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
          "name": "What do I put on my resume if I have no experience?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Include academic and personal projects, internships, freelance or part-time work, volunteering, college activities, competitions and relevant certifications. Put projects near the top and describe each with an action verb, what you did, the tools used and the result."
          }
        },
        {
          "@type": "Question",
          "name": "How long should a resume with no experience be?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "One page. Focus on your most relevant projects, education and skills, and leave out anything that does not support the role you are applying for."
          }
        },
        {
          "@type": "Question",
          "name": "Should I include my Class 10 and 12 marks?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "If you are a graduate, include them only if the employer asks or the scores are strong and relevant. Many campus recruiters in India do ask for them, so check the job posting."
          }
        },
        {
          "@type": "Question",
          "name": "Can I count college projects as experience?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes. Put them in a dedicated Projects section and describe them like work experience, with what you built, the tools you used and the outcome. For many freshers, projects are the strongest part of the resume."
          }
        },
        {
          "@type": "Question",
          "name": "How do I explain a career gap on my resume?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Add a short line with the dates and reason, such as caregiving or study, and mention any courses or projects completed during the break. Keep it factual and brief, and expand in your cover letter or interview if needed."
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

  const h2 = { fontSize: '1.5rem', fontWeight: '700', color: '#0D9488', marginTop: '2.5rem', marginBottom: '0.75rem' };
  const p = { color: 'var(--da-text-secondary, #64748B)', lineHeight: '1.75', marginBottom: '1rem', fontSize: '0.95rem' };
  const li = { color: 'var(--da-text-secondary, #64748B)', lineHeight: '1.75', marginBottom: '0.5rem', fontSize: '0.95rem', paddingLeft: '0.5rem' };

  return (
    <div>
      <section style={{ background: 'linear-gradient(135deg, #7C3AED, #0D9488)' }} className="text-white">
        <div className="max-w-3xl mx-auto px-4 py-14 sm:py-20 text-center">
          <div className="inline-block bg-white/20 text-white text-sm font-medium px-4 py-1.5 rounded-full mb-4">
            Resume Writing
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold leading-tight mb-4">
            How to Write a Resume With No Experience (With Examples)
          </h1>
          <p className="text-lg text-white/90 max-w-2xl mx-auto">
            No jobs on your CV yet? You still have more to show than you think. Here is what to include and how to write it.
          </p>
          <div className="mt-4 text-sm text-white/80">October 2026 &middot; 9 min read</div>
        </div>
      </section>

      <article className="max-w-3xl mx-auto px-4 py-12" style={{ background: 'var(--da-bg, #FFFFFF)' }}>
        <p style={p}>
          "How can I get experience if every job asks for experience?" It is the most common frustration for students, fresh graduates and anyone restarting a career after a break. The good news is that employers hiring for entry-level roles do not expect a long work history. They are looking for evidence that you can learn, finish things and work with people.
        </p>

        <p style={p}>
          That evidence exists in almost everyone&apos;s life. This guide shows you where to find it, how to structure a resume with no experience, and how to write bullet points that make it count. It applies to freshers, students looking for internships, and career restarters returning after a gap.
        </p>

        <h2 style={h2}>Step 1: Find Your "Experience" Outside of Jobs</h2>

        <p style={p}>
          Work experience is only one way to show skills. Go through this list and note everything that applies to you:
        </p>

        <ul style={{ listStyle: 'disc', paddingLeft: '1.5rem', marginBottom: '1rem' }}>
          <li style={li}><strong style={{ color: 'var(--da-text, #1E293B)' }}>Academic projects</strong> — final-year projects, mini projects, research papers and lab work, especially ones with a real output.</li>
          <li style={li}><strong style={{ color: 'var(--da-text, #1E293B)' }}>Internships and apprenticeships</strong> — even short or unpaid ones, including virtual internships.</li>
          <li style={li}><strong style={{ color: 'var(--da-text, #1E293B)' }}>Personal projects</strong> — an app, website, blog, YouTube channel, Kaggle notebook or design portfolio you built on your own.</li>
          <li style={li}><strong style={{ color: 'var(--da-text, #1E293B)' }}>Freelance and part-time work</strong> — tuition classes, small freelance gigs, helping in a family business, delivery or retail jobs.</li>
          <li style={li}><strong style={{ color: 'var(--da-text, #1E293B)' }}>Volunteering and NSS/NCC</strong> — organising events, teaching, fundraising or community work.</li>
          <li style={li}><strong style={{ color: 'var(--da-text, #1E293B)' }}>College activities</strong> — fest committees, clubs, student council, placement cell, sports captaincy.</li>
          <li style={li}><strong style={{ color: 'var(--da-text, #1E293B)' }}>Competitions</strong> — hackathons, case competitions, coding contests, debates and olympiads.</li>
          <li style={li}><strong style={{ color: 'var(--da-text, #1E293B)' }}>Certifications and courses</strong> — NPTEL, Coursera, government Skill India courses, or vendor certifications relevant to the role.</li>
        </ul>

        <p style={p}>
          Career restarters can also include caregiving periods managed alongside courses, community roles, or freelance work done during the break.
        </p>

        <h2 style={h2}>Step 2: Use a Skills-First Structure</h2>

        <p style={p}>
          When you have no jobs to list, the order of sections matters. Put your strongest evidence near the top, where recruiters look first:
        </p>

        <ul style={{ listStyle: 'disc', paddingLeft: '1.5rem', marginBottom: '1rem' }}>
          <li style={li}><strong style={{ color: 'var(--da-text, #1E293B)' }}>Header</strong> — name, phone, professional email, city, and LinkedIn or GitHub/portfolio link.</li>
          <li style={li}><strong style={{ color: 'var(--da-text, #1E293B)' }}>Summary</strong> — two lines on the role you want and your strongest relevant skills.</li>
          <li style={li}><strong style={{ color: 'var(--da-text, #1E293B)' }}>Education</strong> — degree, college, year and CGPA or percentage if it helps you.</li>
          <li style={li}><strong style={{ color: 'var(--da-text, #1E293B)' }}>Projects</strong> — two to four projects with clear outcomes. For many freshers, this is the most important section.</li>
          <li style={li}><strong style={{ color: 'var(--da-text, #1E293B)' }}>Internships / Experience</strong> — internships, freelance or part-time work, if any.</li>
          <li style={li}><strong style={{ color: 'var(--da-text, #1E293B)' }}>Skills</strong> — grouped by type (e.g. Languages, Tools, Soft skills), only ones you can discuss in an interview.</li>
          <li style={li}><strong style={{ color: 'var(--da-text, #1E293B)' }}>Certifications, achievements and activities</strong> — short lines, most relevant first.</li>
        </ul>

        <p style={p}>
          Keep it to one page and use a simple single-column layout so applicant tracking systems can read it. Our <Link to="/templates" style={{ color: '#0D9488' }}>resume templates</Link> are built this way, and the <Link to="/blog/resume-format-freshers-2026" style={{ color: '#0D9488' }}>Resume Format for Freshers 2026</Link> guide covers layout in more detail.
        </p>

        <h2 style={h2}>Step 3: Write Bullets That Prove Skills</h2>

        <p style={p}>
          The formula for a strong bullet is simple: <strong style={{ color: 'var(--da-text, #1E293B)' }}>action verb + what you did + how or with what + result.</strong> Results can be numbers (users, marks, money raised, time saved) or concrete outcomes (shipped, won, adopted, published).
        </p>

        <div className="rounded-xl p-4 mb-4" style={{ background: 'var(--da-surface, #F8FFFE)', border: '1px solid var(--da-border, #E2E8F0)' }}>
          <p style={{ ...p, marginBottom: '0.5rem' }}><strong style={{ color: '#DC2626' }}>Before:</strong> Did a project on library management.</p>
          <p style={{ ...p, marginBottom: 0 }}><strong style={{ color: '#0D9488' }}>After:</strong> Built a library management system in Java and MySQL for the college library, letting 2 staff track 3,000+ books and overdue returns without paper registers.</p>
        </div>

        <div className="rounded-xl p-4 mb-4" style={{ background: 'var(--da-surface, #F8FFFE)', border: '1px solid var(--da-border, #E2E8F0)' }}>
          <p style={{ ...p, marginBottom: '0.5rem' }}><strong style={{ color: '#DC2626' }}>Before:</strong> Member of college fest committee.</p>
          <p style={{ ...p, marginBottom: 0 }}><strong style={{ color: '#0D9488' }}>After:</strong> Managed sponsorship outreach for a college fest, contacting 40+ local businesses and securing ₹1.2 lakh in sponsorships with a 4-member team.</p>
        </div>

        <div className="rounded-xl p-4 mb-4" style={{ background: 'var(--da-surface, #F8FFFE)', border: '1px solid var(--da-border, #E2E8F0)' }}>
          <p style={{ ...p, marginBottom: '0.5rem' }}><strong style={{ color: '#DC2626' }}>Before:</strong> Gave tuitions to school students.</p>
          <p style={{ ...p, marginBottom: 0 }}><strong style={{ color: '#0D9488' }}>After:</strong> Taught maths and science to 8 Class 9-10 students for two years; all students improved their board exam scores over the previous year.</p>
        </div>

        <p style={p}>
          If you do not have exact numbers, use honest approximations ("about 50 attendees") or concrete outcomes. Never invent figures you cannot explain in an interview.
        </p>

        <h2 style={h2}>Step 4: Write a Summary, Not an Objective</h2>

        <p style={p}>
          Skip the old-style objective ("To obtain a challenging position in a reputed organisation..."). Write a short summary that names the role and your evidence:
        </p>

        <div className="rounded-xl p-4 mb-4" style={{ background: 'var(--da-surface, #F8FFFE)', border: '1px solid var(--da-border, #E2E8F0)' }}>
          <p style={{ ...p, marginBottom: '0.5rem' }}><strong style={{ color: '#DC2626' }}>Before:</strong> Seeking a challenging role where I can utilise my skills and grow with the organisation.</p>
          <p style={{ ...p, marginBottom: 0 }}><strong style={{ color: '#0D9488' }}>After:</strong> B.Com graduate (2026) seeking an accounts executive role. Hands-on with Tally Prime, GST return basics and Excel from a 3-month internship at a CA firm.</p>
        </div>

        <p style={p}>
          If you find summaries hard, our free <Link to="/advisor" style={{ color: '#0D9488' }}>AI career advisor</Link> and the <Link to="/linkedin-summary-generator" style={{ color: '#0D9488' }}>LinkedIn summary generator</Link> can give you a starting draft to edit.
        </p>

        <h2 style={h2}>Step 5: Tailor It to Each Job</h2>

        <p style={p}>
          With little experience, relevance is your biggest advantage. For each application, read the job description, note the skills and tools it mentions, and make sure the ones you genuinely have appear in your skills, projects and summary using the same wording. Then run your resume through the free <Link to="/ats-checker" style={{ color: '#0D9488' }}>ATS checker</Link> to see which keywords you are missing.
        </p>

        <h2 style={h2}>What to Leave Out</h2>

        <ul style={{ listStyle: 'disc', paddingLeft: '1.5rem', marginBottom: '1rem' }}>
          <li style={li}><strong style={{ color: 'var(--da-text, #1E293B)' }}>Personal details</strong> like date of birth, father&apos;s name, religion, marital status and a photo, unless the employer specifically asks.</li>
          <li style={li}><strong style={{ color: 'var(--da-text, #1E293B)' }}>Class 10 and 12 details</strong> if you are a graduate, unless the employer asks for them or the scores are strong and relevant.</li>
          <li style={li}><strong style={{ color: 'var(--da-text, #1E293B)' }}>Long lists of soft skills</strong> with no evidence. Show teamwork through a project bullet instead.</li>
          <li style={li}><strong style={{ color: 'var(--da-text, #1E293B)' }}>Hobbies that add nothing.</strong> Keep interests only if they say something useful about you, such as competitive chess or running a tech blog.</li>
          <li style={li}><strong style={{ color: 'var(--da-text, #1E293B)' }}>Skills you cannot defend.</strong> If you list Python, expect a Python question.</li>
        </ul>

        <h2 style={h2}>If You Are Restarting After a Career Break</h2>

        <p style={p}>
          Be upfront and brief. A single line such as "Career break (2023-2026): Full-time caregiving; completed Google Data Analytics certificate" is better than an unexplained gap. Put recent courses and projects near the top so the recruiter sees your current skills first, and use the <Link to="/cover-letter-generator" style={{ color: '#0D9488' }}>cover letter generator</Link> to explain the break in a sentence or two.
        </p>

        <h2 style={h2}>Your No-Experience Resume Checklist</h2>

        <ul style={{ listStyle: 'disc', paddingLeft: '1.5rem', marginBottom: '1rem' }}>
          <li style={li}>One page, single column, standard headings</li>
          <li style={li}>Two-line summary naming the target role</li>
          <li style={li}>Two to four projects with action verbs and outcomes</li>
          <li style={li}>Skills you can discuss in an interview, matched to the job description</li>
          <li style={li}>Professional email and a LinkedIn or portfolio link</li>
          <li style={li}>No unnecessary personal details; proofread twice</li>
        </ul>

        <p style={p}>
          A resume with no experience is not an empty resume. It is a resume that shows evidence from projects, learning and activities instead of job titles. Collect that evidence, write it clearly and tailor it to each role. If you want to speed up the drafting, read how to <Link to="/blog/ai-resume-builder-freshers-2026" style={{ color: '#0D9488' }}>use an AI resume builder without sounding generic</Link>.
        </p>

        <h2 style={h2}>Frequently Asked Questions</h2>
        <details className="rounded-xl p-4 mb-3" style={{ background: 'var(--da-surface, #F8FFFE)', border: '1px solid var(--da-border, #E2E8F0)' }}>
          <summary className="cursor-pointer font-semibold" style={{ color: 'var(--da-text, #1E293B)' }}>What do I put on my resume if I have no experience?</summary>
          <p style={{ ...p, marginTop: '0.75rem', marginBottom: 0 }}>Include academic and personal projects, internships, freelance or part-time work, volunteering, college activities, competitions and relevant certifications. Put projects near the top and describe each with an action verb, what you did, the tools used and the result.</p>
        </details>
        <details className="rounded-xl p-4 mb-3" style={{ background: 'var(--da-surface, #F8FFFE)', border: '1px solid var(--da-border, #E2E8F0)' }}>
          <summary className="cursor-pointer font-semibold" style={{ color: 'var(--da-text, #1E293B)' }}>How long should a resume with no experience be?</summary>
          <p style={{ ...p, marginTop: '0.75rem', marginBottom: 0 }}>One page. Focus on your most relevant projects, education and skills, and leave out anything that does not support the role you are applying for.</p>
        </details>
        <details className="rounded-xl p-4 mb-3" style={{ background: 'var(--da-surface, #F8FFFE)', border: '1px solid var(--da-border, #E2E8F0)' }}>
          <summary className="cursor-pointer font-semibold" style={{ color: 'var(--da-text, #1E293B)' }}>Should I include my Class 10 and 12 marks?</summary>
          <p style={{ ...p, marginTop: '0.75rem', marginBottom: 0 }}>If you are a graduate, include them only if the employer asks or the scores are strong and relevant. Many campus recruiters in India do ask for them, so check the job posting.</p>
        </details>
        <details className="rounded-xl p-4 mb-3" style={{ background: 'var(--da-surface, #F8FFFE)', border: '1px solid var(--da-border, #E2E8F0)' }}>
          <summary className="cursor-pointer font-semibold" style={{ color: 'var(--da-text, #1E293B)' }}>Can I count college projects as experience?</summary>
          <p style={{ ...p, marginTop: '0.75rem', marginBottom: 0 }}>Yes. Put them in a dedicated Projects section and describe them like work experience, with what you built, the tools you used and the outcome. For many freshers, projects are the strongest part of the resume.</p>
        </details>
        <details className="rounded-xl p-4 mb-3" style={{ background: 'var(--da-surface, #F8FFFE)', border: '1px solid var(--da-border, #E2E8F0)' }}>
          <summary className="cursor-pointer font-semibold" style={{ color: 'var(--da-text, #1E293B)' }}>How do I explain a career gap on my resume?</summary>
          <p style={{ ...p, marginTop: '0.75rem', marginBottom: 0 }}>Add a short line with the dates and reason, such as caregiving or study, and mention any courses or projects completed during the break. Keep it factual and brief, and expand in your cover letter or interview if needed.</p>
        </details>

        <div className="mt-12 p-6 rounded-xl text-center" style={{ background: 'var(--da-surface, #F8FFFE)', border: '1px solid var(--da-border, #E2E8F0)' }}>
          <h3 className="text-xl font-bold mb-2" style={{ color: 'var(--da-text, #1E293B)' }}>Turn your projects into a resume</h3>
          <p className="text-sm mb-4" style={{ color: 'var(--da-text-secondary, #64748B)' }}>Free AI resume builder with fresher-friendly templates, ATS check and instant PDF download.</p>
          <Link to="/" className="inline-flex items-center gap-2 px-6 py-3 font-semibold rounded-xl transition no-underline" style={{ background: '#0D9488', color: '#FFFFFF' }}>
            Build Your Resume Free
          </Link>
        </div>

        <div className="mt-8 flex flex-wrap gap-4 text-sm" style={{ color: 'var(--da-text-muted, #94A3B8)' }}>
          <span>Related:</span>
          <Link to="/blog/ai-resume-builder-freshers-2026" className="no-underline" style={{ color: '#0D9488' }}>AI Resume Builder for Freshers</Link>
          <Link to="/blog/resume-mistakes" className="no-underline" style={{ color: '#0D9488' }}>Top 10 Resume Mistakes</Link>
          <Link to="/ats-checker" className="no-underline" style={{ color: '#0D9488' }}>Free ATS Checker</Link>
          <Link to="/interview-preparation" className="no-underline" style={{ color: '#0D9488' }}>Interview Preparation</Link>
        </div>
      </article>
    </div>
  );
}
