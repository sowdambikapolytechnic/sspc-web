import { RoleName } from "@prisma/client";

// ─── Permission definitions ────────────────────────────────────────────────────

export type Resource =
  | "home"
  | "departments"
  | "admissions"
  | "news"
  | "events"
  | "gallery"
  | "media"
  | "placements"
  | "management"
  | "alumni"
  | "enquiries"
  | "feedback"
  | "grievances"
  | "documents"
  | "institutional_sections"
  | "users"
  | "settings"
  | "audit_logs";

export type Action = "read" | "create" | "update" | "delete" | "restore";

type PermissionMatrix = Record<RoleName, Record<Resource, Action[]>>;

const ALL_ACTIONS: Action[] = ["read", "create", "update", "delete", "restore"];
const READ_ONLY: Action[] = ["read"];
const CONTENT_ACTIONS: Action[] = ["read", "create", "update", "delete", "restore"];

const PERMISSIONS: PermissionMatrix = {
  SUPER_ADMIN: {
    home: ALL_ACTIONS,
    departments: ALL_ACTIONS,
    admissions: ALL_ACTIONS,
    news: ALL_ACTIONS,
    events: ALL_ACTIONS,
    gallery: ALL_ACTIONS,
    media: ALL_ACTIONS,
    placements: ALL_ACTIONS,
    management: ALL_ACTIONS,
    alumni: ALL_ACTIONS,
    enquiries: ALL_ACTIONS,
    feedback: ALL_ACTIONS,
    grievances: ALL_ACTIONS,
    documents: ALL_ACTIONS,
    institutional_sections: ALL_ACTIONS,
    users: ALL_ACTIONS,
    settings: ALL_ACTIONS,
    audit_logs: READ_ONLY,
  },
  ADMIN: {
    home: CONTENT_ACTIONS,
    departments: CONTENT_ACTIONS,
    admissions: CONTENT_ACTIONS,
    news: CONTENT_ACTIONS,
    events: CONTENT_ACTIONS,
    gallery: CONTENT_ACTIONS,
    media: CONTENT_ACTIONS,
    placements: CONTENT_ACTIONS,
    management: CONTENT_ACTIONS,
    alumni: CONTENT_ACTIONS,
    enquiries: CONTENT_ACTIONS,
    feedback: CONTENT_ACTIONS,
    grievances: CONTENT_ACTIONS,
    documents: CONTENT_ACTIONS,
    institutional_sections: CONTENT_ACTIONS,
    users: [],          // Cannot manage users
    settings: [],       // Cannot access global settings
    audit_logs: READ_ONLY,
  },
  FACULTY: {
    home: READ_ONLY,
    departments: ["read", "update"], // own dept only — enforced in query layer
    admissions: READ_ONLY,
    news: CONTENT_ACTIONS,           // own dept only
    events: CONTENT_ACTIONS,         // own dept only
    gallery: CONTENT_ACTIONS,        // own dept only
    media: ["read", "create"],
    placements: READ_ONLY,
    management: READ_ONLY,
    alumni: READ_ONLY,
    enquiries: READ_ONLY,            // own dept only
    feedback: READ_ONLY,
    grievances: READ_ONLY,
    documents: READ_ONLY,
    institutional_sections: READ_ONLY,
    users: [],
    settings: [],
    audit_logs: [],
  },
};

// ─── Checker ──────────────────────────────────────────────────────────────────

export function can(
  role: RoleName,
  resource: Resource,
  action: Action
): boolean {
  return PERMISSIONS[role]?.[resource]?.includes(action) ?? false;
}

/**
 * Throws a 403-style error if the role does not have permission.
 * Use in API route handlers after verifying the session.
 */
export function requirePermission(
  role: RoleName,
  resource: Resource,
  action: Action
): void {
  if (!can(role, resource, action)) {
    throw new Error(
      `Forbidden: ${role} cannot ${action} on ${resource}`
    );
  }
}
