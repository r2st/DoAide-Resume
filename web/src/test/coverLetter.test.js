import { describe, it, expect } from 'vitest';
import { checkAtsScore } from '../lib/atsChecker';

describe('ATS Breakdown pass/fail data', () => {
  it('breakdown items include score and maxScore', () => {
    const result = checkAtsScore({
      personalInfo: { name: 'Test', email: 'test@test.com', phone: '999' },
      summary: 'A software engineer with experience in web development',
      experience: [{ company: 'Acme', title: 'Dev', startDate: '2020', bullets: ['Built APIs'] }],
      education: [{ degree: 'B.Tech', institution: 'IIT' }],
      skills: [{ category: 'Tech', items: ['React', 'Node', 'Python', 'SQL', 'AWS'] }],
    });

    expect(result.breakdown.length).toBe(8);
    result.breakdown.forEach((item) => {
      expect(item).toHaveProperty('category');
      expect(item).toHaveProperty('score');
      expect(item).toHaveProperty('maxScore');
      expect(item.score).toBeGreaterThanOrEqual(0);
      expect(item.score).toBeLessThanOrEqual(item.maxScore);
    });
  });

  it('each breakdown category has a tips array', () => {
    const result = checkAtsScore({
      personalInfo: { name: 'Test' },
      summary: '',
      experience: [],
      education: [],
      skills: [],
    });

    result.breakdown.forEach((item) => {
      expect(Array.isArray(item.tips)).toBe(true);
    });
  });

  it('contact info scores full when all fields present', () => {
    const result = checkAtsScore({
      personalInfo: { name: 'Dev', email: 'dev@test.com', phone: '999', location: 'Mumbai' },
      summary: '',
      experience: [],
      education: [],
      skills: [],
    });

    const contact = result.breakdown.find((b) => b.category === 'Contact Information');
    expect(contact.score).toBe(contact.maxScore);
  });

  it('skills score increases with more skills', () => {
    const fewSkills = checkAtsScore({
      personalInfo: { name: 'Test' },
      skills: [{ items: ['React', 'Node'] }],
    });
    const manySkills = checkAtsScore({
      personalInfo: { name: 'Test' },
      skills: [{ items: ['React', 'Node', 'Python', 'SQL', 'AWS', 'Docker', 'Kubernetes', 'Go'] }],
    });

    const fewScore = fewSkills.breakdown.find((b) => b.category === 'Skills');
    const manyScore = manySkills.breakdown.find((b) => b.category === 'Skills');
    expect(manyScore.score).toBeGreaterThan(fewScore.score);
  });
});
