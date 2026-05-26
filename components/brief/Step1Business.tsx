"use client";

import { UseFormRegister, FieldErrors } from "react-hook-form";
import { Brief } from "@/lib/types";

interface Props {
  register: UseFormRegister<Brief>;
  errors: FieldErrors<Brief>;
}

export default function Step1Business({ register, errors }: Props) {
  return (
    <div className="space-y-5">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Cuéntanos sobre ti</h2>
        <p className="text-gray-500 mt-1">Necesitamos saber quién eres para ponernos en contacto.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Tu nombre *
          </label>
          <input
            {...register("clientName", { required: "Campo requerido" })}
            className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-black/20 focus:border-black transition"
            placeholder="Juan Pérez"
          />
          {errors.clientName && (
            <p className="text-red-500 text-xs mt-1">{errors.clientName.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Nombre del negocio *
          </label>
          <input
            {...register("businessName", { required: "Campo requerido" })}
            className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-black/20 focus:border-black transition"
            placeholder="Mi Empresa S.A.S"
          />
          {errors.businessName && (
            <p className="text-red-500 text-xs mt-1">{errors.businessName.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Correo electrónico *
          </label>
          <input
            {...register("email", {
              required: "Campo requerido",
              pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: "Email inválido" },
            })}
            type="email"
            className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-black/20 focus:border-black transition"
            placeholder="tu@email.com"
          />
          {errors.email && (
            <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Teléfono / WhatsApp *
          </label>
          <input
            {...register("phone", { required: "Campo requerido" })}
            className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-black/20 focus:border-black transition"
            placeholder="+57 300 000 0000"
          />
          {errors.phone && (
            <p className="text-red-500 text-xs mt-1">{errors.phone.message}</p>
          )}
        </div>
      </div>
    </div>
  );
}
