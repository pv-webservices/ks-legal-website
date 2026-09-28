import { chromium, firefox, webkit } from "playwright-core";
import { readdir, writeFile } from "node:fs/promises";
const routes = (await readdir("dist", { recursive: true }))
  .filter((f) => f.endsWith("index.html"))
  .map((f) => "/" + f.replaceAll("\\", "/").replace(/index.html$/, ""));
const report = [];
for (const [name, engine, options] of [
  ["Edge", chromium, { channel: "msedge" }],
  ["Firefox", firefox, {}],
  ["WebKit", webkit, {}],
]) {
  if (process.env.BROWSER && process.env.BROWSER !== name) continue;
  let browser;
  try {
    browser = await engine.launch({ headless: true, timeout: 15000, ...options });
    const context = await browser.newContext({
      viewport: { width: 1440, height: 900 },
      reducedMotion: "reduce",
    });
    const page = await context.newPage();
    page.setDefaultTimeout(10000);
    page.setDefaultNavigationTimeout(30000);
    const errors = [];
    page.on("pageerror", (e) => errors.push(e.message));
    const failures = [];
    for (const route of routes) {
      console.log(name, route);
      const response = await page.goto("http://127.0.0.1:4322" + route, {waitUntil: "domcontentloaded"});
      for (const width of [375, 1440]) {
        await page.setViewportSize({ width, height: 900 });
        const over = await page.evaluate(
          () => document.documentElement.scrollWidth > innerWidth,
        );
        if (over || response.status() !== 200)
          failures.push({
            route,
            width,
            status: response.status(),
            overflow: over,
          });
      }
    }
    await page.goto("http://127.0.0.1:4322/consultation/");
    await page.setViewportSize({ width: 375, height: 812 });
    await page.getByRole("button", { name: "Menu" }).click();
    const menu = await page.locator("#main-nav").isVisible();
    await page.keyboard.press("Escape");
    await page.getByRole("button", { name: "Prepare Email Enquiry" }).click();
    const validation = await page.locator("[aria-invalid=true]").count();
    const result = {
      name,
      version: browser.version(),
      pages: routes.length,
      widths: [375, 1440],
      failures,
      errors,
      menu,
      validation,
    };
    report.push(result);
    await writeFile(`output/playwright/${name.toLowerCase()}.json`, JSON.stringify(result,null,2));
    console.log(JSON.stringify(result));
  } catch (e) {
    report.push({ name, error: e.message });
    console.log(name, e.message);
  } finally {
    await browser?.close();
  }
}
await writeFile(
  "output/playwright/browser-smoke.json",
  JSON.stringify(report, null, 2),
);

