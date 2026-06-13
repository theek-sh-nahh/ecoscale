// Scores each provider out of 100 across 4 dimensions
// Lower cost, lower response time, lower CPU, lower carbon = better score

export const calculateEfficiencyScores = (metrics) => {
  const { aws, cloudflare } = metrics

  const score = (value, worst, best) => {
    // Linear scale: best value → 100, worst value → 0
    const clamped = Math.min(Math.max(value, best), worst)
    return Math.round(((worst - clamped) / (worst - best)) * 100)
  }

  const awsScore = Math.round((
    score(aws.responseTime,  300, 20)  * 0.30 +
    score(aws.cpu,           90,  5)   * 0.25 +
    score(aws.monthlyCost,   20,  0)   * 0.30 +
    score(aws.carbonFootprint, 8, 0.5) * 0.15
  ))

  const cfScore = Math.round((
    score(cloudflare.responseTime,  300, 20)  * 0.30 +
    score(cloudflare.cpu,           90,  5)   * 0.25 +
    score(cloudflare.monthlyCost,   20,  0)   * 0.30 +
    score(cloudflare.carbonFootprint, 8, 0.5) * 0.15
  ))

  return { aws: awsScore, cloudflare: cfScore }
}

export const getScoreLabel = (score) => {
  if (score >= 85) return { label: 'Excellent', color: 'text-sage-600' }
  if (score >= 65) return { label: 'Good',      color: 'text-sage-500' }
  if (score >= 45) return { label: 'Fair',       color: 'text-amber-500' }
  return               { label: 'Poor',          color: 'text-red-400'  }
}