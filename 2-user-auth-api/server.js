const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

// Load environment variables
dotenv.config();

// Connect Database
connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Welcome Route
app.get('/', (req, res) => {
  res.json({
    message: 'Welcome to the User Authentication API (JWT & bcrypt)',
    endpoints: {
      register: 'POST /api/auth/register',
      login: 'POST /api/auth/login',
      getProfile: 'GET /api/auth/me (Protected)',
    },
  });
});

// Auth Routes
app.use('/api/auth', require('./routes/authRoutes'));

// 404 Handler
app.use((req, res) => {
  res.status(404).json({ success: false, message: 'Route not found' });
});

// Start Server
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`🔐 Auth API Server running at http://localhost:${PORT}`);
});
