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
ENV BACKEND_URL http://localhost:5001

# Perform the build
RUN npm run build

# Stage 3: Production runner
FROM base AS runner
WORKDIR /app

ENV NODE_ENV production
ENV NEXT_TELEMETRY_DISABLED 1
ENV BACKEND_URL http://localhost:5001

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
EXPOSE 5001

# Start both AI backend (5001) and Next.js frontend (3000)
# Copy startup script and set permissions
COPY scripts/start.sh ./scripts/start.sh
RUN sed -i 's/\r$//' ./scripts/start.sh
RUN chmod +x ./scripts/start.sh

# Start both services using the script
CMD ["./scripts/start.sh"]
