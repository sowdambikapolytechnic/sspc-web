import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { FileText, ClipboardList } from "lucide-react";

export const metadata: Metadata = {
  title: "Documents & Reports | SSPC",
  description: "AICTE EOA Reports and Mandatory Disclosure of Sri Sowdambika Polytechnic College.",
};

export default function DocumentsPage() {
  return (
    <>
      <Navbar />
      <main style={{ minHeight: "100vh" }}>
        <div className="page-header" style={{ padding: "80px 24px", background: "var(--brand-primary)", color: "#fff" }}>
          <div className="section-label" style={{ margin: "0 auto 16px", color: "var(--brand-accent)", justifyContent: "center" }}>Public Information</div>
          <h1 className="section-title" style={{ color: "#fff" }}>Documents & Reports</h1>
          <p style={{ color: "#a1a9b8", marginTop: 16, maxWidth: 600, margin: "16px auto 0", fontSize: "1.1rem", lineHeight: 1.6 }}>
            Access AICTE Extension of Approval (EOA) reports and the Mandatory Disclosure document.
          </p>
        </div>

        <div className="container-site" style={{ padding: "80px 24px", maxWidth: 800 }}>
          
          <h2 className="section-title" style={{ fontSize: "1.8rem", marginBottom: 24 }}>Mandatory Disclosure</h2>
          <div className="glass-card" style={{ padding: 24, display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 60 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
              <div style={{ color: "var(--brand-primary)" }}><FileText size={40} /></div>
              <div>
                <h3 style={{ fontFamily: "Playfair Display", fontSize: "1.2rem", fontWeight: 700, color: "var(--brand-primary)" }}>SSPC Mandatory Disclosure</h3>
                <div style={{ color: "var(--brand-secondary)", fontSize: "0.85rem", marginTop: 4, fontWeight: 600 }}>PDF Document</div>
              </div>
            </div>
            <a href="/documents/mandatory_disclosure.pdf" target="_blank" className="btn-ghost">
              View / Download
            </a>
          </div>

          <h2 className="section-title" style={{ fontSize: "1.8rem", marginBottom: 24 }}>AICTE EOA Reports</h2>
          <div style={{ display: "grid", gap: 16 }}>
             {[
               "EOA Report 2023-2024",
               "EOA Report 2022-2023",
               "EOA Report 2021-2022",
               "EOA Report 2020-2021",
             ].map(doc => (
               <div key={doc} className="glass-card" style={{ padding: 20, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                    <div style={{ color: "var(--brand-secondary)" }}><ClipboardList size={28} /></div>
                    <div style={{ fontFamily: "Inter, sans-serif", fontSize: "1rem", fontWeight: 600, color: "var(--text-primary)" }}>{doc}</div>
                  </div>
                  <button className="btn-ghost" style={{ padding: "8px 16px", fontSize: "0.8rem" }}>Request Copy</button>
               </div>
             ))}
          </div>
          <p style={{ color: "var(--text-muted)", fontSize: "0.85rem", marginTop: 16 }}>
            * For copies of older reports, please contact the administration office.
          </p>

        </div>
      </main>
      <Footer />
    </>
  );
}
