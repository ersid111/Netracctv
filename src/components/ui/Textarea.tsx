"use client";

import { forwardRef } from "react";
import { cn } from "@/lib/utils";

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
}

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, label, error, ...props }, ref) => {
    return (
      <div className="w-full">
        {label && (
          <label className="block text-sm font-medium text-white/80 mb-2">{label}</label>
        )}
        <textarea
          ref={ref}
          className={cn(
            "w-full rounded-xl border bg-white/5 text-white placeholder:text-white/30",
            "px-4 py-3 text-sm transition-all duration-200 resize-none",
            "border-white/10 focus:border-brand-blue focus:ring-1 focus:ring-brand-blue focus:outline-none",
            "disabled:opacity-50 disabled:cursor-not-allowed",
            error && "border-brand-red focus:border-brand-red focus:ring-brand-red",
            className
          )}
          {...props}
        />
        {error && <p className="mt-1.5 text-xs text-brand-red">{error}</p>}
      </div>
    );
  }
);

Textarea.displayName = "Textarea";
export { Textarea };
