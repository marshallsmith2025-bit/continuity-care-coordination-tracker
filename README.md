# Continuity — Care Coordination

A portfolio prototype exploring post-discharge follow-up coordination for
psychiatric case managers and supervisors. All patient data is fictional
demonstration data.

> Portfolio prototype · Fictional demonstration data · Not for clinical use

## Stack

- React 18
- Vite 5
- Tailwind CSS (configured; the interface itself uses the custom design
  system in `src/index.css`)
- lucide-react (icons)

## Local development

```bash
npm install
npm run dev
```

Then open the local URL Vite prints (typically `http://localhost:5173`).

## Production build

```bash
npm run build
npm run preview   # optional: serve the production build locally
```

The build output is written to `dist/`.

## Project structure

```
index.html          Vite entry HTML (loads Google Fonts, mounts #root)
src/main.jsx         React entry point
src/App.jsx           Main application component and UI
src/data.js           Fictional dataset and lookup tables
src/index.css         Design tokens and component styles (+ Tailwind directives)
tailwind.config.js    Tailwind content paths
postcss.config.js     PostCSS pipeline (Tailwind + Autoprefixer)
vite.config.js         Vite + React plugin config
vercel.json            Explicit static build settings for Vercel
```

## Deployment

See the deployment walkthrough provided alongside this project for
step-by-step GitHub + Vercel instructions.
