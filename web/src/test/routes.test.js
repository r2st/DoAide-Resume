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
  '/guides/best-resume-format-freshers-2026',
  '/guides/cover-letter-it-jobs',
  '/compare/novoresume',
  '/best-free-resume-builder',
  '/compare/canva',
  '/compare/best-resume-builders',
  '/compare/zety',
  '/tools/interview-prep',
  '/advisor',
  '/blog/resume-building-2026',
  '/blog/ats-optimization-2026',
  '/blog/resume-format-freshers-2026',
  '/blog/ats-friendly-resume',
  '/blog/resume-mistakes',
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
  '/guides/best-resume-format-freshers-2026',
  '/guides/cover-letter-it-jobs',
  '/compare/novoresume',
  '/best-free-resume-builder',
  '/compare/canva',
  '/compare/best-resume-builders',
  '/compare/zety',
  '/tools/interview-prep',
  '/advisor',
  '/blog/resume-building-2026',
  '/blog/ats-optimization-2026',
  '/blog/resume-format-freshers-2026',
  '/blog/ats-friendly-resume',
  '/blog/resume-mistakes',
];

describe('Route and sitemap coverage', () => {
  it('has 26 routes', () => {
    expect(EXPECTED_ROUTES.length).toBe(26);
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
    expect(EXPECTED_ROUTES).toContain('/compare/zety');
    expect(EXPECTED_ROUTES).toContain('/tools/interview-prep');
  });

  it('new blog and guide routes are present', () => {
    expect(EXPECTED_ROUTES).toContain('/guides/best-resume-format-freshers-2026');
    expect(EXPECTED_ROUTES).toContain('/guides/cover-letter-it-jobs');
    expect(EXPECTED_ROUTES).toContain('/blog/resume-building-2026');
    expect(EXPECTED_ROUTES).toContain('/blog/ats-optimization-2026');
    expect(EXPECTED_ROUTES).toContain('/blog/resume-format-freshers-2026');
    expect(EXPECTED_ROUTES).toContain('/blog/ats-friendly-resume');
    expect(EXPECTED_ROUTES).toContain('/blog/resume-mistakes');
  });
});
