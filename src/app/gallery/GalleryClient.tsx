"use client";
import { useState, useEffect } from "react";
import Image from "next/image";

const CATEGORIES = [
  { id: "all",     label: "All Photos" },
  { id: "events",  label: "Events" },
  { id: "civil",   label: "Civil Engg." },
  { id: "eee",     label: "EEE" },
  { id: "ece",     label: "ECE" },
  { id: "it",      label: "Info. Tech" },
  { id: "mech",    label: "Mechanical" },
  { id: "textile", label: "Textile" },
  { id: "labs",    label: "Labs & Facilities" },
];

const ALL_IMAGES = [
  // Events
  { src: "/gallery/events/vive1.JPG",   alt: "Cultural Day 2026 — Viveka",   cat: "events",  dept: "Events",                  span: 2 },
  { src: "/gallery/events/vive2.JPG",   alt: "Cultural Day 2026 — Stage",    cat: "events",  dept: "Events",                  span: 1 },
  { src: "/gallery/events/marathon.JPG",alt: "Annual Marathon",               cat: "events",  dept: "Events",                  span: 1 },
  { src: "/gallery/events/flag.jpg",    alt: "Independence Day Flag Hoisting",cat: "events",  dept: "Events",                  span: 1 },
  { src: "/gallery/events/wallpaper.jpg",alt: "Campus Celebrations",         cat: "events",  dept: "Events",                  span: 1 },
  // Civil
  { src: "/gallery/civil/wallpaper.jpg",alt: "Civil Dept. Overview",         cat: "civil",   dept: "Civil Engineering",       span: 2 },
  { src: "/gallery/civil/civil1.JPG",   alt: "Civil Lab 1",                  cat: "civil",   dept: "Civil Engineering",       span: 1 },
  { src: "/gallery/civil/civil2.JPG",   alt: "Civil Lab 2",                  cat: "civil",   dept: "Civil Engineering",       span: 1 },
  { src: "/gallery/civil/civil3.JPG",   alt: "Civil Survey Practical",       cat: "civil",   dept: "Civil Engineering",       span: 1 },
  { src: "/gallery/civil/civil4.JPG",   alt: "Civil Students",               cat: "civil",   dept: "Civil Engineering",       span: 1 },
  { src: "/gallery/civil/civil5.JPG",   alt: "Civil Structural Lab",         cat: "civil",   dept: "Civil Engineering",       span: 1 },
  // EEE
  { src: "/gallery/eee/wallpaper.jpg",  alt: "EEE Dept. Overview",           cat: "eee",     dept: "Electrical & Electronics",span: 2 },
  { src: "/gallery/eee/EEE_1.JPG",      alt: "EEE Lab 1",                    cat: "eee",     dept: "Electrical & Electronics",span: 1 },
  { src: "/gallery/eee/EEE_2.JPG",      alt: "EEE Lab 2",                    cat: "eee",     dept: "Electrical & Electronics",span: 1 },
  { src: "/gallery/eee/EEE_3.JPG",      alt: "EEE Practical",                cat: "eee",     dept: "Electrical & Electronics",span: 1 },
  { src: "/gallery/eee/EEE_4.JPG",      alt: "EEE Circuit Lab",              cat: "eee",     dept: "Electrical & Electronics",span: 1 },
  { src: "/gallery/eee/EEE_5.JPG",      alt: "EEE Workshop",                 cat: "eee",     dept: "Electrical & Electronics",span: 1 },
  { src: "/gallery/eee/EEE_6.JPG",      alt: "EEE Students",                 cat: "eee",     dept: "Electrical & Electronics",span: 1 },
  // ECE
  { src: "/gallery/ece/wallpaper.jpg",  alt: "ECE Dept. Overview",           cat: "ece",     dept: "Electronics & Comm.",     span: 2 },
  { src: "/gallery/ece/ECE_1.JPG",      alt: "ECE Lab 1",                    cat: "ece",     dept: "Electronics & Comm.",     span: 1 },
  { src: "/gallery/ece/ECE_2.JPG",      alt: "ECE Lab 2",                    cat: "ece",     dept: "Electronics & Comm.",     span: 1 },
  { src: "/gallery/ece/ECE_3.JPG",      alt: "ECE Practical Session",        cat: "ece",     dept: "Electronics & Comm.",     span: 1 },
  { src: "/gallery/ece/ECE_4.JPG",      alt: "ECE Students",                 cat: "ece",     dept: "Electronics & Comm.",     span: 1 },
  // IT
  { src: "/gallery/information-technology/wallpaper.jpg", alt: "IT Dept. Overview", cat: "it", dept: "Information Technology", span: 2 },
  { src: "/gallery/information-technology/IT_1.JPG",      alt: "IT Lab 1",          cat: "it", dept: "Information Technology", span: 1 },
  { src: "/gallery/information-technology/IT_2.JPG",      alt: "IT Students",       cat: "it", dept: "Information Technology", span: 1 },
  { src: "/gallery/information-technology/IT_3.JPG",      alt: "IT Lab 2",          cat: "it", dept: "Information Technology", span: 1 },
  { src: "/gallery/information-technology/IT_4.JPG",      alt: "IT Classroom",      cat: "it", dept: "Information Technology", span: 1 },
  // Mechanical
  { src: "/gallery/mech/wallpaper.jpg", alt: "Mech Dept. Overview",          cat: "mech",    dept: "Mechanical Engineering",  span: 2 },
  { src: "/gallery/mech/mech1.JPG",     alt: "Mechanical Lab 1",             cat: "mech",    dept: "Mechanical Engineering",  span: 1 },
  { src: "/gallery/mech/mech2.JPG",     alt: "Mechanical Lab 2",             cat: "mech",    dept: "Mechanical Engineering",  span: 1 },
  { src: "/gallery/mech/mech3.JPG",     alt: "Lathe Machine",                cat: "mech",    dept: "Mechanical Engineering",  span: 1 },
  { src: "/gallery/mech/mech4.JPG",     alt: "Workshop 1",                   cat: "mech",    dept: "Mechanical Engineering",  span: 1 },
  { src: "/gallery/mech/mech5.JPG",     alt: "Workshop 2",                   cat: "mech",    dept: "Mechanical Engineering",  span: 1 },
  { src: "/gallery/mech/mech6.JPG",     alt: "Mechanical Students",          cat: "mech",    dept: "Mechanical Engineering",  span: 1 },
  // Textile
  { src: "/gallery/textile/wallpaper.jpg",  alt: "Textile Dept. Overview",   cat: "textile", dept: "Textile Technology",      span: 2 },
  { src: "/gallery/textile/textile_1.JPG",  alt: "Textile Lab 1",            cat: "textile", dept: "Textile Technology",      span: 1 },
  { src: "/gallery/textile/textile_2.JPG",  alt: "Textile Lab 2",            cat: "textile", dept: "Textile Technology",      span: 1 },
  { src: "/gallery/textile/textile_3.JPG",  alt: "Textile Weaving",          cat: "textile", dept: "Textile Technology",      span: 1 },
  { src: "/gallery/textile/textile_4.JPG",  alt: "Textile Students",         cat: "textile", dept: "Textile Technology",      span: 1 },
  { src: "/gallery/textile/textile_5.JPG",  alt: "Textile Machine 1",        cat: "textile", dept: "Textile Technology",      span: 1 },
  { src: "/gallery/textile/textile_6.JPG",  alt: "Textile Machine 2",        cat: "textile", dept: "Textile Technology",      span: 1 },
  // Labs & Facilities
  { src: "/gallery/chemistry/chemistry1.jpg", alt: "Chemistry Lab",          cat: "labs",    dept: "Science & Humanities",    span: 1 },
  { src: "/gallery/chemistry/chemistry2.jpg", alt: "Chemistry Lab 2",        cat: "labs",    dept: "Science & Humanities",    span: 1 },
  { src: "/gallery/physics/physics1.jpg",     alt: "Physics Lab",            cat: "labs",    dept: "Science & Humanities",    span: 1 },
  { src: "/gallery/physics/physics2.jpg",     alt: "Physics Lab 2",          cat: "labs",    dept: "Science & Humanities",    span: 1 },
  { src: "/gallery/physics/physics3.jpg",     alt: "Physics Instruments",    cat: "labs",    dept: "Science & Humanities",    span: 1 },
  { src: "/gallery/workshop/workshop1.jpg",   alt: "Workshop 1",             cat: "labs",    dept: "Workshop",                span: 1 },
  { src: "/gallery/workshop/workshop2.jpg",   alt: "Workshop 2",             cat: "labs",    dept: "Workshop",                span: 1 },
  { src: "/gallery/1st_year/wallpaper.jpg",   alt: "First Year",             cat: "labs",    dept: "First Year",              span: 2 },
  { src: "/gallery/hostel/wallpaper.png",     alt: "Hostel Block",           cat: "labs",    dept: "Hostel & Facilities",     span: 1 },
  { src: "/gallery/hostel/wallpaper2.jpg",    alt: "Hostel Grounds",         cat: "labs",    dept: "Hostel & Facilities",     span: 1 },
];

const VIDEOS = [
  { src: "/gallery/information-technology/IT_lab.mp4", poster: "/gallery/information-technology/IT_1.JPG",  title: "IT Department Lab Tour",        dept: "Information Technology" },
  { src: "/gallery/eee/EEE_lab.mp4",                   poster: "/gallery/eee/EEE_1.JPG",                    title: "EEE Department Lab Tour",       dept: "Electrical & Electronics" },
  { src: "/gallery/ece/ECE_lab.mp4",                   poster: "/gallery/ece/ECE_1.JPG",                    title: "ECE Department Lab Tour",       dept: "Electronics & Comm." },
  { src: "/gallery/mech/mech_lab.mp4",                 poster: "/gallery/mech/mech1.JPG",                   title: "Mechanical Workshop Tour",      dept: "Mechanical Engineering" },
  { src: "/gallery/textile/textile_lab.mp4",           poster: "/gallery/textile/textile_1.JPG",            title: "Textile Department Lab Tour",   dept: "Textile Technology" },
  { src: "/gallery/civil/civil_video.mp4",             poster: "/gallery/civil/civil1.JPG",                 title: "Civil Department Lab Tour",     dept: "Civil Engineering" },
  { src: "/gallery/first_year.mp4",                    poster: "/gallery/1st_year/wallpaper.jpg",           title: "First Year Orientation",        dept: "First Year" },
  { src: "/gallery/hostel/hostel.mp4",                 poster: "/gallery/hostel/wallpaper2.jpg",            title: "Hostel & Campus Facilities",    dept: "Student Facilities" },
];

export default function GalleryClient() {
  const [filter, setFilter]     = useState("all");
  const [lightbox, setLightbox] = useState<{ src: string; alt: string } | null>(null);
  const [tab, setTab]           = useState<"photos" | "videos">("photos");

  const filtered = filter === "all" ? ALL_IMAGES : ALL_IMAGES.filter(i => i.cat === filter);

  // Close lightbox on Escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") setLightbox(null); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  return (
    <main style={{ minHeight: "100vh" }}>
      {/* Hero Header */}
      <div style={{ background: "var(--brand-primary)", color: "#fff", padding: "80px 24px 0", textAlign: "center" }}>
        <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(201,168,76,0.15)", color: "var(--brand-accent)", border: "1px solid rgba(201,168,76,0.3)", fontSize: "0.78rem", fontWeight: 700, letterSpacing: "0.1em", padding: "6px 16px", borderRadius: 100, marginBottom: 24 }}>
          CAMPUS LIFE
        </div>
        <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(2rem, 5vw, 3.2rem)", fontWeight: 800, marginBottom: 16, lineHeight: 1.1 }}>
          Photo & Video Gallery
        </h1>
        <p style={{ color: "rgba(255,255,255,0.65)", maxWidth: 560, margin: "0 auto 40px", fontSize: "1.05rem", lineHeight: 1.65 }}>
          Moments from our classrooms, labs, events and campus life — a glimpse into life at SSPC.
        </p>

        {/* Tabs */}
        <div style={{ display: "inline-flex", background: "rgba(255,255,255,0.08)", borderRadius: 8, padding: 4, gap: 4 }}>
          {(["photos", "videos"] as const).map(t => (
            <button key={t} onClick={() => setTab(t)} style={{
              padding: "10px 32px", borderRadius: 6, border: "none", fontWeight: 700, fontSize: "0.9rem",
              cursor: "pointer", transition: "all 0.2s",
              background: tab === t ? "#fff" : "transparent",
              color: tab === t ? "var(--brand-primary)" : "rgba(255,255,255,0.65)",
            }}>
              {t === "photos" ? "📷 Photos" : "🎬 Videos"}
            </button>
          ))}
        </div>
        <div style={{ height: 1, background: "rgba(255,255,255,0.08)", marginTop: 40 }} />
      </div>

      <div className="container-site" style={{ padding: "48px 32px" }}>

        {tab === "photos" ? (
          <>
            {/* Filter Pills */}
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 40 }}>
              {CATEGORIES.map(cat => (
                <button key={cat.id} onClick={() => setFilter(cat.id)} style={{
                  fontFamily: "Inter, sans-serif", fontSize: "0.82rem", fontWeight: 600,
                  padding: "8px 20px", borderRadius: 100, border: "1.5px solid",
                  borderColor: filter === cat.id ? "var(--brand-primary)" : "var(--border-subtle)",
                  background: filter === cat.id ? "var(--brand-primary)" : "#fff",
                  color: filter === cat.id ? "#fff" : "var(--text-secondary)",
                  cursor: "pointer", transition: "all 0.2s ease",
                  boxShadow: filter === cat.id ? "0 4px 12px rgba(26,39,68,0.2)" : "none",
                }}>
                  {cat.label}
                </button>
              ))}
            </div>

            {/* Count */}
            <p style={{ color: "var(--text-muted)", fontSize: "0.9rem", marginBottom: 28, fontWeight: 500 }}>
              {filtered.length} photo{filtered.length !== 1 ? "s" : ""}
            </p>

            {/* Masonry Grid */}
            <div style={{
              display: "grid",
              gridTemplateColumns: "repeat(4, 1fr)",
              gap: 12,
              alignItems: "start",
            }}>
              {filtered.map((img, i) => (
                <div
                  key={i}
                  onClick={() => setLightbox({ src: img.src, alt: img.alt })}
                  style={{
                    gridColumn: img.span > 1 ? `span ${Math.min(img.span, 2)}` : "span 1",
                    position: "relative",
                    overflow: "hidden",
                    borderRadius: 12,
                    cursor: "pointer",
                    aspectRatio: img.span > 1 ? "16/9" : "4/3",
                    background: "var(--bg-offset)",
                    border: "1px solid var(--border-subtle)",
                    boxShadow: "var(--shadow-sm)",
                  }}
                >
                  <Image
                    src={img.src}
                    alt={img.alt}
                    fill
                    sizes="(max-width: 768px) 50vw, 25vw"
                    style={{ objectFit: "cover", transition: "transform 0.5s cubic-bezier(0.16,1,0.3,1)" }}
                    className="gallery-zoom-img"
                  />
                  {/* Overlay */}
                  <div className="gallery-overlay" style={{
                    position: "absolute", inset: 0,
                    background: "linear-gradient(to top, rgba(15,23,42,0.85) 0%, rgba(15,23,42,0.1) 60%, transparent 100%)",
                    opacity: 0, transition: "opacity 0.3s ease",
                    display: "flex", alignItems: "flex-end", padding: "16px",
                  }}>
                    <div>
                      <div style={{ fontSize: "0.92rem", fontWeight: 700, color: "#fff", marginBottom: 2 }}>{img.alt}</div>
                      <div style={{ fontSize: "0.72rem", color: "var(--brand-accent)", fontWeight: 600, letterSpacing: "0.04em" }}>{img.dept}</div>
                    </div>
                    <div style={{ marginLeft: "auto", background: "rgba(255,255,255,0.15)", backdropFilter: "blur(8px)", borderRadius: "50%", width: 36, height: 36, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                      <svg width="16" height="16" fill="none" stroke="#fff" strokeWidth="2" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607zM10.5 7.5v6m3-3h-6" />
                      </svg>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {filtered.length === 0 && (
              <div style={{ textAlign: "center", padding: "80px 24px", color: "var(--text-muted)" }}>
                <svg width="48" height="48" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" style={{ margin: "0 auto 16px", display: "block" }}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                </svg>
                <p style={{ fontWeight: 600 }}>No photos in this category yet.</p>
              </div>
            )}
          </>
        ) : (
          /* Videos Grid */
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(340px, 1fr))", gap: 24 }}>
            {VIDEOS.map((v, i) => (
              <div key={i} style={{ background: "#fff", border: "1px solid var(--border-subtle)", borderRadius: 12, overflow: "hidden", boxShadow: "var(--shadow-sm)", transition: "box-shadow 0.25s" }}>
                <div style={{ position: "relative", aspectRatio: "16/9", background: "#000" }}>
                  <video
                    src={v.src}
                    controls
                    preload="metadata"
                    poster={v.poster}
                    style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                  />
                </div>
                <div style={{ padding: "18px 20px" }}>
                  <div style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700, color: "var(--brand-primary)", fontSize: "1.05rem", marginBottom: 4 }}>{v.title}</div>
                  <div style={{ fontSize: "0.78rem", color: "var(--brand-secondary)", fontWeight: 700, letterSpacing: "0.04em", textTransform: "uppercase" }}>{v.dept}</div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Lightbox */}
      {lightbox && (
        <div
          onClick={() => setLightbox(null)}
          style={{
            position: "fixed", inset: 0, zIndex: 10000,
            background: "rgba(0,0,0,0.92)", backdropFilter: "blur(12px)",
            display: "flex", alignItems: "center", justifyContent: "center", padding: 24,
          }}
        >
          <button
            onClick={() => setLightbox(null)}
            style={{
              position: "absolute", top: 24, right: 24,
              background: "rgba(255,255,255,0.1)", border: "none",
              color: "#fff", width: 44, height: 44, borderRadius: "50%",
              fontSize: "1.2rem", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center",
              backdropFilter: "blur(8px)",
            }}
          >✕</button>
          <div onClick={e => e.stopPropagation()} style={{ position: "relative", maxWidth: "90vw", maxHeight: "85vh" }}>
            <Image
              src={lightbox.src}
              alt={lightbox.alt}
              width={1400}
              height={900}
              style={{ maxWidth: "90vw", maxHeight: "85vh", objectFit: "contain", borderRadius: 8 }}
            />
            <div style={{ marginTop: 16, textAlign: "center", color: "rgba(255,255,255,0.8)", fontSize: "0.95rem", fontWeight: 600 }}>
              {lightbox.alt}
            </div>
          </div>
        </div>
      )}

      <style>{`
        .gallery-zoom-img:hover { transform: scale(1.06); }
        div:hover > .gallery-overlay { opacity: 1 !important; }
        @media (max-width: 900px) { 
          .gallery-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (max-width: 560px) { 
          .gallery-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </main>
  );
}
