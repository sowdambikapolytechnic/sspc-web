import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { auth } from "@/lib/auth";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const limit = Math.min(100, parseInt(searchParams.get("limit") ?? "20"));
  const category = searchParams.get("category");
  const search = searchParams.get("search") ?? "";

  try {
    const where: any = { status: "published", deleted: false };
    if (category) where.category = category;
    if (search) where.OR = [
      { title: { contains: search, mode: "insensitive" } },
      { category: { contains: search, mode: "insensitive" } },
    ];

    const items = await db.news.findMany({
      where,
      include: {
        coverMedia: { select: { url: true, altText: true } },
        department: { select: { name: true, slug: true } },
      },
      orderBy: { publishDate: "desc" },
      take: limit,
    });

    return NextResponse.json({ items, total: items.length, page: 1, limit });
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch news" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  const session = await auth();
  if (!session?.user?.id) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await request.json();
  if (!body.title) return NextResponse.json({ error: "Title is required" }, { status: 422 });

  try {
    const item = await db.news.create({
      data: {
        title: body.title,
        category: body.category || "Academics",
        bodyHtml: body.bodyHtml ?? null,
        status: body.status || "draft",
        publishDate: body.publishDate ? new Date(body.publishDate) : body.status === "published" ? new Date() : null,
        departmentId: body.departmentId ?? null,
        coverMediaId: body.coverMediaId ?? null,
        seoTitle: body.seoTitle ?? null,
        seoDesc: body.seoDesc ?? null,
      },
    });
    return NextResponse.json({ item }, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to create news item" }, { status: 500 });
  }
}
