/**
 * Telegram Bot Utility Functions
 */
const axios = require('axios');
const cheerio = require('cheerio');
const telegramConfig = require('../config');
const { convertDayToVietnamese } = require('./day_converted');

/**
 * Send a message to a Telegram chat
 * @param {string} message - The message to send
 * @param {string} chatId - Chat ID (defaults to the one in config)
 * @returns {Promise} - Axios response promise
 */
async function sendMessage(message, chatId = telegramConfig.chatId) {
  try {
    const url = `https://api.telegram.org/bot${telegramConfig.botToken}/sendMessage`;

    const data = {
      chat_id: chatId,
      text: `\`\`\`${message}\`\`\``,
      parse_mode: 'Markdown'
    };
    
    const response = await axios.post(url, data);
    return response.data;
  } catch (error) {
    console.error('Error sending Telegram message:', error.message);
    return null;
  }
}

/**
 * Fetch gold price data from 24h.com.vn
 * @returns {Promise<Array>} - Array of gold price data
 */
async function fetchGoldPriceData() {
  try {
    const response = await axios.get('https://www.24h.com.vn/gia-vang-hom-nay-c425.html', {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
      }
    });
    
    const $ = cheerio.load(response.data);
    const goldPrices = [];
    
    // Find the gold price table
    $('table.gia-vang-search-data-table tbody tr').each((index, element) => {
      const $row = $(element);
      const cells = $row.find('td');
      
      if (cells.length >= 4) {
        const goldType = $row.find('td:first-child').text().trim();
        
        // Get buy price and trend
        const $buyCell =  $row.find('td:nth-child(2)');
        const $buyCurrentPrice = $buyCell.find('span:first-child');
        const $buyTrend = $buyCell.find('span:nth-child(3)');
        const buyPriceText = $buyCurrentPrice.text().trim().replace(/\s+/g, '');  
        const buyTrendText = $buyTrend.text().trim().replace(/\s+/g, '');
        const buyTrend = $buyTrend.find('.colorGreen') ? ' ▲ ' : 
                        $buyTrend.find('.colorRed') ? ' ▼ ' : '';
        const buyPrice = buyPriceText + buyTrend + buyTrendText;

        // Get sell price and trend
        const $sellCell = $row.find('td:nth-child(3)');
        const $sellCurrentPrice = $sellCell.find('span:first-child');
        const $sellTrend = $sellCell.find('span:nth-child(3)');
        const sellPriceText = $sellCurrentPrice.text().trim().replace(/\s+/g, '');
        const sellTrendText = $sellTrend.text().trim().replace(/\s+/g, '');
        const sellTrend = $sellTrend.find('.colorGreen') ? ' ▲ ' : 
                         $sellCellChild.find('.colorRed')? ' ▼ ' : '';
        const sellPrice = sellPriceText + sellTrend + sellTrendText;
        
        goldPrices.push({
          type: goldType,
          buyPrice: buyPrice,
          sellPrice: sellPrice
        });
      }
    });
        // console.log("🚀 ~ $ ~ goldPrices:", goldPrices)
    
    return goldPrices;
  } catch (error) {
    console.error('Error fetching gold price data:', error.message);
    return [];
  }
}

/**
 * Send a gold price alert with real data from 24h.com.vn
 * @param {boolean} includeDetails - Whether to include detailed price table (default: true)
 * @returns {Promise} - Result of sendMessage
 */
async function sendPriceAlert(includeDetails = true) {
  try {
    const goldPrices = await fetchGoldPriceData();
    
    if (goldPrices.length === 0) {
      return sendMessage('❌ <b>Unable to fetch gold price data</b>\n\nPlease try again later.');
    }
    
    let message = `Copy\n`;
    message += `${convertDayToVietnamese()}\n`;
    // message += `🌐 Nguồn: <a href="https://www.24h.com.vn/gia-vang-hom-nay-c425.html">24h.com.vn</a>\n\n`;
    
    if (includeDetails && goldPrices.length > 0) {
      message += `+---------------+---------------+---------------+\n`;
      message += `| Loại vàng    | Giá mua        | Giá bán       |\n`;
      message += `+---------------+---------------+---------------+\n`;
      
      goldPrices.forEach((item, index) => {
        if (index < 10) { // Limit to first 10 entries to avoid message length issues
          // Truncate and pad the fields to fit the table format
          const goldType = item.type.substring(0, 13).padEnd(13);
          const buyPrice = item.buyPrice.substring(0, 13).padEnd(13);
          const sellPrice = item.sellPrice.substring(0, 13).padEnd(13);
          
          message += `| ${goldType} | ${buyPrice} | ${sellPrice} |\n`;
        }
      });
      
      message += `+---------------+---------------+---------------+\n`;
      
      // Highlight SJC price if available
      // const sjcPrice = goldPrices.find(item => item.type.includes('SJC'));
      // if (sjcPrice) {
      //   message += `\n⭐ <b>Giá SJC nổi bật:</b>\n`;
      //   message += `💰 Mua: <b>${sjcPrice.buyPrice}</b>\n`;
      //   message += `💸 Bán: <b>${sjcPrice.sellPrice}</b>\n`;
      // }
    } else {
      message += `📈 <b>Giá vàng đang được cập nhật...</b>\n`;
      message += `Vui lòng thử lại sau ít phút.`;
    }
    
    return sendMessage(message);
  } catch (error) {
    console.error('Error in sendPriceAlert:', error.message);
    return sendMessage('❌ <b>Lỗi khi lấy dữ liệu giá vàng</b>\n\nVui lòng thử lại sau.');
  }
}

module.exports = {
  sendMessage,
  sendPriceAlert,
  fetchGoldPriceData,
  config: telegramConfig
}; 