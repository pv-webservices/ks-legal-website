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
