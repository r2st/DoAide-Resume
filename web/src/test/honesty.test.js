import { describe, expect, it } from 'vitest';

describe('no fabricated social proof', () => {
  it('HomePage has no fake resume counter', async () => {
    const raw = (await import('../pages/HomePage.jsx?raw')).default;
    expect(raw).not.toContain('AnimatedCounter');
    expect(raw).not.toContain('Resumes Created');
    expect(raw).not.toContain('50000');
  });

  it('ShareButtons shows no fake daily usage count', async () => {
    const raw = (await import('../components/ShareButtons.jsx?raw')).default;
    expect(raw).not.toContain('people used');
    expect(raw).not.toMatch(/seed\s*\*\s*hash/);
  });

  it('HomePage builder has a WhatsApp share', async () => {
    const raw = (await import('../pages/HomePage.jsx?raw')).default;
    expect(raw).toContain('ShareButtons');
  });
});
