import { generateRecommendations, getVerdict } from '../utils/recommendations'

const colorMap = {
  sage: {
    card:   'border-sage-100 bg-sage-50/40',
    badge:  'bg-sage-100 text-sage-700',
    icon:   'bg-sage-100',
    winner: 'text-sage-600',
  },
  amber: {
    card:   'border-amber-100 bg-amber-50/40',
    badge:  'bg-amber-100 text-amber-700',
    icon:   'bg-amber-100',
    winner: 'text-amber-600',
  },
}

const winnerLabel = {
  aws:        { label: 'AWS Wins',        dot: 'bg-amber-400' },
  cloudflare: { label: 'Cloudflare Wins', dot: 'bg-sage-400'  },
}

const InsightCard = ({ insight }) => {
  const colors = colorMap[insight.color]
  const winner = winnerLabel[insight.winner]

  return (
    <div className={`rounded-2xl border p-4 ${colors.card} transition-all duration-300 hover:shadow-card`}>
      <div className="flex items-start gap-3">

        {/* Icon */}
        <div className={`${colors.icon} rounded-xl p-2 text-lg shrink-0`}>
          {insight.icon}
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap mb-1">
            <span className="text-xs text-text-muted font-medium uppercase tracking-wide">
              {insight.category}
            </span>
            <span className={`badge ${colors.badge} text-xs`}>
              {insight.tag}
            </span>
          </div>
          <p className="text-sm font-semibold text-text-primary mb-1">
            {insight.title}
          </p>
          <p className="text-xs text-text-muted leading-relaxed">
            {insight.detail}
          </p>
        </div>

        {/* Winner badge */}
        <div className="shrink-0 flex items-center gap-1.5 bg-white rounded-full px-2.5 py-1 border border-sage-100 shadow-sm">
          <span className={`w-1.5 h-1.5 rounded-full ${winner.dot}`} />
          <span className={`text-xs font-medium ${colors.winner} whitespace-nowrap`}>
            {winner.label}
          </span>
        </div>

      </div>
    </div>
  )
}

const RecommendationPanel = ({ metrics }) => {
  const insights = generateRecommendations(metrics)
  const verdict  = getVerdict(metrics)

  return (
    <section>
      <h2 className="section-title text-center mb-6">
        🌿 Smart Recommendations
      </h2>

      {/* Insight Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        {insights.map((insight) => (
          <InsightCard key={insight.id} insight={insight} />
        ))}
      </div>

      {/* Overall Verdict */}
      <div className="card border-sage-200 bg-gradient-to-br from-sage-50 to-white">
        <div className="flex items-start gap-4">
          <div className="text-3xl shrink-0">{verdict.icon}</div>
          <div>
            <h3 className="font-semibold text-text-primary mb-1">
              Overall Verdict
            </h3>
            <p className="text-sm text-text-muted leading-relaxed">
              {verdict.text}
            </p>
          </div>
        </div>
      </div>

    </section>
  )
}

export default RecommendationPanel