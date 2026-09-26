import type { Dictionary } from "@/content/i18n";
import { SectionHeader } from "../ui/Section";

export function Conclusion({ t }: { t: Dictionary }) {
  const c = t.conclusion;
  return (
    <section id="conclusion" aria-labelledby="conclusion-title" className="relative isolate overflow-hidden bg-navy-900 py-20 text-white sm:py-28">
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-ecg opacity-60 [mask-image:linear-gradient(to_bottom,#000,transparent_85%)]" />
        <div className="absolute -top-40 start-1/3 h-[30rem] w-[30rem] rounded-full bg-crimson-600/15 blur-[120px]" />
      </div>
      <div className="container-page">
        <SectionHeader id="conclusion" index={6} kicker={t.sections.conclusion.kicker} title={t.sections.conclusion.title} tone="onDark" />
        <p className="reveal max-w-4xl font-display text-[1.75rem] leading-snug font-medium text-white sm:text-[2.35rem]">
          {c.statementBefore}{" "}
          <mark className="rounded-lg bg-crimson-600 px-2 py-0.5 text-white [box-decoration-break:clone]">{c.highlight}</mark>{" "}
          {c.statementAfter}
        </p>

        <div className="mt-16">
          <p className="eyebrow text-gold-300">{c.recommendationsTitle}</p>
          <ol className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {c.recommendations.map((rec, i) => (
              <li key={rec} className="reveal rounded-2xl border border-white/10 bg-white/[0.04] p-6">
                <span className="tnum font-display text-3xl text-gold-300">{String(i + 1).padStart(2, "0")}</span>
                <p className="mt-4 text-[0.9375rem] leading-relaxed text-mist">{rec}</p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
