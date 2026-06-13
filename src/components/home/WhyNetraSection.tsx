"use client";

import { motion } from "framer-motion";
import { X, Check } from "lucide-react";
import { WHY_NETRA } from "@/lib/constants";

export function WhyNetraSection() {
  return (
    <section className="py-24 bg-navy relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-brand-blue/5 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-brand-blue text-sm font-semibold tracking-widest uppercase mb-4 block">
            Why Choose Us
          </span>
          <h2 className="text-4xl sm:text-5xl font-black text-white mb-4">
            The NETRA Difference
          </h2>
          <p className="text-white/50 max-w-2xl mx-auto text-lg">
            We&apos;re not just another CCTV installer. We&apos;re your long-term security partner.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Others column */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="rounded-2xl border border-white/10 bg-white/5 p-8"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
                <X className="w-5 h-5 text-white/40" />
              </div>
              <h3 className="text-white/50 font-bold text-xl">Other Companies</h3>
            </div>
            <ul className="space-y-4">
              {WHY_NETRA.others.map((item) => (
                <li key={item} className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full bg-brand-red/20 border border-brand-red/30 flex items-center justify-center shrink-0">
                    <X className="w-3 h-3 text-brand-red" />
                  </div>
                  <span className="text-white/40 text-sm line-through decoration-white/20">{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* NETRA column */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="rounded-2xl border border-brand-blue/30 bg-gradient-to-b from-brand-blue/10 to-transparent p-8 shadow-glow"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-full bg-brand-blue/20 border border-brand-blue/40 flex items-center justify-center">
                <Check className="w-5 h-5 text-brand-blue" />
              </div>
              <h3 className="text-white font-bold text-xl">NETRA CCTV</h3>
            </div>
            <ul className="space-y-4">
              {WHY_NETRA.netra.map((item, i) => (
                <motion.li
                  key={item}
                  initial={{ opacity: 0, x: 10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  className="flex items-center gap-3"
                >
                  <div className="w-5 h-5 rounded-full bg-brand-blue/30 border border-brand-blue/50 flex items-center justify-center shrink-0">
                    <Check className="w-3 h-3 text-brand-blue" />
                  </div>
                  <span className="text-white text-sm font-medium">{item}</span>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
