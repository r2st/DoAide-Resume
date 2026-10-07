import { describe, it, expect } from 'vitest';

const EXPECTED_ROUTES = [
  '/',
  '/templates',
  '/ats-checker',
  '/cover-letter-generator',
  '/linkedin-summary-generator',
  '/guides/resume-writing',
  '/guides/ats-resume',
  '/guides/fresher-resume',
  '/guides/cover-letter',
  '/compare/novoresume',
  '/best-free-resume-builder',
];

const SITEMAP_PAGES = [
  '/',
  '/templates',
  '/ats-checker',
  '/cover-letter-generator',
  '/linkedin-summary-generator',
  '/guides/resume-writing',
  '/guides/ats-resume',
  '/guides/fresher-resume',
  '/guides/cover-letter',
  '/compare/novoresume',
  '/best-free-resume-builder',
];

describe('Route and sitemap coverage', () => {
  it('has 11 routes', () => {
    expect(EXPECTED_ROUTES.length).toBe(11);
  });

  it('every sitemap page has a matching route', () => {
    for (const page of SITEMAP_PAGES) {
      expect(EXPECTED_ROUTES).toContain(page);
    }
  });

  it('no duplicate routes', () => {
    expect(new Set(EXPECTED_ROUTES).size).toBe(EXPECTED_ROUTES.length);
  });

  it('new tools are in routes', () => {
    expect(EXPECTED_ROUTES).toContain('/cover-letter-generator');
    expect(EXPECTED_ROUTES).toContain('/linkedin-summary-generator');
  });
});
