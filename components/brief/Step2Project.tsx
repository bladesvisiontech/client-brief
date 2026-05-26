"use client";

import { UseFormRegister, FieldErrors } from "react-hook-form";
import { Brief, ProjectType } from "@/lib/types";

interface Props {
  register: UseFormRegister<Brief>;
  errors: FieldErrors<Brief>;
}

const projectTypes: { value: ProjectType; label: string; desc: string }[] = [
  { value: "website", label: "Sitio web", desc: "Página institucional o corporativa" },
  { value: "ecommerce", label: "Tienda online", desc: "Venta de productos o servicios" },
  { value: "landing", label: "Landing page", desc: "Página de captura o campaña" },
  { value: "app", label: "Aplicación web", desc: "Sistema o plataforma a medida" },
  { value: "other", label: "Otro", desc: "Cuéntanos en la descripción" },
];

export default function Step2Project({ register, errors }: Props) {
  return (
    <div className="space-y-6">
      <div>
        <h2 style={{ fontSize: 20, fontWeight: 600, color: "var(--foreground)", letterSpacing: "-0.02em" }}>
          El proyecto
        </h2>
        <p style={{ fontSize: 14, color: "var(--gray-500)", marginTop: 4 }}>
          Cuéntanos qué quieres construir.
        </p>
      </div>

      <div>
        <label className="label">Tipo de proyecto *</label>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {projectTypes.map((type) => (
            <label key={type.value} className="option-card">
              <input type="radio" value={type.value} {...register("projectType", { required: "Selecciona un tipo" })} style={{ accentColor: "var(--foreground)", marginTop: 2 }} />
              <div>
                <p style={{ fontSize: 13, fontWeight: 500, color: "var(--foreground)" }}>{type.label}</p>
                <p style={{ fontSize: 12, color: "var(--gray-500)", marginTop: 1 }}>{type.desc}</p>
              </div>
            </label>
          ))}
        </div>
        {errors.projectType && <p className="field-error">{errors.projectType.message}</p>}
      </div>

      <div>
        <label className="label">Describe tu proyecto *</label>
        <textarea
          {...register("description", { required: "Campo requerido", minLength: { value: 20, message: "Mínimo 20 caracteres" } })}
          rows={4}
          className="textarea"
          placeholder="Ej: Necesito un sitio web para mi restaurante donde los clientes puedan ver el menú, hacer reservas y contactarnos..."
        />
        {errors.description && <p className="field-error">{errors.description.message}</p>}
      </div>

      <div>
        <label className="label">Páginas de referencia <span style={{ color: "var(--gray-400)", fontWeight: 400 }}>(opcional)</span></label>
        <div className="space-y-2">
          <input {...register("referenceUrls.0")} className="input" placeholder="https://ejemplo.com" />
          <input {...register("referenceUrls.1")} className="input" placeholder="https://otro-ejemplo.com" />
        </div>
      </div>
    </div>
  );
}
