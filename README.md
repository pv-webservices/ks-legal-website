# KS Legal Consultants

A static, multi-page Astro business website with local photography, self-hosted fonts and minimal browser JavaScript.

## Local development

```sh
npm install
npm run dev
npm run check
npm run build
npm run preview
```

The build output is `dist/`. Configure your static host to serve directory index files and use `404.html` for missing URLs. No SPA fallback is needed.

## Content

- `src/data/site.ts`: practice areas, team, contact details and article cards.
- `src/pages/insights/*.md`: article bodies and metadata.
- `src/styles/global.css`: design tokens and responsive styles.
- `src/assets/`: original supplied image copies, optimised to WebP at build time.
- `DESIGN.md`: design decisions and content provenance/review notes.

## Before publication

1. Review the redesign against the supplied homepage reference (see `DESIGN.md`).
2. Confirm `SITE_URL`, biography, 13+ / 200+ claims, partner details, editorial image permissions and legal copy with the firm.
3. Forms currently prepare an email draft or WhatsApp message and never report a submission as sent. For direct delivery, configure `PUBLIC_FORM_ENDPOINT`, test success/failure delivery with the selected provider, set spam/rate controls and update the privacy policy.
4. Confirm the office location link, address, availability and appointment process.
5. Review `VERIFICATION.md` for actual test evidence and remaining browser/device checks.

No production hosting or deployment is configured or performed.

## Reproduce browser checks

Start the built preview with `npm run preview -- --port 4322`, then run `npm run verify` in a second terminal. Chrome must be installed. The script saves its route, responsive, accessibility and interaction findings to `output/playwright/verification.json`.

For extra engines, install the test binaries with `npx playwright-core install firefox webkit`, then run `node scripts/browser-smoke.mjs` (requires Edge for its Edge pass). These are development checks, not production dependencies. Actual iOS/Android devices still need a manual pass.
