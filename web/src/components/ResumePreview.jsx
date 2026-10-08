import { ModernTemplate, ClassicTemplate, MinimalistTemplate, CreativeTemplate, AtsTemplate, FresherTemplate, TechnicalTemplate, DesignTemplate } from '../templates';

const templates = {
  modern: ModernTemplate,
  classic: ClassicTemplate,
  minimalist: MinimalistTemplate,
  creative: CreativeTemplate,
  ats: AtsTemplate,
  fresher: FresherTemplate,
  technical: TechnicalTemplate,
  design: DesignTemplate,
};

export default function ResumePreview({ data, template = 'modern', templateColor = '#2563eb' }) {
  const TemplateComponent = templates[template] || ModernTemplate;
  return (
    <div id="resume-preview" className="shadow-xl mx-auto" style={{ transform: 'scale(0.7)', transformOrigin: 'top center' }}>
      <TemplateComponent data={data} templateColor={templateColor} />
    </div>
  );
}
