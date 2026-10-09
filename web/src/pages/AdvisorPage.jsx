import { useState, useRef, useEffect } from 'react';

const SUGGESTED_QUESTIONS = [
  'How to write a fresher resume?',
  'Best resume format for IT jobs?',
  'How to explain career gap?',
  'Salary negotiation tips',
];

function MessageBubble({ role, text }) {
  const isUser = role === 'user';
  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-3`}>
      <div
        className="max-w-[80%] rounded-2xl px-4 py-3 text-sm leading-relaxed whitespace-pre-wrap"
        style={
          isUser
            ? { background: '#F0B429', color: '#0A0A0B' }
            : { background: '#1e1e22', color: '#e5e7eb', border: '1px solid #2a2a2d' }
        }
      >
        {text}
      </div>
    </div>
  );
}

function TypingIndicator() {
  return (
    <div className="flex justify-start mb-3">
      <div
        className="rounded-2xl px-4 py-3 flex items-center gap-1"
        style={{ background: '#1e1e22', border: '1px solid #2a2a2d' }}
      >
        {[0, 1, 2].map((i) => (
          <span
            key={i}
            className="inline-block w-2 h-2 rounded-full"
            style={{
              background: '#F0B429',
              animation: 'bounce 1.2s infinite',
              animationDelay: `${i * 0.2}s`,
            }}
          />
        ))}
      </div>
    </div>
  );
}

export default function AdvisorPage() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  useEffect(() => {
    document.title = 'Free AI Career Advisor - Resume & Interview Help | DoAide Resume';
    const meta = document.querySelector('meta[name="description"]');
    if (meta) meta.setAttribute('content', 'Get free AI-powered career advice. Resume writing tips, interview preparation, salary negotiation, and job search strategies for Indian job seekers.');
  }, []);

  const sendMessage = async (text) => {
    if (!text.trim() || loading) return;
    const userMsg = { role: 'user', text: text.trim() };
    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setLoading(true);

    try {
      const history = messages.map((m) => ({ role: m.role, text: m.text }));
      const res = await fetch('/api/advisor/ask', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: text.trim(), history }),
      });
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.detail || 'Something went wrong');
      }
      const data = await res.json();
      setMessages((prev) => [...prev, { role: 'assistant', text: data.reply }]);
    } catch (e) {
      setMessages((prev) => [
        ...prev,
        { role: 'assistant', text: `Sorry, I couldn't respond right now. ${e.message}` },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    sendMessage(input);
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <style>{`
        @keyframes bounce {
          0%, 60%, 100% { transform: translateY(0); }
          30% { transform: translateY(-6px); }
        }
      `}</style>

      <div className="text-center mb-8">
        <h1
          className="text-3xl sm:text-4xl font-bold mb-2"
          style={{ fontFamily: "'Instrument Serif', Georgia, serif", color: '#E5E7EB' }}
        >
          AI Career <em style={{ color: '#F0B429', fontStyle: 'italic' }}>Advisor</em>
        </h1>
        <p className="text-sm" style={{ color: '#9CA3AF' }}>
          Free AI-powered career advice for Indian job seekers. Ask anything about resumes, interviews, or job search.
        </p>
      </div>

      <div
        className="rounded-xl p-4 mb-4"
        style={{
          background: '#111113',
          border: '1px solid #2a2a2d',
          minHeight: '320px',
          maxHeight: '60vh',
          overflowY: 'auto',
        }}
      >
        {messages.length === 0 && !loading && (
          <div className="flex flex-col items-center justify-center h-64 gap-4">
            <p className="text-sm" style={{ color: '#6b7280' }}>
              Ask me anything about your career
            </p>
            <div className="flex flex-wrap justify-center gap-2">
              {SUGGESTED_QUESTIONS.map((q) => (
                <button
                  key={q}
                  onClick={() => sendMessage(q)}
                  className="px-3 py-2 rounded-lg text-xs font-medium transition-colors"
                  style={{ background: '#1e1e22', color: '#d1d5db', border: '1px solid #333' }}
                  onMouseEnter={(e) => (e.target.style.borderColor = '#F0B429')}
                  onMouseLeave={(e) => (e.target.style.borderColor = '#333')}
                >
                  {q}
                </button>
              ))}
            </div>
          </div>
        )}

        {messages.map((msg, i) => (
          <MessageBubble key={i} role={msg.role} text={msg.text} />
        ))}
        {loading && <TypingIndicator />}
        <div ref={bottomRef} />
      </div>

      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask about resumes, interviews, careers…"
          className="flex-1 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-500"
          style={{ background: '#1e1e22', color: '#e5e7eb', border: '1px solid #333' }}
          disabled={loading}
        />
        <button
          type="submit"
          disabled={loading || !input.trim()}
          className="px-5 py-3 rounded-lg text-sm font-semibold transition-colors disabled:opacity-50"
          style={{ background: '#F0B429', color: '#0A0A0B' }}
        >
          Send
        </button>
      </form>
    </div>
  );
}
