import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function GET(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const enquiries = await prisma.enquiry.findMany({
    orderBy: { createdAt: "desc" },
    select: {
      id: true,
      name: true,
      email: true,
      phone: true,
      company: true,
      propertyType: true,
      budgetRange: true,
      timeline: true,
      indoorCameras: true,
      outdoorCameras: true,
      status: true,
      priority: true,
      leadScore: true,
      productInterest: true,
      message: true,
      address: true,
      createdAt: true,
    },
  });

  const headers = [
    "ID", "Name", "Email", "Phone", "Company", "Property Type", "Budget Range",
    "Timeline", "Indoor Cameras", "Outdoor Cameras", "Status", "Priority",
    "Lead Score", "Product Interest", "Message", "Address", "Date",
  ];

  const rows = enquiries.map((e) => [
    e.id,
    e.name,
    e.email,
    e.phone,
    e.company || "",
    e.propertyType,
    e.budgetRange || "",
    e.timeline || "",
    e.indoorCameras,
    e.outdoorCameras,
    e.status,
    e.priority,
    e.leadScore,
    e.productInterest || "",
    (e.message || "").replace(/\n/g, " "),
    e.address || "",
    new Date(e.createdAt).toLocaleDateString("en-IN"),
  ]);

  const csv = [headers, ...rows]
    .map((row) => row.map((cell) => `"${String(cell).replace(/"/g, '""')}"`).join(","))
    .join("\n");

  return new NextResponse(csv, {
    headers: {
      "Content-Type": "text/csv",
      "Content-Disposition": `attachment; filename="netra-leads-${new Date().toISOString().split("T")[0]}.csv"`,
    },
  });
}
