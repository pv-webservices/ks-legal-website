import type { APIRoute } from "astro";

// Noindex pages stay crawlable so search engines can read their robots meta tag.
export const GET: APIRoute = ({ site }) =>
  new Response(
    [
      "User-agent: *",
      "Allow: /",
      "",
      `Sitemap: ${new URL("sitemap-index.xml", site).href}`,
      "",
    ].join("\n"),
    { headers: { "Content-Type": "text/plain; charset=utf-8" } },
  );
