const jwt = require('jsonwebtoken');
const config = require('../config/config');

const auth = (req, res, next) => {
  try {
    const authHeader = req.header('Authorization');
    
    if (!authHeader) {
      return res.status(401).json({ message: "Access denied. No token provided." });
    }

    // Check if token starts with 'Bearer '
    const token = authHeader.startsWith('Bearer ') 
      ? authHeader.substring(7) 
      : authHeader;

    if (!token) {
      return res.status(401).json({ message: "Access denied. No token provided." });
    }

    try {
      const verified = jwt.verify(token, config.JWT_SECRET);
      req.user = verified;
      next();
    } catch (err) {
      return res.status(401).json({ message: "Invalid token." });
    }
  } catch (err) {
    return res.status(500).json({ message: "Server error in authentication." });
  }
};

module.exports = auth;
