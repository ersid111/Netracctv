import { Suspense } from "react";
import { prisma } from "@/lib/prisma";
import { ProductCard } from "@/components/products/ProductCard";
import { PRODUCT_CATEGORIES } from "@/lib/constants";
import { parseJsonField } from "@/lib/utils";
import { generatePageMetadata } from "@/lib/seo";
import type { Product } from "@/types";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Search } from "lucide-react";
import { ParticleGrid } from "@/components/widgets/ParticleGrid";

export const metadata = generatePageMetadata(
  "Security Camera Products",
  "Browse our complete range of IP cameras, NVR/DVR, access control and surveillance products.",
  "/products"
);

async function getProducts(category: string, search: string) {
  const products = await prisma.product.findMany({
    where: {
      isActive: true,
      ...(category && category !== "ALL" ? { category } : {}),
      ...(search
        ? {
            OR: [
              { name: { contains: search } },
              { description: { contains: search } },
              { brand: { contains: search } },
            ],
          }
        : {}),
    },
    orderBy: [{ isFeatured: "desc" }, { sortOrder: "asc" }, { createdAt: "desc" }],
  });

  return products.map((p) => ({
    ...p,
    features: parseJsonField<string[]>(p.features, []),
    specifications: parseJsonField<Record<string, string>>(p.specifications, {}),
    images: parseJsonField<string[]>(p.images, []),
  })) as Product[];
}

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: { category?: string; search?: string };
}) {
  const category = searchParams.category || "ALL";
  const search = searchParams.search || "";
  const products = await getProducts(category, search);

  return (
    <div className="bg-navy min-h-screen">
      {/* Hero */}
      <section className="relative pt-24 pb-16 bg-hero-gradient overflow-hidden">
        <ParticleGrid />
        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-brand-blue text-sm font-semibold tracking-widest uppercase mb-4 block">
            Product Catalogue
          </span>
          <h1 className="text-5xl font-black text-white mb-4">Security Products</h1>
          <p className="text-white/60 text-lg mb-8">
            Premium CCTV cameras, recorders, and access control equipment.
          </p>

          {/* Search */}
          <form className="max-w-lg mx-auto">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/30" />
              <input
                name="search"
                defaultValue={search}
                placeholder="Search cameras, NVR, brands..."
                className="w-full bg-white/5 border border-white/20 rounded-xl pl-12 pr-4 py-3 text-white placeholder:text-white/30 focus:outline-none focus:border-brand-blue"
              />
            </div>
          </form>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Category Filters */}
        <div className="flex flex-wrap gap-2 mb-10">
          {PRODUCT_CATEGORIES.map((cat) => (
            <Link
              key={cat.id}
              href={`/products?category=${cat.id}${search ? `&search=${search}` : ""}`}
              className={cn(
                "px-4 py-2 rounded-full text-sm font-medium transition-all border",
                category === cat.id
                  ? "bg-brand-blue text-white border-brand-blue"
                  : "bg-white/5 border-white/10 text-white/60 hover:bg-white/10 hover:text-white"
              )}
            >
              {cat.label}
            </Link>
          ))}
        </div>

        {/* Results count */}
        <p className="text-white/40 text-sm mb-6">
          {products.length} product{products.length !== 1 ? "s" : ""} found
        </p>

        {/* Product Grid */}
        <Suspense fallback={<div className="text-white/40">Loading...</div>}>
          {products.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <p className="text-white/40 text-lg">No products found.</p>
              <Link
                href="/products"
                className="text-brand-blue hover:text-blue-300 text-sm mt-2 inline-block"
              >
                Clear filters
              </Link>
            </div>
          )}
        </Suspense>
      </div>
    </div>
  );
}
