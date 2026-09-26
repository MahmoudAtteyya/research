import type { Measure } from "@/content/study";
import type { Dictionary } from "@/content/i18n";
import { change } from "@/content/study";
import { meanSD, scale, signed, fixed } from "@/lib/format";
import { Num } from "../ui/Num";
import { cn } from "@/lib/utils";

type ChartLabels = Dictionary["results"]["chart"];

function Legend({ labels }: { labels: ChartLabels }) {
  return (
    <ul className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-ink-2">
      <li className="flex items-center gap-2">
        <span aria-hidden className="h-3 w-3 rounded-full bg-pre ring-2 ring-surface" />
        {labels.before}
      </li>
      <li className="flex items-center gap-2">
        <span aria-hidden className="h-3 w-3 rounded-full bg-post ring-2 ring-surface" />
        {labels.after}
      </li>
      <li className="flex items-center gap-2 text-muted">
        <span aria-hidden className="flex w-6 flex-col gap-0.5">
          <span className="h-1 rounded-full bg-pre/30" />
          <span className="h-1 rounded-full bg-post/30" />
        </span>
        {labels.sd}
      </li>
      <li className="flex items-center gap-2 text-muted">
        <span aria-hidden className="text-gold-ink">★</span>
        {labels.significant}
      </li>
    </ul>
  );
}

function Dot({ at, from, tone, label }: { at: number; from?: number; tone: "pre" | "post"; label: string }) {
  return (
    <span
      className={cn("group/dot absolute top-1/2 z-10 -mt-2 -ms-2 h-4 w-4", from !== undefined && "reveal-dot")}
      style={{ insetInlineStart: `${at}%`, ...(from !== undefined ? { ["--from" as string]: `${from}%` } : {}) }}
    >
      <span
        className={cn(
          "block h-full w-full rounded-full ring-[3px] ring-surface transition-transform duration-200 group-hover/dot:scale-125",
          tone === "pre" ? "bg-pre shadow-[0_0_14px_var(--glow-blue)]" : "bg-post shadow-[0_0_16px_var(--glow-crimson)]",
        )}
      />
      <span className="pointer-events-none absolute bottom-full start-1/2 mb-2 -translate-x-1/2 whitespace-nowrap rounded-md bg-ink px-2 py-1 text-xs font-medium text-paper opacity-0 shadow-lg transition-opacity duration-150 group-hover/dot:opacity-100 rtl:translate-x-1/2">
        <Num>{label}</Num>
      </span>
    </span>
  );
}

function Row({ m, name, labels }: { m: Measure; name: string; labels: ChartLabels }) {
  const pre = scale(m.pre.mean, m.domain);
  const post = scale(m.post.mean, m.domain);
  const band = (mean: number, sd: number) => {
    const a = scale(mean - sd, m.domain);
    const b = scale(mean + sd, m.domain);
    return { insetInlineStart: `${a}%`, width: `${b - a}%` };
  };
  const lo = Math.min(pre, post);
  const hi = Math.max(pre, post);
  const delta = change(m);
  const unit = m.unit ? ` ${m.unit}` : "";
  const summary = `${labels.before} ${meanSD(m.pre.mean, m.pre.sd, m.dp, m.sdDp)}; ${labels.after} ${meanSD(m.post.mean, m.post.sd, m.dp, m.sdDp)}; ${labels.change} ${signed(delta, m.dp)}${unit}; p ${m.p}`;

  return (
    <li className="grid grid-cols-1 gap-x-8 gap-y-3 py-6 md:grid-cols-[minmax(0,15rem)_minmax(0,1fr)_9rem] md:items-center">
      <div>
        <p className="font-semibold text-ink">{name}</p>
        <p className="mt-0.5 text-sm text-muted">
          <Num>
            {fixed(m.pre.mean, m.dp)} → {fixed(m.post.mean, m.dp)}
            {unit}
          </Num>
        </p>
      </div>

      <div className="relative" aria-hidden>
        <div className="relative h-12">
          {/* gridlines */}
          {m.ticks.map((t) => (
            <span key={t} className="absolute inset-y-0 w-px bg-grid" style={{ insetInlineStart: `${scale(t, m.domain)}%` }} />
          ))}
          {/* ±1 SD bands */}
          <span className="absolute top-[9px] h-[5px] rounded-full bg-pre/30" style={band(m.pre.mean, m.pre.sd)} />
          <span className="absolute bottom-[9px] h-[5px] rounded-full bg-post/30" style={band(m.post.mean, m.post.sd)} />
          {/* connector */}
          <span
            className="reveal-bar absolute top-1/2 -mt-px h-0.5 rounded-full bg-linear-to-r from-pre to-post rtl:bg-linear-to-l"
            style={{ insetInlineStart: `${lo}%`, width: `${hi - lo}%` }}
          />
          <Dot at={pre} tone="pre" label={meanSD(m.pre.mean, m.pre.sd, m.dp, m.sdDp)} />
          <Dot at={post} from={pre} tone="post" label={meanSD(m.post.mean, m.post.sd, m.dp, m.sdDp)} />
        </div>
        <div className="relative mt-1.5 h-4 font-mono text-xs text-muted">
          {m.ticks.map((t, i) => {
            const first = i === 0;
            const last = i === m.ticks.length - 1;
            return (
              <span
                key={t}
                className={cn(
                  "tnum absolute",
                  !first && !last && "-translate-x-1/2 rtl:translate-x-1/2",
                  !first && !last && m.ticks.length > 5 && i % 2 === 1 && "max-sm:hidden",
                )}
                style={last ? { insetInlineEnd: 0 } : { insetInlineStart: `${scale(t, m.domain)}%` }}
              >
                <bdi dir="ltr">{t}</bdi>
              </span>
            );
          })}
        </div>
      </div>
      <p className="sr-only">{summary}</p>

      <dl className="flex items-baseline gap-6 md:flex-col md:items-end md:gap-1 md:text-end">
        <div className="flex items-baseline gap-2">
          <dt className="sr-only">{labels.change}</dt>
          <dd className="text-2xl font-semibold tracking-tight text-ink">
            <Num>{signed(delta, m.dp)}</Num>
            {m.unit ? <bdi dir="ltr" className="ms-1 text-sm font-normal text-muted">{m.unit}</bdi> : null}
          </dd>
        </div>
        <div className="flex items-baseline gap-1.5 text-sm text-ink-2">
          <dt className="text-muted">p</dt>
          <dd className="flex items-center gap-1">
            <Num>{m.p}</Num>
            <span className="text-gold-ink" aria-hidden>
              ★
            </span>
          </dd>
        </div>
      </dl>
    </li>
  );
}

export function DumbbellFigure({
  id,
  title,
  measures,
  names,
  labels,
  after,
}: {
  id: string;
  title: string;
  measures: Measure[];
  names: Record<string, string>;
  labels: ChartLabels;
  after?: React.ReactNode;
}) {
  return (
    <figure aria-labelledby={`${id}-caption`} className="glass-card reveal p-5 sm:p-8">
      <figcaption id={`${id}-caption`} className="flex flex-col gap-4 border-b border-line pb-5 lg:flex-row lg:items-center lg:justify-between">
        <span className="text-[0.9375rem] font-semibold text-ink">
          <Num tabular={false}>{title}</Num>
        </span>
        <Legend labels={labels} />
      </figcaption>

      <ol className="divide-y divide-line">
        {measures.map((m) => (
          <Row key={m.id} m={m} name={names[m.id]} labels={labels} />
        ))}
      </ol>

      {after}

      <details className="group mt-4 border-t border-line pt-5">
        <summary className="tap-target inline-flex items-center gap-2 rounded-full border border-line px-4 py-2 text-sm font-semibold text-accent-ink transition-colors hover:border-line-strong hover:bg-surface-2">
          <span aria-hidden className="transition-transform duration-200 group-open:rotate-90 rtl:group-open:-rotate-90 rtl:-scale-x-100">
            ›
          </span>
          {labels.showTable}
        </summary>
        <div className="mt-4 overflow-x-auto">
          <table className="w-full min-w-[36rem] border-collapse text-sm">
            <thead>
              <tr className="border-b border-line-strong text-start text-ink">
                <th scope="col" className="py-2.5 pe-4 text-start font-semibold">{labels.measure}</th>
                <th scope="col" className="py-2.5 pe-4 text-start font-semibold">{labels.preCol}</th>
                <th scope="col" className="py-2.5 pe-4 text-start font-semibold">{labels.postCol}</th>
                <th scope="col" className="py-2.5 pe-4 text-start font-semibold">{labels.changeCol}</th>
                <th scope="col" className="py-2.5 text-start font-semibold">{labels.pCol}</th>
              </tr>
            </thead>
            <tbody>
              {measures.map((m) => (
                <tr key={m.id} className="border-b border-line text-ink-2">
                  <th scope="row" className="py-2.5 pe-4 text-start font-medium text-ink">
                    {names[m.id]}
                    {m.unit ? <span className="ms-1 font-normal text-muted">(<bdi dir="ltr">{m.unit}</bdi>)</span> : null}
                  </th>
                  <td className="py-2.5 pe-4"><Num>{meanSD(m.pre.mean, m.pre.sd, m.dp, m.sdDp)}</Num></td>
                  <td className="py-2.5 pe-4"><Num>{meanSD(m.post.mean, m.post.sd, m.dp, m.sdDp)}</Num></td>
                  <td className="py-2.5 pe-4"><Num>{signed(change(m), m.dp)}</Num></td>
                  <td className="py-2.5 font-medium text-accent-ink"><Num>{m.p}</Num></td>
                </tr>
              ))}
            </tbody>
          </table>
          <p className="mt-3 text-xs text-muted">{labels.changeNote}</p>
        </div>
      </details>
    </figure>
  );
}
