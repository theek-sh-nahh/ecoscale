const express = require('express');
const cors = require('cors');

const metricsRouter = require('./routes/metrics');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// Routes
app.use('/api/metrics', metricsRouter);

// Health check
app.get('/health', (req, res) => {
  res.json({ 
    status: 'ok', 
    message: 'EcoScale backend running',
    version: '1.0.0'
  });
});

app.listen(PORT, () => {
  console.log(`🌿 EcoScale backend running on http://localhost:${PORT}`);
});