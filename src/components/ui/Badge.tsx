import { cn } from "@/lib/utils";

type BadgeVariant =
  | "default"
  | "accent"
  | "teal"
  | "muted"
  | "outline"
  | "success"
  | "warning";

interface BadgeProps {
  children: React.ReactNode;
  variant?: BadgeVariant;
  size?: "sm" | "md";
  className?: string;
}

const variants: Record<BadgeVariant, string> = {
  default: "bg-surface-raised text-foreground border border-border",
  accent:
    "bg-violet-500/15 text-violet-300 border border-violet-500/30 shadow-sm shadow-violet-500/10",
  teal: "bg-cyan-500/15 text-cyan-300 border border-cyan-500/30 shadow-sm shadow-cyan-500/10",
  muted: "bg-surface text-muted-fg border border-border-subtle",
  outline: "bg-transparent text-muted-fg border border-border",
  success:
    "bg-emerald-500/15 text-emerald-300 border border-emerald-500/30 shadow-sm shadow-emerald-500/10",
  warning:
    "bg-amber-500/15 text-amber-300 border border-amber-500/30 shadow-sm shadow-amber-500/10",
};

const sizes = {
  sm: "px-2 py-0.5 text-xs",
  md: "px-2.5 py-1 text-xs",
};

export function Badge({
  children,
  variant = "default",
  size = "sm",
  className,
}: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-md font-medium leading-none",
        variants[variant],
        sizes[size],
        className,
      )}
    >
      {children}
    </span>
  );
}
