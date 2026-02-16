#!/bin/sh

# Start the AI Backend in the background
echo "Starting AI Backend on port 5001..."
PORT=5001 node v2-ai-job-portal/backend/server.js &
BACKEND_PID=$!

# Wait for backend to start (simple sleep or check)
sleep 2

# Start the Next.js Frontend
# Railway assigns PORT env var, Next.js respects it by default or we pass it explicitly
echo "Starting Next.js Frontend on port $PORT..."
npm start &
FRONTEND_PID=$!

# Trap termination signals to kill both processes
trap "kill $BACKEND_PID $FRONTEND_PID; exit" SIGINT SIGTERM

# Wait for both processes
wait $BACKEND_PID $FRONTEND_PID
