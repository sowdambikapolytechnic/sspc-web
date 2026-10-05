import { db } from "@/lib/db";
import Link from "next/link";
import { FileText, Plus, Trash2 } from "lucide-react";
import { deleteDocument } from "./actions";

export default async function AdminDocumentsPage() {
  const documents = await db.document.findMany({
    include: { media: true },
    orderBy: { year: "desc" }
  });

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
        <div>
          <h1 style={{ fontSize: "2rem", fontWeight: 700, color: "var(--brand-primary)", fontFamily: "Playfair Display" }}>Documents & Reports</h1>
          <p style={{ color: "var(--text-secondary)", marginTop: 8 }}>Manage AICTE EOA reports and Mandatory Disclosure.</p>
        </div>
        <Link href="/admin/documents/new" className="btn-primary" style={{ display: "flex", alignItems: "center", gap: 8, textDecoration: "none" }}>
          <Plus size={18} /> Add Document
        </Link>
      </div>

      <div className="glass-card" style={{ padding: 24, overflowX: "auto" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left" }}>
          <thead>
            <tr style={{ borderBottom: "1px solid var(--border-subtle)" }}>
              <th style={{ padding: "12px 16px", color: "var(--text-muted)", fontSize: "0.85rem", textTransform: "uppercase" }}>Title</th>
              <th style={{ padding: "12px 16px", color: "var(--text-muted)", fontSize: "0.85rem", textTransform: "uppercase" }}>Category</th>
              <th style={{ padding: "12px 16px", color: "var(--text-muted)", fontSize: "0.85rem", textTransform: "uppercase" }}>Year</th>
              <th style={{ padding: "12px 16px", color: "var(--text-muted)", fontSize: "0.85rem", textTransform: "uppercase" }}>File</th>
              <th style={{ padding: "12px 16px", color: "var(--text-muted)", fontSize: "0.85rem", textTransform: "uppercase" }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {documents.length === 0 ? (
              <tr>
                <td colSpan={5} style={{ padding: "32px 16px", textAlign: "center", color: "var(--text-muted)" }}>
                  No documents found.
                </td>
              </tr>
            ) : (
              documents.map((doc) => (
                <tr key={doc.id} style={{ borderBottom: "1px solid var(--border-subtle)", transition: "var(--transition)" }}>
                  <td style={{ padding: "16px", fontWeight: 600, color: "var(--brand-primary)" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                      <FileText size={16} style={{ color: "var(--brand-accent)" }} />
                      {doc.title}
                    </div>
                  </td>
                  <td style={{ padding: "16px", color: "var(--text-secondary)", fontSize: "0.95rem" }}>
                    <span style={{ background: "var(--bg-offset)", color: "var(--brand-primary)", padding: "4px 8px", borderRadius: 4, fontSize: "0.8rem", fontWeight: 600, textTransform: "uppercase" }}>
                      {doc.category.replace("_", " ")}
                    </span>
                  </td>
                  <td style={{ padding: "16px", color: "var(--text-secondary)", fontSize: "0.95rem" }}>
                    {doc.year || "-"}
                  </td>
                  <td style={{ padding: "16px", color: "var(--brand-accent)", fontSize: "0.95rem" }}>
                    <a href={doc.media.url} target="_blank" rel="noopener noreferrer" style={{ color: "inherit", textDecoration: "none", fontWeight: 600 }}>View File</a>
                  </td>
                  <td style={{ padding: "16px" }}>
                    <form action={async () => {
                      "use server";
                      await deleteDocument(doc.id);
                    }}>
                      <button style={{ background: "none", border: "none", color: "#ef4444", cursor: "pointer", display: "flex", alignItems: "center", gap: 4, fontWeight: 600, fontSize: "0.9rem" }}>
                        <Trash2 size={16} /> Delete
                      </button>
                    </form>
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
