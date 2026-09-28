"use client";
import { useState } from "react";
import Link from "next/link";

const COURSES = [
  "Civil Engineering",
  "Electrical and Electronics",
  "Electronics Communication",
  "Information Technology",
  "Mechanical Engineering",
  "Textile Technology",
  "Refrigeration and Air Conditioning",
];

export default function EnquiryPage() {
  const [form, setForm] = useState({
    name: "", email: "", phone: "", course: "", relatedDepartment: "", message: "",
  });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [msg, setMsg] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    try {
      const res = await fetch("/api/enquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, relatedDepartment: form.course }),
      });
      const data = await res.json();
      if (res.ok) {
        setStatus("success");
        setMsg(data.message ?? "Enquiry submitted successfully!");
        setForm({ name: "", email: "", phone: "", course: "", relatedDepartment: "", message: "" });
      } else {
        setStatus("error");
        setMsg("Something went wrong. Please try again.");
      }
    } catch {
      setStatus("error");
      setMsg("Network error. Please check your connection.");
    }
  };

  return (
    <main style={{ paddingTop: 36 + 68, minHeight: "100vh" }}>
      {/* Header */}
      <div style={{
        background: "linear-gradient(135deg, var(--brand-deep) 0%, var(--brand-navy) 100%)",
        padding: "64px 24px 48px",
        textAlign: "center",
        borderBottom: "1px solid var(--border-subtle)",
        position: "relative", overflow: "hidden",
      }}>
        <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse at 40% 50%, rgba(79,110,247,0.15), transparent 70%)" }} />
        <div style={{ position: "relative", zIndex: 1 }}>
          <div className="section-label" style={{ margin: "0 auto 16px" }}>✦ Admissions 2026–27</div>
          <h1 className="section-title">Submit Your Enquiry</h1>
          <p style={{ color: "var(--text-secondary)", marginTop: 12, maxWidth: 500, margin: "12px auto 0" }}>
            Interested in joining SSPC? Fill in your details and we&apos;ll contact you within 24 hours.
          </p>
        </div>
      </div>

      <div className="container-site" style={{ padding: "60px 24px", maxWidth: 760 }}>
        {status === "success" ? (
          <div style={{
            background: "rgba(74,222,128,0.1)", border: "1px solid rgba(74,222,128,0.3)",
            borderRadius: "var(--radius-lg)", padding: 48, textAlign: "center",
          }}>
            <div style={{ fontSize: "3rem", marginBottom: 16 }}>✅</div>
            <h2 style={{ fontFamily: "Montserrat", fontWeight: 800, color: "#4ade80", marginBottom: 12 }}>Enquiry Received!</h2>
            <p style={{ color: "var(--text-secondary)", marginBottom: 28 }}>{msg}</p>
            <Link href="/" className="btn-primary">← Back to Home</Link>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="contact-form">
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 18, marginBottom: 18 }}>
              <div className="form-group" style={{ margin: 0 }}>
                <label className="form-label">Full Name *</label>
                <input name="name" required className="form-input" placeholder="Your full name" value={form.name} onChange={handleChange} />
              </div>
              <div className="form-group" style={{ margin: 0 }}>
                <label className="form-label">Email Address *</label>
                <input name="email" type="email" required className="form-input" placeholder="your@email.com" value={form.email} onChange={handleChange} />
              </div>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 18, marginBottom: 18 }}>
              <div className="form-group" style={{ margin: 0 }}>
                <label className="form-label">Phone Number</label>
                <input name="phone" className="form-input" placeholder="+91 XXXXX XXXXX" value={form.phone} onChange={handleChange} />
              </div>
              <div className="form-group" style={{ margin: 0 }}>
                <label className="form-label">Course Interested In</label>
                <select name="course" className="form-select" value={form.course} onChange={handleChange}>
                  <option value="">Select a course...</option>
                  {COURSES.map((c) => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Message / Additional Info</label>
              <textarea
                name="message"
                className="form-textarea"
                placeholder="Tell us a bit about yourself or any specific questions..."
                value={form.message}
                onChange={handleChange}
                rows={5}
              />
            </div>

            {status === "error" && (
              <div style={{ background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.3)", borderRadius: 8, padding: "12px 16px", marginBottom: 18, fontSize: "0.88rem", color: "#f87171" }}>
                ⚠️ {msg}
              </div>
            )}

            <button type="submit" className="btn-primary" style={{ width: "100%", justifyContent: "center", fontSize: "1rem", padding: "14px" }} disabled={status === "loading"}>
              {status === "loading" ? "Submitting…" : "Submit Enquiry →"}
            </button>

            <p style={{ textAlign: "center", color: "var(--text-muted)", fontSize: "0.78rem", marginTop: 16 }}>
              By submitting you agree to be contacted by SSPC admissions team.
            </p>
          </form>
        )}
      </div>
    </main>
  );
}
