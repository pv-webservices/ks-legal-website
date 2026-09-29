// Static SEO audit of the built site. Run `npm run build` first, then `npm run audit:seo`.
import { readdirSync, readFileSync, existsSync, statSync } from "node:fs";
import { join, relative, sep } from "node:path";

const DIST = "dist";
const TITLE_MAX = 65;
const DESC_MIN = 70;
const DESC_MAX = 170;

const walk = (dir) =>
  readdirSync(dir).flatMap((name) => {
    const path = join(dir, name);
    return statSync(path).isDirectory() ? walk(path) : [path];
  });

const toUrlPath = (file) => {
  const rel = relative(DIST, file).split(sep).join("/");
  if (rel === "404.html") return "/404/";
  return "/" + rel.replace(/index\.html$/, "");
};

const attr = (tag, name) => tag.match(new RegExp(`${name}="([^"]*)"`))?.[1];
const decode = (s = "") =>
  s.replace(/&amp;/g, "&").replace(/&#39;/g, "'").replace(/&quot;/g, '"').replace(/&lt;/g, "<").replace(/&gt;/g, ">");

const pages = walk(DIST).filter((f) => f.endsWith(".html"));
const sitemap = readdirSync(DIST)
  .filter((f) => /^sitemap-\d+\.xml$/.test(f))
  .flatMap((f) => [...readFileSync(join(DIST, f), "utf8").matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => new URL(m[1]).pathname));

const issues = [];
const warn = (page, msg) => issues.push(`${page}: ${msg}`);
const titles = new Map();
const descriptions = new Map();
const indexable = [];

for (const file of pages) {
  const html = readFileSync(file, "utf8");
  const page = toUrlPath(file);
  const title = decode(html.match(/<title>([^<]*)<\/title>/)?.[1]);
  const desc = decode(attr(html.match(/<meta name="description"[^>]*>/)?.[0] ?? "", "content"));
  const robots = attr(html.match(/<meta name="robots"[^>]*>/)?.[0] ?? "", "content") ?? "";
  const canonical = attr(html.match(/<link rel="canonical"[^>]*>/)?.[0] ?? "", "href");
  const isNoindex = robots.includes("noindex");

  if (!title) warn(page, "missing <title>");
  else if (title.length > TITLE_MAX) warn(page, `title is ${title.length} chars (>${TITLE_MAX}): "${title}"`);
  if (!desc) warn(page, "missing meta description");
  else if (desc.length < DESC_MIN || desc.length > DESC_MAX) warn(page, `description is ${desc.length} chars`);
  titles.set(title, [...(titles.get(title) ?? []), page]);
  descriptions.set(desc, [...(descriptions.get(desc) ?? []), page]);

  if (isNoindex) {
    if (canonical) warn(page, "noindex page should not declare a canonical");
    if (sitemap.includes(page)) warn(page, "noindex page is listed in the sitemap");
  } else {
    indexable.push(page);
    if (!canonical) warn(page, "missing canonical");
    else if (new URL(canonical).pathname !== page) warn(page, `canonical points elsewhere: ${canonical}`);
    if (!sitemap.includes(page)) warn(page, "indexable page missing from sitemap");
  }
  for (const prop of ["og:title", "og:description", "og:image", "og:url"])
    if (!html.includes(`property="${prop}"`)) warn(page, `missing ${prop}`);

  const h1s = html.match(/<h1[\s>]/g)?.length ?? 0;
  if (h1s !== 1) warn(page, `${h1s} <h1> elements`);
  const main = html.slice(html.indexOf("<main"), html.indexOf("</main>"));
  let last = 1;
  for (const [, level] of main.matchAll(/<h([1-6])[\s>]/g)) {
    if (Number(level) > last + 1) warn(page, `heading jumps from h${last} to h${level}`);
    last = Number(level);
  }

  for (const [img] of html.matchAll(/<img\b[^>]*>/g))
    if (!/\salt(=|\s|>)/.test(img)) warn(page, `<img> without alt: ${img.slice(0, 80)}`);

  for (const [, script] of html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)) {
    try {
      JSON.parse(script);
    } catch {
      warn(page, "invalid JSON-LD");
    }
  }

  for (const [, href] of html.matchAll(/\s(?:href|src)="(\/[^"#?]*)/g)) {
    const target = join(DIST, decodeURI(href));
    const ok = existsSync(target) && (statSync(target).isFile() || existsSync(join(target, "index.html")));
    if (!ok) warn(page, `broken internal link: ${href}`);
  }
}

for (const [title, list] of titles) if (list.length > 1) issues.push(`duplicate title "${title}": ${list.join(", ")}`);
for (const [desc, list] of descriptions) if (list.length > 1) issues.push(`duplicate description on: ${list.join(", ")}`);

console.log(`Pages: ${pages.length} | indexable: ${indexable.length} | sitemap URLs: ${sitemap.length}`);
console.log(issues.length ? issues.join("\n") : "No SEO issues found.");
process.exitCode = issues.length ? 1 : 0;
