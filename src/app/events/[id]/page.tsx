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
  const item = await db.event.findUnique({ where: { id } });
  return {
    title: item?.title ?? "Event | SSPC",
    description: item?.seoDesc ?? "Event details from Sri Sowdambika Polytechnic College.",
  };
}

export default async function EventDetailPage({ params }: Props) {
  const { id } = await params;

  const item = await db.event.findUnique({
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
        <div style={{ background: "var(--brand-primary)", color: "#fff", padding: "80px 24px 60px" }}>
          <div className="container-site" style={{ maxWidth: 860 }}>
            <Link href="/events" style={{ display: "inline-flex", alignItems: "center", gap: 8, color: "var(--brand-accent)", fontSize: "0.9rem", fontWeight: 600, marginBottom: 24 }}>
              ← Back to Events
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
            <div style={{ display: "flex", gap: 24, color: "rgba(255,255,255,0.7)", fontSize: "0.9rem", flexWrap: "wrap" }}>
              {item.eventDate && (
                <span>📅 {new Date(item.eventDate).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })}</span>
              )}
              {item.location && <span>📍 {item.location}</span>}
            </div>
          </div>
        </div>

        {item.coverMedia?.url && (
          <div style={{ background: "var(--bg-offset)" }}>
            <div className="container-site" style={{ maxWidth: 860, padding: 0 }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={item.coverMedia.url} alt={item.coverMedia.altText ?? item.title} style={{ width: "100%", maxHeight: 480, objectFit: "cover", display: "block" }} />
            </div>
          </div>
        )}

        <div className="container-site" style={{ maxWidth: 860, padding: "60px 32px" }}>
          {item.description ? (
            <div style={{ fontSize: "1.05rem", lineHeight: 1.85, color: "var(--text-secondary)" }}>
              {item.description}
            </div>
          ) : (
            <p style={{ color: "var(--text-muted)", fontStyle: "italic" }}>No details available for this event.</p>
          )}
          <div style={{ marginTop: 60, paddingTop: 32, borderTop: "1px solid var(--border-subtle)" }}>
            <Link href="/events" className="btn-ghost">← Back to all events</Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
