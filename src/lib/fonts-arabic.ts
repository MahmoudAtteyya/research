import { Alexandria, IBM_Plex_Sans_Arabic } from "next/font/google";

export const plexArabic = IBM_Plex_Sans_Arabic({
  subsets: ["arabic"],
  weight: ["400", "500", "600"],
  variable: "--font-plex-ar",
  display: "swap",
});

/** Modern Arabic display face for headings. */
export const alexandria = Alexandria({
  subsets: ["arabic"],
  variable: "--font-alexandria",
  display: "swap",
});

export const arabicFontVariables = `${plexArabic.variable} ${alexandria.variable}`;
