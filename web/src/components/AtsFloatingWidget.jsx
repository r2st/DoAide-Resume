import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

export default function AtsFloatingWidget() {
  const [dismissed, setDismissed] = useState(false);
  const navigate = useNavigate();
  const { pathname } = useLocation();

  useEffect(() => {
    try {
      if (sessionStorage.getItem('ats_widget_dismissed') === '1') {
        setDismissed(true);
      }
    } catch {}
  }, []);

  if (dismissed || pathname === '/ats-checker') return null;

  const handleDismiss = (e) => {
    e.stopPropagation();
    setDismissed(true);
    try { sessionStorage.setItem('ats_widget_dismissed', '1'); } catch {}
  };

  return (
    <div
      className="fixed z-40 no-print"
      style={{ bottom: '24px', right: '24px' }}
    >
      <button
        onClick={() => navigate('/ats-checker')}
        className="relative flex items-center gap-2 px-4 py-3 rounded-xl font-semibold text-sm shadow-lg transition-transform hover:-translate-y-0.5"
        style={{ background: '#F0B429', color: '#0A0A0B', boxShadow: '0 0 20px rgba(240,180,41,0.3)' }}
      >
        <span className="absolute -top-1 -right-1 flex h-3 w-3">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-yellow-300 opacity-75" />
          <span className="relative inline-flex rounded-full h-3 w-3 bg-yellow-400" />
        </span>
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        Check ATS Score
        <span
          onClick={handleDismiss}
          className="ml-1 opacity-60 hover:opacity-100 transition-opacity"
          style={{ cursor: 'pointer', lineHeight: 1 }}
        >
          &times;
        </span>
      </button>
    </div>
  );
}
