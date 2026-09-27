"use client";
import { useEffect, useRef, useState } from "react";
import { VITAL_SIGNS, SAMPLE_SIZE } from "@/content/study";
import type { Dictionary } from "@/content/i18n";
import { cn } from "@/lib/utils";

type Phase = "pre" | "post";
const byId = Object.fromEntries(VITAL_SIGNS.map((v) => [v.id, v]));

function prefersReducedMotion() {
  return typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/** Tween a number towards a target (instant under reduced motion). */
function useTween(target: number, duration = 900) {
  const [value, setValue] = useState(target);
  const from = useRef(target);
  useEffect(() => {
    if (prefersReducedMotion()) {
      from.current = target;
      setValue(target);
      return;
    }
    const start = performance.now();
    const origin = from.current;
    let raf = 0;
    const tick = (now: number) => {
      const p = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - p, 4);
      const v = origin + (target - origin) * eased;
      from.current = v;
      setValue(v);
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, duration]);
  return value;
}

function Reading({
  label,
  unit,
  value,
  delta,
  phase,
  color,
  big = false,
}: {
  label: string;
  unit: string;
  value: string;
  delta: string;
  phase: Phase;
  color: string;
  big?: boolean;
}) {
  return (
    <div className="min-w-0">
      <p className="flex items-baseline justify-between gap-2 font-mono text-xs font-medium tracking-[0.08em] uppercase" style={{ color }}>
        <span className="truncate">{label}</span>
        <bdi dir="ltr" className="shrink-0 tracking-normal normal-case opacity-75">
          {unit}
        </bdi>
      </p>
      <p
        dir="ltr"
        className={cn(
          "tnum mt-1.5 leading-none font-semibold tracking-tight text-start rtl:text-end",
          big ? "text-[2.5rem] @sm:text-[3.25rem]" : "text-[1.35rem] @md:text-[1.5rem]",
        )}
        style={{ color, textShadow: `0 0 24px ${color}55` }}
      >
        {value}
      </p>
      <p
        dir="ltr"
        className={cn(
          "tnum mt-1.5 h-4 font-mono text-xs text-white/60 transition-opacity duration-500 rtl:text-end",
          phase === "post" ? "opacity-100" : "opacity-0",
        )}
      >
        {delta}
      </p>
    </div>
  );
}

/** One heartbeat (P wave, QRS complex, T wave) in relative path commands, 100 units wide. */
const BEAT = "h14 q3 -6 6 0 h8 l2 5 l4 -27 l4 33 l3 -11 h13 q7 -10 14 0 h32";

export function VitalMonitor({ t }: { t: Dictionary["monitor"] }) {
  const [phase, setPhase] = useState<Phase>("pre");
  const touched = useRef(false);
  const root = useRef<HTMLElement>(null);

  // Play the before → after transition once, when the monitor comes into view.
  useEffect(() => {
    if (prefersReducedMotion() || !root.current) return;
    let timer: number | undefined;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        io.disconnect();
        timer = window.setTimeout(() => {
          if (!touched.current) setPhase("post");
        }, 2200);
      },
      { threshold: 0.45 },
    );
    io.observe(root.current);
    return () => {
      io.disconnect();
      if (timer) window.clearTimeout(timer);
    };
  }, []);

  const pick = (id: string) => byId[id][phase].mean;
  const hr = useTween(pick("hr"));
  const sbp = useTween(pick("sbp"));
  const dbp = useTween(pick("dbp"));
  const rr = useTween(pick("rr"));
  const temp = useTween(pick("temp"));

  const d = (id: string, dp: number) => `+${(byId[id].post.mean - byId[id].pre.mean).toFixed(dp)}`;

  const choose = (p: Phase) => {
    touched.current = true;
    setPhase(p);
  };

  const beatsPerStrip = 3;
  const ecgDuration = `${((beatsPerStrip * 60) / hr).toFixed(2)}s`;
  const strip = "M0 30 " + Array.from({ length: beatsPerStrip * 2 }, () => BEAT).join(" ");

  return (
    <figure
      ref={root}
      className="glow-border @container relative rounded-[2rem] bg-linear-to-b from-white/[0.07] to-white/[0.02] p-2 shadow-[0_60px_120px_-50px_rgb(0_0_0/0.95),0_0_80px_-30px_var(--glow-crimson)] light:from-[#1c2638] light:to-[#0a101b] light:shadow-[0_50px_100px_-45px_rgb(11_27_51/0.6),0_0_0_1px_rgb(11_27_51/0.1)] [--glow-gradient:linear-gradient(160deg,rgb(255_255_255/0.28),rgb(255_255_255/0.04)_40%,rgb(240_80_106/0.35))]"
    >
      <div className="relative overflow-hidden rounded-[1.6rem] bg-[#03070f] p-3.5 sm:p-4">
        {/* screen reflection */}
        <div aria-hidden className="pointer-events-none absolute inset-0 bg-linear-to-br from-white/[0.05] via-transparent to-transparent" />

        <div className="relative flex flex-wrap items-center justify-between gap-3">
          <p className="flex min-w-0 items-center gap-2.5 font-mono text-xs text-white/65">
            <span className="relative flex h-2 w-2 shrink-0" aria-hidden>
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-mint opacity-60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-mint" />
            </span>
            <span className="truncate font-sans text-[0.8125rem] font-semibold text-white/85">{t.title}</span>
            <span dir="ltr" className="tnum shrink-0">
              n = {SAMPLE_SIZE}
            </span>
          </p>
          <fieldset className="flex rounded-full border border-white/10 bg-white/[0.04] p-1">
            <legend className="sr-only">{t.toggleLabel}</legend>
            {(["pre", "post"] as const).map((p) => (
              <label
                key={p}
                className={cn(
                  "tap-target inline-flex h-9 cursor-pointer items-center rounded-full px-4 text-[0.8125rem] font-semibold transition-colors has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-crimson-400",
                  phase === p ? "bg-white text-navy-900 shadow-[0_4px_16px_-4px_rgb(255_255_255/0.4)]" : "text-white/70 hover:text-white",
                )}
              >
                <input type="radio" name="monitor-phase" value={p} checked={phase === p} onChange={() => choose(p)} className="sr-only" />
                {p === "pre" ? t.baseline : t.after}
              </label>
            ))}
          </fieldset>
        </div>

        <div className="relative mt-4 grid grid-cols-1 items-center gap-3 rounded-2xl border border-white/[0.07] bg-white/[0.02] p-4 @xs:grid-cols-[minmax(0,9.5rem)_minmax(0,1fr)] @xs:gap-4">
          <Reading label={t.hr} unit="bpm" value={hr.toFixed(2)} delta={d("hr", 2)} phase={phase} color="#5ee0a0" big />
          <div dir="ltr" className="relative h-16 overflow-hidden @xs:h-20" aria-hidden>
            <svg
              viewBox={`0 0 ${beatsPerStrip * 200} 60`}
              preserveAspectRatio="none"
              className="ecg-strip absolute inset-y-0 left-0 h-full w-[200%]"
              style={{ ["--ecg-duration" as string]: ecgDuration }}
            >
              <path
                d={strip}
                fill="none"
                stroke="#5ee0a0"
                strokeWidth="1.8"
                strokeLinejoin="round"
                vectorEffect="non-scaling-stroke"
                style={{ filter: "drop-shadow(0 0 4px rgb(94 224 160 / 0.6))" }}
              />
            </svg>
            <div className="absolute inset-y-0 right-0 w-16 bg-linear-to-l from-[#050a14] to-transparent" />
          </div>
        </div>

        <div className="relative mt-3 grid grid-cols-2 gap-3 @md:grid-cols-[1.45fr_1fr_1fr]">
          <div className="col-span-2 rounded-2xl border border-white/[0.07] bg-white/[0.02] p-3.5 @md:col-span-1">
            <Reading
              label={t.bp}
              unit="mmHg"
              value={`${sbp.toFixed(1)}/${dbp.toFixed(1)}`}
              delta={`${d("sbp", 1)}/${d("dbp", 1)}`}
              phase={phase}
              color="#ff8398"
            />
          </div>
          <div className="rounded-2xl border border-white/[0.07] bg-white/[0.02] p-3.5">
            <Reading label={t.rr} unit="/min" value={rr.toFixed(2)} delta={d("rr", 2)} phase={phase} color="#f2c14e" />
          </div>
          <div className="rounded-2xl border border-white/[0.07] bg-white/[0.02] p-3.5">
            <Reading label={t.temp} unit="°C" value={temp.toFixed(3)} delta={d("temp", 3)} phase={phase} color="#9dc3f0" />
          </div>
        </div>

        <figcaption className="relative mt-4 flex flex-col gap-1.5 text-xs leading-relaxed text-white/55 @md:flex-row @md:items-start @md:justify-between @md:gap-6">
          <span>{t.note}</span>
          <span dir="auto" className="shrink-0 font-semibold text-gold-300">
            {t.significance}
          </span>
        </figcaption>
      </div>
    </figure>
  );
}
