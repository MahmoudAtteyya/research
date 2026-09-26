export type Locale = "en" | "ar";

export const LOCALES: Locale[] = ["en", "ar"];

export const SITE = {
  url: (process.env.NEXT_PUBLIC_SITE_URL ?? "https://fomsu.com").replace(/\/$/, ""),
  symposiumDate: "2026-06-09",
  classOf: "2021–2026",
  poster: {
    thumb: "/poster/poster-600.webp",
    full: "/poster/poster-1600.webp",
    download: "/downloads/suez-energy-drinks-poster-2026.jpg",
    width: 5906,
    height: 8858,
    sizeMB: 2.5,
  },
  brand: {
    faculty: "/brand/faculty-crest.png",
    university: "/brand/university-crest.png",
    symposium: "/brand/symposium-logo.webp",
  },
} as const;

export function localePath(locale: Locale, hash = ""): string {
  return (locale === "ar" ? "/ar" : "/") + hash;
}

/** Section ids, in page order. Drives the page, the navigation and the scrollspy. */
export const SECTION_IDS = [
  "abstract",
  "background",
  "methods",
  "results",
  "discussion",
  "conclusion",
  "quiz",
  "team",
  "poster",
] as const;

export type SectionId = (typeof SECTION_IDS)[number];

/** Sections shown in the header navigation. */
export const NAV_IDS: SectionId[] = ["abstract", "methods", "results", "discussion", "team", "poster"];
