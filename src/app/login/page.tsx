"use client";
import { signIn } from "next-auth/react";
import { useState } from "react";
import { Lock } from "lucide-react";
import { useRouter } from "next/navigation";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (res?.error) {
        setError("Invalid email or password");
      } else {
        router.push("/admin");
      }
    } catch (err) {
      setError("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "var(--brand-deep)", padding: 24 }}>
      <div className="glass-card" style={{ width: "100%", maxWidth: 400, padding: 40, background: "#fff", borderRadius: "var(--radius-lg)" }}>
        <div style={{ display: "flex", justifyContent: "center", marginBottom: 24, color: "var(--brand-primary)" }}>
          <Lock size={48} />
        </div>
        <h1 style={{ fontFamily: "Playfair Display", fontSize: "1.8rem", fontWeight: 700, textAlign: "center", marginBottom: 8, color: "var(--brand-primary)" }}>
          Admin Login
        </h1>
        <p style={{ textAlign: "center", color: "var(--text-secondary)", marginBottom: 32 }}>Sign in to the SSPC Admin Panel</p>

        {error && (
          <div style={{ background: "#fef2f2", color: "#ef4444", padding: "12px 16px", borderRadius: 8, marginBottom: 24, fontSize: "0.9rem", border: "1px solid #fca5a5" }}>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="form-group" style={{ marginBottom: 20 }}>
            <label className="form-label">Email</label>
            <input
              type="email"
              required
              className="form-input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter email address"
            />
          </div>
          <div className="form-group" style={{ marginBottom: 32 }}>
            <label className="form-label">Password</label>
            <input
              type="password"
              required
              className="form-input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
            />
          </div>
          <button type="submit" className="btn-primary" disabled={loading} style={{ width: "100%", justifyContent: "center" }}>
            {loading ? "Signing In..." : "Sign In"}
          </button>
        </form>
      </div>
    </div>
  );
}
