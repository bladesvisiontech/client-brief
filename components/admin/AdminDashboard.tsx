"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Brief, BriefStatus } from "@/lib/types";

const statusConfig: Record<BriefStatus, { label: string; badge: string }> = {
  pending:     { label: "Pendiente",   badge: "badge-yellow" },
  reviewed:    { label: "Revisado",    badge: "badge-blue" },
  in_progress: { label: "En progreso", badge: "badge-purple" },
  completed:   { label: "Completado",  badge: "badge-green" },
};

const projectLabels: Record<string, string> = {
  website: "Sitio web", ecommerce: "Tienda online",
  landing: "Landing page", app: "Aplicación", other: "Otro",
};

export default function AdminDashboard() {
  const [briefs, setBriefs] = useState<Brief[]>([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<Brief | null>(null);
  const router = useRouter();

  useEffect(() => {
    fetch("/api/admin/briefs")
      .then((r) => r.json())
      .then((d) => setBriefs(d.briefs || []))
      .finally(() => setLoading(false));
  }, []);

  async function logout() {
    await fetch("/api/admin/logout", { method: "POST" });
    router.refresh();
  }

  async function updateStatus(id: string, status: BriefStatus) {
    await fetch("/api/admin/briefs", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, status }),
    });
    setBriefs((prev) => prev.map((b) => b.id === id ? { ...b, status } : b));
    if (selected?.id === id) setSelected((s) => s ? { ...s, status } : s);
  }

  return (
    <div style={{ maxWidth: 1100, margin: "0 auto", padding: "32px 16px" }}>
      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 28 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div style={{
            display: "inline-flex", alignItems: "center", gap: 8,
            border: "1px solid var(--border)", borderRadius: 8, padding: "5px 10px",
          }}>
            <div style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--foreground)" }} />
            <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.05em" }}>INMOTION</span>
          </div>
          <div>
            <h1 style={{ fontSize: 18, fontWeight: 600, color: "var(--foreground)", letterSpacing: "-0.02em" }}>
              Briefs
            </h1>
            <p style={{ fontSize: 12, color: "var(--gray-500)" }}>
              {briefs.length} {briefs.length === 1 ? "solicitud" : "solicitudes"}
            </p>
          </div>
        </div>
        <button onClick={logout} className="btn btn-secondary" style={{ height: 34, fontSize: 13 }}>
          Cerrar sesión
        </button>
      </div>

      {loading ? (
        <div style={{ textAlign: "center", padding: "80px 0", color: "var(--gray-400)", fontSize: 14 }}>
          Cargando...
        </div>
      ) : briefs.length === 0 ? (
        <div style={{ textAlign: "center", padding: "80px 0", color: "var(--gray-400)", fontSize: 14 }}>
          No hay briefs aún. Comparte el link con tus clientes.
        </div>
      ) : (
        <div style={{ display: "grid", gridTemplateColumns: selected ? "340px 1fr" : "1fr", gap: 16 }}>
          {/* Lista */}
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {briefs.map((brief) => (
              <button
                key={brief.id}
                onClick={() => setSelected(brief)}
                style={{
                  textAlign: "left", background: "#fff",
                  border: `1px solid ${selected?.id === brief.id ? "var(--foreground)" : "var(--border)"}`,
                  borderRadius: "var(--radius)", padding: "14px 16px",
                  cursor: "pointer", transition: "border-color 0.15s",
                  width: "100%",
                }}
              >
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 8 }}>
                  <div style={{ minWidth: 0 }}>
                    <p style={{ fontSize: 13, fontWeight: 600, color: "var(--foreground)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                      {brief.businessName}
                    </p>
                    <p style={{ fontSize: 12, color: "var(--gray-500)", marginTop: 2, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                      {brief.clientName} · {projectLabels[brief.projectType] || brief.projectType}
                    </p>
                  </div>
                  <span className={`badge ${statusConfig[brief.status]?.badge}`}>
                    {statusConfig[brief.status]?.label}
                  </span>
                </div>
                <p style={{ fontSize: 11, color: "var(--gray-400)", marginTop: 8 }}>
                  {new Date(brief.createdAt).toLocaleDateString("es-CO", { day: "numeric", month: "short", year: "numeric" })}
                </p>
              </button>
            ))}
          </div>

          {/* Detalle */}
          {selected && (
            <div className="card" style={{ padding: 24, height: "fit-content" }}>
              {/* Header detalle */}
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 20, paddingBottom: 16, borderBottom: "1px solid var(--border)" }}>
                <div>
                  <h2 style={{ fontSize: 16, fontWeight: 600, color: "var(--foreground)" }}>{selected.businessName}</h2>
                  <p style={{ fontSize: 13, color: "var(--gray-500)", marginTop: 2 }}>{selected.clientName}</p>
                </div>
                <select
                  value={selected.status}
                  onChange={(e) => updateStatus(selected.id, e.target.value as BriefStatus)}
                  className="select"
                  style={{ width: "auto", height: 32, fontSize: 12 }}
                >
                  {Object.entries(statusConfig).map(([val, { label }]) => (
                    <option key={val} value={val}>{label}</option>
                  ))}
                </select>
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
                <Section title="Contacto">
                  <Row label="Email" value={selected.email} />
                  <Row label="Teléfono" value={selected.phone} />
                </Section>

                <Section title="Proyecto">
                  <Row label="Tipo" value={projectLabels[selected.projectType] || selected.projectType} />
                  <Row label="Descripción" value={selected.description} />
                  {selected.referenceUrls?.filter(Boolean).map((url, i) => (
                    <div key={i}>
                      <p style={{ fontSize: 11, fontWeight: 500, color: "var(--gray-500)", textTransform: "uppercase", letterSpacing: "0.05em" }}>Referencia {i + 1}</p>
                      <a href={url} target="_blank" rel="noreferrer" style={{ fontSize: 13, color: "var(--accent)", textDecoration: "underline" }}>{url}</a>
                    </div>
                  ))}
                </Section>

                <Section title="Secciones">
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                    {selected.sections?.map((s) => (
                      <span key={s} style={{ fontSize: 11, background: "var(--gray-100)", color: "var(--gray-700)", padding: "3px 8px", borderRadius: 6, fontWeight: 500 }}>{s}</span>
                    ))}
                  </div>
                  {selected.sectionNotes && <Row label="Notas" value={selected.sectionNotes} />}
                </Section>

                <Section title="Assets">
                  {selected.assets?.logo && <AssetLink label="Logo" url={selected.assets.logo} />}
                  {selected.assets?.photos?.map((url, i) => <AssetLink key={i} label={`Foto ${i + 1}`} url={url} />)}
                  {selected.assets?.documents?.map((url, i) => <AssetLink key={i} label={`Documento ${i + 1}`} url={url} />)}
                  {!selected.assets?.logo && !selected.assets?.photos?.length && !selected.assets?.documents?.length && (
                    <p style={{ fontSize: 13, color: "var(--gray-400)" }}>No se subieron archivos.</p>
                  )}
                </Section>

                <Section title="Detalles">
                  <Row label="Estilo" value={selected.style} />
                  <Row label="Colores" value={selected.colors} />
                  <Row label="Fecha límite" value={selected.deadline} />
                  <Row label="Presupuesto" value={selected.budget} />
                  {selected.extraNotes && <Row label="Notas extra" value={selected.extraNotes} />}
                </Section>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <p style={{ fontSize: 11, fontWeight: 600, color: "var(--gray-400)", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 10 }}>{title}</p>
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>{children}</div>
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  if (!value) return null;
  return (
    <div>
      <p style={{ fontSize: 11, color: "var(--gray-500)", fontWeight: 500, marginBottom: 2 }}>{label}</p>
      <p style={{ fontSize: 13, color: "var(--foreground)" }}>{value}</p>
    </div>
  );
}

function AssetLink({ label, url }: { label: string; url: string }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
      <span style={{ fontSize: 12, color: "var(--gray-500)" }}>{label}</span>
      <a href={url} target="_blank" rel="noreferrer" style={{ fontSize: 12, color: "var(--accent)", textDecoration: "underline" }}>Ver archivo →</a>
    </div>
  );
}
