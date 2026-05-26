"use client";

import { useState } from "react";
import { uploadToCloudinary } from "@/lib/cloudinary";
import { useLang } from "@/lib/LangContext";

interface Props {
  briefId: string;
  onAssetsChange: (assets: { logo?: string; photos: string[]; documents: string[] }) => void;
  assets: { logo?: string; photos: string[]; documents: string[] };
}

export default function Step4Assets({ briefId, onAssetsChange, assets }: Props) {
  const { tr } = useLang();
  const [uploading, setUploading] = useState<string | null>(null);

  async function handleLogoUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading("logo");
    try {
      const url = await uploadToCloudinary(file, briefId, "logo");
      onAssetsChange({ ...assets, logo: url });
    } catch { alert("Upload error. Please try again."); }
    finally { setUploading(null); }
  }

  async function handlePhotosUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const files = Array.from(e.target.files || []);
    if (!files.length) return;
    setUploading("photos");
    try {
      const urls = await Promise.all(files.map((f) => uploadToCloudinary(f, briefId, "photos")));
      onAssetsChange({ ...assets, photos: [...assets.photos, ...urls] });
    } catch { alert("Upload error. Please try again."); }
    finally { setUploading(null); }
  }

  async function handleDocsUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const files = Array.from(e.target.files || []);
    if (!files.length) return;
    setUploading("docs");
    try {
      const urls = await Promise.all(files.map((f) => uploadToCloudinary(f, briefId, "documents")));
      onAssetsChange({ ...assets, documents: [...assets.documents, ...urls] });
    } catch { alert("Upload error. Please try again."); }
    finally { setUploading(null); }
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 style={{ fontSize: 20, fontWeight: 600, color: "var(--foreground)", letterSpacing: "-0.02em" }}>{tr.step4Title}</h2>
        <p style={{ fontSize: 14, color: "var(--gray-500)", marginTop: 4 }}>{tr.step4Subtitle}</p>
      </div>

      <AssetBlock title={tr.logoTitle} hint={tr.logoHint}
        status={assets.logo ? tr.uploaded : null}
        uploading={uploading === "logo"} accept=".png,.svg,.pdf,.jpg,.jpeg,.webp"
        uploadMore={tr.uploadMore} uploadSelect={tr.uploadSelect} uploadingText={tr.uploading}
        onChange={handleLogoUpload} />

      <AssetBlock title={tr.photosTitle} hint={tr.photosHint}
        status={assets.photos.length > 0 ? tr.photosCount(assets.photos.length) : null}
        uploading={uploading === "photos"} accept="image/*" multiple
        uploadMore={tr.uploadMore} uploadSelect={tr.uploadSelect} uploadingText={tr.uploading}
        onChange={handlePhotosUpload} />

      <AssetBlock title={tr.docsTitle} hint={tr.docsHint}
        status={assets.documents.length > 0 ? tr.docsCount(assets.documents.length) : null}
        uploading={uploading === "docs"} accept=".pdf,.doc,.docx,.xls,.xlsx,.txt" multiple
        uploadMore={tr.uploadMore} uploadSelect={tr.uploadSelect} uploadingText={tr.uploading}
        onChange={handleDocsUpload} />

      <p style={{ fontSize: 12, color: "var(--gray-400)", textAlign: "center" }}>{tr.assetsOptional}</p>
    </div>
  );
}

function AssetBlock({ title, hint, status, uploading, accept, multiple, onChange, uploadMore, uploadSelect, uploadingText }: {
  title: string; hint: string; status: string | null; uploading: boolean;
  accept: string; multiple?: boolean; uploadMore: string; uploadSelect: string; uploadingText: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  return (
    <div style={{ border: "1px solid var(--border)", borderRadius: "var(--radius)", padding: "16px" }}>
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 10 }}>
        <div>
          <p style={{ fontSize: 13, fontWeight: 500, color: "var(--foreground)" }}>{title}</p>
          <p style={{ fontSize: 12, color: "var(--gray-500)", marginTop: 2 }}>{hint}</p>
        </div>
        {status && <span className="badge badge-green">{status}</span>}
      </div>
      <label className="upload-zone">
        {uploading ? (
          <span style={{ fontSize: 13, color: "var(--gray-400)" }}>{uploadingText}</span>
        ) : (
          <>
            <span style={{ fontSize: 20, color: "var(--gray-300)" }}>↑</span>
            <span style={{ fontSize: 13, color: "var(--gray-500)" }}>{status ? uploadMore : uploadSelect}</span>
          </>
        )}
        <input type="file" accept={accept} multiple={multiple} className="hidden" onChange={onChange} />
      </label>
    </div>
  );
}
