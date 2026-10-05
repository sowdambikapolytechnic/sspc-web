import { db } from "@/lib/db";

export default async function AdminAlumniPage() {
  const alumniList = await db.alumni.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
        <div>
          <h1 style={{ fontSize: "2rem", fontWeight: 700, color: "var(--brand-primary)", fontFamily: "Playfair Display" }}>Alumni Directory</h1>
          <p style={{ color: "var(--text-secondary)", marginTop: 8 }}>View alumni registrations from the website.</p>
        </div>
      </div>

      <div className="glass-card" style={{ padding: 24, overflowX: "auto" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left" }}>
          <thead>
            <tr style={{ borderBottom: "1px solid var(--border-subtle)" }}>
              <th style={{ padding: "12px 16px", color: "var(--text-muted)", fontSize: "0.85rem", textTransform: "uppercase" }}>Name</th>
              <th style={{ padding: "12px 16px", color: "var(--text-muted)", fontSize: "0.85rem", textTransform: "uppercase" }}>Course / Batch</th>
              <th style={{ padding: "12px 16px", color: "var(--text-muted)", fontSize: "0.85rem", textTransform: "uppercase" }}>Current Status</th>
              <th style={{ padding: "12px 16px", color: "var(--text-muted)", fontSize: "0.85rem", textTransform: "uppercase" }}>Contact</th>
              <th style={{ padding: "12px 16px", color: "var(--text-muted)", fontSize: "0.85rem", textTransform: "uppercase" }}>Date Added</th>
            </tr>
          </thead>
          <tbody>
            {alumniList.length === 0 ? (
              <tr>
                <td colSpan={5} style={{ padding: "32px 16px", textAlign: "center", color: "var(--text-muted)" }}>
                  No alumni entries found.
                </td>
              </tr>
            ) : (
              alumniList.map((alumni) => (
                <tr key={alumni.id} style={{ borderBottom: "1px solid var(--border-subtle)", transition: "var(--transition)" }}>
                  <td style={{ padding: "16px", fontWeight: 600, color: "var(--brand-primary)" }}>
                    {alumni.firstName} {alumni.lastName || ""}
                  </td>
                  <td style={{ padding: "16px", color: "var(--text-secondary)", fontSize: "0.95rem" }}>
                    <div>{alumni.course}</div>
                    <div style={{ fontWeight: 600, color: "var(--brand-secondary)", marginTop: 4 }}>Batch of {alumni.yearOfPassing}</div>
                  </td>
                  <td style={{ padding: "16px", color: "var(--text-secondary)", fontSize: "0.95rem", maxWidth: 200 }}>
                    {alumni.currentStatus || "-"}
                  </td>
                  <td style={{ padding: "16px", color: "var(--text-secondary)", fontSize: "0.95rem" }}>
                    <div style={{ marginBottom: 4 }}>{alumni.email || "-"}</div>
                    <div>{alumni.phone || "-"}</div>
                  </td>
                  <td style={{ padding: "16px", color: "var(--text-muted)", fontSize: "0.9rem" }}>
                    {alumni.createdAt.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
