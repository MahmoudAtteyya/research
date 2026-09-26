# Acute Effects of Energy Drinks on Vital Signs & Cognitive Performance

An interactive, bilingual (English / العربية) presentation of a research project by **fifth-year medical students of the Faculty of Medicine, Suez University** (Class of 2021–2026), presented at the **4th Annual Student Symposium for Research Projects** on 9 June 2026.

> A pre–post experimental study of 47 adults at Suez University and Suez University Hospital: vital signs and cognitive performance measured before and 30 minutes after one energy drink.

**Live:** [fomsu.com](https://fomsu.com) · Arabic: [fomsu.com/ar](https://fomsu.com/ar) · Slides: [fomsu.com/presentation](https://fomsu.com/presentation)

Website designed & developed by **Mahmoud Attia**, Medical Student, Faculty of Medicine, Suez University.

---

## What's inside

| Route | What it is |
| --- | --- |
| `/` and `/ar` | The study site: abstract, methods, results with interactive figures, discussion, conclusion, quiz, research team, poster and citation. |
| `/presentation` | The symposium slide deck (keyboard, fullscreen, speaker notes, phone remote). |
| `/admin` | Phone remote control for the slide deck. |

Highlights of the site:

- **Every number comes from the official poster** and lives in one file (`src/content/study.ts`). Charts, tables, the quiz and the text all read from it.
- **Figures built for reading:** before/after dumbbell charts with ±1 SD bands on each measure's own axis, ordinal and emphasis bar charts, a unit chart of all 47 participants, and a "view as table" option for every figure. Chart colours were checked for colour-blind separation and contrast in both themes.
- **Patient-monitor hero** that animates the group means from baseline to +30 minutes.
- **Dark premium design:** a deep navy canvas with glass surfaces, brand glows (crimson, blue, Suez gold) and a travelling ECG pulse. A light theme is one click away and is remembered.
- **Cinematic motion:** a word-by-word hero entrance, numbers that count up, bars that grow and dots that travel from "before" to "after" as you scroll. All motion is CSS and is switched off for visitors who prefer reduced motion.
- **Suez identity throughout:** University and Faculty crests, symposium branding and a palette taken from the poster.
- **Responsive on every screen:** tested from 320 px phones to 2560 px displays, portrait and landscape. The patient monitor uses container queries, type scales fluidly, touch targets are at least 44 px and nothing is clipped.
- **Bilingual with full right-to-left support:** separate static pages for English and Arabic, each with the correct `lang`/`dir`, so there is no flash of the wrong language.
- **Accessible:** zero axe violations (WCAG 2.2 AA) in both themes and languages, keyboard support, skip link, back-to-top button, and pinch-zoom allowed.
- **Fast:** server-rendered, with small client islands only and no layout shift. The site uses no chart library or animation framework, and fonts (Geist, Geist Mono, Alexandria, IBM Plex Sans Arabic) are self-hosted with `next/font`.
- **Shareable:** Open Graph images in both languages, JSON-LD (ScholarlyArticle), sitemap, robots and hreflang.

## Tech stack

Next.js 16 (App Router, Turbopack) · React 19 · TypeScript · Tailwind CSS v4 · next-themes · lucide-react. The slide deck additionally uses framer-motion and Recharts.

## Getting started

Requires Node.js 20.9 or later.

```bash
npm ci
npm run dev        # http://localhost:3000
npm run typecheck  # TypeScript
npm run build      # production build (needs network access to Google Fonts for next/font)
npm start
```

## Project structure

```
src/
  app/
    (en)/            English root layout + page            → /
    (ar)/ar/         Arabic root layout + page             → /ar
    (deck)/          Slide deck + remote admin (own layout) → /presentation, /admin
    api/remote/      Server-Sent Events remote-control API
    global-not-found.tsx, robots.ts, sitemap.ts, icon.svg, apple-icon.png, favicon.ico
  content/           ← edit content here
    study.ts         all study results (poster-verified)
    people.ts        authors (poster order) and supervisors
    literature.ts    further reading
    site.ts          site URL, section order, asset paths
    i18n/en.ts, ar.ts  every string on the site (Arabic is type-checked against English)
  components/site/   the study site: sections, charts, layout, interactive islands, UI primitives
  components/presentation/  the slide deck
  styles/site.css    design tokens (light/dark) and utilities
scripts/
  build-assets.mjs   crests, portraits, poster previews and icons (sharp)
  render-og.mjs      Open Graph images for / and /ar (headless Chromium)
public/
  brand/ people/ poster/ downloads/   generated and downloadable assets
```

### Editing content

- **Text:** `src/content/i18n/en.ts` and `ar.ts`. A key missing in Arabic fails `npm run typecheck`.
- **Numbers:** `src/content/study.ts`. Change is computed from the reported means. p-values are shown exactly as printed on the poster.
- **People:** `src/content/people.ts`.
- After changing crests, photos or the poster, run `node scripts/build-assets.mjs`. After changing the title or branding, run `node scripts/render-og.mjs`.

## Deployment

The app builds as a standalone Node server (`output: "standalone"`) and ships with a multi-stage `Dockerfile`:

```bash
docker build -t energy-drinks-study .
docker run -p 3000:3000 -e NEXT_PUBLIC_SITE_URL=https://fomsu.com energy-drinks-study
```

`NEXT_PUBLIC_SITE_URL` (default `https://fomsu.com`) sets canonical URLs, the sitemap and social images. The slide remote keeps its state in memory, so run a single instance.

## Credits

- **Research team:** Rehab Shaban (team lead), Mahmoud Attia, Nagwa Adel, Abd ElRahman Mahmoud, Abd ElRahman Mostafa, Ahmed Shaban, Deng Ajou Luol, Fatma Ali, Fatma Saad, Kyrollos Ashraf, Laila Roshdy, Mahmoud Eldoreay, Mahmoud ElSayed, Mohamed Abd Elhady, Mohamed Elshahat, Salah Mohamed.
- **Supervisors:** Prof. Dr. Maysa Ibrahim, Dr. Mohamed Wagih Saleh, Dr. Nanees Kamel Hussein, Dr. Yosra Saeed Abdalla.
- **Website design & development:** Mahmoud Attia.

© 2026 Research team, Faculty of Medicine, Suez University. For education and research communication; not medical advice.
