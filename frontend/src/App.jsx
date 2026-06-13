import { useState, useEffect } from 'react'
import ProviderCard from './components/ProviderCard'

function App() {
  const [metrics, setMetrics] = useState(null)
  const [loading, setLoading] = useState(true)
  const [lastUpdated, setLastUpdated] = useState(null)

  useEffect(() => {
    const loadMetrics = async () => {
      try {
        const res = await fetch('http://localhost:3001/api/metrics')
        const json = await res.json()
        setMetrics(json.data)
        setLastUpdated(new Date().toLocaleTimeString())
      } catch (err) {
        console.error('Failed to fetch metrics:', err)
      } finally {
        setLoading(false)
      }
    }

    loadMetrics()
    const interval = setInterval(loadMetrics, 10000)
    return () => clearInterval(interval)
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-4xl mb-4">🌿</div>
          <p className="text-text-muted font-medium">Loading EcoScale...</p>
        </div>
      </div>
    )
  }

  return (
  <div className="min-h-screen bg-leaf-pattern">
    <div className="max-w-7xl mx-auto px-6 py-10">
      <header className="mb-10 text-center">
        <div className="flex items-center justify-center gap-2 mb-2">
          <span className="text-3xl">🌿</span>
          <h1 className="text-3xl font-bold text-sage-600">
            EcoScale
          </h1>
        </div>
        <p className="text-text-muted text-sm">
          Green Cloud Resource Analyzer · Comparing compute efficiency across providers
        </p>
        <p className="text-xs text-sage-400 mt-3 font-mono bg-white inline-block px-3 py-1 rounded-full border border-sage-100 shadow-sm">
            Last updated: <span className="text-sage-600 font-semibold">{lastUpdated}</span>
          </p>
      </header>

      <main className="space-y-10">
        <section>
          <h2 className="section-title text-center mb-6">
            🖥️ Live Instance Metrics
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <ProviderCard data={metrics.aws} providerKey="aws" />
            <ProviderCard data={metrics.cloudflare} providerKey="cloudflare" />
          </div>
        </section>
      </main>

    </div>
  </div>
)
}

export default App