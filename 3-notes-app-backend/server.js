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
    message: 'Welcome to the Notes App Backend API with JWT Authentication',
    endpoints: {
      auth: {
        register: 'POST /api/auth/register',
        login: 'POST /api/auth/login',
      },
      notes: {
        getAllNotes: 'GET /api/notes (Protected, supports ?category= & ?search=)',
        getSingleNote: 'GET /api/notes/:id (Protected)',
        createNote: 'POST /api/notes (Protected)',
        updateNote: 'PUT /api/notes/:id (Protected)',
        deleteNote: 'DELETE /api/notes/:id (Protected)',
      },
    },
  });
});

// Mount Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/notes', require('./routes/noteRoutes'));

// 404 Handler
app.use((req, res) => {
  res.status(404).json({ success: false, message: 'Route not found' });
});

// Start Server
const PORT = process.env.PORT || 5002;
app.listen(PORT, () => {
  console.log(`📝 Notes API Server running at http://localhost:${PORT}`);
});
