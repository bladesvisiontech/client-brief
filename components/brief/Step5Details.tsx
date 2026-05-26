"use client";

import { UseFormRegister, FieldErrors } from "react-hook-form";
import { Brief } from "@/lib/types";

interface Props {
  register: UseFormRegister<Brief>;
  errors: FieldErrors<Brief>;
}

const styles = [
  { value: "minimalista", label: "Minimalista", desc: "Limpio, espaciado, tipografía prominente" },
  { value: "moderno", label: "Moderno", desc: "Colores vibrantes, animaciones, dinámico" },
  { value: "elegante", label: "Elegante", desc: "Sofisticado, oscuro, premium" },
  { value: "corporativo", label: "Corporativo", desc: "Formal, confiable, estructurado" },
  { value: "creativo", label: "Creativo", desc: "Único, experimental, artístico" },
];

export default function Step5Details({ register, errors }: Props) {
  return (
    <div className="space-y-5">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Últimos detalles</h2>
        <p className="text-gray-500 mt-1">Ayúdanos a entender tu visión estética y tiempos.</p>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Estilo visual *
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {styles.map((s) => (
            <label
              key={s.value}
              className="flex items-start gap-3 border border-gray-200 rounded-xl p-4 cursor-pointer hover:border-black transition has-[:checked]:border-black has-[:checked]:bg-black/5"
            >
              <input
                type="radio"
                value={s.value}
                {...register("style", { required: "Selecciona un estilo" })}
                className="mt-0.5 accent-black"
              />
              <div>
                <p className="text-sm font-medium text-gray-900">{s.label}</p>
                <p className="text-xs text-gray-500">{s.desc}</p>
              </div>
            </label>
          ))}
        </div>
        {errors.style && (
          <p className="text-red-500 text-xs mt-1">{errors.style.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Colores de tu marca (opcional)
        </label>
        <input
          {...register("colors")}
          className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-black/20 focus:border-black transition"
          placeholder="Ej: azul marino #003366, blanco, dorado"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            ¿Para cuándo lo necesitas? *
          </label>
          <input
            {...register("deadline", { required: "Campo requerido" })}
            type="date"
            className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-black/20 focus:border-black transition"
          />
          {errors.deadline && (
            <p className="text-red-500 text-xs mt-1">{errors.deadline.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Presupuesto aproximado
          </label>
          <select
            {...register("budget")}
            className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-black/20 focus:border-black transition bg-white"
          >
            <option value="">Seleccionar...</option>
            <option value="menos-1m">Menos de $1.000.000 COP</option>
            <option value="1m-3m">$1.000.000 - $3.000.000 COP</option>
            <option value="3m-6m">$3.000.000 - $6.000.000 COP</option>
            <option value="6m-10m">$6.000.000 - $10.000.000 COP</option>
            <option value="mas-10m">Más de $10.000.000 COP</option>
            <option value="por-definir">Por definir</option>
          </select>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          ¿Algo más que debamos saber?
        </label>
        <textarea
          {...register("extraNotes")}
          rows={4}
          className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-black/20 focus:border-black transition resize-none"
          placeholder="Cualquier detalle adicional, restricciones, funcionalidades especiales, integraciones necesarias..."
        />
      </div>
    </div>
  );
}
