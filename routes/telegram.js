const express = require('express');
const router = express.Router();
const telegramBot = require('../utils/telegram_bot');

/**
 * Send a test message to the configured Telegram chat
 * @route POST /telegram/send-test
 */
router.post('/send-test', async (req, res) => {
  try {
    const { message } = req.body;
    
    if (!message) {
      return res.status(400).json({ 
        success: false, 
        message: 'Message content is required' 
      });
    }
    
    const result = await telegramBot.sendMessage(message);
    
    return res.json({ 
      success: true, 
      message: 'Message sent successfully', 
      result 
    });
  } catch (error) {
    console.error('Error sending test message:', error);
    return res.status(500).json({ 
      success: false, 
      message: 'Failed to send message', 
      error: error.message 
    });
  }
});

/**
 * Send current gold price alert from 24h.com.vn
 * @route POST /telegram/price-alert
 */
router.post('/price-alert', async (req, res) => {
  try {
    const { includeDetails } = req.body;
    
    const result = await telegramBot.sendPriceAlert(includeDetails !== false);
    
    return res.json({ 
      success: true, 
      message: 'Gold price alert sent successfully', 
      result 
    });
  } catch (error) {
    console.error('Error sending price alert:', error);
    return res.status(500).json({ 
      success: false, 
      message: 'Failed to send price alert', 
      error: error.message 
    });
  }
});

/**
 * Get raw gold price data from 24h.com.vn
 * @route GET /telegram/gold-prices
 */
router.get('/gold-prices', async (req, res) => {
  try {
    const goldPrices = await telegramBot.fetchGoldPriceData();
    
    return res.json({ 
      success: true, 
      message: 'Gold price data fetched successfully', 
      data: goldPrices,
      timestamp: new Date().toISOString(),
      source: 'https://www.24h.com.vn/gia-vang-hom-nay-c425.html'
    });
  } catch (error) {
    console.error('Error fetching gold price data:', error);
    return res.status(500).json({ 
      success: false, 
      message: 'Failed to fetch gold price data', 
      error: error.message 
    });
  }
});

module.exports = router; 