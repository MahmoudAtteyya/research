"use client";
import { useEffect, useRef, useState } from "react";

/**
 * Counts the first number in `value` up from zero when it scrolls into view
 * ("5 / 5", "30 min", "23.68 ± 5.8"). The server renders the final value, so
 * the number is correct without JavaScript, for search engines and under
 * reduced motion. Numbers already on screen at load are not animated.
 */
export function CountUp({ value, duration = 1600, className }: { value: string; duration?: number; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [text, setText] = useState(value);

  useEffect(() => {
    const el = ref.current;
    const match = value.match(/\d+(?:\.\d+)?/);
    if (!el || !match) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom > 0) return;

    const target = parseFloat(match[0]);
    const dp = (match[0].split(".")[1] ?? "").length;
    const format = (n: number) => value.replace(match[0], n.toFixed(dp));
    setText(format(0));

    let raf = 0;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        io.disconnect();
        const start = performance.now();
        const tick = (now: number) => {
          const p = Math.min(1, (now - start) / duration);
          const eased = 1 - Math.pow(1 - p, 3);
          if (p < 1) {
            setText(format(target * eased));
            raf = requestAnimationFrame(tick);
          } else {
            setText(value);
          }
        };
        raf = requestAnimationFrame(tick);
      },
      { threshold: 0.6 },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [value, duration]);

  return (
    <span ref={ref} className={className}>
      <span aria-hidden>{text}</span>
      <span className="sr-only">{value}</span>
    </span>
  );
}
