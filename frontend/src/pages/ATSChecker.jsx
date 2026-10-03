import { useState } from 'react'
import ScoreGauge from '../components/ScoreGauge'
import ShareButtons from '../components/ShareButtons'
import { checkATSScore, uploadResume, getResumeTips } from '../api'

export default function ATSChecker() {
  const [text, setText] = useState('')
  const [result, setResult] = useState(null)
  const [tips, setTips] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [activeTab, setActiveTab] = useState('paste')

  async function handleCheck() {
    if (!text.trim() || text.trim().length < 10) {
      setError('Please enter at least 10 characters of resume text')
      return
    }
    setError('')
    setLoading(true)
    try {
      const [scoreResult, tipsResult] = await Promise.all([
        checkATSScore(text),
        getResumeTips(text),
      ])
      setResult(scoreResult)
      setTips(tipsResult)
    } catch (e) {
      setError(e.message)
    } finally {
      setLoading(false)
    }
  }

  async function handleUpload(e) {
    const file = e.target.files?.[0]
    if (!file) return
    setError('')
    setLoading(true)
    try {
      const scoreResult = await uploadResume(file)
      setResult(scoreResult)
      setTips(null)
    } catch (e) {
      setError(e.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="text-center mb-10">
        <h1 className="text-3xl md:text-4xl font-bold mb-3">
          ATS Resume <span className="text-brand-gold">Score Checker</span>
        </h1>
        <p className="text-brand-muted">Paste your resume or upload a file to get your ATS compatibility score</p>
      </div>

      {!result && (
        <div className="border border-brand-border rounded-xl p-6 bg-brand-card">
          <div className="flex gap-4 mb-6">
            <button
              onClick={() => setActiveTab('paste')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                activeTab === 'paste' ? 'bg-brand-gold text-brand-dark' : 'bg-brand-border text-white'
              }`}
            >
              Paste Text
            </button>
            <button
              onClick={() => setActiveTab('upload')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                activeTab === 'upload' ? 'bg-brand-gold text-brand-dark' : 'bg-brand-border text-white'
              }`}
            >
              Upload File
            </button>
          </div>

          {activeTab === 'paste' ? (
            <>
              <textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Paste your resume text here..."
                rows={12}
                className="w-full resize-y mb-4"
              />
              <button
                onClick={handleCheck}
                disabled={loading}
                className="w-full py-3 bg-brand-gold text-brand-dark font-bold rounded-xl hover:bg-brand-gold-hover transition-colors disabled:opacity-50"
              >
                {loading ? 'Analyzing...' : 'Check ATS Score'}
              </button>
            </>
          ) : (
            <div className="text-center py-12 border-2 border-dashed border-brand-border rounded-xl">
              <p className="text-brand-muted mb-4">Upload your resume (PDF, DOCX, or TXT)</p>
              <label className="inline-block px-6 py-3 bg-brand-gold text-brand-dark font-bold rounded-xl cursor-pointer hover:bg-brand-gold-hover transition-colors">
                Choose File
                <input
                  type="file"
                  accept=".pdf,.docx,.txt"
                  onChange={handleUpload}
                  className="hidden"
                />
              </label>
            </div>
          )}

          {error && <p className="text-red-400 text-sm mt-3">{error}</p>}
        </div>
      )}

      {result && (
        <div className="animate-fadeInUp space-y-6">
          <div className="border border-brand-border rounded-xl p-8 bg-brand-card text-center">
            <div className="flex justify-center mb-6">
              <ScoreGauge score={result.overall_score} />
            </div>
            <p className="text-lg mb-4">{result.summary}</p>
            <ShareButtons score={result.overall_score} />
          </div>

          <div className="border border-brand-border rounded-xl p-6 bg-brand-card">
            <h2 className="text-xl font-bold mb-4">Score Breakdown</h2>
            <div className="space-y-4">
              {result.sections.map((section, i) => (
                <div key={i}>
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm font-medium">{section.name}</span>
                    <span className="text-sm text-brand-gold">{section.score}/{section.max_score}</span>
                  </div>
                  <div className="w-full bg-brand-border rounded-full h-2 mb-1">
                    <div
                      className="h-2 rounded-full transition-all duration-700"
                      style={{
                        width: `${(section.score / section.max_score) * 100}%`,
                        backgroundColor: section.score >= section.max_score * 0.8 ? '#22c55e' : section.score >= section.max_score * 0.5 ? '#F0B429' : '#ef4444',
                      }}
                    />
                  </div>
                  <p className="text-brand-muted text-xs">{section.feedback}</p>
                </div>
              ))}
            </div>
          </div>

          {result.top_issues.length > 0 && (
            <div className="border border-brand-border rounded-xl p-6 bg-brand-card">
              <h2 className="text-xl font-bold mb-4">Top Issues to Fix</h2>
              <ul className="space-y-2">
                {result.top_issues.map((issue, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm">
                    <span className="text-red-400 mt-0.5">●</span>
                    <span className="text-brand-muted">{issue}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {tips && (
            <div className="border border-brand-border rounded-xl p-6 bg-brand-card">
              <h2 className="text-xl font-bold mb-2">Personalized Tips</h2>
              <p className="text-brand-muted text-sm mb-4">{tips.overall_assessment}</p>
              <div className="space-y-3">
                {tips.tips.map((tip, i) => (
                  <div key={i} className="flex items-start gap-3 text-sm">
                    <span className={`px-2 py-0.5 rounded text-xs font-medium ${
                      tip.priority === 'high' ? 'bg-red-500/20 text-red-400' : 'bg-brand-gold/20 text-brand-gold'
                    }`}>
                      {tip.priority}
                    </span>
                    <div>
                      <span className="text-brand-muted text-xs">[{tip.category}]</span>{' '}
                      <span>{tip.tip}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          <button
            onClick={() => { setResult(null); setTips(null); setText('') }}
            className="w-full py-3 border border-brand-border text-white font-medium rounded-xl hover:border-brand-gold transition-colors"
          >
            Check Another Resume
          </button>
        </div>
      )}
    </div>
  )
}
