/**
 * Middleware Index
 * Exports all middleware functions for easy importing
 */

const logger = require('./logger');
const corsMiddleware = require('./cors');

module.exports = {
  logger,
  cors: corsMiddleware
}; 