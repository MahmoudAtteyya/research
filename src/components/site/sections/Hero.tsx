import { ArrowDown, Brain, CalendarDays, GraduationCap, HeartPulse, MonitorPlay, Timer, Users } from "lucide-react";
import { SITE } from "@/content/site";
import type { Dictionary } from "@/content/i18n";
import { CrestPlate } from "../ui/CrestPlate";
import { btn } from "../ui/buttons";
import { VitalMonitor } from "../interactive/VitalMonitor";
import { CountUp } from "../interactive/CountUp";

const STAT_ICONS = [Users, HeartPulse, Timer, Brain];
const ARABIC = /[\u0600-\u06FF]/;

/** A long ECG trace used as a decorative baseline across the hero. */
function heroTrace() {
  const beat = (x: number) =>
    `L${x} 90 L${x + 28} 90 Q${x + 34} 80 ${x + 40} 90 L${x + 52} 90 L${x + 56} 98 L${x + 62} 36 L${x + 68} 108 L${x + 73} 84 L${x + 92} 90 Q${x + 104} 72 ${x + 118} 90`;
  let d = "M0 90";
  for (let x = 40; x < 1600; x += 230) d += " " + beat(x);
  return d + " L1600 90";
}
const TRACE = heroTrace();

export function Hero({ t }: { t: Dictionary }) {
  const words = t.hero.title.split(" ");
  return (
    <section aria-labelledby="study-title" className="relative isolate overflow-hidden bg-navy-975 text-white">
      {/* Backdrop: aurora glows, ECG paper and a travelling ECG pulse */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="aurora-a absolute -top-1/4 -end-1/4 h-[70vmax] w-[70vmax] rounded-full bg-[radial-gradient(closest-side,rgb(200_16_46/0.32),transparent)]" />
        <div className="aurora-b absolute -bottom-1/3 -start-1/4 h-[70vmax] w-[70vmax] rounded-full bg-[radial-gradient(closest-side,rgb(61_106_168/0.3),transparent)]" />
        <div className="absolute top-1/3 start-1/3 h-[40vmax] w-[40vmax] rounded-full bg-[radial-gradient(closest-side,rgb(227_200_104/0.08),transparent)]" />
        <div className="absolute inset-0 bg-ecg [mask-image:radial-gradient(ellipse_80%_70%_at_60%_40%,#000_25%,transparent_80%)]" />
        <svg viewBox="0 0 1600 140" preserveAspectRatio="none" className="absolute inset-x-0 bottom-24 h-28 w-full opacity-70 sm:bottom-32 lg:bottom-40">
          <defs>
            <linearGradient id="hero-pulse" x1="0" x2="1">
              <stop offset="0%" stopColor="#f0506a" stopOpacity="0" />
              <stop offset="50%" stopColor="#f0506a" />
              <stop offset="100%" stopColor="#e3c868" />
            </linearGradient>
          </defs>
          <path d={TRACE} fill="none" stroke="rgb(255 255 255 / 0.07)" strokeWidth="1.5" vectorEffect="non-scaling-stroke" />
          <path
            d={TRACE}
            pathLength={1}
            className="ecg-pulse"
            fill="none"
            stroke="url(#hero-pulse)"
            strokeWidth="2"
            strokeLinecap="round"
            vectorEffect="non-scaling-stroke"
            style={{ filter: "drop-shadow(0 0 6px rgb(240 80 106 / 0.8))" }}
          />
        </svg>
        <div className="absolute inset-x-0 bottom-0 h-40 bg-linear-to-b from-transparent to-navy-975" />
      </div>

      <div className="container-page pt-[calc(var(--header-h)+2.5rem)] pb-16 sm:pt-[calc(var(--header-h)+4rem)] sm:pb-20 lg:pt-[calc(var(--header-h)+5rem)] lg:pb-24">
        <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-10 xl:gap-16">
          <div className="min-w-0 lg:col-span-7">
            <div className="flex flex-wrap items-center gap-2.5">
              <p className="enter inline-flex max-w-full items-center gap-3 rounded-[1.25rem] border border-white/10 bg-white/[0.04] py-1.5 ps-1.5 pe-4 text-sm text-white/85 sm:rounded-full" style={{ ["--d" as string]: "0ms" }}>
                <span className="flex shrink-0 -space-x-2 rtl:space-x-reverse">
                  <CrestPlate src={SITE.brand.university} alt={t.brand.universityAlt} size={30} preload />
                  <CrestPlate src={SITE.brand.faculty} alt={t.brand.facultyAlt} size={30} preload />
                </span>
                <span className="min-w-0 font-medium leading-snug">{t.brand.facultyUniversity}</span>
              </p>
              <p
                className="enter inline-flex max-w-full flex-wrap items-center gap-x-2 gap-y-0.5 rounded-[1.25rem] border border-gold-300/25 bg-gold-300/[0.07] px-4 py-2 text-[0.8125rem] font-medium text-gold-300 sm:rounded-full"
                style={{ ["--d" as string]: "80ms" }}
              >
                <CalendarDays className="h-4 w-4 shrink-0" aria-hidden />
                <span className="min-w-0">{t.hero.symposium}</span>
                <span aria-hidden className="hidden text-gold-300/50 sm:inline">
                  ·
                </span>
                <time dateTime={SITE.symposiumDate}>{t.hero.date}</time>
              </p>
            </div>

            <p className="eyebrow enter mt-10 text-mist/70" style={{ ["--d" as string]: "160ms" }}>
              {t.hero.eyebrow}
            </p>
            <h1 id="study-title" className="mt-5 text-display-1 text-white">
              {words.map((w, i) => (
                <span key={i}>
                  <span className="enter text-gradient inline-block pb-[0.08em]" style={{ ["--d" as string]: `${220 + i * 55}ms` }}>
                    {w}
                  </span>
                  {i < words.length - 1 ? " " : null}
                </span>
              ))}
            </h1>
            <p
              className="enter mt-7 max-w-2xl text-lg leading-relaxed text-mist sm:text-xl"
              style={{ ["--d" as string]: `${300 + words.length * 55}ms` }}
            >
              {t.hero.subtitle}
            </p>

            <p
              className="enter mt-7 flex max-w-2xl items-start gap-3 text-[0.9375rem] leading-relaxed text-white/80"
              style={{ ["--d" as string]: `${380 + words.length * 55}ms` }}
            >
              <span className="mt-0.5 grid h-7 w-7 shrink-0 place-items-center rounded-full bg-gold-300/10 ring-1 ring-gold-300/30">
                <GraduationCap className="h-4 w-4 text-gold-300" aria-hidden />
              </span>
              <span>
                {t.hero.bylineLead} <strong className="font-semibold text-white">{t.hero.byline}</strong>
                <span className="text-white/50"> · </span>
                {t.hero.classOf}
              </span>
            </p>

            <div className="enter mt-10 flex flex-wrap items-center gap-3" style={{ ["--d" as string]: `${460 + words.length * 55}ms` }}>
              <a href="#abstract" className={btn.primary}>
                {t.hero.ctaPrimary}
                <ArrowDown className="h-4 w-4 transition-transform duration-300 group-hover:translate-y-0.5" aria-hidden />
              </a>
              <a href="/presentation" className={btn.ghostDark}>
                <MonitorPlay className="h-4 w-4" aria-hidden />
                {t.hero.ctaSecondary}
              </a>
            </div>
          </div>

          <div className="enter min-w-0 lg:col-span-5" style={{ ["--d" as string]: "450ms" }}>
            <VitalMonitor t={t.monitor} />
          </div>
        </div>

        <dl className="mt-16 grid grid-cols-2 gap-3 sm:gap-4 lg:mt-24 lg:grid-cols-4">
          {t.hero.stats.map((s, i) => {
            const Icon = STAT_ICONS[i];
            return (
              <div
                key={s.label}
                className="reveal glass-card card-hover flex flex-col-reverse justify-end gap-2 rounded-2xl p-4 sm:rounded-3xl sm:p-6"
              >
                <dt className="text-sm leading-snug text-mist/75">{s.label}</dt>
                <dd className="flex items-center justify-between gap-3">
                  <span className="text-[1.9rem] leading-none font-semibold tracking-tight text-white sm:text-5xl">
                    <bdi dir={ARABIC.test(s.value) ? undefined : "ltr"}>
                      <CountUp value={s.value} className="tnum" />
                    </bdi>
                  </span>
                  <span aria-hidden className="hidden h-10 w-10 shrink-0 place-items-center rounded-xl bg-white/[0.05] text-mist/80 ring-1 ring-white/10 sm:grid">
                    <Icon className="h-5 w-5" />
                  </span>
                </dd>
              </div>
            );
          })}
        </dl>

        <p className="scroll-cue mt-12 hidden items-center justify-center gap-2 text-xs text-mist/50 lg:[@media(min-height:820px)]:flex" aria-hidden>
          <ArrowDown className="h-4 w-4" />
          <span className="font-mono tracking-[0.14em] uppercase">{t.a11y.scroll}</span>
        </p>
      </div>
    </section>
  );
}
