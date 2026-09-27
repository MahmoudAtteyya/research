import { BookOpen, Brain, Focus, HeartPulse, Quote } from "lucide-react";
import type { Dictionary } from "@/content/i18n";
import { Section } from "../ui/Section";
import { GlassCard } from "../ui/GlassCard";

const ICONS = [HeartPulse, Brain, Focus];
const TONES = [
  "bg-accent/10 text-accent-ink ring-accent/25",
  "bg-pre/10 text-pre ring-pre/25",
  "bg-gold/10 text-gold-ink ring-gold/25",
];

export function Discussion({ t }: { t: Dictionary }) {
  const d = t.discussion;
  return (
    <Section id="discussion" index={5} kicker={t.sections.discussion.kicker} title={t.sections.discussion.title} glow="gold" glowSide="start">
      <figure className="reveal relative max-w-5xl">
        <Quote aria-hidden className="absolute -top-2 -start-1 h-10 w-10 text-accent/30 sm:-start-3 sm:h-14 sm:w-14 rtl:-scale-x-100" />
        <blockquote className="ink-gradient ps-10 text-[1.5rem] leading-snug font-semibold tracking-tight sm:ps-16 sm:text-[2.1rem] lg:text-[2.5rem]">
          {d.lead}
        </blockquote>
      </figure>

      <div className="mt-16">
        <h3 className="reveal type-display-3 text-ink">{d.compareTitle}</h3>
        <ul className="mt-6 grid gap-4 lg:grid-cols-3">
          {d.rows.map((row, i) => {
            const Icon = ICONS[i];
            return (
              <GlassCard as="li" key={row.topic} interactive highlight={i === 0} className="reveal flex flex-col p-6 sm:p-7">
                <p className="flex items-center gap-3">
                  <span className={`inline-grid h-11 w-11 shrink-0 place-items-center rounded-xl ring-1 ${TONES[i]}`}>
                    <Icon className="h-5 w-5" aria-hidden />
                  </span>
                  <span className="text-lg font-semibold tracking-tight text-ink">{row.topic}</span>
                </p>
                <dl className="mt-6 flex flex-1 flex-col gap-5">
                  <div>
                    <dt className="eyebrow text-accent-ink">{d.ours}</dt>
                    <dd className="mt-2 text-[0.9875rem] leading-relaxed text-ink">{row.ours}</dd>
                  </div>
                  <div className="mt-auto border-t border-line pt-5">
                    <dt className="eyebrow flex items-center gap-1.5 text-muted">
                      <BookOpen className="h-3.5 w-3.5" aria-hidden />
                      {d.literature}
                    </dt>
                    <dd className="mt-2 text-[0.9375rem] leading-relaxed text-ink-2">{row.literature}</dd>
                  </div>
                </dl>
              </GlassCard>
            );
          })}
        </ul>
      </div>

      <div className="mt-16 grid gap-6 lg:grid-cols-12">
        <h3 className="reveal type-display-3 text-ink lg:col-span-3">{d.limitationsTitle}</h3>
        <ol className="grid gap-4 sm:grid-cols-3 lg:col-span-9">
          {d.limitations.map((l, i) => (
            <GlassCard as="li" key={l.title} className="reveal p-5 sm:p-6">
              <p className="tnum font-mono text-xs text-muted">{String(i + 1).padStart(2, "0")}</p>
              <p className="mt-2 font-semibold text-ink">{l.title}</p>
              <p className="mt-1.5 text-[0.9375rem] leading-relaxed text-ink-2">{l.text}</p>
            </GlassCard>
          ))}
        </ol>
      </div>
    </Section>
  );
}
