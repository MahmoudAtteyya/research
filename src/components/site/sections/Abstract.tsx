import type { Dictionary } from "@/content/i18n";
import { Section } from "../ui/Section";

export function Abstract({ t }: { t: Dictionary }) {
  const a = t.abstract;
  return (
    <Section id="abstract" index={1} kicker={t.sections.abstract.kicker} title={t.sections.abstract.title}>
      <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
        <dl className="reveal divide-y divide-line border-y border-line lg:col-span-7">
          {a.parts.map((p) => (
            <div key={p.label} className="grid gap-2 py-6 sm:grid-cols-[8.5rem_minmax(0,1fr)] sm:gap-8">
              <dt className="eyebrow pt-1 text-accent-ink">{p.label}</dt>
              <dd className="text-[1.0625rem] leading-relaxed text-ink-2">{p.text}</dd>
            </div>
          ))}
        </dl>

        <aside className="lg:col-span-5">
          <div className="reveal rounded-3xl border border-line bg-surface p-7 shadow-card sm:p-8 lg:sticky lg:top-[calc(var(--header-h)+1.5rem)]">
            <h3 className="font-display text-[1.75rem] font-medium text-ink">{a.findingsTitle}</h3>
            <ol className="mt-6 space-y-5">
              {a.findings.map((f, i) => (
                <li key={f} className="grid grid-cols-[2rem_minmax(0,1fr)] gap-3">
                  <span aria-hidden className="tnum font-display text-2xl leading-none text-accent-ink">
                    {i + 1}
                  </span>
                  <p className="text-[0.9875rem] leading-relaxed text-ink-2" dir="auto">
                    {f}
                  </p>
                </li>
              ))}
            </ol>
            <div className="mt-8 border-t border-line pt-6">
              <p className="eyebrow text-muted">{a.keywordsLabel}</p>
              <ul className="mt-3 flex flex-wrap gap-2">
                {a.keywords.map((k) => (
                  <li key={k} className="rounded-full border border-line-strong px-3 py-1 text-sm text-ink-2">
                    {k}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </aside>
      </div>
    </Section>
  );
}
