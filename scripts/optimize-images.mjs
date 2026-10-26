import sharp from "sharp";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

// Writes a WebP next to each source image, sized for how big it's actually
// displayed (about 2x its largest on-screen width, for high-DPI screens). The
// original JPG/PNG stays in src/assets as the master; components import the
// .webp. Re-run after replacing a source image:
//   node scripts/optimize-images.mjs
const assets = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../src/assets");

const images = [
  // Header logo shows at most ~250px wide.
  { src: "logo-new.png", width: 600, quality: 90 },
  // Full-bleed hero (LCP image on the homepage).
  { src: "hero-bmw-interior.jpg", width: 2048, quality: 72 },
  // Service cards (~550px wide) and the /services intro photos.
  { src: "exteriorImage-8.jpg", width: 1100, quality: 75 },
  { src: "interiorImage-4.jpg", width: 1100, quality: 75 },
  { src: "exteriorImage-7.jpg", width: 1100, quality: 75 },
  { src: "exteriorImage-3.jpg", width: 1400, quality: 75 },
  { src: "interiorImage-5.jpg", width: 800, quality: 75 },
  // Ceramic Coating in Action photo.
  { src: "ceramic-garage.jpg", width: 1200, quality: 78 },
  // Before/after slider (max ~510px wide).
  ...fs
    .readdirSync(path.join(assets, "before-after"))
    .filter((f) => f.endsWith(".jpg"))
    .map((f) => ({ src: `before-after/${f}`, width: 1100, quality: 78 })),
];

const run = async () => {
  for (const { src, width, quality } of images) {
    const input = path.join(assets, src);
    const output = input.replace(/\.(jpe?g|png)$/i, ".webp");
    await sharp(input)
      .resize({ width, withoutEnlargement: true })
      .webp({ quality })
      .toFile(output);
    const kb = (f) => Math.round(fs.statSync(f).size / 1024);
    console.log(`${src}: ${kb(input)}KB -> ${path.basename(output)} ${kb(output)}KB`);
  }
};

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
