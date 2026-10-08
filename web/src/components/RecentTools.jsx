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
      <div className="p-4 rounded-xl" style={{ background: 'rgba(240,180,41,0.08)', border: '1px solid #2A2A2D' }}>
        <div className="text-xs font-semibold uppercase tracking-wide mb-3" style={{ color: '#F0B429' }}>
          Pick up where you left off
        </div>
        <div className="flex gap-2 overflow-x-auto pb-1">
          {recent.map((tool) => (
            <Link
              key={tool.path}
              to={tool.path}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-medium whitespace-nowrap no-underline transition-colors"
              style={{ background: '#1A1A1D', border: '1px solid #2A2A2D', color: '#E5E7EB' }}
            >
              {tool.name}
              <span className="font-bold" style={{ color: '#F0B429' }}>Continue &rarr;</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
