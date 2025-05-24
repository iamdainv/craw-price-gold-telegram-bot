const cron = require('node-cron');
const { sendPriceAlert } = require('./telegram_bot');
cron.schedule('* * * * *', () => {
    console.log("Running a task every minute");
    sendPriceAlert(true);   
});

// Send price alert every day at 6 AM
cron.schedule('0 6 * * *', () => {
    console.log("Sending daily price alert at 6 AM");
    sendPriceAlert(true);
});

  
module.exports = {
    cron
}