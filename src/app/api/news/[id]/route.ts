import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { auth } from "@/lib/auth";

interface Params {
  params: Promise<{ id: string }>;
}

export async function GET(_req: NextRequest, { params }: Params) {
  const { id } = await params;
  try {
    const item = await db.news.findUnique({
      where: { id },
      include: {
        department: { select: { name: true, slug: true } },
        coverMedia: { select: { url: true, altText: true } },
      },
    });
    if (!item) return NextResponse.json({ error: "Not found" }, { status: 404 });
    return NextResponse.json({ item });
  } catch {
    return NextResponse.json({ error: "Failed to fetch" }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest, { params }: Params) {
  const session = await auth();
  if (!session?.user?.id) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await params;
  const body = await req.json();

  try {
    const item = await db.news.update({
      where: { id },
      data: {
        ...(body.title !== undefined && { title: body.title }),
        ...(body.category !== undefined && { category: body.category }),
        ...(body.bodyHtml !== undefined && { bodyHtml: body.bodyHtml }),
        ...(body.status !== undefined && { status: body.status }),
        ...(body.publishDate !== undefined && { publishDate: body.publishDate ? new Date(body.publishDate) : null }),
      },
    });
    return NextResponse.json({ item });
  } catch {
    return NextResponse.json({ error: "Update failed" }, { status: 500 });
  }
}

export async function DELETE(_req: NextRequest, { params }: Params) {
  const session = await auth();
  if (!session?.user?.id) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await params;
  try {
    await db.news.update({ where: { id }, data: { deleted: true } });
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Delete failed" }, { status: 500 });
  }
}
