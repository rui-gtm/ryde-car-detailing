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
const template = await fs.readFile(indexHtmlPath, "utf8");

const { html: appHtml } = await ssrModule.render("/");

const replaced =
  template.includes('<div id="root"></div>')
    ? template.replace('<div id="root"></div>', `<div id="root">${appHtml}</div>`)
    : template.replace(/<div id="root">[\s\S]*?<\/div>/, `<div id="root">${appHtml}</div>`);

const formatted = await prettier.format(replaced, {
  parser: "html",
});

await fs.writeFile(indexHtmlPath, formatted, "utf8");
