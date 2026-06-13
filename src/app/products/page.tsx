import { prisma } from "@/lib/prisma";
import { parseJsonField } from "@/lib/utils";
import { generatePageMetadata } from "@/lib/seo";
import { STATIC_PRODUCTS } from "@/lib/static-data";
import { ProductsClientPage } from "@/components/products/ProductsClientPage";
import type { Product } from "@/types";

export const metadata = generatePageMetadata(
  "Security Camera Products",
  "Browse our complete range of IP cameras, NVR/DVR, access control and surveillance products.",
  "/products"
);

async function getAllProducts(): Promise<Product[]> {
  if (process.env.STATIC_EXPORT === "true") return STATIC_PRODUCTS;
  try {
    const products = await prisma.product.findMany({
      where: { isActive: true },
      orderBy: [{ isFeatured: "desc" }, { sortOrder: "asc" }, { createdAt: "desc" }],
    });
    return products.map((p) => ({
      ...p,
      features: parseJsonField<string[]>(p.features, []),
      specifications: parseJsonField<Record<string, string>>(p.specifications, {}),
      images: parseJsonField<string[]>(p.images, []),
    })) as Product[];
  } catch {
    return STATIC_PRODUCTS;
  }
}

export default async function ProductsPage() {
  const products = await getAllProducts();
  return <ProductsClientPage products={products} />;
}
