"use client";

import { UseFormRegister, FieldErrors } from "react-hook-form";
import { Brief, WebSection } from "@/lib/types";

interface Props {
  register: UseFormRegister<Brief>;
  errors: FieldErrors<Brief>;
}

const sections: { value: WebSection; label: string; icon: string; desc: string }[] = [
  { value: "hero", label: "Inicio / Banner", icon: "🖼️", desc: "Imagen principal con llamado a la acción" },
  { value: "about", label: "Quiénes somos", icon: "👥", desc: "Historia y valores del negocio" },
  { value: "services", label: "Servicios", icon: "⚡", desc: "Lo que ofreces a tus clientes" },
  { value: "portfolio", label: "Portafolio", icon: "💼", desc: "Trabajos o proyectos realizados" },
  { value: "team", label: "Equipo", icon: "🤝", desc: "Las personas detrás del negocio" },
  { value: "reviews", label: "Reseñas / Testimonios", icon: "⭐", desc: "Opiniones de clientes" },
  { value: "gallery", label: "Galería", icon: "📷", desc: "Fotos del negocio o productos" },
  { value: "pricing", label: "Precios / Planes", icon: "💰", desc: "Tarifas y planes disponibles" },
  { value: "faq", label: "Preguntas frecuentes", icon: "❓", desc: "Respuestas a dudas comunes" },
  { value: "blog", label: "Blog / Noticias", icon: "📝", desc: "Contenido y artículos" },
  { value: "map", label: "Mapa / Ubicación", icon: "📍", desc: "Dónde encontrarnos" },
  { value: "contact", label: "Contacto", icon: "✉️", desc: "Formulario o datos de contacto" },
];

export default function Step3Sections({ register, errors }: Props) {
  return (
    <div className="space-y-5">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">¿Qué secciones quieres?</h2>
        <p className="text-gray-500 mt-1">Selecciona todas las secciones que deseas en tu proyecto. Puedes elegir varias.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {sections.map((section) => (
          <label
            key={section.value}
            className="flex items-start gap-3 border border-gray-200 rounded-xl p-4 cursor-pointer hover:border-black transition has-[:checked]:border-black has-[:checked]:bg-black/5"
          >
            <input
              type="checkbox"
              value={section.value}
              {...register("sections", { required: "Selecciona al menos una sección" })}
              className="mt-0.5 accent-black"
            />
            <div>
              <p className="text-sm font-medium text-gray-900">
                {section.icon} {section.label}
              </p>
              <p className="text-xs text-gray-500">{section.desc}</p>
            </div>
          </label>
        ))}
      </div>
      {errors.sections && (
        <p className="text-red-500 text-xs mt-1">{String(errors.sections.message)}</p>
      )}

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Notas adicionales sobre las secciones (opcional)
        </label>
        <textarea
          {...register("sectionNotes")}
          rows={3}
          className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-black/20 focus:border-black transition resize-none"
          placeholder="Ej: En la sección de servicios quiero mostrar 6 servicios con íconos, en el banner quiero un video de fondo..."
        />
      </div>
    </div>
  );
}
