import { describe, it, expect } from 'vitest';

describe('Blog posts exist', () => {
  it('ResumeBuilding2026 module exports a default component', async () => {
    const mod = await import('../pages/blog/ResumeBuilding2026');
    expect(mod.default).toBeDefined();
    expect(typeof mod.default).toBe('function');
  });

  it('AtsOptimization2026 module exports a default component', async () => {
    const mod = await import('../pages/blog/AtsOptimization2026');
    expect(mod.default).toBeDefined();
    expect(typeof mod.default).toBe('function');
  });

  it('ResumeFormatFreshers2026 module exports a default component', async () => {
    const mod = await import('../pages/blog/ResumeFormatFreshers2026');
    expect(mod.default).toBeDefined();
    expect(typeof mod.default).toBe('function');
  });

  it('AtsFriendlyResume module exports a default component', async () => {
    const mod = await import('../pages/blog/AtsFriendlyResume');
    expect(mod.default).toBeDefined();
    expect(typeof mod.default).toBe('function');
  });

  it('ResumeMistakes module exports a default component', async () => {
    const mod = await import('../pages/blog/ResumeMistakes');
    expect(mod.default).toBeDefined();
    expect(typeof mod.default).toBe('function');
  });

  it('AiResumeBuilderFreshers2026 module exports a default component', async () => {
    const mod = await import('../pages/blog/AiResumeBuilderFreshers2026');
    expect(mod.default).toBeDefined();
    expect(typeof mod.default).toBe('function');
  });

  it('ResumeWithNoExperience module exports a default component', async () => {
    const mod = await import('../pages/blog/ResumeWithNoExperience');
    expect(mod.default).toBeDefined();
    expect(typeof mod.default).toBe('function');
  });

  it('BlogIndex module exports a default component', async () => {
    const mod = await import('../pages/blog/BlogIndex');
    expect(mod.default).toBeDefined();
    expect(typeof mod.default).toBe('function');
  });

  it('BlogIndex lists every blog post exactly once', async () => {
    const { POSTS } = await import('../pages/blog/BlogIndex');
    const slugs = POSTS.map((p) => p.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
    expect(slugs).toContain('ai-resume-builder-freshers-2026');
    expect(slugs).toContain('resume-with-no-experience');
  });
});
