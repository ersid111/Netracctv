import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { slugify, parseJsonField } from "@/lib/utils";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const category = searchParams.get("category");
  const search = searchParams.get("search");
  const featured = searchParams.get("featured");

  const products = await prisma.product.findMany({
    where: {
      isActive: true,
      ...(category && category !== "ALL" ? { category } : {}),
      ...(featured ? { isFeatured: true } : {}),
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

  return NextResponse.json(
    products.map((p) => ({
      ...p,
      features: parseJsonField<string[]>(p.features, []),
      specifications: parseJsonField<Record<string, string>>(p.specifications, {}),
      images: parseJsonField<string[]>(p.images, []),
    }))
  );
}

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const body = await req.json();
    const product = await prisma.product.create({
      data: {
        ...body,
        slug: slugify(body.name),
        features: JSON.stringify(body.features || []),
        specifications: JSON.stringify(body.specifications || {}),
        images: JSON.stringify(body.images || []),
      },
    });
    return NextResponse.json(product, { status: 201 });
  } catch (err) {
    console.error("[Products POST]", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
