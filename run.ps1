# GitHub Profil Karti - Tek Tikla Baslat
# Bu script otomatik kurulum ve baslatma yapar

Write-Host "===============================================" -ForegroundColor Cyan
Write-Host "   GitHub Profil Karti - Otomatik Baslatma   " -ForegroundColor Cyan
Write-Host "===============================================" -ForegroundColor Cyan
Write-Host ""

# Kurulum kontrolu
$backendInstalled = Test-Path "backend\venv"
$frontendInstalled = Test-Path "frontend\node_modules"

if (-not $backendInstalled -or -not $frontendInstalled) {
    Write-Host "Ilk kurulum yapiliyor..." -ForegroundColor Yellow
    Write-Host ""
    
    # Python kontrolu
    Write-Host "Python kontrolu yapiliyor..." -ForegroundColor Cyan
    $pythonVersion = python --version 2>&1
    if ($LASTEXITCODE -ne 0) {
        Write-Host "Python bulunamadi! Lutfen Python 3.8+ yukleyin." -ForegroundColor Red
        Write-Host "Indirme: https://www.python.org/downloads/" -ForegroundColor Yellow
        pause
        exit 1
    }
    Write-Host "Python bulundu: $pythonVersion" -ForegroundColor Green
    
    # Node.js kontrolu
    Write-Host "Node.js kontrolu yapiliyor..." -ForegroundColor Cyan
    $nodeVersion = node --version 2>&1
    if ($LASTEXITCODE -ne 0) {
        Write-Host "Node.js bulunamadi! Lutfen Node.js 14+ yukleyin." -ForegroundColor Red
        Write-Host "Indirme: https://nodejs.org/" -ForegroundColor Yellow
        pause
        exit 1
    }
    Write-Host "Node.js bulundu: $nodeVersion" -ForegroundColor Green
    
    Write-Host ""
    Write-Host "Backend kurulumu yapiliyor..." -ForegroundColor Cyan
    Set-Location backend
    
    if (!(Test-Path "venv")) {
        Write-Host "  Virtual environment olusturuluyor..." -ForegroundColor Yellow
        python -m venv venv
    }
    
    Write-Host "  Paketler yukleniyor..." -ForegroundColor Yellow
    .\venv\Scripts\activate
    pip install -q -r requirements.txt
    
    if ($LASTEXITCODE -eq 0) {
        Write-Host "Backend kurulumu tamamlandi" -ForegroundColor Green
    } else {
        Write-Host "Backend kurulumunda hata olustu" -ForegroundColor Red
        Set-Location ..
        pause
        exit 1
    }
    
    Set-Location ..
    
    Write-Host ""
    Write-Host "Frontend kurulumu yapiliyor..." -ForegroundColor Cyan
    Set-Location frontend
    
    Write-Host "  Paketler yukleniyor (bu birkac dakika surebilir)..." -ForegroundColor Yellow
    npm install --silent
    
    if ($LASTEXITCODE -eq 0) {
        Write-Host "Frontend kurulumu tamamlandi" -ForegroundColor Green
    } else {
        Write-Host "Frontend kurulumunda hata olustu" -ForegroundColor Red
        Set-Location ..
        pause
        exit 1
    }
    
    Set-Location ..
    
    Write-Host ""
    Write-Host "========================================" -ForegroundColor Green
    Write-Host "   Kurulum Basariyla Tamamlandi!      " -ForegroundColor Green
    Write-Host "========================================" -ForegroundColor Green
    Write-Host ""
    Start-Sleep -Seconds 2
}

# Uygulamayi baslat
Write-Host ""
Write-Host "Uygulama baslatiliyor..." -ForegroundColor Green
Write-Host ""

# Backend'i baslat
Write-Host "Backend baslatiliyor (Flask API)..." -ForegroundColor Cyan
$backendPath = (Get-Location).Path + "\backend"
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$backendPath'; .\venv\Scripts\activate; python app.py"

Start-Sleep -Seconds 3

# Frontend'i baslat
Write-Host "Frontend baslatiliyor (React)..." -ForegroundColor Cyan
$frontendPath = (Get-Location).Path + "\frontend"
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$frontendPath'; npm start"

Write-Host ""
Write-Host "========================================" -ForegroundColor Green
Write-Host "   Uygulama Basariyla Baslatildi!     " -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Green
Write-Host ""
Write-Host "Backend:  http://localhost:5000" -ForegroundColor Yellow
Write-Host "Frontend: http://localhost:3000" -ForegroundColor Yellow
Write-Host ""
Write-Host "Tarayiciniz otomatik olarak acilacak..." -ForegroundColor Cyan
Write-Host ""
Write-Host "NOT: Acilan terminal pencerelerini kapatmayin!" -ForegroundColor Magenta
Write-Host "     Uygulamayi durdurmak icin terminalleri kapatabilirsiniz." -ForegroundColor Magenta
Write-Host ""
Write-Host "Iyi kullanimlar!" -ForegroundColor Green
Write-Host ""

# Tarayiciyi ac
Start-Sleep -Seconds 8
Start-Process "http://localhost:3000"
