import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Management | SSPC",
  description: "Leadership and Management of Sri Sowdambika Polytechnic College.",
};

const MANAGEMENT = [
  { name: "Rajendran",         designation: "Chairman",       img: "/images/management/rajendran.jpg" },
  { name: "Vellaichamy",       designation: "Secretary",      img: "/images/management/vellaichamy.jpg" },
  { name: "Kandhavelchamy",    designation: "Principal",      img: "/images/management/kandhavelchamy.jpeg" },
  { name: "Murugesan",         designation: "Vice Principal", img: "/images/management/murugesan.jpg" },
  { name: "Devaraj",           designation: "HOD - Civil",   img: "/images/management/devaraj.jpg" },
];

export default function ManagementPage() {
  return (
    <>
      <Navbar />
      <main style={{ minHeight: "100vh" }}>
        <div className="page-header" style={{ padding: "80px 24px", background: "var(--brand-primary)", color: "#fff" }}>
          <div className="section-label" style={{ margin: "0 auto 16px", color: "var(--brand-accent)", justifyContent: "center" }}>Leadership</div>
          <h1 className="section-title" style={{ color: "#fff" }}>Our Management</h1>
          <p style={{ color: "#a1a9b8", marginTop: 16, maxWidth: 600, margin: "16px auto 0", fontSize: "1.1rem", lineHeight: 1.6 }}>
            The visionary leaders guiding Sri Sowdambika Polytechnic College towards excellence in technical education.
          </p>
        </div>

        <div className="container-site" style={{ padding: "80px 24px" }}>
          
          {/* Principal Message Section */}
          <div className="management-grid">
             <div className="glass-card" style={{ padding: 24, textAlign: "center" }}>
               <div style={{ borderRadius: "var(--radius-md)", overflow: "hidden", marginBottom: 20 }}>
                  <Image src="/images/management/kandhavelchamy.jpeg" alt="Principal" width={400} height={400} style={{ width: "100%", height: "auto", objectFit: "cover" }} />
               </div>
               <h3 style={{ fontFamily: "Playfair Display", fontSize: "1.4rem", fontWeight: 700, color: "var(--brand-primary)" }}>Mr. Kandhavelchamy</h3>
               <div style={{ color: "var(--brand-secondary)", fontSize: "0.95rem", fontWeight: 600, marginTop: 4 }}>Principal</div>
             </div>
             <div>
                <h2 className="section-title" style={{ fontSize: "2rem", marginBottom: 24 }}>Principal's Message</h2>
                <div style={{ color: "var(--text-secondary)", fontSize: "1.05rem", lineHeight: 1.8 }}>
                  <p style={{ marginBottom: 16 }}>
                    Welcome to Sri Sowdambika Polytechnic College. Since our inception in 1984, our goal has been to provide high-quality technical education that prepares our students for successful careers in an ever-evolving industrial landscape.
                  </p>
                  <p style={{ marginBottom: 16 }}>
                    We believe in holistic development, ensuring that our students not only gain technical expertise but also develop strong moral values, leadership qualities, and a sense of social responsibility. Our dedicated faculty, state-of-the-art laboratories, and robust placement training programs ensure that every student is equipped with the necessary skills to thrive.
                  </p>
                  <p>
                    I invite you to explore our campus, learn about our diverse diploma programmes, and discover how SSPC can shape your future.
                  </p>
                </div>
             </div>
          </div>
          
          <div className="divider" style={{ margin: "0 0 60px 0" }} />

          {/* Executive Members Grid */}
          <div style={{ textAlign: "center", marginBottom: 40 }}>
            <h2 className="section-title" style={{ fontSize: "2rem" }}>Executive Members</h2>
          </div>
          <div className="dept-grid">
            {MANAGEMENT.filter(m => m.designation !== "Principal").map((m, i) => (
              <div key={m.name} className="glass-card animate-fadeup" style={{ animationDelay: `${i * 0.1}s`, textAlign: "center", overflow: "hidden" }}>
                <Image
                  src={m.img}
                  alt={m.name}
                  width={300}
                  height={300}
                  style={{ width: "100%", height: 320, objectFit: "cover", objectPosition: "top", borderBottom: "1px solid var(--border-subtle)" }}
                />
                <div style={{ padding: 24 }}>
                  <div style={{ fontFamily: "Playfair Display", fontSize: "1.25rem", fontWeight: 700, color: "var(--brand-primary)" }}>{m.name}</div>
                  <div style={{ fontSize: "0.9rem", color: "var(--brand-secondary)", fontWeight: 600, marginTop: 4 }}>{m.designation}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
