import Image from "next/image";
import { Download, MonitorPlay } from "lucide-react";
import type { Dictionary } from "@/content/i18n";
import { NAV_IDS, SITE, localePath, type Locale } from "@/content/site";
import { DEVELOPER } from "@/content/people";
import { CrestPlate } from "../ui/CrestPlate";
import { Monogram } from "../ui/Monogram";

export function SiteFooter({ t, locale }: { t: Dictionary; locale: Locale }) {
  const f = t.footer;
  const other: Locale = locale === "ar" ? "en" : "ar";
  return (
    <footer className="relative isolate overflow-hidden bg-navy-950 text-white">
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-ecg opacity-50 [mask-image:linear-gradient(to_bottom,#000,transparent_70%)]" />
      </div>

      {/* Institution band */}
      <div className="border-b border-white/10">
      <div className="container-page py-16 sm:py-20">
        <div className="grid items-center gap-10 lg:grid-cols-12">
          <div className="flex items-center gap-5 lg:col-span-8">
            <div className="flex shrink-0 -space-x-3 rtl:space-x-reverse">
              <CrestPlate src={SITE.brand.university} alt={t.brand.universityAlt} size={72} />
              <CrestPlate src={SITE.brand.faculty} alt={t.brand.facultyAlt} size={72} />
            </div>
            <div>
              <p className="text-sm text-mist/75">{f.institutionLead}</p>
              <p className="mt-1 font-display text-2xl leading-tight font-medium sm:text-[2rem]">{f.institution}</p>
            </div>
          </div>
          <div className="flex items-center gap-4 lg:col-span-4 lg:justify-end">
            <span className="inline-grid h-16 w-16 shrink-0 place-items-center rounded-2xl bg-white p-1.5">
              <Image src={SITE.brand.symposium} alt={t.brand.symposiumAlt} width={500} height={500} sizes="56px" className="h-full w-full object-contain" />
            </span>
            <p className="max-w-[16rem] text-sm leading-snug text-mist/80">{f.presentedAt}</p>
          </div>
        </div>
      </div>
      </div>

      {/* Links */}
      <div className="container-page grid gap-10 py-14 sm:grid-cols-3">
        <div>
          <p className="eyebrow text-gold-300">{f.studyTitle}</p>
          <ul className="mt-4 space-y-2 text-sm text-mist/80">
            {f.studyLines.map((l) => (
              <li key={l}>{l}</li>
            ))}
          </ul>
        </div>
        <div>
          <p className="eyebrow text-gold-300">{f.exploreTitle}</p>
          <ul className="mt-4 grid grid-cols-2 gap-x-6 gap-y-2 text-sm">
            {NAV_IDS.map((id) => (
              <li key={id}>
                <a href={`#${id}`} className="text-mist/80 transition-colors hover:text-white">
                  {t.nav[id]}
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="eyebrow text-gold-300">{f.moreTitle}</p>
          <ul className="mt-4 space-y-2 text-sm">
            <li>
              <a href="/presentation" className="inline-flex items-center gap-2 text-mist/80 hover:text-white">
                <MonitorPlay className="h-4 w-4" aria-hidden />
                {t.nav.presentation}
              </a>
            </li>
            <li>
              <a href={SITE.poster.download} download className="inline-flex items-center gap-2 text-mist/80 hover:text-white">
                <Download className="h-4 w-4" aria-hidden />
                {t.poster.download}
              </a>
            </li>
            <li>
              <a href={localePath(other)} hrefLang={t.lang.hrefLang} lang={t.lang.hrefLang} className="text-mist/80 hover:text-white">
                {t.lang.switchLabel}
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* Colophon — developer signature */}
      <div className="border-t border-white/10">
        <div className="container-page flex flex-col gap-8 py-10 md:flex-row md:items-center md:justify-between">
          <div className="text-xs leading-relaxed text-mist/60">
            <p>{f.copyright}</p>
            <p className="mt-1">{f.disclaimer}</p>
          </div>

          <div className="flex items-center gap-4">
            <Monogram className="h-[4.5rem] w-[4.5rem] shrink-0" idSuffix={locale} />
            <div className="leading-tight">
              <p className="eyebrow text-[0.6875rem] text-mist/60">{f.madeBy}</p>
              <p className={"mt-1.5 font-display text-[1.75rem] leading-none text-gold-300" + (locale === "ar" ? "" : " italic")}>
                {locale === "ar" ? f.developerName : DEVELOPER}
              </p>
              {locale === "ar" ? (
                <p className="mt-1 font-display text-sm text-gold-300/70 italic" lang="en" dir="ltr">
                  {DEVELOPER}
                </p>
              ) : null}
              <p className="mt-1.5 text-xs text-mist/65">{f.developerTitle}</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
