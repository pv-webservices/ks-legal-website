# KS Legal Consultants

A static, multi-page Astro business website with local photography, self-hosted fonts and minimal browser JavaScript.

## Local development

```sh
npm install
npm run dev
npm run check
npm run build
npm run preview
npm run audit:seo   # after build: titles, descriptions, headings, canonicals, sitemap, links
```

The build output is `dist/`. Upload the **contents** of `dist/` (including the hidden `.htaccess`) to the web root (`public_html` on Hostinger/cPanel). `.htaccess` forces HTTPS and the non-www domain, serves `404.html` for missing URLs and sets caching/compression. On other hosts, configure the same rules.

## Content

- `src/data/site.ts`: practice areas, team, contact details and article cards.
- `src/pages/insights/*.md`: article bodies and metadata.
- `src/data/seo.ts`: pages kept out of search results and the sitemap.
- `src/styles/global.css`: design tokens and responsive styles.
- `src/assets/`: site images, optimised to responsive WebP at build time:
  - `brand/` logo · `people/` founder and partner photos · `firm/` team photos
  - `editorial/` press and column images · `illustrations/` backgrounds and article art
- `public/`: files served as-is (`favicon.svg`, `apple-touch-icon.png`, `images/og-image.jpg` social preview, `.htaccess`).
- `source-files/original-images/`: full-resolution master files. Not deployed.
- `docs/DESIGN.md`: design decisions and content provenance/review notes.
- `docs/GOOGLE-SEARCH-CONSOLE.md`: indexing checklist and URL list.

## Before publication

1. Review the redesign against the supplied homepage reference (see `DESIGN.md`).
2. Confirm `SITE_URL`, biography, 13+ / 200+ claims, partner details, editorial image permissions and legal copy with the firm.
3. Forms post to FormSubmit (`https://formsubmit.co/legal@kslegalconsultants.com`) and return to `/thank-you/`. After deploying, submit one test enquiry and click **Activate** in the email FormSubmit sends to legal@kslegalconsultants.com; nothing is delivered until then. Spam protection: FormSubmit captcha, `_honey` honeypot, keyword blacklist and a 3-second bot timer. Optionally set `PUBLIC_FORM_ENDPOINT` to the random alias FormSubmit provides to hide the address.
4. Confirm the office location link, address, availability and appointment process.
5. Review `docs/VERIFICATION.md` for actual test evidence and remaining browser/device checks.

No production hosting or deployment is configured or performed.

## Reproduce browser checks

Start the built preview with `npm run preview -- --port 4322`, then run `npm run verify` in a second terminal. Chrome must be installed. The script saves its route, responsive, accessibility and interaction findings to `output/playwright/verification.json`.

For extra engines, install the test binaries with `npx playwright-core install firefox webkit`, then run `node scripts/browser-smoke.mjs` (requires Edge for its Edge pass). These are development checks, not production dependencies. Actual iOS/Android devices still need a manual pass.
