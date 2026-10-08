import { useMemo } from "react";
import { TRENDING_TOOLS } from "../lib/doaideViral";

export default function TrendingTools() {
  const shown = useMemo(() => {
    const day = new Date().getDate();
    const shuffled = [...TRENDING_TOOLS];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = (day + i * 7) % (i + 1);
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled.slice(0, 6);
  }, []);

  return (
    <section className="py-12" style={{ background: '#111113' }}>
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-xl font-bold text-center mb-2" style={{ color: '#E5E7EB' }}>
          <span role="img" aria-label="fire">🔥</span> Trending on DoAide
        </h2>
        <p className="text-center text-sm mb-8" style={{ color: '#6B7280' }}>Popular free tools across DoAide products</p>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {shown.map((tool) => (
            <a
              key={tool.url}
              href={tool.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group block p-4 rounded-xl transition-all text-center no-underline"
              style={{ background: '#1A1A1D', border: '1px solid #2A2A2D' }}
            >
              <span className="text-2xl block mb-2">{tool.icon}</span>
              <div className="text-sm font-semibold transition-colors" style={{ color: '#E5E7EB' }}>{tool.name}</div>
              <div className="text-xs mt-1" style={{ color: '#6B7280' }}>on {tool.product}</div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
