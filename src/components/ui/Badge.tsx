import { cn } from "@/lib/utils";

type BadgeVariant = "default" | "accent" | "teal" | "muted" | "outline" | "success" | "warning";

interface BadgeProps {
  children: React.ReactNode;
  variant?: BadgeVariant;
  size?: "sm" | "md";
  className?: string;
}

const variantStyles: Record<BadgeVariant, string> = {
  default:
    "bg-[var(--surface-raised)] text-[var(--foreground)] border border-[var(--border)]",
  accent:
    "bg-[var(--accent-subtle)] text-[var(--accent-fg)] border border-[var(--accent)]/20",
  teal:
    "bg-[var(--teal-subtle)] text-[var(--teal)] border border-[var(--teal)]/20",
  muted:
    "bg-[var(--surface)] text-[var(--muted-fg)] border border-[var(--border-subtle)]",
  outline:
    "bg-transparent text-[var(--muted-fg)] border border-[var(--border)]",
  success:
    "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20",
  warning:
    "bg-amber-500/10 text-amber-400 border border-amber-500/20",
};

const sizeStyles = {
  sm: "px-2 py-0.5 text-xs",
  md: "px-2.5 py-1 text-xs",
};

export function Badge({ children, variant = "default", size = "sm", className }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-md font-medium leading-none",
        variantStyles[variant],
        sizeStyles[size],
        className
      )}
    >
      {children}
    </span>
  );
}
