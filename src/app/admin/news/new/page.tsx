import Link from "next/link";
import { ArrowLeft, Save } from "lucide-react";
import { createNews } from "../../actions";
import { SubmitButton } from "./SubmitButton";

export default function NewNewsPage() {
  return (
    <div>
      <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 32 }}>
        <Link href="/admin/news" style={{ color: "var(--text-secondary)" }}>
          <ArrowLeft size={24} />
        </Link>
        <h1 style={{ fontFamily: "Playfair Display", fontSize: "2rem", fontWeight: 700, color: "var(--brand-primary)" }}>Add News Item</h1>
      </div>

      <div style={{ background: "#fff", padding: 32, borderRadius: "var(--radius-md)", border: "1px solid var(--border-subtle)", boxShadow: "var(--shadow-sm)", maxWidth: 800 }}>
        <form action={createNews} style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          
          <div className="form-group">
            <label className="form-label">Title</label>
            <input 
              name="title"
              required 
              className="form-input" 
              placeholder="e.g. Campus Recruitment Drive 2026"
            />
          </div>

          <div className="form-group">
            <label className="form-label">Category</label>
            <select name="category" className="form-input" defaultValue="Announcement">
              <option value="Announcement">Announcement</option>
              <option value="Circular">Circular</option>
              <option value="Event">Event</option>
              <option value="Achievement">Achievement</option>
            </select>
          </div>

          <div className="form-group">
            <label className="form-label">Content</label>
            <textarea 
              name="content"
              required 
              className="form-textarea" 
              rows={8}
              placeholder="Write the details here..."
            />
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <input type="checkbox" name="isPublished" id="isPublished" defaultChecked />
            <label htmlFor="isPublished" style={{ fontWeight: 600, color: "var(--text-primary)" }}>Publish immediately</label>
          </div>

          <div style={{ display: "flex", justifyContent: "flex-end", gap: 16, marginTop: 16 }}>
            <Link href="/admin/news" className="btn-ghost">Cancel</Link>
            <SubmitButton />
          </div>
        </form>
      </div>
    </div>
  );
}
          



