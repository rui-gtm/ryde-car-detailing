import fs from "node:fs/promises";
import path from "node:path";
import { pathToFileURL } from "node:url";

const projectRoot = process.cwd();
const distDir = path.resolve(projectRoot, "dist");
const ssrOutDir = path.resolve(projectRoot, "dist-ssr");

const ssrEntryCandidates = [
  path.resolve(ssrOutDir, "entry-server.js"),
  path.resolve(ssrOutDir, "entry-server.mjs"),
];

const findExistingFile = async (candidates) => {
  for (const filePath of candidates) {
    try {
      await fs.access(filePath);
      return filePath;
    } catch {
      continue;
    }
  }
  return null;
};

const ssrEntry = await findExistingFile(ssrEntryCandidates);
if (!ssrEntry) {
  throw new Error(
    `SSR entry not found. Tried:\n${ssrEntryCandidates.map((p) => `- ${p}`).join("\n")}`,
  );
}

const ssrModule = await import(pathToFileURL(ssrEntry).href);
if (typeof ssrModule.render !== "function") {
  throw new Error(`SSR entry "${ssrEntry}" does not export a "render(url)" function`);
}

const indexHtmlPath = path.resolve(distDir, "index.html");
const baseTemplate = await fs.readFile(indexHtmlPath, "utf8");

// Route list (path/title/description) comes from src/lib/siteRoutes.ts via
// the compiled SSR bundle — NOT hardcoded here — so adding a new suburb,
// service or guide only ever means editing one data file, not this script too.
const siteRoutes = ssrModule.ALL_ROUTES ?? [];

const routes = [
  { url: "/", outFile: indexHtmlPath },
  ...siteRoutes.map((r) => ({
    url: r.path,
    outFile: path.resolve(distDir, r.path.replace(/^\//, ""), "index.html"),
    title: r.title,
    description: r.description,
    noindex: r.noindex,
    ogType: r.ogType,
  })),
  // Served by the web server for unknown URLs (Apache: `ErrorDocument 404
  // /404.html`). The app renders <NotFound /> for any unmatched path, so the
  // client hydrates this same markup whatever URL it was served at.
  {
    url: "/404",
    outFile: path.resolve(distDir, "404.html"),
    title: "Page Not Found | Ryde Car Detailing",
    description: "The page you were looking for doesn't exist. Browse our mobile car detailing services in Ryde NSW.",
    notFound: true,
  },
];

const escapeHtml = (s) =>
  s.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

// Every replacement below uses a replacer *function*: with a replacement
// string, `$$`, `$&`, `$'` and `$1` inside the inserted text are treated as
// special patterns — that's what turned the JSON-LD priceRange "$$" into "$".
const applyMeta = (html, route) => {
  if (!route.title && !route.description) return html;

  let result = html;
  if (route.title) {
    const title = escapeHtml(route.title);
    result = result
      .replace(/<title>.*?<\/title>/, () => `<title>${title}</title>`)
      .replace(/(property="og:title" content=")[^"]*(")/, (_, a, b) => `${a}${title}${b}`)
      .replace(/(name="twitter:title" content=")[^"]*(")/, (_, a, b) => `${a}${title}${b}`);
  }
  if (route.description) {
    const description = escapeHtml(route.description);
    result = result
      .replace(/(name="description"\s*\n?\s*content=")[^"]*(")/, (_, a, b) => `${a}${description}${b}`)
      .replace(/(property="og:description"\s*\n?\s*content=")[^"]*(")/, (_, a, b) => `${a}${description}${b}`)
      .replace(/(name="twitter:description"\s*\n?\s*content=")[^"]*(")/, (_, a, b) => `${a}${description}${b}`);
  }
  if (route.ogType) {
    result = result.replace(/(property="og:type" content=")[^"]*(")/, (_, a, b) => `${a}${route.ogType}${b}`);
  }
  if (route.noindex || route.notFound) {
    result = result.replace(/(name="robots"\s*\n?\s*content=")[^"]*(")/, (_, a, b) => `${a}noindex,follow${b}`);
  }
  if (route.notFound) {
    // A 404 page must not claim a canonical URL either.
    return result
      .replace(/\s*<link rel="canonical"[^>]*>/, "")
      .replace(/\s*<meta property="og:url"[^>]*>/, "");
  }
  const canonicalUrl = `https://www.rydecardetailing.com${route.url === "/" ? "/" : route.url}`;
  result = result
    .replace(/(rel="canonical" href=")[^"]*(")/, (_, a, b) => `${a}${canonicalUrl}${b}`)
    .replace(/(property="og:url" content=")[^"]*(")/, (_, a, b) => `${a}${canonicalUrl}${b}`);

  return result;
};

for (const route of routes) {
  const { html: appHtml } = await ssrModule.render(route.url);

  const withMeta = applyMeta(baseTemplate, route);
  const rootHtml = `<div id="root">${appHtml}</div>`;
  const replaced = withMeta.includes('<div id="root"></div>')
    ? withMeta.replace('<div id="root"></div>', () => rootHtml)
    : withMeta.replace(/<div id="root">[\s\S]*?<\/div>/, () => rootHtml);

  // Written exactly as React rendered it — no pretty-printing. Reformatting
  // (prettier used to run here) adds whitespace text nodes and re-wraps text,
  // which makes hydration fail on every page.
  await fs.mkdir(path.dirname(route.outFile), { recursive: true });
  await fs.writeFile(route.outFile, replaced, "utf8");
}

// Regenerate sitemap.xml from the same route list instead of the
// hand-maintained public/sitemap.xml (which only ever listed 3 URLs and
// required a manual edit every time a page was added) — this overwrites the
// static copy Vite already put in dist/ during the build.
//
// noindex routes are left out, and <lastmod> is only written where the route
// has a real content date (SiteRoute.lastmod) — stamping every URL with the
// build date made the values meaningless to search engines.
const sitemapRoutes = [{ path: "/" }, ...siteRoutes.filter((r) => !r.noindex)];
const sitemapXml = [
  '<?xml version="1.0" encoding="UTF-8"?>',
  '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
  ...sitemapRoutes.map(
    (r) =>
      `  <url>\n    <loc>https://www.rydecardetailing.com${r.path}</loc>\n` +
      (r.lastmod ? `    <lastmod>${r.lastmod}</lastmod>\n` : "") +
      "  </url>",
  ),
  "</urlset>",
  "",
].join("\n");
await fs.writeFile(path.resolve(distDir, "sitemap.xml"), sitemapXml, "utf8");

// /llms.txt — Markdown summary of the business for AI assistants, built from
// the same data as the pages (src/lib/llms.ts).
await fs.writeFile(path.resolve(distDir, "llms.txt"), ssrModule.buildLlmsTxt(), "utf8");
