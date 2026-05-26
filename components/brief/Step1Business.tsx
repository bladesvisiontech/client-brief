"use client";

import { UseFormRegister, FieldErrors, UseFormWatch } from "react-hook-form";
import { Brief } from "@/lib/types";

interface Props {
  register: UseFormRegister<Brief>;
  errors: FieldErrors<Brief>;
  watch: UseFormWatch<Brief>;
}

export default function Step1Business({ register, errors, watch }: Props) {
  const emailSetup = watch("emailSetup");

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

        <Field label="Tu correo electrónico *" error={errors.email?.message}>
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

      {/* Sección correo del sistema */}
      <div style={{ paddingTop: 8, borderTop: "1px solid var(--border)" }}>
        <p style={{ fontSize: 14, fontWeight: 600, color: "var(--foreground)", marginBottom: 4 }}>
          Correo de tu sistema
        </p>
        <p style={{ fontSize: 13, color: "var(--gray-500)", marginBottom: 16 }}>
          ¿A qué correo quieres que lleguen las notificaciones, formularios de contacto y mensajes de tu sitio web?
        </p>

        <Field label="Correo de notificaciones *" error={errors.notificationEmail?.message}>
          <input
            {...register("notificationEmail", {
              required: "Campo requerido",
              pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: "Email inválido" },
            })}
            type="email"
            className="input"
            placeholder="notificaciones@tunegocio.com"
          />
        </Field>

        <div style={{ marginTop: 16 }}>
          <label className="label">¿Cómo quieres configurar el correo de tu negocio? *</label>
          <div style={{ display: "flex", flexDirection: "column", gap: 8, marginTop: 4 }}>

            <label className="email-option">
              <input
                type="radio"
                value="create"
                {...register("emailSetup", { required: "Selecciona una opción" })}
                style={{ accentColor: "var(--foreground)", marginTop: 3, flexShrink: 0 }}
              />
              <div>
                <p style={{ fontSize: 13, fontWeight: 600, color: "var(--foreground)" }}>
                  Créame un correo profesional
                </p>
                <p style={{ fontSize: 12, color: "var(--gray-500)", marginTop: 2 }}>
                  Ej: <span style={{ fontFamily: "var(--font-geist-mono)", color: "var(--gray-600)" }}>tunegocio@gmail.com</span> o con dominio propio. Nosotros lo configuramos y lo conectamos a todo tu sistema.
                </p>
              </div>
            </label>

            <label className="email-option">
              <input
                type="radio"
                value="existing"
                {...register("emailSetup", { required: "Selecciona una opción" })}
                style={{ accentColor: "var(--foreground)", marginTop: 3, flexShrink: 0 }}
              />
              <div>
                <p style={{ fontSize: 13, fontWeight: 600, color: "var(--foreground)" }}>
                  Ya tengo correo, quiero que lo configuren
                </p>
                <p style={{ fontSize: 12, color: "var(--gray-500)", marginTop: 2 }}>
                  Nos das acceso temporal para conectar todo. Puedes cambiar la contraseña cuando quieras al finalizar.
                </p>
              </div>
            </label>

            <label className="email-option">
              <input
                type="radio"
                value="none"
                {...register("emailSetup", { required: "Selecciona una opción" })}
                style={{ accentColor: "var(--foreground)", marginTop: 3, flexShrink: 0 }}
              />
              <div>
                <p style={{ fontSize: 13, fontWeight: 600, color: "var(--foreground)" }}>
                  No por ahora, lo vemos después
                </p>
                <p style={{ fontSize: 12, color: "var(--gray-500)", marginTop: 2 }}>
                  Continuamos sin configurar el correo por el momento.
                </p>
              </div>
            </label>
          </div>
          {errors.emailSetup && <p className="field-error">{errors.emailSetup.message}</p>}
        </div>

        {/* Campo condicional */}
        {emailSetup === "create" && (
          <div style={{ marginTop: 12 }}>
            <Field label="¿Cómo quieres que sea el correo?" error={errors.emailSetupDetail?.message}>
              <input
                {...register("emailSetupDetail")}
                className="input"
                placeholder="Ej: contacto@minegocio.com o minegocio@gmail.com"
              />
            </Field>
          </div>
        )}

        {emailSetup === "existing" && (
          <div style={{ marginTop: 12 }}>
            <Field label="¿Cuál es tu correo actual?" error={errors.emailSetupDetail?.message}>
              <input
                {...register("emailSetupDetail")}
                className="input"
                placeholder="micorreo@gmail.com"
              />
            </Field>
            <p style={{ fontSize: 12, color: "var(--gray-500)", marginTop: 6, display: "flex", alignItems: "center", gap: 6 }}>
              <span style={{ color: "var(--accent)" }}>🔒</span>
              Te pediremos acceso de forma segura al inicio del proyecto. Cambia tu contraseña cuando terminemos.
            </p>
          </div>
        )}
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
