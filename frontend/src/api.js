const API_BASE = import.meta.env.PROD ? 'https://resume.doaide.com' : ''

async function request(endpoint, options = {}) {
  const res = await fetch(`${API_BASE}${endpoint}`, {
    headers: { 'Content-Type': 'application/json', ...options.headers },
    ...options,
  })
  if (!res.ok) {
    const error = await res.json().catch(() => ({ detail: 'Request failed' }))
    throw new Error(error.detail || 'Request failed')
  }
  return res.json()
}

export async function checkATSScore(text) {
  return request('/api/ats-score', {
    method: 'POST',
    body: JSON.stringify({ text }),
  })
}

export async function uploadResume(file) {
  const formData = new FormData()
  formData.append('file', file)
  const res = await fetch(`${API_BASE}/api/ats-score/upload`, {
    method: 'POST',
    body: formData,
  })
  if (!res.ok) {
    const error = await res.json().catch(() => ({ detail: 'Upload failed' }))
    throw new Error(error.detail || 'Upload failed')
  }
  return res.json()
}

export async function checkJobMatch(resume_text, job_description) {
  return request('/api/job-match', {
    method: 'POST',
    body: JSON.stringify({ resume_text, job_description }),
  })
}

export async function buildResume(data) {
  return request('/api/resume-builder', {
    method: 'POST',
    body: JSON.stringify(data),
  })
}

export async function getResumeTips(text) {
  return request('/api/resume-tips', {
    method: 'POST',
    body: JSON.stringify({ text }),
  })
}
