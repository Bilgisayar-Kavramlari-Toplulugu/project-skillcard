@echo off
chcp 65001 >nul
echo ===============================================
echo    GitHub Profil Kartı - Otomatik Başlatma
echo ===============================================
echo.

powershell -ExecutionPolicy Bypass -File "%~dp0run.ps1"

pause
