"use client";

import { useLang } from "@/lib/LangContext";
import BriefWizard from "./BriefWizard";

export default function BriefPageClient() {
  const { tr, toggleLang, lang } = useLang();

  return (
    <main style={{ minHeight: "100vh", background: "var(--background)" }}>
      <div style={{ maxWidth: 600, margin: "0 auto", padding: "48px 16px" }}>

        {/* Lang toggle */}
        <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: 24 }}>
          <button
            onClick={toggleLang}
            style={{
              background: "var(--gray-100)",
              border: "1px solid var(--border)",
              borderRadius: 8,
              padding: "5px 12px",
              fontSize: 12,
              fontWeight: 500,
              color: "var(--gray-600)",
              cursor: "pointer",
              fontFamily: "inherit",
            }}
          >
            {lang === "en" ? "🇪🇸 Español" : "🇺🇸 English"}
          </button>
        </div>

        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: 32 }}>
          <h1 style={{ fontSize: 28, fontWeight: 700, color: "var(--foreground)", letterSpacing: "-0.03em", lineHeight: 1.2 }}>
            {tr.briefTitle}
          </h1>
          <p style={{ fontSize: 14, color: "var(--gray-500)", marginTop: 8, lineHeight: 1.6 }}>
            {tr.briefSubtitle}
          </p>
        </div>

        {/* Card */}
        <div className="card" style={{ padding: "32px" }}>
          <BriefWizard />
        </div>

        {/* Footer */}
        <p style={{ textAlign: "center", fontSize: 12, color: "var(--gray-400)", marginTop: 24 }}>
          {tr.briefFooter}{" "}
          <a href="mailto:hello@bladestech.com" style={{ color: "var(--gray-600)", textDecoration: "underline" }}>
            {tr.briefFooterLink}
          </a>
        </p>
      </div>
    </main>
  );
}
