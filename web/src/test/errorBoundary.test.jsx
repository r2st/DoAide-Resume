// @vitest-environment jsdom
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { createRoot } from 'react-dom/client';
import { flushSync } from 'react-dom';
import ErrorBoundary from '../components/ErrorBoundary';

function Bomb({ explode }) {
  if (explode) throw new Error('boom');
  return <div>safe content</div>;
}

let container;
beforeEach(() => {
  container = document.createElement('div');
  document.body.appendChild(container);
});

describe('ErrorBoundary', () => {
  it('renders children when nothing throws', () => {
    const root = createRoot(container);
    flushSync(() => {
      root.render(
        <ErrorBoundary>
          <Bomb explode={false} />
        </ErrorBoundary>,
      );
    });
    expect(container.textContent).toContain('safe content');
    root.unmount();
  });

  it('shows fallback UI with recovery actions when a child throws', () => {
    const spy = vi.spyOn(console, 'error').mockImplementation(() => {});
    const root = createRoot(container);
    flushSync(() => {
      root.render(
        <ErrorBoundary>
          <Bomb explode={true} />
        </ErrorBoundary>,
      );
    });
    expect(container.querySelector('[role="alert"]')).toBeTruthy();
    expect(container.textContent).toContain('Something went wrong');
    expect(container.textContent).toContain('Try Again');
    expect(container.textContent).toContain('Reload App');
    spy.mockRestore();
    root.unmount();
  });
});
