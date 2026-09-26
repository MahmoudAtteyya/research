"use client";
import { useRef, useState } from "react";
import { ArrowRight, Check, RotateCcw, X } from "lucide-react";
import type { Dictionary } from "@/content/i18n";
import { cn } from "@/lib/utils";

export function Quiz({ t }: { t: Dictionary["quiz"] }) {
  const total = t.questions.length;
  const [index, setIndex] = useState(0);
  const [picked, setPicked] = useState<number | null>(null);
  const [results, setResults] = useState<boolean[]>([]);
  const [done, setDone] = useState(false);
  const headingRef = useRef<HTMLHeadingElement>(null);

  const q = t.questions[index];
  const answered = picked !== null;
  const score = results.filter(Boolean).length;

  const choose = (i: number) => {
    if (answered) return;
    setPicked(i);
    setResults((r) => [...r, i === q.answer]);
  };

  const next = () => {
    if (index + 1 >= total) {
      setDone(true);
    } else {
      setIndex(index + 1);
      setPicked(null);
    }
    requestAnimationFrame(() => headingRef.current?.focus());
  };

  const restart = () => {
    setIndex(0);
    setPicked(null);
    setResults([]);
    setDone(false);
    requestAnimationFrame(() => headingRef.current?.focus());
  };

  const message = t.scoreMessages[Math.min(t.scoreMessages.length - 1, Math.floor((score / total) * (t.scoreMessages.length - 1) + 0.0001))];

  return (
    <div className="reveal mx-auto max-w-2xl rounded-3xl border border-line bg-surface p-6 shadow-lift sm:p-9">
      <div className="flex items-center justify-between gap-4">
        <p className="text-sm font-medium text-muted">
          {done ? (
            t.scoreTitle
          ) : (
            <>
              {t.question} <bdi dir="ltr" className="tnum">{index + 1}</bdi> {t.of} <bdi dir="ltr" className="tnum">{total}</bdi>
            </>
          )}
        </p>
        <ol className="flex gap-1.5" aria-hidden>
          {t.questions.map((_, i) => (
            <li
              key={i}
              className={cn(
                "h-1.5 w-7 rounded-full transition-colors duration-300",
                i < results.length ? (results[i] ? "bg-pre" : "bg-accent") : i === index && !done ? "bg-ink/40" : "bg-grid",
              )}
            />
          ))}
        </ol>
      </div>

      {done ? (
        <div className="py-6 text-center">
          <h3 ref={headingRef} tabIndex={-1} className="font-display text-6xl font-medium text-ink outline-none">
            <bdi dir="ltr" className="tnum">
              {score}/{total}
            </bdi>
          </h3>
          <p className="mt-4 text-lg text-ink-2" aria-live="polite">
            {message}
          </p>
          <button
            type="button"
            onClick={restart}
            className="mt-8 inline-flex items-center gap-2 rounded-full border border-line-strong px-5 py-2.5 text-sm font-semibold text-ink hover:bg-surface-2"
          >
            <RotateCcw className="h-4 w-4" aria-hidden />
            {t.restart}
          </button>
        </div>
      ) : (
        <div className="mt-6">
          <h3 ref={headingRef} tabIndex={-1} className="font-display text-2xl leading-snug font-medium text-ink outline-none sm:text-[1.75rem]">
            {q.q}
          </h3>
          <div role="group" aria-label={q.q} className="mt-6 grid gap-3 sm:grid-cols-2">
            {q.options.map((opt, i) => {
              const isCorrect = i === q.answer;
              const isPicked = i === picked;
              return (
                <button
                  key={opt}
                  type="button"
                  onClick={() => choose(i)}
                  disabled={answered}
                  aria-pressed={isPicked}
                  className={cn(
                    "flex items-center justify-between gap-3 rounded-2xl border px-4 py-3.5 text-start text-[0.9375rem] font-medium transition-[border-color,background-color] duration-200",
                    !answered && "border-line-strong bg-surface hover:border-ink/40 hover:bg-surface-2",
                    answered && isCorrect && "border-pre bg-pre/10 text-ink",
                    answered && isPicked && !isCorrect && "border-accent bg-accent/10 text-ink",
                    answered && !isCorrect && !isPicked && "border-line text-muted",
                  )}
                >
                  <span dir="auto">{opt}</span>
                  {answered && isCorrect ? <Check className="h-5 w-5 shrink-0 text-pre" aria-hidden /> : null}
                  {answered && isPicked && !isCorrect ? <X className="h-5 w-5 shrink-0 text-accent" aria-hidden /> : null}
                </button>
              );
            })}
          </div>

          <div aria-live="polite" className="min-h-0">
            {answered ? (
              <div className="mt-6 rounded-2xl bg-surface-2 p-4 sm:p-5">
                <p className="text-[0.9375rem] leading-relaxed text-ink-2">
                  <strong className={cn("font-semibold", picked === q.answer ? "text-pre" : "text-accent-ink")}>
                    {picked === q.answer ? t.correct : t.incorrect}
                  </strong>{" "}
                  {q.fact}
                </p>
              </div>
            ) : null}
          </div>

          {answered ? (
            <div className="mt-6 flex justify-end">
              <button
                type="button"
                onClick={next}
                className="inline-flex items-center gap-2 rounded-full bg-ink px-5 py-2.5 text-sm font-semibold text-paper transition-opacity hover:opacity-90"
              >
                {index + 1 >= total ? t.finish : t.next}
                <ArrowRight className="h-4 w-4 rtl:-scale-x-100" aria-hidden />
              </button>
            </div>
          ) : null}
        </div>
      )}
    </div>
  );
}
