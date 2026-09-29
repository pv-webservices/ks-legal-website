# Google Search Console — indexing guide

Canonical domain: **https://kslegalconsultants.com/** (HTTPS, no `www`, trailing slash on every URL).
The site has **38 indexable URLs**. All of them are in `https://kslegalconsultants.com/sitemap-index.xml`.

## 1. Before you start (after deployment)

- [ ] `https://kslegalconsultants.com/` loads over HTTPS.
- [ ] `http://…` and `https://www.kslegalconsultants.com/` redirect (301) to `https://kslegalconsultants.com/`.
- [ ] `https://kslegalconsultants.com/robots.txt` and `/sitemap-index.xml` open in the browser.
- [ ] A made-up URL such as `/abc/` shows the custom 404 page.
- [ ] Send one test enquiry and click **Activate** in the FormSubmit email to legal@kslegalconsultants.com.

## 2. Add and verify the property

1. Go to https://search.google.com/search-console and click **Add property**.
2. Choose **Domain** and enter `kslegalconsultants.com`. This covers http/https and www/non-www.
3. Copy the `google-site-verification=…` TXT record and add it in the domain's DNS (for Hostinger: hPanel → Domains → DNS / Nameservers → add TXT, name `@`).
4. Wait a few minutes, then click **Verify**. DNS can take up to 24–48 hours.

If DNS access is not available, use a **URL prefix** property (`https://kslegalconsultants.com/`) with the HTML-tag method instead. Ask the developer to add the meta tag to `src/layouts/Layout.astro`.

## 3. Submit the sitemap (one time)

Search Console → **Sitemaps** → enter `sitemap-index.xml` → **Submit**. Status should show *Success* with 38 discovered URLs.

This is the main way Google finds all pages. You do **not** have to request each URL manually.

## 4. Request indexing for priority pages

Use **URL Inspection** (top search bar) → paste the URL → **Request indexing**. Google limits this to roughly 10–12 requests per day, so spread it over 3–4 days:

| Day | URLs |
| --- | --- |
| 1 | Home, About, Founder, Contact, Consultation, Expertise, Services, Practice Areas, Team, Insights |
| 2 | 8 expertise pages |
| 3 | 8 service pages |
| 4 | 8 practice-area pages, 3 articles, Success Stories |

Manual requests only speed things up; the sitemap already covers every page. Re-request a URL only after you change its content substantially.

## 5. Do NOT submit these (intentionally `noindex`)

`/thank-you/`, `/404/`, `/privacy-policy/`, `/terms/`, `/disclaimer/`. These pages remain reachable and crawlable but are kept out of search results. If Search Console lists them under "Excluded by 'noindex' tag", that is expected.

## 6. All 38 URLs to index

### Core pages (10)
```
https://kslegalconsultants.com/
https://kslegalconsultants.com/about/
https://kslegalconsultants.com/founder/
https://kslegalconsultants.com/team/
https://kslegalconsultants.com/contact/
https://kslegalconsultants.com/consultation/
https://kslegalconsultants.com/expertise/
https://kslegalconsultants.com/services/
https://kslegalconsultants.com/practice-areas/
https://kslegalconsultants.com/insights/
```

### Expertise (8)
```
https://kslegalconsultants.com/expertise/divorce-lawyer/
https://kslegalconsultants.com/expertise/domestic-violence-lawyer/
https://kslegalconsultants.com/expertise/matrimonial-lawyer/
https://kslegalconsultants.com/expertise/family-dispute-lawyer/
https://kslegalconsultants.com/expertise/bail-lawyer/
https://kslegalconsultants.com/expertise/cheque-bounce-lawyer/
https://kslegalconsultants.com/expertise/civil-lawyer/
https://kslegalconsultants.com/expertise/criminal-lawyer/
```

### Services (8)
```
https://kslegalconsultants.com/services/child-custody-lawyer/
https://kslegalconsultants.com/services/legal-documentation/
https://kslegalconsultants.com/services/property-lawyer/
https://kslegalconsultants.com/services/high-court-matters/
https://kslegalconsultants.com/services/rera-matters/
https://kslegalconsultants.com/services/consumer-disputes/
https://kslegalconsultants.com/services/cyber-crime-lawyer/
https://kslegalconsultants.com/services/court-marriage-registration/
```

### Practice areas (8)
```
https://kslegalconsultants.com/practice-areas/civil-litigation/
https://kslegalconsultants.com/practice-areas/criminal-law/
https://kslegalconsultants.com/practice-areas/family-matrimonial/
https://kslegalconsultants.com/practice-areas/property-real-estate/
https://kslegalconsultants.com/practice-areas/consumer-protection/
https://kslegalconsultants.com/practice-areas/corporate-advisory/
https://kslegalconsultants.com/practice-areas/documentation-agreements/
https://kslegalconsultants.com/practice-areas/women-senior-citizen-support/
```

### Insights and results (4)
```
https://kslegalconsultants.com/insights/property-due-diligence/
https://kslegalconsultants.com/insights/legal-aid-for-women/
https://kslegalconsultants.com/insights/dispute-resolution/
https://kslegalconsultants.com/success-stories/
```

## 7. After submission (weeks 1–4)

- **Indexing → Pages**: indexed count should climb towards 38. Open any "Not indexed" reason and fix or re-request.
- **Enhancements**: Breadcrumbs, FAQ and Organization structured data should appear without errors. You can test any page at https://search.google.com/test/rich-results.
- **Core Web Vitals / Page Experience**: check once enough traffic exists. Use PageSpeed Insights (https://pagespeed.web.dev) for per-page mobile checks.
- **Links**: confirm internal links are discovered.
- Also create or claim the **Google Business Profile** for the Hydernagar office and link it to the site; this matters most for local "lawyer in Hyderabad" searches.
- Optional: import the property into **Bing Webmaster Tools** (it can import directly from Search Console).

When pages are added or removed, rebuild and redeploy. The sitemap regenerates automatically. Resubmitting is optional.
