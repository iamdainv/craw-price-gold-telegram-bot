##### Dockerfile #####
FROM node:18-alpine

#Set working directory
WORKDIR /app

#Copy package files first (for better caching)
COPY package*.json ./

#Install dependencies
RUN npm ci --only=production && npm cache clean --force

#Copy the rest of the application code
COPY . .

#Expose the port the app runs on
EXPOSE 3000
CMD [ "node", "index.js" ]
