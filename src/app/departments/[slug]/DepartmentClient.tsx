"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Building2, Zap, Radio, Laptop, Settings, Scissors, Microscope, User } from "lucide-react";

// Mock content based on legacy structure. In a full DB implementation, this could be fetched.
const DEPT_DATA: Record<string, any> = {
  "information-technology": {
    name: "Information Technology",
    code: "IT",
    icon: <Laptop size={48} />,
    hod: "Ms. S. Anitha",
    img: "/gallery/information-technology/IT_1.JPG",
    desc: "The Department of Information Technology was established with a vision to develop quality IT professionals who can meet the dynamic needs of the industry. We provide a strong foundation in computer science principles and hands-on experience with modern software development practices.",
    vision: "To be a center of excellence in Information Technology education, creating innovative and ethically strong professionals.",
    mission: [
      "To provide quality education through practical and theoretical knowledge.",
      "To foster a culture of innovation and continuous learning.",
      "To build strong industry-institute interaction.",
    ],
    labs: [
      "Programming Lab", "Web Technology Lab", "Networking Lab", "Multimedia Lab"
    ]
  },
  "civil-engineering": {
    name: "Civil Engineering",
    code: "CE",
    icon: <Building2 size={48} />,
    hod: "Mr. P. Devaraj",
    img: "/gallery/civil/civil1.JPG",
    desc: "The Civil Engineering department is dedicated to producing skilled engineers capable of designing, building, and maintaining our physical and naturally built environment.",
    vision: "To develop highly competent civil engineers who can contribute to sustainable infrastructure development.",
    mission: [
      "To impart strong fundamental knowledge in civil engineering.",
      "To encourage hands-on training and fieldwork.",
      "To instill professional ethics and environmental awareness.",
    ],
    labs: [
      "Surveying Lab", "Material Testing Lab", "Hydraulics Lab", "CAD Lab"
    ]
  },
  "electrical-electronics": {
    name: "Electrical & Electronics",
    code: "EEE",
    icon: <Zap size={48} />,
    hod: "Mr. R. Karthik",
    img: "/gallery/eee/EEE_1.JPG",
    desc: "The EEE department focuses on the practical application of electricity, electronics, and electromagnetism. Students learn to design and manage complex electrical systems.",
    vision: "To empower students with advanced knowledge in electrical and electronics engineering to meet global challenges.",
    mission: [
      "To provide excellent academic environment and modern laboratory facilities.",
      "To bridge the gap between academia and industry through practical training.",
    ],
    labs: [
      "Electrical Machines Lab", "Power Electronics Lab", "Control Systems Lab", "Wiring Lab"
    ]
  },
  "electronics-communication": {
    name: "Electronics Communication",
    code: "ECE",
    icon: <Radio size={48} />,
    hod: "Mrs. K. Priya",
    img: "/gallery/ece/ECE_1.JPG",
    desc: "The ECE department equips students with skills in telecommunications, microprocessors, and modern electronic circuit design, preparing them for the fast-paced tech industry.",
    vision: "To be a leading center for education and innovation in electronics and communication engineering.",
    mission: [
      "To offer high-quality education covering core and advanced topics.",
      "To develop problem-solving skills through practical exposure.",
    ],
    labs: [
      "Electronic Devices Lab", "Microprocessor Lab", "Communication Systems Lab", "VLSI Lab"
    ]
  },
  "mechanical-engineering": {
    name: "Mechanical Engineering",
    code: "MECH",
    icon: <Settings size={48} />,
    hod: "Mr. S. Ramesh",
    img: "/gallery/mech/mech1.JPG",
    desc: "Mechanical Engineering provides a solid foundation in mechanics, thermodynamics, and manufacturing processes. We train students to design and analyze mechanical systems.",
    vision: "To produce mechanical engineers who are technically sound, innovative, and socially responsible.",
    mission: [
      "To deliver comprehensive education in mechanical engineering principles.",
      "To provide hands-on experience with modern machinery and tools.",
    ],
    labs: [
      "Lathe & Drilling Lab", "Thermal Engineering Lab", "Fluid Mechanics Lab", "CAD/CAM Lab"
    ]
  },
  "textile-technology": {
    name: "Textile Technology",
    code: "TEXT",
    icon: <Scissors size={48} />,
    hod: "Dr. M. Lakshmi",
    img: "/gallery/textile/textile_1.JPG",
    desc: "Textile Technology is a unique program covering the science and engineering of textile manufacturing, from fiber production to fabric finishing and garment design.",
    vision: "To be a premier department in textile technology education, catering to the needs of the textile and apparel industry.",
    mission: [
      "To impart in-depth knowledge of textile processes and materials.",
      "To foster industry partnerships for practical training and placements.",
    ],
    labs: [
      "Spinning Lab", "Weaving Lab", "Textile Testing Lab", "Garment Construction Lab"
    ]
  }
};

export default function DepartmentClient({ slug }: { slug: string }) {
  const data = DEPT_DATA[slug];
  const [news, setNews] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch recent news for this department from our API
  useEffect(() => {
    async function fetchNews() {
      try {
        const res = await fetch(`/api/news?limit=3`);
        const json = await res.json();
        // In a real app, we'd filter by departmentId, but for now we just show latest news
        setNews(json.items || []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    fetchNews();
  }, [slug]);

  if (!data) return null;

  return (
    <main style={{ minHeight: "100vh" }}>
      {/* Header */}
      <div className="page-header" style={{ padding: "80px 24px", textAlign: "left", background: "var(--brand-primary)", color: "#fff" }}>
        <div className="container-site" style={{ position: "relative", zIndex: 1, display: "flex", alignItems: "center", gap: 32, flexWrap: "wrap" }}>
          <div style={{ flex: "1 1 500px" }}>
            <Link href="/departments" className="section-label" style={{ marginBottom: 24, cursor: "pointer", color: "var(--brand-accent)", justifyContent: "flex-start" }}>← All Departments</Link>
            <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 16 }}>
              <div style={{ color: "var(--brand-accent)" }}>{data.icon}</div>
              <h1 className="section-title" style={{ fontSize: "clamp(2rem, 4vw, 3.5rem)", color: "#fff" }}>{data.name}</h1>
            </div>
            <div style={{ display: "inline-block", background: "var(--brand-accent)", color: "#fff", padding: "6px 16px", borderRadius: 50, fontSize: "0.8rem", fontWeight: 700, letterSpacing: "0.1em", marginBottom: 24 }}>
              DIPLOMA IN {data.code}
            </div>
            <p style={{ color: "var(--text-secondary)", fontSize: "1.1rem", lineHeight: 1.7, maxWidth: 600 }}>
              {data.desc}
            </p>
          </div>
          <div style={{ flex: "1 1 400px" }}>
            <div style={{ position: "relative", width: "100%", height: 360, borderRadius: "var(--radius-md)", overflow: "hidden", border: "1px solid rgba(255,255,255,0.1)", boxShadow: "var(--shadow-lg)" }}>
               {/* Fallback styling just in case the legacy image doesn't exist */}
              <div style={{ position: "absolute", inset: 0, background: "var(--brand-primary)", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--brand-accent)" }}>{data.icon}</div>
              <img src={data.img} alt={data.name} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", zIndex: 1 }} />
            </div>
          </div>
        </div>
      </div>

      <div className="container-site" style={{ padding: "60px 24px" }}>
        <div className="content-sidebar-grid">
          
          {/* Main Content */}
          <div>
            <h2 className="section-title" style={{ fontSize: "2rem", marginBottom: 24 }}>Vision & Mission</h2>
            
            <div className="glass-card" style={{ padding: 32, marginBottom: 24, borderLeft: "4px solid var(--brand-secondary)" }}>
              <h3 style={{ fontFamily: "Playfair Display", fontSize: "1.4rem", fontWeight: 700, marginBottom: 12, color: "var(--brand-secondary)" }}>Vision</h3>
              <p style={{ color: "var(--text-secondary)", lineHeight: 1.7 }}>{data.vision}</p>
            </div>

            <div className="glass-card" style={{ padding: 32, marginBottom: 48, borderLeft: "4px solid var(--brand-accent)" }}>
              <h3 style={{ fontFamily: "Playfair Display", fontSize: "1.4rem", fontWeight: 700, marginBottom: 16, color: "var(--brand-accent)" }}>Mission</h3>
              <ul style={{ color: "var(--text-secondary)", lineHeight: 1.7, paddingLeft: 20 }}>
                {data.mission.map((m: string, i: number) => (
                  <li key={i} style={{ marginBottom: 8 }}>{m}</li>
                ))}
              </ul>
            </div>

            <h2 className="section-title" style={{ fontSize: "2rem", marginBottom: 24 }}>Laboratory Facilities</h2>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 48 }}>
              {data.labs.map((lab: string, i: number) => (
                <div key={i} className="glass-card" style={{ padding: 20, display: "flex", alignItems: "center", gap: 12 }}>
                  <div style={{ color: "var(--brand-secondary)" }}><Microscope size={20} /></div>
                  <div style={{ fontWeight: 600 }}>{lab}</div>
                </div>
              ))}
            </div>

            <h2 className="section-title" style={{ fontSize: "2rem", marginBottom: 24 }}>Department News</h2>
            {loading ? (
              <div style={{ color: "var(--text-muted)" }}>Loading news...</div>
            ) : news.length > 0 ? (
              <div style={{ display: "grid", gap: 16 }}>
                {news.map((item) => (
                  <Link href={`/news/${item.id}`} key={item.id} className="glass-card" style={{ padding: 24, display: "flex", gap: 20, alignItems: "center" }}>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: "0.75rem", color: "var(--brand-secondary)", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: 8 }}>{item.category}</div>
                      <h4 style={{ fontFamily: "Playfair Display", fontSize: "1.1rem", fontWeight: 700, marginBottom: 8, color: "var(--brand-primary)" }}>{item.title}</h4>
                      <div style={{ fontSize: "0.8rem", color: "var(--text-muted)" }}>
                        {new Date(item.publishDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                      </div>
                    </div>
                    <div style={{ color: "var(--text-muted)" }}>→</div>
                  </Link>
                ))}
              </div>
            ) : (
              <p style={{ color: "var(--text-muted)" }}>No recent news for this department.</p>
            )}
          </div>

          {/* Sidebar */}
          <div style={{ position: "sticky", top: 120 }}>
            <div className="glass-card" style={{ padding: 32, textAlign: "center", marginBottom: 24 }}>
              <div style={{ width: 80, height: 80, borderRadius: "50%", background: "var(--bg-offset)", margin: "0 auto 16px", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--brand-secondary)" }}>
                <User size={40} />
              </div>
              <h3 style={{ fontFamily: "Playfair Display", fontSize: "1.2rem", fontWeight: 700, marginBottom: 4, color: "var(--brand-primary)" }}>{data.hod}</h3>
              <div style={{ fontSize: "0.85rem", color: "var(--brand-secondary)", fontWeight: 600, marginBottom: 16 }}>Head of Department</div>
              <p style={{ fontSize: "0.85rem", color: "var(--text-muted)", lineHeight: 1.6 }}>
                Committed to guiding students towards academic and professional excellence.
              </p>
            </div>

            <div className="glass-card" style={{ padding: 32, background: "var(--brand-primary)", borderColor: "var(--brand-primary)" }}>
              <h3 style={{ fontFamily: "Playfair Display", fontSize: "1.2rem", fontWeight: 700, marginBottom: 12, color: "#fff" }}>Ready to join?</h3>
              <p style={{ fontSize: "0.9rem", color: "#a1a9b8", lineHeight: 1.6, marginBottom: 20 }}>
                Admissions for the {data.name} programme are currently open for the 2026-2027 academic year.
              </p>
              <Link href={`/admissions/enquiry?course=${data.name}`} className="btn-primary" style={{ width: "100%", justifyContent: "center" }}>
                Apply Now →
              </Link>
            </div>
          </div>

        </div>
      </div>
    </main>
  );
}
