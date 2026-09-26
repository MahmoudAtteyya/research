import { ArrowUpRight, Download, Quote } from "lucide-react";
import type { Dictionary } from "@/content/i18n";
import { SITE } from "@/content/site";
import { FURTHER_READING } from "@/content/literature";
import { Section } from "../ui/Section";
import { Num } from "../ui/Num";
import { btn } from "../ui/buttons";
import { PosterViewer } from "../interactive/PosterViewer";
import { CopyButton } from "../interactive/CopyButton";

export function PosterAndCite({ t }: { t: Dictionary }) {
  const p = t.poster;
  return (
    <Section id="poster" index={9} kicker={t.sections.poster.kicker} title={t.sections.poster.title} tone="tint" glow="crimson" glowSide="start">
      <div className="grid gap-10 lg:grid-cols-12 lg:gap-14">
        <div className="reveal lg:col-span-4">
          <PosterViewer t={p} />
        </div>

        <div className="space-y-4 lg:col-span-8">
          <div className="glass-card glow-border reveal p-6 sm:p-8">
            <h3 className="type-display-3 text-ink">{p.posterTitle}</h3>
            <p className="mt-3 text-[0.9875rem] leading-relaxed text-ink-2">{p.posterText}</p>
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <a href={SITE.poster.download} download className={btn.outline}>
                <Download className="h-4 w-4" aria-hidden />
                {p.download}
              </a>
              <span className="text-sm text-muted">
                <Num tabular={false}>{p.downloadMeta}</Num>
              </span>
            </div>
          </div>

          <div className="glass-card reveal p-6 sm:p-8">
            <h3 className="flex items-center gap-2.5 type-display-3 text-ink">
              <Quote className="h-5 w-5 text-accent-ink" aria-hidden />
              {p.citeTitle}
            </h3>
            <p dir="ltr" lang="en" className="mt-4 rounded-2xl border border-line bg-surface-2/70 p-5 text-start font-mono text-[0.8125rem] leading-relaxed text-ink-2">
              {p.citation}
            </p>
            <div className="mt-5">
              <CopyButton text={p.citation} label={p.copy} done={p.copied} />
            </div>
          </div>
        </div>
      </div>

      <div className="mt-16">
        <div className="reveal flex flex-col gap-2 border-b border-line pb-5 sm:flex-row sm:items-end sm:justify-between">
          <h3 className="type-display-3 text-ink">{p.readingTitle}</h3>
          <p className="text-sm text-muted">{p.readingLead}</p>
        </div>
        <ol className="divide-y divide-line">
          {FURTHER_READING.map((r) => (
            <li key={r.pmid} className="reveal" lang="en" dir="ltr">
              <a
                href={`https://doi.org/${r.doi}`}
                target="_blank"
                rel="noopener noreferrer"
                className="group -mx-3 grid gap-1 rounded-2xl px-3 py-5 transition-colors hover:bg-glass sm:grid-cols-[5rem_minmax(0,1fr)_auto] sm:items-baseline sm:gap-6"
              >
                <span className="tnum font-mono text-sm text-muted">{r.year}</span>
                <span>
                  <span className="block font-medium text-ink decoration-accent/60 underline-offset-4 group-hover:underline">{r.title}</span>
                  <span className="mt-1 block text-sm text-muted">
                    {r.authors} · <em>{r.journal}</em>
                  </span>
                </span>
                <span className="inline-flex items-center gap-1 text-sm font-medium text-accent-ink">
                  DOI
                  <ArrowUpRight className="h-4 w-4" aria-hidden />
                </span>
              </a>
            </li>
          ))}
        </ol>
      </div>
    </Section>
  );
}
