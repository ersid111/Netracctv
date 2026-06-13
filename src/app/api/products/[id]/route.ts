import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { parseJsonField } from "@/lib/utils";

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  const product = await prisma.product.findFirst({
    where: { OR: [{ id: params.id }, { slug: params.id }], isActive: true },
  });

  if (!product) return NextResponse.json({ error: "Not found" }, { status: 404 });

  return NextResponse.json({
    ...product,
    features: parseJsonField<string[]>(product.features, []),
    specifications: parseJsonField<Record<string, string>>(product.specifications, {}),
    images: parseJsonField<string[]>(product.images, []),
  });
}

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await req.json();
  const product = await prisma.product.update({
    where: { id: params.id },
    data: {
      ...body,
      features: JSON.stringify(body.features || []),
      specifications: JSON.stringify(body.specifications || {}),
      images: JSON.stringify(body.images || []),
    },
  });
  return NextResponse.json(product);
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  await prisma.product.delete({ where: { id: params.id } });
  return NextResponse.json({ success: true });
}
