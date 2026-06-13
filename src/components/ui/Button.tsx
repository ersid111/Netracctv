"use client";

import { forwardRef } from "react";
import { cn } from "@/lib/utils";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "danger" | "whatsapp";
  size?: "sm" | "md" | "lg" | "xl";
  loading?: boolean;
  icon?: React.ReactNode;
  iconRight?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = "primary",
      size = "md",
      loading = false,
      icon,
      iconRight = false,
      children,
      disabled,
      ...props
    },
    ref
  ) => {
    const base =
      "inline-flex items-center justify-center gap-2 font-semibold rounded-lg transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-60 disabled:cursor-not-allowed select-none";

    const variants = {
      primary:
        "bg-brand-blue text-white hover:bg-brand-blue-dark focus-visible:ring-brand-blue shadow-lg hover:shadow-glow active:scale-[0.98]",
      secondary:
        "bg-white/10 text-white border border-white/20 hover:bg-white/20 backdrop-blur-sm focus-visible:ring-white",
      outline:
        "border-2 border-brand-blue text-brand-blue hover:bg-brand-blue hover:text-white focus-visible:ring-brand-blue",
      ghost: "text-white hover:bg-white/10 focus-visible:ring-white",
      danger: "bg-brand-red text-white hover:bg-brand-red-dark focus-visible:ring-brand-red",
      whatsapp:
        "bg-[#25D366] text-white hover:bg-[#1DA851] focus-visible:ring-[#25D366] shadow-lg active:scale-[0.98]",
    };

    const sizes = {
      sm: "text-sm px-4 py-2",
      md: "text-sm px-5 py-2.5",
      lg: "text-base px-6 py-3",
      xl: "text-lg px-8 py-4",
    };

    return (
      <button
        ref={ref}
        disabled={disabled || loading}
        className={cn(base, variants[variant], sizes[size], className)}
        {...props}
      >
        {loading && (
          <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.4 0 0 5.4 0 12h4z" />
          </svg>
        )}
        {!loading && icon && !iconRight && icon}
        {children}
        {!loading && icon && iconRight && icon}
      </button>
    );
  }
);

Button.displayName = "Button";
export { Button };
