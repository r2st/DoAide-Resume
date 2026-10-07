import { useState } from 'react';

export default function SectionEditor({ title, icon = '📝', defaultOpen = true, children }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-4 py-3 bg-gray-50 hover:bg-gray-100 transition-colors"
      >
        <span className="font-semibold text-gray-700 flex items-center gap-2">
          <span>{icon}</span> {title}
        </span>
        <span className={`transform transition-transform ${open ? 'rotate-180' : ''}`}>&#9660;</span>
      </button>
      {open && <div className="p-4">{children}</div>}
    </div>
  );
}
