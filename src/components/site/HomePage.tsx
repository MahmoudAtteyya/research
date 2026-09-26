import type { Locale } from "@/content/site";
import { getDictionary } from "@/content/i18n";
import { buildJsonLd } from "@/lib/jsonld";
import { SiteHeader } from "./layout/SiteHeader";
import { SiteFooter } from "./layout/SiteFooter";
import { Hero } from "./sections/Hero";
import { Abstract } from "./sections/Abstract";
import { Background } from "./sections/Background";
import { Methods } from "./sections/Methods";
import { Results } from "./sections/Results";
import { Discussion } from "./sections/Discussion";
import { Conclusion } from "./sections/Conclusion";
import { QuizSection } from "./sections/QuizSection";
import { Team } from "./sections/Team";
import { PosterAndCite } from "./sections/PosterAndCite";
import { ConsoleSignature } from "./interactive/ConsoleSignature";
import { BackToTop } from "./interactive/BackToTop";

export function HomePage({ locale }: { locale: Locale }) {
  const t = getDictionary(locale);
  const jsonLd = buildJsonLd(locale);
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
      />
      <SiteHeader locale={locale} brand={t.brand} nav={t.nav} a11y={t.a11y} lang={t.lang} />
      <main id="main" tabIndex={-1} className="outline-none">
        <Hero t={t} />
        <Abstract t={t} />
        <Background t={t} />
        <Methods t={t} />
        <Results t={t} />
        <Discussion t={t} />
        <Conclusion t={t} />
        <QuizSection t={t} />
        <Team t={t} />
        <PosterAndCite t={t} />
      </main>
      <SiteFooter t={t} locale={locale} />
      <BackToTop label={t.a11y.backToTop} />
      <ConsoleSignature />
    </>
  );
}
