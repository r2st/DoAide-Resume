import { useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function BestResumeFormatIndia() {
  useEffect(() => {
    document.title = 'Best Resume Format for India 2026: Templates & Examples | DoAide';
    const meta = document.querySelector('meta[name="description"]');
    if (meta) {
      meta.content = 'Find the best resume format for Indian job applications in 2026. Compare chronological, functional, and combination formats with free downloadable templates.';
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
        'headline': 'Best Resume Format for India 2026',
        'description': 'Complete guide to choosing the best resume format for Indian job applications.',
        'url': 'https://resume.doaide.com/guides/best-resume-format-india',
      },
      {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        'mainEntity': [
          { '@type': 'Question', 'name': 'What is the best resume format in India?', 'acceptedAnswer': { '@type': 'Answer', 'text': 'The reverse-chronological format is the most widely accepted resume format in India. It lists your most recent experience first and works well for candidates with a steady career progression. For freshers, a combination format that leads with skills and education is recommended.' } },
          { '@type': 'Question', 'name': 'Should I use a one-page or two-page resume in India?', 'acceptedAnswer': { '@type': 'Answer', 'text': 'For freshers and candidates with less than 5 years of experience, a one-page resume is ideal. For experienced professionals with 5-15 years of experience, two pages are acceptable. Senior executives may use up to three pages.' } },
          { '@type': 'Question', 'name': 'What font should I use for my resume in India?', 'acceptedAnswer': { '@type': 'Answer', 'text': 'Use professional fonts like Calibri, Arial, or Times New Roman in 10-12pt size. These fonts are ATS-friendly and look clean in both digital and printed formats.' } },
          { '@type': 'Question', 'name': 'Do Indian companies prefer PDF or Word resumes?', 'acceptedAnswer': { '@type': 'Answer', 'text': 'Most Indian companies and job portals accept both PDF and Word formats. PDF preserves formatting across devices, while some ATS systems parse Word documents better. When in doubt, submit as PDF unless the job posting specifically asks for Word.' } },
        ],
      },
    ]);
    return () => { if (script.parentNode) script.parentNode.removeChild(script); };
  }, []);

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <section className="mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4 leading-tight">
          Best Resume Format for India 2026: Templates & Expert Guide
        </h1>
        <p className="text-lg text-gray-600 mb-6">
          Choosing the right resume format can make or break your job application. Indian recruiters
          and ATS systems have specific expectations about how resumes should be structured. This guide
          covers the three main resume formats, when to use each, and common mistakes Indian job seekers make.
        </p>
        <Link to="/" className="inline-block bg-blue-600 text-white font-semibold px-6 py-3 rounded-lg hover:bg-blue-700 transition">
          Build Your Resume Free
        </Link>
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">The 3 Resume Formats</h2>

        <div className="space-y-6">
          <div className="p-6 bg-blue-50 rounded-xl border border-blue-100">
            <h3 className="text-xl font-bold text-blue-900 mb-2">1. Reverse-Chronological Format</h3>
            <p className="text-gray-700 mb-3">
              The most popular format in India. Lists your most recent job first and works backward.
              Recruiters at TCS, Infosys, Wipro, and other large Indian companies prefer this format
              because it clearly shows career progression.
            </p>
            <p className="text-sm text-blue-700 font-semibold">Best for: Experienced professionals with a steady career path, IT professionals, and anyone applying to large Indian corporates.</p>
          </div>

          <div className="p-6 bg-green-50 rounded-xl border border-green-100">
            <h3 className="text-xl font-bold text-green-900 mb-2">2. Functional (Skills-Based) Format</h3>
            <p className="text-gray-700 mb-3">
              Focuses on skills and qualifications rather than work history. Useful for freshers, career changers,
              and people with gaps in employment. However, many Indian recruiters are less familiar with this format.
            </p>
            <p className="text-sm text-green-700 font-semibold">Best for: Freshers, career changers, freelancers, and candidates with employment gaps.</p>
          </div>

          <div className="p-6 bg-purple-50 rounded-xl border border-purple-100">
            <h3 className="text-xl font-bold text-purple-900 mb-2">3. Combination (Hybrid) Format</h3>
            <p className="text-gray-700 mb-3">
              Combines the best of both formats — leads with a skills summary section, followed by reverse-chronological
              work experience. This is increasingly popular for mid-career professionals in India, especially in tech and consulting.
            </p>
            <p className="text-sm text-purple-700 font-semibold">Best for: Mid-career professionals, tech workers with diverse skills, and people transitioning between industries.</p>
          </div>
        </div>
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Resume Format by Experience Level</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="bg-gray-100">
                <th className="text-left p-3 border border-gray-200 font-semibold">Experience</th>
                <th className="text-left p-3 border border-gray-200 font-semibold">Recommended Format</th>
                <th className="text-left p-3 border border-gray-200 font-semibold">Pages</th>
                <th className="text-left p-3 border border-gray-200 font-semibold">Lead Section</th>
              </tr>
            </thead>
            <tbody>
              <tr><td className="p-3 border border-gray-200">Fresher (0-1 years)</td><td className="p-3 border border-gray-200">Functional / Combination</td><td className="p-3 border border-gray-200">1 page</td><td className="p-3 border border-gray-200">Education + Skills</td></tr>
              <tr className="bg-gray-50"><td className="p-3 border border-gray-200">Early career (1-3 years)</td><td className="p-3 border border-gray-200">Reverse-Chronological</td><td className="p-3 border border-gray-200">1 page</td><td className="p-3 border border-gray-200">Summary + Experience</td></tr>
              <tr><td className="p-3 border border-gray-200">Mid-career (3-8 years)</td><td className="p-3 border border-gray-200">Reverse-Chronological</td><td className="p-3 border border-gray-200">1-2 pages</td><td className="p-3 border border-gray-200">Summary + Experience</td></tr>
              <tr className="bg-gray-50"><td className="p-3 border border-gray-200">Senior (8-15 years)</td><td className="p-3 border border-gray-200">Combination</td><td className="p-3 border border-gray-200">2 pages</td><td className="p-3 border border-gray-200">Summary + Key Achievements</td></tr>
              <tr><td className="p-3 border border-gray-200">Executive (15+ years)</td><td className="p-3 border border-gray-200">Combination</td><td className="p-3 border border-gray-200">2-3 pages</td><td className="p-3 border border-gray-200">Executive Summary</td></tr>
            </tbody>
          </table>
        </div>
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Common Mistakes in Indian Resumes</h2>
        <div className="space-y-4">
          {[
            { mistake: "Including a photo", fix: "Most Indian IT companies and MNCs prefer resumes without photos to avoid bias. Only include one if the job posting specifically asks for it." },
            { mistake: "Adding a 'Declaration' section", fix: "The old-fashioned declaration ('I hereby declare that the above information is true') is unnecessary and wastes space. Remove it." },
            { mistake: "Listing 'Father\'s Name' or personal details", fix: "Date of birth, marital status, religion, and father's name are not required and can lead to unconscious bias. Skip them." },
            { mistake: "Using 'Curriculum Vitae' as the title", fix: "Do not title your resume 'CV' or 'Resume'. Use your name as the header instead." },
            { mistake: "Including every job since college", fix: "Focus on the last 10-15 years of relevant experience. Early career roles can be summarised in one line if needed." },
          ].map((item, idx) => (
            <div key={idx} className="p-4 bg-red-50 rounded-xl border border-red-100">
              <p className="font-semibold text-red-800 mb-1">{item.mistake}</p>
              <p className="text-sm text-gray-700">{item.fix}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
        <div className="space-y-4">
          <div className="p-4 bg-gray-50 rounded-xl">
            <h3 className="font-semibold text-gray-800 mb-1">What is the best resume format in India?</h3>
            <p className="text-sm text-gray-600">The reverse-chronological format is most widely accepted. For freshers, a combination format leading with skills and education works better.</p>
          </div>
          <div className="p-4 bg-gray-50 rounded-xl">
            <h3 className="font-semibold text-gray-800 mb-1">Should I use a one-page or two-page resume?</h3>
            <p className="text-sm text-gray-600">One page for up to 5 years of experience. Two pages for 5-15 years. Three pages only for senior executives.</p>
          </div>
          <div className="p-4 bg-gray-50 rounded-xl">
            <h3 className="font-semibold text-gray-800 mb-1">Do Indian companies prefer PDF or Word?</h3>
            <p className="text-sm text-gray-600">Both are accepted. PDF preserves formatting; some ATS parse Word better. Submit PDF unless the posting asks for Word.</p>
          </div>
        </div>
      </section>

      <section className="bg-blue-50 border border-blue-200 rounded-2xl p-8 text-center">
        <h2 className="text-2xl font-bold text-blue-900 mb-3">Ready to Build Your Resume?</h2>
        <p className="text-blue-700 mb-6">Use our free ATS-optimised resume builder with templates designed for Indian job seekers.</p>
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
