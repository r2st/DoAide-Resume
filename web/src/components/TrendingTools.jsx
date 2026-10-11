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
    <section className="py-12" style={{ background: 'var(--da-bg-alt, #F8FFFE)' }}>
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-xl font-bold text-center mb-2" style={{ color: 'var(--da-text, #1E293B)' }}>
          <span role="img" aria-label="fire">🔥</span> Trending on DoAide
        </h2>
        <p className="text-center text-sm mb-8" style={{ color: 'var(--da-text-muted, #94A3B8)' }}>Popular free tools across DoAide products</p>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {shown.map((tool) => (
            <a
              key={tool.url}
              href={tool.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group block p-4 rounded-xl transition-all text-center no-underline"
              style={{ background: 'var(--da-surface, #F8FFFE)', border: '1px solid var(--da-border, #E2E8F0)' }}
            >
              <span className="text-2xl block mb-2">{tool.icon}</span>
              <div className="text-sm font-semibold transition-colors" style={{ color: 'var(--da-text, #1E293B)' }}>{tool.name}</div>
              <div className="text-xs mt-1" style={{ color: 'var(--da-text-muted, #94A3B8)' }}>on {tool.product}</div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
