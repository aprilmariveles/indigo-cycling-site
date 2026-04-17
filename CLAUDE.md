# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Static website for **Indigo Cycling Chicago** (indigocycling.cc). Pages are hosted on GitHub Pages and embedded into Squarespace via iframes — each HTML file is a self-contained page designed to render inside an iframe, not a full standalone site.

## Deployment

Push to `main` → GitHub Pages auto-deploys to `https://aprilmariveles.github.io/indigo-cycling-site/` within ~2 minutes. There is no build step, bundler, or CI pipeline — files are served as-is.

## Architecture

- **No build tools, no framework.** Plain HTML/CSS/JS. No package.json, no npm.
- Each `.html` file is an independent page (no shared layout or templating).
- `css/styles.css` — single shared stylesheet linked by all pages.
- `js/main.js` — single shared script loaded by all pages.
- `assets/images/` and `assets/fonts/` — static assets (currently empty).
- Pages are embedded in Squarespace Code Blocks as iframes, so avoid navigation elements, headers/footers that duplicate the Squarespace shell, or full-page layouts that assume standalone viewing.

## Local Development

Open any `.html` file directly in a browser, or use a local server:

```
python3 -m http.server 8000
```

## Key Constraints

- **Iframe embedding**: pages must work inside an iframe on Squarespace. Keep page content self-contained. Avoid things that break in iframes (e.g., `target="_top"` links unless intentional, fixed positioning relative to viewport).
- **No build pipeline**: all paths are relative and must resolve without any compilation or bundling step.
- **Single CSS/JS**: all pages share one stylesheet and one script file. Scope styles carefully to avoid cross-page conflicts.
