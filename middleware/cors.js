/**
 * Custom CORS Middleware
 * Handles Cross-Origin Resource Sharing with configurable options
 */

const corsMiddleware = (options = {}) => {
  const defaultOptions = {
    origin: process.env.ALLOWED_ORIGINS ? process.env.ALLOWED_ORIGINS.split(',') : '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
    credentials: true,
    maxAge: 86400 // 24 hours
  };
  
  const config = { ...defaultOptions, ...options };
  
  return (req, res, next) => {
    const origin = req.headers.origin;
    
    // Set CORS headers
    if (config.origin === '*') {
      res.header('Access-Control-Allow-Origin', '*');
    } else if (Array.isArray(config.origin)) {
      if (config.origin.includes(origin)) {
        res.header('Access-Control-Allow-Origin', origin);
      }
    } else {
      res.header('Access-Control-Allow-Origin', config.origin);
    }
    
    res.header('Access-Control-Allow-Methods', config.methods.join(', '));
    res.header('Access-Control-Allow-Headers', config.allowedHeaders.join(', '));
    res.header('Access-Control-Allow-Credentials', config.credentials);
    res.header('Access-Control-Max-Age', config.maxAge);
    
    // Handle preflight requests
    if (req.method === 'OPTIONS') {
      return res.status(200).end();
    }
    
    next();
  };
};

module.exports = corsMiddleware; 