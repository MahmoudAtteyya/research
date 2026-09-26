import { Target } from "lucide-react";
import type { Dictionary } from "@/content/i18n";
import { Section } from "../ui/Section";
import { Num } from "../ui/Num";

export function Background({ t }: { t: Dictionary }) {
  const b = t.background;
  return (
    <Section id="background" index={2} kicker={t.sections.background.kicker} title={t.sections.background.title} tone="tint">
      <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="reveal space-y-6 text-lg leading-relaxed text-ink-2 lg:col-span-7">
          {b.intro.map((p, i) => (
            <p
              key={i}
              className={
                i === 0
                  ? "ltr:first-letter:float-left ltr:first-letter:me-3 ltr:first-letter:mt-1 ltr:first-letter:font-display ltr:first-letter:text-[4.25rem] ltr:first-letter:leading-[0.8] ltr:first-letter:font-medium ltr:first-letter:text-accent-ink"
                  : undefined
              }
            >
              {p}
            </p>
          ))}
        </div>

        <div className="space-y-6 lg:col-span-5">
          <div className="reveal rounded-3xl border border-line bg-surface p-7 shadow-card">
            <h3 className="flex items-center gap-2.5 font-display text-2xl font-medium text-ink">
              <Target className="h-5 w-5 text-accent-ink" aria-hidden />
              {b.objectivesTitle}
            </h3>
            <ol className="mt-5 space-y-4">
              {b.objectives.map((o, i) => (
                <li key={o} className="flex gap-3 border-s-2 border-accent ps-4 text-[0.975rem] leading-relaxed text-ink-2">
                  <span className="sr-only">{i + 1}.</span>
                  {o}
                </li>
              ))}
            </ol>
          </div>

          <div className="reveal rounded-3xl border border-line p-7">
            <p className="eyebrow text-muted">{b.contextTitle}</p>
            <dl className="mt-5 divide-y divide-line">
              {b.context.map((c) => (
                <div key={c.label} className="grid grid-cols-[7.5rem_minmax(0,1fr)] items-baseline gap-4 py-3.5 first:pt-0 last:pb-0">
                  <dt className="order-2 text-sm leading-snug text-ink-2">{c.label}</dt>
                  <dd className="order-1 font-display text-[1.75rem] leading-none font-medium text-ink">
                    <Num tabular={false}>{c.value}</Num>
                  </dd>
                </div>
              ))}
            </dl>
            <p className="mt-5 text-xs text-muted">{b.contextSource}</p>
          </div>
        </div>
      </div>
    </Section>
  );
}
