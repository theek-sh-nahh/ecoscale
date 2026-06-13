import { calculateEfficiencyScores, getScoreLabel } from '../utils/efficiencyScore'

const ScoreRing = ({ score, label, color, providerIcon, providerName }) => {
  // SVG circle math
  const radius      = 40
  const stroke      = 6
  const normalised  = radius - stroke / 2
  const circumference = 2 * Math.PI * normalised
  const filled      = circumference - (score / 100) * circumference

  return (
    <div className="flex flex-col items-center gap-3">
      <div className="relative w-24 h-24">
        <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
          {/* Track */}
          <circle
            cx="50" cy="50"
            r={normalised}
            fill="none"
            stroke="#d4ead9"
            strokeWidth={stroke}
          />
          {/* Fill */}
          <circle
            cx="50" cy="50"
            r={normalised}
            fill="none"
            stroke={score >= 65 ? '#6db88a' : '#f59e0b'}
            strokeWidth={stroke}
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={filled}
            style={{ transition: 'stroke-dashoffset 1s ease-out' }}
          />
        </svg>
        {/* Score text */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-2xl font-bold text-text-primary leading-none">
            {score}
          </span>
          <span className="text-xs text-text-muted">/100</span>
        </div>
      </div>

      <div className="text-center">
        <div className="flex items-center justify-center gap-1 mb-0.5">
          <span>{providerIcon}</span>
          <span className="text-sm font-semibold text-text-primary">
            {providerName}
          </span>
        </div>
        <span className={`text-xs font-medium ${color}`}>{label}</span>
      </div>
    </div>
  )
}

const EfficiencyScore = ({ metrics }) => {
  const scores = calculateEfficiencyScores(metrics)
  const awsLabel = getScoreLabel(scores.aws)
  const cfLabel  = getScoreLabel(scores.cloudflare)
  const winner   = scores.cloudflare >= scores.aws ? 'Cloudflare' : 'AWS'

  return (
    <div className="card border-sage-100">
      <div className="text-center mb-6">
        <h2 className="section-title mb-1">🏆 Efficiency Score</h2>
        <p className="text-xs text-text-muted">
          Weighted across response time, CPU, cost, and carbon footprint
        </p>
      </div>

      <div className="flex items-center justify-around flex-wrap gap-6">
        <ScoreRing
          score={scores.aws}
          label={awsLabel.label}
          color={awsLabel.color}
          providerIcon="☁️"
          providerName="AWS EC2"
        />

        {/* VS divider */}
        <div className="flex flex-col items-center gap-1">
          <span className="text-2xl font-black text-sage-200">VS</span>
          <span className="badge bg-sage-100 text-sage-700 text-xs">
            🌿 {winner} leads
          </span>
        </div>

        <ScoreRing
          score={scores.cloudflare}
          label={cfLabel.label}
          color={cfLabel.color}
          providerIcon="⚡"
          providerName="Cloudflare"
        />
      </div>
    </div>
  )
}

export default EfficiencyScore