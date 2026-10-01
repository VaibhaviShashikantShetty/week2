const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Middleware to protect private routes using JWT
const protect = async (req, res, next) => {
  let token;

  // Check if token exists in Authorization header (Format: Bearer <token>)
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      // Extract token string after 'Bearer '
      token = req.headers.authorization.split(' ')[1];

      // Verify token
      const decoded = jwt.verify(
        token,
        process.env.JWT_SECRET || 'super_secret_jwt_key_12345'
      );

      // Find user from database and attach to request object (excluding password)
      req.user = await User.findById(decoded.id).select('-password');

      if (!req.user) {
        return res.status(401).json({
          success: false,
          message: 'User no longer exists',
        });
      }

      next(); // Proceed to next middleware or route handler
    } catch (error) {
      return res.status(401).json({
        success: false,
        message: 'Not authorized: Invalid or expired token',
      });
    }
  }

  if (!token) {
    return res.status(401).json({
      success: false,
      message: 'Not authorized: No token provided in header',
    });
  }
};

module.exports = { protect };
