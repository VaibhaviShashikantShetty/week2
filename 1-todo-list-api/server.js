const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

// Load environment variables from .env file
dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json()); // Parses incoming JSON request bodies

// Welcome route
app.get('/', (req, res) => {
  res.json({
    message: 'Welcome to the To-Do List REST API',
    endpoints: {
      getAllTasks: 'GET /api/tasks',
      getSingleTask: 'GET /api/tasks/:id',
      createTask: 'POST /api/tasks',
      updateTask: 'PUT /api/tasks/:id',
      deleteTask: 'DELETE /api/tasks/:id',
    },
  });
});

// Task Routes
app.use('/api/tasks', require('./routes/taskRoutes'));

// 404 Handler for undefined routes
app.use((req, res) => {
  res.status(404).json({ success: false, message: 'Route not found' });
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 To-Do API Server running at http://localhost:${PORT}`);
});
