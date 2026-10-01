const mongoose = require('mongoose');

// Connect to MongoDB Database
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/todo_db');
    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`❌ MongoDB Connection Error: ${error.message}`);
    console.log('💡 Tip: Make sure your local MongoDB service is running, or set MONGODB_URI in your .env file with your MongoDB Atlas connection string.');
  }
};

module.exports = connectDB;
