import { render, screen } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import { describe, it, expect } from 'vitest'
import App from '../App'

function renderApp() {
  return render(
    <BrowserRouter>
      <App />
    </BrowserRouter>
  )
}

describe('App', () => {
  it('renders the DoAide brand name', () => {
    renderApp()
    expect(screen.getByText('DoAide')).toBeDefined()
  })

  it('renders the Resume AI text', () => {
    renderApp()
    expect(screen.getByText('Resume AI')).toBeDefined()
  })

  it('renders navigation links', () => {
    renderApp()
    expect(screen.getByText('ATS Checker')).toBeDefined()
    expect(screen.getByText('Job Match')).toBeDefined()
    expect(screen.getByText('Resume Builder')).toBeDefined()
  })

  it('renders footer content', () => {
    renderApp()
    expect(screen.getByText(/All rights reserved/)).toBeDefined()
  })
})
