import { render, screen } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import { describe, it, expect } from 'vitest'
import Home from '../pages/Home'

function renderHome() {
  return render(
    <BrowserRouter>
      <Home />
    </BrowserRouter>
  )
}

describe('Home Page', () => {
  it('renders the main headline', () => {
    renderHome()
    expect(screen.getByText('Check My Resume Score')).toBeDefined()
  })

  it('renders the CTA button', () => {
    renderHome()
    expect(screen.getByText('Check My Resume Score')).toBeDefined()
  })

  it('renders feature cards', () => {
    renderHome()
    expect(screen.getByText('ATS Score Checker')).toBeDefined()
    expect(screen.getByText('Job Match Scorer')).toBeDefined()
    expect(screen.getByText('AI Resume Builder')).toBeDefined()
  })

  it('renders stats section', () => {
    renderHome()
    expect(screen.getByText('75%')).toBeDefined()
    expect(screen.getByText('98%')).toBeDefined()
  })

  it('renders how it works section', () => {
    renderHome()
    expect(screen.getByText('How It Works')).toBeDefined()
    expect(screen.getByText('Paste or Upload')).toBeDefined()
  })

  it('renders the free badge', () => {
    renderHome()
    expect(screen.getByText(/No Login Required/)).toBeDefined()
  })
})
