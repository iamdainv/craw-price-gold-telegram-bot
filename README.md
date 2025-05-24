# Gold Price Crawler API

A Node.js Express server for crawling and serving Vietnamese gold price data from [24h.com.vn](https://www.24h.com.vn/gia-vang-hom-nay-c425.html) with Telegram bot integration.

## Features

- ✅ Real-time gold price data from Vietnamese market
- ✅ Telegram bot notifications and alerts
- ✅ Support for major gold types (SJC, DOJI, PNJ, etc.)
- ✅ Beautiful formatted table display
- ✅ RESTful API endpoints
- ✅ Request logging and CORS support
- ✅ Simple Docker deployment

## Requirements

- Node.js 16+ (for local development)
- NPM or Yarn (for local development)
- Docker (for containerized deployment)
- Telegram Bot (created via [@BotFather](https://t.me/botfather))

## Setup

### Option A: Local Development

#### 1. Clone the repository

```bash
git clone <repository-url>
cd crawl-price-gold
```

#### 2. Install dependencies

```bash
npm install
```

#### 3. Environment Configuration

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

#### 4. Telegram Bot Setup

1. **Create a Bot:**

   - Message [@BotFather](https://t.me/botfather) on Telegram
   - Send `/newbot` command
   - Follow instructions to create your bot
   - Copy the bot token provided

2. **Get Your Chat ID:**
   - Send a message to [@userinfobot](https://t.me/userinfobot)
   - Or send a message to your bot, then visit: `https://api.telegram.org/bot<YOUR_BOT_TOKEN>/getUpdates`
   - Find your chat ID in the response

#### 5. Start the server

```bash
# Development
npm run dev

# Production
npm start
```

### Option B: Docker Deployment (Simple & Fast)

#### 1. Quick Start (3 commands)

```bash
# 1. Build the image
docker build -t gold-price-crawler .

# 2. Run the container
docker run -d --name gold-price-crawler \
  -p 3000:3000 \
  -e TELEGRAM_BOT_TOKEN=your_bot_token_here \
  -e TELEGRAM_CHAT_ID=your_chat_id_here \
  --restart unless-stopped \
  gold-price-crawler

# 3. Check if it's running
docker logs gold-price-crawler
```

## API Endpoints

| Method | Endpoint                    | Description                       |
| ------ | --------------------------- | --------------------------------- |
| `GET`  | `/`                         | Welcome message and API info      |
| `POST` | `/api/telegram/send-test`   | Send test message to Telegram     |
| `POST` | `/api/telegram/price-alert` | Send gold price alert to Telegram |
| `GET`  | `/api/telegram/gold-prices` | Get current gold prices (JSON)    |

### API Examples

```bash
# Test the API
curl http://localhost:3000/

# Get gold prices
curl http://localhost:3000/api/telegram/gold-prices

# Send price alert to Telegram
curl -X POST http://localhost:3000/api/telegram/price-alert \
  -H "Content-Type: application/json" \
  -d '{"includeDetails": true}'
```

## Project Structure

```
crawl-price-gold/
├── config/           # Configuration files
├── middleware/       # Express middleware
├── routes/          # API routes
├── utils/           # Utility functions
├── Dockerfile        # Simple Docker image
├── .dockerignore     # Docker exclusions
├── index.js         # Main server file
├── package.json     # Dependencies
└── README.md        # This file
```

## Data Source

Real-time gold price data from [24h.com.vn](https://www.24h.com.vn/gia-vang-hom-nay-c425.html):

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

3. **Docker issues:**
   - Ensure Docker is running: `docker info`
   - Check container logs: `docker logs gold-price-crawler`
   - Verify environment variables are set correctly
