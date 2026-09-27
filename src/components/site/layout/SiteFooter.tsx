import Image from "next/image";
import { ArrowUpRight, Download, MonitorPlay } from "lucide-react";
import type { Dictionary } from "@/content/i18n";
import { NAV_IDS, SITE, localePath, type Locale } from "@/content/site";
import { DEVELOPER } from "@/content/people";
import { CrestPlate } from "../ui/CrestPlate";
import { Monogram } from "../ui/Monogram";

const linkClass = "inline-flex min-h-11 items-center gap-2 rounded-lg text-mist/75 transition-colors hover:text-white lg:min-h-9";

export function SiteFooter({ t, locale }: { t: Dictionary; locale: Locale }) {
  const f = t.footer;
  const other: Locale = locale === "ar" ? "en" : "ar";
  return (
    <footer className="relative isolate overflow-hidden bg-navy-975 text-white">
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="hairline-x absolute inset-x-0 top-0" />
        <div className="absolute inset-0 bg-ecg opacity-50 [mask-image:linear-gradient(to_bottom,#000,transparent_70%)]" />
        <div className="absolute -bottom-40 start-1/2 h-[28rem] w-[60rem] max-w-full -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,rgb(227_200_104/0.12),transparent)] rtl:translate-x-1/2" />
      </div>

      {/* Institution band */}
      <div className="container-page pt-16 pb-12 sm:pt-24 sm:pb-16">
        <div className="grid items-center gap-10 lg:grid-cols-12">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-center lg:col-span-8">
            <div className="flex shrink-0 -space-x-3 rtl:space-x-reverse">
              <CrestPlate src={SITE.brand.university} alt={t.brand.universityAlt} size={76} />
              <CrestPlate src={SITE.brand.faculty} alt={t.brand.facultyAlt} size={76} />
            </div>
            <div>
              <p className="text-sm text-mist/70">{f.institutionLead}</p>
              <p className="mt-1.5 type-display-3 text-white sm:text-[2.25rem]">{f.institution}</p>
            </div>
          </div>
          <div className="flex items-center gap-4 rounded-2xl border border-white/10 bg-white/[0.03] p-4 lg:col-span-4">
            <span className="inline-grid h-16 w-16 shrink-0 place-items-center rounded-xl bg-white p-1.5">
              <Image src={SITE.brand.symposium} alt={t.brand.symposiumAlt} width={500} height={500} sizes="56px" className="h-full w-full object-contain" />
            </span>
            <p className="text-sm leading-snug text-mist/80">{f.presentedAt}</p>
          </div>
        </div>
      </div>

      <div aria-hidden className="container-page">
        <div className="hairline-x" />
      </div>

      {/* Links */}
      <div className="container-page grid gap-10 py-12 sm:grid-cols-3 sm:py-14">
        <div>
          <p className="eyebrow text-gold-300">{f.studyTitle}</p>
          <ul className="mt-4 space-y-2.5 text-sm text-mist/75">
            {f.studyLines.map((l) => (
              <li key={l}>{l}</li>
            ))}
          </ul>
        </div>
        <nav aria-label={f.exploreTitle}>
          <p className="eyebrow text-gold-300">{f.exploreTitle}</p>
          <ul className="mt-3 grid grid-cols-2 gap-x-6 text-sm">
            {NAV_IDS.map((id) => (
              <li key={id}>
                <a href={`#${id}`} className={linkClass}>
                  {t.nav[id]}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <div>
          <p className="eyebrow text-gold-300">{f.moreTitle}</p>
          <ul className="mt-3 text-sm">
            <li>
              <a href="/presentation" className={linkClass}>
                <MonitorPlay className="h-4 w-4" aria-hidden />
                {t.nav.presentation}
              </a>
            </li>
            <li>
              <a href={SITE.poster.download} download className={linkClass}>
                <Download className="h-4 w-4" aria-hidden />
                {t.poster.download}
              </a>
            </li>
            <li>
              <a href={localePath(other)} hrefLang={t.lang.hrefLang} className={linkClass}>
                <ArrowUpRight className="h-4 w-4 rtl:-scale-x-100" aria-hidden />
                <span lang={t.lang.hrefLang}>{t.lang.switchLabel}</span>
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* Colophon — developer signature */}
      <div className="border-t border-white/[0.08] bg-black/20">
        <div className="container-page flex flex-col-reverse gap-8 py-10 md:flex-row md:items-center md:justify-between">
          <div className="text-xs leading-relaxed text-mist/55">
            <p>{f.copyright}</p>
            <p className="mt-1">{f.disclaimer}</p>
          </div>

          <div className="flex items-center gap-4 sm:gap-5">
            <Monogram className="h-20 w-20 shrink-0 drop-shadow-[0_0_18px_rgb(227_200_104/0.35)]" idSuffix={locale} />
            <div className="leading-tight">
              <p className="eyebrow text-mist/55">{f.madeBy}</p>
              {locale === "ar" ? (
                <>
                  <p className="mt-2 text-[1.75rem] leading-none font-semibold text-gold-300 [font-family:var(--font-heading)]">{f.developerName}</p>
                  <p className="type-signature mt-1 text-base text-gold-300/70" lang="en" dir="ltr">
                    {DEVELOPER}
                  </p>
                </>
              ) : (
                <p className="type-signature mt-2 text-[2rem] leading-none text-gold-300">{DEVELOPER}</p>
              )}
              <p className="mt-2 text-xs text-mist/65">{f.developerTitle}</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
