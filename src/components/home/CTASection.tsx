"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/Button";

export function CTASection() {
  const whatsappNum = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "919876543210";
  const whatsappMsg = encodeURIComponent("Hi NETRA CCTV, I'd like a free site visit.");

  return (
    <section className="py-24 bg-navy relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-brand-blue/10 via-transparent to-brand-blue/5 pointer-events-none" />
      <div className="absolute -right-20 top-1/2 -translate-y-1/2 w-96 h-96 bg-brand-blue/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="inline-flex items-center gap-2 bg-brand-red/10 border border-brand-red/30 text-brand-red text-xs font-semibold px-4 py-2 rounded-full mb-6 tracking-wider uppercase">
            <span className="w-2 h-2 rounded-full bg-brand-red animate-pulse" />
            Limited Slots This Week
          </div>

          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white mb-6 leading-tight">
            Ready to Secure
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-blue to-blue-400">
              Your Property?
            </span>
          </h2>

          <p className="text-white/60 text-lg mb-10 max-w-2xl mx-auto">
            Get a free no-obligation site survey. Our expert will visit, assess your security
            needs, and give you a detailed quote — completely free.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/enquiry">
              <Button size="xl" className="min-w-[220px]">
                Book Free Site Visit
                <ArrowRight className="w-5 h-5" />
              </Button>
            </Link>
            <a
              href={`https://wa.me/${whatsappNum}?text=${whatsappMsg}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button size="xl" variant="whatsapp" className="min-w-[220px]">
                <MessageCircle className="w-5 h-5" />
                WhatsApp Us Now
              </Button>
            </a>
          </div>

          <p className="text-white/30 text-sm mt-6">
            Free site survey · No obligation · Response within 2 hours
          </p>
        </motion.div>
      </div>
    </section>
  );
}
