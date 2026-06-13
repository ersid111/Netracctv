import { prisma } from "@/lib/prisma";
import { parseJsonField } from "@/lib/utils";
import { generatePageMetadata } from "@/lib/seo";
import { ParticleGrid } from "@/components/widgets/ParticleGrid";
import { PortfolioGrid } from "@/components/portfolio/PortfolioGrid";
import type { Portfolio } from "@/types";

export const metadata = generatePageMetadata(
  "Portfolio — Security Projects",
  "Explore our completed CCTV and security installations across residential, commercial and industrial sectors.",
  "/portfolio"
);

async function getPortfolios() {
  const items = await prisma.portfolio.findMany({
    where: { isPublished: true },
    orderBy: [{ isFeatured: "desc" }, { sortOrder: "asc" }, { createdAt: "desc" }],
  });

  return items.map((p) => ({
    ...p,
    galleryImages: parseJsonField<string[]>(p.galleryImages, []),
    tags: parseJsonField<string[]>(p.tags, []),
  })) as Portfolio[];
}

export default async function PortfolioPage() {
  const portfolios = await getPortfolios();

  return (
    <div className="bg-navy min-h-screen">
      <section className="relative pt-24 pb-16 bg-hero-gradient overflow-hidden">
        <ParticleGrid />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-brand-blue text-sm font-semibold tracking-widest uppercase mb-4 block">
            Our Work
          </span>
          <h1 className="text-5xl font-black text-white mb-4">Project Portfolio</h1>
          <p className="text-white/60 text-lg">
            Real installations. Real results. See how we&apos;ve secured properties across India.
          </p>
        </div>
      </section>
      <PortfolioGrid portfolios={portfolios} />
    </div>
  );
}
