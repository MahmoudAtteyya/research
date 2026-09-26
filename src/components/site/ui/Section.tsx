import { cn } from "@/lib/utils";
import { SECTION_IDS, type SectionId } from "@/content/site";

type Glow = "crimson" | "blue" | "gold" | "none";

type SectionProps = {
  id: SectionId;
  index: number;
  kicker: string;
  title: string;
  lead?: React.ReactNode;
  tone?: "paper" | "tint";
  glow?: Glow;
  glowSide?: "start" | "end";
  className?: string;
  children: React.ReactNode;
};

const GLOW: Record<Exclude<Glow, "none">, string> = {
  crimson: "var(--glow-crimson)",
  blue: "var(--glow-blue)",
  gold: "var(--glow-gold)",
};

export function Section({
  id,
  index,
  kicker,
  title,
  lead,
  tone = "paper",
  glow = "none",
  glowSide = "end",
  className,
  children,
}: SectionProps) {
  return (
    <section
      id={id}
      aria-labelledby={`${id}-title`}
      className={cn(
        "relative isolate overflow-x-clip py-20 sm:py-28 lg:py-32",
        tone === "tint" ? "bg-paper-2" : "bg-paper",
        className,
      )}
    >
      <div aria-hidden className="hairline-x pointer-events-none absolute inset-x-0 top-0" />
      {glow !== "none" ? (
        <div
          aria-hidden
          className={cn(
            "pointer-events-none absolute -top-40 -z-10 h-[34rem] w-[34rem] max-w-full rounded-full blur-[120px]",
            glowSide === "end" ? "-end-40" : "-start-40",
          )}
          style={{ background: GLOW[glow] }}
        />
      ) : null}
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
  tone = "default",
}: {
  id: string;
  index: number;
  kicker: string;
  title: string;
  lead?: React.ReactNode;
  tone?: "default" | "onDark";
}) {
  const onDark = tone === "onDark";
  return (
    <header className="reveal mb-12 max-w-4xl sm:mb-16">
      <p className={cn("flex items-center gap-3", onDark ? "text-gold-300" : "text-accent-ink")}>
        <span aria-hidden className="tnum font-mono text-xs font-medium tracking-[0.12em]">
          {String(index).padStart(2, "0")}
          <span className={onDark ? "text-white/35" : "text-muted"}> / {String(SECTION_IDS.length).padStart(2, "0")}</span>
        </span>
        <span aria-hidden className={cn("h-px w-8", onDark ? "bg-gold-300/50" : "bg-accent/50")} />
        <span className="eyebrow">{kicker}</span>
      </p>
      <h2 id={`${id}-title`} className={cn("mt-5 type-display-2", onDark ? "text-white" : "ink-gradient")}>
        {title}
      </h2>
      {lead ? (
        <p className={cn("mt-6 max-w-3xl text-lg leading-relaxed sm:text-xl", onDark ? "text-mist" : "text-ink-2")}>{lead}</p>
      ) : null}
    </header>
  );
}

export function SubHeading({ index, children, id }: { index: string; children: React.ReactNode; id?: string }) {
  return (
    <h3 id={id} className="reveal flex items-baseline gap-3 type-display-3 text-ink">
      <span className="tnum font-mono text-sm font-medium text-accent-ink">{index}</span>
      {children}
    </h3>
  );
}
