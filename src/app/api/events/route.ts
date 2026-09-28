import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { writeAuditLog } from "@/lib/audit";
import { requirePermission } from "@/lib/rbac";
import { eventCreateSchema } from "@/lib/validation/schemas";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const session = await auth();
  const isAdmin = !!session?.user?.id;

  const status = searchParams.get("status");
  const departmentId = searchParams.get("departmentId");
  const category = searchParams.get("category");
  const search = searchParams.get("search") ?? "";
  const page = Math.max(1, parseInt(searchParams.get("page") ?? "1"));
  const limit = Math.min(100, parseInt(searchParams.get("limit") ?? "20"));
  const skip = (page - 1) * limit;

  const where = {
    deleted: false,
    ...(!isAdmin ? { status: "published" as const } : {}),
    ...(status ? { status: status as "draft" | "published" } : {}),
    ...(isAdmin && session.user.role === "FACULTY" && session.user.departmentId
      ? { departmentId: session.user.departmentId }
      : {}),
    ...(departmentId ? { departmentId } : {}),
    ...(category ? { category } : {}),
    ...(search
      ? {
          OR: [
            { title: { contains: search, mode: "insensitive" as const } },
            { description: { contains: search, mode: "insensitive" as const } },
          ],
        }
      : {}),
  };

  const [items, total] = await Promise.all([
    db.event.findMany({
      where,
      include: {
        coverMedia: { select: { url: true, altText: true } },
        department: { select: { name: true, slug: true } },
      },
      orderBy: { eventDate: "asc" },
      skip,
      take: limit,
    }),
    db.event.count({ where }),
  ]);

  return NextResponse.json({ items, total, page, limit });
}

export async function POST(request: NextRequest) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    requirePermission(session.user.role, "events", "create");
  } catch {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const body = await request.json();
  const parsed = eventCreateSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 422 });
  }

  const data = parsed.data;

  if (
    session.user.role === "FACULTY" &&
    data.departmentId &&
    data.departmentId !== session.user.departmentId
  ) {
    return NextResponse.json({ error: "Forbidden: wrong department" }, { status: 403 });
  }

  const event = await db.event.create({
    data: {
      title: data.title,
      description: data.description ?? null,
      eventDate: data.eventDate ? new Date(data.eventDate) : null,
      location: data.location ?? null,
      category: data.category,
      status: data.status,
      coverMediaId: data.coverMediaId ?? null,
      departmentId: data.departmentId ?? null,
      seoTitle: data.seoTitle ?? null,
      seoDesc: data.seoDesc ?? null,
    },
  });

  await writeAuditLog({
    userId: session.user.id,
    action: "CREATE",
    entity: "events",
    entityId: event.id,
    changes: { after: event },
  });

  return NextResponse.json({ event }, { status: 201 });
}
