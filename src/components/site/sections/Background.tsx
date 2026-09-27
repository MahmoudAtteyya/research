import { Target } from "lucide-react";
import type { Dictionary } from "@/content/i18n";
import { Section } from "../ui/Section";
import { GlassCard } from "../ui/GlassCard";
import { CountUp } from "../interactive/CountUp";

const ARABIC = /[؀-ۿ]/;

export function Background({ t }: { t: Dictionary }) {
  const b = t.background;
  return (
    <Section
      id="background"
      index={2}
      kicker={t.sections.background.kicker}
      title={t.sections.background.title}
      tone="tint"
      glow="blue"
      glowSide="start"
    >
      <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
        <div className="reveal space-y-6 text-lg leading-relaxed text-ink-2 sm:text-[1.1875rem] lg:col-span-7">
          {b.intro.map((p, i) => (
            <p key={i} className={i === 0 ? "text-ink" : undefined}>
              {p}
            </p>
          ))}
        </div>

        <GlassCard highlight className="reveal p-6 sm:p-8 lg:col-span-5">
          <h3 className="flex items-center gap-3 type-display-3 text-ink">
            <span className="grid h-10 w-10 place-items-center rounded-xl bg-accent/10 text-accent-ink ring-1 ring-accent/25">
              <Target className="h-5 w-5" aria-hidden />
            </span>
            {b.objectivesTitle}
          </h3>
          <ol className="mt-6 space-y-4">
            {b.objectives.map((o, i) => (
              <li key={o} className="grid grid-cols-[2rem_minmax(0,1fr)] gap-3 text-[0.975rem] leading-relaxed text-ink-2">
                <span aria-hidden className="tnum pt-0.5 font-mono text-xs text-accent-ink">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span>{o}</span>
              </li>
            ))}
          </ol>
        </GlassCard>
      </div>

      <div className="mt-12">
        <p className="reveal eyebrow text-muted">{b.contextTitle}</p>
        <dl className="mt-5 grid gap-3 sm:grid-cols-3 sm:gap-4">
          {b.context.map((c) => (
            <GlassCard key={c.label} interactive className="reveal flex flex-col-reverse justify-end gap-3 p-6 sm:p-7">
              <dt className="text-sm leading-snug text-ink-2">{c.label}</dt>
              <dd className="text-[2.25rem] leading-none font-semibold tracking-tight text-ink sm:text-5xl">
                <bdi dir={ARABIC.test(c.value) ? undefined : "ltr"}>
                  <CountUp value={c.value} className="tnum" />
                </bdi>
              </dd>
            </GlassCard>
          ))}
        </dl>
        <p className="mt-4 text-xs text-muted">{b.contextSource}</p>
      </div>
    </Section>
  );
}
