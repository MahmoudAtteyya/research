import Image from "next/image";
import { Activity, Brain, HeartPulse, Tag, TriangleAlert } from "lucide-react";
import type { Dictionary } from "@/content/i18n";
import { SITE } from "@/content/site";
import { Section } from "../ui/Section";
import { GlassCard } from "../ui/GlassCard";

const FINDING_ICONS = [HeartPulse, Activity, Brain, TriangleAlert];
const FINDING_TONES = ["text-accent-ink", "text-accent-ink", "text-pre", "text-gold-ink"];

export function Abstract({ t }: { t: Dictionary }) {
  const a = t.abstract;
  return (
    <Section id="abstract" index={1} kicker={t.sections.abstract.kicker} title={t.sections.abstract.title} glow="crimson">
      {/* Key findings — bento row */}
      <h3 className="sr-only">{a.findingsTitle}</h3>
      <ol className="grid gap-3 sm:grid-cols-2 sm:gap-4 xl:grid-cols-4">
        {a.findings.map((f, i) => {
          const Icon = FINDING_ICONS[i];
          return (
            <GlassCard as="li" key={f} interactive highlight={i === 0} className="reveal flex flex-col gap-5 p-5 sm:p-6">
              <span className="flex items-center justify-between">
                <span className="tnum font-mono text-xs text-muted">{String(i + 1).padStart(2, "0")}</span>
                <span className={`grid h-10 w-10 place-items-center rounded-xl bg-surface-2 ring-1 ring-line ${FINDING_TONES[i]}`}>
                  <Icon className="h-5 w-5" aria-hidden />
                </span>
              </span>
              <p className="text-[1rem] leading-relaxed text-ink" dir="auto">
                {f}
              </p>
            </GlassCard>
          );
        })}
      </ol>

      <div className="mt-6 grid gap-6 lg:grid-cols-12">
        <GlassCard className="reveal p-6 sm:p-9 lg:col-span-8">
          <dl className="divide-y divide-line">
            {a.parts.map((p) => (
              <div key={p.label} className="grid gap-2 py-5 first:pt-0 last:pb-0 sm:grid-cols-[8.5rem_minmax(0,1fr)] sm:gap-8">
                <dt className="eyebrow pt-1 text-accent-ink">{p.label}</dt>
                <dd className="text-[1.0625rem] leading-relaxed text-ink-2">{p.text}</dd>
              </div>
            ))}
          </dl>
        </GlassCard>

        <div className="grid gap-6 lg:col-span-4 lg:content-start">
          <GlassCard className="reveal p-6 sm:p-7">
            <p className="eyebrow flex items-center gap-2 text-muted">
              <Tag className="h-3.5 w-3.5" aria-hidden />
              {a.keywordsLabel}
            </p>
            <ul className="mt-4 flex flex-wrap gap-2">
              {a.keywords.map((k) => (
                <li key={k} className="rounded-full border border-line-strong bg-surface-2/60 px-3.5 py-1.5 text-sm text-ink-2">
                  {k}
                </li>
              ))}
            </ul>
          </GlassCard>
          <GlassCard highlight className="reveal flex items-center gap-4 p-6 sm:p-7 [--glow-gradient:linear-gradient(135deg,var(--gold),transparent_60%)]">
            <span className="grid h-16 w-16 shrink-0 place-items-center rounded-2xl bg-white p-1.5">
              <Image src={SITE.brand.symposium} alt={t.brand.symposiumAlt} width={500} height={500} sizes="56px" className="h-full w-full object-contain" />
            </span>
            <p className="text-sm leading-snug text-ink-2">
              <span className="block font-semibold text-ink">{t.hero.symposium}</span>
              <span className="mt-0.5 block text-muted">
                {t.brand.facultyUniversity} · {t.hero.date}
              </span>
            </p>
          </GlassCard>
        </div>
      </div>
    </Section>
  );
}
