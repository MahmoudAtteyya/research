import type { Dictionary } from "@/content/i18n";
import {
  COGNITIVE,
  COGNITIVE_UNCHANGED,
  FIGURE_N,
  FREQUENCY,
  ONSET,
  PARTICIPANTS,
  REASONS,
  SIDE_EFFECTS,
  UNCHANGED_SCORE,
  VITAL_SIGNS,
} from "@/content/study";
import { pct } from "@/lib/format";
import { Section, SubHeading } from "../ui/Section";
import { Num } from "../ui/Num";
import { DumbbellFigure } from "../charts/Dumbbell";
import { BarList, FigureCard, StackedShare, UnitDots } from "../charts/Bars";

function SplitBar({
  left,
  right,
}: {
  left: { label: string; value: number; pct: number };
  right: { label: string; value: number; pct: number };
}) {
  return (
    <div>
      <div className="flex h-3 gap-[2px] overflow-hidden rounded-full" aria-hidden>
        <span className="bg-ink" style={{ width: `${left.pct}%` }} />
        <span className="bg-ink/25" style={{ width: `${right.pct}%` }} />
      </div>
      <div className="mt-3 flex justify-between gap-4 text-sm">
        <span className="text-ink-2">
          <span className="font-semibold text-ink">
            <Num>{left.value}</Num>
          </span>{" "}
          {left.label} <span className="text-muted">(<Num>{pct(left.pct)}</Num>)</span>
        </span>
        <span className="text-end text-ink-2">
          <span className="font-semibold text-ink">
            <Num>{right.value}</Num>
          </span>{" "}
          {right.label} <span className="text-muted">(<Num>{pct(right.pct)}</Num>)</span>
        </span>
      </div>
    </div>
  );
}

export function Results({ t }: { t: Dictionary }) {
  const r = t.results;
  const p = r.participants;
  const P = PARTICIPANTS;
  const studentsPct = Math.round((P.students / P.total) * 1000) / 10;

  return (
    <Section id="results" index={4} kicker={t.sections.results.kicker} title={t.sections.results.title} lead={r.lead} tone="tint">
      {/* 4.1 Participants */}
      <div className="space-y-8">
        <SubHeading index="4.1">{p.title}</SubHeading>
        <div className="grid gap-6 lg:grid-cols-12">
          <figure className="reveal rounded-3xl border border-line bg-surface p-6 shadow-card sm:p-8 lg:col-span-5">
            <figcaption className="mb-6 flex items-baseline justify-between gap-3">
              <span className="font-semibold text-ink">{p.sexTitle}</span>
              <span className="text-sm text-muted">
                <Num>n = {P.total}</Num>
              </span>
            </figcaption>
            <UnitDots
              total={P.total}
              filled={P.male}
              filledLabel={`${p.male} · ${P.male} (${pct(P.malePct)})`}
              ringLabel={`${p.female} · ${P.female} (${pct(P.femalePct)})`}
              caption={p.dotsLabel}
            />
          </figure>

          <div className="grid gap-6 sm:grid-cols-2 lg:col-span-7">
            <div className="reveal rounded-3xl border border-line bg-surface p-6 shadow-card sm:col-span-2 sm:p-8">
              <p className="eyebrow text-muted">{p.ageTitle}</p>
              <p className="mt-3 flex flex-wrap items-baseline gap-x-3 gap-y-1">
                <span className="text-5xl font-semibold tracking-tight text-ink">
                  <Num tabular={false}>{p.ageValue}</Num>
                </span>
                <span className="text-lg text-ink-2">{p.ageUnit}</span>
                <span className="text-sm text-muted">
                  · <Num tabular={false}>{p.ageRange}</Num>
                </span>
              </p>
            </div>
            <div className="reveal rounded-3xl border border-line bg-surface p-6 shadow-card sm:col-span-2 sm:p-8">
              <p className="eyebrow mb-5 text-muted">{p.occupationTitle}</p>
              <SplitBar
                left={{ label: p.students, value: P.students, pct: studentsPct }}
                right={{ label: p.nonStudents, value: P.nonStudents, pct: Math.round((100 - studentsPct) * 10) / 10 }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* 4.2 Vital signs */}
      <div className="mt-20 space-y-8">
        <SubHeading index="4.2">{r.vitals.title}</SubHeading>
        <DumbbellFigure id="vitals" title={r.vitals.figure} measures={VITAL_SIGNS} names={r.vitals.names} labels={r.chart} />
      </div>

      {/* 4.3 Cognition */}
      <div className="mt-20 space-y-8">
        <SubHeading index="4.3">{r.cognition.title}</SubHeading>
        <DumbbellFigure
          id="cognition"
          title={r.cognition.figure}
          measures={COGNITIVE}
          names={r.cognition.names}
          labels={r.chart}
          after={
            <div className="mt-2 rounded-2xl bg-surface-2 p-5">
              <ul className="grid gap-3 sm:grid-cols-2">
                {COGNITIVE_UNCHANGED.map((id) => (
                  <li key={id} className="flex items-baseline justify-between gap-3">
                    <span className="font-semibold text-ink">{r.cognition.names[id]}</span>
                    <span className="text-sm text-ink-2">
                      <Num>
                        {UNCHANGED_SCORE.toFixed(2)} → {UNCHANGED_SCORE.toFixed(2)}
                      </Num>{" "}
                      <span className="ms-1 rounded-full border border-line-strong px-2 py-0.5 text-xs text-muted">{r.cognition.unchangedTitle}</span>
                    </span>
                  </li>
                ))}
              </ul>
              <p className="mt-3 text-sm text-muted">{r.cognition.unchangedNote}</p>
            </div>
          }
        />
      </div>

      {/* 4.4 Consumption & symptoms */}
      <div className="mt-20 space-y-8">
        <SubHeading index="4.4">{r.consumption.title}</SubHeading>
        <div className="grid gap-6 lg:grid-cols-2">
          <FigureCard title={r.consumption.frequency.figure} n={FIGURE_N.frequency}>
            <StackedShare items={FREQUENCY} labels={r.consumption.frequency.labels} />
          </FigureCard>
          <FigureCard title={r.consumption.reasons.figure} n={FIGURE_N.reasons}>
            <BarList items={REASONS} labels={r.consumption.reasons.labels} max={40} emphasis="studying" />
          </FigureCard>
          <FigureCard title={r.consumption.sideEffects.figure} n={FIGURE_N.sideEffects} note={r.consumption.sideEffects.note}>
            <BarList items={SIDE_EFFECTS} labels={r.consumption.sideEffects.labels} max={35} emphasis="palpitations" />
          </FigureCard>
          <FigureCard title={r.consumption.onset.figure} n={FIGURE_N.onset}>
            <BarList items={ONSET} labels={r.consumption.onset.labels} max={60} emphasis="m30to60" />
          </FigureCard>
        </div>
        <p className="text-sm text-muted">{r.consumption.selfReported}</p>
      </div>
    </Section>
  );
}
