"use client";

import { forwardRef } from "react";
import { cn } from "@/lib/utils";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  icon?: React.ReactNode;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, icon, ...props }, ref) => {
    return (
      <div className="w-full">
        {label && (
          <label className="block text-sm font-medium text-white/80 mb-2">{label}</label>
        )}
        <div className="relative">
          {icon && (
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40">
              {icon}
            </span>
          )}
          <input
            ref={ref}
            className={cn(
              "w-full rounded-xl border bg-white/5 text-white placeholder:text-white/30",
              "px-4 py-3 text-sm transition-all duration-200",
              "border-white/10 focus:border-brand-blue focus:ring-1 focus:ring-brand-blue focus:outline-none",
              "disabled:opacity-50 disabled:cursor-not-allowed",
              icon && "pl-10",
              error && "border-brand-red focus:border-brand-red focus:ring-brand-red",
              className
            )}
            {...props}
          />
        </div>
        {error && <p className="mt-1.5 text-xs text-brand-red">{error}</p>}
      </div>
    );
  }
);

Input.displayName = "Input";
export { Input };
