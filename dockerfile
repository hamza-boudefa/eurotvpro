FROM node:20-slim
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci
COPY . .
RUN npm run build
EXPOSE 5001
ENV NODE_ENV=production
ENV PORT=5001
CMD ["npx", "next", "start"]
