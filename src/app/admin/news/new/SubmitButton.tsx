"use client";

import { useFormStatus } from "react-dom";
import { Save } from "lucide-react";

export function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button type="submit" className="btn-primary" disabled={pending} style={{ display: "flex", alignItems: "center", gap: 8 }}>
      <Save size={18} /> {pending ? "Saving..." : "Save News"}
    </button>
  );
}
