import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import { parseJsonField, getProductWhatsAppUrl, formatCurrency } from "@/lib/utils";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, Check, MessageCircle, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { STATIC_PRODUCTS } from "@/lib/static-data";

const CATEGORY_LABELS: Record<string, string> = {
  IP_CAMERAS: "IP Camera",
  ANALOG_HD: "Analog HD",
  PTZ_CAMERAS: "PTZ Camera",
  THERMAL: "Thermal",
  NVR_DVR: "NVR / DVR",
  VIDEO_ANALYTICS: "Video Analytics",
  ACCESS_CONTROL: "Access Control",
  INTERCOM: "Intercom",
};

export async function generateStaticParams() {
  return STATIC_PRODUCTS.map((p) => ({ slug: p.slug }));
}

export default async function ProductDetailPage({ params }: { params: { slug: string } }) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let product: any = null;

  if (process.env.STATIC_EXPORT === "true") {
    product = STATIC_PRODUCTS.find((p) => p.slug === params.slug) ?? null;
  } else {
    try {
      const raw = await prisma.product.findFirst({
        where: { OR: [{ slug: params.slug }, { id: params.slug }], isActive: true },
      });
      if (raw) {
        product = {
          ...raw,
          features: parseJsonField<string[]>(raw.features, []),
          specifications: parseJsonField<Record<string, string>>(raw.specifications, {}),
          images: parseJsonField<string[]>(raw.images, []),
        };
      }
    } catch {
      product = STATIC_PRODUCTS.find((p) => p.slug === params.slug) ?? null;
    }
  }

  if (!product) notFound();

  const features: string[] = Array.isArray(product.features) ? product.features : [];
  const specs: Record<string, string> =
    product.specifications && typeof product.specifications === "object" && !Array.isArray(product.specifications)
      ? product.specifications
      : {};
  const categoryLabel = CATEGORY_LABELS[product.category] || product.category;
  const waUrl = getProductWhatsAppUrl(product.name, categoryLabel);

  return (
    <div className="bg-navy min-h-screen pt-24 pb-16">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link href="/products" className="inline-flex items-center gap-2 text-white/40 hover:text-white text-sm mb-8 transition-colors">
          <ArrowLeft className="w-4 h-4" /> Back to Products
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="relative aspect-square rounded-2xl overflow-hidden bg-gradient-to-br from-brand-blue/10 to-navy border border-white/10">
            {product.imageUrl ? (
              <Image src={product.imageUrl} alt={product.name} fill className="object-cover" />
            ) : (
              <div className="flex items-center justify-center h-full text-brand-blue/20 text-6xl font-black">
                {product.name.slice(0, 2).toUpperCase()}
              </div>
            )}
          </div>

          <div>
            <div className="flex flex-wrap gap-2 mb-3">
              <Badge variant="blue" size="md">{categoryLabel}</Badge>
              {product.brand && <Badge variant="outline" size="md">{product.brand}</Badge>}
              {product.isFeatured && <Badge variant="yellow" size="md">Featured</Badge>}
            </div>
            <h1 className="text-3xl font-black text-white mb-3">{product.name}</h1>
            {product.model && <p className="text-white/40 text-sm mb-4">Model: {product.model}</p>}
            <p className="text-white/60 leading-relaxed mb-6">{product.description}</p>
            <div className="bg-white/5 border border-white/10 rounded-xl p-4 mb-6">
              {product.priceOnRequest ? (
                <p className="text-white font-medium">Price available on request</p>
              ) : product.price ? (
                <p className="text-3xl font-black text-white">{formatCurrency(product.price)}</p>
              ) : null}
            </div>
            {features.length > 0 && (
              <div className="mb-6">
                <h3 className="text-white font-bold mb-3">Key Features</h3>
                <ul className="space-y-2">
                  {features.map((f) => (
                    <li key={f} className="flex items-center gap-2 text-sm text-white/70">
                      <div className="w-5 h-5 rounded-full bg-brand-blue/20 border border-brand-blue/30 flex items-center justify-center shrink-0">
                        <Check className="w-3 h-3 text-brand-blue" />
                      </div>
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
            )}
            <div className="flex flex-col sm:flex-row gap-3">
              <a href={waUrl} target="_blank" rel="noopener noreferrer" className="flex-1">
                <Button variant="whatsapp" size="lg" className="w-full">
                  <MessageCircle className="w-5 h-5" /> WhatsApp Enquiry
                </Button>
              </a>
              <Link href={`/enquiry?product=${encodeURIComponent(product.name)}`} className="flex-1">
                <Button size="lg" className="w-full">
                  Get Detailed Quote <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {Object.keys(specs).length > 0 && (
          <div className="mt-12">
            <h2 className="text-2xl font-bold text-white mb-6">Specifications</h2>
            <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden">
              <table className="w-full">
                <tbody>
                  {Object.entries(specs).map(([key, value], i) => (
                    <tr key={key} className={i % 2 === 0 ? "bg-white/5" : ""}>
                      <td className="px-6 py-3 text-white/50 text-sm font-medium w-40">{key}</td>
                      <td className="px-6 py-3 text-white text-sm">{value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
