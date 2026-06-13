import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { contactSchema } from "@/lib/validations";
import { sendContactNotification } from "@/lib/email";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parsed = contactSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json({ error: "Invalid data" }, { status: 400 });
    }

    const data = parsed.data;
    await prisma.contactMessage.create({ data });
    await sendContactNotification(data);

    return NextResponse.json({ success: true }, { status: 201 });
  } catch (err) {
    console.error("[Contact API]", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
