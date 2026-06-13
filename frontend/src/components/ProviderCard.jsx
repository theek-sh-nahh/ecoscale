const providerStyles = {
  aws: {
    accent: 'text-amber-500',
    border: 'border-amber-100',
    badge: 'bg-amber-50 text-amber-600',
    bar: 'bg-gradient-to-r from-amber-400 to-amber-500',
    glow: 'shadow-[0_4px_20px_rgba(255,153,0,0.10)]',
    icon: '☁️',
  },
  cloudflare: {
    accent: 'text-orange-400',
    border: 'border-orange-100',
    badge: 'bg-orange-50 text-orange-500',
    bar: 'bg-gradient-to-r from-sage-400 to-sage-500',
    glow: 'shadow-[0_4px_20px_rgba(244,129,32,0.10)]',
    icon: '⚡',
  },
}

const StatChip = ({ label, value, highlight }) => (
  <div className="flex flex-col items-center bg-sage-50 rounded-xl px-4 py-3 flex-1">
    <span className={`text-base font-bold ${highlight ? 'text-sage-600' : 'text-text-primary'}`}>
      {value}
    </span>
    <span className="text-xs text-text-muted mt-0.5">{label}</span>
  </div>
)

const ProgressBar = ({ label, value, max = 100, barClass }) => (
  <div className="mb-4">
    <div className="flex justify-between items-center mb-1.5">
      <span className="text-sm text-text-muted">{label}</span>
      <span className="text-sm font-semibold text-text-primary font-mono">{value}%</span>
    </div>
    <div className="progress-bar-track">
      <div
        className={`progress-bar-fill ${barClass}`}
        style={{ width: `${Math.min(value, 100)}%` }}
      />
    </div>
  </div>
)

const ProviderCard = ({ data, providerKey }) => {
  const style = providerStyles[providerKey]

  return (
    <div className={`card card-hover ${style.glow} border ${style.border}`}>

      {/* Card Header */}
      <div className="flex items-start justify-between mb-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-2xl">{style.icon}</span>
            <h2 className={`text-xl font-bold ${style.accent}`}>
              {data.provider}
            </h2>
          </div>
          <p className="text-xs text-text-muted font-mono">{data.instance}</p>
          <p className="text-xs text-text-muted">{data.region}</p>
        </div>
        <span className={`badge ${style.badge} font-mono text-xs`}>
          LIVE
        </span>
      </div>

      {/* Progress Bars */}
      <div className="mb-6">
        <ProgressBar
          label="CPU Usage"
          value={data.cpu}
          barClass={style.bar}
        />
        <ProgressBar
          label="Memory Usage"
          value={data.memory}
          barClass={style.bar}
        />
      </div>

      {/* Stat Chips Row */}
      <div className="flex gap-2 mb-4">
        <StatChip
          label="Uptime"
          value={`${data.uptime}%`}
          highlight
        />
        <StatChip
          label="Response"
          value={`${data.responseTime}ms`}
        />
        <StatChip
          label="Cost/mo"
          value={data.monthlyCost === 0 ? 'Free' : `$${data.monthlyCost}`}
          highlight={data.monthlyCost === 0}
        />
      </div>

      {/* Carbon Footprint */}
      <div className="flex items-center gap-2 mt-4 bg-sage-50 rounded-xl px-4 py-2">
        <span className="text-sm">🌱</span>
        <span className="text-xs text-text-muted">Carbon estimate:</span>
        <span className="text-xs font-semibold text-sage-600 font-mono ml-auto">
          {data.carbonFootprint} g CO₂/hr
        </span>
      </div>

    </div>
  )
}

export default ProviderCard
