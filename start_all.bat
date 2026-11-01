@echo off
title GlowAura Home Salon & Beauty Consultant Launcher
color 0D

echo =====================================================================
echo       GLOWAURA - LUXURY HOME SALON & BEAUTY CONSULTANT
echo =====================================================================
echo.
echo Starting Python Django Backend (Port 8000)...
start "GlowAura Django Backend (API & Admin)" cmd /k "cd /d E:\beauty_parlour_hub\backend && python manage.py runserver 127.0.0.1:8000"

timeout /t 3 /nobreak >nul

echo Starting Node.js Frontend (Port 3000)...
start "GlowAura Node.js Frontend (Vite & React)" cmd /k "cd /d E:\beauty_parlour_hub\frontend && npm run dev"

timeout /t 3 /nobreak >nul

echo Opening browser at http://localhost:3000 ...
start http://localhost:3000

echo.
echo =====================================================================
echo   SUCCESS! GlowAura is running locally:
echo   - Customer Website : http://localhost:3000
echo   - Django REST API  : http://127.0.0.1:8000/api/
echo   - Django Admin     : http://127.0.0.1:8000/admin/  (admin / admin123)
echo =====================================================================
echo Keep both terminal windows open while testing. Press any key to exit launcher.
pause >nul
