"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  Camera,
  Brain,
  Monitor,
  Lock,
  Factory,
  BarChart2,
  Phone,
  Wrench,
  ArrowRight,
} from "lucide-react";
import { SERVICES } from "@/lib/constants";
import { Button } from "@/components/ui/Button";

const iconMap: Record<string, React.ElementType> = {
  Camera,
  Brain,
  Monitor,
  Lock,
  Factory,
  BarChart2,
  Phone,
  Wrench,
};

const colorMap: Record<string, string> = {
  blue: "from-blue-500/20 to-blue-600/5 border-blue-500/20 group-hover:border-blue-500/50",
  purple: "from-purple-500/20 to-purple-600/5 border-purple-500/20 group-hover:border-purple-500/50",
  teal: "from-teal-500/20 to-teal-600/5 border-teal-500/20 group-hover:border-teal-500/50",
  orange: "from-orange-500/20 to-orange-600/5 border-orange-500/20 group-hover:border-orange-500/50",
  red: "from-red-500/20 to-red-600/5 border-red-500/20 group-hover:border-red-500/50",
  green: "from-emerald-500/20 to-emerald-600/5 border-emerald-500/20 group-hover:border-emerald-500/50",
  indigo: "from-indigo-500/20 to-indigo-600/5 border-indigo-500/20 group-hover:border-indigo-500/50",
  yellow: "from-yellow-500/20 to-yellow-600/5 border-yellow-500/20 group-hover:border-yellow-500/50",
};

const iconColorMap: Record<string, string> = {
  blue: "bg-blue-500/20 text-blue-400",
  purple: "bg-purple-500/20 text-purple-400",
  teal: "bg-teal-500/20 text-teal-400",
  orange: "bg-orange-500/20 text-orange-400",
  red: "bg-red-500/20 text-red-400",
  green: "bg-emerald-500/20 text-emerald-400",
  indigo: "bg-indigo-500/20 text-indigo-400",
  yellow: "bg-yellow-500/20 text-yellow-400",
};

export function ServicesSection() {
  return (
    <section className="py-24 bg-[#050F1C]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-brand-blue text-sm font-semibold tracking-widest uppercase mb-4 block">
            What We Do
          </span>
          <h2 className="text-4xl sm:text-5xl font-black text-white mb-4">
            Complete Security Services
          </h2>
          <p className="text-white/50 max-w-2xl mx-auto text-lg">
            From basic home installations to enterprise-grade AI surveillance systems,
            we deliver end-to-end security solutions.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {SERVICES.map((service, i) => {
            const Icon = iconMap[service.icon] || Camera;
            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.07, duration: 0.5 }}
                whileHover={{ y: -5 }}
                className={`group relative rounded-2xl border bg-gradient-to-b p-6 transition-all duration-300 cursor-pointer ${colorMap[service.color]}`}
              >
                <div
                  className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${iconColorMap[service.color]}`}
                >
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-white font-bold text-lg mb-2">{service.title}</h3>
                <p className="text-white/50 text-sm leading-relaxed mb-4">{service.shortDesc}</p>
                <ul className="space-y-1.5 mb-5">
                  {service.features.slice(0, 3).map((f) => (
                    <li key={f} className="text-white/40 text-xs flex items-center gap-1.5">
                      <div className="w-1 h-1 rounded-full bg-brand-blue" />
                      {f}
                    </li>
                  ))}
                </ul>
                <Link
                  href={`/services#${service.id}`}
                  className="inline-flex items-center gap-1 text-sm font-medium text-brand-blue hover:text-blue-300 transition-colors py-2"
                >
                  Learn more <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <Link href="/services">
            <Button variant="outline" size="lg">
              View All Services
              <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
