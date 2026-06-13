const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

app.get('/health', (req, res) => {
  res.json({ status: 'ok', message: 'EcoScale backend running' });
});

app.listen(PORT, () => {
  console.log(`EcoScale backend running on port ${PORT}`);
});