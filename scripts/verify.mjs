import { chromium } from "playwright-core";
import AxeBuilder from "@axe-core/playwright";
import { readdir, writeFile, mkdir } from "node:fs/promises";
const base = "http://127.0.0.1:4322";
const files = await readdir("dist", { recursive: true });
const routes = files
  .filter((f) => f.endsWith("index.html"))
  .map((f) => "/" + f.replaceAll("\\", "/").replace(/index.html$/, ""));
const browser = await chromium.launch({ channel: "chrome", headless: true });
const context = await browser.newContext({
  viewport: { width: 1440, height: 1000 },
});
// Disclaimer acceptance is tested separately below; accept it for the crawl.
await context.addInitScript(() => {
  if (!sessionStorage.getItem("show-bci")) localStorage.setItem("ks-bci-accepted", "1");
});
const page = await context.newPage();
const errors = [];
page.on("pageerror", (error) => errors.push(error.message));
const report = { routes: [], errors, interactions: {}, links: [] };
const urls = new Set();
for (const route of routes) {
  const response = await page.goto(base + route);
  await page.evaluate(() => document.fonts.ready);
  const checks = await page.evaluate(() => ({
    h1: document.querySelectorAll("h1").length,
    title: document.title,
    description: document.querySelector("meta[name=description]")?.content,
    canonical: document.querySelector("link[rel=canonical]")?.href,
    images: [...document.images].map((i) => i.src),
    links: [...document.querySelectorAll("a[href]")].map((a) => a.href),
  }));
  checks.images
    .concat(checks.links)
    .filter((u) => u.startsWith(locationOrigin(base)))
    .forEach((u) => urls.add(u.split("#")[0]));
  const overflow = [];
  for (const width of [320, 375, 480, 768, 1024, 1280, 1440, 1920]) {
    await page.setViewportSize({ width, height: 1000 });
    const size = await page.evaluate(
      () => document.documentElement.scrollWidth,
    );
    if (size > width) overflow.push({ width, scrollWidth: size });
  }
  await page.setViewportSize({ width: 1440, height: 1000 });
  for (const reveal of await page.locator("[data-reveal]").all()) {
    await reveal.scrollIntoViewIfNeeded();
    await page.waitForTimeout(250);
  }
  if (await page.locator("[data-reveal]").count()) {
    await page.waitForTimeout(1200);
  }
  const axe = await new AxeBuilder({ page })
    .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
    .analyze();
  report.routes.push({
    route,
    status: response.status(),
    h1: checks.h1,
    title: checks.title,
    description: !!checks.description,
    canonical: checks.canonical,
    overflow,
    violations: axe.violations.map((v) => ({
      id: v.id,
      nodes: v.nodes.map((n) => ({
        target: n.target,
        summary: n.failureSummary,
      })),
    })),
  });
  console.log(
    route,
    report.routes.at(-1).violations.length ? "ACCESSIBILITY ISSUES" : "OK",
    overflow.length ? "OVERFLOW" : "",
  );
}
for (const url of urls) {
  const response = await page.request.get(url);
  if (!response.ok()) report.links.push({ url, status: response.status() });
}
await page.goto(base + "/");
await page.evaluate(() => {
  localStorage.removeItem("ks-bci-accepted");
  sessionStorage.setItem("show-bci", "1");
});
await page.reload();
report.interactions.disclaimerShown = await page.locator(".bci-dialog").isVisible();
await page.getByRole("button", { name: "I Agree" }).click();
report.interactions.disclaimerAccepted = !(await page.locator(".bci-dialog").isVisible());
await page.evaluate(() => sessionStorage.removeItem("show-bci"));
// Intercept the enquiry endpoint so no real enquiry is ever delivered during tests.
let formPost = null;
await page.route("**/api/contact", (route) => {
  formPost = { url: route.request().url(), body: route.request().postData() };
  return route.fulfill({ status: 200, contentType: "application/json", body: JSON.stringify({ ok: true }) });
});
await page.goto(base + "/consultation/");
await page.getByRole("button", { name: "Request Consultation" }).click();
report.interactions.emptyForm = await page.evaluate(() => ({
  errors: document.querySelectorAll("[aria-invalid=true]").length,
  focused: document.activeElement.name,
  status: document.querySelector(".form-status").textContent,
}));
await page.locator("[name=name]").fill("Website Test");
await page.locator("[name=email]").fill("invalid");
await page.locator("[name=phone]").fill("123");
await page
  .locator("[name=message]")
  .fill("Synthetic enquiry used only for local validation.");
await page.locator("[name=consent]").check();
await page.getByRole("button", { name: "Request Consultation" }).click();
report.interactions.invalidFields = await page
  .locator("[aria-invalid=true]")
  .evaluateAll((els) => els.map((el) => el.name));
await page.locator("[name=email]").fill("website-test@example.com");
await page.locator("[name=phone]").fill("9000000000");
const popupPromise = context.waitForEvent("page", { timeout: 5000 }).catch(() => null);
await page.getByRole("button", { name: "Send via WhatsApp" }).click();
const popup = await popupPromise;
report.interactions.whatsappDraft = { opened: popup ? popup.url().split("?")[0] : null };
await popup?.close();
await page.waitForTimeout(3000); // the form rejects submissions made within 3s of page load
await page.getByRole("button", { name: "Request Consultation" }).click();
await page.waitForURL("**/thank-you/", { timeout: 5000 }).catch(() => null);
report.interactions.formSubmit = {
  endpoint: formPost?.url ?? null,
  includesMessage: Boolean(formPost?.body?.includes("Synthetic")),
  landedOnThankYou: page.url().endsWith("/thank-you/"),
};
await page.goto(base + "/consultation/");
await page.setViewportSize({ width: 375, height: 812 });
await page.getByRole("button", { name: "Open menu" }).click();
await page.waitForTimeout(500);
report.interactions.menuOpen = await page.locator("#mobile-nav").isVisible();
await page.keyboard.press("Escape");
await page.waitForTimeout(500);
report.interactions.menuEscapeClosed = !(await page
  .locator("#mobile-nav")
  .isVisible());
await page.getByRole("button", { name: "Open menu" }).click();
await page.waitForTimeout(600);
const mobileNav = page.getByRole("navigation", { name: "Mobile navigation" });
await mobileNav.locator("summary", { hasText: "Our Expertise" }).click();
await mobileNav.getByRole("link", { name: "Divorce", exact: true }).click();
await page.waitForURL("**/expertise/divorce-lawyer/");
report.interactions.mobileNavigation = page.url().endsWith("/expertise/divorce-lawyer/");
await page.setViewportSize({ width: 1440, height: 900 });
await page.goto(base + "/");
await page.getByRole("button", { name: "Show Our Services links" }).click();
await page.locator("#menu-1").getByRole("link", { name: "RERA Matters" }).click();
await page.waitForURL("**/services/rera-matters/");
report.interactions.desktopDropdown = page.url().endsWith("/services/rera-matters/");
await page.setViewportSize({ width: 375, height: 812 });
await page.goto(base + "/");
await page.keyboard.press("Tab");
report.interactions.skipLink = await page.evaluate(
  () => document.activeElement.textContent,
);
await page.emulateMedia({ reducedMotion: "reduce" });
await page.reload();
report.interactions.reducedMotion = await page
  .locator(".practice-section [data-reveal]").first()
  .evaluate((el) => getComputedStyle(el).opacity);
await mkdir("output/playwright", { recursive: true });
await page.setViewportSize({ width: 1440, height: 1000 });
await page.screenshot({ path: "output/playwright/home-desktop.png" });
await page.goto(base + "/team/");
await page.locator(".founder-section").scrollIntoViewIfNeeded();
await page.screenshot({ path: "output/playwright/founder-section.png" });
await page.goto(base + "/");
await page.setViewportSize({ width: 390, height: 844 });
await page.evaluate(() => scrollTo(0, 0));
await page.screenshot({ path: "output/playwright/home-mobile.png" });
await page.emulateMedia({ reducedMotion: "no-preference" });
await page.reload();
await page.waitForTimeout(1500);
await page.screenshot({ path: "output/playwright/home-mobile.png" });
for (const sel of [".practice-section", ".why-section", ".process-section", ".media-section", ".faq-section", ".cta-band", ".contact-section", ".site-footer"]) {
  await page.locator(sel).first().scrollIntoViewIfNeeded();
  await page.waitForTimeout(1400);
  await page.screenshot({ path: `output/playwright/m-${sel.slice(1)}.png` });
}
await writeFile(
  "output/playwright/verification.json",
  JSON.stringify(report, null, 2),
);
await browser.close();
console.log(
  JSON.stringify(
    {
      pages: report.routes.length,
      overflow: report.routes.filter((r) => r.overflow.length).length,
      axeViolations: report.routes.filter((r) => r.violations.length).length,
      brokenLinks: report.links.length,
      errors,
      interactions: report.interactions,
    },
    null,
    2,
  ),
);
function locationOrigin(url) {
  return new URL(url).origin;
}
