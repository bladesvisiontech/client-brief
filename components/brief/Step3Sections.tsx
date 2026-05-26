"use client";

import { UseFormRegister, FieldErrors } from "react-hook-form";
import { Brief, WebSection } from "@/lib/types";

interface Props {
  register: UseFormRegister<Brief>;
  errors: FieldErrors<Brief>;
}

const sections: { value: WebSection; label: string; icon: string }[] = [
  { value: "hero",      label: "Inicio / Banner",       icon: "▲" },
  { value: "about",     label: "Quiénes somos",          icon: "◎" },
  { value: "services",  label: "Servicios",              icon: "⊞" },
  { value: "portfolio", label: "Portafolio",             icon: "◫" },
  { value: "team",      label: "Equipo",                 icon: "⊕" },
  { value: "reviews",   label: "Reseñas",                icon: "◈" },
  { value: "gallery",   label: "Galería",                icon: "▣" },
  { value: "pricing",   label: "Precios / Planes",       icon: "◉" },
  { value: "faq",       label: "Preguntas frecuentes",   icon: "?" },
  { value: "blog",      label: "Blog / Noticias",        icon: "≡" },
  { value: "map",       label: "Mapa / Ubicación",       icon: "◎" },
  { value: "contact",   label: "Contacto",               icon: "✉" },
];

export default function Step3Sections({ register, errors }: Props) {
  return (
    <div className="space-y-6">
      <div>
        <h2 style={{ fontSize: 20, fontWeight: 600, color: "var(--foreground)", letterSpacing: "-0.02em" }}>
          ¿Qué secciones quieres?
        </h2>
        <p style={{ fontSize: 14, color: "var(--gray-500)", marginTop: 4 }}>
          Selecciona todas las secciones que deseas en tu proyecto.
        </p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
        {sections.map((s) => (
          <label key={s.value} className="option-card" style={{ alignItems: "center" }}>
            <input
              type="checkbox"
              value={s.value}
              {...register("sections", { required: "Selecciona al menos una sección" })}
              style={{ accentColor: "var(--foreground)", flexShrink: 0 }}
            />
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <span style={{ fontSize: 13, color: "var(--gray-400)", fontFamily: "var(--font-geist-mono)" }}>{s.icon}</span>
              <span style={{ fontSize: 13, fontWeight: 500, color: "var(--foreground)" }}>{s.label}</span>
            </div>
          </label>
        ))}
      </div>
      {errors.sections && <p className="field-error">{String(errors.sections.message)}</p>}

      <div>
        <label className="label">
          Notas adicionales{" "}
          <span style={{ color: "var(--gray-400)", fontWeight: 400 }}>(opcional)</span>
        </label>
        <textarea
          {...register("sectionNotes")}
          rows={3}
          className="textarea"
          placeholder="Ej: En servicios quiero mostrar 6 ítems con íconos, en el banner quiero un video de fondo..."
        />
      </div>
    </div>
  );
}
