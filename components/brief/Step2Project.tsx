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
    <div className="space-y-5">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">El proyecto</h2>
        <p className="text-gray-500 mt-1">Cuéntanos qué quieres construir.</p>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Tipo de proyecto *
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {projectTypes.map((type) => (
            <label
              key={type.value}
              className="flex items-start gap-3 border border-gray-200 rounded-xl p-4 cursor-pointer hover:border-black transition has-[:checked]:border-black has-[:checked]:bg-black/5"
            >
              <input
                type="radio"
                value={type.value}
                {...register("projectType", { required: "Selecciona un tipo" })}
                className="mt-0.5 accent-black"
              />
              <div>
                <p className="text-sm font-medium text-gray-900">{type.label}</p>
                <p className="text-xs text-gray-500">{type.desc}</p>
              </div>
            </label>
          ))}
        </div>
        {errors.projectType && (
          <p className="text-red-500 text-xs mt-1">{errors.projectType.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Describe tu proyecto *
        </label>
        <textarea
          {...register("description", { required: "Campo requerido", minLength: { value: 20, message: "Mínimo 20 caracteres" } })}
          rows={4}
          className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-black/20 focus:border-black transition resize-none"
          placeholder="Ej: Necesito un sitio web para mi restaurante donde los clientes puedan ver el menú, hacer reservas y contactarnos..."
        />
        {errors.description && (
          <p className="text-red-500 text-xs mt-1">{errors.description.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Páginas de referencia (opcional)
        </label>
        <input
          {...register("referenceUrls.0")}
          className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-black/20 focus:border-black transition mb-2"
          placeholder="https://ejemplo.com"
        />
        <input
          {...register("referenceUrls.1")}
          className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-black/20 focus:border-black transition"
          placeholder="https://otro-ejemplo.com"
        />
      </div>
    </div>
  );
}
