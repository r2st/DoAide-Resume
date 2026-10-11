import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getRecentTools } from "../lib/doaideViral";

export default function RecentTools() {
  const [recent, setRecent] = useState([]);

  useEffect(() => {
    setRecent(getRecentTools());
  }, []);

  if (recent.length === 0) return null;

  return (
    <section className="max-w-5xl mx-auto px-4 pt-6 pb-2">
      <div className="p-4 rounded-xl" style={{ background: 'rgba(13,148,136,0.08)', border: '1px solid var(--da-border, #E2E8F0)' }}>
        <div className="text-xs font-semibold uppercase tracking-wide mb-3" style={{ color: '#0D9488' }}>
          Pick up where you left off
        </div>
        <div className="flex gap-2 overflow-x-auto pb-1">
          {recent.map((tool) => (
            <Link
              key={tool.path}
              to={tool.path}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-medium whitespace-nowrap no-underline transition-colors"
              style={{ background: 'var(--da-surface, #F8FFFE)', border: '1px solid var(--da-border, #E2E8F0)', color: 'var(--da-text, #1E293B)' }}
            >
              {tool.name}
              <span className="font-bold" style={{ color: '#0D9488' }}>Continue &rarr;</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
