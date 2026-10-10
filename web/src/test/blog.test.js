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
});
