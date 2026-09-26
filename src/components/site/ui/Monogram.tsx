import { cn } from "@/lib/utils";

/** Gold "MA" seal — the website author's signature mark. The text ring turns slowly. */
export function Monogram({ className, idSuffix = "seal" }: { className?: string; idSuffix?: string }) {
  const ringId = `ma-ring-${idSuffix}`;
  const gradId = `ma-grad-${idSuffix}`;
  return (
    <svg viewBox="0 0 100 100" aria-hidden="true" className={cn("text-gold-300", className)}>
      <defs>
        <path id={ringId} d="M50 50 m-38 0 a38 38 0 1 1 76 0 a38 38 0 1 1 -76 0" />
        <radialGradient id={gradId} cx="50%" cy="40%" r="60%">
          <stop offset="0%" stopColor="#e3c868" stopOpacity="0.22" />
          <stop offset="100%" stopColor="#e3c868" stopOpacity="0" />
        </radialGradient>
      </defs>
      <circle cx="50" cy="50" r="48" fill={`url(#${gradId})`} stroke="currentColor" strokeWidth="1.25" />
      <circle cx="50" cy="50" r="30" fill="none" stroke="currentColor" strokeWidth="0.75" opacity="0.7" />
      <g className="spin-slow">
        <text
          fill="currentColor"
          fontSize="7.6"
          letterSpacing="1.6"
          style={{ fontFamily: "var(--font-geist-mono), ui-monospace, monospace", fontWeight: 500 }}
        >
          <textPath href={`#${ringId}`} startOffset="0" textLength="236" lengthAdjust="spacing">
            MAHMOUD ATTIA • SUEZ MEDICINE • MMXXVI •
          </textPath>
        </text>
      </g>
      <text
        x="50"
        y="58.5"
        textAnchor="middle"
        fill="currentColor"
        fontSize="25"
        style={{ fontFamily: "var(--font-newsreader), Georgia, serif", fontStyle: "italic", fontWeight: 500 }}
      >
        MA
      </text>
    </svg>
  );
}
