import { db } from "@/lib/db";

export default async function AdminDashboard() {
  const newsCount = await db.news.count();
  const eventsCount = await db.event.count();
  const galleryCount = await db.galleryItem.count();

  return (
    <div>
      <h1 style={{ fontFamily: "Playfair Display", fontSize: "2rem", fontWeight: 700, marginBottom: 8, color: "var(--brand-primary)" }}>Dashboard</h1>
      <p style={{ color: "var(--text-secondary)", marginBottom: 32 }}>Welcome to the SSPC Admin Panel. Here you can manage all dynamic content on the website.</p>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 24, marginBottom: 40 }}>
        
        <div style={{ background: "#fff", padding: 24, borderRadius: "var(--radius-md)", border: "1px solid var(--border-subtle)", boxShadow: "var(--shadow-sm)" }}>
          <div style={{ color: "var(--text-muted)", fontSize: "0.9rem", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: 8 }}>Total News Items</div>
          <div style={{ fontSize: "2.5rem", fontWeight: 700, color: "var(--brand-primary)", fontFamily: "Playfair Display" }}>{newsCount}</div>
        </div>

        <div style={{ background: "#fff", padding: 24, borderRadius: "var(--radius-md)", border: "1px solid var(--border-subtle)", boxShadow: "var(--shadow-sm)" }}>
          <div style={{ color: "var(--text-muted)", fontSize: "0.9rem", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: 8 }}>Upcoming Events</div>
          <div style={{ fontSize: "2.5rem", fontWeight: 700, color: "var(--brand-primary)", fontFamily: "Playfair Display" }}>{eventsCount}</div>
        </div>

        <div style={{ background: "#fff", padding: 24, borderRadius: "var(--radius-md)", border: "1px solid var(--border-subtle)", boxShadow: "var(--shadow-sm)" }}>
          <div style={{ color: "var(--text-muted)", fontSize: "0.9rem", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: 8 }}>Gallery Images</div>
          <div style={{ fontSize: "2.5rem", fontWeight: 700, color: "var(--brand-primary)", fontFamily: "Playfair Display" }}>{galleryCount}</div>
        </div>

      </div>

      <div style={{ background: "#fff", padding: 32, borderRadius: "var(--radius-md)", border: "1px solid var(--border-subtle)", boxShadow: "var(--shadow-sm)" }}>
        <h2 style={{ fontSize: "1.2rem", fontWeight: 700, marginBottom: 16 }}>Quick Actions</h2>
        <div style={{ display: "flex", gap: 16 }}>
          <a href="/admin/news/new" className="btn-primary">Post News</a>
          <a href="/admin/events/new" className="btn-ghost">Schedule Event</a>
          <a href="/admin/gallery/upload" className="btn-ghost">Upload Images</a>
        </div>
      </div>
    </div>
  );
}
