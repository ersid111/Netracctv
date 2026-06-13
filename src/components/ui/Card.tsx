import { cn } from "@/lib/utils";

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  glass?: boolean;
}

export function Card({ children, className, hover = false, glass = true }: CardProps) {
  return (
    <div
      className={cn(
        "rounded-2xl border border-white/10 overflow-hidden",
        glass && "bg-white/5 backdrop-blur-sm",
        hover && "transition-all duration-300 hover:border-brand-blue/40 hover:shadow-glow hover:-translate-y-1 cursor-pointer",
        className
      )}
    >
      {children}
    </div>
  );
}

interface CardHeaderProps {
  children: React.ReactNode;
  className?: string;
}

export function CardHeader({ children, className }: CardHeaderProps) {
  return <div className={cn("p-6 pb-0", className)}>{children}</div>;
}

export function CardContent({ children, className }: CardHeaderProps) {
  return <div className={cn("p-6", className)}>{children}</div>;
}

export function CardFooter({ children, className }: CardHeaderProps) {
  return (
    <div className={cn("px-6 pb-6 pt-0 flex items-center gap-3", className)}>
      {children}
    </div>
  );
}
