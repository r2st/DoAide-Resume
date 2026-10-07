import { describe, it, expect } from 'vitest';

const EXPECTED_ROUTES = [
  '/',
  '/templates',
  '/ats-checker',
  '/cover-letter-generator',
  '/linkedin-summary-generator',
  '/interview-preparation',
  '/guides/resume-writing',
  '/guides/ats-resume',
  '/guides/fresher-resume',
  '/guides/cover-letter',
  '/guides/best-resume-format-india',
  '/guides/fresher-resume-template',
  '/compare/novoresume',
  '/best-free-resume-builder',
];

const SITEMAP_PAGES = [
  '/',
  '/templates',
  '/ats-checker',
  '/cover-letter-generator',
  '/linkedin-summary-generator',
  '/interview-preparation',
  '/guides/resume-writing',
  '/guides/ats-resume',
  '/guides/fresher-resume',
  '/guides/cover-letter',
  '/guides/best-resume-format-india',
  '/guides/fresher-resume-template',
  '/compare/novoresume',
  '/best-free-resume-builder',
];

describe('Route and sitemap coverage', () => {
  it('has 14 routes', () => {
    expect(EXPECTED_ROUTES.length).toBe(14);
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
    expect(EXPECTED_ROUTES).toContain('/interview-preparation');
    expect(EXPECTED_ROUTES).toContain('/guides/best-resume-format-india');
    expect(EXPECTED_ROUTES).toContain('/guides/fresher-resume-template');
  });
});
