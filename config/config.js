// Configuration file for environment variables
require('dotenv').config();

module.exports = {
  // Server configuration
  NODE_ENV: process.env.NODE_ENV || 'development',
  PORT: process.env.PORT || 5000,
  
  // JWT configuration
  JWT_SECRET: process.env.JWT_SECRET || 'your_super_secret_jwt_key_here_change_this_in_production',
  JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN || '7d',
  
  // MongoDB configuration
  MONGODB_URI: process.env.MONGODB_URI || "mongodb+srv://admin:Ghaffar786@mycluster.b9fjfhn.mongodb.net/myVirtualDatabase?retryWrites=true&w=majority&appName=MyCluster",
  
  // CORS configuration
  CORS_ORIGIN: process.env.CORS_ORIGIN || 'http://localhost:3000'
};
