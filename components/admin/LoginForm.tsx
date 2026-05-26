"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      if (!res.ok) {
        const data = await res.json();
        setError(data.error || "Invalid credentials");
        return;
      }
      router.refresh();
    } catch {
      setError("Connection error. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={{ minHeight: "100vh", background: "var(--background)", display: "flex", alignItems: "center", justifyContent: "center", padding: 16 }}>
      <div style={{ width: "100%", maxWidth: 340 }}>
        <div style={{ textAlign: "center", marginBottom: 28 }}>
          <h1 style={{ fontSize: 22, fontWeight: 700, color: "var(--foreground)", letterSpacing: "-0.02em" }}>
            Inmotion
          </h1>
          <p style={{ fontSize: 13, color: "var(--gray-500)", marginTop: 4 }}>Admin panel</p>
        </div>

        <form onSubmit={handleSubmit} className="card" style={{ padding: 24 }}>
          <div style={{ marginBottom: 14 }}>
            <label className="label">Email</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)}
              required className="input" placeholder="you@email.com" />
          </div>

          <div style={{ marginBottom: 20 }}>
            <label className="label">Password</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)}
              required className="input" placeholder="••••••••" />
          </div>

          {error && (
            <p style={{ fontSize: 13, color: "var(--error)", textAlign: "center", marginBottom: 14 }}>{error}</p>
          )}

          <button type="submit" disabled={loading} className="btn btn-primary" style={{ width: "100%" }}>
            {loading ? "Signing in..." : "Sign in"}
          </button>
        </form>
      </div>
    </div>
  );
}
