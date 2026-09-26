import { BookOpen, HeartPulse, Brain, Focus } from "lucide-react";
import type { Dictionary } from "@/content/i18n";
import { Section } from "../ui/Section";

const ICONS = [HeartPulse, Brain, Focus];

export function Discussion({ t }: { t: Dictionary }) {
  const d = t.discussion;
  return (
    <Section id="discussion" index={5} kicker={t.sections.discussion.kicker} title={t.sections.discussion.title}>
      <blockquote className="reveal max-w-4xl border-s-4 border-accent ps-6 font-display text-2xl leading-snug font-medium text-ink sm:ps-8 sm:text-[2rem]">
        {d.lead}
      </blockquote>

      <div className="mt-16">
        <h3 className="reveal font-display text-2xl font-medium text-ink">{d.compareTitle}</h3>
        <ul className="mt-6 grid gap-5 lg:grid-cols-3">
          {d.rows.map((row, i) => {
            const Icon = ICONS[i];
            return (
              <li key={row.topic} className="reveal flex flex-col rounded-3xl border border-line bg-surface p-7 shadow-card">
                <p className="flex items-center gap-3">
                  <span className="inline-grid h-10 w-10 place-items-center rounded-xl bg-surface-2 text-accent-ink">
                    <Icon className="h-5 w-5" aria-hidden />
                  </span>
                  <span className="font-display text-xl font-medium text-ink">{row.topic}</span>
                </p>
                <dl className="mt-6 flex flex-1 flex-col gap-5">
                  <div>
                    <dt className="eyebrow text-accent-ink">{d.ours}</dt>
                    <dd className="mt-1.5 text-[0.9375rem] leading-relaxed text-ink">{row.ours}</dd>
                  </div>
                  <div className="mt-auto border-t border-line pt-5">
                    <dt className="eyebrow flex items-center gap-1.5 text-muted">
                      <BookOpen className="h-3.5 w-3.5" aria-hidden />
                      {d.literature}
                    </dt>
                    <dd className="mt-1.5 text-[0.9375rem] leading-relaxed text-ink-2">{row.literature}</dd>
                  </div>
                </dl>
              </li>
            );
          })}
        </ul>
      </div>

      <div className="mt-16 grid gap-8 lg:grid-cols-12">
        <h3 className="reveal font-display text-2xl font-medium text-ink lg:col-span-3">{d.limitationsTitle}</h3>
        <ol className="grid gap-5 sm:grid-cols-3 lg:col-span-9">
          {d.limitations.map((l, i) => (
            <li key={l.title} className="reveal border-t-2 border-ink pt-4">
              <p className="tnum text-xs font-semibold text-muted">{String(i + 1).padStart(2, "0")}</p>
              <p className="mt-1 font-semibold text-ink">{l.title}</p>
              <p className="mt-1.5 text-[0.9375rem] leading-relaxed text-ink-2">{l.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </Section>
  );
}
