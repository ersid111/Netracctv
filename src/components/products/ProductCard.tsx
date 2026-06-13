"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { MessageCircle, ArrowRight, Tag } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { getProductWhatsAppUrl, formatCurrency } from "@/lib/utils";
import type { Product } from "@/types";

const CATEGORY_LABELS: Record<string, string> = {
  IP_CAMERAS: "IP Camera",
  ANALOG_HD: "Analog HD",
  PTZ_CAMERAS: "PTZ",
  THERMAL: "Thermal",
  NVR_DVR: "NVR / DVR",
  VIDEO_ANALYTICS: "Video Analytics",
  ACCESS_CONTROL: "Access Control",
  INTERCOM: "Intercom",
};

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const waUrl = getProductWhatsAppUrl(product.name, CATEGORY_LABELS[product.category] || product.category);
  const categoryLabel = CATEGORY_LABELS[product.category] || product.category;

  return (
    <motion.div
      whileHover={{ y: -4 }}
      className="group bg-white/5 border border-white/10 rounded-2xl overflow-hidden hover:border-brand-blue/30 hover:shadow-glow-sm transition-all duration-300"
    >
      {/* Image */}
      <div className="relative h-52 bg-gradient-to-br from-brand-blue/10 to-navy overflow-hidden">
        {product.imageUrl ? (
          <Image
            src={product.imageUrl}
            alt={product.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <div className="w-20 h-20 rounded-2xl bg-brand-blue/10 border border-brand-blue/20 flex items-center justify-center">
              <Tag className="w-10 h-10 text-brand-blue/30" />
            </div>
          </div>
        )}
        {product.isFeatured && (
          <div className="absolute top-3 left-3">
            <Badge variant="blue" size="sm">Featured</Badge>
          </div>
        )}
        <div className="absolute top-3 right-3">
          <Badge variant="outline" size="sm">{categoryLabel}</Badge>
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        {product.brand && (
          <p className="text-white/40 text-xs font-medium uppercase tracking-wider mb-1">{product.brand}</p>
        )}
        <h3 className="text-white font-bold text-base leading-tight mb-2 line-clamp-2">{product.name}</h3>
        <p className="text-white/50 text-sm leading-relaxed mb-4 line-clamp-2">{product.description}</p>

        {/* Features */}
        {product.features.length > 0 && (
          <ul className="space-y-1 mb-4">
            {product.features.slice(0, 3).map((f) => (
              <li key={f} className="text-white/40 text-xs flex items-center gap-1.5">
                <div className="w-1 h-1 rounded-full bg-brand-blue shrink-0" />
                {f}
              </li>
            ))}
          </ul>
        )}

        {/* Price */}
        <div className="flex items-center justify-between mb-4">
          {product.priceOnRequest ? (
            <span className="text-white/40 text-sm">Price on request</span>
          ) : product.price ? (
            <span className="text-white font-bold">{formatCurrency(product.price)}</span>
          ) : null}
        </div>

        {/* CTAs */}
        <div className="flex gap-2">
          <a
            href={waUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 flex items-center justify-center gap-2 bg-[#25D366]/10 border border-[#25D366]/30 text-[#25D366] hover:bg-[#25D366]/20 transition-colors px-3 py-2.5 rounded-xl text-sm font-medium"
          >
            <MessageCircle className="w-4 h-4" />
            WhatsApp
          </a>
          <Link href={`/enquiry?product=${encodeURIComponent(product.name)}`} className="flex-1">
            <Button size="sm" className="w-full text-xs">
              Get Quote
              <ArrowRight className="w-3.5 h-3.5" />
            </Button>
          </Link>
        </div>
      </div>
    </motion.div>
  );
}
