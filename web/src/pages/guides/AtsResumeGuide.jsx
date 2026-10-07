import { useEffect } from "react";
import { Link } from "react-router-dom";

export default function AtsResumeGuide() {
  useEffect(() => {
    document.title =
      "ATS-Friendly Resume: Complete Guide for Indian Job Seekers 2026 | DoAide";
  }, []);

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      {/* Hero Section */}
      <section className="mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4 leading-tight">
          ATS-Friendly Resume: Complete Guide for Indian Job Seekers 2026
        </h1>
        <p className="text-lg text-gray-600 mb-6">
          Over 90% of large Indian companies now use Applicant Tracking Systems
          to filter resumes before a human ever reads them. If your resume is not
          ATS-friendly, it gets rejected automatically — no matter how qualified
          you are. This guide shows you exactly how to build a resume that passes
          ATS screening and lands on the recruiter's desk.
        </p>
        <div className="flex flex-wrap gap-4">
          <Link
            to="/ats-checker"
            className="inline-block bg-blue-600 text-white font-semibold px-6 py-3 rounded-lg hover:bg-blue-700 transition"
          >
            Check Your ATS Score Free
          </Link>
          <Link
            to="/?template=ats"
            className="inline-block border-2 border-blue-600 text-blue-600 font-semibold px-6 py-3 rounded-lg hover:bg-blue-50 transition"
          >
            Build an ATS-Optimized Resume
          </Link>
        </div>
      </section>

      {/* What is ATS */}
      <section className="mb-10">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          What Is an Applicant Tracking System (ATS)?
        </h2>
        <p className="text-gray-700 mb-4">
          An Applicant Tracking System is software that companies use to manage
          the hiring process. When you apply for a job online — whether through
          Naukri, LinkedIn, or a company career page — your resume goes into an
          ATS first. The software parses your resume, extracts information like
          your name, skills, experience, and education, and stores it in a
          searchable database.
        </p>
        <p className="text-gray-700 mb-4">
          Recruiters then search this database using keywords, filters, and
          ranking algorithms. If your resume does not parse correctly or does not
          match the keywords, it never appears in the recruiter's search results.
          You are effectively invisible.
        </p>
        <h3 className="text-xl font-semibold text-gray-800 mb-3">
          Which Indian Companies Use ATS?
        </h3>
        <p className="text-gray-700 mb-4">
          Nearly every large Indian employer uses some form of ATS. This includes
          IT giants like TCS, Infosys, Wipro, HCL, and Tech Mahindra.
          Conglomerates like Reliance, Tata Group, Mahindra, and Adani use them
          across their subsidiaries. FMCG companies like Hindustan Unilever
          (HUL), ITC, and Nestle India rely on ATS for volume hiring. Banks like
          HDFC, ICICI, and SBI use them for recruitment drives. Even mid-sized
          companies with 500+ employees increasingly adopt ATS to manage
          applications efficiently.
        </p>
        <h3 className="text-xl font-semibold text-gray-800 mb-3">
          Common ATS Systems in India
        </h3>
        <ul className="list-disc list-inside text-gray-700 space-y-2 mb-4">
          <li>
            <strong>Oracle Taleo</strong> — widely used by Indian IT services
            companies and MNCs with India operations
          </li>
          <li>
            <strong>Workday</strong> — popular among global companies with Indian
            offices, including many Fortune 500 firms
          </li>
          <li>
            <strong>SAP SuccessFactors</strong> — used by large manufacturing,
            pharma, and FMCG companies in India
          </li>
          <li>
            <strong>Naukri RMS (Recruitment Management System)</strong> — built
            by Info Edge, widely used by Indian companies that recruit through
            Naukri.com
          </li>
          <li>
            <strong>iCIMS</strong> — gaining traction among Indian startups and
            mid-sized tech companies
          </li>
          <li>
            <strong>Greenhouse</strong> — preferred by Indian unicorns and
            product companies
          </li>
        </ul>
      </section>

      {/* Why Resumes Get Rejected */}
      <section className="mb-10">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Why Resumes Get Rejected by ATS
        </h2>
        <p className="text-gray-700 mb-4">
          Understanding why ATS rejects resumes is half the battle. Here are the
          most common reasons your resume might never reach a human recruiter:
        </p>

        <h3 className="text-xl font-semibold text-gray-800 mb-3">
          1. Formatting Issues
        </h3>
        <p className="text-gray-700 mb-4">
          ATS software reads your resume as a stream of text. When you use
          tables, multi-column layouts, text boxes, or complex formatting, the
          ATS cannot determine the reading order. Your work experience might get
          mixed with your education, or entire sections might be skipped. Headers
          and footers are another problem — most ATS systems ignore them
          completely. If your contact information is in a header, the ATS has no
          way to reach you.
        </p>

        <h3 className="text-xl font-semibold text-gray-800 mb-3">
          2. Wrong File Type
        </h3>
        <p className="text-gray-700 mb-4">
          While PDF is generally the safest format, some older ATS systems
          struggle with certain types of PDFs — especially image-based PDFs
          created by scanning a printed resume. JPEG and PNG resumes are almost
          never parseable. Word documents (.docx) are widely compatible but can
          render differently across systems. The safest approach is a
          text-layered PDF generated directly from a word processor or resume
          builder.
        </p>

        <h3 className="text-xl font-semibold text-gray-800 mb-3">
          3. Missing Keywords
        </h3>
        <p className="text-gray-700 mb-4">
          ATS systems match your resume against the job description. If the job
          posting asks for "React.js" and your resume says "ReactJS" or just
          "React," some systems will not make the connection. If the posting
          mentions "stakeholder management" and you wrote "client coordination,"
          the ATS may score you lower. Keywords matter enormously.
        </p>

        <h3 className="text-xl font-semibold text-gray-800 mb-3">
          4. Graphics, Icons, and Images
        </h3>
        <p className="text-gray-700 mb-4">
          Skill bars, star ratings, profile photos, company logos, and
          decorative icons look impressive to humans but are invisible to ATS. A
          skill bar showing "Python: 4/5 stars" parses as nothing. The ATS does
          not know you listed Python at all. Similarly, infographic-style
          resumes that use charts to show experience timelines are completely
          unreadable.
        </p>
      </section>

      {/* ATS-Friendly Format Rules */}
      <section className="mb-10">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          ATS-Friendly Resume Format Rules
        </h2>
        <p className="text-gray-700 mb-4">
          Follow these formatting rules to make sure your resume parses
          correctly in every ATS:
        </p>

        <div className="bg-gray-50 rounded-lg p-6 mb-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-3">
            Use Standard Section Headers
          </h3>
          <p className="text-gray-700 mb-3">
            ATS systems look for specific section headers to categorize your
            information. Stick to standard labels:
          </p>
          <ul className="list-disc list-inside text-gray-700 space-y-1">
            <li>
              Use "Work Experience" or "Professional Experience" — not "My
              Journey" or "Career Path"
            </li>
            <li>Use "Education" — not "Academic Background" or "Alma Mater"</li>
            <li>
              Use "Skills" or "Technical Skills" — not "What I Bring" or "My
              Toolkit"
            </li>
            <li>Use "Summary" or "Professional Summary" — not "About Me"</li>
            <li>
              Use "Certifications" — not "Credentials" or "Achievements &
              Certifications"
            </li>
          </ul>
        </div>

        <div className="bg-gray-50 rounded-lg p-6 mb-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-3">
            Avoid Tables, Columns, Headers, and Footers
          </h3>
          <p className="text-gray-700">
            Use a single-column layout with clear section breaks. Do not put any
            information in the document header or footer — many ATS systems
            strip these entirely. Avoid using tables for layout, even invisible
            ones. Do not use text boxes. Stick to standard paragraphs, bullet
            points, and line breaks.
          </p>
        </div>

        <div className="bg-gray-50 rounded-lg p-6 mb-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-3">
            Use Standard Fonts
          </h3>
          <p className="text-gray-700">
            Use widely supported fonts like Arial, Calibri, Times New Roman,
            Garamond, or Helvetica. Avoid decorative fonts, handwriting fonts,
            or custom fonts that might not embed properly in your PDF. Font size
            should be 10-12pt for body text and 14-16pt for headings.
          </p>
        </div>

        <div className="bg-gray-50 rounded-lg p-6 mb-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-3">
            Save as a Text-Layered PDF
          </h3>
          <p className="text-gray-700">
            A text-layered PDF preserves your formatting for human readers while
            keeping the text extractable for ATS. Do not scan a printed resume —
            that creates an image-based PDF that ATS cannot read. Use a resume
            builder like DoAide or export directly from a word processor.
          </p>
        </div>
      </section>

      {/* Keywords Strategy */}
      <section className="mb-10">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Keywords Strategy: How to Match What ATS Looks For
        </h2>

        <h3 className="text-xl font-semibold text-gray-800 mb-3">
          How to Extract Keywords from Job Descriptions
        </h3>
        <p className="text-gray-700 mb-4">
          Read the job description carefully and identify: required skills and
          technologies (e.g., "Java," "Spring Boot," "AWS"), required
          qualifications (e.g., "B.Tech in Computer Science," "MBA in
          Marketing"), job-specific terms (e.g., "Agile," "Scrum,"
          "stakeholder management," "P&L ownership"), and tools mentioned (e.g.,
          "Jira," "Tableau," "SAP"). Pay special attention to skills listed
          under "Required" versus "Preferred" — the required ones carry more
          weight.
        </p>

        <h3 className="text-xl font-semibold text-gray-800 mb-3">
          Where to Place Keywords
        </h3>
        <p className="text-gray-700 mb-4">
          Place your most important keywords in multiple locations: the
          Professional Summary (top of resume, highest visibility), the Skills
          section (as a consolidated list), and naturally within your Work
          Experience bullet points. Do not stuff keywords artificially — ATS
          systems are increasingly sophisticated and some flag keyword stuffing.
          Use the keywords in context, describing actual work you did.
        </p>

        <h3 className="text-xl font-semibold text-gray-800 mb-3">
          How to Match Skills Accurately
        </h3>
        <p className="text-gray-700 mb-4">
          Use the exact phrasing from the job description. If the job says
          "machine learning," write "machine learning" — not "ML" alone. Include
          both the abbreviation and the full form where possible: "Search Engine
          Optimization (SEO)" covers both variants. For programming languages,
          include the version if specified: "Python 3" or "Java 17." For
          certifications, use the official name: "AWS Certified Solutions
          Architect - Associate" rather than just "AWS certification."
        </p>
      </section>

      {/* Sections ATS Looks For */}
      <section className="mb-10">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          The Five Sections Every ATS Expects
        </h2>

        <h3 className="text-xl font-semibold text-gray-800 mb-3">
          1. Contact Information
        </h3>
        <p className="text-gray-700 mb-4">
          Place your full name, phone number, email address, LinkedIn URL, and
          city at the very top of your resume in the main body — never in a
          header. Use a professional email address. Include your city and state
          because many ATS systems filter by location.
        </p>

        <h3 className="text-xl font-semibold text-gray-800 mb-3">
          2. Professional Summary
        </h3>
        <p className="text-gray-700 mb-4">
          A 2-3 sentence summary at the top that includes your years of
          experience, core domain, and key skills. This is prime real estate for
          keywords. Example: "Software Engineer with 5 years of experience in
          full-stack web development using React.js, Node.js, and PostgreSQL.
          Delivered scalable microservices for fintech platforms serving 2M+
          users."
        </p>

        <h3 className="text-xl font-semibold text-gray-800 mb-3">
          3. Work Experience
        </h3>
        <p className="text-gray-700 mb-4">
          List in reverse chronological order. For each role, include: job
          title, company name, location, and dates (MM/YYYY format). Use bullet
          points starting with action verbs. Quantify achievements wherever
          possible — "Reduced API response time by 40%" is far stronger than
          "Improved API performance."
        </p>

        <h3 className="text-xl font-semibold text-gray-800 mb-3">
          4. Education
        </h3>
        <p className="text-gray-700 mb-4">
          Include degree name, institution, location, and graduation year. For
          recent graduates, add GPA if it is 7.0+ (on a 10-point scale) or 3.0+
          (on a 4-point scale). Mention relevant coursework only if you lack
          work experience in that area.
        </p>

        <h3 className="text-xl font-semibold text-gray-800 mb-3">
          5. Skills
        </h3>
        <p className="text-gray-700 mb-4">
          A clean, comma-separated or bulleted list of technical and
          professional skills. Group them logically: "Programming Languages:
          Java, Python, JavaScript" and "Databases: MySQL, PostgreSQL, MongoDB."
          This section is one of the first things ATS scans for keyword matches.
        </p>
      </section>

      {/* Common Mistakes */}
      <section className="mb-10">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Common ATS Mistakes Indian Job Seekers Make
        </h2>

        <div className="space-y-6">
          <div className="border-l-4 border-red-400 pl-4">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">
              Using Naukri's Default Resume Format
            </h3>
            <p className="text-gray-700">
              Naukri generates a resume from your profile, but this
              auto-generated format often includes non-standard section headers,
              odd formatting, and redundant information. It is better than
              nothing, but it is not optimized. Always upload a custom-built
              resume rather than relying on the Naukri-generated version.
            </p>
          </div>

          <div className="border-l-4 border-red-400 pl-4">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">
              Using Fancy Templates from Canva
            </h3>
            <p className="text-gray-700">
              Canva templates look beautiful — colorful sidebars, skill bars,
              icons, multi-column layouts. But they are designed for visual
              impact, not ATS parsing. Most Canva resume templates will score
              poorly in ATS because they rely heavily on graphics and
              non-standard layouts. Save Canva templates for situations where you
              are handing your resume directly to a person.
            </p>
          </div>

          <div className="border-l-4 border-red-400 pl-4">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">
              Putting Contact Info in Headers
            </h3>
            <p className="text-gray-700">
              Many resume templates — including popular ones in Microsoft Word —
              place your name, email, and phone number in the document header.
              This looks clean but most ATS systems ignore header content
              entirely. Your contact details simply vanish. Always place contact
              information in the main body of the document.
            </p>
          </div>

          <div className="border-l-4 border-red-400 pl-4">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">
              Using a Single Resume for Every Application
            </h3>
            <p className="text-gray-700">
              Each job description uses different keywords. A resume optimized
              for a "Full Stack Developer" role at one company may not match the
              keywords for a "Software Engineer" role at another, even if the
              actual work is identical. Tailor your resume's summary and skills
              section for each application.
            </p>
          </div>

          <div className="border-l-4 border-red-400 pl-4">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">
              Including a Photo
            </h3>
            <p className="text-gray-700">
              While attaching a passport-size photo is common in India,
              especially for government and PSU applications, photos confuse ATS
              parsing. Unless the application specifically requests a photo,
              leave it out of your resume.
            </p>
          </div>
        </div>
      </section>

      {/* Testing Your Resume */}
      <section className="mb-10">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Testing Your Resume for ATS Compatibility
        </h2>
        <p className="text-gray-700 mb-4">
          Before you submit your resume, test it. Here is a quick manual check
          you can do: open your resume PDF, press Ctrl+A (select all), then
          Ctrl+C (copy), and paste it into a plain text editor like Notepad. If
          all your text appears in the correct order and nothing is missing, your
          resume is likely ATS-parseable. If text is jumbled, duplicated, or
          missing, the ATS will have the same problem.
        </p>
        <p className="text-gray-700 mb-4">
          For a more thorough check, use DoAide's free ATS Resume Score Checker.
          It analyzes your resume against common ATS parsing rules and gives you
          a score along with specific suggestions for improvement. You can also
          compare your resume against a specific job description to see how well
          your keywords match.
        </p>
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 text-center">
          <p className="text-blue-800 font-semibold text-lg mb-3">
            Want to know how your resume scores?
          </p>
          <Link
            to="/ats-checker"
            className="inline-block bg-blue-600 text-white font-semibold px-6 py-3 rounded-lg hover:bg-blue-700 transition"
          >
            Check Your ATS Score Free
          </Link>
        </div>
      </section>

      {/* Quick Checklist */}
      <section className="mb-10">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          ATS Resume Checklist
        </h2>
        <div className="bg-gray-50 rounded-lg p-6">
          <ul className="space-y-3 text-gray-700">
            <li className="flex items-start gap-2">
              <span className="text-green-600 font-bold mt-0.5">--</span>
              <span>Single-column layout with no tables or text boxes</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-600 font-bold mt-0.5">--</span>
              <span>Contact info in the document body, not in a header or footer</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-600 font-bold mt-0.5">--</span>
              <span>Standard section headers (Work Experience, Education, Skills)</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-600 font-bold mt-0.5">--</span>
              <span>No graphics, icons, skill bars, or images</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-600 font-bold mt-0.5">--</span>
              <span>Standard font (Arial, Calibri, Times New Roman) at 10-12pt</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-600 font-bold mt-0.5">--</span>
              <span>Saved as a text-layered PDF (not a scanned image)</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-600 font-bold mt-0.5">--</span>
              <span>Keywords from the job description included naturally</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-600 font-bold mt-0.5">--</span>
              <span>Dates in a consistent format (MM/YYYY)</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-600 font-bold mt-0.5">--</span>
              <span>No special characters or unicode symbols</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-600 font-bold mt-0.5">--</span>
              <span>Passes the copy-paste-to-Notepad test</span>
            </li>
          </ul>
        </div>
      </section>

      {/* Final CTA */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl p-8 text-center text-white">
        <h2 className="text-2xl font-bold mb-3">
          Build Your ATS-Optimized Resume Now
        </h2>
        <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
          DoAide's resume builder uses ATS-friendly templates by default. Every
          resume you create is formatted for maximum ATS compatibility — clean
          layout, standard sections, proper heading hierarchy, and text-layered
          PDF export. No signup required.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Link
            to="/?template=ats"
            className="inline-block bg-white text-blue-700 font-semibold px-6 py-3 rounded-lg hover:bg-blue-50 transition"
          >
            Build an ATS-Optimized Resume
          </Link>
          <Link
            to="/ats-checker"
            className="inline-block border-2 border-white text-white font-semibold px-6 py-3 rounded-lg hover:bg-blue-800 transition"
          >
            Check Your ATS Score Free
          </Link>
        </div>
      </section>
    </div>
  );
}
