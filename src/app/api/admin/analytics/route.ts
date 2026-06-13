import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function GET(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const [total, newToday, byStatus, recent] = await Promise.all([
    prisma.enquiry.count(),
    prisma.enquiry.count({
      where: {
        createdAt: { gte: new Date(new Date().setHours(0, 0, 0, 0)) },
      },
    }),
    prisma.enquiry.groupBy({ by: ["status"], _count: { status: true } }),
    prisma.enquiry.findMany({
      take: 30,
      orderBy: { createdAt: "desc" },
      select: { createdAt: true, leadScore: true, status: true, priority: true },
    }),
  ]);

  const won = byStatus.find((s) => s.status === "WON")?._count.status || 0;
  const conversionRate = total > 0 ? Math.round((won / total) * 100) : 0;

  const last30 = Array.from({ length: 30 }, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() - (29 - i));
    return d.toISOString().split("T")[0];
  }).map((date) => ({
    date,
    count: recent.filter((e) => e.createdAt.toISOString().split("T")[0] === date).length,
  }));

  return NextResponse.json({
    total,
    newToday,
    conversionRate,
    byStatus,
    last30,
  });
}
