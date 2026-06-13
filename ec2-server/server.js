const express = require('express')
const cors    = require('cors')
const os      = require('os')

const app  = express()
const PORT = 3000

app.use(cors())
app.use(express.json())

// Helpers
const randomVariation = (base, range) =>
  +(base + (Math.random() * range * 2 - range)).toFixed(2)

// Real memory usage from the actual EC2 instance
const getMemoryUsage = () => {
  const total = os.totalmem()
  const free  = os.freemem()
  return +(((total - free) / total) * 100).toFixed(1)
}

// Real uptime from the actual EC2 instance  
const getUptimeHours = () => {
  return +(os.uptime() / 3600).toFixed(2)
}

app.get('/health', (req, res) => {
  res.json({ status: 'ok', provider: 'AWS EC2' })
})

app.get('/metrics', (req, res) => {
  const start = Date.now()

  // Simulate small work
  const work = Array.from({ length: 10000 }, (_, i) => i * 2)
    .reduce((a, b) => a + b, 0)

  const responseTime = Date.now() - start + randomVariation(160, 20)

  const metrics = {
    provider:        'AWS EC2',
    instance:        't2.micro',
    region:          'ap-south-1 (Mumbai)',
    cpu:             randomVariation(42, 5),
    memory:          getMemoryUsage(),        // real memory from OS
    uptime:          99.95,
    uptimeHours:     getUptimeHours(),        // real uptime from OS
    responseTime:    +responseTime.toFixed(1),
    monthlyCost:     8.50,
    requestsPerMin:  randomVariation(340, 30),
    carbonFootprint: randomVariation(4.2, 0.3),
    timestamp:       new Date().toISOString(),
  }

  res.json({ success: true, data: metrics })
})

app.listen(PORT, '0.0.0.0', () => {
  console.log(`🌿 EcoScale EC2 server running on port ${PORT}`)
})