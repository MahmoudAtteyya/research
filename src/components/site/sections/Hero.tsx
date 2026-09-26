import { ArrowDown, CalendarDays, GraduationCap, MonitorPlay } from "lucide-react";
import { SITE } from "@/content/site";
import type { Dictionary } from "@/content/i18n";
import { CrestPlate } from "../ui/CrestPlate";
import { Num } from "../ui/Num";
import { btn } from "../ui/buttons";
import { VitalMonitor } from "../interactive/VitalMonitor";

export function Hero({ t }: { t: Dictionary }) {
  return (
    <section aria-labelledby="study-title" className="relative isolate overflow-hidden bg-navy-900 text-white">
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-ecg [mask-image:radial-gradient(ellipse_75%_65%_at_65%_40%,#000_20%,transparent_78%)]" />
        <div className="absolute -top-48 -end-40 h-[38rem] w-[38rem] rounded-full bg-crimson-600/20 blur-[130px]" />
        <div className="absolute -bottom-56 -start-40 h-[34rem] w-[34rem] rounded-full bg-[#3d6aa8]/25 blur-[130px]" />
        <div className="absolute inset-x-0 bottom-0 h-px bg-linear-to-r from-transparent via-white/15 to-transparent" />
      </div>

      <div className="container-page pt-[calc(var(--header-h)+3rem)] pb-14 sm:pb-20 lg:pt-[calc(var(--header-h)+4.5rem)]">
        <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-7">
            <div className="flex flex-wrap items-center gap-x-5 gap-y-4">
              <div className="flex -space-x-2.5 rtl:space-x-reverse">
                <CrestPlate src={SITE.brand.university} alt={t.brand.universityAlt} size={54} preload />
                <CrestPlate src={SITE.brand.faculty} alt={t.brand.facultyAlt} size={54} preload />
              </div>
              <div className="border-s border-white/15 ps-5 leading-snug">
                <p className="font-display text-xl font-medium text-white">{t.brand.faculty}</p>
                <p className="text-sm text-mist/80">{t.brand.university}</p>
              </div>
            </div>

            <p className="mt-9 inline-flex max-w-full flex-wrap items-center gap-x-2 gap-y-1 rounded-2xl border border-gold-300/30 bg-gold-300/[0.08] px-3.5 py-2 text-[0.8125rem] font-medium text-gold-300">
              <CalendarDays className="h-4 w-4 shrink-0" aria-hidden />
              <span>{t.hero.symposium}</span>
              <span aria-hidden className="text-gold-300/50">
                ·
              </span>
              <time dateTime={SITE.symposiumDate}>
                <Num tabular={false}>{t.hero.date}</Num>
              </time>
            </p>

            <p className="eyebrow mt-8 text-mist/70">{t.hero.eyebrow}</p>
            <h1
              id="study-title"
              className="mt-4 font-display text-[2.05rem] leading-[1.08] font-medium text-white sm:text-[3.2rem] lg:text-[3.15rem] xl:text-[3.45rem]"
            >
              {t.hero.title}
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-mist sm:text-xl">{t.hero.subtitle}</p>

            <p className="mt-7 flex max-w-2xl items-start gap-3 text-[0.9375rem] leading-relaxed text-white/80">
              <GraduationCap className="mt-0.5 h-5 w-5 shrink-0 text-gold-300" aria-hidden />
              <span>
                {t.hero.bylineLead} <strong className="font-semibold text-white">{t.hero.byline}</strong>
                <span className="text-white/50"> · </span>
                <Num tabular={false}>{t.hero.classOf}</Num>
              </span>
            </p>

            <div className="mt-9 flex flex-wrap items-center gap-3">
              <a href="#abstract" className={btn.primary}>
                {t.hero.ctaPrimary}
                <ArrowDown className="h-4 w-4" aria-hidden />
              </a>
              <a href="/presentation" className={btn.ghostDark}>
                <MonitorPlay className="h-4 w-4" aria-hidden />
                {t.hero.ctaSecondary}
              </a>
            </div>
          </div>

          <div className="lg:col-span-5">
            <VitalMonitor t={t.monitor} />
          </div>
        </div>

        <dl className="mt-14 grid grid-cols-2 overflow-hidden rounded-2xl border border-white/10 lg:mt-20 lg:grid-cols-4">
          {t.hero.stats.map((s, i) => (
            <div
              key={s.label}
              className={
                "flex flex-col-reverse gap-1 px-5 py-5 sm:px-7 sm:py-6 " +
                (i % 2 === 1 ? "border-s border-white/10 " : "") +
                (i >= 2 ? "border-t border-white/10 lg:border-t-0 " : "") +
                (i === 2 ? "lg:border-s " : "")
              }
            >
              <dt className="text-sm leading-snug text-mist/80">{s.label}</dt>
              <dd className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">
                <Num tabular={false}>{s.value}</Num>
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
