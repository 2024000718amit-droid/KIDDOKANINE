# Offline Resource Bundling Guide for PedoPlan Electron App

## 🎯 Overview

Bundle all external CDN resources locally to enable 100% offline functionality.

---

## 📦 Resources to Bundle

### 1. **Google Fonts** (3 fonts)
- DM Sans (300, 400, 500, 600, 700 weights)
- DM Serif Display (regular + italic)
- JetBrains Mono (400, 600 weights)

**Current CDN**:
```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=DM+Sans:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;600&display=swap" rel="stylesheet">
```

### 2. **Font Awesome 6.5.0**
- CSS file (all.min.css)
- Webfonts folder (fa-solid-900, fa-regular-400, etc.)

**Current CDN**:
```html
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css">
```

### 3. **html2pdf.js 0.10.1**
- Bundle file with dependencies

**Current CDN**:
```html
<script src="https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.10.1/html2pdf.bundle.min.js"></script>
```

### 4. **html2canvas 1.4.1**
- Minified library

**Current CDN**:
```html
<script src="https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js"></script>
```

---

## 🗂️ Proposed Directory Structure

```
extracted-app/
├── assets/
│   ├── fonts/
│   │   ├── dm-sans/
│   │   │   ├── dm-sans-300.woff2
│   │   │   ├── dm-sans-400.woff2
│   │   │   ├── dm-sans-500.woff2
│   │   │   ├── dm-sans-600.woff2
│   │   │   └── dm-sans-700.woff2
│   │   ├── dm-serif-display/
│   │   │   ├── dm-serif-regular.woff2
│   │   │   └── dm-serif-italic.woff2
│   │   └── jetbrains-mono/
│   │       ├── jetbrains-mono-400.woff2
│   │       └── jetbrains-mono-600.woff2
│   ├── fontawesome/
│   │   ├── css/
│   │   │   └── all.min.css
│   │   └── webfonts/
│   │       ├── fa-solid-900.woff2
│   │       ├── fa-solid-900.ttf
│   │       ├── fa-regular-400.woff2
│   │       └── fa-regular-400.ttf
│   └── libs/
│       ├── html2pdf.bundle.min.js
│       └── html2canvas.min.js
├── main.js
├── preload.js
├── package.json
└── PedoPlan_v5.html
```

---

## 🔧 Implementation Steps

### Step 1: Install Font Packages (NPM Method - Recommended)

```bash
cd c:\Users\jumke\Downloads\dist\extracted-app

npm init -y  # If package.json doesn't have dependencies section

npm install @fontsource/dm-sans @fontsource/dm-serif-display @fontsource/jetbrains-mono
```

**Note**: If you prefer manual download instead, see "Alternative: Manual Download" section below.

---

### Step 2: Create Directory Structure

```bash
# Create directories
mkdir assets
mkdir assets\fonts
mkdir assets\fonts\dm-sans
mkdir assets\fonts\dm-serif-display
mkdir assets\fonts\jetbrains-mono
mkdir assets\fontawesome
mkdir assets\fontawesome\css
mkdir assets\fontawesome\webfonts
mkdir assets\libs
```

---

### Step 3: Copy Font Files from node_modules

**After npm install, copy fonts**:

```bash
# DM Sans (300, 400, 500, 600, 700)
copy node_modules\@fontsource\dm-sans\files\dm-sans-latin-300-normal.woff2 assets\fonts\dm-sans\
copy node_modules\@fontsource\dm-sans\files\dm-sans-latin-400-normal.woff2 assets\fonts\dm-sans\
copy node_modules\@fontsource\dm-sans\files\dm-sans-latin-500-normal.woff2 assets\fonts\dm-sans\
copy node_modules\@fontsource\dm-sans\files\dm-sans-latin-600-normal.woff2 assets\fonts\dm-sans\
copy node_modules\@fontsource\dm-sans\files\dm-sans-latin-700-normal.woff2 assets\fonts\dm-sans\

# DM Serif Display (regular + italic)
copy node_modules\@fontsource\dm-serif-display\files\dm-serif-display-latin-400-normal.woff2 assets\fonts\dm-serif-display\
copy node_modules\@fontsource\dm-serif-display\files\dm-serif-display-latin-400-italic.woff2 assets\fonts\dm-serif-display\

# JetBrains Mono (400, 600)
copy node_modules\@fontsource\jetbrains-mono\files\jetbrains-mono-latin-400-normal.woff2 assets\fonts\jetbrains-mono\
copy node_modules\@fontsource\jetbrains-mono\files\jetbrains-mono-latin-600-normal.woff2 assets\fonts\jetbrains-mono\
```

---

### Step 4: Download Font Awesome 6.5.0

**Option A: Direct Download**
1. Go to: https://cdnjs.com/libraries/font-awesome
2. Find version 6.5.0
3. Download `all.min.css`
4. Download webfonts folder

**Option B: Command Line (using curl or wget)**

```bash
# Download Font Awesome CSS
curl -o assets/fontawesome/css/all.min.css https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css

# Download webfonts (primary ones needed)
curl -o assets/fontawesome/webfonts/fa-solid-900.woff2 https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/webfonts/fa-solid-900.woff2
curl -o assets/fontawesome/webfonts/fa-solid-900.ttf https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/webfonts/fa-solid-900.ttf
curl -o assets/fontawesome/webfonts/fa-regular-400.woff2 https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/webfonts/fa-regular-400.woff2
curl -o assets/fontawesome/webfonts/fa-regular-400.ttf https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/webfonts/fa-regular-400.ttf
curl -o assets/fontawesome/webfonts/fa-brands-400.woff2 https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/webfonts/fa-brands-400.woff2
curl -o assets/fontawesome/webfonts/fa-brands-400.ttf https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/webfonts/fa-brands-400.ttf
```

---

### Step 5: Download JavaScript Libraries

```bash
# html2pdf.js bundle
curl -o assets/libs/html2pdf.bundle.min.js https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.10.1/html2pdf.bundle.min.js

# html2canvas
curl -o assets/libs/html2canvas.min.js https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js
```

---

### Step 6: Update package.json

Add build dependencies:

```json
{
  "name": "pedoplan-desktop",
  "version": "1.0.0",
  "description": "Pediatric Dental Clinical Assistant - Desktop Application",
  "main": "main.js",
  "author": "PedoPlan",
  "license": "MIT",
  "dependencies": {
    "@fontsource/dm-sans": "^5.0.0",
    "@fontsource/dm-serif-display": "^5.0.0",
    "@fontsource/jetbrains-mono": "^5.0.0"
  }
}
```

---

### Step 7: Create Custom Font CSS File

Create: `assets/fonts/fonts.css`

```css
/* DM Sans - Regular */
@font-face {
  font-family: 'DM Sans';
  font-style: normal;
  font-weight: 300;
  src: url('./dm-sans/dm-sans-latin-300-normal.woff2') format('woff2');
}

@font-face {
  font-family: 'DM Sans';
  font-style: normal;
  font-weight: 400;
  src: url('./dm-sans/dm-sans-latin-400-normal.woff2') format('woff2');
}

@font-face {
  font-family: 'DM Sans';
  font-style: normal;
  font-weight: 500;
  src: url('./dm-sans/dm-sans-latin-500-normal.woff2') format('woff2');
}

@font-face {
  font-family: 'DM Sans';
  font-style: normal;
  font-weight: 600;
  src: url('./dm-sans/dm-sans-latin-600-normal.woff2') format('woff2');
}

@font-face {
  font-family: 'DM Sans';
  font-style: normal;
  font-weight: 700;
  src: url('./dm-sans/dm-sans-latin-700-normal.woff2') format('woff2');
}

/* DM Serif Display */
@font-face {
  font-family: 'DM Serif Display';
  font-style: normal;
  font-weight: 400;
  src: url('./dm-serif-display/dm-serif-display-latin-400-normal.woff2') format('woff2');
}

@font-face {
  font-family: 'DM Serif Display';
  font-style: italic;
  font-weight: 400;
  src: url('./dm-serif-display/dm-serif-display-latin-400-italic.woff2') format('woff2');
}

/* JetBrains Mono */
@font-face {
  font-family: 'JetBrains Mono';
  font-style: normal;
  font-weight: 400;
  src: url('./jetbrains-mono/jetbrains-mono-latin-400-normal.woff2') format('woff2');
}

@font-face {
  font-family: 'JetBrains Mono';
  font-style: normal;
  font-weight: 600;
  src: url('./jetbrains-mono/jetbrains-mono-latin-600-normal.woff2') format('woff2');
}
```

---

### Step 8: Update PedoPlan_v5.html

**Replace CDN links** with local paths:

**OLD (lines 14-19)**:
```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=DM+Sans:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;600&display=swap" rel="stylesheet">
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css">
<script src="https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.10.1/html2pdf.bundle.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js"></script>
```

**NEW**:
```html
<!-- Local Fonts -->
<link rel="stylesheet" href="./assets/fonts/fonts.css">
<!-- Local Font Awesome -->
<link rel="stylesheet" href="./assets/fontawesome/css/all.min.css">
<!-- Local JavaScript Libraries -->
<script src="./assets/libs/html2pdf.bundle.min.js"></script>
<script src="./assets/libs/html2canvas.min.js"></script>
```

---

## 🧪 Testing Checklist

### Test 1: Fonts Render Correctly
- [ ] Open app offline (disable internet)
- [ ] DM Sans loads (body text)
- [ ] DM Serif Display loads (titles)
- [ ] JetBrains Mono loads (code/dosage text)
- [ ] No font fallback to system fonts

### Test 2: Font Awesome Icons
- [ ] All icons visible (no missing boxes)
- [ ] Solid icons work (fa-solid)
- [ ] Regular icons work (fa-regular)
- [ ] Check: navigation icons, buttons, badges

### Test 3: PDF Export
- [ ] Generate a game plan
- [ ] Click export PDF
- [ ] PDF generates successfully
- [ ] Fonts render in PDF
- [ ] Icons render in PDF
- [ ] Layout is correct

### Test 4: Full Offline Mode
- [ ] Disconnect from internet completely
- [ ] Restart app
- [ ] All features work
- [ ] No console errors about missing resources

---

## 🚨 Troubleshooting

### Issue: Fonts don't load

**Causes**:
1. File paths incorrect
2. Font files missing
3. CSS @font-face syntax error

**Fix**:
- Check file paths in `fonts.css`
- Verify font files exist in `assets/fonts/`
- Open DevTools (F12) → check Network tab for 404 errors

---

### Issue: Font Awesome icons show as boxes

**Causes**:
1. Webfonts folder path incorrect in CSS
2. Font files missing
3. CSS file not loaded

**Fix**:
- Edit `assets/fontawesome/css/all.min.css`
- Find `url(../webfonts/` references
- Ensure they point to correct relative path
- Verify `.woff2` and `.ttf` files exist

---

### Issue: PDF export fails offline

**Causes**:
1. html2pdf.js or html2canvas not loaded
2. Library trying to fetch external resources

**Fix**:
- Check browser console for errors
- Verify both JS files loaded: check Network tab
- Ensure no external font/resource references in PDF content

---

### Issue: App works online but not offline

**Cause**: Electron cache loading CDN resources

**Fix**:
```bash
# Clear Electron cache
del /s /q %APPDATA%\pedoplan-desktop\
# Restart app
```

---

## 📊 File Size Impact

| Resource | Size | Notes |
|----------|------|-------|
| **DM Sans** (5 weights) | ~150 KB | woff2 compressed |
| **DM Serif Display** (2 styles) | ~50 KB | woff2 compressed |
| **JetBrains Mono** (2 weights) | ~100 KB | woff2 compressed |
| **Font Awesome CSS** | ~80 KB | Minified |
| **Font Awesome Webfonts** | ~500 KB | woff2 + ttf fallback |
| **html2pdf.bundle.js** | ~1.2 MB | Includes jsPDF + html2canvas |
| **html2canvas.js** | ~350 KB | Standalone |
| **Total** | **~2.4 MB** | One-time bundle |

**Impact**: Minimal for desktop app. Enables 100% offline functionality.

---

## ✅ Deployment Checklist

- [ ] All font files copied to `assets/fonts/`
- [ ] `fonts.css` created and configured
- [ ] Font Awesome CSS + webfonts downloaded
- [ ] html2pdf.js and html2canvas downloaded
- [ ] PedoPlan_v5.html updated with local paths
- [ ] Tested fonts render offline
- [ ] Tested icons render offline
- [ ] Tested PDF export offline
- [ ] No console errors
- [ ] Rebuilt Electron app: `npm run build`

---

## 🎯 Benefits

✅ **100% offline functionality** — no internet required  
✅ **Faster load times** — no CDN latency  
✅ **No external dependencies** — privacy-friendly  
✅ **Works in restricted networks** — hospital firewalls  
✅ **Consistent rendering** — no CDN version changes  

---

## 📖 Alternative: Manual Download

If `npm install` doesn't work or you prefer manual download:

### Google Fonts Manual Download:
1. Go to: https://google-webfonts-helper.herokuapp.com/fonts
2. Search for each font
3. Select needed weights
4. Download woff2 files
5. Copy to `assets/fonts/` directories

### Font Awesome Manual Download:
1. Go to: https://fontawesome.com/download
2. Download "Free for Web" version
3. Extract ZIP
4. Copy `css/all.min.css` → `assets/fontawesome/css/`
5. Copy `webfonts/` folder → `assets/fontawesome/webfonts/`

---

**Last Updated**: June 16, 2026  
**Version**: 1.0  
**Status**: Ready to implement
