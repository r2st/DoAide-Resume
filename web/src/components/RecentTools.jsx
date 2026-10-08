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
      <div className="p-4 rounded-xl bg-blue-50 border border-blue-100">
        <div className="text-xs font-semibold text-blue-600 uppercase tracking-wide mb-3">
          Pick up where you left off
        </div>
        <div className="flex gap-2 overflow-x-auto pb-1">
          {recent.map((tool) => (
            <Link
              key={tool.path}
              to={tool.path}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-gray-200 text-gray-800 text-xs font-medium whitespace-nowrap no-underline hover:border-blue-300 hover:text-blue-600 transition-colors"
            >
              {tool.name}
              <span className="text-blue-600 font-bold">Continue &rarr;</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
