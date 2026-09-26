import { IBM_Plex_Sans_Arabic, Noto_Naskh_Arabic } from "next/font/google";

export const plexArabic = IBM_Plex_Sans_Arabic({
  subsets: ["arabic"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-plex-ar",
  display: "swap",
});

export const naskhArabic = Noto_Naskh_Arabic({
  subsets: ["arabic"],
  weight: ["500", "600", "700"],
  variable: "--font-naskh",
  display: "swap",
});

export const arabicFontVariables = `${plexArabic.variable} ${naskhArabic.variable}`;
