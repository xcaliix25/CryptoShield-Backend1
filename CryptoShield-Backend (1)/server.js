const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

let scanCount = 0;
const SCAN_LIMIT_FREE = 5;

app.post('/scan', (req, res) => {
  const userType = req.headers['x-user-type'] || 'free';

  if (userType === 'free' && scanCount >= SCAN_LIMIT_FREE) {
    return res.status(403).json({ success: false, message: 'Free scan limit reached. Upgrade to PRO.' });
  }

  if (userType === 'free') scanCount++;

  // Mock AI scan result
  const address = req.body.address || '';
  const isScam = address.toLowerCase().includes('scam');
  const riskScore = isScam ? 95 : Math.floor(Math.random() * 50);

  res.json({
    success: true,
    address,
    result: {
      riskScore,
      verdict: isScam ? 'Scam detected' : 'No threat detected'
    }
  });
});

app.listen(PORT, () => {
  console.log(`CryptoShield AI Scanner running on port ${PORT}`);
});