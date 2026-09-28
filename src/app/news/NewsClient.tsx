"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Newspaper } from "lucide-react";

// Rotating fallback images for news cards when no cover is set
const FALLBACK_IMAGES = [
  "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?q=80&w=800&auto=format&fit=crop", // Campus
  "https://images.unsplash.com/photo-1532012197267-da84d127e765?q=80&w=800&auto=format&fit=crop", // Books
  "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=800&auto=format&fit=crop", // Students
  "https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?q=80&w=800&auto=format&fit=crop", // Tech
  "https://images.unsplash.com/photo-1562774053-701939374585?q=80&w=800&auto=format&fit=crop", // Library
];

export default function NewsClient() {
  const [news, setNews] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchNews() {
      try {
        const res = await fetch("/api/news?limit=20");
        const json = await res.json();
        setNews(json.items || []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    fetchNews();
  }, []);

  return (
    <main style={{ minHeight: "100vh" }}>
      <div className="page-header" style={{ padding: "80px 24px", background: "var(--brand-primary)", color: "#fff" }}>
        <div className="section-label" style={{ margin: "0 auto 16px", color: "var(--brand-accent)", justifyContent: "center" }}>Updates</div>
        <h1 className="section-title" style={{ color: "#fff" }}>News & Announcements</h1>
        <p style={{ color: "#a1a9b8", marginTop: 12, maxWidth: 600, margin: "12px auto 0" }}>
          Stay updated with the latest happenings, achievements, and announcements from our campus.
        </p>
      </div>

      <div className="container-site" style={{ padding: "60px 24px" }}>
        {loading ? (
          <div style={{ textAlign: "center", padding: "60px", color: "var(--text-muted)" }}>Loading news...</div>
        ) : news.length > 0 ? (
          <div className="news-grid">
            {news.map((item, i) => (
              <Link href={`/news/${item.id}`} key={item.id} className="news-card animate-fadeup" style={{ animationDelay: `${i * 0.05}s` }}>
                <div style={{ position: "relative", width: "100%", height: 200, overflow: "hidden", flexShrink: 0 }}>
                  <Image
                    src={item.coverMedia?.url || FALLBACK_IMAGES[i % FALLBACK_IMAGES.length]}
                    alt={item.coverMedia?.altText || item.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    style={{ objectFit: "cover", transition: "transform 0.5s ease" }}
                    className="news-card-hover-img"
                  />
                  <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(15,23,42,0.4) 0%, transparent 60%)" }} />
                  <div style={{ position: "absolute", top: 12, left: 12 }}>
                    <span style={{ background: "var(--brand-secondary)", color: "#fff", fontSize: "0.7rem", fontWeight: 800, padding: "4px 10px", borderRadius: 100, letterSpacing: "0.06em", textTransform: "uppercase" }}>
                      {item.category}
                    </span>
                  </div>
                </div>
                <div className="news-card-body">
                  <div className="news-card-cat">{item.category}</div>
                  <div className="news-card-title">{item.title}</div>
                  {item.department && <div className="news-card-dept">{item.department.name}</div>}
                  <div className="news-card-date">
                    {item.publishDate ? new Date(item.publishDate).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }) : "Recently"}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div style={{ textAlign: "center", padding: "60px", color: "var(--text-muted)" }}>
            <div style={{ display: "flex", justifyContent: "center", marginBottom: 16 }}>
              <Newspaper size={48} color="var(--border-accent)" />
            </div>
            <p>No news items found.</p>
          </div>
        )}
      </div>
    </main>
  );
}
