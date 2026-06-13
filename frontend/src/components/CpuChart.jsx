import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip, Legend, ResponsiveContainer
} from 'recharts'
import { buildCpuData } from '../utils/chartData'

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null
  return (
    <div className="bg-white border border-sage-100 rounded-xl shadow-card px-4 py-3">
      <p className="text-xs text-text-muted mb-2">{label}</p>
      {payload.map((entry) => (
        <div key={entry.name} className="flex items-center gap-2 text-sm">
          <span style={{ color: entry.color }}>●</span>
          <span className="text-text-muted">{entry.name}:</span>
          <span className="font-semibold font-mono">{entry.value}%</span>
        </div>
      ))}
    </div>
  )
}

const CpuChart = ({ awsCpu, cfCpu }) => {
  const data = buildCpuData(awsCpu, cfCpu)

  return (
    <div className="card">
      <div className="flex items-center gap-2 mb-6">
        <span className="text-xl">🖥️</span>
        <h3 className="section-title mb-0">CPU Load</h3>
        <span className="badge bg-sage-50 text-sage-600 ml-auto text-xs">
          current vs peak
        </span>
      </div>

      <ResponsiveContainer width="100%" height={220}>
        <BarChart data={data} margin={{ top: 5, right: 10, left: -20, bottom: 5 }}>
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
            unit="%"
            domain={[0, 100]}
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
    </div>
  )
}

export default CpuChart