"use client";
import { useEffect, useRef, useState } from "react";
import { ArrowUp } from "lucide-react";
import { cn } from "@/lib/utils";

/** Floating "back to top" button with a ring showing reading progress. */
export function BackToTop({ label }: { label: string }) {
  const [visible, setVisible] = useState(false);
  const ring = useRef<SVGCircleElement>(null);

  useEffect(() => {
    let raf = 0;
    const update = () => {
      raf = 0;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const progress = max > 0 ? Math.min(1, window.scrollY / max) : 0;
      setVisible(window.scrollY > 600);
      if (ring.current) ring.current.style.strokeDashoffset = String(1 - progress);
    };
    const schedule = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      cancelAnimationFrame(raf);
    };
  }, []);

  const toTop = () => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" });
    document.getElementById("main")?.focus({ preventScroll: true });
  };

  return (
    <button
      type="button"
      onClick={toTop}
      aria-label={label}
      title={label}
      inert={!visible}
      className={cn(
        "no-print fixed end-4 bottom-4 z-40 grid h-12 w-12 place-items-center rounded-full border border-white/10 bg-navy-950/80 text-white shadow-[0_18px_40px_-16px_rgb(0_0_0/0.9)] backdrop-blur-xl transition-[opacity,transform] duration-500 hover:bg-navy-900 sm:end-6 sm:bottom-6 sm:h-14 sm:w-14",
        visible ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-4 opacity-0",
      )}
    >
      <svg viewBox="0 0 48 48" aria-hidden className="absolute inset-0 h-full w-full -rotate-90 rtl:scale-x-[-1]">
        <circle cx="24" cy="24" r="22" fill="none" stroke="rgb(255 255 255 / 0.1)" strokeWidth="2" />
        <circle
          ref={ring}
          cx="24"
          cy="24"
          r="22"
          fill="none"
          stroke="url(#btt-gradient)"
          strokeWidth="2"
          strokeLinecap="round"
          pathLength={1}
          strokeDasharray="1"
          strokeDashoffset="1"
        />
        <defs>
          <linearGradient id="btt-gradient" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#f0506a" />
            <stop offset="100%" stopColor="#e3c868" />
          </linearGradient>
        </defs>
      </svg>
      <ArrowUp className="relative h-5 w-5" aria-hidden />
    </button>
  );
}
