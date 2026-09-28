"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

const NAV_ITEMS = [
  { label: "Home", href: "/" },
  {
    label: "Departments",
    href: "/departments",
    children: [
      { label: "Civil Engineering",          href: "/departments/civil-engineering" },
      { label: "Electrical & Electronics",   href: "/departments/electrical-electronics" },
      { label: "Electronics Communication",  href: "/departments/electronics-communication" },
      { label: "Information Technology",     href: "/departments/information-technology" },
      { label: "Mechanical Engineering",     href: "/departments/mechanical-engineering" },
      { label: "Textile Technology",         href: "/departments/textile-technology" },
    ],
  },
  { label: "Admissions", href: "/admissions" },
  { label: "News",       href: "/news" },
  { label: "Events",     href: "/events" },
  { label: "Gallery",    href: "/gallery" },
  { label: "Placements", href: "/placements" },
  {
    label: "About",
    href: "#",
    children: [
      { label: "Management",    href: "/management" },
      { label: "NCC",           href: "/ncc" },
      { label: "NSS",           href: "/nss" },
      { label: "AICTE Reports", href: "/documents" },
      { label: "Alumni",        href: "/alumni" },
    ],
  },
  { label: "Contact", href: "/contact" },
  { label: "Admin Panel", href: "/admin" },
];

export default function Navbar() {
  const [scrolled, setScrolled]   = useState(false);
  const [mobileOpen, setMobile]   = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      {/* Announcement bar */}
      <div className="announcement-bar">
        <div className="announcement-label">Latest</div>
        <div className="announcement-ticker">
          <span className="announcement-track">
            Admissions Open 2026–2027 — Apply Now &nbsp;|&nbsp;
            State Rank in IT Department &nbsp;|&nbsp;
            Placement Drive — Major companies visiting campus &nbsp;|&nbsp;
            AICTE EOA Report 2026 available for download &nbsp;|&nbsp;
            Cultural Day — March 28th 2026 &nbsp;|&nbsp;
            Semester Exams from March 23 onwards &nbsp;&nbsp;
            Admissions Open 2026–2027 — Apply Now &nbsp;|&nbsp;
            State Rank in IT Department &nbsp;|&nbsp;
            Placement Drive — Major companies visiting campus
          </span>
        </div>
      </div>

      <nav className={`navbar${scrolled ? " scrolled" : ""}`}>
        <div className="nav-inner">
          {/* Logo */}
          <Link href="/" className="nav-logo">
            <Image src="/images/college-logo.png" alt="SSPC Logo" width={48} height={48} style={{ borderRadius: "50%", objectFit: "cover" }} />
            <div>
              <div className="nav-logo-text">Sri Sowdambika</div>
              <div className="nav-logo-sub">Polytechnic College</div>
            </div>
          </Link>

          {/* Desktop links */}
          <ul className="nav-links">
            {NAV_ITEMS.map((item) =>
              item.children ? (
                <li key={item.label} className="nav-dropdown">
                  <span className="nav-link" style={{ cursor: "pointer" }}>
                    {item.label} ▾
                  </span>
                  <div className="nav-dropdown-menu">
                    {item.children.map((c) => (
                      <Link key={c.href} href={c.href} className="nav-dropdown-item">
                        {c.label}
                      </Link>
                    ))}
                  </div>
                </li>
              ) : (
                <li key={item.label}>
                  <Link href={item.href} className="nav-link">{item.label}</Link>
                </li>
              )
            )}
          </ul>

          {/* CTA + Hamburger */}
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <Link href="/admissions/enquiry" className="nav-cta">
              Apply Now
            </Link>
            <button
              className="nav-hamburger"
              aria-label="Toggle menu"
              onClick={() => setMobile((v) => !v)}
            >
              <span style={{ display: "block", height: 2, width: 24, background: "var(--brand-primary)", transition: "0.25s", transform: mobileOpen ? "rotate(45deg) translate(5px,5px)" : undefined }} />
              <span style={{ display: "block", height: 2, width: 24, background: "var(--brand-primary)", transition: "0.25s", opacity: mobileOpen ? 0 : 1 }} />
              <span style={{ display: "block", height: 2, width: 24, background: "var(--brand-primary)", transition: "0.25s", transform: mobileOpen ? "rotate(-45deg) translate(6px,-6px)" : undefined }} />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile menu */}
      <div className="nav-mobile" style={{ display: mobileOpen ? "flex" : "none", position: "fixed", top: 116, left: 0, right: 0, background: "#fff", zIndex: 8999, flexDirection: "column", padding: "20px 24px", borderBottom: "1px solid var(--border-subtle)", boxShadow: "var(--shadow-card)", overflowY: "auto", maxHeight: "calc(100vh - 116px)" }}>
        {NAV_ITEMS.map((item) =>
          item.children ? (
            <div key={item.label} style={{ marginBottom: 16 }}>
              <div style={{ color: "var(--brand-primary)", fontSize: "0.9rem", fontWeight: 700, marginBottom: 8 }}>
                {item.label}
              </div>
              {item.children.map((c) => (
                <Link key={c.href} href={c.href} className="nav-mobile-link" style={{ paddingLeft: 28 }} onClick={() => setMobile(false)}>
                  {c.label}
                </Link>
              ))}
            </div>
          ) : (
            <Link key={item.label} href={item.href} className="nav-mobile-link" onClick={() => setMobile(false)}>
              {item.label}
            </Link>
          )
        )}
        <Link href="/admissions/enquiry" className="btn-primary" style={{ marginTop: 12 }} onClick={() => setMobile(false)}>
          Apply Now →
        </Link>
      </div>
    </>
  );
}
