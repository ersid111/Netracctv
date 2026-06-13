import { cn } from "@/lib/utils";

interface BadgeProps {
  children: React.ReactNode;
  variant?: "default" | "blue" | "green" | "red" | "yellow" | "purple" | "orange" | "outline";
  size?: "sm" | "md";
  className?: string;
}

export function Badge({ children, variant = "default", size = "sm", className }: BadgeProps) {
  const variants = {
    default: "bg-white/10 text-white/80",
    blue: "bg-brand-blue/20 text-blue-300 border border-brand-blue/30",
    green: "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30",
    red: "bg-brand-red/20 text-red-400 border border-brand-red/30",
    yellow: "bg-yellow-500/20 text-yellow-400 border border-yellow-500/30",
    purple: "bg-purple-500/20 text-purple-400 border border-purple-500/30",
    orange: "bg-orange-500/20 text-orange-400 border border-orange-500/30",
    outline: "border border-white/20 text-white/70",
  };

  const sizes = {
    sm: "text-xs px-2 py-0.5",
    md: "text-sm px-3 py-1",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full font-medium",
        variants[variant],
        sizes[size],
        className
      )}
    >
      {children}
    </span>
  );
}
