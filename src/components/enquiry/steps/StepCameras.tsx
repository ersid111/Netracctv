"use client";

import { useFormContext } from "react-hook-form";
import { Minus, Plus } from "lucide-react";
import type { EnquiryFormData } from "@/lib/validations";

function Counter({
  label,
  desc,
  field,
}: {
  label: string;
  desc: string;
  field: "indoorCameras" | "outdoorCameras";
}) {
  const { watch, setValue } = useFormContext<EnquiryFormData>();
  const value = watch(field);

  return (
    <div className="flex items-center justify-between bg-white/5 rounded-xl p-4 border border-white/10">
      <div>
        <p className="text-white font-semibold text-sm">{label}</p>
        <p className="text-white/40 text-xs">{desc}</p>
      </div>
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={() => setValue(field, Math.max(0, value - 1))}
          className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"
        >
          <Minus className="w-3.5 h-3.5 text-white" />
        </button>
        <span className="text-white font-bold w-6 text-center">{value}</span>
        <button
          type="button"
          onClick={() => setValue(field, Math.min(100, value + 1))}
          className="w-8 h-8 rounded-full bg-brand-blue flex items-center justify-center hover:bg-brand-blue-dark transition-colors"
        >
          <Plus className="w-3.5 h-3.5 text-white" />
        </button>
      </div>
    </div>
  );
}

export function StepCameras() {
  return (
    <div>
      <h3 className="text-xl font-bold text-white mb-2">How many cameras do you need?</h3>
      <p className="text-white/50 text-sm mb-6">Approximate counts are fine — we&apos;ll confirm during the site visit.</p>
      <div className="space-y-3">
        <Counter label="Indoor Cameras" desc="Living rooms, offices, corridors" field="indoorCameras" />
        <Counter label="Outdoor Cameras" desc="Entrances, parking, perimeter" field="outdoorCameras" />
      </div>
    </div>
  );
}
