# Use Node.js 18 alpine
FROM node:18-alpine

# Set working directory to /app
WORKDIR /app

# Copy only package.json first
COPY package.json ./

# Install dependencies (ignoring lock file to avoid sync errors)
# We use --legacy-peer-deps to avoid potential dependency conflicts
RUN npm install --legacy-peer-deps

# Copy the entire project content
COPY . .

# Set environment
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

# CRITICAL DEBUG: List files in the build container to prove 'app' exists
RUN echo "Checking current directory structure:" && pwd && ls -R | grep ":$" | head -n 20
RUN echo "Verifying 'app' directory exists:" && ls -d app

# Build the Next.js application
RUN npm run build

# Expose ports for Next.js (3000) and Backend (5000)
# Railway usually maps its $PORT to whatever the app exposes or listens on.
EXPOSE 3000
EXPOSE 5000

# Start command: runs the AI backend in background and Next.js in foreground
# We use '0.0.0.0' to ensure it's accessible externally
CMD node v2-ai-job-portal/backend/server.js & npm run start
