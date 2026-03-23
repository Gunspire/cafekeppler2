import { writeFileSync } from "node:fs";
import { resolve } from "node:path";
import type { Plugin } from "vite";
import { ACTUEEL_ITEMS } from "./src/data/actueel";
import { SITE_ORIGIN } from "./src/data/site";

const STATIC_PATHS = [
  "/",
  "/groepen",
  "/contact",
  "/actueel",
  "/werken-bij",
  "/lokaal",
  "/bakkerij",
] as const;

function escapeXml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function buildSitemapXml(): string {
  const paths = [
    ...STATIC_PATHS,
    ...ACTUEEL_ITEMS.map((item) => `/actueel/${item.slug}`),
  ];
  const lines = paths.map((p) => {
    const loc = `${SITE_ORIGIN}${p === "/" ? "/" : p}`;
    return `  <url>\n    <loc>${escapeXml(loc)}</loc>\n  </url>`;
  });
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${lines.join("\n")}
</urlset>
`;
}

function buildRobotsTxt(): string {
  return `User-agent: *
Allow: /

Sitemap: ${SITE_ORIGIN}/sitemap.xml
`;
}

/**
 * Writes `sitemap.xml` and `robots.txt` into `public/` (for dev + repo) and
 * `dist/` (production) so Google Search Console always sees current routes.
 */
export function kepplerSitemapPlugin(): Plugin {
  let outDir = "dist";
  let root = process.cwd();
  return {
    name: "keppler-sitemap",
    apply: "build",
    configResolved(config) {
      outDir = config.build.outDir;
      root = config.root;
    },
    closeBundle() {
      const xml = buildSitemapXml();
      const robots = buildRobotsTxt();
      const distDir = resolve(root, outDir);
      const publicDir = resolve(root, "public");
      writeFileSync(resolve(distDir, "sitemap.xml"), xml, "utf8");
      writeFileSync(resolve(distDir, "robots.txt"), robots, "utf8");
      writeFileSync(resolve(publicDir, "sitemap.xml"), xml, "utf8");
      writeFileSync(resolve(publicDir, "robots.txt"), robots, "utf8");
    },
  };
}
