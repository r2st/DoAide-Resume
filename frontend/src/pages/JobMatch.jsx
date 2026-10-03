import { useState } from 'react'
import ScoreGauge from '../components/ScoreGauge'
import ShareButtons from '../components/ShareButtons'
import { checkJobMatch } from '../api'

export default function JobMatch() {
  const [resumeText, setResumeText] = useState('')
  const [jobDesc, setJobDesc] = useState('')
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  async function handleMatch() {
    if (resumeText.trim().length < 10 || jobDesc.trim().length < 10) {
      setError('Both fields must have at least 10 characters')
      return
    }
    setError('')
    setLoading(true)
    try {
      const data = await checkJobMatch(resumeText, jobDesc)
      setResult(data)
    } catch (e) {
      setError(e.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      <div className="text-center mb-10">
        <h1 className="text-3xl md:text-4xl font-bold mb-3">
          Job Match <span className="text-brand-gold">Scorer</span>
        </h1>
        <p className="text-brand-muted">Compare your resume against a job description to see your keyword match</p>
      </div>

      {!result && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="border border-brand-border rounded-xl p-6 bg-brand-card">
              <h2 className="font-semibold mb-3">Your Resume</h2>
              <textarea
                value={resumeText}
                onChange={(e) => setResumeText(e.target.value)}
                placeholder="Paste your resume text here..."
                rows={14}
                className="w-full resize-y"
              />
            </div>
            <div className="border border-brand-border rounded-xl p-6 bg-brand-card">
              <h2 className="font-semibold mb-3">Job Description</h2>
              <textarea
                value={jobDesc}
                onChange={(e) => setJobDesc(e.target.value)}
                placeholder="Paste the job description here..."
                rows={14}
                className="w-full resize-y"
              />
            </div>
          </div>

          <button
            onClick={handleMatch}
            disabled={loading}
            className="w-full py-3 bg-brand-gold text-brand-dark font-bold rounded-xl hover:bg-brand-gold-hover transition-colors disabled:opacity-50"
          >
            {loading ? 'Analyzing Match...' : 'Check Job Match'}
          </button>

          {error && <p className="text-red-400 text-sm">{error}</p>}
        </div>
      )}

      {result && (
        <div className="animate-fadeInUp space-y-6">
          <div className="border border-brand-border rounded-xl p-8 bg-brand-card text-center">
            <div className="flex justify-center mb-6">
              <ScoreGauge score={result.match_percentage} />
            </div>
            <p className="text-lg mb-2">{result.summary}</p>
            <div className="text-sm text-brand-muted mb-4">
              {result.matched_keywords.filter(k => k.found).length} of {result.matched_keywords.length} keywords matched
            </div>
            <ShareButtons score={result.match_percentage} />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="border border-brand-border rounded-xl p-6 bg-brand-card">
              <h2 className="font-bold mb-4 text-green-400">Matched Keywords</h2>
              <div className="flex flex-wrap gap-2">
                {result.matched_keywords.filter(k => k.found).map((k, i) => (
                  <span key={i} className="px-3 py-1 rounded-full bg-green-500/10 text-green-400 text-sm border border-green-500/20">
                    {k.keyword}
                  </span>
                ))}
              </div>
            </div>
            <div className="border border-brand-border rounded-xl p-6 bg-brand-card">
              <h2 className="font-bold mb-4 text-red-400">Missing Keywords</h2>
              <div className="flex flex-wrap gap-2">
                {result.missing_keywords.map((kw, i) => (
                  <span key={i} className="px-3 py-1 rounded-full bg-red-500/10 text-red-400 text-sm border border-red-500/20">
                    {kw}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {result.suggestions.length > 0 && (
            <div className="border border-brand-border rounded-xl p-6 bg-brand-card">
              <h2 className="font-bold mb-4">Suggestions</h2>
              <ul className="space-y-2">
                {result.suggestions.map((s, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm">
                    <span className="text-brand-gold mt-0.5">→</span>
                    <span className="text-brand-muted">{s}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          <button
            onClick={() => { setResult(null); setResumeText(''); setJobDesc('') }}
            className="w-full py-3 border border-brand-border text-white font-medium rounded-xl hover:border-brand-gold transition-colors"
          >
            Check Another Match
          </button>
        </div>
      )}
    </div>
  )
}
