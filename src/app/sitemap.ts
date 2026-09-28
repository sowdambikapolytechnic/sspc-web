import { MetadataRoute } from "next";
import { db } from "@/lib/db";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXTAUTH_URL ?? "https://www.sowdambikapolytechnic.com";

  // Static public routes
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: baseUrl, lastModified: new Date(), changeFrequency: "weekly", priority: 1 },
    { url: `${baseUrl}/departments`, changeFrequency: "monthly", priority: 0.9 },
    { url: `${baseUrl}/admissions`, changeFrequency: "monthly", priority: 0.9 },
    { url: `${baseUrl}/news`, changeFrequency: "daily", priority: 0.8 },
    { url: `${baseUrl}/events`, changeFrequency: "daily", priority: 0.8 },
    { url: `${baseUrl}/gallery`, changeFrequency: "weekly", priority: 0.7 },
    { url: `${baseUrl}/placements`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${baseUrl}/management`, changeFrequency: "monthly", priority: 0.7 },
    { url: `${baseUrl}/alumni`, changeFrequency: "monthly", priority: 0.6 },
    { url: `${baseUrl}/ncc`, changeFrequency: "monthly", priority: 0.6 },
    { url: `${baseUrl}/nss`, changeFrequency: "monthly", priority: 0.6 },
    { url: `${baseUrl}/rrc`, changeFrequency: "monthly", priority: 0.6 },
    { url: `${baseUrl}/ciicp`, changeFrequency: "monthly", priority: 0.6 },
    { url: `${baseUrl}/transportation`, changeFrequency: "monthly", priority: 0.5 },
    { url: `${baseUrl}/documents`, changeFrequency: "yearly", priority: 0.5 },
    { url: `${baseUrl}/feedback`, changeFrequency: "yearly", priority: 0.4 },
    { url: `${baseUrl}/grievance`, changeFrequency: "yearly", priority: 0.4 },
    { url: `${baseUrl}/admissions/enquiry`, changeFrequency: "yearly", priority: 0.7 },
  ];

  // Dynamic department pages
  const departments = await db.department.findMany({
    select: { slug: true, updatedAt: true },
  }).catch(() => []);

  const deptRoutes: MetadataRoute.Sitemap = departments.map((d) => ({
    url: `${baseUrl}/departments/${d.slug}`,
    lastModified: d.updatedAt,
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  // Dynamic news pages
  const newsItems = await db.news.findMany({
    where: { status: "published", deleted: false },
    select: { id: true, updatedAt: true },
  }).catch(() => []);

  const newsRoutes: MetadataRoute.Sitemap = newsItems.map((n) => ({
    url: `${baseUrl}/news/${n.id}`,
    lastModified: n.updatedAt,
    changeFrequency: "yearly",
    priority: 0.6,
  }));

  // Dynamic event pages
  const events = await db.event.findMany({
    where: { status: "published", deleted: false },
    select: { id: true, updatedAt: true },
  }).catch(() => []);

  const eventRoutes: MetadataRoute.Sitemap = events.map((e) => ({
    url: `${baseUrl}/events/${e.id}`,
    lastModified: e.updatedAt,
    changeFrequency: "yearly",
    priority: 0.6,
  }));

  return [...staticRoutes, ...deptRoutes, ...newsRoutes, ...eventRoutes];
}
