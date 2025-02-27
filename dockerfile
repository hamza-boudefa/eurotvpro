# Use the official Node.js image as the base
FROM node:20-slim

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to install dependencies
COPY package.json package-lock.json ./

# Install dependencies (npm ci ensures a clean and deterministic install)
RUN npm ci

# Copy the rest of your application files into the container
COPY . .

# Build your Next.js application for production
RUN npm run build

# Expose the port that Next.js will run on
EXPOSE 3000

# Set environment variable to tell Next.js to run in production mode
ENV NODE_ENV=production

# Start the Next.js application
CMD ["npm", "start"]
