import { useState, useEffect } from 'react'
import ProviderCard from './components/ProviderCard'
import ResponseTimeChart from './components/ResponseTimeChart'
import CpuChart from './components/CpuChart'
import CostChart from './components/CostChart'
import RecommendationPanel from './components/RecommendationPanel'
import EfficiencyScore from './components/EfficiencyScore'
import { useDarkMode } from './hooks/useDarkMode'

function App() {
  const [metrics, setMetrics]       = useState(null)
  const [loading, setLoading]       = useState(true)
  const [lastUpdated, setLastUpdated] = useState(null)
  const [refreshing, setRefreshing] = useState(false)
  const [isDark, setIsDark]         = useDarkMode()

  useEffect(() => {
    const loadMetrics = async () => {
      try {
        const res  = await fetch('http://localhost:3001/api/metrics')
        const json = await res.json()
        setMetrics(json.data)
        setLastUpdated(new Date().toLocaleTimeString())
      } catch (err) {
        console.error('Failed to fetch metrics:', err)
      } finally {
        setLoading(false)
        setRefreshing(false)
      }
    }

    loadMetrics()
    const interval = setInterval(loadMetrics, 10000)
    return () => clearInterval(interval)
  }, [])

  const handleRefresh = async () => {
    setRefreshing(true)
    try {
      const res  = await fetch('http://localhost:3001/api/metrics')
      const json = await res.json()
      setMetrics(json.data)
      setLastUpdated(new Date().toLocaleTimeString())
    } catch (err) {
      console.error('Failed to fetch metrics:', err)
    } finally {
      setRefreshing(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-5xl mb-4 animate-bounce">🌿</div>
          <p className="text-text-muted font-medium">Loading EcoScale...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-leaf-pattern">
      <div className="max-w-7xl mx-auto px-6 py-10">

        {/* ── Header ── */}
        <header className="mb-10">
          <div className="flex items-center justify-between flex-wrap gap-4">

            {/* Left — title */}
            <div className="flex items-center gap-3">
              <span className="text-4xl">🌿</span>
              <div>
                <h1 className="text-2xl font-bold text-sage-600 leading-tight">
                  EcoScale
                </h1>
                <p className="text-xs text-text-muted">
                  Green Cloud Resource Analyzer
                </p>
              </div>
            </div>

            {/* Right — controls */}
            <div className="flex items-center gap-3">

              {/* Live pulse */}
              <div className="flex items-center gap-2 bg-white dark:bg-sage-800
                              border border-sage-100 rounded-full px-3 py-1.5 shadow-sm">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full
                                   rounded-full bg-sage-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-sage-500" />
                </span>
                <span className="text-xs text-text-muted font-mono">
                  {lastUpdated}
                </span>
              </div>

              {/* Refresh button */}
              <button
                onClick={handleRefresh}
                disabled={refreshing}
                className="flex items-center gap-2 bg-sage-500 hover:bg-sage-600
                           text-white text-xs font-medium px-4 py-2 rounded-full
                           transition-all duration-200 disabled:opacity-50
                           shadow-sm hover:shadow-md"
              >
                <span className={refreshing ? 'animate-spin' : ''}>↻</span>
                {refreshing ? 'Refreshing...' : 'Refresh'}
              </button>

              {/* Dark mode toggle */}
              <button
                onClick={() => setIsDark(!isDark)}
                className="w-9 h-9 flex items-center justify-center rounded-full
                           bg-white border border-sage-100 shadow-sm
                           hover:shadow-md transition-all duration-200 text-base"
                title="Toggle dark mode"
              >
                {isDark ? '☀️' : '🌙'}
              </button>

            </div>
          </div>

          {/* Subtitle */}
          <p className="text-sm text-text-muted mt-4 text-center">
            Comparing compute efficiency · AWS EC2 vs Cloudflare Workers · Auto-refreshes every 10s
          </p>
        </header>

        {/* ── Main ── */}
        <main className="space-y-10">

          {/* Efficiency Score */}
          <EfficiencyScore metrics={metrics} />

          {/* Provider Cards */}
          <section>
            <h2 className="section-title text-center mb-6">
              🖥️ Live Instance Metrics
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <ProviderCard data={metrics.aws} providerKey="aws" />
              <ProviderCard data={metrics.cloudflare} providerKey="cloudflare" />
            </div>
          </section>

          {/* Charts */}
          <section>
            <h2 className="section-title text-center mb-6">
              📊 Performance Comparison
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <ResponseTimeChart
                awsResponseTime={metrics.aws.responseTime}
                cfResponseTime={metrics.cloudflare.responseTime}
              />
              <CpuChart
                awsCpu={metrics.aws.cpu}
                cfCpu={metrics.cloudflare.cpu}
              />
            </div>
            <div className="mt-6">
              <CostChart />
            </div>
          </section>

          {/* Recommendations */}
          <RecommendationPanel metrics={metrics} />

          {/* Footer */}
          <footer className="text-center text-xs text-text-muted py-6 border-t border-sage-100">
            <p>🌿 EcoScale · Built for green cloud computing awareness</p>
            <p className="mt-1 font-mono">
              AWS EC2 t2.micro · Cloudflare Workers Free Tier · Mock data simulation
            </p>
          </footer>

        </main>
      </div>
    </div>
  )
}

export default App