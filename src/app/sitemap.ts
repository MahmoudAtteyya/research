import type { MetadataRoute } from "next";
import { SITE } from "@/content/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const languages = { en: `${SITE.url}/`, ar: `${SITE.url}/ar` };
  return [
    { url: `${SITE.url}/`, changeFrequency: "yearly", priority: 1, alternates: { languages } },
    { url: `${SITE.url}/ar`, changeFrequency: "yearly", priority: 0.9, alternates: { languages } },
    { url: `${SITE.url}/presentation`, changeFrequency: "yearly", priority: 0.5 },
  ];
}
