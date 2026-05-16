import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatNumber(num: number, decimals = 2) {
  return num.toFixed(decimals);
}

export function getChangePercent(pre: number, post: number) {
  return (((post - pre) / pre) * 100).toFixed(1);
}
