import {
  ChartColumn,
  Check,
  ClipboardList,
  CupSoda,
  Minus,
  RotateCcw,
  ShieldCheck,
  Stethoscope,
  Timer,
  UserRoundCheck,
  Users,
} from "lucide-react";
import type { Dictionary } from "@/content/i18n";
import { Section } from "../ui/Section";

const STEP_ICONS = [UserRoundCheck, Stethoscope, CupSoda, Timer, RotateCcw, ChartColumn];

function Disclosure({
  icon: Icon,
  title,
  children,
}: {
  icon: React.ElementType;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <details className="glass-card reveal group transition-colors open:border-line-strong">
      <summary className="flex min-h-[4.5rem] items-center justify-between gap-4 rounded-3xl p-5 sm:p-6">
        <span className="flex items-center gap-3.5">
          <span className="inline-grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-surface-2 text-accent-ink ring-1 ring-line">
            <Icon className="h-5 w-5" aria-hidden />
          </span>
          <span className="text-lg font-semibold tracking-tight text-ink">{title}</span>
        </span>
        <span
          aria-hidden
          className="inline-grid h-9 w-9 shrink-0 place-items-center rounded-full border border-line-strong text-lg text-ink-2 transition-transform duration-300 group-open:rotate-45"
        >
          +
        </span>
      </summary>
      <div className="border-t border-line px-5 pt-5 pb-6 sm:px-6">{children}</div>
    </details>
  );
}

function ToolTable({
  title,
  rows,
  measure,
  tool,
}: {
  title: string;
  rows: { measure: string; tool: string }[];
  measure: string;
  tool: string;
}) {
  return (
    <div>
      <p className="eyebrow text-muted">{title}</p>
      <table className="mt-3 w-full border-collapse text-sm">
        <thead className="sr-only">
          <tr>
            <th scope="col">{measure}</th>
            <th scope="col">{tool}</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr key={r.measure} className="border-b border-line last:border-0">
              <th scope="row" className="py-2.5 pe-4 text-start font-medium text-ink">
                {r.measure}
              </th>
              <td className="py-2.5 text-ink-2">{r.tool}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function Methods({ t }: { t: Dictionary }) {
  const m = t.methods;
  return (
    <Section id="methods" index={3} kicker={t.sections.methods.kicker} title={t.sections.methods.title} lead={m.lead} glow="crimson" glowSide="start">
      <ol className="relative grid gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3 2xl:grid-cols-6">
        <span
          aria-hidden
          className="pointer-events-none absolute inset-x-8 top-[3.25rem] hidden h-px bg-linear-to-r from-transparent via-accent/50 to-transparent 2xl:block"
        />
        {m.steps.map((s, i) => {
          const Icon = STEP_ICONS[i];
          const highlight = i === 2 || i === 3;
          return (
            <li key={s.title} className="glass-card card-hover reveal relative flex flex-col gap-4 p-5 sm:p-6">
              <span className="flex items-center justify-between">
                <span
                  className={
                    "relative z-10 inline-grid h-12 w-12 place-items-center rounded-2xl ring-1 " +
                    (highlight
                      ? "bg-accent text-white ring-accent/40 shadow-[0_0_32px_-4px_var(--glow-crimson)]"
                      : "bg-surface-2 text-ink ring-line")
                  }
                >
                  <Icon className="h-5 w-5" aria-hidden />
                </span>
                <span className="tnum font-mono text-xs text-muted">{String(i + 1).padStart(2, "0")}</span>
              </span>
              <div>
                <h3 className="text-lg font-semibold tracking-tight text-ink">{s.title}</h3>
                <p className="mt-1.5 text-[0.9375rem] leading-relaxed text-ink-2">{s.text}</p>
              </div>
            </li>
          );
        })}
      </ol>

      <div className="glass-card glow-border reveal mt-6 p-6 sm:p-8">
        <p className="eyebrow text-gold-ink">{m.factsTitle}</p>
        <dl className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-4 lg:gap-0 lg:divide-x lg:divide-line rtl:lg:divide-x-reverse">
          {m.facts.map((f) => (
            <div key={f.label} className="lg:px-6 lg:first:ps-0 lg:last:pe-0">
              <dt className="text-sm text-muted">{f.label}</dt>
              <dd className="mt-1.5 text-lg leading-snug font-semibold tracking-tight text-ink">{f.value}</dd>
            </div>
          ))}
        </dl>
      </div>

      <div className="mt-6 grid gap-4 lg:grid-cols-3 lg:items-start">
        <Disclosure icon={Users} title={m.eligibility.title}>
          <div className="grid gap-6">
            <div>
              <p className="eyebrow text-muted">{m.eligibility.inclusionTitle}</p>
              <ul className="mt-3 space-y-2.5">
                {m.eligibility.inclusion.map((x) => (
                  <li key={x} className="flex gap-2.5 text-[0.9375rem] leading-relaxed text-ink-2">
                    <Check className="mt-1 h-4 w-4 shrink-0 text-pre" aria-hidden />
                    {x}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="eyebrow text-muted">{m.eligibility.exclusionTitle}</p>
              <ul className="mt-3 space-y-2.5">
                {m.eligibility.exclusion.map((x) => (
                  <li key={x} className="flex gap-2.5 text-[0.9375rem] leading-relaxed text-ink-2">
                    <Minus className="mt-1 h-4 w-4 shrink-0 text-accent" aria-hidden />
                    {x}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Disclosure>

        <Disclosure icon={ClipboardList} title={m.instruments.title}>
          <p className="text-[0.9375rem] leading-relaxed text-ink-2">{m.instruments.questionnaire}</p>
          <div className="mt-6 grid gap-6">
            <ToolTable title={m.instruments.vitalsTitle} rows={m.instruments.vitals} measure={m.instruments.measure} tool={m.instruments.tool} />
            <ToolTable title={m.instruments.cognitiveTitle} rows={m.instruments.cognitive} measure={m.instruments.measure} tool={m.instruments.tool} />
          </div>
        </Disclosure>

        <Disclosure icon={ShieldCheck} title={m.ethics.title}>
          <ul className="space-y-3">
            {m.ethics.items.map((x) => (
              <li key={x} className="flex gap-2.5 text-[0.9375rem] leading-relaxed text-ink-2">
                <Check className="mt-1 h-4 w-4 shrink-0 text-pre" aria-hidden />
                {x}
              </li>
            ))}
          </ul>
          <p className="mt-5 rounded-xl border border-line bg-surface-2 px-4 py-3 text-sm font-medium text-ink">{m.ethics.note}</p>
        </Disclosure>
      </div>
    </Section>
  );
}
