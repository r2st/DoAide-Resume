import { useState } from 'react'

export default function Embed() {
  const [copied, setCopied] = useState(false)

  const embedCode = `<iframe
  src="https://resume.doaide.com/ats-checker"
  width="100%"
  height="700"
  frameborder="0"
  style="border: 1px solid #2a2a2a; border-radius: 12px; max-width: 800px;"
  title="DoAide Resume ATS Checker"
></iframe>`

  function handleCopy() {
    navigator.clipboard.writeText(embedCode)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <div className="text-center mb-10">
        <h1 className="text-3xl md:text-4xl font-bold mb-3">
          Embed <span className="text-brand-gold">ATS Checker</span>
        </h1>
        <p className="text-brand-muted">Add our free ATS resume checker to your website, blog, or career portal</p>
      </div>

      <div className="border border-brand-border rounded-xl p-6 bg-brand-card mb-8">
        <h2 className="font-bold mb-4">Embed Code</h2>
        <pre className="bg-brand-dark p-4 rounded-lg text-sm text-brand-muted overflow-x-auto mb-4">
          {embedCode}
        </pre>
        <button
          onClick={handleCopy}
          className="px-6 py-2 bg-brand-gold text-brand-dark font-bold rounded-lg hover:bg-brand-gold-hover transition-colors"
        >
          {copied ? 'Copied!' : 'Copy Embed Code'}
        </button>
      </div>

      <div className="border border-brand-border rounded-xl p-6 bg-brand-card">
        <h2 className="font-bold mb-4">Features</h2>
        <ul className="space-y-3 text-brand-muted text-sm">
          <li className="flex items-start gap-3">
            <span className="text-brand-gold">✓</span>
            <span>Fully responsive — works on desktop and mobile</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-brand-gold">✓</span>
            <span>Free to use — no API key required</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-brand-gold">✓</span>
            <span>Dark-themed to match modern websites</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-brand-gold">✓</span>
            <span>No tracking or cookies on embedded widget</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-brand-gold">✓</span>
            <span>Perfect for career blogs, job boards, and university career centers</span>
          </li>
        </ul>
      </div>
    </div>
  )
}
