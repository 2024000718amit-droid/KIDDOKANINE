# 🚀 Offline Bundling Quick Start

## ⚡ 5-Minute Setup

---

## Step 1: Download Resources (2 min)

### Option A: Use PowerShell Script (Recommended)

```powershell
# Run the download script
powershell -ExecutionPolicy Bypass -File download-offline-resources.ps1
```

This downloads:
- ✅ html2pdf.bundle.min.js
- ✅ html2canvas.min.js
- ✅ Font Awesome CSS
- ✅ Font Awesome webfonts (6 files)

---

### Option B: Manual Download

If script doesn't work, download manually:

```bash
# Navigate to project folder
cd c:\Users\jumke\Downloads\dist\extracted-app

# Download JS libraries
curl -o assets/libs/html2pdf.bundle.min.js https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.10.1/html2pdf.bundle.min.js
curl -o assets/libs/html2canvas.min.js https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js

# Download Font Awesome CSS
curl -o assets/fontawesome/css/all.min.css https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css

# Download Font Awesome webfonts
curl -o assets/fontawesome/webfonts/fa-solid-900.woff2 https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/webfonts/fa-solid-900.woff2
curl -o assets/fontawesome/webfonts/fa-solid-900.ttf https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/webfonts/fa-solid-900.ttf
curl -o assets/fontawesome/webfonts/fa-regular-400.woff2 https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/webfonts/fa-regular-400.woff2
curl -o assets/fontawesome/webfonts/fa-regular-400.ttf https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/webfonts/fa-regular-400.ttf
curl -o assets/fontawesome/webfonts/fa-brands-400.woff2 https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/webfonts/fa-brands-400.woff2
curl -o assets/fontawesome/webfonts/fa-brands-400.ttf https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/webfonts/fa-brands-400.ttf
```

---

## Step 2: Install & Copy Fonts (3 min)

```bash
# Install font packages
npm install @fontsource/dm-sans @fontsource/dm-serif-display @fontsource/jetbrains-mono

# Copy DM Sans fonts (5 weights)
copy node_modules\@fontsource\dm-sans\files\dm-sans-latin-300-normal.woff2 assets\fonts\dm-sans\
copy node_modules\@fontsource\dm-sans\files\dm-sans-latin-400-normal.woff2 assets\fonts\dm-sans\
copy node_modules\@fontsource\dm-sans\files\dm-sans-latin-500-normal.woff2 assets\fonts\dm-sans\
copy node_modules\@fontsource\dm-sans\files\dm-sans-latin-600-normal.woff2 assets\fonts\dm-sans\
copy node_modules\@fontsource\dm-sans\files\dm-sans-latin-700-normal.woff2 assets\fonts\dm-sans\

# Copy DM Serif Display fonts (2 styles)
copy node_modules\@fontsource\dm-serif-display\files\dm-serif-display-latin-400-normal.woff2 assets\fonts\dm-serif-display\
copy node_modules\@fontsource\dm-serif-display\files\dm-serif-display-latin-400-italic.woff2 assets\fonts\dm-serif-display\

# Copy JetBrains Mono fonts (2 weights)
copy node_modules\@fontsource\jetbrains-mono\files\jetbrains-mono-latin-400-normal.woff2 assets\fonts\jetbrains-mono\
copy node_modules\@fontsource\jetbrains-mono\files\jetbrains-mono-latin-600-normal.woff2 assets\fonts\jetbrains-mono\
```

---

## Step 3: Verify Files (1 min)

Check that all files exist:

```powershell
# Check directories exist
Test-Path assets\fonts\fonts.css
Test-Path assets\libs\html2pdf.bundle.min.js
Test-Path assets\libs\html2canvas.min.js
Test-Path assets\fontawesome\css\all.min.css

# Count font files (should be 9)
(Get-ChildItem -Path assets\fonts -Recurse -Filter *.woff2).Count

# Count Font Awesome webfonts (should be 6)
(Get-ChildItem -Path assets\fontawesome\webfonts).Count
```

**Expected**:
- ✅ 9 font files (.woff2)
- ✅ 6 Font Awesome webfonts
- ✅ 2 JavaScript libraries
- ✅ 1 Font Awesome CSS

---

## Step 4: Test Offline (2 min)

```bash
# 1. Disconnect from internet (turn off Wi-Fi)

# 2. Open PedoPlan_v5.html in browser or Electron app

# 3. Check:
✅ Fonts render correctly (not system fallback)
✅ Icons appear (not empty boxes)
✅ Generate a game plan
✅ Export to PDF
✅ No console errors (F12)
```

---

## ✅ Success Checklist

- [ ] All files downloaded
- [ ] Fonts copied from node_modules
- [ ] PedoPlan_v5.html updated (already done)
- [ ] Tested fonts render offline
- [ ] Tested icons render offline
- [ ] Tested PDF export offline
- [ ] No console errors

---

## 🚨 Troubleshooting

### Issue: Fonts don't load

**Quick Fix**:
```bash
# Check file paths
dir assets\fonts\dm-sans\*.woff2
dir assets\fonts\dm-serif-display\*.woff2
dir assets\fonts\jetbrains-mono\*.woff2

# Should see 9 files total
```

---

### Issue: Font Awesome icons show as boxes

**Quick Fix**:
1. Open `assets/fontawesome/css/all.min.css`
2. Search for `url(../webfonts/`
3. Verify path is correct (should be relative)
4. Check webfonts folder has 6 files

---

### Issue: PDF export fails

**Quick Fix**:
```bash
# Verify JS libraries exist
Test-Path assets\libs\html2pdf.bundle.min.js
Test-Path assets\libs\html2canvas.min.js

# Check browser console (F12) for errors
```

---

## 📦 File Structure After Setup

```
extracted-app/
├── assets/
│   ├── fonts/
│   │   ├── fonts.css ✅
│   │   ├── dm-sans/ (5 files) ✅
│   │   ├── dm-serif-display/ (2 files) ✅
│   │   └── jetbrains-mono/ (2 files) ✅
│   ├── fontawesome/
│   │   ├── css/
│   │   │   └── all.min.css ✅
│   │   └── webfonts/ (6 files) ✅
│   └── libs/
│       ├── html2pdf.bundle.min.js ✅
│       └── html2canvas.min.js ✅
├── PedoPlan_v5.html ✅ (updated)
└── package.json
```

---

## 🎯 What Changed

### HTML File (PedoPlan_v5.html)

**Before**:
```html
<link href="https://fonts.googleapis.com/css2?family=..." rel="stylesheet">
<link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/..." rel="stylesheet">
<script src="https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/..."></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/html2canvas/..."></script>
```

**After**:
```html
<link rel="stylesheet" href="./assets/fonts/fonts.css">
<link rel="stylesheet" href="./assets/fontawesome/css/all.min.css">
<script src="./assets/libs/html2pdf.bundle.min.js"></script>
<script src="./assets/libs/html2canvas.min.js"></script>
```

---

## 💡 Pro Tips

### Tip 1: Verify Before Building
Always test in browser first before building Electron app.

### Tip 2: Clear Cache
If changes don't appear, clear browser cache (Ctrl+Shift+Del).

### Tip 3: Check Paths
All paths in HTML are relative (`./assets/...`). Don't use absolute paths.

### Tip 4: Minify for Production
Font files are already compressed (woff2). No further minification needed.

---

## 🚀 Deploy to Electron

After everything works offline:

```bash
# Rebuild Electron app
npm run build

# Test the packaged app
# Installers will be in dist/ folder
```

---

## 📊 Bundle Size

| Category | Size | Files |
|----------|------|-------|
| Fonts | ~300 KB | 9 files |
| Font Awesome | ~580 KB | 7 files |
| JS Libraries | ~1.5 MB | 2 files |
| **Total** | **~2.4 MB** | **18 files** |

**Impact**: Negligible for desktop app, enables 100% offline use.

---

## 🎉 Done!

Your PedoPlan app now works **100% offline**:
- ✅ No internet required
- ✅ Faster load times
- ✅ Privacy-friendly (no CDN tracking)
- ✅ Works in restricted networks

---

**Questions?** See `OFFLINE_BUNDLING_GUIDE.md` for detailed troubleshooting.
