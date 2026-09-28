/**
 * SSPC Legacy Migration ETL — Phase 7
 * ─────────────────────────────────────
 * Reads from the legacy MySQL database (sspc) and writes to the new Postgres
 * (Supabase) database via Prisma.
 *
 * Prerequisites:
 *   1. Legacy MySQL running locally (XAMPP / MariaDB with sspc.sql imported).
 *   2. New Supabase Postgres accessible via DIRECT_URL.
 *   3. New DB seeded (npm run db:seed) so roles/departments exist.
 *   4. npm install mysql2 (not included in main deps — install here only)
 *
 * Run:
 *   npx ts-node --compiler-options '{"module":"CommonJS"}' scripts/migration/migrate.ts
 *
 * The script is IDEMPOTENT: it uses upsert with legacyId so it can be re-run
 * safely after partial failures.
 */

import { PrismaClient, RoleName } from "@prisma/client";
import * as mysql from "mysql2/promise";
import bcrypt from "bcryptjs";

const newDb = new PrismaClient();

// ── Legacy DB connection ────────────────────────────────────────────────────
const legacyPool = mysql.createPool({
  host: "127.0.0.1",
  user: "root",
  password: "",
  database: "sspc",
  port: 3306,
  waitForConnections: true,
  connectionLimit: 5,
});

// ── Legacy type shapes (add more fields as needed) ──────────────────────────
interface LegacyFaculty {
  id: number;
  faculty_id: string;
  name: string;
  role: string;
  department: string;
  email: string | null;
  password: string;
  is_admin: number;
  is_active: number;
  deleted_at: string | null;
  created_at: string;
}

interface LegacyNews {
  news_id: number;
  title: string;
  description: string;
  category: string;
  related_department: string;
  news_date: string;
  is_active: number;
}

interface LegacyEvent {
  event_id: number;
  title: string;
  description: string;
  category: string;
  related_department: string;
  event_date: string;
  is_active: number;
}

interface LegacyEnquiry {
  id: number;
  name: string;
  email: string;
  phone: string;
  course: string;
  related_department: string;
  message: string;
  status: string;
  created_at: string;
  action_on: string | null;
  action_by: string | null;
}

interface LegacyFeedback {
  id: number;
  name: string;
  email: string;
  phone: string;
  feedback_type: string;
  message: string;
  created_at: string;
}

interface LegacyGrievance {
  id: number;
  name: string;
  email: string;
  phone: string;
  grievances_type: string;
  message: string;
  created_at: string;
  read_by: string | null;
  read_at: string | null;
}

interface LegacyAlumni {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  year_of_admission: number;
  year_of_passing: number;
  birth_date: string;
  course: string;
  current_status: string;
  company_name: string;
  street_address: string;
  city: string;
  state: string;
  journey: string;
  fondest_memories: string;
  created_at: string;
}

// ── Helpers ────────────────────────────────────────────────────────────────

async function legacyQuery<T>(sql: string): Promise<T[]> {
  const [rows] = await legacyPool.execute(sql);
  return rows as T[];
}

async function getDeptId(name: string): Promise<string | null> {
  const dept = await newDb.department.findFirst({
    where: { name: { contains: name, mode: "insensitive" } },
    select: { id: true },
  });
  return dept?.id ?? null;
}

async function getRoleId(name: RoleName): Promise<string> {
  const role = await newDb.role.findUniqueOrThrow({ where: { name } });
  return role.id;
}

// ── Migration steps ────────────────────────────────────────────────────────

async function migrateFaculty() {
  console.log("\n[1/6] Migrating faculty → users…");
  const rows = await legacyQuery<LegacyFaculty>("SELECT * FROM faculty");
  const adminRoleId = await getRoleId("ADMIN");
  const facultyRoleId = await getRoleId("FACULTY");

  let ok = 0, skip = 0;
  for (const row of rows) {
    const isAdmin = row.is_admin === 1;
    const roleId = isAdmin ? adminRoleId : facultyRoleId;
    const deptId = await getDeptId(row.department);

    // Faculty passwords are already bcrypt ($2y$ is compatible with $2b$)
    const passwordHash = row.password.replace(/^\$2y\$/, "$2b$");

    try {
      await newDb.user.upsert({
        where: { email: row.email ?? `legacy-${row.faculty_id}@sspc.internal` },
        update: {},
        create: {
          email: row.email ?? `legacy-${row.faculty_id}@sspc.internal`,
          name: row.name,
          passwordHash,
          roleId,
          departmentId: deptId,
          active: row.is_active === 1,
          legacyId: row.faculty_id,
          deletedAt: row.deleted_at ? new Date(row.deleted_at) : null,
          createdAt: new Date(row.created_at),
        },
      });
      ok++;
    } catch {
      console.warn(`  ! Skipped faculty ${row.faculty_id} (${row.email})`);
      skip++;
    }
  }
  console.log(`  ✓ ${ok} migrated, ${skip} skipped`);
}

async function migrateNews() {
  console.log("\n[2/6] Migrating news…");
  const rows = await legacyQuery<LegacyNews>("SELECT * FROM news");
  const publishedRoleId = await newDb.role.findFirst({ where: { name: "ADMIN" } });

  let ok = 0;
  for (const row of rows) {
    const deptId = await getDeptId(row.related_department);
    await newDb.news.upsert({
      where: { legacyId: String(row.news_id) } as never,
      update: {},
      create: {
        title: row.title ?? "Untitled",
        bodyHtml: row.description ?? null,
        category: row.category ?? "Academics",
        status: row.is_active === 1 ? "published" : "draft",
        publishDate: row.news_date ? new Date(row.news_date) : null,
        departmentId: deptId,
        deleted: false,
        legacyId: String(row.news_id),
      },
    });
    ok++;
  }
  console.log(`  ✓ ${ok} news items migrated`);
}

async function migrateEvents() {
  console.log("\n[3/6] Migrating events…");
  const rows = await legacyQuery<LegacyEvent>("SELECT * FROM events");

  let ok = 0;
  for (const row of rows) {
    const deptId = await getDeptId(row.related_department);
    await newDb.event.upsert({
      where: { legacyId: String(row.event_id) } as never,
      update: {},
      create: {
        title: row.title ?? "Untitled",
        description: row.description ?? null,
        category: row.category ?? "Academics",
        status: row.is_active === 1 ? "published" : "draft",
        eventDate: row.event_date ? new Date(row.event_date) : null,
        departmentId: deptId,
        deleted: false,
        legacyId: String(row.event_id),
      },
    });
    ok++;
  }
  console.log(`  ✓ ${ok} events migrated`);
}

async function migrateEnquiries() {
  console.log("\n[4/6] Migrating enquiries…");
  const rows = await legacyQuery<LegacyEnquiry>("SELECT * FROM enquiries");

  const statusMap: Record<string, "new" | "contacted" | "closed"> = {
    Pending: "new",
    Accepted: "contacted",
    Rejected: "closed",
  };

  let ok = 0;
  for (const row of rows) {
    await newDb.enquiry.upsert({
      where: { legacyId: String(row.id) } as never,
      update: {},
      create: {
        name: row.name,
        email: row.email,
        phone: row.phone ?? null,
        course: row.course ?? null,
        relatedDepartment: row.related_department ?? null,
        message: row.message ?? null,
        status: statusMap[row.status] ?? "new",
        actionOn: row.action_on ? new Date(row.action_on) : null,
        actionBy: row.action_by ?? null,
        legacyId: String(row.id),
        createdAt: new Date(row.created_at),
      },
    });
    ok++;
  }
  console.log(`  ✓ ${ok} enquiries migrated`);
}

async function migrateFeedbackAndGrievances() {
  console.log("\n[5/6] Migrating feedback & grievances…");

  const feedbackRows = await legacyQuery<LegacyFeedback>("SELECT * FROM feedbacks");
  for (const row of feedbackRows) {
    await newDb.feedback.upsert({
      where: { legacyId: String(row.id) } as never,
      update: {},
      create: {
        name: row.name,
        email: row.email ?? null,
        phone: row.phone ?? null,
        feedbackType: row.feedback_type ?? null,
        message: row.message ?? null,
        reviewed: false,
        legacyId: String(row.id),
        createdAt: new Date(row.created_at),
      },
    });
  }

  const grievanceRows = await legacyQuery<LegacyGrievance>("SELECT * FROM grievances");
  for (const row of grievanceRows) {
    await newDb.grievance.upsert({
      where: { legacyId: String(row.id) } as never,
      update: {},
      create: {
        name: row.name,
        email: row.email ?? null,
        phone: row.phone ?? null,
        grievanceType: row.grievances_type ?? null,
        message: row.message ?? null,
        status: row.read_by ? "reviewed" : "open",
        readBy: row.read_by ?? null,
        readAt: row.read_at ? new Date(row.read_at) : null,
        legacyId: String(row.id),
        createdAt: new Date(row.created_at),
      },
    });
  }
  console.log(`  ✓ ${feedbackRows.length} feedback + ${grievanceRows.length} grievances migrated`);
}

async function migrateAlumni() {
  console.log("\n[6/6] Migrating alumni…");
  const rows = await legacyQuery<LegacyAlumni>("SELECT * FROM alumni");

  let ok = 0;
  for (const row of rows) {
    await newDb.alumni.upsert({
      where: { legacyId: String(row.id) } as never,
      update: {},
      create: {
        firstName: row.first_name,
        lastName: row.last_name ?? null,
        email: row.email ?? null,
        phone: row.phone ?? null,
        yearOfAdmission: row.year_of_admission ?? null,
        yearOfPassing: row.year_of_passing ?? null,
        birthDate: row.birth_date ? new Date(row.birth_date) : null,
        course: row.course ?? null,
        currentStatus: row.current_status ?? null,
        companyName: row.company_name ?? null,
        address: row.street_address ?? null,
        city: row.city ?? null,
        state: row.state ?? null,
        journey: row.journey ?? null,
        fondestMemories: row.fondest_memories ?? null,
        deleted: false,
        legacyId: String(row.id),
        createdAt: new Date(row.created_at),
      },
    });
    ok++;
  }
  console.log(`  ✓ ${ok} alumni migrated`);
}

// ── Validation pass ────────────────────────────────────────────────────────

async function validate() {
  console.log("\n📊 Validation count check…");
  const [
    legacyFaculty, newUsers,
    legacyNews, newNews,
    legacyEvents, newEvents,
    legacyEnquiries, newEnquiries,
    legacyFeedback, newFeedback,
    legacyGrievance, newGrievance,
    legacyAlumni, newAlumni,
  ] = await Promise.all([
    legacyQuery("SELECT COUNT(*) as c FROM faculty"),
    newDb.user.count(),
    legacyQuery("SELECT COUNT(*) as c FROM news"),
    newDb.news.count(),
    legacyQuery("SELECT COUNT(*) as c FROM events"),
    newDb.event.count(),
    legacyQuery("SELECT COUNT(*) as c FROM enquiries"),
    newDb.enquiry.count(),
    legacyQuery("SELECT COUNT(*) as c FROM feedbacks"),
    newDb.feedback.count(),
    legacyQuery("SELECT COUNT(*) as c FROM grievances"),
    newDb.grievance.count(),
    legacyQuery("SELECT COUNT(*) as c FROM alumni"),
    newDb.alumni.count(),
  ]);

  const lf = (legacyFaculty[0] as { c: number }).c;
  const ln = (legacyNews[0] as { c: number }).c;
  const le = (legacyEvents[0] as { c: number }).c;
  const lenq = (legacyEnquiries[0] as { c: number }).c;
  const lfb = (legacyFeedback[0] as { c: number }).c;
  const lgr = (legacyGrievance[0] as { c: number }).c;
  const la = (legacyAlumni[0] as { c: number }).c;

  console.log(`  Faculty/Users:    legacy=${lf} → new=${newUsers}`);
  console.log(`  News:             legacy=${ln} → new=${newNews}`);
  console.log(`  Events:           legacy=${le} → new=${newEvents}`);
  console.log(`  Enquiries:        legacy=${lenq} → new=${newEnquiries}`);
  console.log(`  Feedback:         legacy=${lfb} → new=${newFeedback}`);
  console.log(`  Grievances:       legacy=${lgr} → new=${newGrievance}`);
  console.log(`  Alumni:           legacy=${la} → new=${newAlumni}`);
}

// ── Main ───────────────────────────────────────────────────────────────────

async function main() {
  console.log("🚀 SSPC Legacy Migration ETL starting…");
  console.log("   Source: MySQL sspc (localhost:3306)");
  console.log("   Target: Supabase Postgres (via DIRECT_URL)\n");

  try {
    await migrateFaculty();
    await migrateNews();
    await migrateEvents();
    await migrateEnquiries();
    await migrateFeedbackAndGrievances();
    await migrateAlumni();
    await validate();
    console.log("\n✅ Migration complete.");
  } finally {
    await newDb.$disconnect();
    await legacyPool.end();
  }
}

main().catch((e) => {
  console.error("❌ Migration failed:", e);
  process.exit(1);
});
