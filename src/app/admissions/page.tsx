import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Admissions | SSPC",
  description: "Information regarding admissions, eligibility criteria, and application process at Sri Sowdambika Polytechnic College.",
};

export default function AdmissionsPage() {
  return (
    <>
      <Navbar />
      <main style={{ minHeight: "100vh" }}>
        {/* Header */}
        <div className="page-header" style={{ padding: "80px 24px", background: "var(--brand-primary)", color: "#fff" }}>
          <div className="section-label" style={{ margin: "0 auto 16px", color: "var(--brand-accent)", justifyContent: "center" }}>Admissions 2026–2027</div>
          <h1 className="section-title" style={{ color: "#fff" }}>Join Sri Sowdambika Polytechnic</h1>
          <p style={{ color: "#a1a9b8", marginTop: 16, maxWidth: 600, margin: "16px auto 0", fontSize: "1.1rem", lineHeight: 1.6 }}>
            Take the first step towards a successful career in engineering and technology. We welcome students who are passionate about learning and innovation.
          </p>
          <div style={{ marginTop: 32, display: "flex", justifyContent: "center" }}>
            <Link href="/admissions/enquiry" className="btn-primary" style={{ background: "var(--brand-accent)", borderColor: "var(--brand-accent)", color: "var(--brand-primary)" }}>
              Submit Admission Enquiry
            </Link>
          </div>
        </div>

        <div className="container-site" style={{ padding: "80px 24px" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 60, alignItems: "start" }}>
            
            <div>
              <h2 className="section-title" style={{ fontSize: "2rem", marginBottom: 32 }}>Eligibility Criteria</h2>
              
              <div className="glass-card" style={{ padding: 32, marginBottom: 24 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 16 }}>
                  <div style={{ width: 48, height: 48, borderRadius: 12, background: "var(--bg-offset)", color: "var(--brand-primary)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.5rem", fontWeight: 700 }}>
                    1
                  </div>
                  <h3 style={{ fontFamily: "Playfair Display", fontSize: "1.2rem", fontWeight: 700, color: "var(--brand-primary)" }}>First Year Diploma</h3>
                </div>
                <p style={{ color: "var(--text-secondary)", lineHeight: 1.7, marginBottom: 16 }}>
                  Candidates must have passed the 10th Standard (SSLC) Examination conducted by the Board of Secondary Education, Tamil Nadu, or any other equivalent examination recognized by the Board of Secondary Education.
                </p>
                <ul style={{ color: "var(--text-muted)", paddingLeft: 24, lineHeight: 1.6, fontSize: "0.9rem" }}>
                  <li style={{ marginBottom: 8 }}>Minimum pass marks in all subjects is required.</li>
                  <li style={{ marginBottom: 8 }}>No upper age limit for admission.</li>
                </ul>
              </div>

              <div className="glass-card" style={{ padding: 32, marginBottom: 24 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 16 }}>
                  <div style={{ width: 48, height: 48, borderRadius: 12, background: "rgba(240,167,66,0.1)", color: "var(--brand-accent)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.5rem", fontWeight: 700 }}>
                    2
                  </div>
                  <h3 style={{ fontFamily: "Playfair Display", fontSize: "1.2rem", fontWeight: 700, color: "var(--brand-primary)" }}>Direct Second Year (Lateral Entry)</h3>
                </div>
                <p style={{ color: "var(--text-secondary)", lineHeight: 1.7, marginBottom: 16 }}>
                  Candidates who have passed the Higher Secondary Examination (HSC / 12th) Academic or Vocational, or 10th + 2 years ITI, are eligible for direct admission to the second year of the Diploma programme.
                </p>
                <ul style={{ color: "var(--text-muted)", paddingLeft: 24, lineHeight: 1.6, fontSize: "0.9rem" }}>
                  <li style={{ marginBottom: 8 }}>HSC Academic: Maths, Physics, Chemistry must be studied.</li>
                  <li style={{ marginBottom: 8 }}>HSC Vocational: Related vocational subjects.</li>
                </ul>
              </div>
            </div>

            <div>
              <div style={{ position: "sticky", top: 120 }}>
                <h2 className="section-title" style={{ fontSize: "2rem", marginBottom: 32 }}>Required Documents</h2>
                <div className="glass-card" style={{ padding: 32 }}>
                  <p style={{ color: "var(--text-secondary)", marginBottom: 24, lineHeight: 1.6 }}>
                    Please bring the original and 3 sets of photocopies of the following documents at the time of admission:
                  </p>
                  <ul style={{ color: "var(--text-primary)", lineHeight: 1.8, paddingLeft: 20 }}>
                    <li style={{ marginBottom: 12 }}>10th / 12th / ITI Mark Sheets</li>
                    <li style={{ marginBottom: 12 }}>Transfer Certificate (TC)</li>
                    <li style={{ marginBottom: 12 }}>Community Certificate</li>
                    <li style={{ marginBottom: 12 }}>Aadhaar Card Copy</li>
                    <li style={{ marginBottom: 12 }}>Recent Passport Size Photographs (5 Nos)</li>
                    <li style={{ marginBottom: 12 }}>First Graduate Certificate (if applicable)</li>
                    <li style={{ marginBottom: 12 }}>Income Certificate (if applicable)</li>
                  </ul>

                  <div style={{ marginTop: 32, padding: 24, background: "var(--brand-primary)", borderRadius: "var(--radius-md)" }}>
                    <h4 style={{ fontFamily: "Playfair Display", fontWeight: 700, marginBottom: 8, color: "#fff", fontSize: "1.1rem" }}>Need Help?</h4>
                    <p style={{ color: "#a1a9b8", fontSize: "0.9rem", marginBottom: 16 }}>Contact our admission cell for guidance and support.</p>
                    <div style={{ display: "flex", gap: 12, alignItems: "center", color: "var(--brand-accent)", fontWeight: 600 }}>
                      +91 94440 XXXXX
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
