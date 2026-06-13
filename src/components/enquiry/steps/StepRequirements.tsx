"use client";

import { useFormContext } from "react-hook-form";
import { REQUIREMENTS } from "@/lib/constants";
import type { EnquiryFormData } from "@/lib/validations";
import { cn } from "@/lib/utils";

export function StepRequirements() {
  const { watch, setValue } = useFormContext<EnquiryFormData>();
  const selected = watch("requirements") || [];

  const toggle = (req: string) => {
    if (selected.includes(req)) {
      setValue("requirements", selected.filter((r) => r !== req));
    } else {
      setValue("requirements", [...selected, req]);
    }
  };

  return (
    <div>
      <h3 className="text-xl font-bold text-white mb-2">What features are important to you?</h3>
      <p className="text-white/50 text-sm mb-6">Select all that apply.</p>
      <div className="flex flex-wrap gap-2">
        {REQUIREMENTS.map((req) => {
          const isSelected = selected.includes(req);
          return (
            <button
              key={req}
              type="button"
              onClick={() => toggle(req)}
              className={cn(
                "px-3 py-2 rounded-full text-sm font-medium transition-all border",
                isSelected
                  ? "bg-brand-blue/20 border-brand-blue text-white"
                  : "bg-white/5 border-white/10 text-white/50 hover:bg-white/10 hover:text-white"
              )}
            >
              {isSelected ? "✓ " : ""}{req}
            </button>
          );
        })}
      </div>
      {selected.length > 0 && (
        <p className="text-white/40 text-xs mt-4">
          {selected.length} feature{selected.length > 1 ? "s" : ""} selected
        </p>
      )}
    </div>
  );
}
