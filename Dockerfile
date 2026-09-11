# =========================================================
# Multi-Stage Dockerfile for danielib.com (SPA Production)
# Lightweight, Secure Alpine Linux Container
# =========================================================

# Stage 1: Build Frontend Assets
FROM node:20-alpine AS builder

WORKDIR /app

# Copy package manifests first for optimal Docker layer caching
COPY package.json package-lock.json* ./

# Install dependencies cleanly and reliably
RUN if [ -f package-lock.json ]; then npm ci --no-audit --no-fund; else npm install --no-audit --no-fund; fi

# Copy full application source code
COPY . .

# Compile optimized static bundle to /app/dist
RUN npm run build

# Stage 2: Production NGINX Alpine Web Server
FROM nginx:1.27-alpine AS runner

# Remove default Nginx static files
RUN rm -rf /usr/share/nginx/html/*

# Copy compiled SPA bundle from builder stage
COPY --from=builder /app/dist /usr/share/nginx/html

# Copy optimized Nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Add healthcheck to ensure container reliability
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD wget --quiet --tries=1 --spider http://127.0.0.1:80/ || exit 1

# Expose internal HTTP port inside the container
EXPOSE 80

# Run Nginx in foreground
CMD ["nginx", "-g", "daemon off;"]
