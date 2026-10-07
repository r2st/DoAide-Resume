const templateOptions = [
  {
    id: 'modern',
    name: 'Modern',
    description: 'Two-column layout with sidebar',
    preview: 'sidebar',
  },
  {
    id: 'classic',
    name: 'Classic',
    description: 'Traditional professional format',
    preview: 'classic',
  },
  {
    id: 'minimalist',
    name: 'Minimalist',
    description: 'Clean and minimal design',
    preview: 'minimal',
  },
  {
    id: 'creative',
    name: 'Creative',
    description: 'Bold and eye-catching',
    preview: 'creative',
  },
  {
    id: 'ats',
    name: 'ATS-Friendly',
    description: 'Optimized for applicant tracking systems',
    preview: 'ats',
  },
];

const presetColors = [
  { value: '#2563eb', label: 'Blue' },
  { value: '#059669', label: 'Green' },
  { value: '#dc2626', label: 'Red' },
  { value: '#7c3aed', label: 'Purple' },
  { value: '#d97706', label: 'Amber' },
  { value: '#0891b2', label: 'Cyan' },
];

function MiniPreview({ type, color }) {
  if (type === 'sidebar') {
    return (
      <div className="w-full h-24 flex rounded overflow-hidden border border-gray-200">
        <div className="w-1/3 h-full" style={{ backgroundColor: color }} />
        <div className="w-2/3 h-full bg-white p-2 space-y-1">
          <div className="h-2 w-3/4 bg-gray-300 rounded" />
          <div className="h-1.5 w-full bg-gray-200 rounded" />
          <div className="h-1.5 w-full bg-gray-200 rounded" />
          <div className="h-1.5 w-5/6 bg-gray-200 rounded" />
        </div>
      </div>
    );
  }
  if (type === 'classic') {
    return (
      <div className="w-full h-24 bg-white rounded overflow-hidden border border-gray-200 p-2 space-y-1">
        <div className="h-3 w-1/2 mx-auto rounded" style={{ backgroundColor: color }} />
        <div className="h-0.5 w-full rounded" style={{ backgroundColor: color, opacity: 0.3 }} />
        <div className="h-1.5 w-full bg-gray-200 rounded" />
        <div className="h-1.5 w-full bg-gray-200 rounded" />
        <div className="h-1.5 w-5/6 bg-gray-200 rounded" />
        <div className="h-1.5 w-full bg-gray-200 rounded" />
      </div>
    );
  }
  if (type === 'minimal') {
    return (
      <div className="w-full h-24 bg-white rounded overflow-hidden border border-gray-200 p-3 space-y-2">
        <div className="h-2.5 w-2/5 bg-gray-800 rounded" />
        <div className="h-1 w-full bg-gray-100 rounded" />
        <div className="h-1 w-full bg-gray-100 rounded" />
        <div className="h-1 w-3/4 bg-gray-100 rounded" />
      </div>
    );
  }
  if (type === 'creative') {
    return (
      <div className="w-full h-24 rounded overflow-hidden border border-gray-200">
        <div className="h-8 w-full" style={{ backgroundColor: color }} />
        <div className="bg-white p-2 space-y-1">
          <div className="h-1.5 w-full bg-gray-200 rounded" />
          <div className="h-1.5 w-full bg-gray-200 rounded" />
          <div className="h-1.5 w-2/3 bg-gray-200 rounded" />
        </div>
      </div>
    );
  }
  // ats
  return (
    <div className="w-full h-24 bg-white rounded overflow-hidden border border-gray-200 p-2 space-y-1">
      <div className="h-2.5 w-1/2 bg-gray-800 rounded" />
      <div className="h-1.5 w-full bg-gray-200 rounded" />
      <div className="h-1.5 w-full bg-gray-200 rounded" />
      <div className="h-1.5 w-full bg-gray-200 rounded" />
      <div className="h-1.5 w-5/6 bg-gray-200 rounded" />
    </div>
  );
}

export default function TemplateSelector({ selected, onSelect, color, onColorChange }) {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-sm font-semibold text-gray-700 mb-3">Choose Template</h3>
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-3">
          {templateOptions.map((tmpl) => (
            <button
              key={tmpl.id}
              onClick={() => onSelect(tmpl.id)}
              className={`p-3 rounded-lg border-2 text-left transition-all hover:shadow-md ${
                selected === tmpl.id
                  ? 'ring-2 ring-blue-600 border-blue-600 bg-blue-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <MiniPreview type={tmpl.preview} color={color} />
              <p className="mt-2 text-sm font-medium text-gray-800">{tmpl.name}</p>
              <p className="text-xs text-gray-500">{tmpl.description}</p>
            </button>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-sm font-semibold text-gray-700 mb-3">Accent Color</h3>
        <div className="flex flex-wrap items-center gap-2">
          {presetColors.map((preset) => (
            <button
              key={preset.value}
              onClick={() => onColorChange(preset.value)}
              title={preset.label}
              className={`w-8 h-8 rounded-full border-2 transition-transform hover:scale-110 ${
                color === preset.value ? 'border-gray-800 scale-110' : 'border-gray-300'
              }`}
              style={{ backgroundColor: preset.value }}
            />
          ))}
          <label className="flex items-center gap-2 ml-2">
            <span className="text-xs text-gray-500">Custom:</span>
            <input
              type="color"
              value={color}
              onChange={(e) => onColorChange(e.target.value)}
              className="w-8 h-8 rounded cursor-pointer border border-gray-300"
            />
          </label>
        </div>
      </div>
    </div>
  );
}
