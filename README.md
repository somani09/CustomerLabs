# Project Template (Next.js + Tailwind + TypeScript)

A lightweight, opinionated starter template for building portfolio or project showcase sites with Next.js (App Router), TypeScript and Tailwind CSS. It's set up to be easy to copy/clone when starting a new project and includes a small sidebar, theme support, and sensible utilities.

## Core technologies

- Next.js 15 (App Router)
- React 19
- TypeScript
- Tailwind CSS 4
- next-themes (theme switching)
- Turbopack for dev server (fast HMR)

## Why this template

- Minimal, focused layout for portfolios and project pages
- Prewired components (sidebar, config, utilities)
- Small, extendable design system using Tailwind and utility helpers (`cn`, `shadowDepthPrimary`)

## Quick start

### Requirements

- Node.js (recommend latest LTS, e.g. 18/20+)
- npm (or yarn / pnpm)

Install dependencies and start the dev server:

```powershell
npm install
npm run dev
```

Open http://localhost:3000 in your browser.

## Available scripts

- `npm run dev` — start Next.js dev server (uses Turbopack)
- `npm run build` — build for production
- `npm run start` — start the production server (after build)
- `npm run lint` — run Next.js/Eslint checks

## Project structure (important files)

- `app/` — Next.js App Router entries
  - `app/layout.tsx` — root layout (loads fonts and `next-themes` provider)
  - `app/page.tsx` — home / main content (uses `pageConfig` for title & description)
  - `app/config.ts` — small config object (`pageConfig`) you can edit per project
  - `app/globals.css` — global styles and Tailwind base
- `components/sidebar.tsx` — left sidebar with profile, links and avatar
- `public/` — static assets (e.g. `avatar.jpeg`, icons, images)
- `app/utils.ts` — helper utilities (`cn`, `shadowDepthPrimary`) using `clsx` + `tailwind-merge`

## How to customize

- Change the page title & description: edit `app/config.ts` (`pageConfig`).
- Replace avatar and images: put assets in `public/` (e.g. `public/avatar.jpeg`).
- Edit sidebar text & links: `components/sidebar.tsx`.
- Tailwind config & tokens are already wired (see `globals.css`) — update styles there.
- Fonts: `app/layout.tsx` uses `Plus_Jakarta_Sans` via `next/font/google`. Replace if needed.

## Theme and UI

- The project uses `next-themes` and applies themes via CSS classes. The default is `light` and system detection is disabled in the layout — adjust in `app/layout.tsx`.

## Dependencies of note

- `clsx`, `tailwind-merge` — class name helpers
- `react-icons` — icon set used in the sidebar
- `next-themes` — theme switching

## Deployment

This project deploys easily to Vercel (recommended) or any Node-compatible host. With Vercel, the App Route and Next features will work out of the box.

To build and run locally in production mode:

```powershell
npm run build
npm run start
```

## Tips & recommended edits when you spin a new project

- Update metadata: `app/layout.tsx` -> `export const metadata` for SEO and social cards.
- Add a LICENSE file and update package.json `name`/`version`.
- Replace placeholder text in `app/config.ts` and `components/sidebar.tsx` with your real bio, links and project data.
- Add analytics/meta tags or Open Graph images as needed.

## Contributing

This is a personal template — feel free to copy or improve it for your own use. If you adapt it and want to share improvements, consider opening a PR on your fork or creating your own starter.

## Useful links

- Next.js docs: https://nextjs.org/docs
- Tailwind CSS docs: https://tailwindcss.com/docs
- next-themes: https://github.com/pacocoursey/next-themes
