"use client";
import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";
import { cn } from "@/lib/utils";

export function ThemeToggle({ label, className }: { label: string; className?: string }) {
  const { resolvedTheme, setTheme } = useTheme();
  const toggle = () => {
    const isDark = resolvedTheme ? resolvedTheme === "dark" : document.documentElement.classList.contains("dark");
    setTheme(isDark ? "light" : "dark");
  };
  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={label}
      title={label}
      className={cn(
        "inline-grid h-10 w-10 place-items-center rounded-full border border-white/15 text-white/85 transition-colors hover:border-white/30 hover:bg-white/10 hover:text-white",
        className,
      )}
    >
      <Sun className="hidden h-[18px] w-[18px] dark:block" aria-hidden />
      <Moon className="h-[18px] w-[18px] dark:hidden" aria-hidden />
    </button>
  );
}
