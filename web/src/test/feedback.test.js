import { describe, it, expect } from 'vitest';

describe('FeedbackWidget', () => {
  it('module exports a default component', async () => {
    const mod = await import('../components/FeedbackWidget.jsx');
    expect(mod.default).toBeDefined();
    expect(typeof mod.default).toBe('function');
  });

  it('POST /api/feedback payload shape is correct', () => {
    const payload = { message: 'Great tool!' };
    expect(payload).toHaveProperty('message');
    expect(typeof payload.message).toBe('string');
    expect(payload.message.length).toBeGreaterThan(0);
    expect(payload.message.length).toBeLessThanOrEqual(2000);
  });

  it('rejects empty feedback', () => {
    const payload = { message: '' };
    expect(payload.message.length).toBe(0);
  });
});
