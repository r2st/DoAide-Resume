export default function ScoreGauge({ score, size = 180 }) {
  const radius = (size - 20) / 2
  const circumference = 2 * Math.PI * radius
  const progress = (score / 100) * circumference
  const color = score >= 80 ? '#22c55e' : score >= 60 ? '#F0B429' : score >= 40 ? '#f97316' : '#ef4444'

  return (
    <div className="score-gauge" style={{ width: size, height: size }}>
      <svg width={size} height={size}>
        <circle
          cx={size / 2} cy={size / 2} r={radius}
          fill="none" stroke="#2a2a2a" strokeWidth="10"
        />
        <circle
          cx={size / 2} cy={size / 2} r={radius}
          fill="none" stroke={color} strokeWidth="10"
          strokeDasharray={circumference}
          strokeDashoffset={circumference - progress}
          strokeLinecap="round"
          style={{ transition: 'stroke-dashoffset 1s ease-out' }}
        />
      </svg>
      <div className="score-text">
        <span className="text-4xl font-bold" style={{ color }}>{score}</span>
        <span className="text-brand-muted text-sm">/ 100</span>
      </div>
    </div>
  )
}
