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

## Behavioral Guidelines

Guidelines to reduce common LLM coding mistakes. These bias toward caution over speed — for trivial tasks, use judgment.

### Think Before Coding

**Don't assume. Don't hide confusion. Surface tradeoffs.**

Before implementing:
- State your assumptions explicitly. If uncertain, ask.
- If multiple interpretations exist, present them - don't pick silently.
- If a simpler approach exists, say so. Push back when warranted.
- If something is unclear, stop. Name what's confusing. Ask.

### Simplicity First

**Minimum code that solves the problem. Nothing speculative.**

- No features beyond what was asked.
- No abstractions for single-use code.
- No "flexibility" or "configurability" that wasn't requested.
- No error handling for impossible scenarios.
- If you write 200 lines and it could be 50, rewrite it.

Ask yourself: "Would a senior engineer say this is overcomplicated?" If yes, simplify.

### Surgical Changes

**Touch only what you must. Clean up only your own mess.**

When editing existing code:
- Don't "improve" adjacent code, comments, or formatting.
- Don't refactor things that aren't broken.
- Match existing style, even if you'd do it differently.
- If you notice unrelated dead code, mention it - don't delete it.

When your changes create orphans:
- Remove imports/variables/functions that YOUR changes made unused.
- Don't remove pre-existing dead code unless asked.

The test: Every changed line should trace directly to the user's request.

### Goal-Driven Execution

**Define success criteria. Loop until verified.**

Transform tasks into verifiable goals:
- "Add validation" → "Write tests for invalid inputs, then make them pass"
- "Fix the bug" → "Write a test that reproduces it, then make it pass"
- "Refactor X" → "Ensure tests pass before and after"

For multi-step tasks, state a brief plan:
```
1. [Step] → verify: [check]
2. [Step] → verify: [check]
3. [Step] → verify: [check]
```

Strong success criteria let you loop independently. Weak criteria ("make it work") require constant clarification.

**These guidelines are working if:** fewer unnecessary changes in diffs, fewer rewrites due to overcomplication, and clarifying questions come before implementation rather than after mistakes.
