"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

interface Props {
  params: Promise<{ id: string }>;
}

export default function AdminEditNewsPage({ params }: Props) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [error, setError] = useState("");
  const [id, setId] = useState("");
  const [fields, setFields] = useState({ title: "", category: "Academics", bodyHtml: "", status: "draft" });

  useEffect(() => {
    params.then(({ id }) => {
      setId(id);
      fetch(`/api/news/${id}`)
        .then(r => r.json())
        .then(data => {
          if (data.item) {
            setFields({
              title: data.item.title || "",
              category: data.item.category || "Academics",
              bodyHtml: data.item.bodyHtml || "",
              status: data.item.status || "draft",
            });
          }
        })
        .catch(() => setError("Could not load news item."))
        .finally(() => setFetching(false));
    });
  }, [params]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await fetch(`/api/news/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(fields),
      });
      if (!res.ok) { const d = await res.json(); throw new Error(d.error || "Update failed"); }
      router.push("/admin/news");
      router.refresh();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (fetching) return <div style={{ padding: 40, color: "var(--text-muted)" }}>Loading...</div>;

  return (
    <div>
      <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 32 }}>
        <a href="/admin/news" style={{ color: "var(--text-muted)", fontSize: "0.9rem" }}>← News</a>
        <h1 style={{ fontFamily: "Playfair Display", fontSize: "2rem", fontWeight: 700, color: "var(--brand-primary)" }}>Edit Article</h1>
      </div>

      {error && <div style={{ background: "#fef2f2", color: "#ef4444", padding: "12px 16px", borderRadius: 8, marginBottom: 24, border: "1px solid #fca5a5" }}>{error}</div>}

      <form onSubmit={handleSubmit} style={{ background: "#fff", borderRadius: "var(--radius-md)", border: "1px solid var(--border-subtle)", padding: 32, maxWidth: 760 }}>
        <div className="form-group">
          <label className="form-label">Title *</label>
          <input name="title" required className="form-input" value={fields.title} onChange={e => setFields(f => ({ ...f, title: e.target.value }))} />
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
          <div className="form-group">
            <label className="form-label">Category</label>
            <input name="category" className="form-input" value={fields.category} onChange={e => setFields(f => ({ ...f, category: e.target.value }))} />
          </div>
          <div className="form-group">
            <label className="form-label">Status</label>
            <select name="status" className="form-input" value={fields.status} onChange={e => setFields(f => ({ ...f, status: e.target.value }))}>
              <option value="draft">Draft</option>
              <option value="published">Published</option>
            </select>
          </div>
        </div>
        <div className="form-group">
          <label className="form-label">Body (HTML allowed)</label>
          <textarea name="bodyHtml" className="form-input" rows={10} value={fields.bodyHtml} onChange={e => setFields(f => ({ ...f, bodyHtml: e.target.value }))} style={{ resize: "vertical", fontFamily: "monospace", fontSize: "0.9rem" }} />
        </div>
        <div style={{ display: "flex", gap: 16, justifyContent: "flex-end" }}>
          <a href="/admin/news" className="btn-ghost">Cancel</a>
          <button type="submit" className="btn-primary" disabled={loading}>{loading ? "Saving..." : "Save Changes"}</button>
        </div>
      </form>
    </div>
  );
}
