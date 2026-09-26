import { cn } from "@/lib/utils";
import type { SectionId } from "@/content/site";

type SectionProps = {
  id: SectionId;
  index: number;
  kicker: string;
  title: string;
  lead?: React.ReactNode;
  tone?: "paper" | "tint";
  className?: string;
  children: React.ReactNode;
};

export function Section({ id, index, kicker, title, lead, tone = "paper", className, children }: SectionProps) {
  return (
    <section
      id={id}
      aria-labelledby={`${id}-title`}
      className={cn("relative py-20 sm:py-28", tone === "tint" ? "bg-paper-2" : "bg-paper", className)}
    >
      <div className="container-page">
        <SectionHeader id={id} index={index} kicker={kicker} title={title} lead={lead} />
        {children}
      </div>
    </section>
  );
}

export function SectionHeader({
  id,
  index,
  kicker,
  title,
  lead,
  tone = "light",
}: {
  id: string;
  index: number;
  kicker: string;
  title: string;
  lead?: React.ReactNode;
  tone?: "light" | "dark";
}) {
  const dark = tone === "dark";
  return (
    <header className="reveal mb-12 max-w-3xl sm:mb-16">
      <p className={cn("flex items-center gap-3", dark ? "text-gold-300" : "text-accent-ink")}>
        <span
          aria-hidden
          className={cn(
            "tnum inline-grid h-7 min-w-7 place-items-center rounded-md px-1.5 text-[0.8125rem] font-semibold",
            dark ? "bg-gold-300 text-navy-900" : "bg-accent text-white dark:text-navy-950",
          )}
        >
          {String(index).padStart(2, "0")}
        </span>
        <span className="eyebrow">{kicker}</span>
      </p>
      <h2
        id={`${id}-title`}
        className={cn(
          "mt-5 font-display text-[2.35rem] leading-[1.08] font-medium sm:text-5xl",
          dark ? "text-white" : "text-ink",
        )}
      >
        {title}
      </h2>
      {lead ? (
        <p className={cn("mt-6 text-lg leading-relaxed sm:text-xl", dark ? "text-mist" : "text-ink-2")}>{lead}</p>
      ) : null}
    </header>
  );
}

export function SubHeading({ index, children, id }: { index: string; children: React.ReactNode; id?: string }) {
  return (
    <h3 id={id} className="reveal flex items-baseline gap-3 font-display text-2xl font-medium text-ink sm:text-[1.75rem]">
      <span className="tnum font-sans text-sm font-semibold text-accent-ink">{index}</span>
      {children}
    </h3>
  );
}
