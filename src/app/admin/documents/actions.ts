"use server";

import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";

export async function deleteDocument(id: string) {
  await db.document.delete({ where: { id } });
  revalidatePath("/admin/documents");
  revalidatePath("/documents");
}

export async function createDocument(mediaId: string, title: string, category: string, yearStr: string) {
  let year = parseInt(yearStr);
  if (isNaN(year)) year = new Date().getFullYear();

  await db.document.create({
    data: {
      title,
      category,
      year,
      mediaId
    }
  });

  revalidatePath("/admin/documents");
  revalidatePath("/documents");
}
