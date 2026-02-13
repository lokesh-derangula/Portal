@echo off
echo ==========================================
echo    JobNexus Pro - AI Job Portal
echo ==========================================
echo.

set NPM_CLI="C:\Program Files\nodejs\node_modules\npm\bin\npm-cli.js"

echo [1/4] Installing dependencies...
node %NPM_CLI% install --no-audit --no-fund

echo.
echo [2/4] Starting AI Backend Server...
start "JobNexus AI Backend" /b node v2-ai-job-portal/backend/server.js

echo.
echo [3/4] Starting Next.js Frontend...
start "JobNexus Frontend" /b node %NPM_CLI% run dev

echo.
echo [4/4] Launching Browser...
timeout /t 8 /nobreak >nul
start http://localhost:3000

echo.
echo ==========================================
echo  FRONTEND: http://localhost:3000
echo  BACKEND:  http://localhost:5001
echo ==========================================
echo  Press any key to stop.
pause
