import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { TrendingUp, Building2, BookOpen } from "lucide-react";

export const metadata: Metadata = {
  title: "Placements & Training | SSPC",
  description: "Placement records, top recruiters, and training programs at Sri Sowdambika Polytechnic College.",
};

const COMPANIES = [
  "Infosys", "TCS", "Wipro", "HCL", "Tech Mahindra",
  "Turbo Energies", "MEINE Electric", "Mustard Fashion",
  "College of Engineering Guindy", "BHEL", "TNEB", "L&T",
];

export default function PlacementsPage() {
  return (
    <>
      <Navbar />
      <main style={{ minHeight: "100vh" }}>
        <div className="page-header" style={{ padding: "80px 24px", background: "var(--brand-primary)", color: "#fff" }}>
          <div className="section-label" style={{ margin: "0 auto 16px", color: "var(--brand-accent)", justifyContent: "center" }}>Training & Placement Cell</div>
          <h1 className="section-title" style={{ color: "#fff" }}>Placements</h1>
          <p style={{ color: "#a1a9b8", marginTop: 16, maxWidth: 600, margin: "16px auto 0", fontSize: "1.1rem", lineHeight: 1.6 }}>
            Our dedicated placement cell works tirelessly to connect our talented students with industry-leading organizations.
          </p>
        </div>

        <div className="container-site" style={{ padding: "80px 24px" }}>
          
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 24, marginBottom: 80 }}>
            {[
              { title: "Placement Rate", value: "95%", desc: "Consistent placement record across all departments.", icon: <TrendingUp size={40} /> },
              { title: "Recruiters", value: "50+", desc: "Top companies visiting our campus annually.", icon: <Building2 size={40} /> },
              { title: "Pre-Placement Training", value: "100%", desc: "Students trained in aptitude, technical skills, and soft skills.", icon: <BookOpen size={40} /> },
            ].map(s => (
               <div key={s.title} className="glass-card" style={{ padding: 32, textAlign: "center" }}>
                  <div style={{ marginBottom: 16, color: "var(--brand-primary)" }}>{s.icon}</div>
                  <div style={{ fontFamily: "Playfair Display", fontSize: "2.5rem", fontWeight: 700, color: "var(--brand-secondary)" }}>{s.value}</div>
                  <h3 style={{ fontFamily: "Playfair Display", fontSize: "1.2rem", fontWeight: 700, margin: "12px 0 8px", color: "var(--brand-primary)" }}>{s.title}</h3>
                  <p style={{ color: "var(--text-secondary)", fontSize: "0.95rem", lineHeight: 1.6 }}>{s.desc}</p>
               </div>
            ))}
          </div>

          <div style={{ textAlign: "center", marginBottom: 40 }}>
            <h2 className="section-title" style={{ fontSize: "2rem" }}>Our Top Recruiters</h2>
            <p style={{ color: "var(--text-secondary)", marginTop: 16 }}>We are proud to partner with leading companies that trust the quality of our students.</p>
          </div>

          <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 16, marginBottom: 80 }}>
            {COMPANIES.map(company => (
              <div key={company} style={{
                background: "var(--bg-offset)",
                border: "1px solid var(--border-subtle)",
                borderRadius: "var(--radius-sm)",
                padding: "16px 24px",
                fontFamily: "Inter, sans-serif",
                fontWeight: 600,
                color: "var(--brand-primary)",
                boxShadow: "var(--shadow-sm)"
              }}>
                {company}
              </div>
            ))}
          </div>

          <div className="glass-card" style={{ padding: 48, background: "var(--brand-primary)", borderColor: "var(--brand-primary)" }}>
            <h2 style={{ fontFamily: "Playfair Display", fontSize: "2rem", fontWeight: 700, color: "#fff", marginBottom: 16 }}>Training Initiatives</h2>
            <div style={{ color: "#a1a9b8", fontSize: "1.05rem", lineHeight: 1.8 }}>
              <p style={{ marginBottom: 16 }}>
                The Training and Placement Cell organizes regular sessions to enhance the employability of our students. We conduct:
              </p>
              <ul style={{ paddingLeft: 24, marginBottom: 16, listStyle: "none" }}>
                <li style={{ marginBottom: 8, display: "flex", alignItems: "center", gap: 8 }}><span style={{ color: "var(--brand-accent)" }}>•</span> Soft skills and communication training.</li>
                <li style={{ marginBottom: 8, display: "flex", alignItems: "center", gap: 8 }}><span style={{ color: "var(--brand-accent)" }}>•</span> Aptitude and logical reasoning workshops.</li>
                <li style={{ marginBottom: 8, display: "flex", alignItems: "center", gap: 8 }}><span style={{ color: "var(--brand-accent)" }}>•</span> Technical skill development and mock interviews.</li>
                <li style={{ marginBottom: 8, display: "flex", alignItems: "center", gap: 8 }}><span style={{ color: "var(--brand-accent)" }}>•</span> Guest lectures and seminars by industry experts.</li>
              </ul>
              <p>
                Our goal is not just to secure jobs for our students, but to prepare them for long-term career growth.
              </p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
