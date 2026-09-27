import type { Metadata } from "next";
import { SITE, type Locale } from "@/content/site";
import { getDictionary } from "@/content/i18n";
import { DEVELOPER } from "@/content/people";

export function buildMetadata(locale: Locale): Metadata {
  const t = getDictionary(locale);
  const path = locale === "ar" ? "/ar" : "/";
  return {
    metadataBase: new URL(SITE.url),
    title: t.meta.title,
    description: t.meta.description,
    applicationName: t.meta.shortTitle,
    authors: [{ name: DEVELOPER }],
    creator: DEVELOPER,
    publisher: "Faculty of Medicine, Suez University",
    keywords: [
      "energy drinks",
      "vital signs",
      "cognitive performance",
      "caffeine",
      "Suez University",
      "Faculty of Medicine",
      "medical research",
      "مشروبات الطاقة",
      "جامعة السويس",
    ],
    alternates: {
      canonical: path,
      languages: { en: "/", ar: "/ar", "x-default": "/" },
    },
    openGraph: {
      type: "article",
      url: path,
      siteName: t.meta.shortTitle,
      title: t.hero.title,
      description: t.meta.description,
      locale: locale === "ar" ? "ar_EG" : "en_US",
      alternateLocale: locale === "ar" ? ["en_US"] : ["ar_EG"],
    },
    twitter: {
      card: "summary_large_image",
      title: t.hero.title,
      description: t.meta.description,
    },
    robots: { index: true, follow: true },
    formatDetection: { telephone: false },
  };
}
