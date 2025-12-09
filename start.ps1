# GitHub Profil Kartı - Başlangıç Scripti
# Bu script backend ve frontend'i otomatik başlatır

Write-Host "GitHub Profil Kartı Uygulaması Başlatılıyor..." -ForegroundColor Green
Write-Host ""

# Backend'i başlat
Write-Host "Backend başlatılıyor (Python Flask)..." -ForegroundColor Cyan
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd backend; python app.py"

# Frontend'i başlat
Write-Host "Frontend başlatılıyor (React)..." -ForegroundColor Cyan
Start-Sleep -Seconds 2
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd frontend; npm start"

Write-Host ""
Write-Host "Uygulama başlatıldı!" -ForegroundColor Green
Write-Host "Backend: http://localhost:5000" -ForegroundColor Yellow
Write-Host "Frontend: http://localhost:3000" -ForegroundColor Yellow
Write-Host ""
Write-Host "Not: Her iki terminal penceresi de açık kalmalıdır." -ForegroundColor Magenta
