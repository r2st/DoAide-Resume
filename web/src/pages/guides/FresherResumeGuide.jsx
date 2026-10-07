import { useEffect } from "react";
import { Link } from "react-router-dom";

export default function FresherResumeGuide() {
  useEffect(() => {
    document.title =
      "Resume for Freshers 2026: Free Template, Format & Tips | DoAide";
  }, []);

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      {/* Hero Section */}
      <section className="mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4 leading-tight">
          Resume for Freshers 2026: Free Template, Format & Tips
        </h1>
        <p className="text-lg text-gray-600 mb-6">
          Writing your first resume is hard. You have no work experience to
          highlight, and every template you find online seems designed for
          someone with 5+ years in the industry. This guide is written
          specifically for freshers — recent graduates and final-year students
          in India looking for their first job. We cover the right format, what
          to include, what to leave out, and how to make your resume stand out
          even without professional experience.
        </p>
        <Link
          to="/"
          className="inline-block bg-blue-600 text-white font-semibold px-6 py-3 rounded-lg hover:bg-blue-700 transition"
        >
          Build Your Fresher Resume Free
        </Link>
      </section>

      {/* Why Freshers Need a Different Approach */}
      <section className="mb-10">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Why Freshers Need a Different Resume Approach
        </h2>
        <p className="text-gray-700 mb-4">
          Most resume advice online is written for experienced professionals.
          Their resumes lead with a professional summary and work experience
          section because that is their strongest selling point. As a fresher,
          following the same structure leaves you with a thin, unconvincing
          resume — a summary with no substance and a work experience section
          that is either empty or padded with irrelevant part-time jobs.
        </p>
        <p className="text-gray-700 mb-4">
          A fresher resume needs to emphasize what you do have: your education,
          academic projects, internships, technical skills, and certifications.
          The structure of your resume should put these sections front and
          center, not bury them below a missing work experience section.
        </p>
      </section>

      {/* Best Format */}
      <section className="mb-10">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Best Resume Format for Freshers
        </h2>
        <p className="text-gray-700 mb-4">
          For freshers, the <strong>functional format</strong> or{" "}
          <strong>combination format</strong> works best. Unlike the
          chronological format (which lists jobs in reverse order), the
          functional format groups your qualifications by skill area, making it
          ideal when you lack work history. The combination format blends both
          — it leads with skills and projects, then lists any internship or
          part-time experience chronologically.
        </p>
        <p className="text-gray-700 mb-4">
          Regardless of format, your resume should follow this section order:
        </p>
        <ol className="list-decimal list-inside text-gray-700 space-y-2 mb-4">
          <li>Contact Information</li>
          <li>Career Objective</li>
          <li>Education</li>
          <li>Projects</li>
          <li>Internship Experience (if any)</li>
          <li>Technical Skills</li>
          <li>Certifications (if any)</li>
          <li>Extracurricular Activities & Achievements</li>
        </ol>
      </section>

      {/* What to Include */}
      <section className="mb-10">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          What to Include in a Fresher Resume
        </h2>

        {/* Career Objective */}
        <h3 className="text-xl font-semibold text-gray-800 mb-3">
          Career Objective (Not Professional Summary)
        </h3>
        <p className="text-gray-700 mb-4">
          As a fresher, you write a career objective — not a professional
          summary. A professional summary highlights past accomplishments. A
          career objective states what you are looking for and what you bring to
          the table. Keep it to 2-3 sentences. Be specific about the role and
          industry you are targeting.
        </p>

        <div className="bg-gray-50 rounded-lg p-6 mb-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-3">
            Career Objective Examples
          </h3>

          <div className="mb-4">
            <p className="text-sm font-semibold text-blue-700 mb-1">
              B.Tech in Computer Science
            </p>
            <p className="text-gray-700 italic">
              "B.Tech Computer Science graduate from VIT Vellore with strong
              foundations in data structures, algorithms, and full-stack
              development using Java and React.js. Seeking a Software Engineer
              role where I can apply my problem-solving skills and contribute to
              building scalable web applications."
            </p>
          </div>

          <div className="mb-4">
            <p className="text-sm font-semibold text-blue-700 mb-1">
              BCA Graduate
            </p>
            <p className="text-gray-700 italic">
              "BCA graduate from Christ University with hands-on experience in
              Python, MySQL, and web development through academic projects and a
              3-month internship at a Bangalore-based startup. Looking for an
              entry-level developer role to grow my skills in backend
              engineering."
            </p>
          </div>

          <div>
            <p className="text-sm font-semibold text-blue-700 mb-1">
              MBA in Marketing
            </p>
            <p className="text-gray-700 italic">
              "MBA (Marketing) graduate from Symbiosis Pune with specialization
              in digital marketing and brand management. Completed live projects
              with two FMCG brands during coursework. Seeking a Marketing
              Executive role in a fast-paced consumer goods company."
            </p>
          </div>
        </div>

        {/* Education */}
        <h3 className="text-xl font-semibold text-gray-800 mb-3">
          Education — Your Strongest Section
        </h3>
        <p className="text-gray-700 mb-4">
          For freshers, the education section is the most important part of
          your resume. Unlike experienced professionals who list education
          briefly at the bottom, you should place it prominently and include
          more detail.
        </p>
        <p className="text-gray-700 mb-4">Include the following:</p>
        <ul className="list-disc list-inside text-gray-700 space-y-2 mb-4">
          <li>
            <strong>Degree and specialization</strong> — e.g., "B.Tech in
            Computer Science and Engineering"
          </li>
          <li>
            <strong>University and college name</strong> — e.g., "Delhi
            Technological University (DTU)"
          </li>
          <li>
            <strong>Graduation year</strong> — or expected graduation year if
            you are in your final year
          </li>
          <li>
            <strong>CGPA or percentage</strong> — include if it is 7.0+ on a
            10-point scale or 70%+. If your CGPA is below this, consider
            omitting it.
          </li>
          <li>
            <strong>Relevant coursework</strong> — list 4-6 courses directly
            relevant to the job you are applying for
          </li>
          <li>
            <strong>Academic achievements</strong> — Dean's list, rank in
            department, academic scholarships, paper presentations
          </li>
        </ul>

        <div className="bg-gray-50 rounded-lg p-6 mb-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-2">
            Example Education Section
          </h3>
          <div className="text-gray-700 space-y-1">
            <p className="font-semibold">
              B.Tech in Computer Science and Engineering
            </p>
            <p>Delhi Technological University (DTU), New Delhi</p>
            <p>Graduated: June 2026 | CGPA: 8.4/10</p>
            <p className="text-sm mt-2">
              Relevant Coursework: Data Structures & Algorithms, Database
              Management Systems, Operating Systems, Machine Learning, Computer
              Networks, Software Engineering
            </p>
            <p className="text-sm">
              Achievements: Department rank 12 out of 240 students. Published
              paper on "Optimizing Query Performance in Distributed Databases"
              at IEEE ICCES 2025.
            </p>
          </div>
        </div>

        {/* Projects */}
        <h3 className="text-xl font-semibold text-gray-800 mb-3">
          Projects — Show What You Can Do
        </h3>
        <p className="text-gray-700 mb-4">
          Projects are the closest thing a fresher has to work experience.
          Include 2-4 of your best projects — academic projects, personal
          projects, hackathon entries, or open-source contributions. For each
          project, describe it using action verbs and quantify the outcome
          where possible.
        </p>
        <p className="text-gray-700 mb-4">
          Structure each project entry like this:
        </p>
        <ul className="list-disc list-inside text-gray-700 space-y-2 mb-4">
          <li>
            <strong>Project name</strong> and a one-line description
          </li>
          <li>
            <strong>Technologies used</strong> — list the tech stack
          </li>
          <li>
            <strong>What you built and the result</strong> — use bullet points
            with action verbs
          </li>
          <li>
            <strong>Link</strong> — GitHub repo or live demo URL if available
          </li>
        </ul>

        <div className="bg-gray-50 rounded-lg p-6 mb-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-2">
            Example Project Entry
          </h3>
          <div className="text-gray-700 space-y-1">
            <p className="font-semibold">
              E-Commerce Price Tracker | Python, BeautifulSoup, PostgreSQL,
              Flask
            </p>
            <ul className="list-disc list-inside text-sm space-y-1 mt-1">
              <li>
                Built a web scraper that monitors prices across Amazon and
                Flipkart for 500+ products daily
              </li>
              <li>
                Designed a PostgreSQL database to store historical pricing data
                and identify trends
              </li>
              <li>
                Developed a Flask dashboard showing price history charts and
                sending email alerts when prices drop below a user-set threshold
              </li>
              <li>
                Deployed on AWS EC2 with automated cron jobs for daily data
                collection
              </li>
            </ul>
          </div>
        </div>

        {/* Internships */}
        <h3 className="text-xl font-semibold text-gray-800 mb-3">
          Internship Experience
        </h3>
        <p className="text-gray-700 mb-4">
          Even a 1-month internship is worth including. Treat internship
          entries like work experience entries — company name, role, dates, and
          bullet points describing what you did. Focus on responsibilities and
          outcomes rather than just listing that you "assisted the team." A
          short internship presented well is far more valuable than omitting it.
        </p>
        <p className="text-gray-700 mb-4">
          Instead of writing "Worked on the development team," write "Developed
          3 REST API endpoints for the user authentication module using Node.js
          and Express, reducing login latency by 200ms." Be specific about your
          contributions, the technologies you used, and any measurable impact.
        </p>

        {/* Skills */}
        <h3 className="text-xl font-semibold text-gray-800 mb-3">
          Skills Section
        </h3>
        <p className="text-gray-700 mb-4">
          Organize your skills into clear categories. This makes it easy for
          both ATS systems and human recruiters to quickly see what you know.
        </p>
        <div className="bg-gray-50 rounded-lg p-6 mb-6">
          <div className="text-gray-700 space-y-2">
            <p>
              <strong>Programming Languages:</strong> Java, Python, JavaScript,
              C++
            </p>
            <p>
              <strong>Web Technologies:</strong> React.js, Node.js, HTML5,
              CSS3, Tailwind CSS
            </p>
            <p>
              <strong>Databases:</strong> MySQL, PostgreSQL, MongoDB
            </p>
            <p>
              <strong>Tools & Platforms:</strong> Git, GitHub, Docker, AWS
              (EC2, S3), VS Code
            </p>
            <p>
              <strong>Soft Skills:</strong> Team collaboration, technical
              writing, public speaking, time management
            </p>
          </div>
        </div>
        <p className="text-gray-700 mb-4">
          Only list skills you can actually demonstrate. If you list "Docker" as
          a skill, be prepared to answer questions about containerization in an
          interview. Do not list skills you only read about but never used in a
          project or coursework.
        </p>

        {/* Certifications */}
        <h3 className="text-xl font-semibold text-gray-800 mb-3">
          Certifications
        </h3>
        <p className="text-gray-700 mb-4">
          Relevant certifications add credibility, especially for freshers.
          Include the certification name, issuing organization, and completion
          date. Popular certifications that Indian freshers find valuable
          include AWS Cloud Practitioner, Google Data Analytics, NPTEL courses
          (especially Elite + Gold certificates), Microsoft Azure Fundamentals,
          and HackerRank skill certifications.
        </p>

        {/* Extracurriculars */}
        <h3 className="text-xl font-semibold text-gray-800 mb-3">
          Extracurricular Activities & Achievements
        </h3>
        <p className="text-gray-700 mb-4">
          This section shows you are a well-rounded candidate. Include
          leadership roles in college clubs, hackathon participations and
          placements, competitive programming achievements (CodeChef,
          Codeforces, LeetCode ratings), sports achievements at the university
          or state level, volunteer work, and NCC/NSS participation. Keep it
          concise — 3-5 bullet points maximum.
        </p>
      </section>

      {/* Resume Length */}
      <section className="mb-10">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Resume Length for Freshers: One Page Only
        </h2>
        <p className="text-gray-700 mb-4">
          Your fresher resume must be exactly one page. Not two pages, not one
          and a half. One page. Recruiters at campus placements and entry-level
          job drives review hundreds of resumes. A two-page resume from someone
          with no work experience signals that you cannot prioritize or
          communicate concisely — the opposite of what employers want.
        </p>
        <p className="text-gray-700 mb-4">
          If your resume runs over one page, cut ruthlessly. Remove
          extracurricular activities that are not relevant, reduce your project
          descriptions, trim your coursework list, and tighten your career
          objective. Every line on your resume should earn its place.
        </p>
      </section>

      {/* Common Mistakes */}
      <section className="mb-10">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Common Mistakes Freshers Make
        </h2>

        <div className="space-y-6">
          <div className="border-l-4 border-red-400 pl-4">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">
              Including 10th and 12th Marks When You Have a Degree
            </h3>
            <p className="text-gray-700">
              Once you have a bachelor's degree, your 10th and 12th board exam
              results are irrelevant. They take up valuable space and make your
              resume look like a school application. The only exception is if a
              specific job posting asks for these marks, which is rare outside
              government jobs.
            </p>
          </div>

          <div className="border-l-4 border-red-400 pl-4">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">
              Using "Curriculum Vitae" as the Heading
            </h3>
            <p className="text-gray-700">
              Your resume does not need a title. The recruiter knows it is a
              resume. Writing "Curriculum Vitae" or "Resume" or "Biodata" as a
              heading wastes the most prominent space on your document — the top.
              Use that space for your name and contact information instead.
            </p>
          </div>

          <div className="border-l-4 border-red-400 pl-4">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">
              Vague Objective Statements
            </h3>
            <p className="text-gray-700">
              "Seeking a challenging role in a reputed organization where I can
              utilize my skills and grow professionally" is meaningless. Every
              candidate wants a challenging role. Every candidate wants to grow.
              This tells the recruiter nothing about you. Write a specific
              objective that mentions the role, your degree, and 1-2 concrete
              skills you bring.
            </p>
          </div>

          <div className="border-l-4 border-red-400 pl-4">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">
              Listing Every Technology You Have Heard Of
            </h3>
            <p className="text-gray-700">
              Padding your skills section with technologies you barely know will
              backfire in the interview. If you list "Kubernetes" because you
              watched one YouTube video, and the interviewer asks about pod
              networking, you will be caught. List only skills you can discuss
              and demonstrate confidently.
            </p>
          </div>

          <div className="border-l-4 border-red-400 pl-4">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">
              Using Fancy Formatting and Colors
            </h3>
            <p className="text-gray-700">
              Multi-colored resumes with creative layouts may look impressive on
              your screen, but they often fail ATS parsing and can look
              unprofessional in print. Stick to a clean, professional design
              with a single accent color at most. Let your content do the
              talking, not your graphic design.
            </p>
          </div>

          <div className="border-l-4 border-red-400 pl-4">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">
              Not Proofreading
            </h3>
            <p className="text-gray-700">
              Spelling errors and grammatical mistakes are among the top reasons
              recruiters reject fresher resumes. "Recieved" instead of
              "Received," "Pyhton" instead of "Python," or inconsistent tenses
              across bullet points all signal carelessness. Read your resume
              aloud, have a friend review it, and use a grammar checker before
              submitting.
            </p>
          </div>
        </div>
      </section>

      {/* Quick Reference */}
      <section className="mb-10">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Fresher Resume Quick Reference
        </h2>
        <div className="bg-gray-50 rounded-lg p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold text-green-700 mb-3">
                Do
              </h3>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start gap-2">
                  <span className="text-green-600 font-bold mt-0.5">+</span>
                  <span>Keep it to one page</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600 font-bold mt-0.5">+</span>
                  <span>Lead with education and projects</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600 font-bold mt-0.5">+</span>
                  <span>Use action verbs in bullet points</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600 font-bold mt-0.5">+</span>
                  <span>Quantify project outcomes</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600 font-bold mt-0.5">+</span>
                  <span>Include GitHub or portfolio links</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600 font-bold mt-0.5">+</span>
                  <span>Write a specific career objective</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600 font-bold mt-0.5">+</span>
                  <span>Proofread multiple times</span>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-red-700 mb-3">
                Don't
              </h3>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start gap-2">
                  <span className="text-red-600 font-bold mt-0.5">-</span>
                  <span>Include 10th/12th marks with a degree</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-600 font-bold mt-0.5">-</span>
                  <span>Use "Curriculum Vitae" as a heading</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-600 font-bold mt-0.5">-</span>
                  <span>Write generic objective statements</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-600 font-bold mt-0.5">-</span>
                  <span>List skills you cannot demonstrate</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-600 font-bold mt-0.5">-</span>
                  <span>Use colorful or graphical templates</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-600 font-bold mt-0.5">-</span>
                  <span>Add a photo (unless specifically asked)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-600 font-bold mt-0.5">-</span>
                  <span>Exceed one page</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl p-8 text-center text-white">
        <h2 className="text-2xl font-bold mb-3">
          Build Your Fresher Resume Free — No Login Required
        </h2>
        <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
          DoAide's resume builder has templates designed specifically for
          freshers. Pick a clean, ATS-friendly template, fill in your details,
          and download a professional PDF in minutes. No account creation, no
          watermarks, completely free.
        </p>
        <Link
          to="/"
          className="inline-block bg-white text-blue-700 font-semibold px-8 py-3 rounded-lg hover:bg-blue-50 transition"
        >
          Start Building Your Resume
        </Link>
      </section>
    </div>
  );
}
