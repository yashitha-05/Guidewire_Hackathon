const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(helmet());
app.use(cors());
app.use(express.json());

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});
app.use(limiter);

// Mock data for demo purposes
const mockUsers = [
  {
    id: 1,
    name: 'Rajesh Kumar',
    phone: '+919876543210',
    email: 'rajesh@example.com',
    platform: 'Zepto',
    city: 'Delhi',
    coverageStatus: 'active',
    weeklyPremium: 150,
    coverageAmount: 1000,
    riskScore: 65
  }
];

const mockClaims = [
  {
    id: 'CLM001',
    userId: 1,
    date: '2026-03-10',
    trigger: 'Heavy Rain',
    amount: 500,
    status: 'paid',
    location: 'Delhi NCR'
  },
  {
    id: 'CLM002',
    userId: 1,
    date: '2026-02-28',
    trigger: 'Air Quality',
    amount: 750,
    status: 'paid',
    location: 'Delhi NCR'
  }
];

// Routes
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'GigShield API is running' });
});

// User routes
app.get('/api/users/:id', (req, res) => {
  const user = mockUsers.find(u => u.id === parseInt(req.params.id));
  if (!user) {
    return res.status(404).json({ error: 'User not found' });
  }
  res.json(user);
});

// Claims routes
app.get('/api/users/:userId/claims', (req, res) => {
  const userClaims = mockClaims.filter(c => c.userId === parseInt(req.params.userId));
  res.json(userClaims);
});

// Risk assessment route
app.get('/api/risk-assessment/:city', (req, res) => {
  const city = req.params.city.toLowerCase();
  const riskData = {
    delhi: { score: 75, factors: ['High pollution', 'Heavy rain', 'Traffic congestion'] },
    mumbai: { score: 60, factors: ['Monsoon rains', 'Flood risk', 'Urban heat'] },
    bangalore: { score: 45, factors: ['Moderate weather', 'Light pollution'] },
    default: { score: 50, factors: ['Standard risk factors'] }
  };

  const data = riskData[city] || riskData.default;
  res.json({
    city: req.params.city,
    riskScore: data.score,
    riskFactors: data.factors,
    lastUpdated: new Date().toISOString()
  });
});

// Parametric triggers route
app.get('/api/triggers/active', (req, res) => {
  // Mock active triggers
  const activeTriggers = [
    {
      id: 1,
      type: 'weather',
      condition: 'Heavy Rain',
      threshold: '>40mm/hr',
      currentValue: 45,
      activated: true,
      location: 'Delhi NCR',
      timestamp: new Date().toISOString()
    }
  ];

  res.json(activeTriggers);
});

// Registration route
app.post('/api/auth/register', (req, res) => {
  const { fullName, phoneNumber, email, deliveryPlatform, city } = req.body;

  // Basic validation
  if (!fullName || !phoneNumber || !deliveryPlatform || !city) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  // Mock user creation
  const newUser = {
    id: mockUsers.length + 1,
    name: fullName,
    phone: phoneNumber,
    email: email || null,
    platform: deliveryPlatform,
    city: city,
    coverageStatus: 'pending',
    weeklyPremium: 0,
    coverageAmount: 0,
    riskScore: 0
  };

  mockUsers.push(newUser);

  res.status(201).json({
    message: 'Registration successful',
    user: newUser,
    nextSteps: ['Complete KYC', 'Purchase coverage']
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

app.listen(PORT, () => {
  console.log(`🚀 GigShield API server running on port ${PORT}`);
  console.log(`📊 Health check: http://localhost:${PORT}/api/health`);
});

module.exports = app;