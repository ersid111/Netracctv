"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Shield, ArrowRight, Play, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { ParticleGrid } from "@/components/widgets/ParticleGrid";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
};

const stagger = {
  visible: { transition: { staggerChildren: 0.12 } },
};

const trustBadges = [
  "ISO Certified",
  "Hikvision Authorized",
  "Dahua Partner",
  "24/7 Support",
];

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center bg-hero-gradient overflow-hidden">
      <ParticleGrid />

      {/* Scan line effect */}
      <div
        className="absolute inset-x-0 h-px bg-gradient-to-r from-transparent via-brand-blue/40 to-transparent pointer-events-none"
        style={{ animation: "scanLine 8s linear infinite", top: "0" }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16 text-center">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={stagger}
          className="flex flex-col items-center"
        >
          {/* Label */}
          <motion.div variants={fadeUp}>
            <span className="inline-flex items-center gap-2 bg-brand-blue/10 border border-brand-blue/30 text-brand-blue text-xs font-semibold px-4 py-2 rounded-full mb-6 tracking-wider uppercase">
              <Shield className="w-3.5 h-3.5" />
              AI-Powered Security Solutions
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            variants={fadeUp}
            className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-black text-white leading-[1.05] tracking-tight mb-6 max-w-5xl"
          >
            Protect What
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-blue to-blue-400">
              Matters Most
            </span>
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            variants={fadeUp}
            className="text-lg sm:text-xl text-white/60 max-w-2xl leading-relaxed mb-10"
          >
            AI-Powered CCTV Installation · Smart Surveillance · Industrial Monitoring
            <br className="hidden sm:block" />
            Trusted by 500+ clients across India.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            variants={fadeUp}
            className="flex flex-col sm:flex-row items-center gap-4 mb-12"
          >
            <Link href="/enquiry">
              <Button size="xl" className="group min-w-[200px]">
                Get Free Site Visit
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Link href="/products">
              <Button
                size="xl"
                variant="secondary"
                className="min-w-[200px]"
                icon={<Play className="w-4 h-4" />}
              >
                View Products
              </Button>
            </Link>
          </motion.div>

          {/* Trust Badges */}
          <motion.div
            variants={fadeUp}
            className="flex flex-wrap items-center justify-center gap-4 mb-16"
          >
            {trustBadges.map((badge) => (
              <span
                key={badge}
                className="flex items-center gap-1.5 text-white/50 text-sm"
              >
                <CheckCircle className="w-4 h-4 text-brand-blue" />
                {badge}
              </span>
            ))}
          </motion.div>
        </motion.div>

        {/* Floating enquiry card */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="relative inline-block"
        >
          <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 sm:p-8 max-w-2xl mx-auto shadow-premium">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
              {[
                { num: "500+", label: "Projects" },
                { num: "24×7", label: "Support" },
                { num: "98%", label: "Satisfaction" },
                { num: "10+", label: "Years Exp." },
              ].map((stat) => (
                <div key={stat.label} className="text-center">
                  <div className="text-2xl sm:text-3xl font-black text-white mb-1">
                    {stat.num}
                  </div>
                  <div className="text-white/50 text-xs sm:text-sm">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Pulse indicator */}
          <div className="absolute -top-2 -right-2 flex items-center gap-1.5 bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 text-xs px-3 py-1.5 rounded-full">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            Available Now
          </div>
        </motion.div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-navy to-transparent pointer-events-none" />
    </section>
  );
}
