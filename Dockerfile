# Use Node.js 18-alpine for a small, efficient image
FROM node:18-alpine AS base

# Stage 1: Install dependencies
FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app

# Copy package files (omitting lock file to avoid sync errors)
COPY package.json ./
RUN npm install

# Stage 2: Build the application
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Set environment variables for build
ENV NEXT_TELEMETRY_DISABLED 1
ENV NODE_ENV production

# Perform the build
RUN npm run build

# Stage 3: Production runner
FROM base AS runner
WORKDIR /app

ENV NODE_ENV production
ENV NEXT_TELEMETRY_DISABLED 1

# Create a system user for security
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Copy essential build artifacts and dependencies
COPY --from=builder --chown=nextjs:nodejs /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/v2-ai-job-portal ./v2-ai-job-portal

# Note: No public folder detected in root, skipping it.

USER nextjs

EXPOSE 3000
EXPOSE 5000

# Start both AI backend and Next.js frontend
# Railway will automatically use the $PORT variable if specified, but we default to 3000
CMD node v2-ai-job-portal/backend/server.js & npm start
