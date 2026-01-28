@echo off
echo ==========================================
echo   TEAM PORTFOLIO PREVIEW LAUNCHER
echo ==========================================
echo.
echo 1. Opening website in your browser...
start http://localhost:3000
echo.
echo 2. Starting local server...
echo    (This window must stay open)
echo.
echo    When you see "Ready in ...", the site is live!
echo.
cd /d "%~dp0"
call npm run dev
pause
