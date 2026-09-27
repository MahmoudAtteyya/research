import type { Dictionary } from "@/content/i18n";
import { SectionHeader } from "../ui/Section";

export function Conclusion({ t }: { t: Dictionary }) {
  const c = t.conclusion;
  return (
    <section
      id="conclusion"
      aria-labelledby="conclusion-title"
      className="dark-band relative isolate overflow-hidden bg-navy-975 py-24 text-white sm:py-32 lg:py-40"
    >
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="aurora-a absolute -top-1/3 start-1/4 h-[60vmax] w-[60vmax] rounded-full bg-[radial-gradient(closest-side,rgb(200_16_46/0.28),transparent)]" />
        <div className="aurora-b absolute -bottom-1/3 -end-1/4 h-[55vmax] w-[55vmax] rounded-full bg-[radial-gradient(closest-side,rgb(61_106_168/0.22),transparent)]" />
        <div className="absolute inset-0 bg-ecg opacity-60 [mask-image:radial-gradient(ellipse_70%_60%_at_50%_40%,#000,transparent_80%)]" />
        <div className="hairline-x absolute inset-x-0 top-0" />
      </div>
      <div className="container-page">
        <SectionHeader id="conclusion" index={6} kicker={t.sections.conclusion.kicker} title={t.sections.conclusion.title} tone="onDark" />
        <p className="reveal max-w-5xl text-[1.6rem] leading-snug font-semibold tracking-tight text-white sm:text-[2.25rem] lg:text-[2.75rem]">
          {c.statementBefore}{" "}
          <mark className="rounded-xl bg-crimson-600 px-2.5 py-0.5 text-white shadow-[0_0_48px_-6px_rgb(240_80_106/0.9)] [box-decoration-break:clone] [-webkit-box-decoration-break:clone]">
            {c.highlight}
          </mark>{" "}
          <span className="text-mist">{c.statementAfter}</span>
        </p>

        <div className="mt-16 sm:mt-20">
          <p className="eyebrow text-gold-300">{c.recommendationsTitle}</p>
          <ol className="mt-6 grid gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-4">
            {c.recommendations.map((rec, i) => (
              <li
                key={rec}
                className="reveal card-hover rounded-3xl border border-white/10 bg-white/[0.04] p-6 shadow-[inset_0_1px_0_rgb(255_255_255/0.06)]"
              >
                <span className="tnum font-mono text-sm text-gold-300">{String(i + 1).padStart(2, "0")}</span>
                <p className="mt-5 text-[0.9875rem] leading-relaxed text-mist">{rec}</p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
