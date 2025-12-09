# GitHub Profil Kartı - Kurulum Scripti
# Bu script tüm bağımlılıkları yükler

Write-Host "GitHub Profil Kartı - Kurulum Başlatılıyor..." -ForegroundColor Green
Write-Host ""

# Python kontrolü
Write-Host "Python kontrolü yapılıyor..." -ForegroundColor Cyan
$pythonVersion = python --version 2>&1
if ($LASTEXITCODE -eq 0) {
    Write-Host "✓ Python bulundu: $pythonVersion" -ForegroundColor Green
} else {
    Write-Host "✗ Python bulunamadı! Lütfen Python 3.8+ yükleyin." -ForegroundColor Red
    exit 1
}

# Node.js kontrolü
Write-Host "Node.js kontrolü yapılıyor..." -ForegroundColor Cyan
$nodeVersion = node --version 2>&1
if ($LASTEXITCODE -eq 0) {
    Write-Host "✓ Node.js bulundu: $nodeVersion" -ForegroundColor Green
} else {
    Write-Host "✗ Node.js bulunamadı! Lütfen Node.js 14+ yükleyin." -ForegroundColor Red
    exit 1
}

Write-Host ""
Write-Host "Backend bağımlılıkları yükleniyor..." -ForegroundColor Cyan
Set-Location backend

# Virtual environment oluştur
if (!(Test-Path "venv")) {
    Write-Host "Virtual environment oluşturuluyor..." -ForegroundColor Yellow
    python -m venv venv
}

# Virtual environment'ı aktifleştir ve paketleri yükle
Write-Host "Paketler yükleniyor..." -ForegroundColor Yellow
.\venv\Scripts\activate
pip install -r requirements.txt

if ($LASTEXITCODE -eq 0) {
    Write-Host "✓ Backend bağımlılıkları yüklendi" -ForegroundColor Green
} else {
    Write-Host "✗ Backend kurulumunda hata oluştu" -ForegroundColor Red
    exit 1
}

Set-Location ..

Write-Host ""
Write-Host "Frontend bağımlılıkları yükleniyor..." -ForegroundColor Cyan
Set-Location frontend

npm install

if ($LASTEXITCODE -eq 0) {
    Write-Host "✓ Frontend bağımlılıkları yüklendi" -ForegroundColor Green
} else {
    Write-Host "✗ Frontend kurulumunda hata oluştu" -ForegroundColor Red
    exit 1
}

Set-Location ..

Write-Host ""
Write-Host "========================================" -ForegroundColor Green
Write-Host "Kurulum tamamlandı! ✓" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Green
Write-Host ""
Write-Host "Uygulamayı başlatmak için:" -ForegroundColor Yellow
Write-Host "  .\start.ps1" -ForegroundColor Cyan
Write-Host ""
Write-Host "veya manuel olarak:" -ForegroundColor Yellow
Write-Host "  Backend: cd backend; python app.py" -ForegroundColor Cyan
Write-Host "  Frontend: cd frontend; npm start" -ForegroundColor Cyan
