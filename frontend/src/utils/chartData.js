// Generates fake historical data points around a base value
// This simulates what a real time-series monitoring API would return
const generateHistory = (baseValue, points = 10, variance = 8) => {
  return Array.from({ length: points }, (_, i) => ({
    time: `${points - i}m ago`,
    value: +(baseValue + (Math.random() * variance * 2 - variance)).toFixed(1),
  })).reverse()
}

export const buildResponseTimeData = (awsBase, cfBase) => {
  const awsHistory    = generateHistory(awsBase, 10, 20)
  const cfHistory     = generateHistory(cfBase, 10, 6)

  return awsHistory.map((point, i) => ({
    time:        point.time,
    AWS:         point.value,
    Cloudflare:  cfHistory[i].value,
  }))
}

export const buildCpuData = (awsCpu, cfCpu) => {
  return [
    { label: 'Current',  AWS: awsCpu,                      Cloudflare: cfCpu },
    { label: 'Peak',     AWS: +(awsCpu * 1.3).toFixed(1),  Cloudflare: +(cfCpu * 1.4).toFixed(1) },
    { label: 'Average',  AWS: +(awsCpu * 0.85).toFixed(1), Cloudflare: +(cfCpu * 0.9).toFixed(1) },
    { label: 'Idle',     AWS: +(awsCpu * 0.4).toFixed(1),  Cloudflare: +(cfCpu * 0.3).toFixed(1) },
  ]
}

export const buildCostData = () => {
  return [
    { label: 'Compute',   AWS: 8.50,  Cloudflare: 0 },
    { label: 'Bandwidth', AWS: 2.10,  Cloudflare: 0 },
    { label: 'Storage',   AWS: 1.20,  Cloudflare: 0 },
    { label: 'Total',     AWS: 11.80, Cloudflare: 0 },
  ]
}