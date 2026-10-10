/**
 * Image compression pipeline
 * --------------------------
 * Put original camera exports (JPG/PNG/WebP/TIFF/HEIC*) in  public/images/raw/
 * Run:  npm run optimize
 *
 * For each photo it:
 *   1. auto-rotates (EXIF), strips metadata (GPS/camera data) for privacy & size
 *   2. resizes so the long edge is max 2400px (never upscales)
 *   3. writes a high-quality mozjpeg master to public/images/optimized/<name>.jpg
 *      (Next.js <Image> then serves AVIF/WebP variants of this per device)
 *   4. writes a tiny 16px blurred preview into data/blur.json (instant placeholder)
 *
 * Then reference images in data/site.ts as '/images/optimized/<name>.jpg'.
 * A typical 12 MB camera JPEG ends up ~350–600 KB master, ~80–200 KB served AVIF.
 * (*HEIC needs a sharp build with libheif; convert to JPG first if it fails.)
 */
import fs from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

const root = process.cwd();
const RAW = path.join(root, 'public/images/raw');
const OUT = path.join(root, 'public/images/optimized');
const BLUR = path.join(root, 'data/blur.json');
const MAX = 2400;
const exts = new Set(['.jpg', '.jpeg', '.png', '.webp', '.tif', '.tiff', '.heic', '.avif']);

const slug = (s) => s.toLowerCase().replace(/\.[^.]+$/, '').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
const kb = (n) => `${(n / 1024).toFixed(0)} KB`;

await fs.mkdir(OUT, { recursive: true });
const files = (await fs.readdir(RAW)).filter((f) => !f.startsWith('.') && exts.has(path.extname(f).toLowerCase()));
if (!files.length) {
  console.log('No images in public/images/raw — add your photos there and run again.');
  process.exit(0);
}

let blur = {};
try { blur = JSON.parse(await fs.readFile(BLUR, 'utf8')); } catch {}

let before = 0, after = 0;
for (const f of files) {
  const src = path.join(RAW, f);
  const name = `${slug(f)}.jpg`;
  const dest = path.join(OUT, name);
  const { size } = await fs.stat(src);

  await sharp(src)
    .rotate()
    .resize({ width: MAX, height: MAX, fit: 'inside', withoutEnlargement: true })
    .sharpen({ sigma: 0.8, m1: 0.4, m2: 0.4 })
    .jpeg({ quality: 92, mozjpeg: true, chromaSubsampling: '4:4:4' })
    .toFile(dest);

  const tiny = await sharp(src)
    .rotate()
    .resize(16, 16, { fit: 'inside' })
    .blur(1.2)
    .jpeg({ quality: 50 })
    .toBuffer();
  blur[`/images/optimized/${name}`] = `data:image/jpeg;base64,${tiny.toString('base64')}`;

  const meta = await sharp(dest).metadata();
  const out = (await fs.stat(dest)).size;
  before += size; after += out;
  console.log(`✓ ${f.padEnd(32)} ${kb(size).padStart(9)} → ${kb(out).padStart(8)}   ${meta.width}×${meta.height}   /images/optimized/${name}`);
}

await fs.writeFile(BLUR, JSON.stringify(blur, null, 2) + '\n');
console.log(`\nDone: ${files.length} images, ${kb(before)} → ${kb(after)} (${Math.round((1 - after / before) * 100)}% smaller).`);
console.log('Blur placeholders written to data/blur.json. Use the paths above in data/site.ts (include w/h).');
