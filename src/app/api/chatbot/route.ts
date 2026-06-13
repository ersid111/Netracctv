import { NextRequest, NextResponse } from "next/server";
import { CHATBOT_RESPONSES } from "@/lib/constants";

export async function POST(req: NextRequest) {
  const { message } = await req.json();
  if (!message) return NextResponse.json({ error: "No message" }, { status: 400 });

  const lower = message.toLowerCase();
  let response = CHATBOT_RESPONSES.default;

  for (const [key, resp] of Object.entries(CHATBOT_RESPONSES)) {
    if (key !== "default" && lower.includes(key)) {
      response = resp;
      break;
    }
  }

  // If OPENAI_API_KEY is set, forward to OpenAI
  if (process.env.OPENAI_API_KEY) {
    try {
      const res = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        },
        body: JSON.stringify({
          model: "gpt-4o-mini",
          messages: [
            {
              role: "system",
              content:
                "You are a helpful assistant for NETRA CCTV, a premium security solutions company in India. Answer questions about CCTV, security cameras, installation, pricing (in INR), and services. Be concise, professional, and recommend booking a free site visit for specific quotes.",
            },
            { role: "user", content: message },
          ],
          max_tokens: 200,
        }),
      });
      const data = await res.json();
      response = data.choices?.[0]?.message?.content || response;
    } catch {
      // fall back to rule-based
    }
  }

  return NextResponse.json({ response });
}
