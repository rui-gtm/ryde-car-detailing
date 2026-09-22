import fs from "node:fs/promises";
import path from "node:path";
import { pathToFileURL } from "node:url";
import prettier from "prettier";

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
  })),
];

const applyMeta = (html, route) => {
  if (!route.title && !route.description) return html;

  let result = html;
  if (route.title) {
    result = result
      .replace(/<title>.*?<\/title>/, `<title>${route.title}</title>`)
      .replace(/(property="og:title" content=")[^"]*(")/, `$1${route.title}$2`)
      .replace(/(name="twitter:title" content=")[^"]*(")/, `$1${route.title}$2`);
  }
  if (route.description) {
    result = result
      .replace(/(name="description"\s*\n?\s*content=")[^"]*(")/, `$1${route.description}$2`)
      .replace(/(property="og:description"\s*\n?\s*content=")[^"]*(")/, `$1${route.description}$2`)
      .replace(/(name="twitter:description"\s*\n?\s*content=")[^"]*(")/, `$1${route.description}$2`);
  }
  const canonicalUrl = `https://www.rydecardetailing.com${route.url === "/" ? "/" : route.url}`;
  result = result
    .replace(/(rel="canonical" href=")[^"]*(")/, `$1${canonicalUrl}$2`)
    .replace(/(property="og:url" content=")[^"]*(")/, `$1${canonicalUrl}$2`);

  return result;
};

for (const route of routes) {
  const { html: appHtml } = await ssrModule.render(route.url);

  const withMeta = applyMeta(baseTemplate, route);
  const replaced = withMeta.includes('<div id="root"></div>')
    ? withMeta.replace('<div id="root"></div>', `<div id="root">${appHtml}</div>`)
    : withMeta.replace(/<div id="root">[\s\S]*?<\/div>/, `<div id="root">${appHtml}</div>`);

  const formatted = await prettier.format(replaced, {
    parser: "html",
  });

  await fs.mkdir(path.dirname(route.outFile), { recursive: true });
  await fs.writeFile(route.outFile, formatted, "utf8");
}

// Regenerate sitemap.xml from the same route list instead of the
// hand-maintained public/sitemap.xml (which only ever listed 3 URLs and
// required a manual edit every time a page was added) — this overwrites the
// static copy Vite already put in dist/ during the build.
const today = new Date().toISOString().slice(0, 10);
const sitemapUrls = ["/", ...siteRoutes.map((r) => r.path)];
const sitemapXml = [
  '<?xml version="1.0" encoding="UTF-8"?>',
  '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
  ...sitemapUrls.map(
    (u) => `  <url>\n    <loc>https://www.rydecardetailing.com${u}</loc>\n    <lastmod>${today}</lastmod>\n  </url>`,
  ),
  "</urlset>",
  "",
].join("\n");
await fs.writeFile(path.resolve(distDir, "sitemap.xml"), sitemapXml, "utf8");
