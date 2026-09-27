import Image from "next/image";
import { Code2, Crown } from "lucide-react";
import type { Dictionary } from "@/content/i18n";
import { STUDENTS, SUPERVISORS, initials } from "@/content/people";
import { cn } from "@/lib/utils";
import { Section } from "../ui/Section";
import { GlassCard } from "../ui/GlassCard";

export function Team({ t }: { t: Dictionary }) {
  const tm = t.team;
  return (
    <Section id="team" index={8} kicker={t.sections.team.kicker} title={t.sections.team.title} lead={tm.lead} glow="gold">
      <h3 className="reveal eyebrow text-muted">{tm.supervisorsTitle}</h3>
      <ul className="mt-6 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
        {SUPERVISORS.map((s) => (
          <GlassCard
            as="li"
            key={s.name}
            interactive
            className="reveal flex flex-col items-center px-3 pt-7 pb-6 text-center sm:px-6 sm:pt-9 sm:pb-8"
          >
            <span className="relative rounded-full bg-linear-to-br from-gold-300 via-gold-500/40 to-crimson-400/60 p-[2px] shadow-[0_0_40px_-8px_var(--glow-gold)]">
              <span className="block rounded-full bg-paper p-1">
                <Image
                  src={s.photo}
                  alt={s.name}
                  width={320}
                  height={320}
                  sizes="(min-width: 640px) 120px, 88px"
                  className="h-[5.5rem] w-[5.5rem] rounded-full object-cover sm:h-[7.5rem] sm:w-[7.5rem]"
                />
              </span>
            </span>
            <p className="eyebrow mt-5 text-gold-ink">{tm.supervisorLabel}</p>
            <p className="mt-2 text-[0.9875rem] leading-snug font-semibold tracking-tight text-ink sm:text-lg">
              <bdi>{s.name}</bdi>
            </p>
            <p className="mt-1.5 text-[0.8125rem] leading-snug text-muted sm:text-sm">{tm.roles[s.role]}</p>
          </GlassCard>
        ))}
      </ul>

      <div className="mt-16 flex items-baseline justify-between gap-4">
        <h3 className="reveal eyebrow text-muted">{tm.studentsTitle}</h3>
        <span className="tnum font-mono text-sm text-muted">{STUDENTS.length}</span>
      </div>
      <div aria-hidden className="hairline-x mt-4" />
      <ul className="mt-6 grid grid-cols-1 gap-2.5 min-[400px]:grid-cols-2 sm:gap-3 lg:grid-cols-4">
        {STUDENTS.map((s) => (
          <GlassCard
            as="li"
            key={s.name}
            interactive
            highlight={s.developer}
            className={cn(
              "reveal flex items-center gap-3 rounded-2xl px-3.5 py-3 sm:px-4 sm:py-3.5",
              s.developer && "[--glow-gradient:linear-gradient(135deg,var(--gold),transparent_55%,var(--gold))] shadow-[0_0_40px_-12px_var(--glow-gold)]",
            )}
          >
            <span
              aria-hidden
              className={cn(
                "inline-grid h-10 w-10 shrink-0 place-items-center rounded-full font-mono text-xs font-semibold sm:h-11 sm:w-11",
                s.lead
                  ? "bg-accent text-navy-950 light:text-white"
                  : s.developer
                    ? "bg-gold-300 text-navy-900"
                    : "bg-surface-2 text-ink-2 ring-1 ring-line",
              )}
            >
              {initials(s.name)}
            </span>
            <span className="min-w-0">
              <span className="block text-[0.9375rem] leading-snug font-medium break-words text-ink">
                <bdi>{s.name}</bdi>
              </span>
              {s.lead ? (
                <span className="mt-0.5 flex items-center gap-1 text-xs font-semibold text-accent-ink">
                  <Crown className="h-3.5 w-3.5" aria-hidden />
                  {tm.leadBadge}
                </span>
              ) : null}
              {s.developer ? (
                <span className="mt-0.5 flex items-center gap-1 text-xs font-semibold text-gold-ink">
                  <Code2 className="h-3.5 w-3.5" aria-hidden />
                  {tm.developer}
                </span>
              ) : null}
            </span>
          </GlassCard>
        ))}
      </ul>
    </Section>
  );
}
