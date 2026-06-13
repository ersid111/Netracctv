import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { enquirySchema } from "@/lib/validations";
import { computeLeadScore, getPriority } from "@/lib/lead-scoring";
import { sendEnquiryNotification, sendEnquiryConfirmation } from "@/lib/email";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parsed = enquirySchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Invalid data", details: parsed.error.flatten() },
        { status: 400 }
      );
    }

    const data = parsed.data;
    const leadScore = computeLeadScore({
      propertyType: data.propertyType,
      budgetRange: data.budgetRange,
      timeline: data.timeline,
      indoorCameras: data.indoorCameras,
      outdoorCameras: data.outdoorCameras,
      aiAnalytics: data.aiAnalytics,
      hasExisting: data.hasExisting,
      company: data.company,
      requirements: data.requirements,
    });
    const priority = getPriority(leadScore);

    const enquiry = await prisma.enquiry.create({
      data: {
        propertyType: data.propertyType,
        propertySize: data.propertySize,
        indoorCameras: data.indoorCameras,
        outdoorCameras: data.outdoorCameras,
        coverageAreas: JSON.stringify(data.coverageAreas),
        budgetRange: data.budgetRange,
        budgetFlexible: data.budgetFlexible,
        timeline: data.timeline,
        hasExisting: data.hasExisting,
        existingBrand: data.existingBrand,
        existingIssues: data.existingIssues,
        requirements: JSON.stringify(data.requirements),
        resolution: data.resolution,
        nightVision: data.nightVision,
        remoteAccess: data.remoteAccess,
        aiAnalytics: data.aiAnalytics,
        name: data.name,
        email: data.email,
        phone: data.phone,
        company: data.company,
        address: data.address,
        preferredContact: data.preferredContact,
        message: data.message,
        productInterest: data.productInterest,
        leadScore,
        priority,
        ipAddress: req.headers.get("x-forwarded-for") || undefined,
        source: req.headers.get("referer") || undefined,
      },
    });

    await Promise.allSettled([
      sendEnquiryNotification({
        name: data.name,
        email: data.email,
        phone: data.phone,
        propertyType: data.propertyType,
        budgetRange: data.budgetRange,
        message: data.message,
        leadScore,
        priority,
        enquiryId: enquiry.id,
        productInterest: data.productInterest,
      }),
      sendEnquiryConfirmation({ name: data.name, email: data.email, enquiryId: enquiry.id }),
    ]);

    return NextResponse.json({ success: true, id: enquiry.id }, { status: 201 });
  } catch (err) {
    console.error("[Enquiry API]", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const status = searchParams.get("status");
  const limit = parseInt(searchParams.get("limit") || "50");

  const enquiries = await prisma.enquiry.findMany({
    where: status ? { status } : undefined,
    orderBy: { createdAt: "desc" },
    take: limit,
    select: {
      id: true,
      name: true,
      email: true,
      phone: true,
      propertyType: true,
      budgetRange: true,
      status: true,
      priority: true,
      leadScore: true,
      createdAt: true,
      productInterest: true,
    },
  });

  return NextResponse.json(enquiries);
}
