"use server";

import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";

// News Actions
export async function createNews(formData: FormData) {
  const session = await auth();
  if (!session || session.user.role !== "SUPER_ADMIN" && session.user.role !== "ADMIN") {
    throw new Error("Unauthorized");
  }

  const title = formData.get("title") as string;
  const category = formData.get("category") as string;
  const content = formData.get("content") as string;
  const isPublished = formData.get("isPublished") === "on";

  await db.news.create({
    data: {
      title,
      category,
      bodyHtml: content,
      status: isPublished ? "published" : "draft",
      publishDate: new Date(),
    },
  });

  revalidatePath("/admin/news");
  revalidatePath("/news");
  redirect("/admin/news");
}

export async function deleteNews(id: string) {
  const session = await auth();
  if (!session || session.user.role !== "SUPER_ADMIN" && session.user.role !== "ADMIN") {
    throw new Error("Unauthorized");
  }

  await db.news.delete({ where: { id } });
  revalidatePath("/admin/news");
  revalidatePath("/news");
}

// Event Actions
export async function createEvent(formData: FormData) {
  const session = await auth();
  if (!session || session.user.role !== "SUPER_ADMIN" && session.user.role !== "ADMIN") {
    throw new Error("Unauthorized");
  }

  const title = formData.get("title") as string;
  const category = formData.get("category") as string;
  const content = formData.get("content") as string;
  const location = formData.get("location") as string;
  const isPublished = formData.get("isPublished") === "on";
  
  const startDateStr = formData.get("startDate") as string;
  const endDateStr = formData.get("endDate") as string;

  await db.event.create({
    data: {
      title,
      category,
      description: content,
      location,
      eventDate: new Date(startDateStr),
      status: isPublished ? "published" : "draft",
    },
  });

  revalidatePath("/admin/events");
  revalidatePath("/events");
  redirect("/admin/events");
}

export async function deleteEvent(id: string) {
  const session = await auth();
  if (!session || session.user.role !== "SUPER_ADMIN" && session.user.role !== "ADMIN") {
    throw new Error("Unauthorized");
  }

  await db.event.delete({ where: { id } });
  revalidatePath("/admin/events");
  revalidatePath("/events");
}
