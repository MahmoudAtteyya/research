import { SITE, type Locale } from "@/content/site";
import { getDictionary } from "@/content/i18n";
import { STUDENTS, SUPERVISORS, DEVELOPER } from "@/content/people";

/** Structured data for search engines: the study (ScholarlyArticle) and the website. */
export function buildJsonLd(locale: Locale) {
  const t = getDictionary(locale);
  const url = SITE.url + (locale === "ar" ? "/ar" : "/");
  const faculty = {
    "@type": "CollegeOrUniversity",
    name: "Faculty of Medicine, Suez University",
    address: { "@type": "PostalAddress", addressLocality: "Suez", addressCountry: "EG" },
  };
  return [
    {
      "@context": "https://schema.org",
      "@type": "ScholarlyArticle",
      headline: t.hero.title,
      name: t.hero.title,
      description: t.meta.description,
      inLanguage: locale,
      url,
      datePublished: SITE.symposiumDate,
      keywords: t.abstract.keywords.join(", "),
      author: STUDENTS.map((s) => ({ "@type": "Person", name: s.name, affiliation: faculty })),
      contributor: SUPERVISORS.map((s) => ({ "@type": "Person", name: s.name })),
      publisher: faculty,
      sourceOrganization: faculty,
      image: SITE.url + SITE.poster.full,
      about: ["Energy drinks", "Vital signs", "Cognition", "Caffeine"],
      recordedAt: {
        "@type": "Event",
        name: "4th Annual Student Symposium for Research Projects",
        startDate: SITE.symposiumDate,
        location: faculty,
      },
    },
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      name: t.meta.shortTitle,
      url,
      inLanguage: locale,
      creator: { "@type": "Person", name: DEVELOPER, jobTitle: "Medical Student", affiliation: faculty },
      publisher: faculty,
    },
  ];
}
