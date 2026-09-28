"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Calendar } from "lucide-react";

const FALLBACK_IMAGES = [
  "https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=800&auto=format&fit=crop", // Seminar
  "https://images.unsplash.com/photo-1511578314322-379a191f63bc?q=80&w=800&auto=format&fit=crop", // Conference/Crowd
  "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?q=80&w=800&auto=format&fit=crop", // Event/Audience
  "https://images.unsplash.com/photo-1528605248644-14dd04022da1?q=80&w=800&auto=format&fit=crop", // Sports/Outdoor
  "https://images.unsplash.com/photo-1551818255-e6e10975bc17?q=80&w=800&auto=format&fit=crop", // Tech Meetup
];

export default function EventsClient() {
  const [events, setEvents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchEvents() {
      try {
        const res = await fetch("/api/events?limit=20");
        const json = await res.json();
        setEvents(json.items || []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    fetchEvents();
  }, []);

  return (
    <main style={{ minHeight: "100vh" }}>
      <div className="page-header" style={{ padding: "80px 24px", background: "var(--brand-primary)", color: "#fff" }}>
        <div className="section-label" style={{ margin: "0 auto 16px", color: "var(--brand-accent)", justifyContent: "center" }}>Happenings</div>
        <h1 className="section-title" style={{ color: "#fff" }}>Events</h1>
        <p style={{ color: "#a1a9b8", marginTop: 12, maxWidth: 600, margin: "12px auto 0" }}>
          Upcoming schedules and past highlights of events at SSPC.
        </p>
      </div>

      <div className="container-site" style={{ padding: "60px 24px" }}>
        {loading ? (
          <div style={{ textAlign: "center", padding: "60px", color: "var(--text-muted)" }}>Loading events...</div>
        ) : events.length > 0 ? (
          <div className="news-grid">
            {events.map((item, i) => (
              <Link href={`/events/${item.id}`} key={item.id} className="news-card animate-fadeup" style={{ animationDelay: `${i * 0.05}s` }}>
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
                    <span style={{ background: "rgba(201,168,76,0.9)", color: "#111", fontSize: "0.7rem", fontWeight: 800, padding: "4px 10px", borderRadius: 100, letterSpacing: "0.06em" }}>
                      {item.category}
                    </span>
                  </div>
                </div>
                <div className="news-card-body">
                  <div className="news-card-cat">{item.category}</div>
                  <div className="news-card-title">{item.title}</div>
                  {item.department && <div className="news-card-dept">{item.department.name}</div>}
                  <div className="news-card-date">
                    {item.eventDate ? new Date(item.eventDate).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }) : "TBA"}
                    {item.location && ` • ${item.location}`}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div style={{ textAlign: "center", padding: "60px", color: "var(--text-muted)" }}>
            <div style={{ display: "flex", justifyContent: "center", marginBottom: 16 }}>
              <Calendar size={48} color="var(--border-accent)" />
            </div>
            <p>No upcoming events currently scheduled.</p>
          </div>
        )}
      </div>
    </main>
  );
}
