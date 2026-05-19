# ──────────────────────────────────────────────────────
# Threadit API Server - Production Dockerfile
# ──────────────────────────────────────────────────────
FROM node:22-alpine AS base

# Install pnpm
RUN corepack enable && corepack prepare pnpm@latest --activate

WORKDIR /app

# ──────────────────────────────────────────────────────
# Dependencies stage
# ──────────────────────────────────────────────────────
FROM base AS deps

COPY pnpm-workspace.yaml pnpm-lock.yaml package.json ./
COPY lib/db/package.json lib/db/
COPY lib/api-spec/package.json lib/api-spec/
COPY lib/api-zod/package.json lib/api-zod/
COPY artifacts/api-server/package.json artifacts/api-server/

RUN pnpm install --frozen-lockfile --prod=false

# ──────────────────────────────────────────────────────
# Build stage
# ──────────────────────────────────────────────────────
FROM base AS builder

COPY --from=deps /app/node_modules /app/node_modules
COPY --from=deps /app/lib/db/node_modules /app/lib/db/node_modules
COPY --from=deps /app/artifacts/api-server/node_modules /app/artifacts/api-server/node_modules

COPY . .

# Build database lib
RUN cd lib/db && pnpm run build 2>/dev/null || true

# Build API server
RUN cd artifacts/api-server && pnpm run build

# ──────────────────────────────────────────────────────
# Production stage
# ──────────────────────────────────────────────────────
FROM node:22-alpine AS production

RUN corepack enable && corepack prepare pnpm@latest --activate

WORKDIR /app

# Security: non-root user
RUN addgroup -g 1001 -S threadit && \
    adduser -S threadit -u 1001 -G threadit

# Copy built artifacts
COPY --from=builder --chown=threadit:threadit /app/artifacts/api-server/dist ./dist
COPY --from=builder --chown=threadit:threadit /app/node_modules ./node_modules
COPY --from=builder --chown=threadit:threadit /app/artifacts/api-server/package.json ./package.json

USER threadit

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD wget -qO- http://localhost:${PORT:-5000}/api/health || exit 1

EXPOSE ${PORT:-5000}

ENV NODE_ENV=production

CMD ["node", "--enable-source-maps", "./dist/index.mjs"]
