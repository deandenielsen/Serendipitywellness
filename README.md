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

## Contact form (Resend)

The `/contact/` form emails enquiries to info@serendipitywellness.co.za through [Resend](https://resend.com).
See `.env.example` for the variables. To switch it on:

1. Create a Resend account and add the domain `serendipitywellness.co.za` under **Domains**, then add the
   DNS records Resend shows you at your domain host. Wait for it to show **Verified**.
2. Create an API key under **API Keys** (sending access is enough).
3. In Vercel → Project → Settings → Environment Variables, add `RESEND_API_KEY` for Production and
   Preview, then redeploy.

Until the key is set, the form shows visitors the phone, WhatsApp and email details instead.

## Project docs

- `PROJECT.md` — product brief, tech stack, and long-term platform scope.
- `design.md` — brand identity, colour palette, typography, and layout system.
- `CONTENT/home.md` — approved homepage copy (source of truth for wording).

## Notes

- The homepage mirrors the live WordPress site (serendipitywellness.co.za) like for like:
  layout, copy, photography, fonts (Public Sans, Playball, Urbanist) and motion. The motion is
  re-implemented with Framer Motion (`src/components/motion/`). No theme code is reused.
- Photography and the web logos in `public/images/` were taken from the live site.
- Nav links keep the live site's URL paths (`/yoga/`, `/contact/` …) so URLs carry over once those
  pages are rebuilt. They are not prefetched until the pages exist.
