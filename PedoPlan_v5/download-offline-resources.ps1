# PedoPlan Offline Resource Downloader
# Downloads all CDN resources for local bundling

$baseDir = "c:\Users\jumke\Downloads\dist\extracted-app"

Write-Host "🚀 PedoPlan Offline Resource Downloader" -ForegroundColor Cyan
Write-Host "=======================================" -ForegroundColor Cyan
Write-Host ""

# Function to download file with progress
function Download-File {
    param (
        [string]$url,
        [string]$output
    )
    
    try {
        Write-Host "📥 Downloading: $output" -ForegroundColor Yellow
        Invoke-WebRequest -Uri $url -OutFile $output -UseBasicParsing
        Write-Host "✅ Downloaded: $output" -ForegroundColor Green
        return $true
    }
    catch {
        Write-Host "❌ Failed: $output - $($_.Exception.Message)" -ForegroundColor Red
        return $false
    }
}

# Download JavaScript Libraries
Write-Host "`n📦 Downloading JavaScript Libraries..." -ForegroundColor Cyan

Download-File `
    "https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.10.1/html2pdf.bundle.min.js" `
    "$baseDir\assets\libs\html2pdf.bundle.min.js"

Download-File `
    "https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js" `
    "$baseDir\assets\libs\html2canvas.min.js"

# Download Font Awesome
Write-Host "`n🎨 Downloading Font Awesome 6.5.0..." -ForegroundColor Cyan

Download-File `
    "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css" `
    "$baseDir\assets\fontawesome\css\all.min.css"

# Download Font Awesome Webfonts
$webfonts = @(
    "fa-solid-900.woff2",
    "fa-solid-900.ttf",
    "fa-regular-400.woff2",
    "fa-regular-400.ttf",
    "fa-brands-400.woff2",
    "fa-brands-400.ttf"
)

foreach ($font in $webfonts) {
    Download-File `
        "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/webfonts/$font" `
        "$baseDir\assets\fontawesome\webfonts\$font"
}

Write-Host "`n✅ Download Complete!" -ForegroundColor Green
Write-Host ""
Write-Host "📝 Next Steps:" -ForegroundColor Cyan
Write-Host "1. Install font packages: npm install @fontsource/dm-sans @fontsource/dm-serif-display @fontsource/jetbrains-mono"
Write-Host "2. Copy font files from node_modules to assets/fonts/ (see guide)"
Write-Host "3. Test offline functionality"
Write-Host ""
Write-Host "📖 Full guide: OFFLINE_BUNDLING_GUIDE.md"
