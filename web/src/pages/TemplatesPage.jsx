import { Link } from 'react-router-dom';
import ResumePreview from '../components/ResumePreview';

const sampleData = {
  personal: {
    name: 'Arjun Sharma',
    email: 'arjun.sharma@email.com',
    phone: '+91 98765 43210',
    location: 'Bangalore, Karnataka',
    linkedin: 'linkedin.com/in/arjunsharma',
    website: 'arjunsharma.dev',
  },
  summary:
    'Senior Software Engineer with 6+ years of experience building scalable web applications and microservices. Proficient in React, Node.js, and cloud technologies. Passionate about clean code, performance optimization, and mentoring junior developers. Led teams delivering products used by 500K+ users across India.',
  experience: [
    {
      company: 'Flipkart',
      title: 'Senior Software Engineer',
      location: 'Bangalore, Karnataka',
      startDate: '2021-06',
      endDate: '',
      current: true,
      bullets: [
        'Led a team of 6 engineers to redesign the seller dashboard, improving page load by 45%',
        'Architected microservices handling 10M+ daily API requests with 99.95% uptime',
        'Implemented real-time inventory tracking system reducing stock discrepancies by 60%',
        'Mentored 4 junior developers through structured code reviews and pair programming',
      ],
    },
    {
      company: 'Infosys',
      title: 'Software Engineer',
      location: 'Pune, Maharashtra',
      startDate: '2018-07',
      endDate: '2021-05',
      current: false,
      bullets: [
        'Developed RESTful APIs serving 50K+ concurrent users for banking client',
        'Reduced deployment time by 70% by implementing CI/CD pipelines with Jenkins',
        'Built reusable component library adopted by 3 cross-functional teams',
      ],
    },
  ],
  education: [
    {
      institution: 'Indian Institute of Technology, Bombay',
      degree: 'Bachelor of Technology',
      field: 'Computer Science and Engineering',
      startDate: '2014-07',
      endDate: '2018-05',
      gpa: '8.7 / 10',
    },
  ],
  skills: [
    { category: 'Languages', items: ['JavaScript', 'TypeScript', 'Python', 'Java', 'SQL'] },
    { category: 'Frontend', items: ['React', 'Next.js', 'Tailwind CSS', 'Redux'] },
    { category: 'Backend', items: ['Node.js', 'Express', 'Spring Boot', 'GraphQL'] },
    { category: 'Tools', items: ['AWS', 'Docker', 'Kubernetes', 'Git', 'Jenkins'] },
  ],
  projects: [
    {
      name: 'DevConnect',
      description: 'Open-source developer networking platform with real-time chat and code collaboration. 2K+ GitHub stars.',
      technologies: 'React, Node.js, Socket.io, MongoDB',
      link: 'https://github.com/arjun/devconnect',
    },
  ],
  certifications: [
    { name: 'AWS Solutions Architect - Associate', issuer: 'Amazon Web Services', date: '2023-03' },
  ],
  languages: [
    { language: 'English', proficiency: 'Professional' },
    { language: 'Hindi', proficiency: 'Native' },
    { language: 'Kannada', proficiency: 'Intermediate' },
  ],
  hobbies: ['Open Source Contributing', 'Technical Blogging', 'Chess', 'Hiking'],
};

const templates = [
  {
    id: 'modern',
    name: 'Modern',
    description: 'A sleek two-column layout with a colored sidebar. Perfect for tech professionals and creative roles that want a contemporary look.',
    color: '#2563eb',
  },
  {
    id: 'classic',
    name: 'Classic',
    description: 'Traditional single-column format with centered header. Ideal for corporate, banking, and consulting applications.',
    color: '#2563eb',
  },
  {
    id: 'minimalist',
    name: 'Minimalist',
    description: 'Clean, distraction-free layout that puts your content front and center. Great for experienced professionals with strong credentials.',
    color: '#2563eb',
  },
  {
    id: 'creative',
    name: 'Creative',
    description: 'Bold header with eye-catching design elements. Suits marketing, design, and media professionals.',
    color: '#2563eb',
  },
  {
    id: 'ats',
    name: 'ATS-Friendly',
    description: 'Optimized for Applicant Tracking Systems with a straightforward structure. Best for mass applications and job portals like Naukri.',
    color: '#2563eb',
  },
];

export default function TemplatesPage() {
  return (
    <div>
      {/* Hero */}
      <section className="bg-gradient-to-br from-indigo-600 to-blue-700 text-white py-16">
        <div className="max-w-5xl mx-auto px-4 text-center">
          <h1 className="text-3xl sm:text-4xl font-extrabold mb-4">
            Professional Resume Templates -- Free to Use
          </h1>
          <p className="text-lg text-blue-100 max-w-2xl mx-auto">
            Choose from 5 professionally designed templates. Each one is ATS-compatible,
            fully customizable, and ready for download as PDF.
          </p>
        </div>
      </section>

      {/* Templates Grid */}
      <section className="max-w-7xl mx-auto px-4 py-12">
        <div className="space-y-16">
          {templates.map((tmpl, index) => (
            <div
              key={tmpl.id}
              className={`flex flex-col ${
                index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'
              } gap-8 items-start`}
            >
              {/* Preview */}
              <div className="w-full lg:w-3/5 bg-gray-100 rounded-xl p-4 overflow-hidden">
                <div style={{ transform: 'scale(0.55)', transformOrigin: 'top center', height: '600px' }}>
                  <ResumePreview
                    data={sampleData}
                    template={tmpl.id}
                    templateColor={tmpl.color}
                  />
                </div>
              </div>

              {/* Info */}
              <div className="w-full lg:w-2/5 py-4">
                <span className="inline-block px-3 py-1 bg-blue-100 text-blue-700 text-xs font-semibold rounded-full mb-3">
                  Template {index + 1} of {templates.length}
                </span>
                <h2 className="text-2xl font-bold text-gray-800 mb-3">{tmpl.name}</h2>
                <p className="text-gray-600 leading-relaxed mb-6">{tmpl.description}</p>
                <div className="space-y-3">
                  <Link
                    to={`/?template=${tmpl.id}`}
                    className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition shadow-sm"
                  >
                    Use This Template
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </Link>
                </div>
                <div className="mt-6 flex flex-wrap gap-2">
                  <span className="px-2.5 py-1 bg-green-100 text-green-700 text-xs font-medium rounded-full">ATS Compatible</span>
                  <span className="px-2.5 py-1 bg-purple-100 text-purple-700 text-xs font-medium rounded-full">Customizable Colors</span>
                  <span className="px-2.5 py-1 bg-amber-100 text-amber-700 text-xs font-medium rounded-full">PDF Export</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-gray-900 text-white py-14">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold mb-3">Ready to Build Your Resume?</h2>
          <p className="text-gray-300 mb-6">
            Pick any template above and start filling in your details. It takes less than 10 minutes.
          </p>
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-8 py-3 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 transition"
          >
            Start Building Now
          </Link>
        </div>
      </section>
    </div>
  );
}
