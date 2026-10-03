import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import ScoreGauge from '../components/ScoreGauge'

describe('ScoreGauge', () => {
  it('renders the score value', () => {
    render(<ScoreGauge score={85} />)
    expect(screen.getByText('85')).toBeDefined()
  })

  it('renders /100 text', () => {
    render(<ScoreGauge score={50} />)
    expect(screen.getByText('/ 100')).toBeDefined()
  })

  it('renders SVG element', () => {
    const { container } = render(<ScoreGauge score={70} />)
    expect(container.querySelector('svg')).toBeDefined()
  })

  it('uses green color for high scores', () => {
    const { container } = render(<ScoreGauge score={85} />)
    const scoreText = container.querySelector('.score-text span')
    expect(scoreText.style.color).toBe('rgb(34, 197, 94)')
  })

  it('uses red color for low scores', () => {
    const { container } = render(<ScoreGauge score={25} />)
    const scoreText = container.querySelector('.score-text span')
    expect(scoreText.style.color).toBe('rgb(239, 68, 68)')
  })
})
