import { db } from "@/lib/db";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = { title: "Enquiries | SSPC Admin" };

export default async function AdminEnquiriesPage() {
  let enquiries: any[] = [];
  try {
    enquiries = await db.enquiry.findMany({
      orderBy: { createdAt: "desc" },
      take: 100,
    });
  } catch {
    enquiries = [];
  }

  return (
    <div>
      <div style={{ marginBottom: 32 }}>
        <h1 style={{ fontFamily: "Playfair Display", fontSize: "2rem", fontWeight: 700, color: "var(--brand-primary)", marginBottom: 8 }}>
          Enquiries
        </h1>
        <p style={{ color: "var(--text-secondary)" }}>Student admission enquiries submitted through the website.</p>
      </div>

      {enquiries.length === 0 ? (
        <div style={{ background: "#fff", border: "1px solid var(--border-subtle)", borderRadius: "var(--radius-md)", padding: 60, textAlign: "center", color: "var(--text-muted)" }}>
          <svg width="48" height="48" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" style={{ margin: "0 auto 16px", display: "block" }}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
          </svg>
          <p style={{ fontWeight: 600, marginBottom: 4 }}>No enquiries yet</p>
          <p style={{ fontSize: "0.9rem" }}>Enquiries submitted via the website will appear here.</p>
        </div>
      ) : (
        <div style={{ background: "#fff", border: "1px solid var(--border-subtle)", borderRadius: "var(--radius-md)", overflow: "hidden" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.9rem" }}>
            <thead>
              <tr style={{ background: "var(--bg-offset)", borderBottom: "1px solid var(--border-subtle)" }}>
                {["Name", "Email", "Phone", "Course", "Date", "Status"].map(h => (
                  <th key={h} style={{ padding: "14px 20px", textAlign: "left", fontWeight: 700, color: "var(--text-muted)", fontSize: "0.78rem", textTransform: "uppercase", letterSpacing: "0.06em" }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {enquiries.map((enq, i) => (
                <tr key={enq.id} style={{ borderBottom: i < enquiries.length - 1 ? "1px solid var(--border-subtle)" : "none" }}>
                  <td style={{ padding: "14px 20px", fontWeight: 600, color: "var(--text-primary)" }}>{enq.name}</td>
                  <td style={{ padding: "14px 20px", color: "var(--text-secondary)" }}>{enq.email}</td>
                  <td style={{ padding: "14px 20px", color: "var(--text-secondary)" }}>{enq.phone || "—"}</td>
                  <td style={{ padding: "14px 20px", color: "var(--text-secondary)" }}>{enq.course || "—"}</td>
                  <td style={{ padding: "14px 20px", color: "var(--text-muted)", fontSize: "0.85rem" }}>
                    {new Date(enq.createdAt).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
                  </td>
                  <td style={{ padding: "14px 20px" }}>
                    <span style={{
                      display: "inline-block",
                      padding: "3px 12px",
                      borderRadius: 100,
                      fontSize: "0.75rem",
                      fontWeight: 700,
                      background: enq.status === "new" ? "rgba(37,99,235,0.1)" : enq.status === "contacted" ? "rgba(16,185,129,0.1)" : "rgba(107,114,128,0.1)",
                      color: enq.status === "new" ? "var(--brand-secondary)" : enq.status === "contacted" ? "#059669" : "var(--text-muted)",
                    }}>
                      {enq.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
