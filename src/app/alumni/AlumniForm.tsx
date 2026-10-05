"use client";

import { useState } from "react";
import { submitAlumniForm } from "./actions";

export default function AlumniForm() {
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");
    setErrorMsg("");
    
    try {
      const formElement = e.currentTarget;
      const formData = new FormData(formElement);
      await submitAlumniForm(formData);
      setStatus("success");
      formElement.reset();
    } catch (error: any) {
      setStatus("error");
      setErrorMsg(error.message || "Failed to submit form");
    }
  }

  if (status === "success") {
    return (
      <div style={{ padding: 32, background: "rgba(16, 185, 129, 0.1)", color: "#059669", borderRadius: "var(--radius-md)", textAlign: "center", border: "1px solid rgba(16, 185, 129, 0.2)" }}>
        <h3 style={{ fontSize: "1.2rem", fontWeight: 700, marginBottom: 8 }}>Thank You!</h3>
        <p>Your details have been successfully submitted to the alumni directory.</p>
        <button onClick={() => setStatus("idle")} className="btn-ghost" style={{ marginTop: 16 }}>Submit another</button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 16, textAlign: "left" }}>
      {status === "error" && (
        <div style={{ padding: 12, background: "rgba(239, 68, 68, 0.1)", color: "#ef4444", borderRadius: 6, fontSize: "0.9rem", fontWeight: 600 }}>
          {errorMsg}
        </div>
      )}
      
      <div>
        <label className="form-label">Full Name</label>
        <input type="text" name="name" required className="form-input" placeholder="e.g. John Doe" />
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
        <div>
          <label className="form-label">Batch (Year of Passing)</label>
          <input type="number" name="batch" required className="form-input" placeholder="e.g. 2024" min="1984" max="2030" />
        </div>
        <div>
          <label className="form-label">Department Studied</label>
          <select name="course" required className="form-select">
            <option value="">Select Department</option>
            <option value="Civil Engineering">Civil Engineering</option>
            <option value="Mechanical Engineering">Mechanical Engineering</option>
            <option value="Electrical & Electronics">Electrical & Electronics</option>
            <option value="Electronics & Communication">Electronics & Communication</option>
            <option value="Information Technology">Information Technology</option>
            <option value="Textile Technology">Textile Technology</option>
            <option value="Refrigeration & AC">Refrigeration & AC</option>
          </select>
        </div>
      </div>

      <div>
        <label className="form-label">Current Status / Occupation</label>
        <input type="text" name="currentStatus" required className="form-input" placeholder="e.g. Software Engineer at Google, or Higher Studies at MIT" />
      </div>

      <div>
        <label className="form-label">Communication Address</label>
        <textarea name="address" required className="form-textarea" placeholder="Enter your full communication address..." rows={3}></textarea>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
        <div>
          <label className="form-label">Email Address</label>
          <input type="email" name="email" required className="form-input" placeholder="john@example.com" />
        </div>
        <div>
          <label className="form-label">Phone Number</label>
          <input type="tel" name="phone" required className="form-input" placeholder="+91 9876543210" />
        </div>
      </div>

      <button type="submit" disabled={status === "submitting"} className="btn-primary" style={{ marginTop: 12 }}>
        {status === "submitting" ? "Submitting..." : "Join the Alumni Directory"}
      </button>
    </form>
  );
}
