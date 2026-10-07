import { useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function ResumeWritingGuide() {
  useEffect(() => {
    document.title = 'How to Write a Resume in India 2026 — Complete Guide | DoAide Resume';
  }, []);

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 text-white">
        <div className="max-w-4xl mx-auto px-4 py-16 sm:py-20 text-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold leading-tight mb-6">
            How to Write a Resume in India 2026 — Complete Guide
          </h1>
          <p className="text-lg sm:text-xl text-blue-100 max-w-3xl mx-auto leading-relaxed">
            Everything you need to know about writing a resume that gets shortlisted by Indian recruiters and passes ATS screening. From format selection to tailoring tips — this is the only guide you need.
          </p>
        </div>
      </section>

      {/* Table of Contents */}
      <nav className="max-w-4xl mx-auto px-4 py-8">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-lg font-bold text-gray-800 mb-4">Table of Contents</h2>
          <ol className="list-decimal list-inside space-y-2 text-blue-600">
            <li><a href="#what-is-a-resume" className="hover:underline">What is a Resume?</a></li>
            <li><a href="#resume-vs-cv" className="hover:underline">Resume vs CV — What's the Difference?</a></li>
            <li><a href="#resume-formats" className="hover:underline">Resume Format Types</a></li>
            <li><a href="#essential-sections" className="hover:underline">Essential Sections Every Resume Must Have</a></li>
            <li><a href="#tips-indian-market" className="hover:underline">Resume Writing Tips for Indian Job Market</a></li>
            <li><a href="#common-mistakes" className="hover:underline">Common Mistakes to Avoid</a></li>
            <li><a href="#resume-length" className="hover:underline">Resume Length — How Long Should It Be?</a></li>
            <li><a href="#tailor-resume" className="hover:underline">How to Tailor Your Resume for Each Job</a></li>
          </ol>
        </div>
      </nav>

      {/* Content */}
      <article className="max-w-4xl mx-auto px-4 pb-16">
        <div className="prose prose-lg max-w-none">

          {/* Section 1 */}
          <section id="what-is-a-resume" className="mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-4">What is a Resume?</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              A resume is a concise, one-to-two-page document that summarizes your professional qualifications, work experience, education, and skills. It serves as your first impression with a potential employer and is the primary tool recruiters use to decide whether to invite you for an interview.
            </p>
            <p className="text-gray-700 leading-relaxed mb-4">
              In India, the terms "resume" and "CV" are often used interchangeably, but they have distinct meanings in the global job market. For most private-sector jobs, campus placements, and IT positions in India, what you need is a resume — a focused, targeted document designed for a specific role.
            </p>
            <p className="text-gray-700 leading-relaxed">
              If you are a fresher applying for your first job, a resume is especially important because it is often the only thing standing between you and an interview call. Unlike experienced professionals who may rely on referrals or LinkedIn connections, freshers depend heavily on their resume to make a strong case for themselves.
            </p>
          </section>

          {/* Section 2 */}
          <section id="resume-vs-cv" className="mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-4">Resume vs CV — What's the Difference?</h2>
            <div className="overflow-x-auto mb-6">
              <table className="w-full border-collapse border border-gray-200 text-sm">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="border border-gray-200 px-4 py-3 text-left font-semibold text-gray-700">Feature</th>
                    <th className="border border-gray-200 px-4 py-3 text-left font-semibold text-gray-700">Resume</th>
                    <th className="border border-gray-200 px-4 py-3 text-left font-semibold text-gray-700">CV (Curriculum Vitae)</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-gray-200 px-4 py-3 text-gray-700">Length</td>
                    <td className="border border-gray-200 px-4 py-3 text-gray-700">1-2 pages</td>
                    <td className="border border-gray-200 px-4 py-3 text-gray-700">2-10+ pages</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="border border-gray-200 px-4 py-3 text-gray-700">Purpose</td>
                    <td className="border border-gray-200 px-4 py-3 text-gray-700">Job applications (private sector)</td>
                    <td className="border border-gray-200 px-4 py-3 text-gray-700">Academic, research, government roles</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-200 px-4 py-3 text-gray-700">Content</td>
                    <td className="border border-gray-200 px-4 py-3 text-gray-700">Concise, tailored to role</td>
                    <td className="border border-gray-200 px-4 py-3 text-gray-700">Comprehensive, includes publications</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="border border-gray-200 px-4 py-3 text-gray-700">Customization</td>
                    <td className="border border-gray-200 px-4 py-3 text-gray-700">Different for each job</td>
                    <td className="border border-gray-200 px-4 py-3 text-gray-700">Generally static</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-200 px-4 py-3 text-gray-700">Used in India for</td>
                    <td className="border border-gray-200 px-4 py-3 text-gray-700">IT, startups, MNCs, placements</td>
                    <td className="border border-gray-200 px-4 py-3 text-gray-700">UPSC, academic, medical, legal</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="text-gray-700 leading-relaxed mb-4">
              In India, most private-sector employers expect a resume, not a full CV. However, if you are applying for government jobs (UPSC, SSC), academic positions, or roles in research institutions, a detailed CV may be more appropriate. For campus placements at IITs, NITs, and private engineering colleges, a resume is the standard format expected by companies like TCS, Infosys, Wipro, Google, and Amazon.
            </p>
            <p className="text-gray-700 leading-relaxed">
              The key takeaway: unless you are in academia or applying for government positions, stick with a resume. It should be sharp, relevant, and no longer than two pages.
            </p>
          </section>

          {/* Section 3 */}
          <section id="resume-formats" className="mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-4">Resume Format Types</h2>
            <p className="text-gray-700 leading-relaxed mb-6">
              Choosing the right resume format is one of the most important decisions you will make. The format you choose determines how your information is organized and what gets highlighted first. There are three main resume formats, and each works best for different situations.
            </p>

            <h3 className="text-xl font-semibold text-gray-800 mb-3">1. Chronological Resume (Reverse-Chronological)</h3>
            <p className="text-gray-700 leading-relaxed mb-4">
              This is the most widely used resume format in India and globally. It lists your work experience starting with the most recent position and works backward. Indian recruiters, especially at IT companies like TCS, Infosys, HCL, and Cognizant, are most familiar with this format.
            </p>
            <p className="text-gray-700 leading-relaxed mb-6">
              <strong>Best for:</strong> Experienced professionals with a consistent work history, software engineers, managers, and anyone with 2+ years of experience. This format is also preferred by ATS systems because it follows a predictable structure.
            </p>

            <h3 className="text-xl font-semibold text-gray-800 mb-3">2. Functional Resume (Skills-Based)</h3>
            <p className="text-gray-700 leading-relaxed mb-4">
              A functional resume focuses on your skills and abilities rather than your chronological work history. Instead of listing jobs with dates, it groups your accomplishments under skill categories. This format is useful for freshers, career changers, and people with employment gaps.
            </p>
            <p className="text-gray-700 leading-relaxed mb-6">
              <strong>Best for:</strong> Fresh graduates from B.Tech, BCA, MBA, or B.Com programs who lack formal work experience. Also suitable for professionals re-entering the workforce after a career break, or those switching industries — for example, moving from teaching to corporate training.
            </p>

            <h3 className="text-xl font-semibold text-gray-800 mb-3">3. Combination Resume (Hybrid)</h3>
            <p className="text-gray-700 leading-relaxed mb-4">
              The combination format merges elements of both chronological and functional formats. It typically starts with a skills summary section followed by a chronological work history. This gives you the best of both worlds — you highlight your key competencies while also showing a clear career progression.
            </p>
            <p className="text-gray-700 leading-relaxed">
              <strong>Best for:</strong> Mid-career professionals applying for senior roles, project managers, consultants, and anyone with both strong skills and solid experience to showcase. Popular among MBA graduates and professionals applying to consulting firms.
            </p>
          </section>

          {/* Section 4 */}
          <section id="essential-sections" className="mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-4">Essential Sections Every Resume Must Have</h2>
            <p className="text-gray-700 leading-relaxed mb-6">
              Regardless of the format you choose, every resume should include these core sections. Missing any of them can result in your resume being filtered out by ATS systems or ignored by recruiters.
            </p>

            <h3 className="text-xl font-semibold text-gray-800 mb-3">Contact Information</h3>
            <p className="text-gray-700 leading-relaxed mb-4">
              Include your full name, professional email address, phone number, city and state (full address is no longer necessary), and LinkedIn profile URL. If you have a personal portfolio or GitHub profile, include that as well. Avoid using unprofessional email addresses — create a new one using your name if needed.
            </p>

            <h3 className="text-xl font-semibold text-gray-800 mb-3">Professional Summary or Career Objective</h3>
            <p className="text-gray-700 leading-relaxed mb-4">
              A professional summary is a 2-3 sentence overview of your experience, key skills, and career goals. Experienced professionals should write a summary that highlights achievements. Freshers should write a career objective that focuses on what they bring to the table and what they hope to achieve. Avoid generic statements like "looking for a challenging role" — instead, be specific about your skills and the value you offer.
            </p>

            <h3 className="text-xl font-semibold text-gray-800 mb-3">Work Experience</h3>
            <p className="text-gray-700 leading-relaxed mb-4">
              List each position with the company name, job title, location, and dates of employment. Use bullet points to describe your responsibilities and achievements. Start each bullet with a strong action verb (designed, implemented, managed, optimized) and include quantifiable results wherever possible. For example, "Reduced API response time by 40% through database query optimization" is far more impactful than "Worked on improving system performance."
            </p>

            <h3 className="text-xl font-semibold text-gray-800 mb-3">Education</h3>
            <p className="text-gray-700 leading-relaxed mb-4">
              Include your degree, institution name, graduation year, and CGPA or percentage if it is 7.0+ (or 70%+). For freshers, education should come before work experience. For experienced professionals, it goes after. Include relevant coursework only if it directly relates to the job you are applying for.
            </p>

            <h3 className="text-xl font-semibold text-gray-800 mb-3">Skills</h3>
            <p className="text-gray-700 leading-relaxed mb-4">
              Divide your skills into categories: Technical Skills, Tools, Soft Skills, and Languages. For IT roles, list programming languages, frameworks, databases, and tools. For non-technical roles, focus on domain expertise, software proficiency, and interpersonal skills. Always match your skills section to the keywords in the job description — this is critical for ATS optimization.
            </p>

            <h3 className="text-xl font-semibold text-gray-800 mb-3">Optional but Valuable Sections</h3>
            <ul className="list-disc list-inside text-gray-700 space-y-2 mb-4">
              <li><strong>Projects:</strong> Essential for freshers and developers. Include project name, tech stack, your role, and outcome.</li>
              <li><strong>Certifications:</strong> AWS, Google, Microsoft, Coursera, or NPTEL certifications add credibility.</li>
              <li><strong>Publications:</strong> For academic or research roles.</li>
              <li><strong>Volunteer Work:</strong> Shows initiative and character, especially for freshers.</li>
              <li><strong>Languages:</strong> Mention fluency levels — useful for roles involving client interaction.</li>
            </ul>
          </section>

          {/* Section 5 */}
          <section id="tips-indian-market" className="mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-4">Resume Writing Tips for the Indian Job Market</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              The Indian job market has unique characteristics that affect how your resume should be written. Here are specific tips that apply to job seekers in India.
            </p>

            <div className="space-y-4">
              <div className="bg-blue-50 rounded-lg p-4 border border-blue-100">
                <h4 className="font-semibold text-gray-800 mb-2">Include CGPA or percentage when it is strong</h4>
                <p className="text-gray-700 text-sm">Indian recruiters, especially for fresher roles, place significant weight on academic performance. If your CGPA is 7.0+ or percentage is 70%+, include it. If it is lower, you may choose to omit it, but be prepared to discuss it in interviews.</p>
              </div>

              <div className="bg-blue-50 rounded-lg p-4 border border-blue-100">
                <h4 className="font-semibold text-gray-800 mb-2">Do not include personal details like date of birth, religion, or marital status</h4>
                <p className="text-gray-700 text-sm">Older resume formats in India often included father's name, date of birth, marital status, and nationality. This is no longer recommended. Modern resumes should only contain professional information. Including personal details can actually work against you with MNC recruiters who follow global standards.</p>
              </div>

              <div className="bg-blue-50 rounded-lg p-4 border border-blue-100">
                <h4 className="font-semibold text-gray-800 mb-2">Use Indian English conventions</h4>
                <p className="text-gray-700 text-sm">Stick with Indian English spellings (organisation, centre, programme) when applying to Indian companies. For multinational companies, use the spelling convention they follow — American companies prefer American English.</p>
              </div>

              <div className="bg-blue-50 rounded-lg p-4 border border-blue-100">
                <h4 className="font-semibold text-gray-800 mb-2">Include your notice period</h4>
                <p className="text-gray-700 text-sm">If you are currently employed, mentioning your notice period (30 days, 60 days, 90 days, or immediately available) in your summary or contact section saves time for both you and the recruiter. This is a common expectation in Indian hiring processes.</p>
              </div>

              <div className="bg-blue-50 rounded-lg p-4 border border-blue-100">
                <h4 className="font-semibold text-gray-800 mb-2">Optimize for Naukri, LinkedIn, and ATS</h4>
                <p className="text-gray-700 text-sm">Most Indian companies source candidates through Naukri.com, LinkedIn, and their ATS portals. Make sure your resume uses the same keywords found in job descriptions on these platforms. Upload your resume in PDF format for the best compatibility.</p>
              </div>
            </div>
          </section>

          {/* Section 6 */}
          <section id="common-mistakes" className="mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-4">Common Resume Mistakes to Avoid</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Even well-qualified candidates get rejected because of avoidable resume mistakes. Here are the most common errors that Indian job seekers make.
            </p>
            <ul className="space-y-3">
              {[
                { title: 'Using a generic objective statement', desc: '"Seeking a challenging position" tells the recruiter nothing. Write a specific summary that mentions your experience level, key skills, and the type of role you are targeting.' },
                { title: 'Including a photograph', desc: 'Unless you are applying for a modelling or front-desk role, do not include a photo. Most ATS systems cannot process images, and it introduces unconscious bias.' },
                { title: 'Using tables, columns, or text boxes', desc: 'Fancy formatting looks good to humans but confuses ATS parsers. Use a single-column, clean layout for maximum compatibility.' },
                { title: 'Listing responsibilities instead of achievements', desc: '"Managed a team of 5" is a responsibility. "Led a team of 5 to deliver a project 2 weeks ahead of schedule, saving 15 lakhs in costs" is an achievement. Always quantify your impact.' },
                { title: 'Sending the same resume for every job', desc: 'Each job application should have a tailored resume that matches the job description keywords. A software developer resume should look different when applying for a frontend role versus a backend role.' },
                { title: 'Typos and grammatical errors', desc: 'Proofread multiple times. Ask a friend to review. Even one spelling mistake can create a negative impression, especially at companies that value attention to detail.' },
                { title: 'Including "References available upon request"', desc: 'This wastes space. Employers will ask for references when they need them. Use that space for something more valuable.' },
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-6 h-6 bg-red-100 text-red-600 rounded-full flex items-center justify-center text-sm font-bold mt-0.5">!</span>
                  <div>
                    <strong className="text-gray-800">{item.title}:</strong>
                    <span className="text-gray-700"> {item.desc}</span>
                  </div>
                </li>
              ))}
            </ul>
          </section>

          {/* Section 7 */}
          <section id="resume-length" className="mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-4">Resume Length — How Long Should It Be?</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              The ideal resume length depends on your experience level. Here is a simple guideline:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
              <div className="bg-green-50 rounded-lg p-5 border border-green-100 text-center">
                <div className="text-3xl font-bold text-green-700 mb-2">1 Page</div>
                <div className="text-sm font-semibold text-gray-800 mb-1">Freshers & Entry-Level</div>
                <p className="text-xs text-gray-600">0-3 years of experience. One page is sufficient and preferred by most recruiters.</p>
              </div>
              <div className="bg-blue-50 rounded-lg p-5 border border-blue-100 text-center">
                <div className="text-3xl font-bold text-blue-700 mb-2">1-2 Pages</div>
                <div className="text-sm font-semibold text-gray-800 mb-1">Mid-Level Professionals</div>
                <p className="text-xs text-gray-600">3-10 years of experience. Two pages are acceptable if the content is relevant and impactful.</p>
              </div>
              <div className="bg-purple-50 rounded-lg p-5 border border-purple-100 text-center">
                <div className="text-3xl font-bold text-purple-700 mb-2">2 Pages</div>
                <div className="text-sm font-semibold text-gray-800 mb-1">Senior Professionals</div>
                <p className="text-xs text-gray-600">10+ years of experience. Two full pages are standard for senior and leadership roles.</p>
              </div>
            </div>
            <p className="text-gray-700 leading-relaxed">
              The golden rule: every line on your resume should earn its place. If a piece of information does not help you get an interview, remove it. Recruiters at large Indian IT companies receive hundreds of resumes daily and typically spend only 6-8 seconds on an initial scan. Make every word count.
            </p>
          </section>

          {/* Section 8 */}
          <section id="tailor-resume" className="mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-4">How to Tailor Your Resume for Each Job</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Sending the same resume to every company is one of the biggest mistakes job seekers make. Tailoring your resume for each application significantly increases your chances of getting shortlisted. Here is a step-by-step process:
            </p>

            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <span className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold">1</span>
                <div>
                  <h4 className="font-semibold text-gray-800 mb-1">Read the job description carefully</h4>
                  <p className="text-gray-700 text-sm">Identify the key skills, qualifications, and responsibilities mentioned. Highlight the most frequently repeated terms — these are the keywords the ATS will look for.</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <span className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold">2</span>
                <div>
                  <h4 className="font-semibold text-gray-800 mb-1">Match your skills section to the job requirements</h4>
                  <p className="text-gray-700 text-sm">Rearrange your skills so that the most relevant ones appear first. If the job requires React.js and you have it listed after 10 other skills, move it to the top.</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <span className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold">3</span>
                <div>
                  <h4 className="font-semibold text-gray-800 mb-1">Rewrite your summary for each application</h4>
                  <p className="text-gray-700 text-sm">Your professional summary should reflect the specific role. A backend developer summary should differ from a full-stack developer summary, even if your experience covers both.</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <span className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold">4</span>
                <div>
                  <h4 className="font-semibold text-gray-800 mb-1">Adjust your experience bullet points</h4>
                  <p className="text-gray-700 text-sm">Emphasize the accomplishments most relevant to the target role. You do not need to change everything — just reorder and highlight the points that matter most for this particular job.</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <span className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold">5</span>
                <div>
                  <h4 className="font-semibold text-gray-800 mb-1">Use the exact keywords from the job posting</h4>
                  <p className="text-gray-700 text-sm">If the job description says "Agile methodology," use that exact phrase — not "Agile process" or "Scrum." ATS systems often match keywords literally, and even close synonyms can be missed.</p>
                </div>
              </div>
            </div>
          </section>

        </div>
      </article>

      {/* CTA Section */}
      <section className="bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 text-white py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4">
            Ready to Build Your Resume?
          </h2>
          <p className="text-lg text-blue-100 mb-8 max-w-2xl mx-auto">
            Build your resume now with DoAide Resume — 100% free, no login required. Choose from 5 professional templates, get ATS optimization, and download as PDF instantly.
          </p>
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-8 py-4 bg-white text-blue-700 font-bold text-lg rounded-xl shadow-lg hover:shadow-xl hover:bg-blue-50 transition-all transform hover:-translate-y-0.5"
          >
            Start Building Your Resume
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </section>
    </div>
  );
}
