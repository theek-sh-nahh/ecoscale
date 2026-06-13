import {
  LineChart, Line, XAxis, YAxis, CartesianGrid,
  Tooltip, Legend, ResponsiveContainer
} from 'recharts'
import { buildResponseTimeData } from '../utils/chartData'

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null
  return (
    <div className="bg-white border border-sage-100 rounded-xl shadow-card px-4 py-3">
      <p className="text-xs text-text-muted mb-2 font-mono">{label}</p>
      {payload.map((entry) => (
        <div key={entry.name} className="flex items-center gap-2 text-sm">
          <span style={{ color: entry.color }}>●</span>
          <span className="text-text-muted">{entry.name}:</span>
          <span className="font-semibold font-mono">{entry.value}ms</span>
        </div>
      ))}
    </div>
  )
}

const ResponseTimeChart = ({ awsResponseTime, cfResponseTime }) => {
  const data = buildResponseTimeData(awsResponseTime, cfResponseTime)

  return (
    <div className="card">
      <div className="flex items-center gap-2 mb-6">
        <span className="text-xl">⚡</span>
        <h3 className="section-title mb-0">Response Time</h3>
        <span className="badge bg-sage-50 text-sage-600 ml-auto text-xs">
          last 10 mins
        </span>
      </div>

      <ResponsiveContainer width="100%" height={220}>
        <LineChart data={data} margin={{ top: 5, right: 10, left: -20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#d4ead9" />
          <XAxis
            dataKey="time"
            tick={{ fontSize: 10, fill: '#7a9e8e' }}
            tickLine={false}
            axisLine={{ stroke: '#d4ead9' }}
          />
          <YAxis
            tick={{ fontSize: 10, fill: '#7a9e8e' }}
            tickLine={false}
            axisLine={false}
            unit="ms"
          />
          <Tooltip content={<CustomTooltip />} />
          <Legend
            wrapperStyle={{ fontSize: '12px', paddingTop: '12px' }}
          />
          <Line
            type="monotone"
            dataKey="AWS"
            stroke="#f59e0b"
            strokeWidth={2.5}
            dot={{ r: 3, fill: '#f59e0b' }}
            activeDot={{ r: 5 }}
          />
          <Line
            type="monotone"
            dataKey="Cloudflare"
            stroke="#6db88a"
            strokeWidth={2.5}
            dot={{ r: 3, fill: '#6db88a' }}
            activeDot={{ r: 5 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}

export default ResponseTimeChart