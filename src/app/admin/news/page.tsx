import { db } from "@/lib/db";
import Link from "next/link";
import { Plus, Edit2 } from "lucide-react";
import { DeleteButton } from "./DeleteButton";

export default async function AdminNewsPage() {
  const news = await db.news.findMany({
    orderBy: { publishDate: 'desc' }
  });

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 32 }}>
        <div>
          <h1 style={{ fontFamily: "Playfair Display", fontSize: "2rem", fontWeight: 700, marginBottom: 8, color: "var(--brand-primary)" }}>News & Updates</h1>
          <p style={{ color: "var(--text-secondary)" }}>Manage announcements, circulars, and achievements.</p>
        </div>
        <Link href="/admin/news/new" className="btn-primary" style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <Plus size={18} /> Add News
        </Link>
      </div>

      <div style={{ background: "#fff", borderRadius: "var(--radius-md)", border: "1px solid var(--border-subtle)", boxShadow: "var(--shadow-sm)", overflow: "hidden" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left" }}>
          <thead>
            <tr style={{ background: "var(--bg-offset)", borderBottom: "1px solid var(--border-subtle)" }}>
              <th style={{ padding: "16px 24px", fontSize: "0.85rem", textTransform: "uppercase", letterSpacing: "0.05em", color: "var(--text-muted)", fontWeight: 600 }}>Title</th>
              <th style={{ padding: "16px 24px", fontSize: "0.85rem", textTransform: "uppercase", letterSpacing: "0.05em", color: "var(--text-muted)", fontWeight: 600 }}>Category</th>
              <th style={{ padding: "16px 24px", fontSize: "0.85rem", textTransform: "uppercase", letterSpacing: "0.05em", color: "var(--text-muted)", fontWeight: 600 }}>Date</th>
              <th style={{ padding: "16px 24px", fontSize: "0.85rem", textTransform: "uppercase", letterSpacing: "0.05em", color: "var(--text-muted)", fontWeight: 600 }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {news.map((item) => (
              <tr key={item.id} style={{ borderBottom: "1px solid var(--border-subtle)" }}>
                <td style={{ padding: "16px 24px", fontWeight: 600, color: "var(--text-primary)" }}>{item.title}</td>
                <td style={{ padding: "16px 24px", color: "var(--brand-secondary)", fontWeight: 600 }}>{item.category}</td>
                <td style={{ padding: "16px 24px", color: "var(--text-secondary)" }}>{item.publishDate ? item.publishDate.toLocaleDateString() : "Draft"}</td>
                <td style={{ padding: "16px 24px" }}>
                  <div style={{ display: "flex", gap: 12 }}>
                    <Link href={`/admin/news/${item.id}/edit`} style={{ color: "var(--brand-primary)" }}><Edit2 size={18} /></Link>
                    <DeleteButton id={item.id} />
                  </div>
                </td>
              </tr>
            ))}
            {news.length === 0 && (
              <tr>
                <td colSpan={4} style={{ padding: "48px 24px", textAlign: "center", color: "var(--text-muted)" }}>
                  No news items found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
