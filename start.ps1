# 🚀 GoMate - Quick Start Script

Write-Host "==================================" -ForegroundColor Cyan
Write-Host "   GoMate Travel App Setup" -ForegroundColor Cyan
Write-Host "==================================" -ForegroundColor Cyan
Write-Host ""

# Check Node.js
Write-Host "Checking Node.js installation..." -ForegroundColor Yellow
$nodeVersion = node --version 2>$null
if ($nodeVersion) {
    Write-Host "✓ Node.js $nodeVersion installed" -ForegroundColor Green
} else {
    Write-Host "✗ Node.js not found. Please install Node.js first." -ForegroundColor Red
    exit 1
}

# Check if we're in the right directory
if (!(Test-Path "package.json")) {
    Write-Host "✗ package.json not found. Please run this script from the GoMate directory." -ForegroundColor Red
    exit 1
}

Write-Host ""
Write-Host "Starting Expo development server..." -ForegroundColor Yellow
Write-Host ""
Write-Host "Options after server starts:" -ForegroundColor Cyan
Write-Host "  - Press 'a' to open Android emulator" -ForegroundColor White
Write-Host "  - Press 'i' to open iOS simulator (macOS only)" -ForegroundColor White
Write-Host "  - Press 'w' to open in web browser" -ForegroundColor White
Write-Host "  - Scan QR code with Expo Go app on your phone" -ForegroundColor White
Write-Host ""
Write-Host "Test Credentials:" -ForegroundColor Green
Write-Host "  Email: emilys@example.com" -ForegroundColor White
Write-Host "  Password: emilyspass" -ForegroundColor White
Write-Host ""
Write-Host "Starting server..." -ForegroundColor Yellow
Write-Host ""

# Start Expo
npm start
