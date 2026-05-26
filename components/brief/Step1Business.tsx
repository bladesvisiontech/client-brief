"use client";

import { UseFormRegister, FieldErrors } from "react-hook-form";
import { Brief } from "@/lib/types";

interface Props {
  register: UseFormRegister<Brief>;
  errors: FieldErrors<Brief>;
}

export default function Step1Business({ register, errors }: Props) {
  return (
    <div className="space-y-6">
      <div>
        <h2 style={{ fontSize: 20, fontWeight: 600, color: "var(--foreground)", letterSpacing: "-0.02em" }}>
          Cuéntanos sobre ti
        </h2>
        <p style={{ fontSize: 14, color: "var(--gray-500)", marginTop: 4 }}>
          Necesitamos saber quién eres para ponernos en contacto contigo.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Field label="Tu nombre *" error={errors.clientName?.message}>
          <input {...register("clientName", { required: "Campo requerido" })} className="input" placeholder="Juan Pérez" />
        </Field>

        <Field label="Nombre del negocio *" error={errors.businessName?.message}>
          <input {...register("businessName", { required: "Campo requerido" })} className="input" placeholder="Mi Empresa S.A.S" />
        </Field>

        <Field label="Correo electrónico *" error={errors.email?.message}>
          <input
            {...register("email", {
              required: "Campo requerido",
              pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: "Email inválido" },
            })}
            type="email"
            className="input"
            placeholder="tu@email.com"
          />
        </Field>

        <Field label="Teléfono / WhatsApp *" error={errors.phone?.message}>
          <input {...register("phone", { required: "Campo requerido" })} className="input" placeholder="+57 300 000 0000" />
        </Field>
      </div>
    </div>
  );
}

function Field({ label, error, children }: { label: string; error?: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="label">{label}</label>
      {children}
      {error && <p className="field-error">{error}</p>}
    </div>
  );
}
