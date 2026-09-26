import { cn } from "@/lib/utils";

const ARABIC = /[؀-ۿ]/;

/**
 * Numbers and statistics ("116.83 ± 8.18", "p < 0.001") are isolated as
 * left-to-right runs so they render correctly inside Arabic text. Strings that
 * contain Arabic words ("30 د") keep automatic direction instead.
 */
export function Num({
  children,
  className,
  tabular = true,
}: {
  children: React.ReactNode;
  className?: string;
  tabular?: boolean;
}) {
  const text = typeof children === "string" ? children : Array.isArray(children) ? children.join("") : "";
  return (
    <bdi dir={ARABIC.test(text) ? undefined : "ltr"} className={cn(tabular && "tnum", className)}>
      {children}
    </bdi>
  );
}
