import { Component } from 'react';

export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { error: null };
  }

  static getDerivedStateFromError(error) {
    return { error };
  }

  componentDidCatch(error, info) {
    if (import.meta.env.DEV) console.error('Route error:', error, info);
  }

  handleRetry = () => {
    this.setState({ error: null });
  };

  render() {
    if (!this.state.error) return this.props.children;
    return (
      <div role="alert" className="max-w-xl mx-auto my-16 px-6 py-12 text-center rounded-xl" style={{ background: 'var(--da-surface, #F8FFFE)', border: '1px solid var(--da-border, #E2E8F0)' }}>
        <div className="text-3xl mb-3">⚠️</div>
        <h2 className="text-lg font-bold mb-2" style={{ color: 'var(--da-text, #1E293B)' }}>Something went wrong</h2>
        <p className="text-sm mb-5" style={{ color: 'var(--da-text-muted, #94A3B8)' }}>
          This page hit an unexpected error. Your resume data is saved in your browser — try again, or reload the app.
        </p>
        <div className="flex items-center justify-center gap-3 flex-wrap">
          <button
            onClick={this.handleRetry}
            className="inline-flex items-center min-h-[48px] px-6 py-2.5 rounded-lg font-semibold text-sm text-white"
            style={{ background: '#0D9488' }}
          >
            Try Again
          </button>
          <button
            onClick={() => window.location.reload()}
            className="inline-flex items-center min-h-[48px] px-6 py-2.5 rounded-lg font-semibold text-sm"
            style={{ background: 'transparent', color: '#0D9488', border: '1px solid var(--da-border, #E2E8F0)' }}
          >
            Reload App
          </button>
        </div>
      </div>
    );
  }
}
