"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Shield, Award, Users, Globe, ArrowRight, Check } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { STATS } from "@/lib/constants";
import { ParticleGrid } from "@/components/widgets/ParticleGrid";

const values = [
  { icon: Shield, title: "Security First", desc: "Every decision we make is guided by what's best for our client's security." },
  { icon: Award, title: "Quality Standards", desc: "We only use certified, tested products from global brands like Hikvision and Dahua." },
  { icon: Users, title: "Client Partnership", desc: "We don't just install cameras — we become your long-term security partner." },
  { icon: Globe, title: "Technology Forward", desc: "Constantly evolving with AI, cloud, and IoT to deliver future-proof solutions." },
];

const timeline = [
  { year: "2014", event: "NETRA CCTV founded in Mumbai with a vision for premium security solutions." },
  { year: "2016", event: "Expanded to serve commercial and industrial clients across Maharashtra." },
  { year: "2018", event: "Achieved 100+ installations milestone. Launched AMC services." },
  { year: "2020", event: "Introduced AI-powered video analytics and remote monitoring." },
  { year: "2022", event: "Expanded team to 50+ certified engineers. 300+ projects completed." },
  { year: "2024", event: "500+ projects. Serving clients across India with cutting-edge security." },
];

export default function AboutPage() {
  return (
    <div className="bg-navy min-h-screen">
      {/* Hero */}
      <section className="relative pt-24 pb-20 bg-hero-gradient overflow-hidden">
        <ParticleGrid />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <span className="text-brand-blue text-sm font-semibold tracking-widest uppercase mb-4 block">
              About NETRA CCTV
            </span>
            <h1 className="text-5xl sm:text-6xl font-black text-white mb-6">
              India&apos;s Premier Security Solutions Partner
            </h1>
            <p className="text-white/60 text-lg max-w-2xl mx-auto">
              For over a decade, we&apos;ve been protecting homes, businesses, and industries with
              precision-engineered security systems backed by world-class support.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 border-b border-white/5">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {STATS.map((s, i) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="text-center"
              >
                <div className="text-4xl font-black text-white mb-1">{s.value}{s.suffix}</div>
                <p className="text-white/50 text-sm">{s.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-black text-white mb-4">Our Values</h2>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((v, i) => (
              <motion.div
                key={v.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-white/5 border border-white/10 rounded-2xl p-6 text-center"
              >
                <div className="w-12 h-12 rounded-xl bg-brand-blue/20 border border-brand-blue/30 flex items-center justify-center mx-auto mb-4">
                  <v.icon className="w-6 h-6 text-brand-blue" />
                </div>
                <h3 className="text-white font-bold mb-2">{v.title}</h3>
                <p className="text-white/50 text-sm leading-relaxed">{v.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-20 bg-[#050F1C]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-black text-white mb-4">Our Journey</h2>
          </motion.div>
          <div className="relative">
            <div className="absolute left-8 top-0 bottom-0 w-px bg-brand-blue/20" />
            <div className="space-y-8">
              {timeline.map((item, i) => (
                <motion.div
                  key={item.year}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="flex gap-6"
                >
                  <div className="w-16 shrink-0 flex flex-col items-center">
                    <div className="w-4 h-4 rounded-full bg-brand-blue border-2 border-navy z-10" />
                  </div>
                  <div className="bg-white/5 border border-white/10 rounded-xl p-4 flex-1">
                    <span className="text-brand-blue font-bold text-sm">{item.year}</span>
                    <p className="text-white/60 text-sm mt-1">{item.event}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Certifications */}
      <section className="py-16 border-t border-white/5">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold text-white mb-8">Certifications & Partners</h2>
          <div className="flex flex-wrap justify-center gap-6">
            {["Hikvision Authorized Partner", "Dahua Certified", "CP Plus Partner", "ISO 9001:2015"].map((cert) => (
              <div key={cert} className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-xl px-5 py-3">
                <Check className="w-4 h-4 text-brand-blue" />
                <span className="text-white/70 text-sm font-medium">{cert}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-black text-white mb-4">Work With Us</h2>
          <p className="text-white/60 mb-6">Experience the NETRA difference. Book a free consultation today.</p>
          <Link href="/enquiry">
            <Button size="xl">
              Get Free Site Visit <ArrowRight className="w-5 h-5" />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
