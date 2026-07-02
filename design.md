# Serendipity Wellness — Design System

Fresh visual identity for the Next.js rebuild. Copy carries over from the old WordPress site;
everything visual starts clean from this spec.

---

## 1. Brand feel

Calm, light, unhurried. A wellness studio, not a spa-brochure cliché — soft colour, generous
space, nothing loud. No dark sections, no heavy shadows, no saturated accents. If in doubt,
remove an element rather than add one.

---

## 2. Logo

Three assets provided, all built around the tree-and-figure mark (branches forming leaves,
trunk forming a standing figure — reads as "growth" and "person" at once):

| File | Use |
|---|---|
| `Serendipity_Wellness_Main_Logo.png` | Primary lockup (mark + wordmark) on light backgrounds — header, footer, most placements |
| `Serendipity_Wellness_Light_Logo.png` | White/near-white version for use over photography or any dark/coloured band |
| `Serendipity_Wellness_Favicon.png` | Mark only, no wordmark — browser tab, app icon, social avatar |

Wordmark is a script "Serendipity" over a clean sans "Wellness" — keep both weights distinct;
never re-set the wordmark in another font. Maintain clear space around the mark equal to the
height of the tree canopy on all sides. Don't recolour the mark outside of primary (`#91b5bc`)
and the light/white variant.

---

## 3. Colour palette

Use softly — this palette is intentionally low-contrast and calm. Primary is an accent, not a
wash. Never introduce a competing hue (no arbitrary greens/oranges/pinks) without an explicit
decision to expand the palette.

| Token | Hex | Role |
|---|---|---|
| `--color-primary` | `#91B5BC` | Icons, links, active states, small accents, logo colour. Sparingly — not large fills. |
| `--color-secondary` | `#CDE7EA` | Soft section tints, card backgrounds, hover states, dividers |
| `--color-copy` | `#4A5B5F` | Body text, headings, all reading text. Never pure black. |
| `--color-background` | `#F7F7F7` | Page background, default surface |
| `--color-surface` | `#FFFFFF` | Cards / panels sitting on the background, where a lift from `#F7F7F7` is needed |

No dark sections or dark mode for v1. Buttons and CTAs use `--color-primary` as fill with white
text, or an outline/ghost style using `--color-primary` on `--color-secondary` or white.

---

## 4. Typography

| Role | Font | Weights |
|---|---|---|
| Headings | **Cormorant Garamond** | SemiBold / Bold |
| Body | **Poppins** | Regular / Medium |

Load both via `next/font/google`. Cormorant Garamond carries all display and section-heading
moments — let it run large and airy (see Layout Idea 2 for the register: big, quiet serif
statements, not decorative). Poppins handles everything functional: paragraphs, nav, labels,
buttons, form fields.

Suggested fluid scale (adjust once in-browser):

```css
--font-size-h1: clamp(2.5rem, 5vw + 1rem, 4.5rem);   /* Cormorant Garamond SemiBold */
--font-size-h2: clamp(2rem, 3vw + 1rem, 3rem);        /* Cormorant Garamond SemiBold */
--font-size-h3: clamp(1.5rem, 2vw + 1rem, 2rem);      /* Cormorant Garamond SemiBold */
--font-size-eyebrow: 0.875rem;                        /* Poppins Medium, letter-spacing 0.08em, uppercase */
--font-size-body: 1.0625rem;                          /* Poppins Regular */
--font-size-small: 0.9375rem;                         /* Poppins Regular */
```

Line height: 1.15–1.2 for headings, 1.6–1.7 for body copy — the low-contrast palette needs the
extra breathing room in text to stay legible.

---

## 5. Layout & spacing

- **Corner radius:** `10px` on every rounded element — buttons, cards, image frames, form
  fields, tags. Consistent across the whole site, no mixing radii.
- **Spacing:** generous. Sections need real air above and below — treat whitespace as a design
  element, not leftover space. When unsure, add more padding rather than less.
- **No dark sections.** Alternate between `--color-background`, `--color-surface`, and
  `--color-secondary` tints for section rhythm — never a dark or saturated full-bleed band.
- **Shadows:** if used at all, very soft and diffuse (low opacity, large blur) — never a hard
  drop shadow. Prefer a subtle border or background-colour shift over a shadow where possible.

### Layout reference notes

Two references were shared — they point in different directions and should be read for
different things:

- **Layout Idea 2 ("Karina Lewis" style)** — this is the closer match in *mood*: minimal,
  airy, editorial serif headlines over clean sans body copy, lots of negative space, soft
  neutral tones, video-style rounded service cards, simple two-column "journey" sections. Lean
  on this for typography pairing, whitespace discipline, and overall restraint.
- **Layout Idea 1 ("Crescent Yoga" style)** — read this for *structure*, not colour (its
  terracotta/earth palette doesn't apply here). Useful patterns: alternating image+text blocks,
  a three-card intro row (Classes / Membership / Schedule style), a full-bleed photo band with
  an offset text panel, and a stacked Retreats/Events section. Rebuild these structural ideas
  in the Serendipity palette and type, not the original colours.

---

## 6. Imagery

Use placeholder photography for now, matched loosely to each section's subject (yoga, massage,
studio space, nature/calm). Swap for real studio photography after the shoot — don't invest
heavily in placeholder curation beyond "reads as the right category." All imagery gets the
`10px` corner radius when framed in a card or block.

---

## 7. Components (starting rules)

- **Buttons:** solid primary (`#91B5BC` fill, white text, `10px` radius) for main CTAs; ghost/
  outline version (primary border + text, transparent or secondary fill) for secondary actions.
- **Cards:** `--color-surface` background, `10px` radius, soft/no shadow, generous internal
  padding.
- **Section tint bands:** use `--color-secondary` (`#CDE7EA`) as a full-width tint to separate
  sections instead of borders or shadows — this is the main rhythm tool in place of a "dark
  section."
- **Forms:** `10px` radius fields, `--color-copy` text, `--color-secondary` or white field
  backgrounds, primary-coloured focus state.

---

## 8. Open items

- Confirm exact button/link hover states once first pages are in-browser.
- Confirm whether an accent/tertiary colour is ever needed (e.g. a warm neutral for imagery
  overlays) — not introduced yet, add only if a real layout need appears.
- Real photography to replace placeholders post-shoot.
