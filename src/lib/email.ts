import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || "smtp.mailtrap.io",
  port: parseInt(process.env.SMTP_PORT || "587"),
  secure: process.env.SMTP_SECURE === "true",
  auth:
    process.env.SMTP_USER
      ? { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS }
      : undefined,
});

interface EnquiryEmailData {
  name: string;
  email: string;
  phone: string;
  propertyType: string;
  budgetRange?: string;
  message?: string;
  leadScore: number;
  priority: string;
  enquiryId: string;
  productInterest?: string;
}

export async function sendEnquiryNotification(data: EnquiryEmailData) {
  if (!process.env.SMTP_USER) {
    console.log("[Email] SMTP not configured — enquiry received:", data.enquiryId);
    return;
  }

  const adminEmail = process.env.ADMIN_EMAIL_NOTIFY || "admin@netracctv.com";

  const priorityColor =
    data.priority === "URGENT"
      ? "#FF3B30"
      : data.priority === "HIGH"
      ? "#FF9500"
      : data.priority === "MEDIUM"
      ? "#FFCC00"
      : "#34C759";

  await transporter.sendMail({
    from: process.env.SMTP_FROM || "NETRA CCTV <noreply@netracctv.com>",
    to: adminEmail,
    subject: `[${data.priority}] New Enquiry: ${data.name} — Lead Score ${data.leadScore}/100`,
    html: `
      <div style="font-family:sans-serif;max-width:600px;margin:0 auto;">
        <div style="background:#071A2E;padding:24px;border-radius:8px 8px 0 0;">
          <h1 style="color:#fff;margin:0;font-size:20px;">New Enquiry Received</h1>
          <p style="color:#888;margin:4px 0 0;">NETRA CCTV Admin Notification</p>
        </div>
        <div style="background:#0d1f35;padding:24px;border-radius:0 0 8px 8px;">
          <div style="display:flex;gap:16px;margin-bottom:20px;">
            <span style="background:${priorityColor};color:#fff;padding:4px 12px;border-radius:999px;font-size:12px;font-weight:bold;">${data.priority} PRIORITY</span>
            <span style="background:#0B5FFF;color:#fff;padding:4px 12px;border-radius:999px;font-size:12px;">Score: ${data.leadScore}/100</span>
          </div>
          <table style="width:100%;border-collapse:collapse;">
            <tr><td style="padding:8px 0;color:#aaa;width:40%;">Name</td><td style="padding:8px 0;color:#fff;font-weight:bold;">${data.name}</td></tr>
            <tr><td style="padding:8px 0;color:#aaa;">Phone</td><td style="padding:8px 0;color:#fff;">${data.phone}</td></tr>
            <tr><td style="padding:8px 0;color:#aaa;">Email</td><td style="padding:8px 0;color:#fff;">${data.email}</td></tr>
            <tr><td style="padding:8px 0;color:#aaa;">Property</td><td style="padding:8px 0;color:#fff;">${data.propertyType}</td></tr>
            <tr><td style="padding:8px 0;color:#aaa;">Budget</td><td style="padding:8px 0;color:#fff;">${data.budgetRange || "Not specified"}</td></tr>
            ${data.productInterest ? `<tr><td style="padding:8px 0;color:#aaa;">Product Interest</td><td style="padding:8px 0;color:#fff;">${data.productInterest}</td></tr>` : ""}
            ${data.message ? `<tr><td style="padding:8px 0;color:#aaa;">Message</td><td style="padding:8px 0;color:#fff;">${data.message}</td></tr>` : ""}
          </table>
          <a href="${process.env.NEXTAUTH_URL}/admin/enquiries" style="display:inline-block;margin-top:20px;background:#0B5FFF;color:#fff;padding:12px 24px;border-radius:6px;text-decoration:none;font-weight:bold;">View in Admin Panel</a>
        </div>
      </div>
    `,
  });
}

export async function sendEnquiryConfirmation(data: { name: string; email: string; enquiryId: string }) {
  if (!process.env.SMTP_USER) return;

  await transporter.sendMail({
    from: process.env.SMTP_FROM || "NETRA CCTV <noreply@netracctv.com>",
    to: data.email,
    subject: "Your NETRA CCTV Enquiry Has Been Received",
    html: `
      <div style="font-family:sans-serif;max-width:600px;margin:0 auto;">
        <div style="background:#071A2E;padding:32px;border-radius:8px 8px 0 0;text-align:center;">
          <h1 style="color:#0B5FFF;margin:0;font-size:28px;font-weight:900;">NETRA CCTV</h1>
          <p style="color:#aaa;margin:8px 0 0;">See More. Secure More.</p>
        </div>
        <div style="background:#f9fafb;padding:32px;border-radius:0 0 8px 8px;">
          <h2 style="color:#071A2E;margin:0 0 16px;">Thank you, ${data.name}!</h2>
          <p style="color:#555;line-height:1.6;">We've received your enquiry and our security experts will contact you within <strong>2 hours</strong> during business hours.</p>
          <div style="background:#fff;border:1px solid #e5e7eb;border-radius:8px;padding:16px;margin:20px 0;">
            <p style="margin:0;color:#555;font-size:14px;">Enquiry Reference: <strong style="color:#0B5FFF;">#${data.enquiryId.slice(-8).toUpperCase()}</strong></p>
          </div>
          <p style="color:#555;line-height:1.6;">For urgent queries, reach us directly:</p>
          <p style="color:#555;">
            <strong>Phone:</strong> ${process.env.NEXT_PUBLIC_COMPANY_PHONE || "+91 98765 43210"}<br>
            <strong>WhatsApp:</strong> Same number
          </p>
        </div>
      </div>
    `,
  });
}

export async function sendContactNotification(data: {
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
}) {
  if (!process.env.SMTP_USER) {
    console.log("[Email] Contact form received from:", data.email);
    return;
  }

  const adminEmail = process.env.ADMIN_EMAIL_NOTIFY || "admin@netracctv.com";

  await transporter.sendMail({
    from: process.env.SMTP_FROM || "NETRA CCTV <noreply@netracctv.com>",
    to: adminEmail,
    subject: `Contact Form: ${data.subject}`,
    html: `
      <div style="font-family:sans-serif;max-width:600px;margin:0 auto;background:#f9fafb;padding:24px;border-radius:8px;">
        <h2>New Contact Message</h2>
        <p><strong>Name:</strong> ${data.name}</p>
        <p><strong>Email:</strong> ${data.email}</p>
        <p><strong>Phone:</strong> ${data.phone || "Not provided"}</p>
        <p><strong>Subject:</strong> ${data.subject}</p>
        <p><strong>Message:</strong><br>${data.message}</p>
      </div>
    `,
  });
}
