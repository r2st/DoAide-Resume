import { describe, expect, it } from 'vitest';
import { analyzeKeywords, suggestionFor, tokenize } from '../lib/keywordOptimizer';

const JD = `We are hiring a Backend Engineer.
Requirements: strong Python experience, FastAPI or Django, PostgreSQL, Docker and Kubernetes.
Experience with machine learning pipelines is a plus. Machine learning deployment experience preferred.
Python scripting for automation. AWS knowledge required.`;

const RESUME = `Software engineer with 4 years of Python. Built REST APIs with FastAPI and
PostgreSQL. Deployed services using Docker on AWS. Automated reporting with Python scripting.`;

describe('tokenize', () => {
  it('lowercases, strips punctuation, keeps tech symbols', () => {
    expect(tokenize('C++, Node.js and CI/CD!')).toEqual(['c++', 'node.js', 'ci/cd']);
  });

  it('drops stopwords and bare numbers', () => {
    expect(tokenize('the team requires 5 years of experience with React')).toEqual(['react']);
  });
});

describe('analyzeKeywords', () => {
  it('finds matched and missing keywords ranked by JD frequency', () => {
    const { matched, missing, coverage } = analyzeKeywords(RESUME, JD);
    const matchedWords = matched.map((k) => k.keyword);
    const missingWords = missing.map((k) => k.keyword);

    expect(matchedWords).toContain('python');
    expect(matchedWords).toContain('fastapi');
    expect(matchedWords).toContain('postgresql');
    expect(matchedWords).toContain('docker');
    expect(missingWords).toContain('kubernetes');
    expect(missingWords).toContain('django');
    expect(coverage).toBeGreaterThan(0);
    expect(coverage).toBeLessThanOrEqual(100);
  });

  it('promotes repeated two-word phrases and absorbs their words', () => {
    const { missing } = analyzeKeywords(RESUME, JD);
    const missingWords = missing.map((k) => k.keyword);
    expect(missingWords).toContain('machine learning');
    expect(missingWords).not.toContain('machine');
  });

  it('sorts by frequency descending', () => {
    const { matched, missing } = analyzeKeywords(RESUME, JD);
    for (const list of [matched, missing]) {
      for (let i = 1; i < list.length; i++) {
        expect(list[i - 1].count).toBeGreaterThanOrEqual(list[i].count);
      }
    }
  });

  it('returns empty result for empty JD', () => {
    expect(analyzeKeywords(RESUME, '')).toEqual({ matched: [], missing: [], coverage: 0 });
  });

  it('coverage is 100 when resume contains everything', () => {
    const jd = 'python docker python docker';
    const { coverage } = analyzeKeywords('I know Python and Docker', jd);
    expect(coverage).toBe(100);
  });
});

describe('suggestionFor', () => {
  it('names the keyword', () => {
    expect(suggestionFor('kubernetes')).toContain('"kubernetes"');
  });
});
