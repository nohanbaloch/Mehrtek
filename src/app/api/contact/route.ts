import { NextResponse } from "next/server";

import { contactSchema } from "@/lib/schema";

const RATE_LIMIT = 5;
const WINDOW_MS = 60 * 60 * 1000;
const requestsByIp = new Map<string, { count: number; resetAt: number }>();

function getClientIp(request: Request) {
  return request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
}

export async function POST(request: Request) {
  const ip = getClientIp(request);
  const now = Date.now();
  const current = requestsByIp.get(ip);
  if (current && current.resetAt > now && current.count >= RATE_LIMIT) {
    return NextResponse.json({ message: "Please try again later." }, { status: 429 });
  }
  requestsByIp.set(ip, current && current.resetAt > now ? { count: current.count + 1, resetAt: current.resetAt } : { count: 1, resetAt: now + WINDOW_MS });

  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ message: "Invalid request." }, { status: 400 });
  }

  const result = contactSchema.safeParse(payload);
  if (!result.success) {
    return NextResponse.json({ message: "Please check the form fields." }, { status: 400 });
  }

  if (result.data.honeypot) {
    return NextResponse.json({ message: "Thanks for reaching out." }, { status: 200 });
  }

  const webhookUrl = process.env.CONTACT_WEBHOOK_URL;
  if (!webhookUrl) {
    console.warn("CONTACT_WEBHOOK_URL is not configured.");
    if (process.env.NODE_ENV === "development") {
      return NextResponse.json({ message: "Thanks for reaching out." }, { status: 200 });
    }
    return NextResponse.json({ message: "Contact service is temporarily unavailable." }, { status: 503 });
  }

  try {
    const response = await fetch(webhookUrl, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        name: result.data.name,
        email: result.data.email,
        service: result.data.service,
        message: result.data.message ?? "",
      }),
    });
    if (!response.ok) {
      return NextResponse.json({ message: "Unable to send your message right now." }, { status: 500 });
    }
  } catch {
    return NextResponse.json({ message: "Unable to send your message right now." }, { status: 500 });
  }

  return NextResponse.json({ message: "Thanks for reaching out." }, { status: 200 });
}

export async function GET() {
  return NextResponse.json({ message: "Method not allowed." }, { status: 405 });
}
