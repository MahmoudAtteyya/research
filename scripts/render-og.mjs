// Renders the Open Graph images (1200×630) for / and /ar with a headless browser.
// Satori/next/og cannot shape Arabic text, so the images are rendered once and committed.
//
//   npx playwright install chromium   # once, if no browser is available
//   node scripts/render-og.mjs
//
// Set OG_IGNORE_HTTPS_ERRORS=1 behind a TLS-intercepting proxy.
import { chromium } from "playwright";
import { readFile } from "node:fs/promises";

const root = new URL("../", import.meta.url);
const dataUrl = async (p) => `data:image/png;base64,${(await readFile(new URL(p, root))).toString("base64")}`;
const faculty = await dataUrl("public/brand/faculty-crest.png");
const university = await dataUrl("public/brand/university-crest.png");

const copy = {
  en: {
    dir: "ltr",
    lang: "en",
    kicker: "Faculty of Medicine · Suez University",
    chip: "4th Annual Student Symposium for Research Projects · 9 June 2026",
    title: "Acute Effects of Energy Drinks Consumption on Vital Signs and Cognitive Performance",
    byline: "A research project by fifth-year medical students",
    stats: [["47", "participants"], ["5 / 5", "vital signs rose"], ["30 min", "to reassessment"]],
    out: "src/app/(en)/opengraph-image.png",
  },
  ar: {
    dir: "rtl",
    lang: "ar",
    kicker: "كلية الطب البشري · جامعة السويس",
    chip: "الملتقى الطلابي السنوي الرابع للمشروعات البحثية · 9 يونيو 2026",
    title: "التأثيرات الحادة لاستهلاك مشروبات الطاقة على العلامات الحيوية والأداء المعرفي",
    byline: "مشروع بحثي من إعداد طلاب الفرقة الخامسة",
    stats: [["47", "مشاركاً"], ["5 / 5", "علامات حيوية ارتفعت"], ["30 د", "حتى إعادة القياس"]],
    out: "src/app/(ar)/ar/opengraph-image.png",
  },
};

const html = (c) => `<!doctype html>
<html lang="${c.lang}" dir="${c.dir}"><head><meta charset="utf-8">
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Newsreader:opsz,wght@6..72,500&family=IBM+Plex+Sans+Arabic:wght@400;500;600&family=Noto+Naskh+Arabic:wght@600&display=block" rel="stylesheet">
<style>
  * { box-sizing: border-box; margin: 0; }
  html, body { width: 1200px; height: 630px; overflow: hidden; }
  .bg { position: absolute; inset: 0; overflow: hidden; }
  body {
    background: #0b1b33; color: #fff; overflow: hidden; position: relative;
    font-family: ${c.lang === "ar" ? "'IBM Plex Sans Arabic', " : ""}Inter, system-ui, sans-serif;
  }
  .grid { position: absolute; inset: 0;
    background-image: linear-gradient(rgb(255 255 255 / .06) 1px, transparent 1px), linear-gradient(90deg, rgb(255 255 255 / .06) 1px, transparent 1px),
      linear-gradient(rgb(255 255 255 / .025) 1px, transparent 1px), linear-gradient(90deg, rgb(255 255 255 / .025) 1px, transparent 1px);
    background-size: 80px 80px, 80px 80px, 16px 16px, 16px 16px;
    -webkit-mask-image: radial-gradient(ellipse 80% 80% at 70% 30%, #000 20%, transparent 80%); }
  .glow1 { position: absolute; width: 640px; height: 640px; border-radius: 50%; background: rgb(200 16 46 / .28); filter: blur(140px); top: -320px; inset-inline-end: -200px; }
  .glow2 { position: absolute; width: 560px; height: 560px; border-radius: 50%; background: rgb(61 106 168 / .35); filter: blur(140px); bottom: -320px; inset-inline-start: -200px; }
  .wrap { position: relative; height: 100%; padding: 64px 72px; display: flex; flex-direction: column; }
  .mast { display: flex; align-items: center; gap: 20px; }
  .crests { display: flex; }
  .crests span { width: 68px; height: 68px; border-radius: 50%; background: #fff; display: grid; place-items: center; box-shadow: 0 0 0 1px rgb(0 0 0 / .06); }
  .crests span + span { margin-inline-start: -12px; }
  .crests img { width: 86%; height: 86%; object-fit: contain; }
  .kicker { font-size: 24px; color: #c9d3e3; ${c.lang === "ar" ? "" : "letter-spacing: .01em;"} }
  .chip { margin-top: 30px; align-self: flex-start; font-size: 19px; font-weight: 500; color: #e3c868; border: 1.5px solid rgb(227 200 104 / .35); background: rgb(227 200 104 / .08); padding: 8px 18px; border-radius: 999px; }
  h1 { margin-top: 26px; font-family: ${c.lang === "ar" ? "'Noto Naskh Arabic', " : ""}Newsreader, Georgia, serif; font-weight: ${c.lang === "ar" ? 600 : 500};
    font-size: ${c.lang === "ar" ? 54 : 58}px; line-height: ${c.lang === "ar" ? 1.35 : 1.06}; max-width: 1000px; ${c.lang === "ar" ? "" : "letter-spacing: -0.01em;"} }
  .foot { margin-top: auto; display: flex; align-items: flex-end; justify-content: space-between; gap: 32px; }
  .byline { font-size: 22px; color: rgb(255 255 255 / .82); }
  .byline b { color: #fff; font-weight: 600; }
  .stats { display: flex; gap: 36px; }
  .stat b { display: block; font-size: 38px; font-weight: 600; direction: ${c.lang === "ar" ? "rtl" : "ltr"}; }
  .stat span { font-size: 17px; color: #c9d3e3; }
  .rule { position: absolute; bottom: 0; inset-inline: 0; height: 6px; background: linear-gradient(90deg, #c8102e, #e3c868); }
</style></head>
<body><div class="bg"><div class="grid"></div><div class="glow1"></div><div class="glow2"></div></div>
<div class="wrap">
  <div class="mast"><div class="crests"><span><img src="${university}"></span><span><img src="${faculty}"></span></div><div class="kicker">${c.kicker}</div></div>
  <div class="chip">${c.chip}</div>
  <h1>${c.title}</h1>
  <div class="foot">
    <div class="byline">${c.byline}<br><b>fomsu.com</b></div>
    <div class="stats">${c.stats.map(([v, l]) => `<div class="stat"><b>${v}</b><span>${l}</span></div>`).join("")}</div>
  </div>
</div><div class="rule"></div></body></html>`;

const browser = await chromium.launch();
const context = await browser.newContext({
  viewport: { width: 1200, height: 630 },
  deviceScaleFactor: 1,
  ignoreHTTPSErrors: process.env.OG_IGNORE_HTTPS_ERRORS === "1",
});
for (const c of Object.values(copy)) {
  const page = await context.newPage();
  await page.setContent(html(c), { waitUntil: "networkidle" });
  await page.evaluate(() => document.fonts.ready);
  await page.screenshot({ path: new URL(c.out, root).pathname, type: "png" });
  await page.close();
  console.log("wrote", c.out);
}
await browser.close();
