# Leo Picturez — Next.js site (v2, Pastel Glass)

Luxury fashion & wedding photography site. Next.js 15 (App Router) + React 19, TypeScript, plain CSS. No UI framework, no Tailwind — small, fast and easy to edit.

## Quick start

```bash
npm install
cp .env.example .env.local     # optional: email + showreel settings
npm run dev                    # http://localhost:3000
npm run build && npm start     # production
```

Requires Node 18.18+ (Node 20/22 recommended).

## Where to edit

| What | File |
|---|---|
| All text, contact details, services, testimonials, image list | `data/site.ts` |
| Colours, glass, spacing, animations | `app/globals.css` (tokens at the top in `:root`) |
| SEO title, description, Open Graph, schema.org | `app/layout.tsx` |
| Section layout / markup | `components/*.tsx` (one file per section) |
| Enquiry email handling | `app/api/enquiry/route.ts` |

## Adding real photos (fast loading)

1. Drop the original exports into `public/images/raw/` (any size — 20 MB camera JPEGs are fine).
2. Run `npm run optimize`.
   - Auto-rotates, strips EXIF/GPS, resizes to max 2400 px, mozjpeg-compresses (typically 85–95% smaller).
   - Writes a 16 px blurred preview of each photo into `data/blur.json` (shown instantly while the photo loads).
3. In `data/site.ts`, replace the Unsplash URLs with the printed paths, e.g. `'/images/optimized/quiet-vows.jpg'`, and set `w`/`h`.
4. Remove the `images.unsplash.com` entry from `next.config.mjs` once no Unsplash images remain.

At request time Next.js `<Image>` then serves **AVIF** (or WebP) at the exact width each device needs, lazy-loads everything below the fold, and caches the result for 30 days. The hero is the only `priority` image (best LCP).

## Architecture

```
app/
  layout.tsx          fonts (self-hosted woff2), metadata, JSON-LD
  page.tsx            composes sections
  globals.css         design system: pastel tokens, .glass primitives, sections
  api/enquiry/        POST handler: validation, honeypot, rate limit, Resend email
  sitemap.ts robots.ts
components/
  Server (zero JS):  Hero, Intro, About, Stats, Categories, Services,
                     Experience, Signature, FinalCta, Footer, Ambient
  Client islands:    Header (menu), Portfolio (filter + lightbox), Showreel (modal),
                     Testimonials (slider), Contact (form), Effects (reveals,
                     counters, parallax, cursor — one shared observer)
data/site.ts         content
lib/validate.ts      shared form rules (client + server)
lib/blur.ts          blur placeholders
scripts/optimize-images.mjs   sharp compression pipeline
```

Homepage first-load JS ≈ 114 KB (gzipped, framework included). The page is statically pre-rendered.

## Enquiry form

- Without `RESEND_API_KEY`, enquiries are validated and logged to the server console (nothing is emailed).
- To email them: create a free [Resend](https://resend.com) account, verify your domain, and set `RESEND_API_KEY`, `ENQUIRY_TO_EMAIL`, `ENQUIRY_FROM_EMAIL` in `.env.local` / your host's env settings.
- Includes a honeypot field and a basic per-IP rate limit (5 per 10 minutes, per server instance).

## Showreel

Set `NEXT_PUBLIC_SHOWREEL_URL` to a YouTube/Vimeo **embed** URL (e.g. `https://www.youtube.com/embed/VIDEO_ID?autoplay=1`). The iframe only loads when Play is pressed.

## Deploy

- **Vercel** (simplest): import the repo, add env vars, deploy. Image optimisation works out of the box.
- **Any Node host / VPS**: `npm run build && npm start` (keep `sharp` installed — it powers image optimisation).
- Static hosting (`output: 'export'`) is *not* recommended: it disables on-the-fly AVIF/WebP resizing and the enquiry API.

## Before launch checklist

- [ ] Replace every Unsplash placeholder with real Leo Picturez work (`data/site.ts`, OG image in `app/layout.tsx`)
- [ ] Replace the SAMPLE testimonials with real client quotes
- [ ] Set real Facebook / YouTube links in `data/site.ts`
- [ ] Set `NEXT_PUBLIC_SITE_URL` and email env vars
