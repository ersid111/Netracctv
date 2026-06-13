"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Calculator, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { formatCurrency } from "@/lib/utils";

const RESOLUTION_MULTIPLIER: Record<string, number> = {
  "2mp": 1,
  "4mp": 1.4,
  "8mp": 2.2,
  thermal: 3.5,
};

const PROPERTY_MULTIPLIER: Record<string, number> = {
  home: 1,
  office: 1.2,
  factory: 1.5,
  warehouse: 1.3,
};

const STORAGE_COST: Record<number, number> = {
  7: 3000,
  15: 5000,
  30: 8000,
  60: 14000,
  90: 20000,
};

const BASE_CAMERA_COST = 4500;
const INSTALLATION_PER_CAMERA = 800;
const NVR_BASE = 8000;

export function CostCalculator() {
  const [cameras, setCameras] = useState(4);
  const [resolution, setResolution] = useState("2mp");
  const [propertyType, setPropertyType] = useState("home");
  const [storageDays, setStorageDays] = useState(30);

  const resMult = RESOLUTION_MULTIPLIER[resolution] || 1;
  const propMult = PROPERTY_MULTIPLIER[propertyType] || 1;
  const storageCost = STORAGE_COST[storageDays] || 8000;

  const cameraCost = cameras * BASE_CAMERA_COST * resMult * propMult;
  const installCost = cameras * INSTALLATION_PER_CAMERA;
  const nvrCost = NVR_BASE + Math.floor(cameras / 8) * 4000;
  const total = cameraCost + installCost + nvrCost + storageCost;
  const low = Math.round(total * 0.9);
  const high = Math.round(total * 1.15);

  return (
    <section className="py-24 bg-navy">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="text-brand-blue text-sm font-semibold tracking-widest uppercase mb-4 block">
            Instant Estimate
          </span>
          <h2 className="text-4xl sm:text-5xl font-black text-white mb-4">
            CCTV Cost Calculator
          </h2>
          <p className="text-white/50 max-w-xl mx-auto">
            Get a rough estimate in seconds. Final pricing requires a free site survey.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 sm:p-8"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mb-8">
            {/* Camera Count */}
            <div>
              <label className="block text-white/70 text-sm font-medium mb-3">
                Number of Cameras: <span className="text-white font-bold">{cameras}</span>
              </label>
              <input
                type="range"
                min={1}
                max={64}
                value={cameras}
                onChange={(e) => setCameras(Number(e.target.value))}
                className="w-full h-2 bg-white/10 rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-brand-blue"
              />
              <div className="flex justify-between text-xs text-white/30 mt-1">
                <span>1</span><span>32</span><span>64</span>
              </div>
            </div>

            {/* Storage Days */}
            <div>
              <label className="block text-white/70 text-sm font-medium mb-3">
                Recording Storage:{" "}
                <span className="text-white font-bold">{storageDays} days</span>
              </label>
              <div className="flex gap-2 flex-wrap">
                {[7, 15, 30, 60, 90].map((d) => (
                  <button
                    key={d}
                    onClick={() => setStorageDays(d)}
                    className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                      storageDays === d
                        ? "bg-brand-blue text-white"
                        : "bg-white/5 text-white/50 hover:bg-white/10"
                    }`}
                  >
                    {d}d
                  </button>
                ))}
              </div>
            </div>

            {/* Resolution */}
            <div>
              <label className="block text-white/70 text-sm font-medium mb-3">Resolution</label>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { id: "2mp", label: "HD 1080p" },
                  { id: "4mp", label: "Full HD 4MP" },
                  { id: "8mp", label: "4K 8MP" },
                  { id: "thermal", label: "Thermal" },
                ].map((r) => (
                  <button
                    key={r.id}
                    onClick={() => setResolution(r.id)}
                    className={`px-3 py-2 rounded-lg text-sm font-medium transition-all border ${
                      resolution === r.id
                        ? "bg-brand-blue/20 border-brand-blue text-white"
                        : "bg-white/5 border-white/10 text-white/50 hover:bg-white/10"
                    }`}
                  >
                    {r.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Property Type */}
            <div>
              <label className="block text-white/70 text-sm font-medium mb-3">Property Type</label>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { id: "home", label: "Home" },
                  { id: "office", label: "Office" },
                  { id: "factory", label: "Factory" },
                  { id: "warehouse", label: "Warehouse" },
                ].map((p) => (
                  <button
                    key={p.id}
                    onClick={() => setPropertyType(p.id)}
                    className={`px-3 py-2 rounded-lg text-sm font-medium transition-all border ${
                      propertyType === p.id
                        ? "bg-brand-blue/20 border-brand-blue text-white"
                        : "bg-white/5 border-white/10 text-white/50 hover:bg-white/10"
                    }`}
                  >
                    {p.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Result */}
          <div className="border-t border-white/10 pt-8">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
              <div>
                <p className="text-white/50 text-sm mb-1">Estimated Investment</p>
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl font-black text-white">
                    {formatCurrency(low)}
                  </span>
                  <span className="text-white/40 text-lg">–</span>
                  <span className="text-3xl font-black text-brand-blue">
                    {formatCurrency(high)}
                  </span>
                </div>
                <p className="text-white/30 text-xs mt-1">
                  Includes cameras, NVR, cabling & installation. Taxes extra.
                </p>
              </div>
              <div className="flex gap-3">
                <Link href="/enquiry">
                  <Button size="lg" icon={<ArrowRight className="w-4 h-4" />} iconRight>
                    Get Exact Quote
                  </Button>
                </Link>
              </div>
            </div>

            <div className="mt-4 grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
              {[
                { label: "Cameras", value: formatCurrency(Math.round(cameraCost)) },
                { label: "NVR/DVR", value: formatCurrency(nvrCost) },
                { label: "Storage", value: formatCurrency(storageCost) },
                { label: "Installation", value: formatCurrency(installCost) },
              ].map((item) => (
                <div key={item.label} className="bg-white/5 rounded-xl p-3">
                  <div className="text-white/40 text-xs mb-1">{item.label}</div>
                  <div className="text-white font-semibold text-sm">{item.value}</div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
