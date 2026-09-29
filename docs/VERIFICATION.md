# Verification — 29 September 2026 (pre-deployment QA, SEO and forms)

- `npm run check`: 0 errors. `npm run build`: 43 pages (38 indexable + 404, thank-you, 3 legal pages set to noindex).
- `npm run audit:seo`: no issues — unique titles (≤65 chars) and descriptions (70–170 chars), one h1 per page, no skipped heading levels, alt on every image, canonical on every indexable page, valid JSON-LD, sitemap = indexable pages, no broken internal links.
- `npm run verify` (Chrome): 42 pages, 0 horizontal overflow at 320–1920px, 0 axe WCAG AA violations, 0 broken links, 0 page errors. Form: empty submit flags 5 fields; invalid email/phone rejected; valid submission POSTs to `/api/contact` and lands on `/thank-you/` (intercepted in test, nothing sent); WhatsApp opens.
- `npm test`: 10 tests for the enquiry function (sender/reply-to, validation, consent, honeypot, bot timer, origin, header injection, rate limit, missing config, SMTP failure, no-JS redirect).
- Not yet verified: live SMTP delivery on Netlify (needs the SMTP environment variables).

# Verification — 29 September 2026 (redesign + expertise/services pages)

## Build and architecture

- `npm run check`: 0 errors, 0 warnings, 0 hints.
- `npm run build`: passed; 41 content pages plus custom 404, robots.txt and sitemap.
- Static Astro output with normal links; no React, account system or application shell.

## Automated browser checks (`npm run verify`, Chrome)

- All 41 content pages at 320, 375, 480, 768, 1024, 1280, 1440 and 1920px: no horizontal overflow.
- Axe WCAG 2 A/AA and 2.1 AA: 0 violations on all 41 pages after reveals complete.
- No broken internal links or image URLs; no page errors.
- Bar Council disclaimer shows on first visit and closes on "I Agree".
- Consultation form: empty submit flags 5 required fields and focuses the name field; invalid email/phone rejected; valid synthetic details prepare a correctly encoded email draft and a WhatsApp message. Nothing was sent.
- Mobile drawer opens, closes with Escape; the Our Expertise group expands and navigates to Divorce.
- Desktop Our Services dropdown opens by button and navigates to RERA Matters.
- Skip link receives focus first; with reduced motion, reveal content stays fully visible.

## Visual review

Desktop (1440px) and mobile (375/390px) screenshots of every homepage section and five inner pages were reviewed. Fixed during review: topbar overflow on mobile, required-field asterisk wrapping, cramped form buttons in the three-column contact layout, parallax gaps on background images, logo white box on navy, and two gold-on-ivory contrast failures.

## Not covered

- Real iOS Safari / Android Chrome devices and screen readers.
- Firefox/WebKit/Edge passes were not re-run after the redesign (`node scripts/browser-smoke.mjs`).
- Direct form delivery (no provider configured) and production hosting.
