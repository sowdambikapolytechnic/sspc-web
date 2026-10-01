import { db } from "@/lib/db";
import Link from "next/link";
import type { Metadata } from "next";
import { DeleteEventButton } from "./DeleteEventButton";

export const metadata: Metadata = { title: "Events | SSPC Admin" };

export default async function AdminEventsPage() {
  let events: any[] = [];
  try {
    events = await db.event.findMany({ orderBy: { eventDate: "desc" } });
  } catch {
    events = [];
  }

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 32, flexWrap: "wrap", gap: 16 }}>
        <div>
          <h1 style={{ fontFamily: "Playfair Display", fontSize: "2rem", fontWeight: 700, marginBottom: 8, color: "var(--brand-primary)" }}>
            Events
          </h1>
          <p style={{ color: "var(--text-secondary)" }}>Manage upcoming events and past highlights.</p>
        </div>
        <Link href="/admin/events/new" className="btn-primary" style={{ display: "flex", alignItems: "center", gap: 8 }}>
          + Add Event
        </Link>
      </div>

      <div style={{ background: "#fff", borderRadius: "var(--radius-md)", border: "1px solid var(--border-subtle)", boxShadow: "var(--shadow-sm)", overflow: "hidden" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left" }}>
          <thead>
            <tr style={{ background: "var(--bg-offset)", borderBottom: "1px solid var(--border-subtle)" }}>
              {["Title", "Category", "Date", "Location", "Status", "Actions"].map(h => (
                <th key={h} style={{ padding: "16px 20px", fontSize: "0.78rem", textTransform: "uppercase", letterSpacing: "0.06em", color: "var(--text-muted)", fontWeight: 700 }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {events.map((item, i) => (
              <tr key={item.id} style={{ borderBottom: i < events.length - 1 ? "1px solid var(--border-subtle)" : "none" }}>
                <td style={{ padding: "16px 20px", fontWeight: 600, color: "var(--text-primary)", maxWidth: 280 }}>{item.title}</td>
                <td style={{ padding: "16px 20px", color: "var(--brand-secondary)", fontWeight: 600, fontSize: "0.85rem" }}>{item.category}</td>
                <td style={{ padding: "16px 20px", color: "var(--text-secondary)", fontSize: "0.85rem" }}>
                  {item.eventDate ? new Date(item.eventDate).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" }) : "TBA"}
                </td>
                <td style={{ padding: "16px 20px", color: "var(--text-secondary)", fontSize: "0.85rem" }}>{item.location || "—"}</td>
                <td style={{ padding: "16px 20px" }}>
                  <span style={{
                    display: "inline-block", padding: "3px 12px", borderRadius: 100, fontSize: "0.75rem", fontWeight: 700,
                    background: item.status === "published" ? "rgba(16,185,129,0.1)" : "rgba(107,114,128,0.1)",
                    color: item.status === "published" ? "#059669" : "var(--text-muted)",
                  }}>
                    {item.status}
                  </span>
                </td>
                <td style={{ padding: "16px 20px" }}>
                  <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
                    <Link href={`/admin/events/${item.id}/edit`} style={{ color: "var(--brand-secondary)", fontSize: "0.85rem", fontWeight: 600 }}>
                      Edit
                    </Link>
                    <DeleteEventButton id={item.id} />
                  </div>
                </td>
              </tr>
            ))}
            {events.length === 0 && (
              <tr>
                <td colSpan={6} style={{ padding: "60px 24px", textAlign: "center", color: "var(--text-muted)" }}>
                  No events found. <Link href="/admin/events/new" style={{ color: "var(--brand-secondary)", fontWeight: 600 }}>Create one</Link>.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
