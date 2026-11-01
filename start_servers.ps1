# GlowAura Fullstack Launcher (PowerShell)
Write-Host "==========================================================" -ForegroundColor Magenta
Write-Host "  GLOWAURA - LUXURY HOME SALON & BEAUTY CONSULTANT" -ForegroundColor Yellow
Write-Host "==========================================================" -ForegroundColor Magenta

# 1. Start Django Backend
Write-Host "`n[1/3] Starting Python Django Backend on http://127.0.0.1:8000..." -ForegroundColor Cyan
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd 'E:\beauty_parlour_hub\backend'; python manage.py runserver 127.0.0.1:8000"

Start-Sleep -Seconds 3

# 2. Start Node.js Frontend
Write-Host "[2/3] Starting Node.js Vite Frontend on http://localhost:3000..." -ForegroundColor Cyan
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd 'E:\beauty_parlour_hub\frontend'; npm run dev"

Start-Sleep -Seconds 3

# 3. Open Browser
Write-Host "[3/3] Opening your browser at http://localhost:3000..." -ForegroundColor Green
Start-Process "http://localhost:3000"

Write-Host "`n==========================================================" -ForegroundColor Green
Write-Host "  WEBSITE IS RUNNING LOCALLY!" -ForegroundColor Green
Write-Host "  • Frontend UI   : http://localhost:3000" -ForegroundColor White
Write-Host "  • Backend API   : http://127.0.0.1:8000/api/" -ForegroundColor White
Write-Host "  • Django Admin  : http://127.0.0.1:8000/admin/ (admin / admin123)" -ForegroundColor White
Write-Host "==========================================================" -ForegroundColor Green
