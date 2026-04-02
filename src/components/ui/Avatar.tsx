import { cn } from "@/lib/utils";

interface AvatarProps {
  name: string;
  src?: string;
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
}

const sizeMap = {
  sm: "w-8 h-8 text-xs",
  md: "w-10 h-10 text-sm",
  lg: "w-14 h-14 text-base",
  xl: "w-20 h-20 text-xl",
};

const GRADIENTS = [
  "from-violet-500 to-indigo-600",
  "from-indigo-500 to-blue-600",
  "from-teal-500 to-cyan-600",
  "from-emerald-500 to-teal-600",
  "from-rose-500 to-pink-600",
  "from-amber-500 to-orange-600",
];

function getInitials(name: string) {
  return name.split(" ").slice(0, 2).map((n) => n[0]).join("").toUpperCase();
}

function gradientFor(name: string) {
  let h = 0;
  for (let i = 0; i < name.length; i++) h = (h + name.charCodeAt(i)) % GRADIENTS.length;
  return GRADIENTS[h];
}

export function Avatar({ name, src, size = "md", className }: AvatarProps) {
  if (src) {
    // eslint-disable-next-line @next/next/no-img-element
    return <img src={src} alt={name} className={cn("rounded-full object-cover", sizeMap[size], className)} />;
  }
  return (
    <div
      className={cn(
        "rounded-full flex items-center justify-center font-semibold text-white shrink-0 bg-linear-to-br",
        gradientFor(name),
        sizeMap[size],
        className
      )}
      aria-label={name}
    >
      {getInitials(name)}
    </div>
  );
}
