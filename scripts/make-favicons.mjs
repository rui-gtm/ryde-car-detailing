import sharp from "sharp";
import pngToIco from "png-to-ico";
import fs from "fs";

const src = "H:/Sam/GTM8Website/gtm8-projects/ryde-inspired-design/src/assets/logo.png";
const outDir = "H:/Sam/GTM8Website/gtm8-projects/ryde-inspired-design/public";

const run = async () => {
  // The source has a transparent background; trim it so the icon fills the
  // frame, then pad back to a square canvas so it isn't squished when
  // resized down to favicon sizes.
  const transparent = { r: 0, g: 0, b: 0, alpha: 0 };
  const trimmed = sharp(src).trim({ background: transparent, threshold: 10 });
  const meta = await sharp(src).metadata();
  const trimmedBuffer = await trimmed.toBuffer();
  const trimmedMeta = await sharp(trimmedBuffer).metadata();
  const side = Math.max(trimmedMeta.width, trimmedMeta.height);

  const squareBuffer = await sharp(trimmedBuffer)
    .resize({
      width: side,
      height: side,
      fit: "contain",
      background: transparent,
    })
    .png()
    .toBuffer();

  const sizes = [16, 32, 48, 512];
  for (const size of sizes) {
    const outName = size === 512 ? "favicon.png" : `favicon-${size}.png`;
    await sharp(squareBuffer)
      .resize(size, size, { fit: "contain", background: transparent })
      .png()
      .toFile(`${outDir}/${outName}`);
    console.log("wrote", outName);
  }

  const icoBuffer = await pngToIco([
    `${outDir}/favicon-16.png`,
    `${outDir}/favicon-32.png`,
    `${outDir}/favicon-48.png`,
  ]);
  fs.writeFileSync(`${outDir}/favicon.ico`, icoBuffer);
  console.log("wrote favicon.ico");

  console.log("original size", meta.width, meta.height, "trimmed", trimmedMeta.width, trimmedMeta.height);
};

run().catch((e) => {
  console.error(e);
  process.exit(1);
});
