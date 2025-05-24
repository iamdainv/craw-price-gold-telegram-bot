// Load environment variables and configuration
require('dotenv').config();

const express = require('express');
const { logger, cors } = require('./middleware');
const _  = require('./utils/cron');
// Initialize express app
const app = express();

// Apply middleware in order
app.use(cors()); // Custom CORS middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(logger); // Request logging middleware

// Import routes
const telegramRoutes = require('./routes/telegram');

// Define port
const PORT = process.env.PORT || 3000;

// Root route
app.get('/', (req, res) => {
  res.json({ 
    message: 'Welcome to the gold price crawler API',
    endpoints: {
      'GET /': 'This welcome message',
      'POST /api/telegram/send-test': 'Send test message to Telegram',
      'POST /api/telegram/price-alert': 'Send gold price alert to Telegram',
      'GET /api/telegram/gold-prices': 'Get current gold prices (JSON)'
    },
    telegram_configured: !!process.env.TELEGRAM_BOT_TOKEN,
    server_time: new Date().toISOString()
  });
});

// Apply routes
app.use('/api/telegram', telegramRoutes);

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
  console.log(`📱 Telegram Bot Token: ${process.env.TELEGRAM_BOT_TOKEN ? 'Configured ✅' : 'Not configured ❌'}`);
  console.log(`💬 Chat ID: ${process.env.TELEGRAM_CHAT_ID || 'Not set (you need to configure this)'}`);
  console.log(`📊 Request logging: Enabled ✅`);
  console.log(`🔒 CORS: Enabled ✅`);
  console.log(`🌐 API available at: http://localhost:${PORT}`);
}); 
