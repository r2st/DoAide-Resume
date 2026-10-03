import { useState } from 'react'
import { buildResume } from '../api'

const INITIAL = {
  full_name: '',
  email: '',
  phone: '',
  location: '',
  target_role: '',
  summary: '',
  skills: [],
  experience: [],
  education: [],
}

export default function ResumeBuilder() {
  const [step, setStep] = useState(1)
  const [data, setData] = useState(INITIAL)
  const [skillInput, setSkillInput] = useState('')
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  function update(field, value) {
    setData(prev => ({ ...prev, [field]: value }))
  }

  function addSkill() {
    if (skillInput.trim()) {
      update('skills', [...data.skills, skillInput.trim()])
      setSkillInput('')
    }
  }

  function removeSkill(index) {
    update('skills', data.skills.filter((_, i) => i !== index))
  }

  function addExperience() {
    update('experience', [...data.experience, { title: '', company: '', dates: '', description: '' }])
  }

  function updateExperience(index, field, value) {
    const updated = [...data.experience]
    updated[index] = { ...updated[index], [field]: value }
    update('experience', updated)
  }

  function addEducation() {
    update('education', [...data.education, { degree: '', school: '', year: '' }])
  }

  function updateEducation(index, field, value) {
    const updated = [...data.education]
    updated[index] = { ...updated[index], [field]: value }
    update('education', updated)
  }

  async function handleGenerate() {
    if (!data.full_name.trim()) {
      setError('Please enter your name')
      return
    }
    setError('')
    setLoading(true)
    try {
      const res = await buildResume(data)
      setResult(res)
    } catch (e) {
      setError(e.message)
    } finally {
      setLoading(false)
    }
  }

  function copyToClipboard() {
    if (result?.full_resume) {
      navigator.clipboard.writeText(result.full_resume)
    }
  }

  if (result) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold mb-6 text-center">
          Your <span className="text-brand-gold">ATS-Optimized</span> Resume
        </h1>

        <div className="border border-brand-border rounded-xl p-6 bg-brand-card mb-6">
          <pre className="whitespace-pre-wrap text-sm leading-relaxed font-sans">{result.full_resume}</pre>
        </div>

        <div className="flex gap-4">
          <button
            onClick={copyToClipboard}
            className="flex-1 py-3 bg-brand-gold text-brand-dark font-bold rounded-xl hover:bg-brand-gold-hover transition-colors"
          >
            Copy to Clipboard
          </button>
          <button
            onClick={() => { setResult(null); setStep(1); setData(INITIAL) }}
            className="flex-1 py-3 border border-brand-border text-white font-medium rounded-xl hover:border-brand-gold transition-colors"
          >
            Start Over
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <div className="text-center mb-10">
        <h1 className="text-3xl md:text-4xl font-bold mb-3">
          AI Resume <span className="text-brand-gold">Builder</span>
        </h1>
        <p className="text-brand-muted">Enter your details and let AI create an ATS-optimized resume</p>
      </div>

      <div className="flex justify-center gap-2 mb-8">
        {[1, 2, 3, 4].map(s => (
          <div key={s} className="flex items-center gap-2">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
              step >= s ? 'bg-brand-gold text-brand-dark' : 'bg-brand-border text-brand-muted'
            }`}>
              {s}
            </div>
            {s < 4 && <div className={`w-8 h-0.5 ${step > s ? 'bg-brand-gold' : 'bg-brand-border'}`} />}
          </div>
        ))}
      </div>

      <div className="border border-brand-border rounded-xl p-6 bg-brand-card">
        {step === 1 && (
          <div className="space-y-4">
            <h2 className="text-xl font-bold mb-4">Personal Information</h2>
            <input placeholder="Full Name *" value={data.full_name} onChange={e => update('full_name', e.target.value)} />
            <input placeholder="Email" value={data.email} onChange={e => update('email', e.target.value)} />
            <input placeholder="Phone" value={data.phone} onChange={e => update('phone', e.target.value)} />
            <input placeholder="Location (City, State)" value={data.location} onChange={e => update('location', e.target.value)} />
            <input placeholder="Target Role (e.g., Software Engineer)" value={data.target_role} onChange={e => update('target_role', e.target.value)} />
            <textarea placeholder="Brief professional summary (optional)" value={data.summary} onChange={e => update('summary', e.target.value)} rows={3} />
          </div>
        )}

        {step === 2 && (
          <div className="space-y-4">
            <h2 className="text-xl font-bold mb-4">Work Experience</h2>
            {data.experience.map((exp, i) => (
              <div key={i} className="border border-brand-border rounded-lg p-4 space-y-3">
                <input placeholder="Job Title" value={exp.title} onChange={e => updateExperience(i, 'title', e.target.value)} />
                <input placeholder="Company" value={exp.company} onChange={e => updateExperience(i, 'company', e.target.value)} />
                <input placeholder="Dates (e.g., Jan 2020 - Present)" value={exp.dates} onChange={e => updateExperience(i, 'dates', e.target.value)} />
                <textarea placeholder="Brief description of your role and achievements" value={exp.description} onChange={e => updateExperience(i, 'description', e.target.value)} rows={3} />
              </div>
            ))}
            <button onClick={addExperience} className="w-full py-2 border border-dashed border-brand-border rounded-lg text-brand-muted hover:border-brand-gold hover:text-brand-gold transition-colors">
              + Add Experience
            </button>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-4">
            <h2 className="text-xl font-bold mb-4">Education</h2>
            {data.education.map((edu, i) => (
              <div key={i} className="border border-brand-border rounded-lg p-4 space-y-3">
                <input placeholder="Degree (e.g., B.S. Computer Science)" value={edu.degree} onChange={e => updateEducation(i, 'degree', e.target.value)} />
                <input placeholder="School/University" value={edu.school} onChange={e => updateEducation(i, 'school', e.target.value)} />
                <input placeholder="Year (e.g., 2020)" value={edu.year} onChange={e => updateEducation(i, 'year', e.target.value)} />
              </div>
            ))}
            <button onClick={addEducation} className="w-full py-2 border border-dashed border-brand-border rounded-lg text-brand-muted hover:border-brand-gold hover:text-brand-gold transition-colors">
              + Add Education
            </button>
          </div>
        )}

        {step === 4 && (
          <div className="space-y-4">
            <h2 className="text-xl font-bold mb-4">Skills</h2>
            <div className="flex gap-2">
              <input
                placeholder="Add a skill (e.g., Python, Project Management)"
                value={skillInput}
                onChange={e => setSkillInput(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && addSkill()}
              />
              <button onClick={addSkill} className="px-4 bg-brand-gold text-brand-dark font-bold rounded-lg whitespace-nowrap">Add</button>
            </div>
            <div className="flex flex-wrap gap-2">
              {data.skills.map((skill, i) => (
                <span key={i} className="px-3 py-1 rounded-full bg-brand-gold/10 text-brand-gold text-sm flex items-center gap-2">
                  {skill}
                  <button onClick={() => removeSkill(i)} className="text-brand-gold/50 hover:text-red-400">&times;</button>
                </span>
              ))}
            </div>
          </div>
        )}

        {error && <p className="text-red-400 text-sm mt-3">{error}</p>}

        <div className="flex gap-4 mt-6">
          {step > 1 && (
            <button
              onClick={() => setStep(step - 1)}
              className="flex-1 py-3 border border-brand-border text-white font-medium rounded-xl hover:border-brand-gold transition-colors"
            >
              Back
            </button>
          )}
          {step < 4 ? (
            <button
              onClick={() => setStep(step + 1)}
              className="flex-1 py-3 bg-brand-gold text-brand-dark font-bold rounded-xl hover:bg-brand-gold-hover transition-colors"
            >
              Next
            </button>
          ) : (
            <button
              onClick={handleGenerate}
              disabled={loading}
              className="flex-1 py-3 bg-brand-gold text-brand-dark font-bold rounded-xl hover:bg-brand-gold-hover transition-colors disabled:opacity-50"
            >
              {loading ? 'Generating Resume...' : 'Generate ATS Resume'}
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
