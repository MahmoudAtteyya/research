// One-off asset pipeline for the site. Run with: node scripts/build-assets.mjs
// Produces optimised crests, supervisor portraits, poster previews and app icons.
import sharp from "sharp";
import { mkdir, writeFile, readFile } from "node:fs/promises";
import { existsSync } from "node:fs";

const out = (p) => new URL(`../${p}`, import.meta.url).pathname;

await Promise.all(["public/brand", "public/people", "public/poster", "public/downloads"].map((d) => mkdir(out(d), { recursive: true })));

// ── Crests ─────────────────────────────────────────────────────────────
// faculty.svg / university.svg are raster images wrapped in SVG masks.
// Render them at high density, trim the transparent margin and export PNGs.
for (const name of ["faculty", "university"]) {
  const rendered = await sharp(out(`public/${name}.svg`), { density: (72 * 1024) / 200 }).png().toBuffer();
  await sharp(rendered)
    .trim()
    .resize(384, 384, { fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png({ compressionLevel: 9, palette: false })
    .toFile(out(`public/brand/${name}-crest.png`));
}

// ── Supervisor portraits (head-and-shoulders crops) ─────────────────────
const portraits = {
  "maysa-ibrahim": ["maysa.jpeg", 79, 0, 170],
  "nanees-kamel": ["nanees.jpeg", 88, 8, 382],
  "yosra-saeed": ["yosra.jpeg", 14, 10, 400],
  "mohamed-wagih": ["wagih.jpeg", 170, 10, 310],
};
for (const [slug, [file, left, top, size]] of Object.entries(portraits)) {
  await sharp(out(`public/images/${file}`))
    .extract({ left, top, width: size, height: size })
    .resize(320, 320, { kernel: "lanczos3" })
    .webp({ quality: 84 })
    .toFile(out(`public/people/${slug}.webp`));
}

// ── Poster previews ──────────────────────────────────────────────────────
const poster = out("public/downloads/suez-energy-drinks-poster-2026.jpg");
if (!existsSync(poster)) throw new Error(`Missing ${poster}`);
await sharp(poster).resize({ width: 640 }).webp({ quality: 80 }).toFile(out("public/poster/poster-600.webp"));
await sharp(poster).resize({ width: 1600 }).webp({ quality: 82 }).toFile(out("public/poster/poster-1600.webp"));

// ── App icons ────────────────────────────────────────────────────────────
const iconSvg = await readFile(out("src/app/icon.svg"));
const sizes = [16, 32, 48];
const pngs = await Promise.all(sizes.map((s) => sharp(iconSvg, { density: 72 * (s / 32) * 4 }).resize(s, s).png().toBuffer()));
// PNG-in-ICO container: 6-byte header, 16-byte directory entry per image.
const header = Buffer.alloc(6);
header.writeUInt16LE(0, 0);
header.writeUInt16LE(1, 2);
header.writeUInt16LE(pngs.length, 4);
let offset = 6 + 16 * pngs.length;
const entries = pngs.map((png, i) => {
  const e = Buffer.alloc(16);
  e.writeUInt8(sizes[i] % 256, 0);
  e.writeUInt8(sizes[i] % 256, 1);
  e.writeUInt8(0, 2);
  e.writeUInt8(0, 3);
  e.writeUInt16LE(1, 4);
  e.writeUInt16LE(32, 6);
  e.writeUInt32LE(png.length, 8);
  e.writeUInt32LE(offset, 12);
  offset += png.length;
  return e;
});
await writeFile(out("src/app/favicon.ico"), Buffer.concat([header, ...entries, ...pngs]));

// Apple touch icon: faculty crest on a white tile.
const crest = await sharp(out("public/brand/faculty-crest.png")).resize(148, 148).toBuffer();
await sharp({ create: { width: 180, height: 180, channels: 4, background: "#ffffff" } })
  .composite([{ input: crest, left: 16, top: 16 }])
  .png()
  .toFile(out("src/app/apple-icon.png"));

console.log("Assets built.");
