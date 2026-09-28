import { db } from "@/lib/db";
import { Prisma } from "@prisma/client";

interface AuditLogEntry {
  userId?: string | null;
  action: string;
  entity: string;
  entityId?: string | null;
  changes?: Record<string, unknown> | null;
}

/**
 * Write an entry to the audit_logs table.
 * Call this inside every admin API route that mutates data.
 *
 * @example
 * await writeAuditLog({
 *   userId: session.user.id,
 *   action: "UPDATE",
 *   entity: "news",
 *   entityId: newsId,
 *   changes: { before: old, after: updated },
 * });
 */
export async function writeAuditLog(entry: AuditLogEntry): Promise<void> {
  try {
    await db.auditLog.create({
      data: {
        userId: entry.userId ?? null,
        action: entry.action,
        entity: entry.entity,
        entityId: entry.entityId ?? null,
        changes: (entry.changes ?? Prisma.DbNull) as Prisma.InputJsonValue,
      },
    });
  } catch (err) {
    // Audit log failures should never block the main operation
    console.error("[AuditLog] Failed to write audit log:", err);
  }
}
