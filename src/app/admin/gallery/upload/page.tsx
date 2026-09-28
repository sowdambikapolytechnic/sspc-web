"use client";
import { useState, useRef } from "react";
import { useRouter } from "next/navigation";

export default function AdminGalleryUploadPage() {
  const router = useRouter();
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [previews, setPreviews] = useState<string[]>([]);
  const fileRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    const urls = files.map(f => URL.createObjectURL(f));
    setPreviews(urls);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setUploading(true);
    setError("");
    setSuccess("");
    const form = new FormData(e.currentTarget);
    const files = fileRef.current?.files;
    if (!files || files.length === 0) { setError("Please select at least one image."); setUploading(false); return; }

    let uploaded = 0;
    for (const file of Array.from(files)) {
      const fd = new FormData();
      fd.append("file", file);
      fd.append("albumTitle", form.get("albumTitle") as string || "General");
      fd.append("category", form.get("category") as string || "");
      try {
        const res = await fetch("/api/media", { method: "POST", body: fd });
        if (res.ok) uploaded++;
      } catch { /* continue */ }
    }
    setSuccess(`${uploaded} of ${files.length} image(s) uploaded successfully.`);
    setPreviews([]);
    if (fileRef.current) fileRef.current.value = "";
    setUploading(false);
  };

  return (
    <div>
      <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 32 }}>
        <a href="/admin/gallery" style={{ color: "var(--text-muted)", fontSize: "0.9rem" }}>← Gallery</a>
        <h1 style={{ fontFamily: "Playfair Display", fontSize: "2rem", fontWeight: 700, color: "var(--brand-primary)" }}>Upload Images</h1>
      </div>

      {error && <div style={{ background: "#fef2f2", color: "#ef4444", padding: "12px 16px", borderRadius: 8, marginBottom: 24, border: "1px solid #fca5a5" }}>{error}</div>}
      {success && <div style={{ background: "#f0fdf4", color: "#059669", padding: "12px 16px", borderRadius: 8, marginBottom: 24, border: "1px solid #6ee7b7" }}>{success}</div>}

      <form onSubmit={handleSubmit} style={{ background: "#fff", borderRadius: "var(--radius-md)", border: "1px solid var(--border-subtle)", padding: 32, maxWidth: 760 }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
          <div className="form-group">
            <label className="form-label">Album Name *</label>
            <input name="albumTitle" required className="form-input" placeholder="e.g. Freshers Day 2026" />
          </div>
          <div className="form-group">
            <label className="form-label">Category</label>
            <input name="category" className="form-input" placeholder="e.g. Events, Academic" />
          </div>
        </div>

        <div className="form-group">
          <label className="form-label">Select Images *</label>
          <div style={{
            border: "2px dashed var(--border-accent)", borderRadius: "var(--radius-md)",
            padding: "48px 24px", textAlign: "center", cursor: "pointer",
            background: "var(--bg-offset)", transition: "var(--transition)"
          }} onClick={() => fileRef.current?.click()}>
            <svg width="40" height="40" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" style={{ margin: "0 auto 12px", display: "block", color: "var(--text-muted)" }}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
            </svg>
            <p style={{ fontWeight: 600, color: "var(--text-secondary)", marginBottom: 4 }}>Click to browse or drag & drop</p>
            <p style={{ fontSize: "0.85rem", color: "var(--text-muted)" }}>JPG, PNG, WEBP up to 10MB each</p>
          </div>
          <input ref={fileRef} type="file" name="files" multiple accept="image/*" style={{ display: "none" }} onChange={handleFileChange} />
        </div>

        {previews.length > 0 && (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(120px, 1fr))", gap: 10, marginBottom: 24 }}>
            {previews.map((src, i) => (
              // eslint-disable-next-line @next/next/no-img-element
              <img key={i} src={src} alt="" style={{ width: "100%", aspectRatio: "1", objectFit: "cover", borderRadius: "var(--radius-sm)", border: "1px solid var(--border-subtle)" }} />
            ))}
          </div>
        )}

        <div style={{ display: "flex", gap: 16, justifyContent: "flex-end" }}>
          <a href="/admin/gallery" className="btn-ghost">Cancel</a>
          <button type="submit" className="btn-primary" disabled={uploading}>{uploading ? "Uploading..." : "Upload Images"}</button>
        </div>
      </form>
    </div>
  );
}
