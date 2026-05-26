"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Brief, BriefStatus } from "@/lib/types";

const statusConfig: Record<BriefStatus, { label: string; badge: string }> = {
  pending:     { label: "Pending",     badge: "badge-yellow" },
  reviewed:    { label: "Reviewed",    badge: "badge-blue" },
  in_progress: { label: "In progress", badge: "badge-purple" },
  completed:   { label: "Completed",   badge: "badge-green" },
};

const projectLabels: Record<string, string> = {
  website: "Website", ecommerce: "Online store",
  landing: "Landing page", app: "Application", other: "Other",
};

const emailSetupLabels: Record<string, string> = {
  existing: "Will provide credentials",
  create: "Create Gmail account",
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
    <div style={{ minHeight: "100vh", background: "var(--background)" }}>
      {/* Top nav */}
      <nav style={{
        borderBottom: "1px solid var(--border)",
        background: "var(--card-bg)",
        position: "sticky", top: 0, zIndex: 10,
      }}>
        <div style={{
          maxWidth: 1200, margin: "0 auto", padding: "0 20px",
          height: 52, display: "flex", alignItems: "center", justifyContent: "space-between",
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <span style={{ fontSize: 13, fontWeight: 700, color: "var(--foreground)", letterSpacing: "-0.02em" }}>
              Inmotion
            </span>
            <span style={{ color: "var(--border)" }}>|</span>
            <span style={{ fontSize: 13, color: "var(--gray-500)" }}>Briefs</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            {!loading && (
              <span style={{ fontSize: 12, color: "var(--gray-400)" }}>
                {briefs.length} {briefs.length === 1 ? "brief" : "briefs"}
              </span>
            )}
            <button onClick={logout} className="btn btn-secondary" style={{ height: 32, fontSize: 12, padding: "0 12px" }}>
              Sign out
            </button>
          </div>
        </div>
      </nav>

      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "24px 20px" }}>
        {loading ? (
          <div style={{ textAlign: "center", padding: "80px 0", color: "var(--gray-400)", fontSize: 14 }}>
            Loading...
          </div>
        ) : briefs.length === 0 ? (
          <div style={{ textAlign: "center", padding: "80px 0" }}>
            <p style={{ fontSize: 14, color: "var(--gray-400)" }}>No briefs yet.</p>
            <p style={{ fontSize: 13, color: "var(--gray-500)", marginTop: 6 }}>Share the link with your clients to get started.</p>
          </div>
        ) : (
          <div style={{ display: "grid", gridTemplateColumns: selected ? "320px 1fr" : "1fr", gap: 16, alignItems: "start" }}>

            {/* List */}
            <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
              {briefs.map((brief) => (
                <button
                  key={brief.id}
                  onClick={() => setSelected(brief)}
                  style={{
                    textAlign: "left",
                    background: selected?.id === brief.id ? "var(--gray-100)" : "var(--card-bg)",
                    border: `1px solid ${selected?.id === brief.id ? "var(--foreground)" : "var(--border)"}`,
                    borderRadius: "var(--radius)",
                    padding: "12px 14px",
                    cursor: "pointer",
                    transition: "all 0.15s",
                    width: "100%",
                  }}
                >
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 8 }}>
                    <div style={{ minWidth: 0 }}>
                      <p style={{ fontSize: 13, fontWeight: 600, color: "var(--foreground)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                        {brief.businessName}
                      </p>
                      <p style={{ fontSize: 12, color: "var(--gray-500)", marginTop: 1, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                        {brief.clientName}
                      </p>
                    </div>
                    <span className={`badge ${statusConfig[brief.status]?.badge}`}>
                      {statusConfig[brief.status]?.label}
                    </span>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 8 }}>
                    <span style={{ fontSize: 11, color: "var(--gray-400)", background: "var(--gray-100)", padding: "2px 6px", borderRadius: 4 }}>
                      {projectLabels[brief.projectType] || brief.projectType}
                    </span>
                    <span style={{ fontSize: 11, color: "var(--gray-400)" }}>
                      {new Date(brief.createdAt).toLocaleDateString("en-US", { day: "numeric", month: "short", year: "numeric" })}
                    </span>
                  </div>
                </button>
              ))}
            </div>

            {/* Detail panel */}
            {selected && (
              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>

                {/* Header card */}
                <div className="card" style={{ padding: "20px 24px" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                    <div>
                      <h2 style={{ fontSize: 18, fontWeight: 700, color: "var(--foreground)", letterSpacing: "-0.02em" }}>
                        {selected.businessName}
                      </h2>
                      <p style={{ fontSize: 13, color: "var(--gray-500)", marginTop: 2 }}>{selected.clientName}</p>
                      <p style={{ fontSize: 12, color: "var(--gray-400)", marginTop: 4, fontFamily: "var(--font-geist-mono)" }}>
                        #{selected.id}
                      </p>
                    </div>
                    <select
                      value={selected.status}
                      onChange={(e) => updateStatus(selected.id, e.target.value as BriefStatus)}
                      className="select"
                      style={{ width: "auto", height: 34, fontSize: 12, padding: "0 28px 0 10px" }}
                    >
                      {Object.entries(statusConfig).map(([val, { label }]) => (
                        <option key={val} value={val}>{label}</option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Info grid */}
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                  <DetailCard title="Contact">
                    <Row label="Email" value={selected.email} />
                    <Row label="Phone" value={selected.phone} />
                    <Row label="Notification email" value={selected.notificationEmail} />
                    {selected.emailSetup && (
                      <Row label="Email setup" value={emailSetupLabels[selected.emailSetup] || selected.emailSetup} />
                    )}
                    {selected.emailSetupDetail && (
                      <Row label="Email detail" value={selected.emailSetupDetail} />
                    )}
                  </DetailCard>

                  <DetailCard title="Project">
                    <Row label="Type" value={projectLabels[selected.projectType] || selected.projectType} />
                    <Row label="Style" value={selected.style} />
                    <Row label="Deadline" value={selected.deadline} />
                    <Row label="Colors" value={selected.colors} />
                  </DetailCard>
                </div>

                <DetailCard title="Description">
                  <p style={{ fontSize: 13, color: "var(--foreground)", lineHeight: 1.6 }}>{selected.description}</p>
                  {selected.referenceUrls?.filter(Boolean).map((url, i) => (
                    <div key={i} style={{ marginTop: 8 }}>
                      <a href={url} target="_blank" rel="noreferrer" style={{ fontSize: 13, color: "var(--accent)", textDecoration: "underline" }}>{url}</a>
                    </div>
                  ))}
                </DetailCard>

                <DetailCard title="Sections">
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                    {selected.sections?.map((s) => (
                      <span key={s} style={{
                        fontSize: 11, background: "var(--gray-100)", color: "var(--gray-700)",
                        padding: "3px 8px", borderRadius: 6, fontWeight: 500,
                      }}>{s}</span>
                    ))}
                  </div>
                  {selected.sectionNotes && (
                    <p style={{ fontSize: 13, color: "var(--gray-600)", marginTop: 10, lineHeight: 1.5 }}>{selected.sectionNotes}</p>
                  )}
                </DetailCard>

                <DetailCard title="Assets">
                  {selected.assets?.logo && <AssetLink label="Logo" url={selected.assets.logo} />}
                  {selected.assets?.photos?.map((url, i) => <AssetLink key={i} label={`Photo ${i + 1}`} url={url} />)}
                  {selected.assets?.documents?.map((url, i) => <AssetLink key={i} label={`Document ${i + 1}`} url={url} />)}
                  {!selected.assets?.logo && !selected.assets?.photos?.length && !selected.assets?.documents?.length && (
                    <p style={{ fontSize: 13, color: "var(--gray-400)" }}>No files uploaded.</p>
                  )}
                </DetailCard>

                {selected.extraNotes && (
                  <DetailCard title="Notes">
                    <p style={{ fontSize: 13, color: "var(--foreground)", lineHeight: 1.6 }}>{selected.extraNotes}</p>
                  </DetailCard>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

function DetailCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="card" style={{ padding: "16px 20px" }}>
      <p style={{ fontSize: 11, fontWeight: 600, color: "var(--gray-400)", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 12 }}>
        {title}
      </p>
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>{children}</div>
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  if (!value) return null;
  return (
    <div>
      <p style={{ fontSize: 11, color: "var(--gray-500)", fontWeight: 500, marginBottom: 1 }}>{label}</p>
      <p style={{ fontSize: 13, color: "var(--foreground)" }}>{value}</p>
    </div>
  );
}

function AssetLink({ label, url }: { label: string; url: string }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
      <span style={{ fontSize: 12, color: "var(--gray-500)", minWidth: 80 }}>{label}</span>
      <a href={url} target="_blank" rel="noreferrer"
        style={{ fontSize: 12, color: "var(--accent)", textDecoration: "underline" }}>
        View file →
      </a>
    </div>
  );
}
