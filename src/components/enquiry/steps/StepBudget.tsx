"use client";

import { useFormContext } from "react-hook-form";
import { BUDGET_RANGES } from "@/lib/constants";
import type { EnquiryFormData } from "@/lib/validations";
import { cn } from "@/lib/utils";

export function StepBudget() {
  const { watch, setValue } = useFormContext<EnquiryFormData>();
  const value = watch("budgetRange");
  const flexible = watch("budgetFlexible");

  return (
    <div>
      <h3 className="text-xl font-bold text-white mb-2">What&apos;s your approximate budget?</h3>
      <p className="text-white/50 text-sm mb-6">This helps us recommend the right products and scope.</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
        {BUDGET_RANGES.map((b) => (
          <button
            key={b.id}
            type="button"
            onClick={() => setValue("budgetRange", b.id)}
            className={cn(
              "p-3 rounded-xl border text-sm font-medium text-left transition-all",
              value === b.id
                ? "bg-brand-blue/20 border-brand-blue text-white"
                : "bg-white/5 border-white/10 text-white/50 hover:bg-white/10"
            )}
          >
            {b.label}
          </button>
        ))}
      </div>
      <button
        type="button"
        onClick={() => setValue("budgetFlexible", !flexible)}
        className={cn(
          "flex items-center gap-2 text-sm transition-colors",
          flexible ? "text-brand-blue" : "text-white/40 hover:text-white/60"
        )}
      >
        <div className={cn("w-4 h-4 rounded border-2 flex items-center justify-center transition-all",
          flexible ? "bg-brand-blue border-brand-blue" : "border-white/30"
        )}>
          {flexible && <span className="text-white text-[10px]">✓</span>}
        </div>
        My budget is flexible depending on the solution
      </button>
    </div>
  );
}
