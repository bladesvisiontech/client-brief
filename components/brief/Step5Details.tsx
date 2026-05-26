"use client";

import { UseFormRegister, FieldErrors } from "react-hook-form";
import { Brief } from "@/lib/types";

interface Props {
  register: UseFormRegister<Brief>;
  errors: FieldErrors<Brief>;
}

const styles = [
  { value: "minimalista", label: "Minimalista", desc: "Limpio, espaciado, tipografía prominente" },
  { value: "moderno",     label: "Moderno",     desc: "Colores vibrantes, animaciones, dinámico" },
  { value: "elegante",    label: "Elegante",    desc: "Sofisticado, oscuro, premium" },
  { value: "corporativo", label: "Corporativo", desc: "Formal, confiable, estructurado" },
  { value: "creativo",    label: "Creativo",    desc: "Único, experimental, artístico" },
];

export default function Step5Details({ register, errors }: Props) {
  return (
    <div className="space-y-6">
      <div>
        <h2 style={{ fontSize: 20, fontWeight: 600, color: "var(--foreground)", letterSpacing: "-0.02em" }}>
          Últimos detalles
        </h2>
        <p style={{ fontSize: 14, color: "var(--gray-500)", marginTop: 4 }}>
          Ayúdanos a entender tu visión estética y tiempos.
        </p>
      </div>

      <div>
        <label className="label">Estilo visual *</label>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {styles.map((s) => (
            <label key={s.value} className="option-card">
              <input type="radio" value={s.value} {...register("style", { required: "Selecciona un estilo" })} style={{ accentColor: "var(--foreground)", marginTop: 2 }} />
              <div>
                <p style={{ fontSize: 13, fontWeight: 500, color: "var(--foreground)" }}>{s.label}</p>
                <p style={{ fontSize: 12, color: "var(--gray-500)", marginTop: 1 }}>{s.desc}</p>
              </div>
            </label>
          ))}
        </div>
        {errors.style && <p className="field-error">{errors.style.message}</p>}
      </div>

      <div>
        <label className="label">Colores de tu marca <span style={{ color: "var(--gray-400)", fontWeight: 400 }}>(opcional)</span></label>
        <input {...register("colors")} className="input" placeholder="Ej: azul marino #003366, blanco, dorado" />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="label">¿Para cuándo lo necesitas? *</label>
          <input {...register("deadline", { required: "Campo requerido" })} type="date" className="input" />
          {errors.deadline && <p className="field-error">{errors.deadline.message}</p>}
        </div>

        <div>
          <label className="label">Presupuesto aproximado <span style={{ color: "var(--gray-400)", fontWeight: 400 }}>(opcional)</span></label>
          <select {...register("budget")} className="select">
            <option value="">Seleccionar...</option>
            <option value="menos-1m">Menos de $1.000.000 COP</option>
            <option value="1m-3m">$1.000.000 – $3.000.000 COP</option>
            <option value="3m-6m">$3.000.000 – $6.000.000 COP</option>
            <option value="6m-10m">$6.000.000 – $10.000.000 COP</option>
            <option value="mas-10m">Más de $10.000.000 COP</option>
            <option value="por-definir">Por definir</option>
          </select>
        </div>
      </div>

      <div>
        <label className="label">¿Algo más que debamos saber? <span style={{ color: "var(--gray-400)", fontWeight: 400 }}>(opcional)</span></label>
        <textarea
          {...register("extraNotes")}
          rows={4}
          className="textarea"
          placeholder="Detalles adicionales, restricciones, funcionalidades especiales, integraciones necesarias..."
        />
      </div>
    </div>
  );
}
