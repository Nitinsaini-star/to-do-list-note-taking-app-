# Multi-stage build for production
FROM node:18-alpine as frontend-build

WORKDIR /app/frontend
COPY frontend/package*.json ./
RUN npm ci --only=production

COPY frontend/ ./
RUN npm run build

# Backend stage
FROM node:18-alpine as backend

WORKDIR /app/backend
COPY backend/package*.json ./
RUN npm ci --only=production

COPY backend/ ./
RUN npm run build

# Production stage
FROM node:18-alpine as production

WORKDIR /app

# Install serve for frontend
RUN npm install -g serve

# Copy built backend
COPY --from=backend /app/backend/dist ./backend/dist
COPY --from=backend /app/backend/node_modules ./backend/node_modules
COPY --from=backend /app/backend/package.json ./backend/

# Copy built frontend
COPY --from=frontend-build /app/frontend/build ./frontend/build

# Expose port
EXPOSE 5000

# Start both backend and frontend
CMD ["sh", "-c", "cd backend && node dist/index.js & serve -s frontend/build -l 3000"]
