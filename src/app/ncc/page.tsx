import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Image from "next/image";

export const metadata: Metadata = {
  title: "NCC | SSPC",
  description: "National Cadet Corps (NCC) at Sri Sowdambika Polytechnic College.",
};

export default function NCCPage() {
  return (
    <>
      <Navbar />
      <main style={{ minHeight: "100vh" }}>
        <div className="page-header" style={{ padding: "80px 24px", background: "var(--brand-primary)", color: "#fff" }}>
          <div className="section-label" style={{ margin: "0 auto 16px", color: "var(--brand-accent)", justifyContent: "center" }}>Co-Curricular</div>
          <h1 className="section-title" style={{ color: "#fff" }}>National Cadet Corps (NCC)</h1>
          <p style={{ color: "#a1a9b8", marginTop: 16, maxWidth: 600, margin: "16px auto 0", fontSize: "1.1rem", lineHeight: 1.6 }}>
            Fostering discipline, leadership, and patriotism among the youth.
          </p>
        </div>

        <div className="container-site" style={{ padding: "80px 24px" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: 40, alignItems: "start", maxWidth: 800, margin: "0 auto" }}>
             <div>
                <h2 className="section-title" style={{ fontSize: "2rem", marginBottom: 24 }}>About NCC at SSPC</h2>
                <div style={{ color: "var(--text-secondary)", fontSize: "1.05rem", lineHeight: 1.8 }}>
                  <p style={{ marginBottom: 16 }}>
                    The National Cadet Corps (NCC) is a youth development movement. It has enormous potential for nation building. The NCC provides opportunities to the youth of the country for their all-round development with a sense of Duty, Commitment, Dedication, Discipline and Moral Values so that they become able leaders and useful citizens.
                  </p>
                  <p style={{ marginBottom: 16 }}>
                    At Sri Sowdambika Polytechnic College, our NCC unit is highly active and participates in various camps, parades, and social service activities throughout the year. Cadets are trained in drill, shooting, physical fitness, map reading, first aid, and camp training.
                  </p>
                  <ul style={{ listStylePosition: "inside", marginBottom: 16, paddingLeft: 16 }}>
                    <li>Republic Day Camp (RDC)</li>
                    <li>Combined Annual Training Camps (CATC)</li>
                    <li>National Integration Camps (NIC)</li>
                    <li>Social Service and Community Development</li>
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
