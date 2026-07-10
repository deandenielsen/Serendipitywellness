# Serendipity Wellness — Booking System

Class booking system for [Serendipity Wellness](https://serendipitywellness.co.za), designed to
run on a subdomain of the main site (e.g. `book.serendipitywellness.co.za`) with **zero monthly
running costs**.

## Features

- **Public weekly timetable** — Mon–Sat grid with week-by-week navigation; mobile gets a
  day-by-day list.
- **One-tap booking** — class details, level and description in a booking dialog; optional
  "recurring weekly" bookings.
- **My Classes / Recurring** — students see and cancel their upcoming and weekly bookings.
- **Email confirmations** — optional, via Resend's free tier.
- **Account settings** — name, phone, password.
- **Admin dashboard** — manage the timetable (add/edit/remove classes), see the booked-student
  roster per class (also shown inside the booking dialog for admins).
- **Auth** — email/password registration with email confirmation and password reset, powered by
  Supabase Auth.

## Stack

| Layer     | Choice                                   | Cost                       |
| --------- | ---------------------------------------- | -------------------------- |
| Framework | Next.js 15 (App Router) + TypeScript     | —                          |
| Styling   | Tailwind CSS v4 (Serendipity design system) | —                       |
| Database + Auth | Supabase (free tier)               | R0/month                   |
| Hosting   | Vercel Hobby (or Cloudflare Pages)       | R0/month                   |
| Email     | Resend free tier (optional)              | R0/month (100 emails/day)  |

## Setup

### 1. Supabase

1. Create a free project at [supabase.com](https://supabase.com).
2. In the **SQL Editor**, run [`supabase/schema.sql`](supabase/schema.sql), then
   [`supabase/seed.sql`](supabase/seed.sql) (placeholder timetable — edit freely, or manage it
   later from the Admin page).
3. Copy the **Project URL** and **anon public key** from *Settings → API*.
4. In *Authentication → URL Configuration*, set the **Site URL** to your production URL
   (e.g. `https://book.serendipitywellness.co.za`) and add it to **Redirect URLs**.
5. In *Authentication → Email Templates*, point the confirmation and recovery links at
   `{{ .SiteURL }}/auth/confirm?token_hash={{ .TokenHash }}&type=email` (confirm signup) and
   `{{ .SiteURL }}/auth/confirm?token_hash={{ .TokenHash }}&type=recovery&next=/reset-password`
   (reset password).

### 2. Local development

```bash
cp .env.example .env.local   # fill in the Supabase values
npm install
npm run dev
```

### 3. Make yourself admin

After registering your own account in the app, run this in the Supabase SQL Editor:

```sql
update public.profiles set role = 'admin'
where id = (select id from auth.users where email = 'you@example.com');
```

### 4. Deploy to Vercel + subdomain

1. Push this repo to GitHub and import it at [vercel.com](https://vercel.com) (Hobby plan).
2. Add the environment variables from `.env.example` in the Vercel project settings
   (set `NEXT_PUBLIC_SITE_URL` to `https://book.serendipitywellness.co.za`).
3. In *Vercel → Project → Domains*, add `book.serendipitywellness.co.za`.
4. At your DNS provider, add a CNAME record: `book` → `cname.vercel-dns.com`.

That's it — the subdomain costs nothing on top of the domain you already own.

### 5. Booking confirmation emails (optional)

Create a free [Resend](https://resend.com) account, verify the sending domain, and set
`RESEND_API_KEY` + `EMAIL_FROM`. Without these the app simply skips sending email — bookings
still work. (Supabase sends its own auth emails — confirmation/reset — out of the box.)

## Placeholders to customise

- [`src/lib/pricing.ts`](src/lib/pricing.ts) — pricing tiers and class guide shown on
  `/pricing`.
- [`src/lib/site-config.ts`](src/lib/site-config.ts) — contact email and main-site URL.
- [`supabase/seed.sql`](supabase/seed.sql) — the starter timetable (or edit classes in Admin).
- The CSS wordmark in `src/components/wordmark.tsx` — swap for the approved logo asset.

## Scripts

```bash
npm run dev        # local dev server
npm run build      # production build
npm run lint       # eslint
npm run typecheck  # tsc --noEmit
```
