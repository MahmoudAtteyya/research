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
      <p className="flex items-baseline justify-between gap-2 text-[0.6875rem] font-semibold tracking-[0.08em] uppercase" style={{ color }}>
        <span>{label}</span>
        <bdi dir="ltr" className="font-medium tracking-normal normal-case opacity-75">{unit}</bdi>
      </p>
      <p dir="ltr" className={cn("tnum mt-1 leading-none font-semibold text-start rtl:text-end", big ? "text-[2.75rem] sm:text-5xl" : "text-[1.2rem] sm:text-[1.4rem]")} style={{ color }}>
        {value}
      </p>
      <p
        dir="ltr"
        className={cn(
          "tnum mt-1.5 h-4 text-xs text-white/60 transition-opacity duration-500 rtl:text-end",
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
        }, 1800);
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

  const d = (id: string, dp: number) => {
    const v = byId[id].post.mean - byId[id].pre.mean;
    return `+${v.toFixed(dp)}`;
  };

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
      className="relative rounded-[1.75rem] border border-white/10 bg-[#050c18] p-4 shadow-[0_50px_100px_-40px_rgb(0_0_0/0.85)] ring-1 ring-white/[0.04] sm:p-5"
    >
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="flex items-center gap-2.5 text-xs text-white/65">
          <span className="relative flex h-2 w-2" aria-hidden>
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#5ee0a0] opacity-60" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-[#5ee0a0]" />
          </span>
          <span className="font-semibold text-white/85">{t.title}</span>
          <span dir="ltr" className="tnum">
            n = {SAMPLE_SIZE}
          </span>
        </p>
        <fieldset className="flex rounded-full border border-white/10 bg-white/[0.04] p-1">
          <legend className="sr-only">{t.toggleLabel}</legend>
          {(["pre", "post"] as const).map((p) => (
            <label
              key={p}
              className={cn(
                "cursor-pointer rounded-full px-3.5 py-1.5 text-xs font-semibold transition-colors has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-crimson-400",
                phase === p ? "bg-white text-navy-900" : "text-white/70 hover:text-white",
              )}
            >
              <input type="radio" name="monitor-phase" value={p} checked={phase === p} onChange={() => choose(p)} className="sr-only" />
              {p === "pre" ? t.baseline : t.after}
            </label>
          ))}
        </fieldset>
      </div>

      <div className="mt-4 grid grid-cols-[minmax(0,9rem)_minmax(0,1fr)] items-center gap-4 rounded-2xl border border-white/[0.07] bg-white/[0.02] p-4 sm:grid-cols-[minmax(0,10.5rem)_minmax(0,1fr)]">
        <Reading label={t.hr} unit="bpm" value={hr.toFixed(2)} delta={d("hr", 2)} phase={phase} color="#5ee0a0" big />
        <div dir="ltr" className="relative h-20 overflow-hidden" aria-hidden>
          <svg
            viewBox={`0 0 ${beatsPerStrip * 200} 60`}
            preserveAspectRatio="none"
            className="ecg-strip absolute inset-y-0 left-0 h-full w-[200%]"
            style={{ ["--ecg-duration" as string]: ecgDuration }}
          >
            <path d={strip} fill="none" stroke="#5ee0a0" strokeWidth="1.6" strokeLinejoin="round" vectorEffect="non-scaling-stroke" />
          </svg>
          <div className="absolute inset-y-0 right-0 w-16 bg-linear-to-l from-[#070e1b] to-transparent" />
        </div>
      </div>

      <div className="mt-3 grid grid-cols-[1.45fr_1fr_1fr] gap-3">
        <div className="rounded-2xl border border-white/[0.07] bg-white/[0.02] p-3.5">
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

      <figcaption className="mt-4 flex flex-col gap-1 text-xs leading-relaxed text-white/55 sm:flex-row sm:items-start sm:justify-between sm:gap-6">
        <span>{t.note}</span>
        <span dir="auto" className="shrink-0 font-semibold text-gold-300">
          {t.significance}
        </span>
      </figcaption>
    </figure>
  );
}
