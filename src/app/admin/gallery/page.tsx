import { db } from "@/lib/db";
import type { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = { title: "Gallery | SSPC Admin" };

export default async function AdminGalleryPage() {
  let albums: any[] = [];
  let items: any[] = [];
  try {
    albums = await db.galleryAlbum.findMany({
      orderBy: { createdAt: "desc" },
      include: { _count: { select: { items: true } } },
    });
    items = await db.galleryItem.findMany({
      take: 24,
      orderBy: { sortOrder: "asc" },
      include: {
        media: { select: { url: true, altText: true } },
        album: { select: { title: true } },
      },
    });
  } catch {
    albums = [];
    items = [];
  }

  return (
    <div>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 32, flexWrap: "wrap", gap: 16 }}>
        <div>
          <h1 style={{ fontFamily: "Playfair Display", fontSize: "2rem", fontWeight: 700, color: "var(--brand-primary)", marginBottom: 8 }}>
            Gallery
          </h1>
          <p style={{ color: "var(--text-secondary)" }}>Manage photo albums and images.</p>
        </div>
        <a href="/admin/gallery/upload" className="btn-primary">+ Upload Images</a>
      </div>

      {/* Albums */}
      {albums.length > 0 && (
        <div style={{ marginBottom: 40 }}>
          <h2 style={{ fontSize: "1.1rem", fontWeight: 700, color: "var(--brand-primary)", marginBottom: 16 }}>Albums</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: 16 }}>
            {albums.map((album) => (
              <div key={album.id} style={{ background: "#fff", border: "1px solid var(--border-subtle)", borderRadius: "var(--radius-md)", padding: 20 }}>
                <div style={{ fontWeight: 700, color: "var(--text-primary)", marginBottom: 4 }}>{album.title}</div>
                <div style={{ fontSize: "0.85rem", color: "var(--text-muted)" }}>{album._count.items} images</div>
                {album.category && <div style={{ fontSize: "0.78rem", color: "var(--brand-secondary)", marginTop: 8, fontWeight: 600 }}>{album.category}</div>}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Recent images */}
      <div>
        <h2 style={{ fontSize: "1.1rem", fontWeight: 700, color: "var(--brand-primary)", marginBottom: 16 }}>
          Recent Images {items.length > 0 && <span style={{ fontWeight: 400, color: "var(--text-muted)", fontSize: "0.9rem" }}>({items.length} shown)</span>}
        </h2>

        {items.length === 0 ? (
          <div style={{ background: "#fff", border: "1px solid var(--border-subtle)", borderRadius: "var(--radius-md)", padding: 60, textAlign: "center", color: "var(--text-muted)" }}>
            <svg width="48" height="48" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" style={{ margin: "0 auto 16px", display: "block" }}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
            </svg>
            <p style={{ fontWeight: 600, marginBottom: 4 }}>No images uploaded yet</p>
            <p style={{ fontSize: "0.9rem" }}>Upload images to populate the gallery.</p>
          </div>
        ) : (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))", gap: 12 }}>
            {items.map((item) => (
              <div key={item.id} style={{ position: "relative", borderRadius: "var(--radius-md)", overflow: "hidden", aspectRatio: "1", background: "var(--bg-offset)", border: "1px solid var(--border-subtle)" }}>
                {item.media?.url ? (
                  <Image src={item.media.url} alt={item.media.altText || "Gallery image"} fill style={{ objectFit: "cover" }} />
                ) : (
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "100%", color: "var(--text-muted)", fontSize: "0.85rem" }}>No image</div>
                )}
                <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: "8px 10px", background: "linear-gradient(transparent, rgba(0,0,0,0.7))", fontSize: "0.72rem", color: "#fff", fontWeight: 600, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                  {item.album?.title}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
