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
    <section className="bg-gray-50 py-12">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-xl font-bold text-center text-gray-800 mb-2">
          <span role="img" aria-label="fire">🔥</span> Trending on DoAide
        </h2>
        <p className="text-gray-500 text-center text-sm mb-8">Popular free tools across DoAide products</p>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {shown.map((tool) => (
            <a
              key={tool.url}
              href={tool.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group block p-4 bg-white rounded-xl border border-gray-200 hover:border-blue-300 hover:shadow-md transition-all text-center no-underline"
            >
              <span className="text-2xl block mb-2">{tool.icon}</span>
              <div className="text-sm font-semibold text-gray-800 group-hover:text-blue-600 transition-colors">{tool.name}</div>
              <div className="text-xs text-gray-400 mt-1">on {tool.product}</div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
