"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { MapPin, Camera, ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import type { Portfolio } from "@/types";

export function PortfolioGrid({ portfolios }: { portfolios: Portfolio[] }) {
  if (portfolios.length === 0) {
    return (
      <div className="text-center py-24">
        <p className="text-white/40 text-lg">Portfolio coming soon.</p>
        <p className="text-white/30 text-sm mt-2">We&apos;re adding our latest projects.</p>
      </div>
    );
  }

  return (
    <section className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {portfolios.map((item, i) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="group bg-white/5 border border-white/10 rounded-2xl overflow-hidden hover:border-brand-blue/30 hover:shadow-glow-sm transition-all duration-300"
            >
              <div className="relative h-52 bg-gradient-to-br from-brand-blue/10 to-navy">
                {item.afterImageUrl ? (
                  <Image
                    src={item.afterImageUrl}
                    alt={item.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                ) : (
                  <div className="flex items-center justify-center h-full">
                    <Camera className="w-16 h-16 text-brand-blue/20" />
                  </div>
                )}
                {item.isFeatured && (
                  <div className="absolute top-3 left-3">
                    <Badge variant="blue" size="sm">Featured</Badge>
                  </div>
                )}
              </div>
              <div className="p-5">
                {item.clientIndustry && (
                  <Badge variant="outline" size="sm" className="mb-2">{item.clientIndustry}</Badge>
                )}
                <h3 className="text-white font-bold text-lg mb-2">{item.title}</h3>
                <p className="text-white/50 text-sm leading-relaxed mb-4 line-clamp-2">{item.summary}</p>

                <div className="flex flex-wrap gap-3 mb-4 text-xs text-white/40">
                  {item.location && (
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3 h-3" /> {item.location}
                    </span>
                  )}
                  {item.camerasInstalled && (
                    <span className="flex items-center gap-1">
                      <Camera className="w-3 h-3" /> {item.camerasInstalled} cameras
                    </span>
                  )}
                </div>

                <Link
                  href={`/portfolio/${item.slug}`}
                  className="inline-flex items-center gap-1 text-brand-blue hover:text-blue-300 text-sm font-medium transition-colors"
                >
                  View Case Study <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
