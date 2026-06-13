// Cloudflare Worker — EcoScale metrics endpoint
// This runs at the edge, closest to the user's location

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
}

const randomVariation = (base, range) => {
  return +(base + (Math.random() * range * 2 - range)).toFixed(2)
}

export default {
  async fetch(request, env, ctx) {

    // Handle CORS preflight
    if (request.method === 'OPTIONS') {
      return new Response(null, { headers: corsHeaders })
    }

    const url = new URL(request.url)

    // Health check
    if (url.pathname === '/health') {
      return new Response(
        JSON.stringify({ status: 'ok', provider: 'Cloudflare Workers' }),
        { headers: { 'Content-Type': 'application/json', ...corsHeaders } }
      )
    }

    // Metrics endpoint
    if (url.pathname === '/metrics') {
      const start = Date.now()

      // Simulate a tiny bit of work
      await new Promise(r => setTimeout(r, 5))

      const responseTime = Date.now() - start + randomVariation(30, 8)

      const metrics = {
        provider:        'Cloudflare Workers',
        instance:        'Edge Compute',
        region:          `Global · served from ${request.cf?.colo ?? 'edge'}`,
        cpu:             randomVariation(18, 3),
        memory:          randomVariation(28, 3),
        uptime:          99.99,
        responseTime:    +responseTime.toFixed(1),
        monthlyCost:     0.00,
        requestsPerMin:  randomVariation(340, 30),
        carbonFootprint: randomVariation(1.1, 0.2),
        timestamp:       new Date().toISOString(),
      }

      return new Response(
        JSON.stringify({ success: true, data: metrics }),
        { headers: { 'Content-Type': 'application/json', ...corsHeaders } }
      )
    }

    return new Response('EcoScale — Cloudflare Worker is running 🌿', {
      headers: { 'Content-Type': 'text/plain', ...corsHeaders }
    })
  }
}