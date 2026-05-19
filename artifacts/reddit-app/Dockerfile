# ──────────────────────────────────────────────────────────────
# Threadit Frontend — Production Dockerfile
# ──────────────────────────────────────────────────────────────
FROM node:22-alpine AS base

# Install pnpm
RUN corepack enable && corepack prepare pnpm@latest --activate

WORKDIR /app

# ──────────────────────────────────────────────────────────────
# Dependencies stage
# ──────────────────────────────────────────────────────────────
FROM base AS deps

COPY pnpm-workspace.yaml pnpm-lock.yaml package.json ./
COPY lib/db/package.json lib/db/
COPY lib/api-spec/package.json lib/api-spec/
COPY lib/api-zod/package.json lib/api-zod/
COPY lib/api-client-react/package.json lib/api-client-react/
COPY artifacts/reddit-app/package.json artifacts/reddit-app/

RUN pnpm install --frozen-lockfile

# ──────────────────────────────────────────────────────────────
# Build stage
# ──────────────────────────────────────────────────────────────
FROM base AS builder

COPY --from=deps /app/node_modules /app/node_modules
COPY --from=deps /app/lib/ /app/lib/
COPY --from=deps /app/artifacts/reddit-app/node_modules /app/artifacts/reddit-app/node_modules

COPY . .

ARG VITE_API_URL
ARG VITE_SUPABASE_URL
ARG VITE_SUPABASE_ANON_KEY
ARG VITE_SENTRY_DSN
ARG VITE_POSTHOG_KEY
ARG VITE_APP_VERSION

ENV NODE_ENV=production

# Build shared libs
RUN cd lib/api-spec && pnpm run build 2>/dev/null || true
RUN cd lib/api-zod && pnpm run build 2>/dev/null || true
RUN cd lib/api-client-react && pnpm run build 2>/dev/null || true

# Build frontend
RUN cd artifacts/reddit-app && pnpm run build

# ──────────────────────────────────────────────────────────────
# Production stage — serve with nginx
# ──────────────────────────────────────────────────────────────
FROM nginx:alpine AS production

# Security: non-root user
RUN addgroup -g 1001 -S threadit && \
    adduser -S threadit -u 1001 -G threadit

# Custom nginx config for SPA
COPY --from=builder /app/artifacts/reddit-app/dist/public /usr/share/nginx/html

RUN cat > /etc/nginx/conf.d/default.conf << 'EOF'
server {
    listen 80;
    server_name _;
    root /usr/share/nginx/html;
    index index.html;

    # Security headers
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-Frame-Options "DENY" always;
    add_header X-XSS-Protection "0" always;
    add_header Referrer-Policy "strict-origin-when-cross-origin" always;
    add_header Permissions-Policy "camera=(), microphone=(), geolocation=()" always;

    # Gzip compression
    gzip on;
    gzip_vary on;
    gzip_min_length 1024;
    gzip_types text/plain text/css application/json application/javascript text/xml application/xml text/javascript image/svg+xml;

    # Cache static assets aggressively
    location /assets/ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }

    # Service worker — no cache
    location /sw.js {
        expires -1;
        add_header Cache-Control "no-cache, no-store, must-revalidate";
    }

    # SPA fallback
    location / {
        try_files $uri $uri/ /index.html;
    }

    # Health check
    location /health {
        return 200 '{"status":"ok"}';
        add_header Content-Type application/json;
    }
}
EOF

HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD wget -qO- http://localhost:80/health || exit 1

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
