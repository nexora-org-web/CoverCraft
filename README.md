# CoverCraft

### Design better assignment covers, right in your browser.

CoverCraft is a lightweight, browser-based assignment cover designer that helps students create clean, organized, and professional-looking cover pages for school, college, and university assignments.

Choose a layout, customize the text, add your institution's logo, explore built-in backgrounds, and export your finished cover as a PDF or high-resolution JPG. No account, backend, or database is required.

## Features

- **Flexible page layouts:** Create portrait or landscape cover pages.
- **Multiple paper sizes:** Choose A3, A4, A5, Letter, Legal, or enter a custom size.
- **Ready-made designs:** Use built-in backgrounds for general, science, mathematics, and literature themes.
- **Three cover structures:** Start with Traditional, Modern, or Creative layouts.
- **Editable text:** Add, select, move, resize, edit, and delete text elements.
- **Institution logo:** Upload a logo in PNG, JPG, WebP, or SVG format.
- **Custom fonts:** Upload TTF, OTF, WOFF, or WOFF2 fonts for the current session.
- **Language support:** Work with Unicode text and a legacy ANSI font mode.
- **Export options:** Download your design as a PDF or high-resolution JPG.
- **Responsive interface:** Use the editor on desktop and mobile screens.
- **No account needed:** Your work stays in the current browser session. Nothing is saved to an account or remote database.

## Getting Started

### Run locally

1. Download or clone this repository.
2. Open the project folder.
3. Open `index.html` in a modern web browser.

For the best experience, run the project with a local static server, such as the **Live Server** extension in Visual Studio Code.

### Publish with GitHub Pages

1. Create a new GitHub repository.
2. Upload the project files and folders to the repository.
3. Make sure `index.html` is in the repository's root directory.
4. Open the repository's **Settings**.
5. Select **Pages** from the sidebar.
6. Under **Build and deployment**, choose **Deploy from a branch**.
7. Select the `main` branch and the `/ (root)` folder.
8. Click **Save** and wait for GitHub Pages to publish the site.

Your website will be available at the Pages URL shown in the repository settings.

## How to Use

1. Open CoverCraft in your browser.
2. Choose a page size and orientation.
3. Select a background and one of the available cover structures.
4. Add or edit the text to match your assignment details.
5. Upload your institution logo, if needed.
6. Adjust the position and size of the elements.
7. Export the finished cover as a PDF or JPG.

**Tip:** Review the cover in the editor before exporting, especially when using custom fonts or long text.

## Technologies Used

- HTML5
- CSS3
- Vanilla JavaScript
- [html2canvas](https://html2canvas.hertzen.com/)
- [jsPDF](https://github.com/parallax/jsPDF)

No framework, backend, account system, or database is required.

## Important Notes

- **Export requires an internet connection.** CoverCraft loads `html2canvas` and `jsPDF` from a CDN when exporting PDF or JPG files. The export feature may not work if those libraries cannot load.
- **Your work is temporary.** CoverCraft does not use browser storage or cloud saving. Refreshing or closing the page clears the current design.
- **Uploaded files stay in the current session.** Logos and custom fonts are handled in the browser and are not uploaded to a server.
- **ANSI compatibility:** ANSI refers to a range of legacy encodings, not one universal format. CoverCraft does not automatically convert Bijoy/ANSI text. Paste text that has already been converted to the required legacy encoding and select a compatible font, such as SutonnyMJ, when using that workflow.
- **PDF text is not selectable.** The exported PDF uses a high-resolution image of the cover to preserve its visual layout.
- **Printing may vary.** Browser and printer settings can affect the final printed result. Check the exported file before printing.

## Privacy

CoverCraft does not require an account and has no project database or backend. Your current design, uploaded logo, and custom fonts remain in the active browser session. Refreshing the page clears the work.

## Credits

Created by **NEXORA**.

GitHub: [NEXORA](https://github.com/nexora-org-web/Nexora-Official)

---

Made for learners.
