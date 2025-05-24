/**
 * Telegram Bot Configuration
 * 
 * This file contains configuration for Telegram bot integration.
 * You need to create a bot via BotFather (https://t.me/botfather) and get the token.
 */

module.exports = {
  // Replace with your actual bot token from BotFather
  botToken: process.env.TELEGRAM_BOT_TOKEN || 'YOUR_BOT_TOKEN_HERE',
  
  // Chat ID where notifications will be sent (can be group chat or user ID)
  chatId: process.env.TELEGRAM_CHAT_ID || 'YOUR_CHAT_ID_HERE',

  SOURCE_GOLD_PRICE_URL: process.env.SOURCE_GOLD_PRICE_URL || 'https://www.24h.com.vn/gia-vang-hom-nay-c425.html',
  
  // Bot settings
  notifications: {
    enabled: true,
    priceAlerts: true,
    dailySummary: true,
    significantChanges: {
      enabled: true,
      thresholdPercentage: 2.0 // Alert on price changes greater than 2%
    }
  },
  
  // Bot commands
  commands: {
    start: 'Welcome to Gold Price Tracker bot!',
    help: 'Available commands: /price, /subscribe, /unsubscribe, /settings',
    price: 'Current gold price: {price} {currency}',
    subscribe: 'You have successfully subscribed to price alerts',
    unsubscribe: 'You have unsubscribed from price alerts',
    settings: 'Bot settings'
  }
}; 