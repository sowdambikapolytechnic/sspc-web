"use client";
import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { MapPin, Phone, Mail, CheckCircle2 } from "lucide-react";

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    // Mock submission
    setTimeout(() => {
      setStatus("success");
      setForm({ name: "", email: "", subject: "", message: "" });
    }, 1000);
  };

  return (
    <>
      <Navbar />
      <main style={{ minHeight: "100vh" }}>
        <div className="page-header" style={{ padding: "80px 24px", background: "var(--brand-primary)", color: "#fff" }}>
          <div className="section-label" style={{ margin: "0 auto 16px", color: "var(--brand-accent)", justifyContent: "center" }}>Get in touch</div>
          <h1 className="section-title" style={{ color: "#fff" }}>Contact Us</h1>
          <p style={{ color: "#a1a9b8", marginTop: 16, maxWidth: 600, margin: "16px auto 0", fontSize: "1.1rem", lineHeight: 1.6 }}>
            We're here to help and answer any question you might have.
          </p>
        </div>

        <div className="container-site" style={{ padding: "80px 24px" }}>
          <div className="contact-grid">
            
            <div>
              <h2 className="section-title" style={{ fontSize: "2rem", marginBottom: 32 }}>Reach Out</h2>
              
              <div className="contact-info-card glass-card" style={{ padding: 24, display: "flex", gap: 20, alignItems: "flex-start", marginBottom: 16 }}>
                <div style={{ color: "var(--brand-primary)" }}><MapPin size={24} /></div>
                <div>
                  <div className="contact-info-label">Address</div>
                  <div className="contact-info-value">
                    Sri Sowdambika Polytechnic College<br />
                    Thiruchuli Road, Aruppukottai,<br />
                    Tamil Nadu 626101
                  </div>
                </div>
              </div>

              <div className="contact-info-card glass-card" style={{ padding: 24, display: "flex", gap: 20, alignItems: "flex-start", marginBottom: 16 }}>
                <div style={{ color: "var(--brand-primary)" }}><Phone size={24} /></div>
                <div>
                  <div className="contact-info-label">Phone</div>
                  <div className="contact-info-value">99523 82574</div>
                  <div className="contact-info-value">04566 220478</div>
                  <div className="contact-info-value">04566 221627</div>
                </div>
              </div>

              <div className="contact-info-card glass-card" style={{ padding: 24, display: "flex", gap: 20, alignItems: "flex-start" }}>
                <div style={{ color: "var(--brand-primary)" }}><Mail size={24} /></div>
                <div>
                  <div className="contact-info-label">Email</div>
                  <div className="contact-info-value" style={{ textTransform: "none" }}>sowdambika84@gmail.com</div>
                </div>
              </div>
            </div>

            <div>
              <div className="contact-form">
                <h3 style={{ fontFamily: "Montserrat", fontSize: "1.4rem", fontWeight: 700, marginBottom: 24 }}>Send a Message</h3>
                
                {status === "success" ? (
                   <div style={{ background: "rgba(74,222,128,0.1)", border: "1px solid rgba(74,222,128,0.3)", borderRadius: 8, padding: 24, textAlign: "center" }}>
                     <div style={{ display: "flex", justifyContent: "center", marginBottom: 12, color: "#4ade80" }}>
                       <CheckCircle2 size={48} />
                     </div>
                     <div style={{ color: "#4ade80", fontWeight: 700 }}>Message Sent Successfully!</div>
                   </div>
                ) : (
                  <form onSubmit={handleSubmit}>
                    <div className="form-group">
                      <label className="form-label">Full Name</label>
                      <input required className="form-input" value={form.name} onChange={e => setForm({...form, name: e.target.value})} />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Email Address</label>
                      <input required type="email" className="form-input" value={form.email} onChange={e => setForm({...form, email: e.target.value})} />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Subject</label>
                      <input required className="form-input" value={form.subject} onChange={e => setForm({...form, subject: e.target.value})} />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Message</label>
                      <textarea required className="form-textarea" value={form.message} onChange={e => setForm({...form, message: e.target.value})}></textarea>
                    </div>
                    <button type="submit" className="btn-primary" disabled={status === "loading"} style={{ width: "100%", justifyContent: "center", padding: 14 }}>
                      {status === "loading" ? "Sending..." : "Send Message"}
                    </button>
                  </form>
                )}
              </div>
            </div>

          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
