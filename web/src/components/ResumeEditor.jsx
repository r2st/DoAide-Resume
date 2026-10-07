import { useState } from 'react';

export default function ResumeEditor({ data, setData, onAiEnhance }) {
  const [collapsed, setCollapsed] = useState({});

  const toggle = (section) => {
    setCollapsed((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  const updateField = (section, field, value) => {
    setData((prev) => ({ ...prev, [section]: { ...prev[section], [field]: value } }));
  };

  const updateArrayItem = (section, index, field, value) => {
    setData((prev) => {
      const arr = [...prev[section]];
      arr[index] = { ...arr[index], [field]: value };
      return { ...prev, [section]: arr };
    });
  };

  const addArrayItem = (section, template) => {
    setData((prev) => ({ ...prev, [section]: [...prev[section], template] }));
  };

  const removeArrayItem = (section, index) => {
    setData((prev) => ({
      ...prev,
      [section]: prev[section].filter((_, i) => i !== index),
    }));
  };

  const updateBullet = (expIndex, bulletIndex, value) => {
    setData((prev) => {
      const experience = [...prev.experience];
      const bullets = [...experience[expIndex].bullets];
      bullets[bulletIndex] = value;
      experience[expIndex] = { ...experience[expIndex], bullets };
      return { ...prev, experience };
    });
  };

  const addBullet = (expIndex) => {
    setData((prev) => {
      const experience = [...prev.experience];
      experience[expIndex] = {
        ...experience[expIndex],
        bullets: [...experience[expIndex].bullets, ''],
      };
      return { ...prev, experience };
    });
  };

  const removeBullet = (expIndex, bulletIndex) => {
    setData((prev) => {
      const experience = [...prev.experience];
      experience[expIndex] = {
        ...experience[expIndex],
        bullets: experience[expIndex].bullets.filter((_, i) => i !== bulletIndex),
      };
      return { ...prev, experience };
    });
  };

  const updateSkillItems = (index, value) => {
    setData((prev) => {
      const skills = [...prev.skills];
      skills[index] = {
        ...skills[index],
        items: value.split(',').map((s) => s.trimStart()),
      };
      return { ...prev, skills };
    });
  };

  const inputClass =
    'w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition';
  const labelClass = 'block text-sm font-medium text-gray-700 mb-1';
  const addBtnClass =
    'flex items-center gap-1 px-3 py-1.5 text-sm font-medium text-blue-600 bg-blue-50 hover:bg-blue-100 rounded-md transition';
  const removeBtnClass =
    'flex items-center justify-center w-7 h-7 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-full transition text-lg leading-none';

  const SectionCard = ({ id, title, children }) => {
    const isCollapsed = collapsed[id];
    return (
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <button
          type="button"
          onClick={() => toggle(id)}
          className="w-full flex items-center justify-between px-4 py-3 bg-blue-600 text-white hover:bg-blue-700 transition"
        >
          <span className="font-semibold text-sm">{title}</span>
          <span
            className={`transform transition-transform duration-200 ${isCollapsed ? '-rotate-90' : ''}`}
          >
            ▼
          </span>
        </button>
        <div
          className={`transition-all duration-200 ease-in-out ${isCollapsed ? 'max-h-0 overflow-hidden opacity-0' : 'max-h-[5000px] opacity-100'}`}
        >
          <div className="p-4 space-y-4">{children}</div>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-4 pb-8">
      {/* Personal Info */}
      <SectionCard id="personal" title="Personal Information">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {[
            { field: 'name', label: 'Full Name', type: 'text', placeholder: 'John Doe' },
            { field: 'email', label: 'Email', type: 'email', placeholder: 'john@example.com' },
            { field: 'phone', label: 'Phone', type: 'tel', placeholder: '+1 (555) 123-4567' },
            { field: 'location', label: 'Location', type: 'text', placeholder: 'New York, NY' },
            { field: 'linkedin', label: 'LinkedIn', type: 'url', placeholder: 'linkedin.com/in/johndoe' },
            { field: 'website', label: 'Website', type: 'url', placeholder: 'johndoe.com' },
          ].map(({ field, label, type, placeholder }) => (
            <div key={field}>
              <label className={labelClass}>{label}</label>
              <input
                type={type}
                value={data.personal[field] || ''}
                onChange={(e) => updateField('personal', field, e.target.value)}
                placeholder={placeholder}
                className={inputClass}
              />
            </div>
          ))}
        </div>
      </SectionCard>

      {/* Summary */}
      <SectionCard id="summary" title="Professional Summary">
        <div>
          <label className={labelClass}>Summary</label>
          <textarea
            value={data.summary || ''}
            onChange={(e) => setData((prev) => ({ ...prev, summary: e.target.value }))}
            placeholder="A brief professional summary highlighting your key qualifications..."
            rows={4}
            className={`${inputClass} resize-y`}
          />
          {onAiEnhance && (
            <button
              type="button"
              onClick={() => onAiEnhance('summary')}
              className="mt-2 px-3 py-1.5 text-xs font-medium text-purple-600 bg-purple-50 hover:bg-purple-100 rounded-md transition"
            >
              ✨ AI Enhance
            </button>
          )}
        </div>
      </SectionCard>

      {/* Experience */}
      <SectionCard id="experience" title="Work Experience">
        {data.experience.map((exp, i) => (
          <div key={i} className="relative border border-gray-200 rounded-lg p-4 space-y-3">
            <div className="flex justify-between items-start">
              <span className="text-sm font-medium text-gray-500">Experience {i + 1}</span>
              {data.experience.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeArrayItem('experience', i)}
                  className={removeBtnClass}
                  title="Remove"
                >
                  &times;
                </button>
              )}
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className={labelClass}>Job Title</label>
                <input
                  type="text"
                  value={exp.title || ''}
                  onChange={(e) => updateArrayItem('experience', i, 'title', e.target.value)}
                  placeholder="Software Engineer"
                  className={inputClass}
                />
              </div>
              <div>
                <label className={labelClass}>Company</label>
                <input
                  type="text"
                  value={exp.company || ''}
                  onChange={(e) => updateArrayItem('experience', i, 'company', e.target.value)}
                  placeholder="Acme Inc."
                  className={inputClass}
                />
              </div>
              <div>
                <label className={labelClass}>Location</label>
                <input
                  type="text"
                  value={exp.location || ''}
                  onChange={(e) => updateArrayItem('experience', i, 'location', e.target.value)}
                  placeholder="San Francisco, CA"
                  className={inputClass}
                />
              </div>
              <div className="flex gap-3">
                <div className="flex-1">
                  <label className={labelClass}>Start Date</label>
                  <input
                    type="date"
                    value={exp.startDate || ''}
                    onChange={(e) => updateArrayItem('experience', i, 'startDate', e.target.value)}
                    className={inputClass}
                  />
                </div>
                <div className="flex-1">
                  <label className={labelClass}>End Date</label>
                  <input
                    type="date"
                    value={exp.endDate || ''}
                    onChange={(e) => updateArrayItem('experience', i, 'endDate', e.target.value)}
                    disabled={exp.current}
                    className={`${inputClass} ${exp.current ? 'bg-gray-100 cursor-not-allowed' : ''}`}
                  />
                </div>
              </div>
            </div>
            <label className="flex items-center gap-2 text-sm text-gray-600 cursor-pointer">
              <input
                type="checkbox"
                checked={exp.current || false}
                onChange={(e) => {
                  updateArrayItem('experience', i, 'current', e.target.checked);
                  if (e.target.checked) {
                    updateArrayItem('experience', i, 'endDate', '');
                  }
                }}
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              Currently working here
            </label>

            {/* Bullet Points */}
            <div>
              <label className={labelClass}>Key Achievements / Responsibilities</label>
              <div className="space-y-2">
                {exp.bullets.map((bullet, bi) => (
                  <div key={bi} className="flex items-start gap-2">
                    <span className="text-gray-400 mt-2.5 text-sm select-none">•</span>
                    <input
                      type="text"
                      value={bullet}
                      onChange={(e) => updateBullet(i, bi, e.target.value)}
                      placeholder="Describe an achievement or responsibility..."
                      className={`${inputClass} flex-1`}
                    />
                    {exp.bullets.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeBullet(i, bi)}
                        className={removeBtnClass}
                        title="Remove bullet"
                      >
                        &times;
                      </button>
                    )}
                  </div>
                ))}
              </div>
              <button type="button" onClick={() => addBullet(i)} className={`${addBtnClass} mt-2`}>
                <span>+</span> Add Bullet
              </button>
            </div>
            {onAiEnhance && (
              <button
                type="button"
                onClick={() => onAiEnhance('experience', i)}
                className="px-3 py-1.5 text-xs font-medium text-purple-600 bg-purple-50 hover:bg-purple-100 rounded-md transition"
              >
                ✨ AI Enhance Bullets
              </button>
            )}
          </div>
        ))}
        <button
          type="button"
          onClick={() =>
            addArrayItem('experience', {
              company: '',
              title: '',
              location: '',
              startDate: '',
              endDate: '',
              current: false,
              bullets: [''],
            })
          }
          className={addBtnClass}
        >
          <span>+</span> Add Experience
        </button>
      </SectionCard>

      {/* Education */}
      <SectionCard id="education" title="Education">
        {data.education.map((edu, i) => (
          <div key={i} className="relative border border-gray-200 rounded-lg p-4 space-y-3">
            <div className="flex justify-between items-start">
              <span className="text-sm font-medium text-gray-500">Education {i + 1}</span>
              {data.education.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeArrayItem('education', i)}
                  className={removeBtnClass}
                  title="Remove"
                >
                  &times;
                </button>
              )}
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="sm:col-span-2">
                <label className={labelClass}>Institution</label>
                <input
                  type="text"
                  value={edu.institution || ''}
                  onChange={(e) => updateArrayItem('education', i, 'institution', e.target.value)}
                  placeholder="University of California, Berkeley"
                  className={inputClass}
                />
              </div>
              <div>
                <label className={labelClass}>Degree</label>
                <input
                  type="text"
                  value={edu.degree || ''}
                  onChange={(e) => updateArrayItem('education', i, 'degree', e.target.value)}
                  placeholder="Bachelor of Science"
                  className={inputClass}
                />
              </div>
              <div>
                <label className={labelClass}>Field of Study</label>
                <input
                  type="text"
                  value={edu.field || ''}
                  onChange={(e) => updateArrayItem('education', i, 'field', e.target.value)}
                  placeholder="Computer Science"
                  className={inputClass}
                />
              </div>
              <div>
                <label className={labelClass}>Start Date</label>
                <input
                  type="date"
                  value={edu.startDate || ''}
                  onChange={(e) => updateArrayItem('education', i, 'startDate', e.target.value)}
                  className={inputClass}
                />
              </div>
              <div>
                <label className={labelClass}>End Date</label>
                <input
                  type="date"
                  value={edu.endDate || ''}
                  onChange={(e) => updateArrayItem('education', i, 'endDate', e.target.value)}
                  className={inputClass}
                />
              </div>
              <div>
                <label className={labelClass}>GPA</label>
                <input
                  type="text"
                  value={edu.gpa || ''}
                  onChange={(e) => updateArrayItem('education', i, 'gpa', e.target.value)}
                  placeholder="3.8 / 4.0"
                  className={inputClass}
                />
              </div>
            </div>
          </div>
        ))}
        <button
          type="button"
          onClick={() =>
            addArrayItem('education', {
              institution: '',
              degree: '',
              field: '',
              startDate: '',
              endDate: '',
              gpa: '',
            })
          }
          className={addBtnClass}
        >
          <span>+</span> Add Education
        </button>
      </SectionCard>

      {/* Skills */}
      <SectionCard id="skills" title="Skills">
        {data.skills.map((skill, i) => (
          <div key={i} className="relative border border-gray-200 rounded-lg p-4 space-y-3">
            <div className="flex justify-between items-start">
              <span className="text-sm font-medium text-gray-500">Skill Category {i + 1}</span>
              {data.skills.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeArrayItem('skills', i)}
                  className={removeBtnClass}
                  title="Remove"
                >
                  &times;
                </button>
              )}
            </div>
            <div>
              <label className={labelClass}>Category Name</label>
              <input
                type="text"
                value={skill.category || ''}
                onChange={(e) => updateArrayItem('skills', i, 'category', e.target.value)}
                placeholder="Technical"
                className={inputClass}
              />
            </div>
            <div>
              <label className={labelClass}>Skills (comma-separated)</label>
              <input
                type="text"
                value={(skill.items || []).join(', ')}
                onChange={(e) => updateSkillItems(i, e.target.value)}
                placeholder="JavaScript, React, Node.js, Python"
                className={inputClass}
              />
            </div>
          </div>
        ))}
        <button
          type="button"
          onClick={() => addArrayItem('skills', { category: 'Technical', items: [''] })}
          className={addBtnClass}
        >
          <span>+</span> Add Skill Category
        </button>
      </SectionCard>

      {/* Projects */}
      <SectionCard id="projects" title="Projects">
        {data.projects.map((proj, i) => (
          <div key={i} className="relative border border-gray-200 rounded-lg p-4 space-y-3">
            <div className="flex justify-between items-start">
              <span className="text-sm font-medium text-gray-500">Project {i + 1}</span>
              {data.projects.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeArrayItem('projects', i)}
                  className={removeBtnClass}
                  title="Remove"
                >
                  &times;
                </button>
              )}
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className={labelClass}>Project Name</label>
                <input
                  type="text"
                  value={proj.name || ''}
                  onChange={(e) => updateArrayItem('projects', i, 'name', e.target.value)}
                  placeholder="E-commerce Platform"
                  className={inputClass}
                />
              </div>
              <div>
                <label className={labelClass}>Link</label>
                <input
                  type="url"
                  value={proj.link || ''}
                  onChange={(e) => updateArrayItem('projects', i, 'link', e.target.value)}
                  placeholder="https://github.com/user/project"
                  className={inputClass}
                />
              </div>
              <div className="sm:col-span-2">
                <label className={labelClass}>Technologies</label>
                <input
                  type="text"
                  value={proj.technologies || ''}
                  onChange={(e) => updateArrayItem('projects', i, 'technologies', e.target.value)}
                  placeholder="React, Node.js, PostgreSQL"
                  className={inputClass}
                />
              </div>
              <div className="sm:col-span-2">
                <label className={labelClass}>Description</label>
                <textarea
                  value={proj.description || ''}
                  onChange={(e) => updateArrayItem('projects', i, 'description', e.target.value)}
                  placeholder="Brief description of the project..."
                  rows={2}
                  className={`${inputClass} resize-y`}
                />
              </div>
            </div>
          </div>
        ))}
        <button
          type="button"
          onClick={() =>
            addArrayItem('projects', { name: '', description: '', technologies: '', link: '' })
          }
          className={addBtnClass}
        >
          <span>+</span> Add Project
        </button>
      </SectionCard>

      {/* Certifications */}
      <SectionCard id="certifications" title="Certifications">
        {data.certifications.map((cert, i) => (
          <div key={i} className="relative border border-gray-200 rounded-lg p-4 space-y-3">
            <div className="flex justify-between items-start">
              <span className="text-sm font-medium text-gray-500">Certification {i + 1}</span>
              {data.certifications.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeArrayItem('certifications', i)}
                  className={removeBtnClass}
                  title="Remove"
                >
                  &times;
                </button>
              )}
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className={labelClass}>Certification Name</label>
                <input
                  type="text"
                  value={cert.name || ''}
                  onChange={(e) => updateArrayItem('certifications', i, 'name', e.target.value)}
                  placeholder="AWS Solutions Architect"
                  className={inputClass}
                />
              </div>
              <div>
                <label className={labelClass}>Issuer</label>
                <input
                  type="text"
                  value={cert.issuer || ''}
                  onChange={(e) => updateArrayItem('certifications', i, 'issuer', e.target.value)}
                  placeholder="Amazon Web Services"
                  className={inputClass}
                />
              </div>
              <div>
                <label className={labelClass}>Date</label>
                <input
                  type="date"
                  value={cert.date || ''}
                  onChange={(e) => updateArrayItem('certifications', i, 'date', e.target.value)}
                  className={inputClass}
                />
              </div>
            </div>
          </div>
        ))}
        <button
          type="button"
          onClick={() => addArrayItem('certifications', { name: '', issuer: '', date: '' })}
          className={addBtnClass}
        >
          <span>+</span> Add Certification
        </button>
      </SectionCard>

      {/* Languages */}
      <SectionCard id="languages" title="Languages">
        {data.languages.map((lang, i) => (
          <div key={i} className="relative border border-gray-200 rounded-lg p-4">
            <div className="flex justify-between items-start mb-3">
              <span className="text-sm font-medium text-gray-500">Language {i + 1}</span>
              {data.languages.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeArrayItem('languages', i)}
                  className={removeBtnClass}
                  title="Remove"
                >
                  &times;
                </button>
              )}
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className={labelClass}>Language</label>
                <input
                  type="text"
                  value={lang.language || ''}
                  onChange={(e) => updateArrayItem('languages', i, 'language', e.target.value)}
                  placeholder="English"
                  className={inputClass}
                />
              </div>
              <div>
                <label className={labelClass}>Proficiency</label>
                <select
                  value={lang.proficiency || 'Professional'}
                  onChange={(e) => updateArrayItem('languages', i, 'proficiency', e.target.value)}
                  className={inputClass}
                >
                  <option value="Native">Native</option>
                  <option value="Professional">Professional</option>
                  <option value="Intermediate">Intermediate</option>
                  <option value="Basic">Basic</option>
                </select>
              </div>
            </div>
          </div>
        ))}
        <button
          type="button"
          onClick={() => addArrayItem('languages', { language: '', proficiency: 'Professional' })}
          className={addBtnClass}
        >
          <span>+</span> Add Language
        </button>
      </SectionCard>

      {/* Hobbies */}
      <SectionCard id="hobbies" title="Hobbies & Interests">
        <div className="space-y-2">
          {data.hobbies.map((hobby, i) => (
            <div key={i} className="flex items-center gap-2">
              <input
                type="text"
                value={hobby}
                onChange={(e) => {
                  setData((prev) => {
                    const hobbies = [...prev.hobbies];
                    hobbies[i] = e.target.value;
                    return { ...prev, hobbies };
                  });
                }}
                placeholder="e.g. Photography, Hiking, Open Source"
                className={`${inputClass} flex-1`}
              />
              {data.hobbies.length > 1 && (
                <button
                  type="button"
                  onClick={() => {
                    setData((prev) => ({
                      ...prev,
                      hobbies: prev.hobbies.filter((_, idx) => idx !== i),
                    }));
                  }}
                  className={removeBtnClass}
                  title="Remove"
                >
                  &times;
                </button>
              )}
            </div>
          ))}
        </div>
        <button
          type="button"
          onClick={() => setData((prev) => ({ ...prev, hobbies: [...prev.hobbies, ''] }))}
          className={`${addBtnClass} mt-2`}
        >
          <span>+</span> Add Hobby
        </button>
      </SectionCard>
    </div>
  );
}
