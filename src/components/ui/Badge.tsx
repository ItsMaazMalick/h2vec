import { cn } from "@/lib/utils";

type BadgeVariant = "default" | "accent" | "teal" | "muted" | "outline" | "success" | "warning";

interface BadgeProps {
  children: React.ReactNode;
  variant?: BadgeVariant;
  size?: "sm" | "md";
  className?: string;
}

const variants: Record<BadgeVariant, string> = {
  default:  "bg-surface-raised text-foreground border border-border",
  accent:   "bg-accent/10 text-accent-fg border border-accent/20",
  teal:     "bg-teal/10 text-teal border border-teal/20",
  muted:    "bg-surface text-muted-fg border border-border-subtle",
  outline:  "bg-transparent text-muted-fg border border-border",
  success:  "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20",
  warning:  "bg-amber-500/10 text-amber-400 border border-amber-500/20",
};

const sizes = {
  sm: "px-2 py-0.5 text-xs",
  md: "px-2.5 py-1 text-xs",
};

export function Badge({ children, variant = "default", size = "sm", className }: BadgeProps) {
  return (
    <span className={cn("inline-flex items-center rounded-md font-medium leading-none", variants[variant], sizes[size], className)}>
      {children}
    </span>
  );
}
