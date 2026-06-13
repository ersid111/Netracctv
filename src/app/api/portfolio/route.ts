import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { slugify, parseJsonField } from "@/lib/utils";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const featured = searchParams.get("featured");

  const items = await prisma.portfolio.findMany({
    where: { isPublished: true, ...(featured ? { isFeatured: true } : {}) },
    orderBy: [{ isFeatured: "desc" }, { sortOrder: "asc" }, { createdAt: "desc" }],
  });

  return NextResponse.json(
    items.map((p) => ({
      ...p,
      galleryImages: parseJsonField<string[]>(p.galleryImages, []),
      tags: parseJsonField<string[]>(p.tags, []),
    }))
  );
}

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await req.json();
  const item = await prisma.portfolio.create({
    data: {
      ...body,
      slug: slugify(body.title),
      galleryImages: JSON.stringify(body.galleryImages || []),
      tags: JSON.stringify(body.tags || []),
    },
  });
  return NextResponse.json(item, { status: 201 });
}
