"use client";
import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { createDocument } from "../actions";

export default function AdminNewDocumentPage() {
  const router = useRouter();
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  const fileRef = useRef<HTMLInputElement>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setUploading(true);
    setError("");
    const form = new FormData(e.currentTarget);
    const files = fileRef.current?.files;
    
    if (!files || files.length === 0) { 
      setError("Please select a file."); 
      setUploading(false); 
      return; 
    }

    const file = files[0];
    const fd = new FormData();
    fd.append("file", file);
    
    try {
      const res = await fetch("/api/media", { method: "POST", body: fd });
      if (!res.ok) throw new Error("Upload failed");
      
      const { media } = await res.json();
      
      const title = form.get("title") as string;
      const category = form.get("category") as string;
      const year = form.get("year") as string;

      await createDocument(media.id, title, category, year);
      
      router.push("/admin/documents");
    } catch (err: any) {
      setError(err.message || "Failed to create document.");
      setUploading(false);
    }
  };

  return (
    <div>
      <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 32 }}>
        <a href="/admin/documents" style={{ color: "var(--text-muted)", fontSize: "0.9rem" }}>← Documents</a>
        <h1 style={{ fontFamily: "Playfair Display", fontSize: "2rem", fontWeight: 700, color: "var(--brand-primary)" }}>Add New Document</h1>
      </div>

      {error && <div style={{ background: "#fef2f2", color: "#ef4444", padding: "12px 16px", borderRadius: 8, marginBottom: 24, border: "1px solid #fca5a5" }}>{error}</div>}

      <form onSubmit={handleSubmit} style={{ background: "#fff", borderRadius: "var(--radius-md)", border: "1px solid var(--border-subtle)", padding: 32, maxWidth: 760 }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, marginBottom: 20 }}>
          <div className="form-group">
            <label className="form-label">Document Title *</label>
            <input name="title" required className="form-input" placeholder="e.g. Mandatory Disclosure 2026" />
          </div>
          <div className="form-group">
            <label className="form-label">Category *</label>
            <select name="category" required className="form-select">
              <option value="AICTE">AICTE EOA Report</option>
              <option value="mandatory_disclosure">Mandatory Disclosure</option>
              <option value="other">Other Document</option>
            </select>
          </div>
        </div>

        <div className="form-group" style={{ marginBottom: 20 }}>
          <label className="form-label">Year</label>
          <input type="number" name="year" className="form-input" placeholder="e.g. 2026" />
        </div>

        <div className="form-group" style={{ marginBottom: 24 }}>
          <label className="form-label">Select File (PDF) *</label>
          <input ref={fileRef} type="file" required name="file" accept="application/pdf" className="form-input" style={{ paddingTop: 8 }} />
        </div>

        <div style={{ display: "flex", gap: 16, justifyContent: "flex-end" }}>
          <a href="/admin/documents" className="btn-ghost">Cancel</a>
          <button type="submit" className="btn-primary" disabled={uploading}>{uploading ? "Uploading..." : "Save Document"}</button>
        </div>
      </form>
    </div>
  );
}
