# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev       # Start dev server (Vite + HMR)
npm run build     # Production build
npm run lint      # ESLint
npm run preview   # Preview production build
```

There are no tests.

## Architecture

React + Vite + D3 project rendering an interactive horizontal bar chart as an SVG.

**Data flow:** `main.jsx` prepares the dataset (hardcoded country/student data, computes `students_per_million`, assigns per-country colors), then passes it as props to `Barplot.jsx`.

**Rendering approach:** D3 is used only for math (scales, domains) — `scaleLinear` for the x-axis, `scaleBand` for the y-axis. The actual DOM is rendered declaratively via React JSX, not via D3's imperative `.append()` / `.attr()` pattern.

**Label placement:** Bar labels switch between inside (white text) and outside (gray text) based on available bar width — handled in `Barplot.jsx` with a threshold check.

**Styling:** CSS custom properties in `Barplot.css` define the color palette. Typography uses IBM Plex Sans (body) and DM Mono (axis/technical labels) loaded from Google Fonts.
