import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "NSS | SSPC",
  description: "National Service Scheme (NSS) at Sri Sowdambika Polytechnic College.",
};

export default function NSSPage() {
  return (
    <>
      <Navbar />
      <main style={{ minHeight: "100vh" }}>
        <div className="page-header" style={{ padding: "80px 24px", background: "var(--brand-primary)", color: "#fff" }}>
          <div className="section-label" style={{ margin: "0 auto 16px", color: "var(--brand-accent)", justifyContent: "center" }}>Co-Curricular</div>
          <h1 className="section-title" style={{ color: "#fff" }}>National Service Scheme (NSS)</h1>
          <p style={{ color: "#a1a9b8", marginTop: 16, maxWidth: 600, margin: "16px auto 0", fontSize: "1.1rem", lineHeight: 1.6 }}>
            Not Me But You — Dedicated to social service and community development.
          </p>
        </div>

        <div className="container-site" style={{ padding: "80px 24px" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: 40, alignItems: "start", maxWidth: 800, margin: "0 auto" }}>
             <div>
                <h2 className="section-title" style={{ fontSize: "2rem", marginBottom: 24 }}>About NSS at SSPC</h2>
                <div style={{ color: "var(--text-secondary)", fontSize: "1.05rem", lineHeight: 1.8 }}>
                  <p style={{ marginBottom: 16 }}>
                    The National Service Scheme (NSS) is a Central Sector Scheme of Government of India, Ministry of Youth Affairs & Sports. It provides opportunity to the student youth of 11th & 12th Class of schools at +2 Board level and student youth of Technical Institution, Graduate & Post Graduate at colleges and University level of India to take part in various government led community service activities & programmes.
                  </p>
                  <p style={{ marginBottom: 16 }}>
                    Our NSS volunteers at SSPC actively engage in regular and special camp activities like:
                  </p>
                  <ul style={{ listStylePosition: "inside", marginBottom: 16, paddingLeft: 16 }}>
                    <li>Blood Donation Camps</li>
                    <li>Tree Plantation Drives</li>
                    <li>Health and Hygiene Awareness</li>
                    <li>Disaster Management Relief</li>
                    <li>Village Adoption and Rural Development</li>
                  </ul>
                </div>
             </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
