"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminNewEventPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    const form = new FormData(e.currentTarget);
    const body = {
      title: form.get("title"),
      category: form.get("category") || "Academic",
      description: form.get("description"),
      eventDate: form.get("eventDate") ? new Date(form.get("eventDate") as string).toISOString() : null,
      location: form.get("location"),
      status: form.get("status") || "draft",
    };
    try {
      const res = await fetch("/api/events", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) });
      if (!res.ok) { const d = await res.json(); throw new Error(d.error || "Failed"); }
      router.push("/admin/events");
      router.refresh();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 32 }}>
        <a href="/admin/events" style={{ color: "var(--text-muted)", fontSize: "0.9rem" }}>← Events</a>
        <h1 style={{ fontFamily: "Playfair Display", fontSize: "2rem", fontWeight: 700, color: "var(--brand-primary)" }}>New Event</h1>
      </div>

      {error && <div style={{ background: "#fef2f2", color: "#ef4444", padding: "12px 16px", borderRadius: 8, marginBottom: 24, border: "1px solid #fca5a5" }}>{error}</div>}

      <form onSubmit={handleSubmit} style={{ background: "#fff", borderRadius: "var(--radius-md)", border: "1px solid var(--border-subtle)", padding: 32, maxWidth: 760 }}>
        <div className="form-group">
          <label className="form-label">Title *</label>
          <input name="title" required className="form-input" placeholder="Event title" />
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
          <div className="form-group">
            <label className="form-label">Category</label>
            <input name="category" className="form-input" placeholder="e.g. Academic, Sports" defaultValue="Academic" />
          </div>
          <div className="form-group">
            <label className="form-label">Status</label>
            <select name="status" className="form-input">
              <option value="draft">Draft</option>
              <option value="published">Published</option>
            </select>
          </div>
          <div className="form-group">
            <label className="form-label">Event Date</label>
            <input name="eventDate" type="datetime-local" className="form-input" />
          </div>
          <div className="form-group">
            <label className="form-label">Location</label>
            <input name="location" className="form-input" placeholder="e.g. Seminar Hall, Main Campus" />
          </div>
        </div>
        <div className="form-group">
          <label className="form-label">Description</label>
          <textarea name="description" className="form-input" rows={6} placeholder="Event details..." style={{ resize: "vertical" }} />
        </div>
        <div style={{ display: "flex", gap: 16, justifyContent: "flex-end" }}>
          <a href="/admin/events" className="btn-ghost">Cancel</a>
          <button type="submit" className="btn-primary" disabled={loading}>{loading ? "Saving..." : "Create Event"}</button>
        </div>
      </form>
    </div>
  );
}
