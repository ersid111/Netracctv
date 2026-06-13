"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  Camera, Brain, Monitor, Lock, Factory, BarChart2, Phone, Wrench, ArrowRight, Check,
} from "lucide-react";
import { SERVICES } from "@/lib/constants";
import { Button } from "@/components/ui/Button";
import { ParticleGrid } from "@/components/widgets/ParticleGrid";

const iconMap: Record<string, React.ElementType> = {
  Camera, Brain, Monitor, Lock, Factory, BarChart2, Phone, Wrench,
};

export default function ServicesPage() {
  return (
    <div className="bg-navy min-h-screen">
      {/* Hero */}
      <section className="relative pt-24 pb-20 bg-hero-gradient overflow-hidden">
        <ParticleGrid />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <span className="text-brand-blue text-sm font-semibold tracking-widest uppercase mb-4 block">
              Our Services
            </span>
            <h1 className="text-5xl sm:text-6xl font-black text-white mb-4">
              Complete Security Services
            </h1>
            <p className="text-white/60 text-lg max-w-2xl mx-auto">
              End-to-end security solutions from consultation to installation, with lifetime
              support.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Services Detail */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-24">
            {SERVICES.map((service, i) => {
              const Icon = iconMap[service.icon] || Camera;
              return (
                <div
                  key={service.id}
                  id={service.id}
                  className={`flex flex-col ${
                    i % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"
                  } gap-12 items-center`}
                >
                  <motion.div
                    initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    className="flex-1"
                  >
                    <div className="inline-flex items-center gap-2 bg-brand-blue/10 border border-brand-blue/20 text-brand-blue text-xs font-semibold px-3 py-1.5 rounded-full mb-4 uppercase tracking-wider">
                      Service {String(i + 1).padStart(2, "0")}
                    </div>
                    <h2 className="text-3xl sm:text-4xl font-black text-white mb-4">{service.title}</h2>
                    <p className="text-white/60 text-lg leading-relaxed mb-6">{service.description}</p>
                    <ul className="space-y-2.5 mb-8">
                      {service.features.map((f) => (
                        <li key={f} className="flex items-center gap-3">
                          <div className="w-5 h-5 rounded-full bg-brand-blue/20 border border-brand-blue/30 flex items-center justify-center">
                            <Check className="w-3 h-3 text-brand-blue" />
                          </div>
                          <span className="text-white/70 text-sm">{f}</span>
                        </li>
                      ))}
                    </ul>
                    <Link href={`/enquiry?service=${service.id}`}>
                      <Button size="lg">
                        Enquire About This Service
                        <ArrowRight className="w-4 h-4" />
                      </Button>
                    </Link>
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0, x: i % 2 === 0 ? 30 : -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    className="flex-1 flex items-center justify-center"
                  >
                    <div className="w-full max-w-sm aspect-square rounded-2xl bg-gradient-to-br from-brand-blue/10 to-transparent border border-brand-blue/20 flex items-center justify-center">
                      <Icon className="w-32 h-32 text-brand-blue/30" />
                    </div>
                  </motion.div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-brand-blue/10 border-y border-brand-blue/20">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-black text-white mb-4">Ready to Get Started?</h2>
          <p className="text-white/60 mb-6">Book your free site visit today — no obligation, no pressure.</p>
          <Link href="/enquiry">
            <Button size="xl">
              Book Free Site Visit <ArrowRight className="w-5 h-5" />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
