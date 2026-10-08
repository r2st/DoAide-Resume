import { useEffect } from 'react';
import { Link } from 'react-router-dom';

const FORMATS = [
  { name: 'Functional', best: 'Freshers with no work experience', desc: 'Groups qualifications by skill area. Education and projects come first.' },
  { name: 'Combination', best: 'Freshers with internships', desc: 'Leads with skills, then lists internships chronologically.' },
  { name: 'Chronological', best: 'Experienced professionals', desc: 'Lists work experience in reverse order. Not ideal for freshers.' },
];

const SECTIONS = [
  { title: 'Contact Information', tip: 'Full name, phone, professional email, LinkedIn URL, city. No photo unless the company specifically asks.' },
  { title: 'Career Objective', tip: 'Two to three sentences. Mention your degree, one key skill, and what you bring to the role. Avoid generic lines like "seeking a challenging position".' },
  { title: 'Education', tip: 'Degree, university, graduation year, CGPA/percentage. Mention relevant coursework only if it directly supports the job you are applying for.' },
  { title: 'Projects', tip: 'Two to three academic or personal projects. For each: title, tech stack, one-line description, and a quantified outcome.' },
  { title: 'Technical Skills', tip: 'Group by category: Programming Languages, Frameworks, Tools, Databases. List only skills you can confidently discuss in an interview.' },
  { title: 'Internships', tip: 'Company, role, duration, and two bullet points starting with action verbs. Even a 1-month internship counts.' },
  { title: 'Certifications', tip: 'Include NPTEL, Coursera, AWS, Google certifications with the issuing body and year.' },
  { title: 'Extracurriculars', tip: 'Leadership roles, hackathon wins, volunteering. Show initiative beyond academics.' },
];

const MISTAKES = [
  'Using a colourful or overly designed template that fails ATS parsing',
  'Writing "Curriculum Vitae" or "Resume" as the heading instead of your name',
  'Including a photograph unless the job explicitly asks for one',
  'Listing every skill from your syllabus instead of relevant ones',
  'Using a generic career objective copied from the internet',
  'Making the resume longer than one page',
  'Using an unprofessional email address',
  'Mentioning "References available on request" — it is assumed',
];

const FAQ_ITEMS = [
  { q: 'What is the best resume format for freshers in India in 2026?', a: 'The functional or combination format works best for freshers. It highlights education, projects, and skills over work experience, which most freshers lack.' },
  { q: 'Should a fresher resume be one page or two?', a: 'Strictly one page. Recruiters in India spend 6-10 seconds on a fresher resume. A concise, well-structured one-page resume is more effective than a two-page one.' },
  { q: 'Do I need a career objective on my resume?', a: 'Yes, a targeted 2-3 sentence objective helps recruiters quickly understand your profile. Avoid generic objectives — tailor it to each job.' },
  { q: 'Should I include my 10th and 12th marks?', a: 'Only if you graduated recently (within 1-2 years) or if the company specifically asks. For experienced candidates, it is unnecessary.' },
  { q: 'Is a photo required on an Indian resume?', a: 'No. Most Indian companies do not expect a photo. Including one can also cause ATS parsing issues.' },
  { q: 'How do I make my fresher resume ATS-friendly?', a: 'Use a clean, single-column format. Avoid tables, images, and headers/footers. Use standard section headings. Save as PDF. Our ATS-Friendly template handles all of this.' },
];

export default function BestResumeFormatFreshers2026() {
  useEffect(() => {
    document.title = 'Best Resume Format for Freshers in India 2026 — Complete Guide | DoAide';
    const meta = document.querySelector('meta[name="description"]');
    if (meta) meta.content = 'Complete guide to the best resume format for freshers in India 2026. Section-by-section breakdown, ATS tips, common mistakes, and free templates.';

    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.textContent = JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: 'Best Resume Format for Freshers in India 2026',
      description: 'Complete guide to the best resume format for freshers in India 2026 with free templates.',
      author: { '@type': 'Organization', name: 'DoAide' },
      datePublished: '2026-01-15',
      dateModified: '2026-10-08',
      publisher: { '@type': 'Organization', name: 'DoAide', url: 'https://resume.doaide.com' },
    });
    document.head.appendChild(script);
    return () => script.remove();
  }, []);

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <section className="mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4 leading-tight">
          Best Resume Format for Freshers in India 2026
        </h1>
        <p className="text-lg text-gray-600 mb-6">
          Your resume is the first impression a recruiter gets. For freshers in India — whether you are a 2026 engineering graduate,
          a BCA/MCA student, or a commerce graduate — the right format can make the difference between getting shortlisted and getting
          ignored. This guide covers the exact format Indian recruiters and ATS systems prefer, with a section-by-section breakdown.
        </p>
        <div className="flex flex-wrap gap-3">
          <Link to="/" className="inline-block bg-blue-600 text-white font-semibold px-6 py-3 rounded-lg hover:bg-blue-700 transition">
            Build Your Resume Free
          </Link>
          <Link to="/ats-checker" className="inline-block bg-gray-100 text-gray-700 font-semibold px-6 py-3 rounded-lg hover:bg-gray-200 transition">
            Check ATS Score
          </Link>
        </div>
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Which Resume Format Should Freshers Use?</h2>
        <p className="text-gray-700 mb-4">
          There are three main resume formats. Not all are equally effective for freshers.
        </p>
        <div className="overflow-x-auto">
          <table className="w-full border border-gray-200 text-sm mb-4">
            <thead>
              <tr className="bg-gray-50">
                <th className="border border-gray-200 px-4 py-2 text-left text-gray-800">Format</th>
                <th className="border border-gray-200 px-4 py-2 text-left text-gray-800">Best For</th>
                <th className="border border-gray-200 px-4 py-2 text-left text-gray-800">Description</th>
              </tr>
            </thead>
            <tbody>
              {FORMATS.map((f) => (
                <tr key={f.name}>
                  <td className="border border-gray-200 px-4 py-2 font-medium text-gray-800">{f.name}</td>
                  <td className="border border-gray-200 px-4 py-2 text-gray-600">{f.best}</td>
                  <td className="border border-gray-200 px-4 py-2 text-gray-600">{f.desc}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-gray-700">
          <strong>Verdict:</strong> If you have no internship experience, use the <strong>functional format</strong>.
          If you have done at least one internship, the <strong>combination format</strong> is ideal. Our Fresher template
          is built on the combination format and works with all major ATS systems.
        </p>
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Section-by-Section Breakdown</h2>
        <p className="text-gray-700 mb-4">
          Here is exactly what to include in each section of your fresher resume, in the recommended order:
        </p>
        <div className="space-y-4">
          {SECTIONS.map((s, i) => (
            <div key={i} className="bg-white border border-gray-200 rounded-lg p-4">
              <h3 className="font-semibold text-gray-800 mb-1">{i + 1}. {s.title}</h3>
              <p className="text-sm text-gray-600">{s.tip}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">ATS Compatibility Tips</h2>
        <p className="text-gray-700 mb-4">
          Over 75% of large Indian companies — including TCS, Infosys, Wipro, HCL, and startups using Lever or Greenhouse — use
          Applicant Tracking Systems. If your resume is not ATS-friendly, it never reaches a human reviewer.
        </p>
        <ul className="list-disc list-inside text-gray-700 space-y-2">
          <li>Use a single-column layout with standard headings (Education, Skills, Experience)</li>
          <li>Avoid tables, text boxes, images, and multi-column layouts</li>
          <li>Use a standard font: Arial, Calibri, or Times New Roman</li>
          <li>Save as PDF — it preserves formatting across devices</li>
          <li>Include keywords from the job description naturally in your content</li>
          <li>Do not put important information in headers or footers — ATS often skips them</li>
        </ul>
        <p className="text-gray-700 mt-4">
          Use our <Link to="/ats-checker" className="text-blue-600 hover:underline">free ATS Score Checker</Link> to verify your resume before applying.
        </p>
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Common Mistakes Freshers Make</h2>
        <ol className="list-decimal list-inside text-gray-700 space-y-2">
          {MISTAKES.map((m, i) => (
            <li key={i}>{m}</li>
          ))}
        </ol>
      </section>

      <section className="mb-10 bg-blue-50 border border-blue-200 rounded-xl p-6">
        <h2 className="text-xl font-bold text-blue-900 mb-3">Sample Career Objective for Freshers</h2>
        <div className="space-y-3">
          <div className="bg-white rounded-lg p-4 border border-blue-100">
            <p className="text-sm font-medium text-gray-500 mb-1">B.Tech Computer Science Graduate</p>
            <p className="text-gray-700 italic">
              "Detail-oriented Computer Science graduate from VIT University with hands-on experience in Python, React, and AWS
              through three academic projects and a summer internship. Seeking a software development role where I can apply my
              full-stack skills and contribute to building scalable products."
            </p>
          </div>
          <div className="bg-white rounded-lg p-4 border border-blue-100">
            <p className="text-sm font-medium text-gray-500 mb-1">BBA Graduate</p>
            <p className="text-gray-700 italic">
              "BBA graduate from Christ University with strong analytical skills developed through a market research internship
              at Deloitte. Proficient in Excel, SQL, and Tableau. Looking to start my career in business analytics where I can
              turn data into actionable insights."
            </p>
          </div>
        </div>
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h2>
        <div className="space-y-4">
          {FAQ_ITEMS.map((faq) => (
            <div key={faq.q} className="bg-white border border-gray-200 rounded-lg p-4">
              <h3 className="font-semibold text-gray-800 mb-1">{faq.q}</h3>
              <p className="text-sm text-gray-600">{faq.a}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="text-center mt-12 mb-8 bg-gradient-to-br from-blue-600 to-blue-700 text-white rounded-xl p-8">
        <h2 className="text-2xl font-bold mb-3">Ready to Build Your Resume?</h2>
        <p className="text-blue-100 mb-4">Choose the Fresher template, fill in your details, and download a recruiter-ready PDF in minutes.</p>
        <Link to="/" className="inline-block bg-white text-blue-700 font-semibold px-8 py-3 rounded-lg hover:bg-blue-50 transition">
          Start Building — It's Free
        </Link>
      </section>
    </div>
  );
}
