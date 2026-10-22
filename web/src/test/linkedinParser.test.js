import { describe, it, expect } from 'vitest';
import { parseLinkedinProfile, parseDateRange, splitSections, importStats, IMPORT_STORAGE_KEY } from '../lib/linkedinParser';

const SAMPLE = `Priya Sharma
Senior Software Engineer at Acme Technologies
Bengaluru, Karnataka, India
priya.sharma@example.com
+91 98765 43210
www.linkedin.com/in/priyasharma

About
Backend engineer with 6 years of experience building payment systems at scale. Passionate about distributed systems and mentoring.

Experience
Senior Software Engineer
Acme Technologies · Full-time
Jan 2021 - Present · 5 yrs
Bengaluru, Karnataka
- Led migration of payment gateway to microservices
- Reduced API latency by 40%

Software Engineer
Initech Solutions
Jun 2018 - Dec 2020
- Built invoicing module used by 200+ clients

Education
Indian Institute of Technology, Bombay
Bachelor of Technology, Computer Science
2014 - 2018
Grade: 8.9 CGPA

Skills
Java · Spring Boot · PostgreSQL · Kubernetes

Licenses & Certifications
AWS Certified Solutions Architect
Amazon Web Services
Issued Mar 2022

Languages
English (Full professional proficiency)
Hindi (Native or bilingual proficiency)`;

describe('linkedinParser', () => {
  const data = parseLinkedinProfile(SAMPLE);

  it('exports the storage key used by the builder handoff', () => {
    expect(IMPORT_STORAGE_KEY).toBe('doaide_resume_import');
  });

  it('parses name, email, phone, and linkedin URL', () => {
    expect(data.personal.name).toBe('Priya Sharma');
    expect(data.personal.email).toBe('priya.sharma@example.com');
    expect(data.personal.phone).toContain('98765');
    expect(data.personal.linkedin).toContain('linkedin.com/in/priyasharma');
  });

  it('parses the About section into the summary', () => {
    expect(data.summary).toContain('Backend engineer with 6 years');
  });

  it('parses both experience entries with titles and companies', () => {
    expect(data.experience.length).toBe(2);
    expect(data.experience[0].title).toBe('Senior Software Engineer');
    expect(data.experience[0].company).toBe('Acme Technologies');
    expect(data.experience[0].current).toBe(true);
    expect(data.experience[0].startDate).toMatch(/Jan 2021/);
    expect(data.experience[1].company).toBe('Initech Solutions');
    expect(data.experience[1].endDate).toMatch(/Dec 2020/);
  });

  it('captures experience bullets without bullet markers', () => {
    expect(data.experience[0].bullets).toContain('Led migration of payment gateway to microservices');
    expect(data.experience[1].bullets).toContain('Built invoicing module used by 200+ clients');
  });

  it('parses education with degree, field, years, and grade', () => {
    expect(data.education.length).toBe(1);
    const edu = data.education[0];
    expect(edu.institution).toContain('Indian Institute of Technology');
    expect(edu.degree).toBe('Bachelor of Technology');
    expect(edu.field).toBe('Computer Science');
    expect(edu.startDate).toBe('2014');
    expect(edu.endDate).toBe('2018');
    expect(edu.gpa).toContain('8.9');
  });

  it('parses skills split on middots', () => {
    expect(data.skills[0].items).toEqual(['Java', 'Spring Boot', 'PostgreSQL', 'Kubernetes']);
  });

  it('parses certifications with issuer', () => {
    expect(data.certifications[0].name).toBe('AWS Certified Solutions Architect');
    expect(data.certifications[0].issuer).toBe('Amazon Web Services');
  });

  it('parses languages with proficiency', () => {
    expect(data.languages.length).toBe(2);
    expect(data.languages[0].language).toBe('English');
    expect(data.languages[0].proficiency).toContain('professional');
  });

  it('importStats summarises the parse', () => {
    const stats = importStats(data);
    expect(stats.hasName).toBe(true);
    expect(stats.experience).toBe(2);
    expect(stats.education).toBe(1);
    expect(stats.skills).toBe(4);
  });
});

describe('parseDateRange', () => {
  it('parses month-year ranges', () => {
    expect(parseDateRange('Jan 2021 - Present')).toEqual({ startDate: 'Jan 2021', endDate: '', current: true });
    expect(parseDateRange('Jun 2018 - Dec 2020')).toEqual({ startDate: 'Jun 2018', endDate: 'Dec 2020', current: false });
  });

  it('parses year-only ranges', () => {
    expect(parseDateRange('2014 - 2018')).toEqual({ startDate: '2014', endDate: '2018', current: false });
  });

  it('returns null for non-date lines', () => {
    expect(parseDateRange('Acme Technologies')).toBeNull();
  });
});

describe('splitSections', () => {
  it('recognises standard LinkedIn headings', () => {
    const sections = splitSections('Name\n\nAbout\nhello\n\nExperience\njob\n\nSkills\nJava');
    expect(sections.summary).toContain('hello');
    expect(sections.experience).toContain('job');
    expect(sections.skills).toContain('Java');
  });

  it('handles empty input', () => {
    const data = parseLinkedinProfile('');
    expect(data.experience).toEqual([]);
    expect(data.personal.name).toBe('');
  });
});
