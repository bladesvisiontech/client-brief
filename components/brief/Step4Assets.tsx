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
        <h2 className="text-2xl font-bold text-gray-900">Sube tus archivos</h2>
        <p className="text-gray-500 mt-1">Todos los archivos se guardan de forma privada y solo para tu proyecto.</p>
      </div>

      {/* Logo */}
      <div className="border border-gray-200 rounded-2xl p-5">
        <div className="flex items-center justify-between mb-3">
          <div>
            <p className="font-medium text-gray-900">Logo</p>
            <p className="text-xs text-gray-500">PNG, SVG o PDF — tamaño original preferible</p>
          </div>
          {assets.logo && (
            <span className="text-xs bg-green-50 text-green-700 px-2 py-1 rounded-full font-medium">✓ Subido</span>
          )}
        </div>
        <label className="flex items-center justify-center w-full h-24 border-2 border-dashed border-gray-200 rounded-xl cursor-pointer hover:border-black transition">
          {uploading === "logo" ? (
            <span className="text-sm text-gray-500 animate-pulse">Subiendo...</span>
          ) : assets.logo ? (
            <span className="text-sm text-gray-500">Cambiar logo</span>
          ) : (
            <span className="text-sm text-gray-400">+ Seleccionar logo</span>
          )}
          <input type="file" accept=".png,.svg,.pdf,.jpg,.jpeg,.webp" className="hidden" onChange={handleLogoUpload} />
        </label>
      </div>

      {/* Fotos */}
      <div className="border border-gray-200 rounded-2xl p-5">
        <div className="flex items-center justify-between mb-3">
          <div>
            <p className="font-medium text-gray-900">Fotografías</p>
            <p className="text-xs text-gray-500">Fotos del negocio, productos, equipo, etc. Puedes subir varias.</p>
          </div>
          {assets.photos.length > 0 && (
            <span className="text-xs bg-green-50 text-green-700 px-2 py-1 rounded-full font-medium">
              ✓ {assets.photos.length} foto(s)
            </span>
          )}
        </div>
        <label className="flex items-center justify-center w-full h-24 border-2 border-dashed border-gray-200 rounded-xl cursor-pointer hover:border-black transition">
          {uploading === "photos" ? (
            <span className="text-sm text-gray-500 animate-pulse">Subiendo...</span>
          ) : (
            <span className="text-sm text-gray-400">+ Seleccionar fotos (múltiples)</span>
          )}
          <input type="file" accept="image/*" multiple className="hidden" onChange={handlePhotosUpload} />
        </label>
      </div>

      {/* Documentos */}
      <div className="border border-gray-200 rounded-2xl p-5">
        <div className="flex items-center justify-between mb-3">
          <div>
            <p className="font-medium text-gray-900">Documentos / Textos</p>
            <p className="text-xs text-gray-500">PDF, Word, Excel con información del negocio, textos, catálogos, etc.</p>
          </div>
          {assets.documents.length > 0 && (
            <span className="text-xs bg-green-50 text-green-700 px-2 py-1 rounded-full font-medium">
              ✓ {assets.documents.length} archivo(s)
            </span>
          )}
        </div>
        <label className="flex items-center justify-center w-full h-24 border-2 border-dashed border-gray-200 rounded-xl cursor-pointer hover:border-black transition">
          {uploading === "docs" ? (
            <span className="text-sm text-gray-500 animate-pulse">Subiendo...</span>
          ) : (
            <span className="text-sm text-gray-400">+ Seleccionar documentos</span>
          )}
          <input type="file" accept=".pdf,.doc,.docx,.xls,.xlsx,.txt" multiple className="hidden" onChange={handleDocsUpload} />
        </label>
      </div>

      <p className="text-xs text-gray-400 text-center">
        Los archivos son opcionales. Puedes enviarnos más por WhatsApp después si lo necesitas.
      </p>
    </div>
  );
}
