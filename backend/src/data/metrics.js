const getMetrics = () => {
  // Simulate slight variation each time — makes it feel like live monitoring
  const randomVariation = (base, range) => {
    return +(base + (Math.random() * range * 2 - range)).toFixed(2);
  };

  return {
    aws: {
      provider: "AWS EC2",
      instance: "t2.micro",
      region: "ap-south-1 (Mumbai)",
      cpu: randomVariation(42, 5),
      memory: randomVariation(67, 4),
      uptime: 99.95,
      responseTime: randomVariation(184, 20),
      monthlyCost: 8.50,
      requestsPerMin: randomVariation(340, 30),
      carbonFootprint: randomVariation(4.2, 0.3)
    },
    cloudflare: {
      provider: "Cloudflare Workers",
      instance: "Edge Compute",
      region: "Global (300+ PoPs)",
      cpu: randomVariation(18, 3),
      memory: randomVariation(28, 3),
      uptime: 99.99,
      responseTime: randomVariation(34, 8),
      monthlyCost: 0.00,
      requestsPerMin: randomVariation(340, 30),
      carbonFootprint: randomVariation(1.1, 0.2)
    }
  };
};

module.exports = { getMetrics };