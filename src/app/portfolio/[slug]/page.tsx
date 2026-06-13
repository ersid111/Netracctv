import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import { STATIC_PORTFOLIOS } from "@/lib/static-data";
import { parseJsonField } from "@/lib/utils";
import Link from "next/link";
import { ArrowLeft, MapPin, Camera, Clock } from "lucide-react";
import { Button } from "@/components/ui/Button";

export async function generateStaticParams() {
  return STATIC_PORTFOLIOS.map((p) => ({ slug: p.slug }));
}

export default async function PortfolioDetailPage({ params }: { params: { slug: string } }) {
  let item = null;
  if (process.env.STATIC_EXPORT === "true") {
    item = STATIC_PORTFOLIOS.find((p) => p.slug === params.slug) ?? null;
  } else {
    try {
      const raw = await prisma.portfolio.findFirst({
        where: { OR: [{ slug: params.slug }, { id: params.slug }], isPublished: true },
      });
      item = raw ?? STATIC_PORTFOLIOS.find((p) => p.slug === params.slug) ?? null;
    } catch {
      item = STATIC_PORTFOLIOS.find((p) => p.slug === params.slug) ?? null;
    }
  }

  if (!item) notFound();

  const tags: string[] = Array.isArray(item.tags) ? item.tags as string[] : parseJsonField<string[]>(item.tags as string, []);

  return (
    <div className="bg-navy min-h-screen pt-24 pb-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link href="/portfolio" className="inline-flex items-center gap-2 text-white/40 hover:text-white text-sm mb-8 transition-colors">
          <ArrowLeft className="w-4 h-4" /> Back to Portfolio
        </Link>

        <div className="mb-6">
          {item.clientIndustry && (
            <span className="bg-brand-blue/20 border border-brand-blue/30 text-brand-blue text-xs font-semibold px-3 py-1.5 rounded-full uppercase tracking-wider">
              {item.clientIndustry}
            </span>
          )}
        </div>

        <h1 className="text-4xl sm:text-5xl font-black text-white mb-4">{item.title}</h1>
        <p className="text-white/60 text-lg mb-8">{item.summary}</p>

        {/* Meta */}
        <div className="flex flex-wrap gap-6 mb-10 text-sm text-white/50">
          {item.location && <span className="flex items-center gap-1.5"><MapPin className="w-4 h-4" />{item.location}</span>}
          {item.camerasInstalled && <span className="flex items-center gap-1.5"><Camera className="w-4 h-4" />{item.camerasInstalled} cameras installed</span>}
          {item.projectDuration && <span className="flex items-center gap-1.5"><Clock className="w-4 h-4" />{item.projectDuration}</span>}
        </div>

        {/* Case Study */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-12">
          {[
            { label: "The Challenge", content: item.challenge },
            { label: "Our Solution", content: item.solution },
            { label: "The Outcome", content: item.outcome },
          ].map(({ label, content }) => (
            <div key={label} className="bg-white/5 border border-white/10 rounded-xl p-5">
              <h3 className="text-brand-blue font-bold text-sm uppercase tracking-wider mb-3">{label}</h3>
              <p className="text-white/60 text-sm leading-relaxed">{content}</p>
            </div>
          ))}
        </div>

        {/* Tags */}
        {tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-10">
            {tags.map((tag) => (
              <span key={tag} className="bg-white/5 border border-white/10 text-white/50 text-xs px-3 py-1 rounded-full">
                {tag}
              </span>
            ))}
          </div>
        )}

        <Link href="/enquiry">
          <Button size="lg">Start Your Project</Button>
        </Link>
      </div>
    </div>
  );
}
