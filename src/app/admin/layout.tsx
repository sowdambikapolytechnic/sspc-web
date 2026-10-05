import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import { SignOutButton } from "@/components/SignOutButton";
import { LayoutDashboard, Newspaper, CalendarDays, Images, LogOut, Users, Home, GraduationCap, FileText } from "lucide-react";

export const metadata = {
  title: "Admin Dashboard - SSPC",
};

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  if (!session) {
    redirect("/login");
  }

  return (
    <div style={{ display: "flex", minHeight: "100vh", background: "var(--bg-offset)" }}>
      {/* Sidebar */}
      <aside style={{ width: 280, background: "var(--brand-deep)", color: "#fff", display: "flex", flexDirection: "column" }}>
        <div style={{ padding: "32px 24px", borderBottom: "1px solid rgba(255,255,255,0.1)" }}>
          <h2 style={{ fontFamily: "Playfair Display", fontSize: "1.4rem", fontWeight: 700, margin: 0, color: "var(--brand-accent)" }}>
            SSPC Admin
          </h2>
          <div style={{ fontSize: "0.85rem", color: "var(--text-muted)", marginTop: 4 }}>Control Panel</div>
        </div>

        <nav style={{ padding: 24, flex: 1, display: "flex", flexDirection: "column", gap: 8 }}>
          <Link href="/admin" className="admin-nav-link" style={{ display: "flex", alignItems: "center", gap: 12, padding: "12px 16px", borderRadius: 8, color: "var(--text-secondary)", textDecoration: "none" }}>
            <LayoutDashboard size={20} /> Dashboard
          </Link>
          <Link href="/admin/news" className="admin-nav-link" style={{ display: "flex", alignItems: "center", gap: 12, padding: "12px 16px", borderRadius: 8, color: "var(--text-secondary)", textDecoration: "none" }}>
            <Newspaper size={20} /> News & Updates
          </Link>
          <Link href="/admin/events" className="admin-nav-link" style={{ display: "flex", alignItems: "center", gap: 12, padding: "12px 16px", borderRadius: 8, color: "var(--text-secondary)", textDecoration: "none" }}>
            <CalendarDays size={20} /> Events
          </Link>
          <Link href="/admin/enquiries" className="admin-nav-link" style={{ display: "flex", alignItems: "center", gap: 12, padding: "12px 16px", borderRadius: 8, color: "var(--text-secondary)", textDecoration: "none" }}>
            <Users size={20} /> Enquiries
          </Link>
          <Link href="/admin/gallery" className="admin-nav-link" style={{ display: "flex", alignItems: "center", gap: 12, padding: "12px 16px", borderRadius: 8, color: "var(--text-secondary)", textDecoration: "none" }}>
            <Images size={20} /> Gallery
          </Link>
          <Link href="/admin/alumni" className="admin-nav-link" style={{ display: "flex", alignItems: "center", gap: 12, padding: "12px 16px", borderRadius: 8, color: "var(--text-secondary)", textDecoration: "none" }}>
            <GraduationCap size={20} /> Alumni
          </Link>
          <Link href="/admin/documents" className="admin-nav-link" style={{ display: "flex", alignItems: "center", gap: 12, padding: "12px 16px", borderRadius: 8, color: "var(--text-secondary)", textDecoration: "none" }}>
            <FileText size={20} /> Documents
          </Link>
          <div style={{ margin: "16px 0", height: 1, background: "rgba(255,255,255,0.1)" }}></div>
          <Link href="/" target="_blank" className="admin-nav-link" style={{ display: "flex", alignItems: "center", gap: 12, padding: "12px 16px", borderRadius: 8, color: "var(--brand-secondary)", textDecoration: "none" }}>
            <Home size={20} /> View Public Site
          </Link>
        </nav>

        <div style={{ padding: 24, borderTop: "1px solid rgba(255,255,255,0.1)" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
            <div style={{ width: 32, height: 32, borderRadius: "50%", background: "var(--brand-accent)", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--brand-primary)", fontWeight: 700 }}>
              A
            </div>
            <div>
              <div style={{ fontSize: "0.9rem", fontWeight: 600 }}>{session.user?.name || "Admin"}</div>
            </div>
          </div>
          <SignOutButton />
        </div>
      </aside>

      {/* Main Content */}
      <main style={{ flex: 1, padding: 40, overflowY: "auto" }}>
        {children}
      </main>
    </div>
  );
}
