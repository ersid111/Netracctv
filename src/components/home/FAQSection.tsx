"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { FAQ_ITEMS } from "@/lib/constants";
import { cn } from "@/lib/utils";

export function FAQSection() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="py-24 bg-[#050F1C]">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="text-brand-blue text-sm font-semibold tracking-widest uppercase mb-4 block">
            FAQs
          </span>
          <h2 className="text-4xl sm:text-5xl font-black text-white mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-white/50">Everything you need to know about CCTV installation.</p>
        </motion.div>

        <div className="space-y-3">
          {FAQ_ITEMS.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className={cn(
                "rounded-xl border transition-all duration-300 overflow-hidden",
                open === i
                  ? "border-brand-blue/40 bg-brand-blue/5"
                  : "border-white/10 bg-white/5 hover:border-white/20"
              )}
            >
              <button
                className="w-full flex items-center justify-between p-5 text-left"
                onClick={() => setOpen(open === i ? null : i)}
              >
                <span
                  className={cn(
                    "font-semibold text-sm sm:text-base transition-colors",
                    open === i ? "text-white" : "text-white/70"
                  )}
                >
                  {item.question}
                </span>
                <ChevronDown
                  className={cn(
                    "w-5 h-5 text-brand-blue shrink-0 ml-4 transition-transform duration-300",
                    open === i && "rotate-180"
                  )}
                />
              </button>
              <AnimatePresence initial={false}>
                {open === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <p className="px-5 pb-5 text-white/60 text-sm leading-relaxed">
                      {item.answer}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
