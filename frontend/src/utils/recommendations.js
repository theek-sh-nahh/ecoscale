export const generateRecommendations = (metrics) => {
  const { aws, cloudflare } = metrics
  const insights = []

  // Response time comparison
  const rtDiff = aws.responseTime - cloudflare.responseTime
  const rtRatio = (aws.responseTime / cloudflare.responseTime).toFixed(1)
  insights.push({
    id: 'response-time',
    category: 'Performance',
    icon: '⚡',
    winner: 'cloudflare',
    title: 'Cloudflare wins on speed',
    detail: `Cloudflare responds ${rtRatio}x faster (${cloudflare.responseTime.toFixed(0)}ms vs ${aws.responseTime.toFixed(0)}ms) thanks to edge compute proximity.`,
    tag: 'Low Latency',
    color: 'sage',
  })

  // Cost comparison
  insights.push({
    id: 'cost',
    category: 'Cost',
    icon: '💰',
    winner: 'cloudflare',
    title: 'Cloudflare is free at this scale',
    detail: `AWS EC2 costs ~$${aws.monthlyCost}/mo for equivalent compute. Cloudflare Workers free tier covers up to 100k requests/day with zero cost.`,
    tag: 'Cost Efficient',
    color: 'sage',
  })

  // CPU efficiency
  const cpuDiff = aws.cpu - cloudflare.cpu
  insights.push({
    id: 'cpu',
    category: 'Efficiency',
    icon: '🖥️',
    winner: cpuDiff > 0 ? 'cloudflare' : 'aws',
    title: cpuDiff > 0
      ? 'Cloudflare uses less CPU'
      : 'AWS uses CPU more efficiently here',
    detail: `AWS CPU at ${aws.cpu.toFixed(1)}% vs Cloudflare at ${cloudflare.cpu.toFixed(1)}%. Edge functions are stateless and spin down instantly, reducing idle usage.`,
    tag: 'Resource Efficient',
    color: 'sage',
  })

  // Scalability
  insights.push({
    id: 'scalability',
    category: 'Scalability',
    icon: '📈',
    winner: 'aws',
    title: 'AWS scales better for complex apps',
    detail: `EC2 supports full OS control, persistent processes, databases, and custom runtimes. Cloudflare Workers are stateless and suit lightweight API logic only.`,
    tag: 'Enterprise Ready',
    color: 'amber',
  })

  // Uptime
  insights.push({
    id: 'uptime',
    category: 'Reliability',
    icon: '🛡️',
    winner: cloudflare.uptime >= aws.uptime ? 'cloudflare' : 'aws',
    title: 'Both offer excellent uptime',
    detail: `AWS SLA: ${aws.uptime}% · Cloudflare SLA: ${cloudflare.uptime}%. Cloudflare's distributed edge means no single point of failure globally.`,
    tag: 'High Availability',
    color: 'sage',
  })

  // Carbon footprint
  insights.push({
    id: 'carbon',
    category: 'Green Score',
    icon: '🌱',
    winner: 'cloudflare',
    title: 'Cloudflare has a lower carbon footprint',
    detail: `Estimated ${cloudflare.carbonFootprint.toFixed(2)} g CO₂/hr vs ${aws.carbonFootprint.toFixed(2)} g CO₂/hr for AWS. Serverless edge compute avoids idle server energy waste.`,
    tag: 'Eco Friendly',
    color: 'sage',
  })

  return insights
}

export const getVerdict = (metrics) => {
  const { aws, cloudflare } = metrics
  if (cloudflare.responseTime < aws.responseTime && cloudflare.monthlyCost <= aws.monthlyCost) {
    return {
      icon: '🌿',
      text: 'For lightweight APIs and global reach, Cloudflare Workers is the greener, faster, and more cost-efficient choice. Use AWS EC2 when you need persistent processes, a full runtime environment, or complex backend logic.',
    }
  }
  return {
    icon: '☁️',
    text: 'Both platforms serve different needs. AWS EC2 excels at persistent, stateful workloads. Cloudflare Workers excels at globally distributed, stateless, low-latency APIs.',
  }
}