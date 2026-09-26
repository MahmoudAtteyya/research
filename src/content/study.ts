/**
 * Study results — transcribed from the official poster
 * ("Professional_Scientific_Poster", 4th Annual Student Symposium, 9 Jun 2026).
 *
 * This file is the single source of truth for every number on the site.
 * Values are reproduced exactly as reported; nothing here is re-analysed.
 * Change is derived from the reported means (post − pre).
 */

export type MeanSD = { mean: number; sd: number };

export type Measure = {
  id: string;
  unit: string;
  /** Decimal places for means and change, and for SDs (as printed on the poster). */
  dp: number;
  sdDp: number;
  pre: MeanSD;
  post: MeanSD;
  /** p-value exactly as printed on the poster. */
  p: string;
  /** Axis domain for the dumbbell chart (chosen to frame mean ± SD). */
  domain: [number, number];
  ticks: number[];
};

export const SAMPLE_SIZE = 47;

export const VITAL_SIGNS: Measure[] = [
  { id: "sbp", unit: "mmHg", dp: 2, sdDp: 2, pre: { mean: 116.83, sd: 8.18 }, post: { mean: 119.85, sd: 8.18 }, p: "< 0.001", domain: [105, 130], ticks: [105, 110, 115, 120, 125, 130] },
  { id: "dbp", unit: "mmHg", dp: 2, sdDp: 2, pre: { mean: 76.21, sd: 8.34 }, post: { mean: 77.49, sd: 8.62 }, p: "< 0.001", domain: [65, 90], ticks: [65, 70, 75, 80, 85, 90] },
  { id: "hr", unit: "bpm", dp: 2, sdDp: 2, pre: { mean: 75.62, sd: 9.91 }, post: { mean: 78.64, sd: 10.31 }, p: "< 0.001", domain: [60, 95], ticks: [60, 65, 70, 75, 80, 85, 90, 95] },
  { id: "rr", unit: "/min", dp: 2, sdDp: 2, pre: { mean: 16.7, sd: 1.99 }, post: { mean: 17.45, sd: 2.77 }, p: "< 0.001", domain: [14, 21], ticks: [14, 15, 16, 17, 18, 19, 20, 21] },
  { id: "temp", unit: "°C", dp: 3, sdDp: 3, pre: { mean: 37.004, sd: 0.35 }, post: { mean: 37.215, sd: 0.351 }, p: "< 0.001", domain: [36.6, 37.6], ticks: [36.6, 36.8, 37, 37.2, 37.4, 37.6] },
];

export const COGNITIVE: Measure[] = [
  { id: "mindfulness", unit: "", dp: 2, sdDp: 3, pre: { mean: 52.4, sd: 2.651 }, post: { mean: 53.0, sd: 2.085 }, p: "< 0.001", domain: [49, 56], ticks: [49, 50, 51, 52, 53, 54, 55, 56] },
  { id: "memory", unit: "", dp: 2, sdDp: 3, pre: { mean: 9.32, sd: 3.224 }, post: { mean: 9.43, sd: 3.5 }, p: "< 0.001", domain: [5, 14], ticks: [5, 8, 11, 14] },
  { id: "speed", unit: "", dp: 2, sdDp: 3, pre: { mean: 0.55, sd: 0.88 }, post: { mean: 0.64, sd: 0.919 }, p: "< 0.001", domain: [0, 1.6], ticks: [0, 0.4, 0.8, 1.2, 1.6] },
];

/** Domains reported as 1.00 before and after (SPSS footnote "a": no variance). */
export const COGNITIVE_UNCHANGED = ["attention", "concentration"] as const;
export const UNCHANGED_SCORE = 1.0;

export const PARTICIPANTS = {
  total: 47,
  male: 33,
  female: 14,
  malePct: 70.2,
  femalePct: 29.8,
  ageMean: 23.68,
  ageSD: 5.8,
  ageMin: 18,
  ageMax: 42,
  students: 39,
  nonStudents: 8,
};

export type Share = { id: string; pct: number };

/** Figure 1 — Frequency of consumption (n = 47). Ordered least → most frequent. */
export const FREQUENCY: Share[] = [
  { id: "rarely", pct: 31.1 },
  { id: "monthly", pct: 42.2 },
  { id: "weekly12", pct: 11.1 },
  { id: "weekly35", pct: 13.3 },
  { id: "daily", pct: 2.2 },
];

/** Figure 2 — Reasons for consuming (n = 47). */
export const REASONS: Share[] = [
  { id: "studying", pct: 33.3 },
  { id: "energy", pct: 28.9 },
  { id: "taste", pct: 11.1 },
  { id: "curiosity", pct: 11.1 },
  { id: "sports", pct: 8.9 },
  { id: "social", pct: 6.7 },
];

/** Figure 3 — Reported side effects (poster reports proportions; n = 33). */
export const SIDE_EFFECTS: Share[] = [
  { id: "palpitations", pct: 30 },
  { id: "urination", pct: 19 },
  { id: "anxiety", pct: 13 },
  { id: "headache", pct: 13 },
  { id: "insomnia", pct: 11 },
  { id: "dizziness", pct: 11 },
  { id: "tremors", pct: 6 },
  { id: "chestPain", pct: 6 },
  { id: "blurredVision", pct: 2 },
  { id: "nausea", pct: 0 },
];

/** Figure 4 — Onset of symptoms (n = 33). Ordered by time. */
export const ONSET: Share[] = [
  { id: "lt30", pct: 25 },
  { id: "m30to60", pct: 50 },
  { id: "h1to3", pct: 18.8 },
  { id: "gt3", pct: 6.3 },
];

export const FIGURE_N = { frequency: 47, reasons: 47, sideEffects: 33, onset: 33 };

export function change(m: Measure): number {
  return m.post.mean - m.pre.mean;
}
