@echo off
setlocal
if /i "%~1"=="--hidden" goto run
start "" wscript.exe "%~dp0open-pokedex.vbs"
exit /b 0

:run
title Pokedex - Local Server
cd /d "%~dp0"
if errorlevel 1 goto failed

where node >nul 2>&1
if errorlevel 1 (
  echo Node.js is required. Install Node.js 20 or newer and try again.
  goto failed
)
where npm.cmd >nul 2>&1
if errorlevel 1 (
  echo npm was not found. Reinstall Node.js and try again.
  goto failed
)

if not exist "node_modules\.bin\vite.cmd" goto install
if not exist "node_modules\.bin\concurrently.cmd" goto install
goto launch

:install
echo Installing project dependencies...
call npm.cmd ci
if errorlevel 1 goto failed

:launch
rem Match the backend port configured in vite.config.js.
set "PORT=3001"
echo Opening Pokedex in your default browser when the frontend is ready...
echo If port 5173 is busy, Vite will use the next available port.
echo Pokedex is running in the background.
call "node_modules\.bin\concurrently.cmd" --kill-others "node node_modules/vite/bin/vite.js --host 127.0.0.1 --port 5173 --open" "node server/index.js"
if errorlevel 1 goto failed
exit /b 0

:failed
echo.
echo Pokedex could not start. Check the error above.
exit /b 1
