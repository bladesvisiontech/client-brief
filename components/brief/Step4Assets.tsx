"use client";

import { useState } from "react";
import { uploadToCloudinary } from "@/lib/cloudinary";

interface Props {
  briefId: string;
  onAssetsChange: (assets: { logo?: string; photos: string[]; documents: string[] }) => void;
  assets: { logo?: string; photos: string[]; documents: string[] };
}

export default function Step4Assets({ briefId, onAssetsChange, assets }: Props) {
  const [uploading, setUploading] = useState<string | null>(null);

  async function handleLogoUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading("logo");
    try {
      const url = await uploadToCloudinary(file, briefId, "logo");
      onAssetsChange({ ...assets, logo: url });
    } catch {
      alert("Error al subir el logo. Intenta de nuevo.");
    } finally {
      setUploading(null);
    }
  }

  async function handlePhotosUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const files = Array.from(e.target.files || []);
    if (!files.length) return;
    setUploading("photos");
    try {
      const urls = await Promise.all(files.map((f) => uploadToCloudinary(f, briefId, "photos")));
      onAssetsChange({ ...assets, photos: [...assets.photos, ...urls] });
    } catch {
      alert("Error al subir las fotos. Intenta de nuevo.");
    } finally {
      setUploading(null);
    }
  }

  async function handleDocsUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const files = Array.from(e.target.files || []);
    if (!files.length) return;
    setUploading("docs");
    try {
      const urls = await Promise.all(files.map((f) => uploadToCloudinary(f, briefId, "documents")));
      onAssetsChange({ ...assets, documents: [...assets.documents, ...urls] });
    } catch {
      alert("Error al subir los documentos. Intenta de nuevo.");
    } finally {
      setUploading(null);
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 style={{ fontSize: 20, fontWeight: 600, color: "var(--foreground)", letterSpacing: "-0.02em" }}>
          Sube tus archivos
        </h2>
        <p style={{ fontSize: 14, color: "var(--gray-500)", marginTop: 4 }}>
          Todos los archivos se guardan de forma privada y exclusiva para tu proyecto.
        </p>
      </div>

      <AssetBlock
        title="Logo"
        hint="PNG, SVG, PDF — en la mayor resolución posible"
        status={assets.logo ? "✓ Subido" : null}
        uploading={uploading === "logo"}
        accept=".png,.svg,.pdf,.jpg,.jpeg,.webp"
        onChange={handleLogoUpload}
      />

      <AssetBlock
        title="Fotografías"
        hint="Fotos del negocio, productos o equipo. Puedes subir varias."
        status={assets.photos.length > 0 ? `✓ ${assets.photos.length} foto(s)` : null}
        uploading={uploading === "photos"}
        accept="image/*"
        multiple
        onChange={handlePhotosUpload}
      />

      <AssetBlock
        title="Documentos / Textos"
        hint="PDF, Word, Excel con información, catálogos o contenido del sitio."
        status={assets.documents.length > 0 ? `✓ ${assets.documents.length} archivo(s)` : null}
        uploading={uploading === "docs"}
        accept=".pdf,.doc,.docx,.xls,.xlsx,.txt"
        multiple
        onChange={handleDocsUpload}
      />

      <p style={{ fontSize: 12, color: "var(--gray-400)", textAlign: "center" }}>
        Los archivos son opcionales. Puedes enviarnos más por WhatsApp después si lo necesitas.
      </p>
    </div>
  );
}

function AssetBlock({
  title, hint, status, uploading, accept, multiple, onChange,
}: {
  title: string;
  hint: string;
  status: string | null;
  uploading: boolean;
  accept: string;
  multiple?: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  return (
    <div style={{ border: "1px solid var(--border)", borderRadius: "var(--radius)", padding: "16px" }}>
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 10 }}>
        <div>
          <p style={{ fontSize: 13, fontWeight: 500, color: "var(--foreground)" }}>{title}</p>
          <p style={{ fontSize: 12, color: "var(--gray-500)", marginTop: 2 }}>{hint}</p>
        </div>
        {status && (
          <span className="badge badge-green">{status}</span>
        )}
      </div>
      <label className="upload-zone">
        {uploading ? (
          <span style={{ fontSize: 13, color: "var(--gray-400)" }}>Subiendo...</span>
        ) : (
          <>
            <span style={{ fontSize: 20, color: "var(--gray-300)" }}>↑</span>
            <span style={{ fontSize: 13, color: "var(--gray-500)" }}>
              {status ? "Subir más" : "Seleccionar archivo(s)"}
            </span>
          </>
        )}
        <input type="file" accept={accept} multiple={multiple} className="hidden" onChange={onChange} />
      </label>
    </div>
  );
}
