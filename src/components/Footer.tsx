import Link from "next/link";
import Image from "next/image";
import { MapPin, Phone, Mail } from "lucide-react";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container-site">
        <div className="footer-grid">
          {/* Brand */}
        <div>
          <Link href="/" style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
            <Image src="/images/college-logo.png" alt="SSPC Logo" width={56} height={56} style={{ borderRadius: "50%", objectFit: "cover", background: "#fff", padding: 2 }} />
            <div>
              <div style={{ fontFamily: "Playfair Display", fontWeight: 700, fontSize: "1.2rem", color: "#fff", lineHeight: 1.1 }}>
                Sri Sowdambika<br/>Polytechnic College
              </div>
            </div>
          </Link>
          <p style={{ color: "#a1a9b8", fontSize: "0.9rem", lineHeight: 1.6, marginBottom: 24 }}>
            Shaping futures through quality technical education. Approved by AICTE and affiliated to DOTE, Tamil Nadu.
          </p>
          <div style={{ display: "flex", gap: 16, color: "var(--brand-accent)" }}>
            <MapPin size={20} />
            <Phone size={20} />
            <Mail size={20} />
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <div className="footer-heading">Quick Links</div>
          {[
            { label: "Home",        href: "/" },
            { label: "Admissions",  href: "/admissions" },
            { label: "Departments", href: "/departments" },
            { label: "Gallery",     href: "/gallery" },
            { label: "Placements",  href: "/placements" },
            { label: "Alumni",      href: "/alumni" },
          ].map((l) => (
            <Link key={l.href} href={l.href} className="footer-link">{l.label}</Link>
          ))}
        </div>

        {/* Departments */}
        <div>
          <div className="footer-heading">Departments</div>
          {[
            { label: "Civil Engineering",         href: "/departments/civil-engineering" },
            { label: "EEE",                       href: "/departments/electrical-electronics" },
            { label: "ECE",                       href: "/departments/electronics-communication" },
            { label: "Information Technology",    href: "/departments/information-technology" },
            { label: "Mechanical Engineering",    href: "/departments/mechanical-engineering" },
            { label: "Textile Technology",        href: "/departments/textile-technology" },
            { label: "Refrigeration & AC",        href: "/departments/refrigeration-air-conditioning" },
          ].map((l) => (
            <Link key={l.href} href={l.href} className="footer-link">{l.label}</Link>
          ))}
        </div>

        {/* Contact */}
        <div>
          <div className="footer-heading">Contact</div>
          <div className="footer-link flex-center" style={{ justifyContent: "flex-start", gap: 8, cursor: "default" }}>
            <MapPin size={16} style={{ flexShrink: 0 }} /> Thiruchuli Road, Aruppukottai, Tamil Nadu 626101
          </div>
          <div className="footer-link flex-center" style={{ justifyContent: "flex-start", gap: 8, cursor: "default" }}>
            <Phone size={16} style={{ flexShrink: 0 }} /> 9952382574, 04566 220478, 04566 221627
          </div>
          <div className="footer-link flex-center" style={{ justifyContent: "flex-start", gap: 8, cursor: "default" }}>
            <Mail size={16} style={{ flexShrink: 0 }} /> sowdambika84@gmail.com
          </div>
          <div style={{ marginTop: 24 }}>
            <div className="footer-heading">Documents</div>
            <Link href="/documents" className="footer-link">AICTE Reports</Link>
            <Link href="/documents" className="footer-link">Mandatory Disclosure</Link>
          </div>
        </div>
      </div>
      </div>

      <div className="footer-bottom" style={{ borderTop: "1px solid rgba(255,255,255,0.1)", padding: "24px 32px", display: "flex", justifyContent: "space-between", alignItems: "center", maxWidth: 1200, margin: "0 auto" }}>
        <div className="footer-copy">
          © {new Date().getFullYear()} Sri Sowdambika Polytechnic College. All rights reserved.
        </div>
        <div className="footer-copy">
          Built by 2026 Batch
        </div>
      </div>
    </footer>
  );
}
