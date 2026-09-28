import { db } from "@/lib/db";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";

interface Props {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const item = await db.news.findUnique({ where: { id } });
  return {
    title: item?.title ?? "News | SSPC",
    description: item?.seoDesc ?? "Latest news and updates from Sri Sowdambika Polytechnic College.",
  };
}

export default async function NewsDetailPage({ params }: Props) {
  const { id } = await params;

  const item = await db.news.findUnique({
    where: { id },
    include: {
      department: { select: { name: true } },
      coverMedia: { select: { url: true, altText: true } },
    },
  });

  if (!item || item.status !== "published") notFound();

  return (
    <>
      <Navbar />
      <main style={{ minHeight: "100vh" }}>
        {/* Header */}
        <div style={{ background: "var(--brand-primary)", color: "#fff", padding: "80px 24px 60px" }}>
          <div className="container-site" style={{ maxWidth: 860 }}>
            <Link href="/news" style={{ display: "inline-flex", alignItems: "center", gap: 8, color: "var(--brand-accent)", fontSize: "0.9rem", fontWeight: 600, marginBottom: 24, textDecoration: "none" }}>
              ← Back to News
            </Link>
            <div style={{ display: "flex", gap: 12, marginBottom: 20, flexWrap: "wrap" }}>
              <span style={{ background: "rgba(255,255,255,0.12)", color: "#fff", padding: "4px 14px", borderRadius: 100, fontSize: "0.78rem", fontWeight: 700, letterSpacing: "0.06em", textTransform: "uppercase" }}>
                {item.category}
              </span>
              {item.department && (
                <span style={{ background: "rgba(201,168,76,0.2)", color: "var(--brand-accent)", padding: "4px 14px", borderRadius: 100, fontSize: "0.78rem", fontWeight: 600 }}>
                  {item.department.name}
                </span>
              )}
            </div>
            <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(1.8rem, 4vw, 2.8rem)", fontWeight: 800, lineHeight: 1.15, marginBottom: 20 }}>
              {item.title}
            </h1>
            <div style={{ color: "rgba(255,255,255,0.6)", fontSize: "0.9rem" }}>
              {item.publishDate
                ? new Date(item.publishDate).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })
                : new Date(item.createdAt).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })}
            </div>
          </div>
        </div>

        {/* Cover image */}
        {item.coverMedia?.url && (
          <div style={{ background: "var(--bg-offset)", borderBottom: "1px solid var(--border-subtle)" }}>
            <div className="container-site" style={{ maxWidth: 860, padding: "0" }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={item.coverMedia.url}
                alt={item.coverMedia.altText ?? item.title}
                style={{ width: "100%", maxHeight: 480, objectFit: "cover", display: "block" }}
              />
            </div>
          </div>
        )}

        {/* Body */}
        <div className="container-site" style={{ maxWidth: 860, padding: "60px 32px" }}>
          {item.bodyHtml ? (
            <div
              className="news-body"
              style={{ fontSize: "1.05rem", lineHeight: 1.85, color: "var(--text-secondary)" }}
              dangerouslySetInnerHTML={{ __html: item.bodyHtml }}
            />
          ) : (
            <p style={{ color: "var(--text-muted)", fontStyle: "italic" }}>No content available for this article.</p>
          )}

          <div style={{ marginTop: 60, paddingTop: 32, borderTop: "1px solid var(--border-subtle)" }}>
            <Link href="/news" className="btn-ghost">
              ← Back to all news
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
