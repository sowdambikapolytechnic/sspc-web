import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { GraduationCap, Mail } from "lucide-react";

export const metadata: Metadata = {
  title: "Alumni | SSPC",
  description: "Connect with the Sri Sowdambika Polytechnic College alumni network.",
};

export default function AlumniPage() {
  return (
    <>
      <Navbar />
      <main style={{ minHeight: "100vh" }}>
        <div className="page-header" style={{ padding: "80px 24px", background: "var(--brand-primary)", color: "#fff" }}>
          <div className="section-label" style={{ margin: "0 auto 16px", color: "var(--brand-accent)", justifyContent: "center" }}>Our Pride</div>
          <h1 className="section-title" style={{ color: "#fff" }}>Alumni Network</h1>
          <p style={{ color: "#a1a9b8", marginTop: 16, maxWidth: 600, margin: "16px auto 0", fontSize: "1.1rem", lineHeight: 1.6 }}>
            Celebrating the achievements of our graduates and fostering lifelong connections.
          </p>
        </div>

        <div className="container-site" style={{ padding: "80px 24px", maxWidth: 800 }}>
          
          <div className="glass-card" style={{ padding: 48, textAlign: "center", marginBottom: 60 }}>
            <div style={{ display: "flex", justifyContent: "center", marginBottom: 24, color: "var(--brand-accent)" }}>
              <GraduationCap size={64} />
            </div>
            <h2 style={{ fontFamily: "Playfair Display", fontSize: "1.8rem", fontWeight: 700, marginBottom: 16, color: "var(--brand-primary)" }}>Stay Connected</h2>
            <p style={{ color: "var(--text-secondary)", fontSize: "1.05rem", lineHeight: 1.7, marginBottom: 32 }}>
              Are you an alumnus of Sri Sowdambika Polytechnic College? We would love to hear from you! Join our growing alumni network to connect with old friends, mentor current students, and stay updated on campus news.
            </p>
            <button className="btn-primary" style={{ fontSize: "1rem", padding: "12px 28px" }}>
              Join the Alumni Directory
            </button>
          </div>

          <h2 className="section-title" style={{ fontSize: "1.8rem", marginBottom: 24, textAlign: "center" }}>Alumni Association</h2>
          <div className="glass-card" style={{ padding: 32 }}>
             <p style={{ color: "var(--text-secondary)", lineHeight: 1.7, marginBottom: 16 }}>
               The SSPC Alumni Association plays a crucial role in the development of the institution. Our alumni are spread across the globe, holding prominent positions in various sectors.
             </p>
             <p style={{ color: "var(--text-secondary)", lineHeight: 1.7, marginBottom: 24 }}>
               We regularly organize Alumni Meets to provide a platform for former students to reconnect and share their experiences with current students, guiding them towards successful careers.
             </p>
             
             <div style={{ padding: 24, background: "var(--brand-primary)", borderRadius: "var(--radius-md)" }}>
                <h4 style={{ fontFamily: "Playfair Display", fontWeight: 700, marginBottom: 8, color: "#fff", fontSize: "1.1rem" }}>Contact the Alumni Coordinator</h4>
                <p style={{ color: "#a1a9b8", fontSize: "0.9rem", marginBottom: 16 }}>For queries regarding the association or upcoming meets.</p>
                <div style={{ display: "flex", gap: 12, alignItems: "center", color: "var(--brand-accent)", fontWeight: 600 }}>
                  <Mail size={18} /> alumni@sowdambikapolytechnic.com
                </div>
             </div>
          </div>

        </div>
      </main>
      <Footer />
    </>
  );
}
