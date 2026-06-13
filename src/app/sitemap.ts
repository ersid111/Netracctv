import { MetadataRoute } from "next";
import { STATIC_PRODUCTS, STATIC_PORTFOLIOS } from "@/lib/static-data";
import { prisma } from "@/lib/prisma";

const BASE_URL = process.env.NEXTAUTH_URL || "https://www.netracctv.com";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  let products = STATIC_PRODUCTS.map((p) => ({ slug: p.slug, updatedAt: p.updatedAt }));
  let portfolios = STATIC_PORTFOLIOS.map((p) => ({ slug: p.slug, updatedAt: p.updatedAt }));

  if (process.env.STATIC_EXPORT !== "true") {
    try {
      const [dbProducts, dbPortfolios] = await Promise.all([
        prisma.product.findMany({ where: { isActive: true }, select: { slug: true, updatedAt: true } }),
        prisma.portfolio.findMany({ where: { isPublished: true }, select: { slug: true, updatedAt: true } }),
      ]);
      if (dbProducts.length) products = dbProducts;
      if (dbPortfolios.length) portfolios = dbPortfolios;
    } catch { /* fall through to static data */ }
  }

  const staticPages: MetadataRoute.Sitemap = [
    { url: BASE_URL, lastModified: new Date(), changeFrequency: "weekly", priority: 1 },
    { url: `${BASE_URL}/services`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.9 },
    { url: `${BASE_URL}/products`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.9 },
    { url: `${BASE_URL}/portfolio`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE_URL}/about`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE_URL}/contact`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE_URL}/enquiry`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.9 },
  ];

  return [
    ...staticPages,
    ...products.map((p) => ({ url: `${BASE_URL}/products/${p.slug}`, lastModified: p.updatedAt, changeFrequency: "monthly" as const, priority: 0.7 })),
    ...portfolios.map((p) => ({ url: `${BASE_URL}/portfolio/${p.slug}`, lastModified: p.updatedAt, changeFrequency: "monthly" as const, priority: 0.6 })),
  ];
}
