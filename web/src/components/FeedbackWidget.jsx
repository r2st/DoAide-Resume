import { useState } from 'react';

export default function FeedbackWidget() {
  const [open, setOpen] = useState(false);
  const [text, setText] = useState('');
  const [status, setStatus] = useState('idle');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!text.trim()) return;
    setStatus('sending');
    try {
      const res = await fetch('/api/feedback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: text.trim() }),
      });
      if (!res.ok) throw new Error();
      setStatus('sent');
      setText('');
      setTimeout(() => { setOpen(false); setStatus('idle'); }, 1500);
    } catch {
      setStatus('error');
    }
  };

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="fixed z-50 no-print px-3 py-2 rounded-lg text-xs font-semibold shadow-lg transition-transform hover:-translate-y-0.5"
        style={{
          bottom: '24px',
          left: '24px',
          background: '#23232a',
          color: '#ccc',
          border: '1px solid #333',
          display: open ? 'none' : 'block',
        }}
      >
        Feedback
      </button>

      {open && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center"
          style={{ background: 'rgba(0,0,0,0.6)' }}
          onClick={() => { setOpen(false); setStatus('idle'); }}
        >
          <form
            onClick={(e) => e.stopPropagation()}
            onSubmit={handleSubmit}
            className="rounded-xl p-6 w-full max-w-md mx-4 shadow-2xl"
            style={{ background: '#18181b', border: '1px solid #333' }}
          >
            <h3 className="text-white text-lg font-semibold mb-3">Send Feedback</h3>
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="What can we improve?"
              rows={4}
              className="w-full rounded-lg p-3 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-yellow-500"
              style={{ background: '#0a0a0b', color: '#eee', border: '1px solid #333' }}
              autoFocus
            />
            <div className="flex items-center justify-between mt-3">
              <button
                type="button"
                onClick={() => { setOpen(false); setStatus('idle'); }}
                className="text-sm px-3 py-1.5 rounded-lg"
                style={{ color: '#999' }}
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={status === 'sending' || status === 'sent' || !text.trim()}
                className="text-sm font-semibold px-4 py-1.5 rounded-lg transition-colors disabled:opacity-50"
                style={{ background: '#F0B429', color: '#0A0A0B' }}
              >
                {status === 'sending' ? 'Sending…' : status === 'sent' ? 'Sent!' : status === 'error' ? 'Retry' : 'Submit'}
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  );
}
