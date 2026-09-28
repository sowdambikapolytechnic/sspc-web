import { z } from "zod";

// ─── Shared primitives ────────────────────────────────────────────────────────

export const uuidSchema = z.string().uuid();
export const slugSchema = z.string().min(1).max(100).regex(/^[a-z0-9-]+$/);
export const paginationSchema = z.object({
  page: z.coerce.number().int().positive().default(1),
  limit: z.coerce.number().int().positive().max(100).default(20),
});

// ─── Auth ─────────────────────────────────────────────────────────────────────

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8).max(128),
});

// ─── News ─────────────────────────────────────────────────────────────────────

export const newsCreateSchema = z.object({
  title: z.string().min(1).max(255),
  bodyHtml: z.string().optional(),
  category: z.string().min(1).max(100).default("Academics"),
  status: z.enum(["draft", "published"]).default("draft"),
  publishDate: z.string().datetime().optional().nullable(),
  coverMediaId: uuidSchema.optional().nullable(),
  departmentId: uuidSchema.optional().nullable(),
  seoTitle: z.string().max(70).optional(),
  seoDesc: z.string().max(160).optional(),
});

export const newsUpdateSchema = newsCreateSchema.partial();

// ─── Events ───────────────────────────────────────────────────────────────────

export const eventCreateSchema = z.object({
  title: z.string().min(1).max(255),
  description: z.string().optional(),
  eventDate: z.string().datetime().optional().nullable(),
  location: z.string().max(255).optional(),
  category: z.string().min(1).max(100).default("Academics"),
  status: z.enum(["draft", "published"]).default("draft"),
  coverMediaId: uuidSchema.optional().nullable(),
  departmentId: uuidSchema.optional().nullable(),
  seoTitle: z.string().max(70).optional(),
  seoDesc: z.string().max(160).optional(),
});

export const eventUpdateSchema = eventCreateSchema.partial();

// ─── Gallery ──────────────────────────────────────────────────────────────────

export const galleryAlbumSchema = z.object({
  title: z.string().min(1).max(255),
  category: z.string().max(100).optional(),
  departmentId: uuidSchema.optional().nullable(),
  sortOrder: z.number().int().default(0),
});

export const galleryItemSchema = z.object({
  albumId: uuidSchema,
  mediaId: uuidSchema,
  caption: z.string().max(500).optional(),
  sortOrder: z.number().int().default(0),
});

// ─── Media ────────────────────────────────────────────────────────────────────

export const mediaUpdateSchema = z.object({
  altText: z.string().max(255).optional(),
  tags: z.array(z.string()).optional(),
});

// ─── Enquiries (public form) ──────────────────────────────────────────────────

export const enquirySubmitSchema = z.object({
  name: z.string().min(1).max(200),
  email: z.string().email().max(200),
  phone: z.string().max(40).optional(),
  course: z.string().max(255).optional(),
  relatedDepartment: z.string().max(100).optional(),
  message: z.string().max(2000).optional(),
});

export const enquiryStatusSchema = z.object({
  status: z.enum(["new", "contacted", "closed"]),
});

// ─── Grievances (public form) ─────────────────────────────────────────────────

export const grievanceSubmitSchema = z.object({
  name: z.string().min(1).max(200),
  email: z.string().email().max(200).optional(),
  phone: z.string().max(40).optional(),
  grievanceType: z.enum(["Academic", "Administrative", "Infrastructure", "Other"]),
  message: z.string().min(1).max(2000),
});

// ─── Feedback (public form) ───────────────────────────────────────────────────

export const feedbackSubmitSchema = z.object({
  name: z.string().min(1).max(200),
  email: z.string().email().max(200).optional(),
  phone: z.string().max(40).optional(),
  feedbackType: z.enum(["Infrastructure", "Administrative", "Teaching Quality", "Facilities", "Other"]),
  message: z.string().min(1).max(2000),
});

// ─── Users ────────────────────────────────────────────────────────────────────

export const userCreateSchema = z.object({
  name: z.string().min(1).max(150),
  email: z.string().email().max(200),
  password: z.string().min(8).max(128),
  roleId: uuidSchema,
  departmentId: uuidSchema.optional().nullable(),
});

export const userUpdateSchema = userCreateSchema.omit({ password: true }).partial().extend({
  active: z.boolean().optional(),
});

// ─── Departments ──────────────────────────────────────────────────────────────

export const departmentSchema = z.object({
  name: z.string().min(1).max(200),
  slug: slugSchema,
  description: z.string().optional(),
  hodName: z.string().max(150).optional(),
  contactInfo: z.string().optional(),
  seoTitle: z.string().max(70).optional(),
  seoDesc: z.string().max(160).optional(),
});

// ─── Management ───────────────────────────────────────────────────────────────

export const managementMemberSchema = z.object({
  name: z.string().min(1).max(150),
  designation: z.string().min(1).max(150),
  description: z.string().optional(),
  photoMediaId: uuidSchema.optional().nullable(),
  sortOrder: z.number().int().default(0),
});

// ─── Alumni ───────────────────────────────────────────────────────────────────

export const alumniCreateSchema = z.object({
  firstName: z.string().min(1).max(100),
  lastName: z.string().max(100).optional(),
  email: z.string().email().optional(),
  phone: z.string().max(20).optional(),
  yearOfAdmission: z.number().int().optional(),
  yearOfPassing: z.number().int().optional(),
  course: z.string().max(150).optional(),
  currentStatus: z.string().max(255).optional(),
  companyName: z.string().max(255).optional(),
  address: z.string().optional(),
  city: z.string().max(100).optional(),
  state: z.string().max(100).optional(),
  journey: z.string().optional(),
  fondestMemories: z.string().optional(),
  photoMediaId: uuidSchema.optional().nullable(),
});

// ─── Documents ────────────────────────────────────────────────────────────────

export const documentSchema = z.object({
  title: z.string().min(1).max(255),
  category: z.enum(["AICTE", "mandatory_disclosure", "placement", "other"]),
  year: z.number().int().optional().nullable(),
  mediaId: uuidSchema,
});
