"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { ProductCard } from "@/components/products/ProductCard";
import { PRODUCT_CATEGORIES } from "@/lib/constants";
import { ParticleGrid } from "@/components/widgets/ParticleGrid";
import { Search } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Product } from "@/types";

function ProductsContent({ products }: { products: Product[] }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [search, setSearch] = useState(searchParams.get("search") || "");

  const activeCategory = searchParams.get("category") || "ALL";

  const filtered = products.filter((p) => {
    const matchCat = activeCategory === "ALL" || p.category === activeCategory;
    const q = search.toLowerCase();
    const matchSearch =
      !q ||
      p.name.toLowerCase().includes(q) ||
      p.description.toLowerCase().includes(q) ||
      (p.brand || "").toLowerCase().includes(q);
    return matchCat && matchSearch;
  });

  const setCategory = (cat: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (cat === "ALL") params.delete("category");
    else params.set("category", cat);
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  };

  return (
    <div className="bg-navy min-h-screen">
      <section className="relative pt-24 pb-16 bg-hero-gradient overflow-hidden">
        <ParticleGrid />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-brand-blue text-sm font-semibold tracking-widest uppercase mb-4 block">
            Our Products
          </span>
          <h1 className="text-5xl font-black text-white mb-4">Security Camera Products</h1>
          <p className="text-white/60 text-lg">
            Professional-grade surveillance equipment from leading global brands.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search products..."
              className="w-full bg-white/5 border border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-white text-sm placeholder-white/30 focus:outline-none focus:border-brand-blue"
            />
          </div>
          <div className="flex flex-wrap gap-2">
            {PRODUCT_CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setCategory(cat.id)}
                className={cn(
                  "px-3 py-1.5 rounded-full text-xs font-semibold transition-all",
                  activeCategory === cat.id
                    ? "bg-brand-blue text-white"
                    : "bg-white/5 text-white/50 hover:bg-white/10 border border-white/10"
                )}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {filtered.length === 0 ? (
          <div className="text-center py-24 text-white/30">No products found.</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filtered.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export function ProductsClientPage({ products }: { products: Product[] }) {
  return (
    <Suspense fallback={null}>
      <ProductsContent products={products} />
    </Suspense>
  );
}
