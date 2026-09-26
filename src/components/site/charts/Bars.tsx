import { cn } from "@/lib/utils";
import { pct } from "@/lib/format";
import type { Share } from "@/content/study";
import { Num } from "../ui/Num";

/** A figure card with a poster-style caption ("Figure 1 · …") and sample size. */
export function FigureCard({
  title,
  n,
  note,
  children,
  className,
}: {
  title: string;
  n: number;
  note?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <figure className={cn("reveal flex flex-col rounded-3xl border border-line bg-surface p-6 shadow-card sm:p-7", className)}>
      <figcaption className="mb-6">
        <span className="block font-semibold text-ink">{title}</span>
        <span className="mt-1 block text-sm text-muted">
          <Num>n = {n}</Num>
          {note ? <span> · {note}</span> : null}
        </span>
      </figcaption>
      {children}
    </figure>
  );
}

/**
 * Horizontal bars for a single series. One colour for every bar; the item the
 * story is about can be emphasised, the rest recede.
 */
export function BarList({
  items,
  labels,
  max = 100,
  emphasis,
}: {
  items: Share[];
  labels: Record<string, string>;
  max?: number;
  emphasis?: string;
}) {
  return (
    <ul className="space-y-3.5">
      {items.map((item) => {
        const w = (item.pct / max) * 100;
        const strong = emphasis ? item.id === emphasis : true;
        return (
          <li key={item.id} className="grid grid-cols-[minmax(0,8.5rem)_minmax(0,1fr)] items-center gap-4 sm:grid-cols-[minmax(0,10rem)_minmax(0,1fr)]">
            <span className={cn("text-sm", strong && emphasis ? "font-semibold text-ink" : "text-ink-2")}>{labels[item.id]}</span>
            <span className="flex items-center gap-2.5">
              <span className="relative h-3 min-w-0 flex-1" aria-hidden>
                <span className="absolute inset-0 rounded-e-full bg-grid" />
                <span
                  className={cn(
                    "absolute inset-y-0 start-0 rounded-e-[4px]",
                    emphasis ? (strong ? "bg-accent" : "bg-bar-muted") : "bg-bar",
                  )}
                  style={{ width: `${Math.max(w, item.pct > 0 ? 1.2 : 0)}%` }}
                />
              </span>
              <span className={cn("w-12 shrink-0 text-end text-sm", strong && emphasis ? "font-semibold text-ink" : "text-ink-2")}>
                <Num>{pct(item.pct)}</Num>
              </span>
            </span>
          </li>
        );
      })}
    </ul>
  );
}

/** 100% stacked bar for an ordinal distribution (least → most frequent). */
export function StackedShare({ items, labels }: { items: Share[]; labels: Record<string, string> }) {
  const tones = ["var(--ord-1)", "var(--ord-2)", "var(--ord-3)", "var(--ord-4)", "var(--ord-5)"];
  // Inline labels only where they fit; light steps get dark ink, dark steps white.
  const inkOn = (i: number) => (i < 2 ? "text-navy-900 dark:text-white" : "text-white dark:text-navy-950");
  return (
    <div>
      <div className="flex h-12 w-full gap-[2px] overflow-hidden rounded-lg" aria-hidden>
        {items.map((item, i) => (
          <span
            key={item.id}
            className={cn("flex items-center justify-center text-xs font-semibold", inkOn(i))}
            style={{ width: `${item.pct}%`, background: tones[i] }}
          >
            {item.pct >= 10 ? <Num>{pct(item.pct)}</Num> : null}
          </span>
        ))}
      </div>
      <ul className="mt-6 grid grid-cols-1 gap-x-6 gap-y-2.5 sm:grid-cols-2">
        {items.map((item, i) => (
          <li key={item.id} className="flex items-center justify-between gap-3 text-sm">
            <span className="flex items-center gap-2.5 text-ink-2">
              <span aria-hidden className="h-3 w-3 rounded-[3px]" style={{ background: tones[i] }} />
              {labels[item.id]}
            </span>
            <Num className="font-medium text-ink">{pct(item.pct)}</Num>
          </li>
        ))}
      </ul>
    </div>
  );
}

/** Unit chart: one mark per participant; sex is encoded by shape (filled vs ring). */
export function UnitDots({
  total,
  filled,
  filledLabel,
  ringLabel,
  caption,
}: {
  total: number;
  filled: number;
  filledLabel: string;
  ringLabel: string;
  caption: string;
}) {
  return (
    <div>
      <div className="grid grid-cols-[repeat(12,minmax(0,1fr))] gap-2 sm:gap-2.5" aria-hidden>
        {Array.from({ length: total }, (_, i) => (
          <span
            key={i}
            className={cn(
              "aspect-square rounded-full",
              i < filled ? "bg-ink" : "border-[2.5px] border-ink/70 bg-transparent",
            )}
          />
        ))}
      </div>
      <ul className="mt-5 flex flex-wrap gap-x-6 gap-y-2 text-sm text-ink-2">
        <li className="flex items-center gap-2">
          <span aria-hidden className="h-3 w-3 rounded-full bg-ink" />
          {filledLabel}
        </li>
        <li className="flex items-center gap-2">
          <span aria-hidden className="h-3 w-3 rounded-full border-2 border-ink/70" />
          {ringLabel}
        </li>
        <li className="text-muted">{caption}</li>
      </ul>
    </div>
  );
}
