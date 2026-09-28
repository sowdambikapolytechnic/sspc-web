import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { createServiceClient, STORAGE_BUCKET } from "@/lib/supabase";
import { db } from "@/lib/db";
import { writeAuditLog } from "@/lib/audit";
import { requirePermission } from "@/lib/rbac";
import { MediaType } from "@prisma/client";
import { randomUUID } from "crypto";

const MAX_FILE_SIZE = 50 * 1024 * 1024; // 50 MB

const ALLOWED_TYPES: Record<string, MediaType> = {
  "image/jpeg": "image",
  "image/png": "image",
  "image/webp": "image",
  "image/gif": "image",
  "video/mp4": "video",
  "application/pdf": "document",
};

function getStorageFolder(type: MediaType): string {
  switch (type) {
    case "image": return "images";
    case "video": return "videos";
    case "document": return "documents";
  }
}

export async function POST(request: NextRequest) {
  // ── Auth ─────────────────────────────────────────────────────────────────────
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    requirePermission(session.user.role, "media", "create");
  } catch {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  // ── Parse form data ───────────────────────────────────────────────────────────
  const formData = await request.formData();
  const file = formData.get("file") as File | null;
  const altText = formData.get("altText") as string | undefined;
  const tagsRaw = formData.get("tags") as string | undefined;
  const tags = tagsRaw ? tagsRaw.split(",").map((t) => t.trim()).filter(Boolean) : [];

  if (!file) {
    return NextResponse.json({ error: "No file provided" }, { status: 400 });
  }

  // ── Validate ──────────────────────────────────────────────────────────────────
  if (file.size > MAX_FILE_SIZE) {
    return NextResponse.json({ error: "File too large (max 50 MB)" }, { status: 400 });
  }

  const mediaType = ALLOWED_TYPES[file.type];
  if (!mediaType) {
    return NextResponse.json(
      { error: `Unsupported file type: ${file.type}. Allowed: jpeg, png, webp, gif, mp4, pdf` },
      { status: 400 }
    );
  }

  // ── Upload to Supabase Storage ────────────────────────────────────────────────
  const ext = file.name.split(".").pop() ?? "bin";
  const uid = randomUUID();
  const folder = getStorageFolder(mediaType);
  const storagePath = `${folder}/${uid}.${ext}`;

  const supabaseAdmin = createServiceClient();
  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);

  const { error: uploadError } = await supabaseAdmin.storage
    .from(STORAGE_BUCKET)
    .upload(storagePath, buffer, {
      contentType: file.type,
      upsert: false,
    });

  if (uploadError) {
    console.error("[Media Upload] Supabase upload error:", uploadError);
    return NextResponse.json({ error: "Upload failed" }, { status: 500 });
  }

  // ── Get public URL ────────────────────────────────────────────────────────────
  const { data: urlData } = supabaseAdmin.storage
    .from(STORAGE_BUCKET)
    .getPublicUrl(storagePath);

  // ── Write media row ───────────────────────────────────────────────────────────
  const media = await db.media.create({
    data: {
      type: mediaType,
      storagePath,
      url: urlData.publicUrl,
      filename: file.name,
      altText: altText ?? null,
      sizeBytes: file.size,
      mimeType: file.type,
      tags,
      uploadedById: session.user.id,
    },
  });

  await writeAuditLog({
    userId: session.user.id,
    action: "CREATE",
    entity: "media",
    entityId: media.id,
    changes: { after: { filename: media.filename, type: media.type, storagePath } },
  });

  return NextResponse.json({ media }, { status: 201 });
}

export async function GET(request: NextRequest) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const type = searchParams.get("type") as MediaType | null;
  const search = searchParams.get("search") ?? "";
  const page = Math.max(1, parseInt(searchParams.get("page") ?? "1"));
  const limit = Math.min(100, parseInt(searchParams.get("limit") ?? "20"));
  const skip = (page - 1) * limit;

  const where = {
    ...(type ? { type } : {}),
    ...(search
      ? {
          OR: [
            { filename: { contains: search, mode: "insensitive" as const } },
            { altText: { contains: search, mode: "insensitive" as const } },
            { tags: { has: search } },
          ],
        }
      : {}),
  };

  const [items, total] = await Promise.all([
    db.media.findMany({
      where,
      orderBy: { createdAt: "desc" },
      skip,
      take: limit,
    }),
    db.media.count({ where }),
  ]);

  return NextResponse.json({ items, total, page, limit });
}
