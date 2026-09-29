import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";
import { noindexPaths } from "./src/data/seo.ts";

const BUILD_DATE = new Date().toISOString();

export default defineConfig({
  site: process.env.SITE_URL || "https://kslegalconsultants.com",
  trailingSlash: "always",
  build: { format: "directory" },
  integrations: [
    sitemap({
      filter: (page) => !noindexPaths.some((path) => new URL(page).pathname === path),
      serialize: (item) => ({ ...item, lastmod: BUILD_DATE }),
    }),
  ],
  output: "static",
});
