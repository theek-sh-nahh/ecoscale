import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip, Legend, ResponsiveContainer, Cell
} from 'recharts'
import { buildCostData } from '../utils/chartData'

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null
  return (
    <div className="bg-white border border-sage-100 rounded-xl shadow-card px-4 py-3">
      <p className="text-xs text-text-muted mb-2">{label}</p>
      {payload.map((entry) => (
        <div key={entry.name} className="flex items-center gap-2 text-sm">
          <span style={{ color: entry.color }}>●</span>
          <span className="text-text-muted">{entry.name}:</span>
          <span className="font-semibold font-mono">
            {entry.value === 0 ? 'Free' : `$${entry.value}`}
          </span>
        </div>
      ))}
    </div>
  )
}

const CostChart = () => {
  const data = buildCostData()

  return (
    <div className="card">
      <div className="flex items-center gap-2 mb-6">
        <span className="text-xl">💰</span>
        <h3 className="section-title mb-0">Monthly Cost</h3>
        <span className="badge bg-sage-50 text-sage-600 ml-auto text-xs">
          USD / month
        </span>
      </div>

      <ResponsiveContainer width="100%" height={220}>
        <BarChart data={data} margin={{ top: 5, right: 10, left: -10, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#d4ead9" vertical={false} />
          <XAxis
            dataKey="label"
            tick={{ fontSize: 10, fill: '#7a9e8e' }}
            tickLine={false}
            axisLine={{ stroke: '#d4ead9' }}
          />
          <YAxis
            tick={{ fontSize: 10, fill: '#7a9e8e' }}
            tickLine={false}
            axisLine={false}
            tickFormatter={(v) => `$${v}`}
          />
          <Tooltip content={<CustomTooltip />} />
          <Legend
            wrapperStyle={{ fontSize: '12px', paddingTop: '12px' }}
          />
          <Bar
            dataKey="AWS"
            fill="#f59e0b"
            radius={[6, 6, 0, 0]}
            maxBarSize={40}
          />
          <Bar
            dataKey="Cloudflare"
            fill="#6db88a"
            radius={[6, 6, 0, 0]}
            maxBarSize={40}
          />
        </BarChart>
      </ResponsiveContainer>

      {/* Cost highlight */}
      <div className="mt-4 flex items-center gap-3 bg-sage-50 rounded-xl px-4 py-3">
        <span className="text-lg">🌿</span>
        <p className="text-xs text-text-muted">
          Cloudflare Workers saves approximately
          <span className="font-bold text-sage-600"> $11.80/month </span>
          compared to an equivalent AWS EC2 setup.
        </p>
      </div>
    </div>
  )
}

export default CostChart