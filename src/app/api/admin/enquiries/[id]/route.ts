import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const enquiry = await prisma.enquiry.findUnique({
    where: { id: params.id },
    include: { attachments: true, notes: { orderBy: { createdAt: "desc" } } },
  });

  if (!enquiry) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json(enquiry);
}

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await req.json();
  const { status, priority, note } = body;

  if (note) {
    await prisma.adminNote.create({
      data: {
        enquiryId: params.id,
        content: note,
        author: session.user?.name || session.user?.email || "Admin",
      },
    });
  }

  const updated = await prisma.enquiry.update({
    where: { id: params.id },
    data: {
      ...(status ? { status } : {}),
      ...(priority ? { priority } : {}),
    },
  });

  return NextResponse.json(updated);
}
