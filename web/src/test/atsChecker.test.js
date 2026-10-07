import { describe, it, expect } from 'vitest';
import { extractKeywords, checkAtsScore } from '../lib/atsChecker';

describe('extractKeywords', () => {
  it('extracts meaningful keywords', () => {
    const keywords = extractKeywords('Developed scalable microservices using Python and Docker');
    expect(keywords).toContain('developed');
    expect(keywords).toContain('scalable');
    expect(keywords).toContain('microservices');
    expect(keywords).toContain('python');
    expect(keywords).toContain('docker');
  });

  it('filters stop words', () => {
    const keywords = extractKeywords('The project was very good and also well done');
    expect(keywords).not.toContain('the');
    expect(keywords).not.toContain('was');
    expect(keywords).not.toContain('and');
    expect(keywords).not.toContain('very');
    expect(keywords).not.toContain('also');
    expect(keywords).not.toContain('well');
  });

  it('returns empty for null input', () => {
    expect(extractKeywords(null)).toEqual([]);
    expect(extractKeywords('')).toEqual([]);
  });

  it('deduplicates keywords', () => {
    const keywords = extractKeywords('python python python development development');
    const unique = new Set(keywords);
    expect(keywords.length).toBe(unique.size);
  });
});

describe('checkAtsScore', () => {
  it('returns a score object with required fields', () => {
    const result = checkAtsScore({
      personalInfo: { name: 'John Doe', email: 'john@example.com', phone: '9876543210' },
      summary: 'Experienced software engineer with 5 years in web development',
      experience: [{ company: 'TCS', title: 'Engineer', bullets: ['Led team of 5'] }],
      education: [{ institution: 'IIT Delhi', degree: 'B.Tech' }],
      skills: [{ category: 'Technical', items: ['JavaScript', 'React', 'Node.js'] }],
    });
    expect(result).toHaveProperty('score');
    expect(result).toHaveProperty('breakdown');
    expect(result.score).toBeGreaterThanOrEqual(0);
    expect(result.score).toBeLessThanOrEqual(100);
  });

  it('gives higher score for complete resume', () => {
    const complete = checkAtsScore({
      personalInfo: { name: 'Test User', email: 'test@test.com', phone: '9876543210', location: 'Mumbai' },
      summary: 'Senior software engineer with 8 years experience in full-stack development, leading cross-functional teams.',
      experience: [
        { company: 'Infosys', title: 'Lead Engineer', bullets: ['Led development of microservices architecture', 'Managed team of 12 engineers', 'Reduced deployment time by 40%'] },
      ],
      education: [{ institution: 'IIT Bombay', degree: 'B.Tech', field: 'Computer Science' }],
      skills: [{ category: 'Technical', items: ['JavaScript', 'React', 'Node.js', 'Python', 'AWS'] }],
    });
    const minimal = checkAtsScore({
      personalInfo: { name: 'Test' },
      summary: '',
      experience: [],
      education: [],
      skills: [],
    });
    expect(complete.score).toBeGreaterThan(minimal.score);
  });
});
