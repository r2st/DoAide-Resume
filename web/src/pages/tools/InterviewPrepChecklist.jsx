import { useState, useEffect, useRef, useCallback } from 'react';
import { Link } from 'react-router-dom';
import ShareButtons from '../../components/ShareButtons';

const EXPERIENCE_LEVELS = [
  { id: 'fresher', label: 'Fresher (0 years)' },
  { id: '1-3', label: '1–3 years' },
  { id: '3-5', label: '3–5 years' },
  { id: '5-10', label: '5–10 years' },
  { id: '10+', label: '10+ years' },
];

const TECHNICAL_TOPICS = {
  fresher: [
    'Data structures basics (arrays, linked lists, stacks, queues)',
    'Object-oriented programming concepts',
    'Basic SQL queries and database concepts',
    'Version control with Git',
    'Programming fundamentals in your primary language',
    'Basic web technologies (HTML, CSS, JavaScript)',
    'Operating system basics',
    'Computer networking fundamentals',
  ],
  '1-3': [
    'Data structures and algorithms (sorting, searching, trees, graphs)',
    'System design basics (load balancing, caching)',
    'REST API design and HTTP methods',
    'Database design and normalisation',
    'Design patterns (Singleton, Factory, Observer)',
    'Testing methodologies (unit, integration)',
    'CI/CD pipeline concepts',
    'Cloud computing basics (AWS/Azure/GCP)',
  ],
  '3-5': [
    'Advanced data structures and algorithms',
    'System design (scalability, availability, consistency)',
    'Microservices architecture patterns',
    'Database optimisation and indexing strategies',
    'Security best practices (OWASP top 10)',
    'Performance profiling and optimisation',
    'Container orchestration (Docker, Kubernetes)',
    'Event-driven architecture and message queues',
  ],
  '5-10': [
    'Large-scale system design and architecture',
    'Distributed systems concepts (CAP theorem, consensus)',
    'Technical leadership and mentoring strategies',
    'Cross-functional collaboration and stakeholder management',
    'Performance at scale (millions of users)',
    'Data pipeline and real-time processing architecture',
    'Infrastructure as Code and DevOps practices',
    'Cost optimisation and resource planning',
  ],
  '10+': [
    'Enterprise architecture and technology strategy',
    'Team building and engineering culture',
    'Technical due diligence and vendor evaluation',
    'Legacy system modernisation approaches',
    'Organisational scaling and process design',
    'Board-level and executive communication',
    'Budget management and ROI-driven decisions',
    'Innovation frameworks and R&D strategy',
  ],
};

const BEHAVIORAL_CATEGORIES = {
  fresher: [
    'Academic projects and achievements',
    'Teamwork during college projects',
    'Learning agility and adaptability',
    'Handling pressure during exams or deadlines',
    'Extracurricular activities and leadership roles',
  ],
  '1-3': [
    'Handling disagreements with team members',
    'Meeting tight deadlines',
    'Taking initiative on a project',
    'Receiving and acting on feedback',
    'Balancing multiple priorities',
  ],
  '3-5': [
    'Leading a team through a challenging project',
    'Resolving conflicts between team members',
    'Driving process improvements',
    'Mentoring junior colleagues',
    'Making tough trade-off decisions',
  ],
  '5-10': [
    'Influencing without authority across teams',
    'Navigating organisational change',
    'Building and scaling high-performing teams',
    'Strategic decision-making under ambiguity',
    'Stakeholder management at senior level',
  ],
  '10+': [
    'Transforming engineering culture',
    'Driving company-wide technical initiatives',
    'Crisis management and incident leadership',
    'Succession planning and talent development',
    'Aligning technology with business strategy',
  ],
};

const COMPANY_RESEARCH_ITEMS = [
  'Company mission, vision, and core values',
  'Recent news, press releases, and announcements',
  'Products and services — key offerings and target market',
  'Competitors and market positioning',
  'Company culture from Glassdoor, LinkedIn, and Ambition Box reviews',
  'Interviewer profiles on LinkedIn',
  'Recent financial results or funding rounds',
  'Technology stack (check StackShare, job postings, engineering blog)',
  'Growth plans and expansion strategy',
  'Employee benefits and work-life balance policies',
];

const LOGISTICS_CHECKLIST = [
  'Confirm interview date, time, and time zone',
  'Test video call setup (camera, microphone, lighting) if virtual',
  'Prepare outfit — business formal for Indian companies when unsure',
  'Print 3–5 copies of your resume on quality paper',
  'Carry a notepad and pen for notes',
  'Plan your commute — arrive 15 minutes early',
  'Prepare a glass of water for the interview',
  'Keep government ID proof handy (for office entry)',
  'Save interviewer contact number',
  'Turn off phone notifications during the interview',
];

const COMMON_QUESTIONS = {
  'Tell Me About Yourself': {
    tip: 'Structure as: Present role + Past experience + Future goals. Keep it under 2 minutes. Focus on professional background, not personal life.',
    example: '"I\'m a software engineer at XYZ with 3 years of experience building scalable web applications. Previously, I worked at ABC where I led the migration of our monolith to microservices. I\'m now looking to join a product-focused company where I can own features end-to-end."',
  },
  'Strengths & Weaknesses': {
    tip: 'For strengths, pick 2–3 backed by evidence. For weaknesses, choose a genuine one and explain how you are improving. Avoid cliches like "I\'m a perfectionist."',
    example: 'Strength: "I\'m strong at breaking down complex problems — at my last company, I reduced deployment time by 60% by identifying bottlenecks in our CI pipeline."\nWeakness: "I used to struggle with delegating tasks, but I\'ve been actively working on this by assigning ownership to team members and trusting them with outcomes."',
  },
  'Why This Company?': {
    tip: 'Show genuine research. Mention specific products, culture, or values that resonate. Connect it to your career goals.',
    example: '"I\'ve been following your engineering blog and was impressed by how you handle real-time data at scale. The culture of ownership aligns with how I like to work, and I see a great opportunity to grow as a technical leader here."',
  },
  'Salary Negotiation': {
    tip: 'Research market rates on Glassdoor, AmbitionBox, and Levels.fyi. State a range, not a single number. Consider total compensation — base, bonus, stock, benefits. Never discuss salary in the first round.',
    example: '"Based on my research and experience level, I\'m looking at a range of ₹X–₹Y LPA. I\'m open to discussing the overall compensation package including bonuses, stocks, and growth opportunities."',
  },
  'Where Do You See Yourself in 5 Years?': {
    tip: 'Show ambition aligned with the company\'s growth. Avoid saying "in your seat" or being too specific about titles.',
    example: '"In 5 years, I see myself as a senior technical contributor leading complex projects and mentoring a team. I want to deepen my expertise in distributed systems while taking on more strategic responsibilities."',
  },
  'Why Are You Leaving Your Current Job?': {
    tip: 'Stay positive. Focus on what you are moving towards, not what you are running from. Never badmouth your current employer.',
    example: '"I\'ve had a great learning experience at my current company, but I\'m looking for a role where I can work on larger-scale problems and have more ownership of the product roadmap."',
  },
};

const STAR_METHOD = {
  title: 'STAR Method for Behavioral Answers',
  description: 'The STAR method helps you give structured, compelling answers to behavioral interview questions. Indian interviewers particularly appreciate this format.',
  steps: [
    { letter: 'S', label: 'Situation', desc: 'Set the scene. Describe the context — what was the project, team, or challenge?', template: '"In my role as [role] at [company], our team was facing [specific challenge]..."' },
    { letter: 'T', label: 'Task', desc: 'Explain your responsibility. What was your specific role or goal?', template: '"I was responsible for [specific task/goal] and needed to [objective] within [timeframe]..."' },
    { letter: 'A', label: 'Action', desc: 'Describe what you did. Be specific about YOUR actions, not the team\'s.', template: '"I took the initiative to [specific actions]. First, I [step 1]. Then, I [step 2]..."' },
    { letter: 'R', label: 'Result', desc: 'Share the outcome. Quantify with numbers whenever possible.', template: '"As a result, [measurable outcome]. This led to [business impact], improving [metric] by [X]%."' },
  ],
};

const FAQ_DATA = [
  {
    question: 'How should I prepare for a job interview in India?',
    answer: 'Start by researching the company thoroughly — understand their products, culture, and recent news. Review common interview questions for your role and experience level. Practice the STAR method for behavioral questions. Prepare your documents (resume, ID proof, certificates). For technical roles, revise data structures, algorithms, and system design based on your seniority level.',
  },
  {
    question: 'What are the most common interview questions asked in Indian companies?',
    answer: 'Indian companies commonly ask: "Tell me about yourself", "Why do you want to work here?", "What are your strengths and weaknesses?", "Where do you see yourself in 5 years?", and "What are your salary expectations?". Technical roles also include coding problems, system design questions, and domain-specific questions based on your experience level.',
  },
  {
    question: 'How do I answer salary expectation questions in an Indian interview?',
    answer: 'Research market rates on platforms like Glassdoor, AmbitionBox, and Levels.fyi for your role and location. State a range based on your research, not a single number. Consider total compensation including base salary, bonuses, stock options, and benefits. Avoid discussing salary in the first round — defer to later stages. A common approach is: "Based on my research and experience, I am looking at ₹X–₹Y LPA."',
  },
  {
    question: 'What is the STAR method and how do I use it in interviews?',
    answer: 'STAR stands for Situation, Task, Action, Result. It is a framework for answering behavioral interview questions. Describe the Situation (context), the Task (your responsibility), the Action (what you specifically did), and the Result (the outcome, ideally quantified). This method helps you give structured, concise answers that showcase your impact.',
  },
  {
    question: 'How long should I prepare before an interview?',
    answer: 'Ideally, start preparing 1–2 weeks before the interview. Spend 2–3 days on company research, 3–4 days practising technical topics for your level, and 2–3 days on mock interviews and behavioral questions. On the day before, review your notes, prepare your outfit, and get adequate rest. Last-minute cramming is counterproductive.',
  },
  {
    question: 'What should freshers focus on during interview preparation?',
    answer: 'Freshers should focus on: strong fundamentals in their core subjects (data structures, OOP, DBMS), academic projects they can discuss in depth, internship experiences, communication skills, and knowledge about the company. Practice coding problems on platforms like LeetCode and GeeksforGeeks. Prepare stories about teamwork, leadership, and problem-solving from college activities.',
  },
  {
    question: 'How do I handle a panel interview in India?',
    answer: 'In a panel interview, maintain eye contact with the person who asked the question but occasionally look at other panellists. Address each panellist respectfully. Keep answers concise — panels typically have limited time per candidate. If multiple panellists ask overlapping questions, acknowledge the connection between them. Thank each panellist at the end.',
  },
];

function generateChecklist(role, level) {
  const technical = TECHNICAL_TOPICS[level] || TECHNICAL_TOPICS['fresher'];
  const behavioral = BEHAVIORAL_CATEGORIES[level] || BEHAVIORAL_CATEGORIES['fresher'];

  const roleSpecific = [];
  const roleLower = role.toLowerCase();
  if (roleLower.includes('frontend') || roleLower.includes('react') || roleLower.includes('web')) {
    roleSpecific.push('Review JavaScript closures, event loop, and promises', 'Practice React/Vue component design patterns', 'Study CSS Grid and Flexbox layout');
  } else if (roleLower.includes('backend') || roleLower.includes('server') || roleLower.includes('api')) {
    roleSpecific.push('Review API design best practices and authentication', 'Study database indexing and query optimisation', 'Practice designing RESTful and GraphQL APIs');
  } else if (roleLower.includes('data') || roleLower.includes('ml') || roleLower.includes('machine learning')) {
    roleSpecific.push('Review statistical concepts and hypothesis testing', 'Practice SQL and data manipulation', 'Study ML model evaluation metrics');
  } else if (roleLower.includes('devops') || roleLower.includes('sre') || roleLower.includes('cloud')) {
    roleSpecific.push('Review CI/CD pipeline design', 'Study container orchestration (K8s)', 'Practice infrastructure-as-code patterns');
  } else if (roleLower.includes('product') || roleLower.includes('manager')) {
    roleSpecific.push('Prepare product case studies', 'Review metrics frameworks (AARRR, North Star)', 'Practice feature prioritisation exercises');
  } else if (role.trim()) {
    roleSpecific.push(`Research common interview topics for "${role}"`, `Prepare 2–3 projects relevant to "${role}"`, 'Review industry-specific tools and frameworks');
  }

  return { technical, behavioral, companyResearch: COMPANY_RESEARCH_ITEMS, logistics: LOGISTICS_CHECKLIST, roleSpecific };
}

function CountdownTimer() {
  const [duration, setDuration] = useState(60);
  const [timeLeft, setTimeLeft] = useState(null);
  const [isRunning, setIsRunning] = useState(false);
  const intervalRef = useRef(null);

  const start = useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    setTimeLeft(duration);
    setIsRunning(true);
    intervalRef.current = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(intervalRef.current);
          intervalRef.current = null;
          setIsRunning(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  }, [duration]);

  const stop = useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = null;
    setIsRunning(false);
    setTimeLeft(null);
  }, []);

  useEffect(() => () => { if (intervalRef.current) clearInterval(intervalRef.current); }, []);

  const pct = timeLeft !== null ? (timeLeft / duration) * 100 : 100;
  const mins = timeLeft !== null ? Math.floor(timeLeft / 60) : Math.floor(duration / 60);
  const secs = timeLeft !== null ? timeLeft % 60 : duration % 60;

  return (
    <div className="p-6 rounded-2xl" style={{ background: '#1A1A1D', border: '1px solid #2A2A2D' }}>
      <h3 className="text-lg font-bold mb-4" style={{ color: '#E5E7EB' }}>Mock Answer Timer</h3>
      <p className="text-sm mb-4" style={{ color: '#6B7280' }}>Practice keeping your answers concise. Select a time limit and start speaking when you press Start.</p>

      <div className="flex gap-2 mb-6">
        {[30, 60, 90].map(d => (
          <button
            key={d}
            onClick={() => { setDuration(d); if (!isRunning) setTimeLeft(null); }}
            className="px-4 py-2 rounded-lg text-sm font-semibold transition-colors"
            style={{
              background: duration === d ? '#D4AF37' : '#222225',
              color: duration === d ? '#0A0A0B' : '#9CA3AF',
              border: `1px solid ${duration === d ? '#D4AF37' : '#2A2A2D'}`,
            }}
          >
            {d}s
          </button>
        ))}
      </div>

      <div className="flex flex-col items-center gap-4">
        <div className="relative w-32 h-32">
          <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
            <circle cx="50" cy="50" r="45" fill="none" stroke="#2A2A2D" strokeWidth="6" />
            <circle
              cx="50" cy="50" r="45" fill="none"
              stroke={timeLeft === 0 ? '#ef4444' : '#D4AF37'}
              strokeWidth="6" strokeLinecap="round"
              strokeDasharray={`${2 * Math.PI * 45}`}
              strokeDashoffset={`${2 * Math.PI * 45 * (1 - pct / 100)}`}
              style={{ transition: 'stroke-dashoffset 0.3s ease' }}
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-2xl font-bold tabular-nums" style={{ color: timeLeft === 0 ? '#ef4444' : '#E5E7EB' }}>
              {String(mins).padStart(2, '0')}:{String(secs).padStart(2, '0')}
            </span>
          </div>
        </div>

        {timeLeft === 0 && (
          <div className="text-sm font-semibold" style={{ color: '#ef4444' }}>Time's up!</div>
        )}

        <div className="flex gap-3">
          {!isRunning ? (
            <button onClick={start} className="px-6 py-2.5 rounded-lg text-sm font-bold transition-colors" style={{ background: '#D4AF37', color: '#0A0A0B' }}>
              {timeLeft === 0 ? 'Restart' : 'Start'}
            </button>
          ) : (
            <button onClick={stop} className="px-6 py-2.5 rounded-lg text-sm font-bold transition-colors" style={{ background: '#ef4444', color: '#fff' }}>
              Stop
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

function ChecklistSection({ title, items, color = '#D4AF37' }) {
  const [checked, setChecked] = useState(() => new Array(items.length).fill(false));

  const toggle = (idx) => setChecked(prev => { const next = [...prev]; next[idx] = !next[idx]; return next; });
  const done = checked.filter(Boolean).length;

  return (
    <div className="p-6 rounded-2xl mb-6" style={{ background: '#1A1A1D', border: '1px solid #2A2A2D' }}>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-bold" style={{ color: '#E5E7EB' }}>{title}</h3>
        <span className="text-xs font-semibold px-3 py-1 rounded-full" style={{ background: `${color}22`, color }}>
          {done}/{items.length} done
        </span>
      </div>
      <div className="w-full h-1.5 rounded-full mb-4" style={{ background: '#2A2A2D' }}>
        <div className="h-full rounded-full transition-all duration-300" style={{ width: `${(done / items.length) * 100}%`, background: color }} />
      </div>
      <ul className="space-y-2">
        {items.map((item, idx) => (
          <li key={idx}>
            <label className="flex items-start gap-3 cursor-pointer group py-1">
              <input
                type="checkbox"
                checked={checked[idx]}
                onChange={() => toggle(idx)}
                className="mt-0.5 w-5 h-5 rounded border-2 appearance-none cursor-pointer flex-shrink-0"
                style={{
                  borderColor: checked[idx] ? color : '#444',
                  background: checked[idx] ? color : 'transparent',
                  backgroundImage: checked[idx] ? `url("data:image/svg+xml,%3csvg viewBox='0 0 16 16' fill='%230A0A0B' xmlns='http://www.w3.org/2000/svg'%3e%3cpath d='M12.207 4.793a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0l-2-2a1 1 0 011.414-1.414L6.5 9.086l4.293-4.293a1 1 0 011.414 0z'/%3e%3c/svg%3e")` : 'none',
                }}
              />
              <span className="text-sm leading-relaxed transition-colors" style={{ color: checked[idx] ? '#6B7280' : '#D1D5DB', textDecoration: checked[idx] ? 'line-through' : 'none' }}>
                {item}
              </span>
            </label>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function InterviewPrepChecklist() {
  const [role, setRole] = useState('');
  const [level, setLevel] = useState('');
  const [checklist, setChecklist] = useState(null);
  const [expandedQ, setExpandedQ] = useState(null);
  const [expandedFaq, setExpandedFaq] = useState(null);

  useEffect(() => {
    document.title = 'Free Interview Preparation Checklist | DoAide Resume';
    const meta = document.querySelector('meta[name="description"]');
    if (meta) meta.content = 'Complete interview preparation checklist for Indian job seekers. Get personalised checklists by role and experience level, practice with STAR method, mock timer, and common questions.';
  }, []);

  const handleGenerate = () => {
    if (!level) return;
    setChecklist(generateChecklist(role, level));
  };

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: FAQ_DATA.map(faq => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: { '@type': 'Answer', text: faq.answer },
    })),
  };

  return (
    <div style={{ background: '#0A0A0B' }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />

      {/* Hero */}
      <section style={{ background: 'linear-gradient(135deg, #1A1A1D 0%, #2A2A2D 100%)' }}>
        <div className="max-w-4xl mx-auto px-4 py-16 text-center">
          <h1 className="text-3xl sm:text-4xl font-extrabold mb-4" style={{ color: '#E5E7EB' }}>
            Interview Preparation <span style={{ color: '#D4AF37' }}>Checklist</span>
          </h1>
          <p className="text-lg max-w-2xl mx-auto" style={{ color: '#9CA3AF' }}>
            Get a personalised interview checklist based on your role and experience level.
            Technical topics, behavioral questions, company research items, and logistics — all in one place.
          </p>
          <p className="text-sm mt-4" style={{ color: '#6B7280' }}>Free forever &bull; No login required &bull; Made for Indian job seekers</p>
        </div>
      </section>

      {/* Input Section */}
      <section className="max-w-4xl mx-auto px-4 py-12">
        <div className="p-6 sm:p-8 rounded-2xl" style={{ background: '#1A1A1D', border: '1px solid #2A2A2D' }}>
          <h2 className="text-xl font-bold mb-6" style={{ color: '#E5E7EB' }}>Generate Your Checklist</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label className="block text-sm font-semibold mb-2" style={{ color: '#D1D5DB' }}>Job Role</label>
              <input
                type="text"
                value={role}
                onChange={e => setRole(e.target.value)}
                placeholder="e.g. Frontend Developer, Product Manager..."
                className="w-full px-4 py-3 rounded-xl text-sm focus:outline-none focus:ring-2"
                style={{ background: '#222225', border: '1px solid #333', color: '#E5E7EB', '--tw-ring-color': '#D4AF37' }}
              />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-2" style={{ color: '#D1D5DB' }}>Experience Level</label>
              <select
                value={level}
                onChange={e => setLevel(e.target.value)}
                className="w-full px-4 py-3 rounded-xl text-sm focus:outline-none focus:ring-2"
                style={{ background: '#222225', border: '1px solid #333', color: level ? '#E5E7EB' : '#6B7280', '--tw-ring-color': '#D4AF37' }}
              >
                <option value="">Select experience level...</option>
                {EXPERIENCE_LEVELS.map(l => (
                  <option key={l.id} value={l.id}>{l.label}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="text-center">
            <button
              onClick={handleGenerate}
              disabled={!level}
              className="inline-flex items-center gap-2 px-8 py-3 font-bold text-lg rounded-xl transition-all disabled:opacity-40 disabled:cursor-not-allowed"
              style={{ background: '#D4AF37', color: '#0A0A0B' }}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
              </svg>
              Generate Checklist
            </button>
          </div>
        </div>
      </section>

      {/* Generated Checklist */}
      {checklist && (
        <section className="max-w-4xl mx-auto px-4 pb-12">
          <ChecklistSection title="Technical Topics to Review" items={checklist.technical} color="#D4AF37" />
          {checklist.roleSpecific.length > 0 && (
            <ChecklistSection title={`Role-Specific Preparation${role ? ` — ${role}` : ''}`} items={checklist.roleSpecific} color="#22d3ee" />
          )}
          <ChecklistSection title="Behavioral Question Categories" items={checklist.behavioral} color="#a78bfa" />
          <ChecklistSection title="Company Research Items" items={checklist.companyResearch} color="#34d399" />
          <ChecklistSection title="Logistics Checklist" items={checklist.logistics} color="#fb923c" />
        </section>
      )}

      {/* Common Interview Questions */}
      <section className="max-w-4xl mx-auto px-4 py-12">
        <h2 className="text-2xl font-bold text-center mb-2" style={{ color: '#E5E7EB' }}>Common Interview Questions</h2>
        <p className="text-center text-sm mb-8" style={{ color: '#6B7280' }}>Expert tips and example answers for the most frequently asked questions</p>

        <div className="space-y-3">
          {Object.entries(COMMON_QUESTIONS).map(([question, data], idx) => (
            <div key={idx} className="rounded-2xl overflow-hidden" style={{ background: '#1A1A1D', border: '1px solid #2A2A2D' }}>
              <button
                onClick={() => setExpandedQ(expandedQ === idx ? null : idx)}
                className="w-full flex items-center justify-between px-6 py-4 text-left cursor-pointer"
                style={{ background: 'transparent', border: 'none' }}
              >
                <span className="text-base font-semibold" style={{ color: '#E5E7EB' }}>{question}</span>
                <svg className={`w-5 h-5 flex-shrink-0 transition-transform ${expandedQ === idx ? 'rotate-180' : ''}`} fill="none" stroke="#D4AF37" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {expandedQ === idx && (
                <div className="px-6 pb-5">
                  <div className="mb-3 p-3 rounded-xl" style={{ background: '#222225' }}>
                    <div className="text-xs font-semibold uppercase tracking-wide mb-1" style={{ color: '#D4AF37' }}>Tip</div>
                    <p className="text-sm leading-relaxed" style={{ color: '#D1D5DB' }}>{data.tip}</p>
                  </div>
                  <div className="p-3 rounded-xl" style={{ background: '#222225' }}>
                    <div className="text-xs font-semibold uppercase tracking-wide mb-1" style={{ color: '#34d399' }}>Example</div>
                    <p className="text-sm leading-relaxed whitespace-pre-line" style={{ color: '#D1D5DB' }}>{data.example}</p>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* STAR Method */}
      <section className="max-w-4xl mx-auto px-4 py-12">
        <h2 className="text-2xl font-bold text-center mb-2" style={{ color: '#E5E7EB' }}>{STAR_METHOD.title}</h2>
        <p className="text-center text-sm mb-8 max-w-2xl mx-auto" style={{ color: '#6B7280' }}>{STAR_METHOD.description}</p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {STAR_METHOD.steps.map((step, idx) => (
            <div key={idx} className="p-5 rounded-2xl" style={{ background: '#1A1A1D', border: '1px solid #2A2A2D' }}>
              <div className="flex items-center gap-3 mb-3">
                <span className="w-10 h-10 rounded-full flex items-center justify-center text-lg font-bold" style={{ background: '#D4AF37', color: '#0A0A0B' }}>
                  {step.letter}
                </span>
                <span className="text-base font-bold" style={{ color: '#E5E7EB' }}>{step.label}</span>
              </div>
              <p className="text-sm mb-3 leading-relaxed" style={{ color: '#9CA3AF' }}>{step.desc}</p>
              <div className="p-3 rounded-xl" style={{ background: '#222225' }}>
                <div className="text-xs font-semibold uppercase tracking-wide mb-1" style={{ color: '#D4AF37' }}>Template</div>
                <p className="text-sm italic leading-relaxed" style={{ color: '#D1D5DB' }}>{step.template}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Countdown Timer */}
      <section className="max-w-4xl mx-auto px-4 py-12">
        <h2 className="text-2xl font-bold text-center mb-2" style={{ color: '#E5E7EB' }}>Practice Timer</h2>
        <p className="text-center text-sm mb-8" style={{ color: '#6B7280' }}>Time your mock answers to stay concise and impactful</p>
        <div className="max-w-sm mx-auto">
          <CountdownTimer />
        </div>
      </section>

      {/* Share */}
      <div className="max-w-4xl mx-auto px-4 py-6">
        <ShareButtons text="Prepare for your interview with this free checklist — no login needed!" toolName="Interview Prep Checklist" />
      </div>

      {/* Cross-sell */}
      <section className="max-w-4xl mx-auto px-4 py-6">
        <div className="p-4 rounded-xl text-center" style={{ background: '#1A1A1D', border: '1px solid #2A2A2D' }}>
          <p className="text-sm" style={{ color: '#9CA3AF' }}>
            Make sure your resume is interview-ready too.{' '}
            <Link to="/ats-checker" className="font-semibold underline" style={{ color: '#D4AF37' }}>
              Check your ATS score
            </Link>{' '}
            or{' '}
            <Link to="/" className="font-semibold underline" style={{ color: '#D4AF37' }}>
              build a new resume
            </Link>.
          </p>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16" style={{ background: '#111113' }}>
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-2xl font-bold text-center mb-2" style={{ color: '#E5E7EB' }}>Frequently Asked Questions</h2>
          <p className="text-center text-sm mb-8" style={{ color: '#6B7280' }}>Everything you need to know about interview preparation in India</p>

          <div className="space-y-3">
            {FAQ_DATA.map((faq, idx) => (
              <div key={idx} className="rounded-2xl overflow-hidden" style={{ background: '#1A1A1D', border: '1px solid #2A2A2D' }}>
                <button
                  onClick={() => setExpandedFaq(expandedFaq === idx ? null : idx)}
                  className="w-full flex items-center justify-between px-6 py-4 text-left cursor-pointer"
                  style={{ background: 'transparent', border: 'none' }}
                >
                  <span className="text-sm font-semibold" style={{ color: '#E5E7EB' }}>{faq.question}</span>
                  <svg className={`w-5 h-5 flex-shrink-0 ml-4 transition-transform ${expandedFaq === idx ? 'rotate-180' : ''}`} fill="none" stroke="#D4AF37" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {expandedFaq === idx && (
                  <div className="px-6 pb-5">
                    <p className="text-sm leading-relaxed" style={{ color: '#9CA3AF' }}>{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
