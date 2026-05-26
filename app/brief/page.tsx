import BriefWizard from "@/components/brief/BriefWizard";

export const metadata = {
  title: "Brief del proyecto — Inmotion",
  description: "Comparte la información de tu proyecto con el equipo de Inmotion.",
};

export default function BriefPage() {
  return (
    <main style={{ minHeight: "100vh", background: "var(--gray-50)" }}>
      <div style={{ maxWidth: 600, margin: "0 auto", padding: "48px 16px" }}>

        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: 32 }}>
          <div style={{
            display: "inline-flex", alignItems: "center", gap: 8,
            background: "#fff", border: "1px solid var(--border)",
            borderRadius: 8, padding: "6px 12px", marginBottom: 20,
          }}>
            <div style={{
              width: 6, height: 6, borderRadius: "50%", background: "var(--foreground)",
            }} />
            <span style={{ fontSize: 12, fontWeight: 600, color: "var(--foreground)", letterSpacing: "0.05em" }}>
              INMOTION
            </span>
          </div>
          <h1 style={{ fontSize: 28, fontWeight: 700, color: "var(--foreground)", letterSpacing: "-0.03em", lineHeight: 1.2 }}>
            Brief del proyecto
          </h1>
          <p style={{ fontSize: 14, color: "var(--gray-500)", marginTop: 8, lineHeight: 1.6 }}>
            Completa este formulario para darnos toda la información necesaria y comenzar tu proyecto.
          </p>
        </div>

        {/* Card */}
        <div className="card" style={{ padding: "32px" }}>
          <BriefWizard />
        </div>

        {/* Footer */}
        <p style={{ textAlign: "center", fontSize: 12, color: "var(--gray-400)", marginTop: 24 }}>
          ¿Tienes dudas?{" "}
          <a href="mailto:bladesvisiontech@gmail.com" style={{ color: "var(--gray-600)", textDecoration: "underline" }}>
            Escríbenos
          </a>
        </p>
      </div>
    </main>
  );
}
