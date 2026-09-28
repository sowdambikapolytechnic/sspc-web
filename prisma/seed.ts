/**
 * Prisma seed script — creates the three built-in roles and seeds the
 * departments matching the legacy database.
 *
 * Run with:  npx prisma db seed
 *
 * Requires DATABASE_URL / DIRECT_URL to be set in .env.local (pointing at
 * your Supabase project's direct connection string, port 5432).
 */

import { PrismaClient, RoleName } from "@prisma/client";
import * as bcrypt from "bcryptjs";

const db = new PrismaClient();

async function main() {
  console.log("🌱 Seeding database…");

  // ── Roles ──────────────────────────────────────────────────────────────────
  const roles = [];
  for (const name of ["SUPER_ADMIN", "ADMIN", "FACULTY"] as RoleName[]) {
    const role = await db.role.upsert({
      where: { name },
      update: {},
      create: { name },
    });
    roles.push(role);
  }
  const roleMap = Object.fromEntries(roles.map((r) => [r.name, r]));
  console.log("  ✓ Roles created:", roles.map((r) => r.name).join(", "));

  // ── Departments ────────────────────────────────────────────────────────────
  const departments = [
    { name: "Civil Engineering",               slug: "civil-engineering" },
    { name: "Electrical and Electronics",       slug: "electrical-electronics" },
    { name: "Electronics Communication",        slug: "electronics-communication" },
    { name: "Information Technology",           slug: "information-technology" },
    { name: "Mechanical Engineering",           slug: "mechanical-engineering" },
    { name: "Textile Technology",               slug: "textile-technology" },
    { name: "Management",                       slug: "management" },
    { name: "Refrigeration and Air Conditioning", slug: "refrigeration-air-conditioning" },
  ];

  const createdDepts = [];
  for (const d of departments) {
    const dept = await db.department.upsert({
      where: { slug: d.slug },
      update: { name: d.name },
      create: { name: d.name, slug: d.slug },
    });
    createdDepts.push(dept);
  }
  console.log("  ✓ Departments created:", createdDepts.length);

  // ── Initial SUPER_ADMIN user ───────────────────────────────────────────────
  // Password is seeded as a placeholder — change immediately after first login.
  const existingAdmin = await db.user.findUnique({
    where: { email: "admin@sowdambikapolytechnic.com" },
  });

  if (!existingAdmin) {
    const passwordHash = await bcrypt.hash("ChangeMe@123", 12);
    await db.user.create({
      data: {
        email: "admin@sowdambikapolytechnic.com",
        name: "Super Admin",
        passwordHash,
        roleId: roleMap["SUPER_ADMIN"].id,
        active: true,
      },
    });
    console.log("  ✓ SUPER_ADMIN user created: admin@sowdambikapolytechnic.com / ChangeMe@123");
    console.log("  ⚠️  Change this password immediately after first login!");
  } else {
    console.log("  ℹ  SUPER_ADMIN user already exists — skipped.");
  }

  // ── Institutional sections (NCC/NSS/RRC/CIICP/Transportation) ─────────────
  const sectionTypes = ["NCC", "NSS", "RRC", "CIICP", "Transportation"] as const;
  for (const type of sectionTypes) {
    await db.institutionalSection.upsert({
      where: { type },
      update: {},
      create: { type, title: type, description: "" },
    });
  }
  console.log("  ✓ Institutional sections seeded:", sectionTypes.join(", "));

  console.log("🌱 Seed complete.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => db.$disconnect());
