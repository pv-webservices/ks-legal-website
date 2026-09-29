# KS Legal Consultants — design and implementation

## Stack
Astro static generation, TypeScript content data, Markdown articles, plain CSS, one small vanilla script (`src/scripts/site.ts`). Normal page navigation; no accounts, no application shell.

## Routes
Home; about; founder; practice-areas with eight detail pages; expertise (8 pages: divorce, domestic violence, matrimonial, family disputes, bail, cheque bounce, civil, criminal); services (8 pages: child custody, legal documentation, property, High Court matters, RERA, consumer disputes, cyber crime, court marriage); team; success-stories; insights with three Markdown articles; contact; consultation; privacy-policy; terms; disclaimer; custom 404.

## Design contract
Follows the supplied homepage reference (ivory editorial base, navy contrast bands, antique-gold accents, Cormorant Garamond headings, DM Sans body, Great Vibes signature). Tokens live at the top of `src/styles/base.css`. Gold text on light backgrounds uses `--gold-deep` for WCAG AA contrast.

Stylesheets (import order matters, see `global.css`): `base.css` (tokens, type, buttons, reveal system), `layout.css` (topbar, header, dropdowns' host nav, drawer, footer, floating actions, dialog), `hero.css`, `sections.css` (carousel, insights, FAQ, CTA, contact), `home.css` (founder, practice, why, process, success + homepage responsive), `pages.css` (inner pages, forms), `services.css` (header dropdowns, expertise/services cards and detail pages, homepage tabs).

Expertise and Services content lives in `src/data/expertise.ts` and `src/data/services.ts` (typed by `src/data/types.ts`) and renders through `src/components/ServicePage.astro`. Each page has an intro, six areas of assistance, the 4-step approach, a documents checklist, related links, FAQs with FAQPage schema and a pre-filled consultation form. Content is original, adapted to Telangana/A.P. practice, and needs review by the firm.

## Homepage structure
Hero (founder only, slow zoom) → practice-area marquee → founder → practice areas → why choose us → sticky 4-step process → tabbed Expertise & Services → success story → recognition/publications carousel → insights → FAQ (with FAQPage schema) → CTA band → contact (details, Google Map embed, form). The reference site (advocatemanojkumarsingh.com) contributed the process, FAQ, WhatsApp/call quick actions and the Bar Council declaration.

## Motion
- Hero: single founder portrait with a slow Ken Burns zoom and name plaque.
- Header: Our Expertise / Our Services dropdowns (hover, focus or click); grouped accordions in the mobile drawer.
- Scroll: reveal animations (up/left/right/zoom) via `data-reveal`, parallax backgrounds via `data-parallax`, scroll-linked zoom via `data-scroll-zoom`, sticky process column with a progress line, counters via `data-count`.
- Cards: lift, gold top bar, icon flip; `data-touch` adds the same state on tap.
- Buttons: slow gold hue drift plus a colour fill that expands from the pointer position (no shine sweep).
- Reveal animations use the individual `translate`/`scale` properties so hover `transform`s still compose.
- `prefers-reduced-motion` disables autoplay, parallax, marquee and reveals; content is never hidden without JavaScript.

## Images
Supplied photography in `src/assets/` (founder, partner, team, editorial pages, newspaper column, logo). Derived crops: `team-hero.webp`, `logo-transparent.png`. Seven generated images in use (Nano Banana 2, 1k, WebP; eight generations in total, as the consultation scene was regenerated so the advocate's face is visible) in `src/assets/gen/`: three insight covers, CTA Lady Justice, hero pillars texture, law library background, consultation scene. Astro re-encodes all images to responsive WebP at build time.

## Enquiries
The form prepares an email draft or a WhatsApp message (wa.me/917660000787); nothing is submitted automatically. Set `PUBLIC_FORM_ENDPOINT` to a trusted form service for direct delivery.

## Content review before launch
- Confirm 13+ years / 200+ cases (the editorial pages mention both 100+ and 200+), awards and biography currency.
- Confirm Mirza Rasool Baig's bio line (drafted generically) and the FAQ answers about courts and legal aid.
- Confirm 7660000787 is on WhatsApp.
- Confirm the canonical domain and reproduction permission for the Femhonour pages and newspaper column.
- Bar Council of India disclaimer appears on first visit and is remembered in the visitor's browser.
