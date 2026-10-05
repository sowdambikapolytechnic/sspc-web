"use server";

import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";

export async function submitAlumniForm(formData: FormData) {
  const firstName = formData.get("name") as string;
  const course = formData.get("course") as string;
  const yearOfPassing = parseInt(formData.get("batch") as string);
  const currentStatus = formData.get("currentStatus") as string;
  const email = formData.get("email") as string;
  const phone = formData.get("phone") as string;
  const address = formData.get("address") as string;

  if (!firstName || !course || !yearOfPassing || !currentStatus || !address || (!email && !phone)) {
    throw new Error("Please fill out all required fields.");
  }

  await db.alumni.create({
    data: {
      firstName,
      course,
      yearOfPassing,
      currentStatus,
      email,
      phone,
      address,
    }
  });

  revalidatePath("/admin/alumni");
}
