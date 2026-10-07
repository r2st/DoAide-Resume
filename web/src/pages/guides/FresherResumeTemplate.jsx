import { useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function FresherResumeTemplate() {
  useEffect(() => {
    document.title = 'Fresher Resume Template 2026: Free Download & Examples | DoAide';
    const meta = document.querySelector('meta[name="description"]');
    if (meta) {
      meta.content = 'Download free fresher resume templates for 2026. ATS-friendly formats for B.Tech, MBA, BCA, and other graduates. No login required.';
    }

    let script = document.getElementById('json-ld-seo');
    if (!script) {
      script = document.createElement('script');
      script.id = 'json-ld-seo';
      script.type = 'application/ld+json';
      document.head.appendChild(script);
    }
    script.textContent = JSON.stringify([
      {
        '@context': 'https://schema.org',
        '@type': 'Article',
        'headline': 'Fresher Resume Template 2026: Free Download & Examples',
        'description': 'Free fresher resume templates for Indian graduates.',
        'url': 'https://resume.doaide.com/guides/fresher-resume-template',
      },
      {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        'mainEntity': [
          { '@type': 'Question', 'name': 'What should a fresher include in their resume?', 'acceptedAnswer': { '@type': 'Answer', 'text': 'A fresher resume should include: contact information, career objective, education (with CGPA/percentage), academic projects, internships (if any), technical and soft skills, certifications, and extracurricular activities. Lead with education and skills since you lack work experience.' } },
          { '@type': 'Question', 'name': 'How long should a fresher resume be?', 'acceptedAnswer': { '@type': 'Answer', 'text': 'A fresher resume should be strictly one page. Recruiters spend an average of 6-7 seconds scanning a resume, and a concise one-page format ensures all your key information is visible at a glance.' } },
          { '@type': 'Question', 'name': 'Should freshers include a career objective?', 'acceptedAnswer': { '@type': 'Answer', 'text': 'Yes, a 2-3 line career objective is recommended for freshers. It tells the recruiter what role you are targeting and what value you bring. Avoid generic objectives — tailor it to each job application.' } },
        ],
      },
    ]);
    return () => { if (script.parentNode) script.parentNode.removeChild(script); };
  }, []);

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <section className="mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4 leading-tight">
          Fresher Resume Template 2026: Free Download & Examples
        </h1>
        <p className="text-lg text-gray-600 mb-6">
          Your first resume is the hardest to write. You have no professional experience,
          and every template online seems built for someone with 10 years in the industry.
          We have built fresher-specific templates that highlight what you do have —
          education, projects, skills, and certifications — in a format that recruiters
          and ATS systems love.
        </p>
        <Link to="/" className="inline-block bg-blue-600 text-white font-semibold px-6 py-3 rounded-lg hover:bg-blue-700 transition">
          Create Your Fresher Resume Free
        </Link>
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">What Makes a Good Fresher Resume?</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {[
            { title: "One Page Only", desc: "Never exceed one page. Recruiters spend 6 seconds scanning — every word must earn its place." },
            { title: "Education First", desc: "Lead with your degree, university, CGPA/percentage, and relevant coursework. This is your strongest section." },
            { title: "Projects Over Experience", desc: "Academic and personal projects are your work experience. Describe what you built, technologies used, and results achieved." },
            { title: "Quantify Everything", desc: "Instead of 'good communication skills', write 'presented project to 50+ students' or 'led a team of 4 for college fest'." },
            { title: "ATS-Friendly Format", desc: "Use a clean, single-column layout with standard headings. No tables, graphics, or fancy fonts that ATS cannot parse." },
            { title: "Targeted Objective", desc: "Write a 2-line career objective tailored to each job. Generic objectives like 'seeking a challenging position' hurt you." },
          ].map((item, idx) => (
            <div key={idx} className="p-4 bg-white border border-gray-200 rounded-xl shadow-sm">
              <h3 className="font-semibold text-gray-800 mb-1">{item.title}</h3>
              <p className="text-sm text-gray-600">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Fresher Resume Structure</h2>
        <p className="text-gray-700 mb-4">
          Follow this section order for maximum impact as a fresher:
        </p>
        <div className="space-y-3">
          {[
            { section: "1. Contact Information", content: "Full name, email, phone number, LinkedIn URL, city. No photo, no date of birth, no father's name." },
            { section: "2. Career Objective", content: "2-3 lines stating your target role and what you bring. Tailor it to each application." },
            { section: "3. Education", content: "Degree, university, year, CGPA/percentage. Include relevant coursework and academic achievements." },
            { section: "4. Projects", content: "2-3 academic or personal projects. Include: project name, tech stack, what you built, and measurable outcome." },
            { section: "5. Internships", content: "If you have any, list them with company name, duration, role, and key contributions." },
            { section: "6. Skills", content: "Technical skills (programming languages, tools, frameworks) and soft skills. List only skills you can demonstrate." },
            { section: "7. Certifications", content: "Relevant online courses, certifications, and workshops. Include the issuing authority." },
            { section: "8. Extracurriculars", content: "Leadership roles, college clubs, sports, volunteering. Shows personality beyond academics." },
          ].map((item, idx) => (
            <div key={idx} className="flex gap-3 p-4 bg-gray-50 rounded-xl">
              <span className="flex-shrink-0 w-8 h-8 bg-blue-100 text-blue-700 rounded-full flex items-center justify-center text-sm font-bold">
                {idx + 1}
              </span>
              <div>
                <h3 className="font-semibold text-gray-800">{item.section}</h3>
                <p className="text-sm text-gray-600">{item.content}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Templates by Degree</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            { degree: "B.Tech / B.E.", focus: "Technical projects, coding skills, hackathons, GitHub profile. Lead with tech stack.", color: "blue" },
            { degree: "MBA", focus: "Case competitions, summer internship, leadership roles, business certifications.", color: "green" },
            { degree: "BCA / MCA", focus: "Software projects, database skills, web development, IT certifications.", color: "purple" },
            { degree: "B.Com / M.Com", focus: "Tally, accounting software skills, CA articleship, Excel proficiency.", color: "amber" },
            { degree: "BA / MA", focus: "Research projects, publications, language skills, writing samples.", color: "pink" },
            { degree: "B.Sc / M.Sc", focus: "Lab projects, research papers, analytical tools, domain expertise.", color: "teal" },
          ].map((item) => (
            <div key={item.degree} className={`p-4 bg-${item.color === 'teal' ? 'cyan' : item.color}-50 rounded-xl border border-${item.color === 'teal' ? 'cyan' : item.color}-100`}>
              <h3 className="font-bold text-gray-800 mb-1">{item.degree}</h3>
              <p className="text-sm text-gray-600">{item.focus}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Mistakes Freshers Make</h2>
        <div className="space-y-3">
          {[
            "Using a generic career objective copied from the internet",
            "Listing 'MS Office' as a primary skill when applying for tech roles",
            "Including school (10th/12th) marks prominently when you have a degree",
            "Writing 'References available upon request' — it wastes space and is assumed",
            "Using colourful or creative templates that ATS systems cannot parse",
            "Listing hobbies like 'listening to music' and 'watching movies'",
          ].map((mistake, idx) => (
            <div key={idx} className="flex items-start gap-3 p-3 bg-red-50 rounded-lg">
              <span className="text-red-500 font-bold text-sm mt-0.5">✕</span>
              <span className="text-sm text-gray-700">{mistake}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
        <div className="space-y-4">
          <div className="p-4 bg-gray-50 rounded-xl">
            <h3 className="font-semibold text-gray-800 mb-1">What should a fresher include in their resume?</h3>
            <p className="text-sm text-gray-600">Contact info, career objective, education with CGPA, academic projects, internships, technical and soft skills, certifications, and extracurriculars.</p>
          </div>
          <div className="p-4 bg-gray-50 rounded-xl">
            <h3 className="font-semibold text-gray-800 mb-1">How long should a fresher resume be?</h3>
            <p className="text-sm text-gray-600">Strictly one page. Recruiters spend 6-7 seconds scanning a resume — keep it concise.</p>
          </div>
          <div className="p-4 bg-gray-50 rounded-xl">
            <h3 className="font-semibold text-gray-800 mb-1">Should freshers include a career objective?</h3>
            <p className="text-sm text-gray-600">Yes, a tailored 2-3 line objective helps recruiters understand what role you are targeting and what value you bring.</p>
          </div>
        </div>
      </section>

      <section className="bg-blue-50 border border-blue-200 rounded-2xl p-8 text-center">
        <h2 className="text-2xl font-bold text-blue-900 mb-3">Create Your Fresher Resume Now</h2>
        <p className="text-blue-700 mb-6">Our free builder has templates designed specifically for freshers and recent graduates.</p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/" className="inline-block bg-blue-600 text-white font-semibold px-6 py-3 rounded-lg hover:bg-blue-700 transition">
            Build Resume Free
          </Link>
          <Link to="/ats-checker" className="inline-block bg-white text-blue-600 font-semibold px-6 py-3 rounded-lg border border-blue-300 hover:bg-blue-50 transition">
            Check ATS Score
          </Link>
        </div>
      </section>
    </div>
  );
}
