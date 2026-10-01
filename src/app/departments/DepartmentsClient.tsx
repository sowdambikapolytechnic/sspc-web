"use client";
import Link from "next/link";
import Image from "next/image";
import { Building2, Zap, Radio, Laptop, Settings, Scissors, Wind } from "lucide-react";

const DEPARTMENTS = [
  { name: "Civil Engineering",         slug: "civil-engineering",         icon: <Building2 size={24} />, code: "CE",   desc: "Build the future with core civil engineering principles, structural design, and construction management.", img: "/gallery/civil/civil_1.JPG" },
  { name: "Electrical & Electronics",  slug: "electrical-electronics",    icon: <Zap size={24} />, code: "EEE",  desc: "Master the fundamentals of power systems, electrical machines, and modern electronics.", img: "/gallery/eee/eee_1.JPG" },
  { name: "Electronics Communication", slug: "electronics-communication", icon: <Radio size={24} />, code: "ECE",  desc: "Dive into telecommunications, embedded systems, and cutting-edge electronic circuit design.", img: "/gallery/ece/ece_1.JPG" },
  { name: "Information Technology",    slug: "information-technology",    icon: <Laptop size={24} />, code: "IT",   desc: "Become a software expert with our comprehensive curriculum in programming, networking, and web development.", img: "/gallery/information-technology/IT_1.JPG" },
  { name: "Mechanical Engineering",    slug: "mechanical-engineering",    icon: <Settings size={24} />, code: "MECH", desc: "Design, analyze, and manufacture mechanical systems for diverse industrial applications.", img: "/gallery/mech/mech_1.JPG" },
  { name: "Textile Technology",        slug: "textile-technology",        icon: <Scissors size={24} />, code: "TEXT", desc: "Learn the science and engineering behind modern textile manufacturing and processing.", img: "/gallery/textile/textile_1.JPG" },
  { name: "Refrigeration & AC",        slug: "refrigeration-air-conditioning", icon: <Wind size={24} />, code: "R&AC", desc: "Master the principles of heating, ventilation, air conditioning, and refrigeration systems.", img: "/gallery/mech/mech1.JPG" },
];

export default function DepartmentsClient() {
  return (
    <main style={{ minHeight: "100vh" }}>
      {/* Header */}
      <div className="page-header">
        <div className="section-label">Academics</div>
        <h1 className="section-title">Our Departments</h1>
        <p className="section-subtitle" style={{ margin: "12px auto 0" }}>
          We offer 6 AICTE-approved diploma programmes designed to equip you with the practical skills and theoretical knowledge needed for industry success.
        </p>
      </div>

      <div className="container-site" style={{ padding: "60px 24px" }}>
        <div className="dept-grid">
          {DEPARTMENTS.map((dept, i) => (
            <Link href={`/departments/${dept.slug}`} key={dept.slug} className="dept-card animate-fadeup" style={{ animationDelay: `${i * 0.05}s` }}>
              <div style={{ position: "relative", width: "100%", height: 240, overflow: "hidden" }}>
                <Image
                  src={dept.img}
                  alt={dept.name}
                  fill
                  className="dept-card-img"
                  style={{ objectFit: "cover" }}
                />
              </div>
              <div className="dept-card-body" style={{ flex: 1, display: "flex", flexDirection: "column" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 12, color: "var(--brand-secondary)" }}>
                  {dept.icon}
                  <div>
                    <div className="dept-name" style={{ fontSize: "1.1rem", margin: 0 }}>{dept.name}</div>
                    <div className="dept-code">DIPLOMA IN {dept.code}</div>
                  </div>
                </div>
                <p style={{ color: "var(--text-muted)", fontSize: "0.85rem", lineHeight: 1.6, flex: 1 }}>{dept.desc}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
