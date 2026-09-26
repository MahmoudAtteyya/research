import { Geist, Geist_Mono, Newsreader } from "next/font/google";

export const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist",
  display: "swap",
});

export const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
  display: "swap",
});

/** Only used for the developer signature, so it is not preloaded. */
export const newsreader = Newsreader({
  subsets: ["latin"],
  style: ["italic"],
  weight: ["500"],
  variable: "--font-newsreader",
  display: "swap",
  preload: false,
});

export const latinFontVariables = `${geist.variable} ${geistMono.variable} ${newsreader.variable}`;
