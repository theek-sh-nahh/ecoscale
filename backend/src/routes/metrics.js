const express = require('express');
const router = express.Router();
const { getMetrics } = require('../data/metrics');

// GET /api/metrics — returns both providers
router.get('/', (req, res) => {
  const metrics = getMetrics();
  res.json({
    success: true,
    timestamp: new Date().toISOString(),
    data: metrics
  });
});

// GET /api/metrics/aws — returns only AWS
router.get('/aws', (req, res) => {
  const metrics = getMetrics();
  res.json({
    success: true,
    timestamp: new Date().toISOString(),
    data: metrics.aws
  });
});

// GET /api/metrics/cloudflare — returns only Cloudflare
router.get('/cloudflare', (req, res) => {
  const metrics = getMetrics();
  res.json({
    success: true,
    timestamp: new Date().toISOString(),
    data: metrics.cloudflare
  });
});

module.exports = router;