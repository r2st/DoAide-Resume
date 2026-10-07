import { ModernTemplate, ClassicTemplate, MinimalistTemplate, CreativeTemplate, AtsTemplate } from '../templates';

const templates = {
  modern: ModernTemplate,
  classic: ClassicTemplate,
  minimalist: MinimalistTemplate,
  creative: CreativeTemplate,
  ats: AtsTemplate,
};

export default function ResumePreview({ data, template = 'modern', templateColor = '#2563eb' }) {
  const TemplateComponent = templates[template] || ModernTemplate;
  return (
    <div id="resume-preview" className="shadow-xl mx-auto" style={{ transform: 'scale(0.7)', transformOrigin: 'top center' }}>
      <TemplateComponent data={data} templateColor={templateColor} />
    </div>
  );
}
