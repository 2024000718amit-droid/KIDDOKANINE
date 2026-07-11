# KIDDOKANINE — Pediatric Dental Clinical Assistant

A client-side clinical planning tool for pediatric dental behavior management, built around Indian clinical context (Marwah 5th Ed., Shobha Tandon 3rd Ed., DCI Curriculum 2022, JISPPD research).

Generates a structured "clinical game plan" per patient: behavior-management strategy, escalation ladder, pharmacology notes, parent-management guidance, chairside scripts in English and Hindi, and exportable PDF/JSON/image outputs.

> **Disclaimer:** This is a clinical decision-support and documentation aid, not a substitute for professional clinical judgment. Always follow current guidelines and your institution's protocols.

## Live demo

Once deployed via GitHub Pages (see below), this will be available at:
`https://<your-username>.github.io/<repo-name>/`

## Project structure

```
.
├── index.html              # App shell / markup
├── manifest.json            # PWA manifest
├── icons/                   # App icons
├── css/
│   └── styles.css           # All app styling
├── js/
│   ├── install-prompt.js    # PWA install prompt handling
│   ├── clinical-engine.js   # Core clinical data matrix + app logic
│   ├── export.js            # PDF / JSON / image export & sharing
│   └── security.js          # Branding, license gate, watermarking, analytics
└── .github/workflows/       # CI/CD (GitHub Pages deploy)
```

This app was originally a single ~7,000-line HTML file and has been split into standard, maintainable files with no build step required — it runs as a static site.

## Running locally

No build tooling is required. Any static file server works:

```bash
npx serve .
# or
python3 -m http.server 8000
```

Then open the printed local URL in your browser.

If you prefer npm scripts, this repo includes a minimal `package.json`:

```bash
npm install
npm run dev
```

## Deployment (GitHub Pages)

A workflow is included at `.github/workflows/deploy.yml` that publishes the site to GitHub Pages automatically on every push to `main`.

To enable it:
1. Push this repo to GitHub.
2. Go to **Settings → Pages** in your repo.
3. Under **Build and deployment**, set **Source** to **GitHub Actions**.
4. Push to `main` — the site will build and deploy automatically.

## Notes on architecture

- **No backend, no database.** All data (patient entries, license/invite state) currently lives in browser `localStorage`. `js/security.js` includes comments marking where this can be swapped for a real backend (Supabase / Firebase / Clerk, etc.) if you later want multi-device sync, real user accounts, or a proper licensing server.
- **Third-party libraries** (Font Awesome, html2pdf.js, html2canvas, Google Fonts) are loaded via CDN in `index.html` rather than vendored, to keep the repo lightweight. Swap to self-hosted/npm-bundled versions if you need offline-first behavior beyond what the PWA cache already provides.
- **Licensing/invite-gate feature** (`KiddokanineLicense`, `authorizedUsers`, `inviteCodes` in `js/security.js`) is currently client-side only, which means it's a soft gate (not tamper-proof) — fine for a v1/beta but not a substitute for real server-side auth if this becomes a paid product.

## License

See `LICENSE`.
