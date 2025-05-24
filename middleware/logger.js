/**
 * Request Logging Middleware
 * Logs all incoming requests with timestamps, methods, URLs, response times, and status codes
 */

const logger = (req, res, next) => {
  const startTime = Date.now();
  const timestamp = new Date().toISOString();
  const method = req.method;
  const url = req.originalUrl;
  const userAgent = req.get('User-Agent') || 'Unknown';
  const ip = req.ip || req.connection.remoteAddress || 'Unknown';

  // Log the incoming request
  console.log(`[${timestamp}] ${method} ${url} - IP: ${ip}`);
  
  // Override res.end to log response details
  const originalEnd = res.end;
  res.end = function(chunk, encoding) {
    const duration = Date.now() - startTime;
    const statusCode = res.statusCode;
    const statusColor = statusCode >= 400 ? '\x1b[31m' : statusCode >= 300 ? '\x1b[33m' : '\x1b[32m';
    const resetColor = '\x1b[0m';
    
    console.log(`[${timestamp}] ${statusColor}${statusCode}${resetColor} ${method} ${url} - ${duration}ms`);
    
    // Call the original end method
    originalEnd.call(this, chunk, encoding);
  };
  
  next();
};

module.exports = logger; 