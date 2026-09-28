"use client";
import { signOut } from "next-auth/react";
import { LogOut } from "lucide-react";

export function SignOutButton() {
  return (
    <button 
      onClick={() => signOut({ callbackUrl: "/login" })} 
      style={{ display: "flex", alignItems: "center", gap: 8, color: "#ef4444", background: "transparent", border: "none", padding: 0, fontSize: "0.9rem", fontWeight: 600, cursor: "pointer" }}
    >
      <LogOut size={16} /> Sign Out
    </button>
  );
}
