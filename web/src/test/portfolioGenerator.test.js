import { describe, expect, it } from 'vitest';
import { generatePortfolioHtml } from '../lib/portfolioGenerator';

const DATA = {
  name: 'Asha Verma',
  title: 'Frontend Developer',
  about: 'I build fast, accessible web apps.',
  location: 'Pune, India',
  email: 'asha@example.com',
  linkedin: 'https://linkedin.com/in/asha',
  github: 'github.com/asha',
  skills: ['React', 'TypeScript'],
  projects: [
    { name: 'ShopFast', description: 'E-commerce storefront', tech: 'React, Vite', link: 'https://shopfast.example.com' },
  ],
  accent: 'blue',
};

describe('generatePortfolioHtml', () => {
  it('produces a complete standalone document', () => {
    const html = generatePortfolioHtml(DATA);
    expect(html).toMatch(/^<!doctype html>/);
    expect(html).toContain('<title>Asha Verma — Frontend Developer</title>');
    expect(html).toContain('Pune, India');
    expect(html).toContain('ShopFast');
    expect(html).toContain('React, Vite');
    expect(html).toContain('--accent: #2563EB');
  });

  it('normalises links: mailto for email, https for bare domains', () => {
    const html = generatePortfolioHtml(DATA);
    expect(html).toContain('href="mailto:asha@example.com"');
    expect(html).toContain('href="https://github.com/asha"');
    expect(html).toContain('href="https://linkedin.com/in/asha"');
  });

  it('escapes HTML in user input', () => {
    const html = generatePortfolioHtml({ ...DATA, name: '<script>alert(1)</script>' });
    expect(html).not.toContain('<script>alert(1)</script>');
    expect(html).toContain('&lt;script&gt;');
  });

  it('drops javascript: URLs', () => {
    const html = generatePortfolioHtml({
      ...DATA,
      projects: [{ name: 'X', description: 'd', tech: '', link: 'javascript:alert(1)' }],
    });
    expect(html).not.toContain('javascript:');
  });

  it('omits empty sections', () => {
    const html = generatePortfolioHtml({ name: 'Just Name', skills: [], projects: [] });
    expect(html).not.toContain('<h2>Skills</h2>');
    expect(html).not.toContain('<h2>Projects</h2>');
  });
});
