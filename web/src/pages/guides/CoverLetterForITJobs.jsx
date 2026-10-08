import { useEffect } from 'react';
import { Link } from 'react-router-dom';

const STRUCTURE = [
  { heading: 'Opening Paragraph', content: 'State the role, where you found it, and a one-line hook — your strongest relevant qualification. Hiring managers read hundreds of letters; the first sentence decides if they read the rest.' },
  { heading: 'Technical Qualifications', content: 'Mention your tech stack (languages, frameworks, cloud platforms) and tie them to the job requirements. Do not just list skills — show how you used them. "Built a microservices backend in Go serving 50K RPM" is stronger than "Proficient in Go".' },
  { heading: 'Key Achievement', content: 'Pick one or two quantified achievements. Reduced API latency by 40%. Led migration from monolith to microservices. Shipped a feature that increased user retention by 15%. Numbers give the hiring manager evidence, not claims.' },
  { heading: 'Culture Fit / Why This Company', content: 'Show you researched the company. Reference their tech blog, open-source projects, or a product you admire. "I have been following your engineering blog on distributed systems and I am excited about the challenges your team tackles" beats "I want to join a reputed company".' },
  { heading: 'Closing', content: 'Express enthusiasm, mention your availability, and include a call to action. Keep it one to two sentences. Do not repeat what you already said.' },
];

const DOS = [
  'Tailor the letter for each company — mention their product, tech stack, or a recent engineering blog post',
  'Quantify your impact with numbers: performance improvements, users served, uptime maintained',
  'Keep it to one page (250-350 words) — recruiters do not read long cover letters',
  'Match keywords from the job description naturally',
  'Use a professional tone — confident but not arrogant',
  'Proofread for technical accuracy — a misspelled framework name signals carelessness',
];

const DONTS = [
  'Copy-paste a generic letter for every application',
  'List your entire tech stack without context — this is not a resume skills section',
  'Write "Dear Sir/Madam" when the hiring manager name is available on LinkedIn',
  'Explain why you are leaving your current company — save that for the interview',
  'Include salary expectations unless the job posting asks for them',
  'Use buzzwords like "synergy", "paradigm shift", or "ninja developer"',
];

const ROLES = [
  {
    role: 'Frontend Developer',
    hook: 'In my current role, I built a React-based design system used across 12 products, reducing UI inconsistencies by 60% and cutting frontend development time by 30%.',
  },
  {
    role: 'Backend Engineer',
    hook: 'I designed and maintained a Node.js/PostgreSQL API layer handling 100K daily requests with 99.95% uptime across three availability zones.',
  },
  {
    role: 'DevOps / SRE',
    hook: 'I implemented a CI/CD pipeline using GitHub Actions and Terraform that reduced deployment time from 45 minutes to under 8 minutes and eliminated manual configuration drift.',
  },
  {
    role: 'Data Engineer',
    hook: 'I built and optimized a Spark-based ETL pipeline processing 2TB of daily clickstream data, reducing pipeline runtime by 55% and saving ₹12L in annual compute costs.',
  },
  {
    role: 'Full Stack Developer',
    hook: 'I shipped an end-to-end feature — from database schema to React UI — that automated client onboarding, reducing the process from 3 days to 20 minutes.',
  },
];

const FAQ_ITEMS = [
  { q: 'Do IT companies in India actually read cover letters?', a: 'Product companies and startups often do, especially for mid-to-senior roles. Service companies (TCS, Infosys) rely more on the resume and aptitude tests. When in doubt, include one — it never hurts.' },
  { q: 'Should I mention my notice period in the cover letter?', a: 'Only if the job posting asks for it or if you are immediately available (which is a selling point). Otherwise, save it for the interview.' },
  { q: 'Can I use the same cover letter for different IT roles?', a: 'No. At minimum, change the company name, the role, and the key achievement paragraph. Ideally, tailor the entire technical qualifications section to match the job description.' },
  { q: 'Should freshers write a cover letter for IT jobs?', a: 'Yes. A well-written cover letter compensates for a thin resume. Highlight academic projects, hackathon wins, open-source contributions, or certifications.' },
  { q: 'What format should the cover letter be in?', a: 'Plain text in the email body or a single-page PDF attachment. Avoid Word documents as formatting can break across systems.' },
];

export default function CoverLetterForITJobs() {
  useEffect(() => {
    document.title = 'How to Write a Cover Letter for IT Jobs in India 2026 | DoAide';
    const meta = document.querySelector('meta[name="description"]');
    if (meta) meta.content = 'Step-by-step guide to writing a cover letter for IT and software engineering jobs in India. Includes structure, examples for 5 roles, and common mistakes.';

    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.textContent = JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: 'How to Write a Cover Letter for IT Jobs in India 2026',
      description: 'Step-by-step guide to writing a cover letter for IT jobs with role-specific examples.',
      author: { '@type': 'Organization', name: 'DoAide' },
      datePublished: '2026-01-20',
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
          How to Write a Cover Letter for IT Jobs in India (2026)
        </h1>
        <p className="text-lg text-gray-600 mb-6">
          A strong cover letter can be the difference between your resume being read or skipped. For software developers,
          DevOps engineers, data engineers, and other IT professionals in India, the cover letter is your chance to go beyond
          the bullet points on your resume and show the hiring manager why you are the right fit — technically and culturally.
        </p>
        <div className="flex flex-wrap gap-3">
          <Link to="/cover-letter" className="inline-block bg-emerald-600 text-white font-semibold px-6 py-3 rounded-lg hover:bg-emerald-700 transition">
            Generate Your Cover Letter
          </Link>
          <Link to="/" className="inline-block bg-gray-100 text-gray-700 font-semibold px-6 py-3 rounded-lg hover:bg-gray-200 transition">
            Build Resume
          </Link>
        </div>
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Cover Letter Structure for IT Roles</h2>
        <p className="text-gray-700 mb-4">
          An effective IT cover letter follows a clear five-paragraph structure. Each paragraph has a specific job:
        </p>
        <div className="space-y-4">
          {STRUCTURE.map((s, i) => (
            <div key={i} className="bg-white border border-gray-200 rounded-lg p-4">
              <h3 className="font-semibold text-gray-800 mb-1">{i + 1}. {s.heading}</h3>
              <p className="text-sm text-gray-600">{s.content}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Role-Specific Opening Lines</h2>
        <p className="text-gray-700 mb-4">
          The opening hook should immediately signal your relevance. Here are proven examples for common IT roles:
        </p>
        <div className="space-y-3">
          {ROLES.map((r) => (
            <div key={r.role} className="bg-gray-50 border border-gray-200 rounded-lg p-4">
              <p className="text-sm font-semibold text-blue-700 mb-1">{r.role}</p>
              <p className="text-gray-700 italic text-sm">"{r.hook}"</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Do's and Don'ts</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-green-50 border border-green-200 rounded-xl p-5">
            <h3 className="font-semibold text-green-800 mb-3">Do</h3>
            <ul className="text-sm text-green-700 space-y-2">
              {DOS.map((d, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="text-green-500 mt-0.5">&#10003;</span>
                  <span>{d}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-red-50 border border-red-200 rounded-xl p-5">
            <h3 className="font-semibold text-red-800 mb-3">Don't</h3>
            <ul className="text-sm text-red-700 space-y-2">
              {DONTS.map((d, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="text-red-500 mt-0.5">&#10007;</span>
                  <span>{d}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="mb-10 bg-blue-50 border border-blue-200 rounded-xl p-6">
        <h2 className="text-xl font-bold text-blue-900 mb-3">Full Example: Senior React Developer</h2>
        <div className="bg-white rounded-lg p-5 border border-blue-100 text-sm text-gray-700 space-y-3 leading-relaxed">
          <p>Dear Priya,</p>
          <p>
            I am writing to apply for the Senior React Developer position at Razorpay, which I found on your careers page.
            With 5 years of experience building high-performance web applications in React and TypeScript, I am confident
            I can contribute to the frontend engineering team that powers India's leading payments infrastructure.
          </p>
          <p>
            At my current role at Flipkart, I led the rebuild of the seller dashboard from a jQuery monolith to a
            React/Redux application, improving page load times by 65% and reducing frontend bugs by 40%. I also built
            a shared component library adopted by 8 product teams, which eliminated 2,000+ lines of duplicate code.
          </p>
          <p>
            I have been following Razorpay's engineering blog, particularly the articles on your micro-frontend
            architecture and the challenges of building real-time payment UIs. These are exactly the kinds of
            problems I enjoy solving. I am excited about the opportunity to work on products used by millions
            of Indian businesses.
          </p>
          <p>
            I would welcome the chance to discuss how my experience can add value to Razorpay. I am available to start
            with a 30-day notice period. Thank you for your consideration.
          </p>
          <p>Best regards,<br />Arjun Mehta<br />arjun.mehta@email.com<br />+91 98765 43210</p>
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

      <section className="text-center mt-12 mb-8 bg-gradient-to-br from-emerald-600 to-emerald-700 text-white rounded-xl p-8">
        <h2 className="text-2xl font-bold mb-3">Generate Your IT Cover Letter</h2>
        <p className="text-emerald-100 mb-4">Use our free IT Professional template. Fill in your details, select the IT template, and download in seconds.</p>
        <Link to="/cover-letter" className="inline-block bg-white text-emerald-700 font-semibold px-8 py-3 rounded-lg hover:bg-emerald-50 transition">
          Generate Cover Letter — Free
        </Link>
      </section>
    </div>
  );
}
