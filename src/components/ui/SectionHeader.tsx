import { cn } from "@/lib/utils";

interface SectionHeaderProps {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  className?: string;
}

export function SectionHeader({ eyebrow, title, description, align = "center", className }: SectionHeaderProps) {
  return (
    <div className={cn("max-w-2xl", align === "center" && "mx-auto text-center", className)}>
      {eyebrow && (
        <p className="text-xs font-semibold tracking-widest uppercase text-accent mb-3">
          {eyebrow}
        </p>
      )}
      <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-foreground text-balance">
        {title}
      </h2>
      {description && (
        <p className="mt-4 text-muted-fg leading-relaxed text-balance">{description}</p>
      )}
    </div>
  );
}
