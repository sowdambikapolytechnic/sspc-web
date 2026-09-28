import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { enquirySubmitSchema } from "@/lib/validation/schemas";

// Rate limiting using in-memory store (for production, use Redis/Upstash)
const rateLimit = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT_MAX = 5;
const RATE_LIMIT_WINDOW_MS = 15 * 60 * 1000; // 15 minutes

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimit.get(ip);
  if (!entry || now > entry.resetAt) {
    rateLimit.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return true;
  }
  if (entry.count >= RATE_LIMIT_MAX) return false;
  entry.count++;
  return true;
}

export async function POST(request: NextRequest) {
  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    request.headers.get("x-real-ip") ??
    "unknown";

  if (!checkRateLimit(ip)) {
    return NextResponse.json(
      { error: "Too many requests. Please wait before submitting again." },
      { status: 429 }
    );
  }

  const body = await request.json().catch(() => null);
  if (!body) {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const parsed = enquirySubmitSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 422 });
  }

  const enquiry = await db.enquiry.create({
    data: {
      name: parsed.data.name,
      email: parsed.data.email,
      phone: parsed.data.phone ?? null,
      course: parsed.data.course ?? null,
      relatedDepartment: parsed.data.relatedDepartment ?? null,
      message: parsed.data.message ?? null,
      status: "new",
    },
  });

  return NextResponse.json(
    { message: "Enquiry submitted successfully. We will contact you soon.", id: enquiry.id },
    { status: 201 }
  );
}
