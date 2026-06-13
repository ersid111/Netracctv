"use client";

import { useFormContext } from "react-hook-form";
import { Home, Building2, Factory, Package, GraduationCap, Heart, ShoppingBag, Building } from "lucide-react";
import { PROPERTY_TYPES } from "@/lib/constants";
import type { EnquiryFormData } from "@/lib/validations";
import { cn } from "@/lib/utils";

const iconMap: Record<string, React.ElementType> = {
  Home, Building2, Factory, Package, GraduationCap, Heart, ShoppingBag, Building,
};

export function StepPropertyType() {
  const { watch, setValue } = useFormContext<EnquiryFormData>();
  const value = watch("propertyType");

  return (
    <div>
      <h3 className="text-xl font-bold text-white mb-2">What type of property are you securing?</h3>
      <p className="text-white/50 text-sm mb-6">This helps us recommend the right security solution.</p>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {PROPERTY_TYPES.map((type) => {
          const Icon = iconMap[type.icon] || Building;
          const selected = value === type.id;
          return (
            <button
              key={type.id}
              type="button"
              onClick={() => setValue("propertyType", type.id)}
              className={cn(
                "flex flex-col items-center gap-2 p-4 rounded-xl border transition-all",
                selected
                  ? "bg-brand-blue/20 border-brand-blue text-white shadow-glow-sm"
                  : "bg-white/5 border-white/10 text-white/50 hover:bg-white/10 hover:text-white"
              )}
            >
              <Icon className="w-6 h-6" />
              <span className="text-xs font-medium text-center">{type.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
