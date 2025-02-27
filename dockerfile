FROM node:20-slim
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci
COPY . .
RUN npm run build
EXPOSE 6000
ENV NODE_ENV=production
CMD ["npm", "start"]
