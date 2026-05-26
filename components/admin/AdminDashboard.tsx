"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Brief, BriefStatus } from "@/lib/types";

const statusLabels: Record<BriefStatus, { label: string; color: string }> = {
  pending: { label: "Pendiente", color: "bg-yellow-50 text-yellow-700" },
  reviewed: { label: "Revisado", color: "bg-blue-50 text-blue-700" },
  in_progress: { label: "En progreso", color: "bg-purple-50 text-purple-700" },
  completed: { label: "Completado", color: "bg-green-50 text-green-700" },
};

const projectTypeLabels: Record<string, string> = {
  website: "Sitio web",
  ecommerce: "Tienda online",
  landing: "Landing page",
  app: "Aplicación",
  other: "Otro",
};

export default function AdminDashboard() {
  const [briefs, setBriefs] = useState<Brief[]>([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<Brief | null>(null);
  const router = useRouter();

  useEffect(() => {
    fetch("/api/admin/briefs")
      .then((r) => r.json())
      .then((data) => setBriefs(data.briefs || []))
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
    setBriefs((prev) => prev.map((b) => (b.id === id ? { ...b, status } : b)));
    if (selected?.id === id) setSelected((s) => s ? { ...s, status } : s);
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <p className="text-sm font-semibold tracking-widest text-gray-400 uppercase">Inmotion</p>
          <h1 className="text-2xl font-bold text-gray-900">Briefs recibidos</h1>
        </div>
        <button onClick={logout} className="text-sm text-gray-500 hover:text-black transition">
          Cerrar sesión
        </button>
      </div>

      {loading ? (
        <div className="text-center py-20 text-gray-400">Cargando briefs...</div>
      ) : briefs.length === 0 ? (
        <div className="text-center py-20 text-gray-400">No hay briefs aún.</div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Lista */}
          <div className="lg:col-span-1 space-y-3">
            {briefs.map((brief) => (
              <button
                key={brief.id}
                onClick={() => setSelected(brief)}
                className={`w-full text-left bg-white rounded-2xl border p-4 hover:border-black transition ${
                  selected?.id === brief.id ? "border-black" : "border-gray-100"
                }`}
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="min-w-0">
                    <p className="font-medium text-gray-900 truncate">{brief.businessName}</p>
                    <p className="text-xs text-gray-500 truncate">{brief.clientName} · {brief.email}</p>
                    <p className="text-xs text-gray-400 mt-1">{projectTypeLabels[brief.projectType] || brief.projectType}</p>
                  </div>
                  <span className={`text-xs px-2 py-0.5 rounded-full font-medium whitespace-nowrap ${statusLabels[brief.status]?.color}`}>
                    {statusLabels[brief.status]?.label}
                  </span>
                </div>
                <p className="text-xs text-gray-400 mt-2">
                  {new Date(brief.createdAt).toLocaleDateString("es-CO", { day: "numeric", month: "short", year: "numeric" })}
                </p>
              </button>
            ))}
          </div>

          {/* Detalle */}
          <div className="lg:col-span-2">
            {selected ? (
              <div className="bg-white rounded-2xl border border-gray-100 p-6 space-y-6">
                <div className="flex items-start justify-between">
                  <div>
                    <h2 className="text-xl font-bold text-gray-900">{selected.businessName}</h2>
                    <p className="text-sm text-gray-500">{selected.clientName}</p>
                  </div>
                  <select
                    value={selected.status}
                    onChange={(e) => updateStatus(selected.id, e.target.value as BriefStatus)}
                    className="border border-gray-200 rounded-xl px-3 py-1.5 text-sm focus:outline-none focus:border-black bg-white"
                  >
                    {Object.entries(statusLabels).map(([val, { label }]) => (
                      <option key={val} value={val}>{label}</option>
                    ))}
                  </select>
                </div>

                <Section title="Contacto">
                  <Row label="Email" value={selected.email} />
                  <Row label="Teléfono" value={selected.phone} />
                </Section>

                <Section title="Proyecto">
                  <Row label="Tipo" value={projectTypeLabels[selected.projectType] || selected.projectType} />
                  <Row label="Descripción" value={selected.description} />
                  {selected.referenceUrls?.filter(Boolean).length > 0 && (
                    <div>
                      <p className="text-xs font-medium text-gray-500 mb-1">Referencias</p>
                      {selected.referenceUrls.filter(Boolean).map((url, i) => (
                        <a key={i} href={url} target="_blank" rel="noreferrer" className="text-sm text-blue-600 underline block">{url}</a>
                      ))}
                    </div>
                  )}
                </Section>

                <Section title="Secciones">
                  <div className="flex flex-wrap gap-2">
                    {selected.sections?.map((s) => (
                      <span key={s} className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-full">{s}</span>
                    ))}
                  </div>
                  {selected.sectionNotes && <Row label="Notas" value={selected.sectionNotes} />}
                </Section>

                <Section title="Assets">
                  {selected.assets?.logo && (
                    <div>
                      <p className="text-xs font-medium text-gray-500 mb-1">Logo</p>
                      <a href={selected.assets.logo} target="_blank" rel="noreferrer" className="text-sm text-blue-600 underline">Ver logo</a>
                    </div>
                  )}
                  {selected.assets?.photos?.length > 0 && (
                    <div>
                      <p className="text-xs font-medium text-gray-500 mb-1">Fotos ({selected.assets.photos.length})</p>
                      <div className="flex flex-wrap gap-2">
                        {selected.assets.photos.map((url, i) => (
                          <a key={i} href={url} target="_blank" rel="noreferrer" className="text-xs text-blue-600 underline">Foto {i + 1}</a>
                        ))}
                      </div>
                    </div>
                  )}
                  {selected.assets?.documents?.length > 0 && (
                    <div>
                      <p className="text-xs font-medium text-gray-500 mb-1">Documentos ({selected.assets.documents.length})</p>
                      <div className="flex flex-wrap gap-2">
                        {selected.assets.documents.map((url, i) => (
                          <a key={i} href={url} target="_blank" rel="noreferrer" className="text-xs text-blue-600 underline">Doc {i + 1}</a>
                        ))}
                      </div>
                    </div>
                  )}
                  {!selected.assets?.logo && !selected.assets?.photos?.length && !selected.assets?.documents?.length && (
                    <p className="text-sm text-gray-400">No se subieron archivos.</p>
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
            ) : (
              <div className="bg-white rounded-2xl border border-gray-100 h-64 flex items-center justify-center text-gray-400">
                Selecciona un brief para ver los detalles
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">{title}</h3>
      <div className="space-y-2">{children}</div>
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  if (!value) return null;
  return (
    <div>
      <p className="text-xs font-medium text-gray-500">{label}</p>
      <p className="text-sm text-gray-900">{value}</p>
    </div>
  );
}
