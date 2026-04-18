# Project Guidelines

## Architecture
- This is a static multi-page site (no build pipeline, no backend).
- Each tool is a self-contained page at `<tool-name>/index.html`.
- Shared assets live at the repo root:
  - `style.css` for global styling and shared components.
  - `script.js` for homepage behavior.
  - `index.html` as the tools hub.
- Blog content is in `blog/` and static resource pages are in `resources/`.

## Build And Test
- Install dependencies: `npm install` (mostly metadata; runtime is static files).
- Local dev server: `npm run dev` (serves on port 3000).
- Alternate local server: `npm start` (serves on port 8000).
- Build step: `npm run build` (no-op by design for static hosting).
- There is no automated test suite configured in this repository.

## Conventions
- Preserve the current implementation style: vanilla HTML/CSS/JavaScript with minimal external dependencies.
- Keep navigation, branding, and footer structure consistent across pages.
- Use root-relative links for shared assets and cross-page navigation (for example, `/style.css`, `/blog/`).
- Keep SEO metadata in sync when adding or renaming pages:
  - Add/update canonical, meta description, and structured data on the page.
  - Update `sitemap.xml` and `robots.txt` when site URLs change.
- If changing deployment behavior or headers/rewrites, update both `netlify.toml` and `vercel.json`.

## Documentation
- Project overview and local/deploy commands: see `README.md`.
- Deployment checklist and domain replacement steps: see `DEPLOYMENT.md`.
- SEO strategy and optimization details: see `SEO-GUIDE.md`.