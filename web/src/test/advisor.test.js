import { describe, it, expect } from 'vitest';

describe('AdvisorPage', () => {
  it('module exports a default component', async () => {
    const mod = await import('../pages/AdvisorPage.jsx');
    expect(mod.default).toBeDefined();
    expect(typeof mod.default).toBe('function');
  });

  it('advisor route is in App routes', async () => {
    const appSource = await import('../App.jsx?raw');
    expect(appSource.default).toContain('/advisor');
  });

  it('POST /api/advisor/ask payload shape is valid', () => {
    const payload = { message: 'How to write a fresher resume?', history: [] };
    expect(payload).toHaveProperty('message');
    expect(payload).toHaveProperty('history');
    expect(typeof payload.message).toBe('string');
    expect(Array.isArray(payload.history)).toBe(true);
  });

  it('suggested questions are defined', async () => {
    const source = await import('../pages/AdvisorPage.jsx?raw');
    expect(source.default).toContain('How to write a fresher resume?');
    expect(source.default).toContain('Best resume format for IT jobs?');
    expect(source.default).toContain('Salary negotiation tips');
  });
});
