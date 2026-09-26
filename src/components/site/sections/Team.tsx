import Image from "next/image";
import { Code2, Crown } from "lucide-react";
import type { Dictionary } from "@/content/i18n";
import { STUDENTS, SUPERVISORS, initials } from "@/content/people";
import { cn } from "@/lib/utils";
import { Section } from "../ui/Section";

export function Team({ t }: { t: Dictionary }) {
  const tm = t.team;
  return (
    <Section id="team" index={8} kicker={t.sections.team.kicker} title={t.sections.team.title} lead={tm.lead}>
      <h3 className="reveal eyebrow text-muted">{tm.supervisorsTitle}</h3>
      <ul className="mt-6 grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-4">
        {SUPERVISORS.map((s) => (
          <li key={s.name} className="reveal flex flex-col items-center rounded-3xl border border-line bg-surface px-3 pt-6 pb-6 text-center shadow-card sm:px-6 sm:pt-8 sm:pb-7">
            <span className="rounded-full p-1 ring-1 ring-gold/70">
              <Image
                src={s.photo}
                alt={s.name}
                width={320}
                height={320}
                sizes="112px"
                className="h-20 w-20 rounded-full object-cover sm:h-28 sm:w-28"
              />
            </span>
            <p className="eyebrow mt-5 text-gold-ink">{tm.supervisorLabel}</p>
            <p className="mt-2 font-display text-[1.0625rem] leading-snug font-medium text-ink sm:text-xl">
              <bdi>{s.name}</bdi>
            </p>
            <p className="mt-1.5 text-sm leading-snug text-muted">{tm.roles[s.role]}</p>
          </li>
        ))}
      </ul>

      <div className="mt-16 flex items-baseline justify-between gap-4 border-b border-line pb-4">
        <h3 className="reveal eyebrow text-muted">{tm.studentsTitle}</h3>
        <span className="tnum text-sm text-muted">{STUDENTS.length}</span>
      </div>
      <ul className="mt-6 grid grid-cols-2 gap-2.5 sm:gap-3 lg:grid-cols-4">
        {STUDENTS.map((s) => (
          <li
            key={s.name}
            className={cn(
              "reveal flex items-center gap-2.5 rounded-2xl border bg-surface px-3 py-3 sm:gap-3.5 sm:px-4 sm:py-3.5",
              s.developer ? "border-gold/70 shadow-[0_0_0_3px_color-mix(in_oklab,var(--gold)_14%,transparent)]" : "border-line",
            )}
          >
            <span
              aria-hidden
              className={cn(
                "inline-grid h-9 w-9 shrink-0 place-items-center rounded-full text-xs font-semibold sm:h-11 sm:w-11 sm:text-sm",
                s.lead ? "bg-accent text-white dark:text-navy-950" : s.developer ? "bg-gold-300 text-navy-900" : "bg-surface-2 text-ink-2",
              )}
            >
              {initials(s.name)}
            </span>
            <span className="min-w-0">
              <span className="block text-sm leading-snug font-medium text-ink sm:text-base">
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
          </li>
        ))}
      </ul>
    </Section>
  );
}
