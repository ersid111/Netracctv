"use client";

import { useFormContext } from "react-hook-form";
import { TIMELINES } from "@/lib/constants";
import type { EnquiryFormData } from "@/lib/validations";
import { cn } from "@/lib/utils";
import { Zap, Calendar, Clock, BookOpen } from "lucide-react";

const icons = [Zap, Calendar, Clock, BookOpen];

export function StepTimeline() {
  const { watch, setValue } = useFormContext<EnquiryFormData>();
  const value = watch("timeline");

  return (
    <div>
      <h3 className="text-xl font-bold text-white mb-2">When do you need it installed?</h3>
      <p className="text-white/50 text-sm mb-6">This helps us prioritize your enquiry.</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {TIMELINES.map((t, i) => {
          const Icon = icons[i] || Calendar;
          return (
            <button
              key={t.id}
              type="button"
              onClick={() => setValue("timeline", t.id)}
              className={cn(
                "flex items-center gap-3 p-4 rounded-xl border text-sm font-medium text-left transition-all",
                value === t.id
                  ? "bg-brand-blue/20 border-brand-blue text-white"
                  : "bg-white/5 border-white/10 text-white/50 hover:bg-white/10 hover:text-white"
              )}
            >
              <Icon className={cn("w-5 h-5 shrink-0", value === t.id ? "text-brand-blue" : "text-white/30")} />
              {t.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
