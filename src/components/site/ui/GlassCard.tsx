import { cn } from "@/lib/utils";

type GlassCardProps<T extends React.ElementType> = {
  as?: T;
  /** Gradient hairline border for highlighted cards. */
  highlight?: boolean;
  /** Lift on hover (pointer devices only). */
  interactive?: boolean;
  className?: string;
  children?: React.ReactNode;
} & Omit<React.ComponentPropsWithoutRef<T>, "as" | "className" | "children">;

/** The site's standard surface: translucent glass on dark, white card on light. */
export function GlassCard<T extends React.ElementType = "div">({
  as,
  highlight = false,
  interactive = false,
  className,
  children,
  ...rest
}: GlassCardProps<T>) {
  const Tag = (as ?? "div") as React.ElementType;
  return (
    <Tag className={cn("glass-card", highlight && "glow-border", interactive && "card-hover", className)} {...rest}>
      {children}
    </Tag>
  );
}
