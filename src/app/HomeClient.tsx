"use client";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { 
  Building2, Zap, Radio, Laptop, Settings, Scissors, 
  Users, Trophy, Briefcase, Calendar, Newspaper, 
  GraduationCap, Mic, Palette, Award, PlayCircle, MapPin
} from "lucide-react";

/* ── Hero images from legacy gallery ───────────────────────────────────────── */
const HERO_SLIDES = [
  { src: "/gallery/civil/civil1.JPG", alt: "Civil Engineering Campus" },
  { src: "/gallery/eee/EEE_1.JPG", alt: "EEE Laboratory" },
  { src: "/gallery/information-technology/IT_1.JPG", alt: "IT Students" },
  { src: "/gallery/ece/ECE_1.JPG", alt: "Electronics and Communication" },
];

/* ── Departments ────────────────────────────────────────────────────────────── */
const DEPARTMENTS = [
  { name: "Civil Engineering",         slug: "civil-engineering",         icon: <Building2 size={28}/>, code: "CE" },
  { name: "Electrical & Electronics",  slug: "electrical-electronics",    icon: <Zap size={28}/>, code: "EEE" },
  { name: "Electronics Communication", slug: "electronics-communication", icon: <Radio size={28}/>, code: "ECE" },
  { name: "Information Technology",    slug: "information-technology",    icon: <Laptop size={28}/>, code: "IT" },
  { name: "Mechanical Engineering",    slug: "mechanical-engineering",    icon: <Settings size={28}/>, code: "MECH" },
  { name: "Textile Technology",        slug: "textile-technology",        icon: <Scissors size={28}/>, code: "TEXT" },
];

/* ── News & Events (static seed from legacy DB) ─────────────────────────────── */
const NEWS_ITEMS = [
  { id: 1, title: "Enrolling New Faculty Members for Textile Technology", category: "Administrative", dept: "Textile Technology", date: "Mar 25, 2026", img: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?q=80&w=800&auto=format&fit=crop" },
  { id: 2, title: "State Rank Holder — IT Student Scores O Grade in All 8 Subjects", category: "Achievements",    dept: "Information Technology", date: "Apr 17, 2024", img: "https://images.unsplash.com/photo-1532012197267-da84d127e765?q=80&w=800&auto=format&fit=crop" },
  { id: 3, title: "Amazing Placements — New Companies for IT Department", category: "Placements",      dept: "Information Technology", date: "Mar 31, 2026", img: "https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?q=80&w=800&auto=format&fit=crop" },
  { id: 4, title: "Runner Up at International Kabaddi Competition",        category: "Achievements",    dept: "EEE",                    date: "Mar 20, 2026", img: "https://images.unsplash.com/photo-1528605248644-14dd04022da1?q=80&w=800&auto=format&fit=crop" },
  { id: 5, title: "Semester Exams Starting March 23 Onwards",            category: "Announcements",   dept: "Management",             date: "Mar 23, 2026", img: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=800&auto=format&fit=crop" },
  { id: 6, title: "New Linux Laboratory Under Construction for IT Dept",  category: "Infrastructure",  dept: "Information Technology", date: "Jun 6, 2026",  img: "https://images.unsplash.com/photo-1562774053-701939374585?q=80&w=800&auto=format&fit=crop" },
];

const EVENTS_ITEMS = [
  { id: 1, title: "Admissions Open — Batch 2026–2029",    category: "Admission",  date: "Mar 1, 2026",  dept: "Management",             img: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=800&auto=format&fit=crop" },
  { id: 2, title: "Graduation Ceremony 2023–2026 Batch",  category: "Graduation", date: "Mar 24, 2026", dept: "Management",             img: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=800&auto=format&fit=crop" },
  { id: 3, title: "IT Department Seminar",                 category: "Seminar",    date: "Mar 10, 2026", dept: "Information Technology", img: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=800&auto=format&fit=crop" },
  { id: 4, title: "Cultural Day — Open to All",           category: "Cultural",   date: "Mar 28, 2026", dept: "Management",             img: "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?q=80&w=800&auto=format&fit=crop" },
  { id: 5, title: "Republic Day Sports Day",              category: "Sports",     date: "Jan 26, 2026", dept: "Management",             img: "https://images.unsplash.com/photo-1528605248644-14dd04022da1?q=80&w=800&auto=format&fit=crop" },
  { id: 6, title: "Mega Workshop — Mechanical Engineering", category: "Workshop", date: "Jun 10, 2026", dept: "Mechanical Engineering", img: "https://images.unsplash.com/photo-1511578314322-379a191f63bc?q=80&w=800&auto=format&fit=crop" },
];

/* ── Gallery images ─────────────────────────────────────────────────────────── */
const GALLERY_IMAGES = [
  { src: "/gallery/information-technology/IT_1.JPG",  alt: "IT Lab", dept: "IT" },
  { src: "/gallery/information-technology/IT_2.JPG",  alt: "IT Students", dept: "IT" },
  { src: "/gallery/events/vive1.JPG",                 alt: "College Event", dept: "Events" },
  { src: "/gallery/events/marathon.JPG",              alt: "Marathon", dept: "Events" },
  { src: "/gallery/events/vive2.JPG",                 alt: "Cultural Event", dept: "Events" },
  { src: "/gallery/information-technology/IT_3.JPG",  alt: "IT Department", dept: "IT" },
  { src: "/gallery/information-technology/IT_4.JPG",  alt: "IT Classroom", dept: "IT" },
  { src: "/gallery/events/flag.jpg",                  alt: "Flag Hoisting", dept: "Events" },
];

/* ── Management ─────────────────────────────────────────────────────────────── */
const MANAGEMENT = [
  { name: "Rajendran",         designation: "Chairman",       img: "/images/management/rajendran.jpg" },
  { name: "Vellaichamy",       designation: "Secretary",      img: "/images/management/vellaichamy.jpg" },
  { name: "Kandhavelchamy",    designation: "Principal",      img: "/images/management/kandhavelchamy.jpeg" },
  { name: "Murugesan",         designation: "Vice Principal", img: "/images/management/murugesan.jpg" },
  { name: "Devaraj",           designation: "HOD - Civil",   img: "/images/management/devaraj.jpg" },
];

/* ── Companies / Recruiters ─────────────────────────────────────────────────── */
const COMPANIES = [
  "Infosys", "TCS", "Wipro", "HCL", "Tech Mahindra",
  "Turbo Energies", "MEINE Electric", "Mustard Fashion",
  "College of Engineering Guindy", "BHEL", "TNEB", "L&T",
];

export default function HomeClient() {
  const [heroIdx, setHeroIdx]       = useState(0);
  const [activeTab, setActiveTab]   = useState<"news" | "events">("news");
  const [lightboxSrc, setLightbox]  = useState<string | null>(null);
  const [eventsOpen, setEventsOpen] = useState(false);
  const heroTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  /* ── Hero auto-slide ────────────────────────────────────────────────────── */
  useEffect(() => {
    heroTimer.current = setTimeout(() => {
      setHeroIdx((i) => (i + 1) % HERO_SLIDES.length);
    }, 5000);
    return () => {
      if (heroTimer.current) clearTimeout(heroTimer.current);
    };
  }, [heroIdx]);

  /* ── Counter animation ──────────────────────────────────────────────────── */
  useEffect(() => {
    const counters = document.querySelectorAll<HTMLElement>("[data-count]");
    counters.forEach((el) => {
      const target = parseInt(el.dataset.count ?? "0");
      let current = 0;
      const step = Math.ceil(target / 50);
      const interval = setInterval(() => {
        current = Math.min(current + step, target);
        el.textContent = current + (el.dataset.suffix ?? "");
        if (current >= target) clearInterval(interval);
      }, 30);
    });
  }, []);

  const items = activeTab === "news" ? NEWS_ITEMS : EVENTS_ITEMS;

  return (
    <main>
      {/* ── Hero ──────────────────────────────────────────────────────────── */}
      <section className="hero">
        <div className="hero-content">
          <div className="hero-text-content">
            <div className="animate-fadeup">
              <div className="hero-badge">
                AICTE Approved · Estd. 1984
              </div>
            </div>
            <h1 className="hero-title animate-fadeup" style={{ animationDelay: "0.1s" }}>
              Sri Sowdambika<br />
              <span className="accent">Polytechnic</span> College
            </h1>
            <p className="hero-subtitle animate-fadeup" style={{ animationDelay: "0.2s" }}>
              Empowering students with industry-ready diploma education in
              Engineering & Technology since 1984 — Virudhunagar, Tamil Nadu.
            </p>
            <div className="animate-fadeup" style={{ display: "flex", gap: 16, animationDelay: "0.3s" }}>
              <Link href="/admissions/enquiry" className="btn-primary">
                Apply for Admission
              </Link>
              <Link href="/departments" className="btn-ghost">
                Explore Departments
              </Link>
            </div>

            {/* Floating stats */}
            <div className="hero-stats animate-fadeup" style={{ animationDelay: "0.4s" }}>
              {[
                { num: "30+", label: "Years of Excellence" },
                { num: "6",   label: "Core Departments" },
                { num: "100%",label: "Placement Assistance" },
              ].map((s) => (
                <div key={s.label}>
                  <div className="hero-stat-num">{s.num}</div>
                  <div className="hero-stat-label">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="hero-bg-slider">
          <div className="hero-mask" />
          {HERO_SLIDES.map((slide, i) => (
            <div
              key={i}
              className={`hero-slide${i === heroIdx ? " active" : ""}`}
              style={{ backgroundImage: `url(${slide.src})` }}
            />
          ))}
        </div>
      </section>

      {/* ── About Section ─────────────────────────────────────────────────── */}
      <section className="about-section section-pad" style={{ background: "#fff" }}>
        <div className="container-site">
          <div className="about-grid">
            <div className="animate-fadein">
              <Image
                src="/images/college-building.jpg"
                alt="SSPC College Building"
                width={600}
                height={440}
                className="about-image"
                style={{ objectFit: "cover" }}
              />
            </div>
            <div className="animate-fadeup">
              <div className="section-label">About SSPC</div>
              <h2 className="section-title" style={{ marginBottom: "1rem" }}>
                Shaping Engineers<br />Since <span style={{ color: "var(--brand-accent)" }}>1984</span>
              </h2>
              <p className="section-subtitle" style={{ marginBottom: "1.5rem" }}>
                Sri Sowdambika Polytechnic College is an AICTE-approved institution committed to
                providing industry-aligned diploma education. Our mission: build technically skilled,
                ethically grounded, and socially responsible graduates ready for tomorrow's challenges.
              </p>
              <p style={{ color: "var(--text-muted)", lineHeight: 1.85, fontSize: "0.95rem" }}>
                With 6 diverse departments, experienced faculty, state-of-the-art laboratories,
                and an active placement cell, SSPC bridges the gap between education and industry.
                Located in Virudhunagar, Tamil Nadu — serving students from across the region.
              </p>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginTop: 32 }}>
                {[
                  { num: "100%", label: "AICTE Approved" },
                  { num: "30+",  label: "Expert Faculty" },
                ].map((f) => (
                  <div key={f.label} className="about-fact-card">
                    <div className="about-fact-num">{f.num}</div>
                    <div className="about-fact-label">{f.label}</div>
                  </div>
                ))}
              </div>

              <div style={{ display: "flex", gap: 16, marginTop: 32 }}>
                <Link href="/admissions" className="btn-primary">Apply Now</Link>
                <a href="/documents/mandatory_disclosure.pdf" target="_blank" className="btn-ghost">
                  Mandatory Disclosure
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="divider" />

      {/* ── Departments ───────────────────────────────────────────────────── */}
      <section className="departments-section section-pad">
        <div className="container-site">
          <div style={{ textAlign: "center", marginBottom: 32 }}>
            <div className="section-label flex-center">Academic Programmes</div>
            <h2 className="section-title">Our Departments</h2>
            <p className="section-subtitle" style={{ margin: "16px auto 0" }}>
              Six AICTE-approved diploma programmes designed for modern industry needs.
            </p>
          </div>

          <div className="dept-grid">
            {DEPARTMENTS.map((dept, i) => (
              <Link href={`/departments/${dept.slug}`} key={dept.slug} className="dept-card animate-fadeup" style={{ animationDelay: `${i * 0.05}s` }}>
                <div className="dept-card-img-wrap">
                  <Image
                    src={`/gallery/${dept.slug === 'civil-engineering' ? 'civil/civil1' : dept.slug === 'electrical-electronics' ? 'eee/EEE_1' : dept.slug === 'electronics-communication' ? 'ece/ECE_1' : dept.slug === 'mechanical-engineering' ? 'mech/mech1' : dept.slug === 'textile-technology' ? 'textile/textile_1' : 'information-technology/IT_1'}.JPG`}
                    alt={dept.name}
                    width={400}
                    height={200}
                    className="dept-card-img"
                  />
                </div>
                <div className="dept-card-body">
                  <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 12, color: "var(--brand-secondary)" }}>
                    {dept.icon}
                    <div className="dept-name" style={{ margin: 0 }}>{dept.name}</div>
                  </div>
                  <div className="dept-code">DIPLOMA IN {dept.code}</div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── News & Events ─────────────────────────────────────────────────── */}
      <section className="news-events-section section-pad" style={{ background: "#fff" }}>
        <div className="container-site">
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: 20, marginBottom: 40 }}>
            <div>
              <div className="section-label">Updates</div>
              <h2 className="section-title">News &amp; Events</h2>
            </div>
            <div style={{ display: "flex", gap: 8 }}>
              <button className={`btn-${activeTab === "news" ? "primary" : "ghost"}`} onClick={() => setActiveTab("news")}>Latest News</button>
              <button className={`btn-${activeTab === "events" ? "primary" : "ghost"}`} onClick={() => setActiveTab("events")}>Events</button>
            </div>
          </div>

          <div className="news-grid">
            {items.map((item, i) => (
              <div key={item.id} className="news-card animate-fadeup" style={{ animationDelay: `${i * 0.05}s` }}>
                <div style={{ position: "relative", width: "100%", height: 200, overflow: "hidden", flexShrink: 0 }}>
                  <Image
                    src={item.img}
                    alt={item.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    style={{ objectFit: "cover", transition: "transform 0.5s ease" }}
                    className="news-card-hover-img"
                  />
                  <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(15,23,42,0.4) 0%, transparent 60%)" }} />
                </div>
                <div className="news-card-body">
                  <div className="news-card-cat">{item.category}</div>
                  <div className="news-card-title">{item.title}</div>
                  <div style={{ fontSize: "0.85rem", color: "var(--brand-secondary)", fontWeight: 600 }}>{item.dept}</div>
                  <div className="news-card-date">{item.date}</div>
                </div>
              </div>
            ))}
          </div>
          <div style={{ textAlign: "center", marginTop: 40 }}>
            <Link href={activeTab === "news" ? "/news" : "/events"} className="btn-ghost">
              View All {activeTab === "news" ? "News" : "Events"}
            </Link>
          </div>
        </div>
      </section>

      <div className="divider" />

      {/* ── Gallery ───────────────────────────────────────────────────────── */}
      <section className="gallery-section section-pad">
        <div className="container-site">
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: 20, marginBottom: 48 }}>
            <div>
              <div className="section-label">✦ Campus Life</div>
              <h2 className="section-title">Gallery</h2>
            </div>
            <Link href="/gallery" className="btn-ghost">View All →</Link>
          </div>

          <div className="gallery-masonry" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 20, gridAutoRows: 250 }}>
            {GALLERY_IMAGES.map((img, i) => (
              <div key={i} className="gallery-item animate-fadein" style={{ animationDelay: `${i * 0.07}s`, position: "relative", overflow: "hidden", borderRadius: "var(--radius-md)", cursor: "pointer", gridRow: i % 3 === 0 ? "span 2" : "span 1" }} onClick={() => setLightbox(img.src)}>
                <Image src={img.src} alt={img.alt} width={600} height={600} style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform 0.5s ease" }} className="hover-scale" />
                <div className="gallery-item-overlay" style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(0,33,71,0.8), transparent)", display: "flex", alignItems: "flex-end", padding: 20, opacity: 0, transition: "opacity 0.3s" }}>
                  <span style={{ fontSize: "0.95rem", fontWeight: 700, color: "#fff", letterSpacing: "0.05em", textTransform: "uppercase" }}>{img.dept}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="divider" />

      {/* ── Placements ────────────────────────────────────────────────────── */}
      <section className="placements-section section-pad">
        <div className="container-site">
          <div style={{ textAlign: "center", marginBottom: 32 }}>
            <div className="section-label flex-center">Career Success</div>
            <h2 className="section-title">Our Recruiters</h2>
          </div>

          {/* Placement stats */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 30, marginBottom: 48 }}>
            {[
              { num: "95%", label: "Placement Rate" },
              { num: "50+", label: "Companies" },
              { num: "₹3L+",label: "Avg Package" },
            ].map((s) => (
              <div key={s.label} className="glass-card" style={{ padding: 32, textAlign: "center" }}>
                <div style={{ fontFamily: "Playfair Display", fontSize: "2.5rem", fontWeight: 700, color: "var(--brand-secondary)" }}>{s.num}</div>
                <div style={{ fontSize: "0.9rem", color: "var(--text-secondary)", fontWeight: 600, textTransform: "uppercase", marginTop: 8 }}>{s.label}</div>
              </div>
            ))}
          </div>

          {/* Ticker of company names */}
          <div className="company-ticker">
            <div className="ticker-track">
              {[...COMPANIES, ...COMPANIES].map((name, i) => (
                <div key={i} className="company-name-pill">{name}</div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <div className="divider" />

      {/* ── Management ────────────────────────────────────────────────────── */}
      <section className="management-section section-pad" style={{ background: "#fff" }}>
        <div className="container-site">
          <div style={{ textAlign: "center", marginBottom: 32 }}>
            <div className="section-label flex-center">Leadership</div>
            <h2 className="section-title">Our Management</h2>
          </div>

          <div className="dept-grid">
            {MANAGEMENT.slice(0,3).map((m, i) => (
              <div key={m.name} className="glass-card animate-fadeup" style={{ animationDelay: `${i * 0.1}s`, textAlign: "center", overflow: "hidden" }}>
                <Image
                  src={m.img}
                  alt={m.name}
                  width={300}
                  height={300}
                  style={{ width: "100%", height: 280, objectFit: "cover", objectPosition: "top", borderBottom: "1px solid var(--border-subtle)" }}
                />
                <div style={{ padding: 24 }}>
                  <div style={{ fontFamily: "Playfair Display", fontSize: "1.25rem", fontWeight: 700, color: "var(--brand-primary)" }}>{m.name}</div>
                  <div style={{ fontSize: "0.9rem", color: "var(--brand-secondary)", fontWeight: 600, marginTop: 4 }}>{m.designation}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Enquiry CTA ───────────────────────────────────────────────────── */}
      <section style={{ background: "var(--brand-primary)", padding: "100px 24px", textAlign: "center", color: "#fff" }}>
        <div style={{ maxWidth: 600, margin: "0 auto" }}>
          <div className="section-label flex-center" style={{ color: "var(--brand-accent)" }}>Join Us</div>
          <h2 className="section-title" style={{ marginBottom: 16, color: "#fff" }}>
            Start Your Journey at SSPC
          </h2>
          <p style={{ color: "#a1a9b8", fontSize: "1.1rem", lineHeight: 1.7, marginBottom: 40 }}>
            Admissions are open for the 2026–2027 batch. Fill in your enquiry and our
            team will get back to you within 24 hours.
          </p>
          <div style={{ display: "flex", gap: 16, justifyContent: "center" }}>
            <Link href="/admissions/enquiry" className="btn-primary" style={{ background: "var(--brand-accent)", borderColor: "var(--brand-accent)", color: "var(--brand-primary)" }}>
              Submit Enquiry
            </Link>
            <Link href="/admissions" className="btn-ghost" style={{ borderColor: "rgba(255,255,255,0.3)", color: "#fff" }}>
              View Admissions
            </Link>
          </div>
        </div>
      </section>

      {/* ── Lightbox ─────────────────────────────────────────────────────── */}
      {lightboxSrc && (
        <div className="lightbox open" onClick={() => setLightbox(null)}>
          <button className="lightbox-close" onClick={() => setLightbox(null)}>✕</button>
          <Image src={lightboxSrc} alt="Gallery" width={900} height={600} className="lightbox-img" style={{ maxWidth: "90vw", maxHeight: "85vh", objectFit: "contain" }} />
        </div>
      )}

      {/* ── Upcoming Events Widget ───────────────────────────────────────── */}
      <div className={`glass-card events-widget${eventsOpen ? " open" : ""}`} style={{ position: "fixed", bottom: 96, right: 24, zIndex: 9998, width: 320, padding: 24, transform: eventsOpen ? "translateY(0)" : "translateY(20px)", opacity: eventsOpen ? 1 : 0, pointerEvents: eventsOpen ? "all" : "none" }}>
        <div style={{ fontFamily: "Playfair Display", fontSize: "1.1rem", fontWeight: 700, color: "var(--brand-primary)", marginBottom: 16 }}>Upcoming Events</div>
        {EVENTS_ITEMS.slice(0, 3).map((e) => (
          <div key={e.id} style={{ padding: "12px 0", borderBottom: "1px solid var(--border-subtle)" }}>
            <div style={{ fontSize: "0.9rem", fontWeight: 600, color: "var(--text-primary)" }}>{e.title}</div>
            <div style={{ fontSize: "0.8rem", color: "var(--brand-secondary)", marginTop: 4 }}>{e.date}</div>
          </div>
        ))}
        <Link href="/events" className="btn-ghost" style={{ width: "100%", marginTop: 16 }}>
          See All Events
        </Link>
      </div>

      {/* ── FAB: Chatbot / Events Toggle ────────────────────────────────── */}
      <button
        onClick={() => setEventsOpen((v) => !v)}
        title="View Upcoming Events"
        style={{
          position: "fixed", bottom: 24, right: 24, zIndex: 9999,
          width: 56, height: 56, background: "var(--brand-secondary)", color: "#fff",
          borderRadius: "50%", border: "none", display: "flex", alignItems: "center", justifyContent: "center",
          boxShadow: "var(--shadow-card)", cursor: "pointer", transition: "var(--transition)"
        }}
      >
        {eventsOpen ? <Settings /> : <Calendar />}
      </button>
    </main>
  );
}
