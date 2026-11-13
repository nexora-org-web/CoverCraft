# CoverCraft

A browser-based assignment cover designer built with HTML, CSS and vanilla JavaScript. Designed for GitHub Pages with no backend, account or database.

## Features
- Portrait and landscape page layouts
- A4, A3, A5, Letter, Legal and custom paper sizes
- Original built-in background designs for general, science, mathematics and literature themes
- Three ready-made structures: Traditional, Modern and Creative
- Add, select, drag, resize and edit text elements
- Upload an institution logo (PNG, JPG, WebP or SVG)
- Unicode text and legacy ANSI font mode
- Upload custom TTF, OTF, WOFF and WOFF2 fonts for the current session
- PDF and high-resolution JPG export
- No autosave or browser storage. Refreshing the page clears the current work.

## Run locally
Open `index.html` in a modern browser. For best results, use a small local static server (for example, VS Code Live Server).

## Publish on GitHub Pages
1. Create a GitHub repository, for example `covercraft`.
2. Upload all files and folders from this project. Keep `index.html` at the repository root.
3. Open **Settings → Pages**.
4. Under **Build and deployment**, choose **Deploy from a branch**.
5. Select `main` and `/ (root)`, then Save.
6. Wait for the Pages URL to become available.

## Export dependencies
PDF and JPG export use `jsPDF` and `html2canvas` loaded from cdnjs CDN. An internet connection is required when exporting. The editor itself works without a backend.

## Important notes
- ANSI is a family of legacy encodings, not a single universal format. CoverCraft does not perform automatic Bijoy/ANSI conversion. For SutonnyMJ/Bijoy workflows, paste correctly converted legacy text and use a compatible legacy font.
- Custom fonts and uploaded logos are held only in the current browser page session. They are not uploaded to a server.
- The export renderer captures the visual design as a page image inside the PDF. This prioritizes layout fidelity. Text in the exported PDF is not selectable.
- Print results can vary by browser and printer. Check the exported page before printing.
