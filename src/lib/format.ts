/** Number formatting for study values. Always Western digits, as on the poster. */
export function fixed(value: number, dp: number): string {
  return value.toFixed(dp);
}

export function signed(value: number, dp: number): string {
  const s = Math.abs(value).toFixed(dp);
  if (Number(s) === 0) return s;
  return (value > 0 ? "+" : "−") + s;
}

export function meanSD(mean: number, sd: number, dp: number, sdDp = dp): string {
  return `${mean.toFixed(dp)} ± ${sd.toFixed(sdDp)}`;
}

export function pct(value: number): string {
  return `${Number.isInteger(value) ? value : value.toFixed(1)}%`;
}

/** Position of a value on a [min, max] domain as a clamped percentage. */
export function scale(value: number, [min, max]: [number, number]): number {
  return Math.min(100, Math.max(0, ((value - min) / (max - min)) * 100));
}
