# Serendipity Wellness

Homepage for Serendipity Wellness — a boutique yoga and massage studio in Edgemead, Cape Town.
This is the first milestone of a larger wellness platform (see `PROJECT.md`); only the homepage
is built so far, but the architecture is meant to carry forward.

## Stack

Next.js 15 (App Router) · React 19 · TypeScript · Tailwind CSS v4 · Framer Motion · Lucide React

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Project docs

- `PROJECT.md` — product brief, tech stack, and long-term platform scope.
- `design.md` — brand identity, colour palette, typography, and layout system.
- `CONTENT/home.md` — approved homepage copy (source of truth for wording).

## Notes

- The header/footer wordmark is a temporary CSS text lockup. Swap in the real logo assets
  (`Serendipity_Wellness_Main_Logo.png`, `_Light_Logo.png`, `_Favicon.png`) in `public/` and
  update `src/components/wordmark.tsx` once they're available.
- Section imagery uses placeholder blocks (`src/components/image-placeholder.tsx`) pending real
  studio photography per `design.md` §6.
