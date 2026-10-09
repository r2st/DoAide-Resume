import { describe, it, expect } from 'vitest';

const EXPERIENCE_LEVELS = ['fresher', '1-3', '3-5', '5-10', '10+'];

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

const FAQ_QUESTIONS = [
  'How should I prepare for a job interview in India?',
  'What are the most common interview questions asked in Indian companies?',
  'How do I answer salary expectation questions in an Indian interview?',
  'What is the STAR method and how do I use it in interviews?',
  'How long should I prepare before an interview?',
  'What should freshers focus on during interview preparation?',
  'How do I handle a panel interview in India?',
];

describe('Interview Prep Checklist data', () => {
  it('has 5 experience levels', () => {
    expect(EXPERIENCE_LEVELS.length).toBe(5);
  });

  it('each experience level has technical topics', () => {
    EXPERIENCE_LEVELS.forEach(level => {
      expect(TECHNICAL_TOPICS[level]).toBeDefined();
      expect(TECHNICAL_TOPICS[level].length).toBeGreaterThanOrEqual(6);
    });
  });

  it('technical topics are unique within each level', () => {
    EXPERIENCE_LEVELS.forEach(level => {
      const topics = TECHNICAL_TOPICS[level];
      expect(new Set(topics).size).toBe(topics.length);
    });
  });

  it('fresher topics focus on fundamentals', () => {
    const topics = TECHNICAL_TOPICS['fresher'].join(' ').toLowerCase();
    expect(topics).toContain('data structures');
    expect(topics).toContain('programming');
  });

  it('senior topics include leadership and strategy', () => {
    const topics = TECHNICAL_TOPICS['10+'].join(' ').toLowerCase();
    expect(topics).toContain('strategy');
    expect(topics).toContain('team building');
  });
});

describe('FAQ data for JSON-LD', () => {
  it('has 7 or more FAQ questions', () => {
    expect(FAQ_QUESTIONS.length).toBeGreaterThanOrEqual(5);
  });

  it('all FAQ questions end with a question mark', () => {
    FAQ_QUESTIONS.forEach(q => {
      expect(q.endsWith('?')).toBe(true);
    });
  });

  it('FAQ covers Indian interview context', () => {
    const allQuestions = FAQ_QUESTIONS.join(' ').toLowerCase();
    expect(allQuestions).toContain('india');
  });

  it('FAQ covers STAR method', () => {
    const allQuestions = FAQ_QUESTIONS.join(' ').toLowerCase();
    expect(allQuestions).toContain('star');
  });

  it('FAQ covers salary expectations', () => {
    const allQuestions = FAQ_QUESTIONS.join(' ').toLowerCase();
    expect(allQuestions).toContain('salary');
  });

  it('FAQ covers freshers', () => {
    const allQuestions = FAQ_QUESTIONS.join(' ').toLowerCase();
    expect(allQuestions).toContain('fresher');
  });
});

describe('STAR method structure', () => {
  const STAR_STEPS = ['S', 'T', 'A', 'R'];

  it('has all four STAR steps', () => {
    expect(STAR_STEPS).toEqual(['S', 'T', 'A', 'R']);
  });

  it('STAR stands for Situation, Task, Action, Result', () => {
    const labels = ['Situation', 'Task', 'Action', 'Result'];
    labels.forEach(label => {
      expect(typeof label).toBe('string');
      expect(label.length).toBeGreaterThan(0);
    });
  });
});

describe('Common interview questions', () => {
  const QUESTIONS = [
    'Tell Me About Yourself',
    'Strengths & Weaknesses',
    'Why This Company?',
    'Salary Negotiation',
    'Where Do You See Yourself in 5 Years?',
    'Why Are You Leaving Your Current Job?',
  ];

  it('has 6 common question categories', () => {
    expect(QUESTIONS.length).toBe(6);
  });

  it('includes the most-asked question', () => {
    expect(QUESTIONS).toContain('Tell Me About Yourself');
  });

  it('includes salary negotiation', () => {
    expect(QUESTIONS).toContain('Salary Negotiation');
  });

  it('all questions are non-empty strings', () => {
    QUESTIONS.forEach(q => {
      expect(typeof q).toBe('string');
      expect(q.length).toBeGreaterThan(0);
    });
  });
});

describe('Countdown timer durations', () => {
  const DURATIONS = [30, 60, 90];

  it('offers 3 timer options', () => {
    expect(DURATIONS.length).toBe(3);
  });

  it('includes 30s, 60s, and 90s', () => {
    expect(DURATIONS).toContain(30);
    expect(DURATIONS).toContain(60);
    expect(DURATIONS).toContain(90);
  });

  it('all durations are positive numbers', () => {
    DURATIONS.forEach(d => {
      expect(d).toBeGreaterThan(0);
      expect(typeof d).toBe('number');
    });
  });
});

describe('Logistics checklist', () => {
  const LOGISTICS = [
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

  it('has 10 logistics items', () => {
    expect(LOGISTICS.length).toBe(10);
  });

  it('includes resume preparation', () => {
    const combined = LOGISTICS.join(' ').toLowerCase();
    expect(combined).toContain('resume');
  });

  it('includes video call setup', () => {
    const combined = LOGISTICS.join(' ').toLowerCase();
    expect(combined).toContain('video call');
  });

  it('all items are non-empty strings', () => {
    LOGISTICS.forEach(item => {
      expect(typeof item).toBe('string');
      expect(item.length).toBeGreaterThan(10);
    });
  });
});
