# Gold Price Crawler API

A Node.js Express server for crawling and serving Vietnamese gold price data from [24h.com.vn](https://www.24h.com.vn/gia-vang-hom-nay-c425.html) with Telegram bot integration.

## Features

- ✅ Real-time gold price data from Vietnamese market
- ✅ Telegram bot notifications and alerts
- ✅ Support for major gold types (SJC, DOJI, PNJ, etc.)
- ✅ Beautiful formatted table display
- ✅ RESTful API endpoints
- ✅ Request logging and CORS support

## Requirements

- Node.js 16+
- NPM or Yarn
- Telegram Bot (created via [@BotFather](https://t.me/botfather))

## Setup

### 1. Clone the repository

```bash
git clone <repository-url>
cd crawl-price-gold
```

### 2. Install dependencies

```bash
npm install
```

### 3. Environment Configuration

Create a `.env` file in the root directory with the following variables:

```env
# Server Configuration
PORT=3000

# Telegram Bot Configuration (Required)
TELEGRAM_BOT_TOKEN=your_bot_token_here
TELEGRAM_CHAT_ID=your_chat_id_here

# Data Source Configuration
SOURCE_GOLD_PRICE_URL=https://www.24h.com.vn/gia-vang-hom-nay-c425.html
```

#### Environment Variables Explanation:

| Variable                | Description                | Example                                             | Required           |
| ----------------------- | -------------------------- | --------------------------------------------------- | ------------------ |
| `PORT`                  | Server port number         | `3000`                                              | No (default: 3000) |
| `TELEGRAM_BOT_TOKEN`    | Bot token from @BotFather  | `123456789:ABCdefGhIJKlmNoPQRsTUVwxyZ`              | **Yes**            |
| `TELEGRAM_CHAT_ID`      | Your Telegram chat ID      | `1234567890`                                        | **Yes**            |
| `SOURCE_GOLD_PRICE_URL` | Gold price data source URL | `https://www.24h.com.vn/gia-vang-hom-nay-c425.html` | No (has default)   |

### 4. Telegram Bot Setup

1. **Create a Bot:**

   - Message [@BotFather](https://t.me/botfather) on Telegram
   - Send `/newbot` command
   - Follow instructions to create your bot
   - Copy the bot token provided

2. **Get Your Chat ID:**
   - Send a message to [@userinfobot](https://t.me/userinfobot)
   - Or send a message to your bot, then visit: `https://api.telegram.org/bot<YOUR_BOT_TOKEN>/getUpdates`
   - Find your chat ID in the response

### 5. Start the server

```bash
# Development
npm run dev

# Production
npm start
```

## API Endpoints

| Method | Endpoint                    | Description                       |
| ------ | --------------------------- | --------------------------------- |
| `GET`  | `/`                         | Welcome message and API info      |
| `POST` | `/api/telegram/send-test`   | Send test message to Telegram     |
| `POST` | `/api/telegram/price-alert` | Send gold price alert to Telegram |
| `GET`  | `/api/telegram/gold-prices` | Get current gold prices (JSON)    |

### API Examples

#### Send Gold Price Alert

```bash
curl -X POST http://localhost:3000/api/telegram/price-alert \
  -H "Content-Type: application/json" \
  -d '{"includeDetails": true}'
```

#### Get Raw Gold Price Data

```bash
curl http://localhost:3000/api/telegram/gold-prices
```

#### Send Test Message

```bash
curl -X POST http://localhost:3000/api/telegram/send-test \
  -H "Content-Type: application/json" \
  -d '{"message": "Hello from Gold Price Crawler!"}'
```

## Project Structure

```
crawl-price-gold/
├── config/           # Configuration files
├── middleware/       # Express middleware
├── routes/          # API routes
├── utils/           # Utility functions
├── index.js         # Main server file
├── package.json     # Dependencies
└── README.md        # This file
```

## Data Source

The application fetches real-time gold price data from [24h.com.vn](https://www.24h.com.vn/gia-vang-hom-nay-c425.html), including:

- **SJC Gold**: Vietnam's most popular gold brand
- **DOJI**: Major jewelry retailer prices
- **PNJ**: Leading jewelry company prices
- **Other major retailers**: BTMC, etc.

## Troubleshooting

### Common Issues:

1. **Bot not responding:**

   - Verify `TELEGRAM_BOT_TOKEN` is correct
   - Ensure you've started a conversation with your bot
   - Check `TELEGRAM_CHAT_ID` is accurate

2. **No gold price data:**

   - Verify the source website is accessible
   - Check internet connection
   - Ensure `SOURCE_GOLD_PRICE_URL` is valid

3. **Server won't start:**
   - Check if port is already in use
   - Verify all required environment variables are set
   - Ensure Node.js version is 16+

## License

This project is licensed under the ISC License.
