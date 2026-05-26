"use client";

import { UseFormRegister, FieldErrors, UseFormWatch } from "react-hook-form";
import { Brief } from "@/lib/types";
import { useLang } from "@/lib/LangContext";

interface Props {
  register: UseFormRegister<Brief>;
  errors: FieldErrors<Brief>;
  watch: UseFormWatch<Brief>;
}

export default function Step1Business({ register, errors, watch }: Props) {
  const { tr } = useLang();
  const emailSetup = watch("emailSetup");

  return (
    <div className="space-y-6">
      <div>
        <h2 style={{ fontSize: 20, fontWeight: 600, color: "var(--foreground)", letterSpacing: "-0.02em" }}>{tr.step1Title}</h2>
        <p style={{ fontSize: 14, color: "var(--gray-500)", marginTop: 4 }}>{tr.step1Subtitle}</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Field label={tr.yourName} error={errors.clientName?.message}>
          <input {...register("clientName", { required: tr.required })} className="input" placeholder={tr.namePlaceholder} />
        </Field>
        <Field label={tr.businessName} error={errors.businessName?.message}>
          <input {...register("businessName", { required: tr.required })} className="input" placeholder={tr.businessPlaceholder} />
        </Field>
        <Field label={tr.yourEmail} error={errors.email?.message}>
          <input
            {...register("email", { required: tr.required, pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: tr.invalidEmail } })}
            type="email" className="input" placeholder={tr.emailPlaceholder}
          />
        </Field>
        <Field label={tr.phone} error={errors.phone?.message}>
          <input {...register("phone", { required: tr.required })} className="input" placeholder={tr.phonePlaceholder} />
        </Field>
      </div>

      {/* Email system section */}
      <div style={{ paddingTop: 8, borderTop: "1px solid var(--border)" }}>
        <p style={{ fontSize: 14, fontWeight: 600, color: "var(--foreground)", marginBottom: 4 }}>{tr.emailSystemTitle}</p>
        <p style={{ fontSize: 13, color: "var(--gray-500)", marginBottom: 16 }}>{tr.emailSystemDesc}</p>

        <Field label={tr.notificationEmail} error={errors.notificationEmail?.message}>
          <input
            {...register("notificationEmail", { required: tr.required, pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: tr.invalidEmail } })}
            type="email" className="input" placeholder={tr.notificationEmailPlaceholder}
          />
        </Field>

        <div style={{ marginTop: 16 }}>
          <label className="label">{tr.emailSetupLabel}</label>
          <div style={{ display: "flex", flexDirection: "column", gap: 8, marginTop: 4 }}>

            <label className="email-option">
              <input type="radio" value="existing" {...register("emailSetup", { required: tr.selectEmailSetup })}
                style={{ accentColor: "var(--foreground)", marginTop: 3, flexShrink: 0 }} />
              <div style={{ flex: 1 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <p style={{ fontSize: 13, fontWeight: 600, color: "var(--foreground)" }}>{tr.emailOptionExisting}</p>
                  <span style={{
                    fontSize: 10, fontWeight: 700, background: "var(--foreground)", color: "var(--background)",
                    padding: "2px 6px", borderRadius: 4, letterSpacing: "0.05em",
                  }}>{tr.emailRecommended}</span>
                </div>
                <p style={{ fontSize: 12, color: "var(--gray-500)", marginTop: 3 }}>{tr.emailOptionExistingDesc}</p>
              </div>
            </label>

            <label className="email-option">
              <input type="radio" value="create" {...register("emailSetup", { required: tr.selectEmailSetup })}
                style={{ accentColor: "var(--foreground)", marginTop: 3, flexShrink: 0 }} />
              <div>
                <p style={{ fontSize: 13, fontWeight: 600, color: "var(--foreground)" }}>{tr.emailOptionCreate}</p>
                <p style={{ fontSize: 12, color: "var(--gray-500)", marginTop: 3 }}>{tr.emailOptionCreateDesc}</p>
              </div>
            </label>
          </div>
          {errors.emailSetup && <p className="field-error">{errors.emailSetup.message}</p>}
        </div>

        {emailSetup === "existing" && (
          <div style={{ marginTop: 12 }}>
            <Field label={tr.emailOptionExistingDetailLabel} error={errors.emailSetupDetail?.message}>
              <input {...register("emailSetupDetail")} className="input" placeholder={tr.emailOptionExistingPlaceholder} />
            </Field>
            <p style={{ fontSize: 12, color: "var(--gray-500)", marginTop: 6 }}>
              🔒 {tr.emailSecurityNote}
            </p>
          </div>
        )}

        {emailSetup === "create" && (
          <div style={{ marginTop: 12 }}>
            <Field label={tr.emailOptionCreateDetailLabel} error={errors.emailSetupDetail?.message}>
              <input {...register("emailSetupDetail")} className="input" placeholder={tr.emailOptionCreatePlaceholder} />
            </Field>
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
