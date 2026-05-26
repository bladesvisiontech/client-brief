"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { Brief, BriefAssets } from "@/lib/types";
import StepIndicator from "./StepIndicator";
import Step1Business from "./Step1Business";
import Step2Project from "./Step2Project";
import Step3Sections from "./Step3Sections";
import Step4Assets from "./Step4Assets";
import Step5Details from "./Step5Details";

function generateId() {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 7);
}

export default function BriefWizard() {
  const [step, setStep] = useState(1);
  const [briefId] = useState(() => generateId());
  const [assets, setAssets] = useState<BriefAssets>({ photos: [], documents: [] });
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const { register, handleSubmit, trigger, formState: { errors } } = useForm<Brief>({
    defaultValues: { referenceUrls: [], sections: [], assets: { photos: [], documents: [] } },
  });

  const stepFields: Record<number, (keyof Brief)[]> = {
    1: ["clientName", "businessName", "email", "phone"],
    2: ["projectType", "description"],
    3: ["sections"],
    4: [],
    5: ["style", "deadline"],
  };

  async function next() {
    const valid = await trigger(stepFields[step]);
    if (valid) setStep((s) => s + 1);
  }

  function back() {
    setStep((s) => s - 1);
  }

  async function onSubmit(data: Brief) {
    setSubmitting(true);
    try {
      const payload = { ...data, id: briefId, assets };
      const res = await fetch("/api/brief", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error("Error al enviar");
      setSubmitted(true);
    } catch {
      alert("Hubo un error al enviar. Por favor intenta de nuevo.");
    } finally {
      setSubmitting(false);
    }
  }

  if (submitted) {
    return (
      <div style={{ textAlign: "center", padding: "48px 0" }}>
        <div style={{
          width: 56, height: 56, borderRadius: "50%",
          background: "var(--gray-100)", display: "flex",
          alignItems: "center", justifyContent: "center",
          margin: "0 auto 20px", fontSize: 24,
        }}>✓</div>
        <h2 style={{ fontSize: 20, fontWeight: 600, color: "var(--foreground)", letterSpacing: "-0.02em" }}>
          Brief enviado
        </h2>
        <p style={{ fontSize: 14, color: "var(--gray-500)", marginTop: 8, maxWidth: 360, margin: "8px auto 0" }}>
          Recibimos toda tu información. Nuestro equipo la revisará y te contactará pronto para comenzar.
        </p>
        <p style={{ fontSize: 12, color: "var(--gray-400)", marginTop: 20 }}>
          Referencia: <span style={{ fontFamily: "var(--font-geist-mono)" }}>{briefId}</span>
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <StepIndicator current={step} />

      <div style={{ minHeight: 400 }}>
        {step === 1 && <Step1Business register={register} errors={errors} />}
        {step === 2 && <Step2Project register={register} errors={errors} />}
        {step === 3 && <Step3Sections register={register} errors={errors} />}
        {step === 4 && <Step4Assets briefId={briefId} assets={assets} onAssetsChange={setAssets} />}
        {step === 5 && <Step5Details register={register} errors={errors} />}
      </div>

      <div style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginTop: 32,
        paddingTop: 24,
        borderTop: "1px solid var(--border)",
      }}>
        {step > 1 ? (
          <button type="button" onClick={back} className="btn btn-secondary">
            ← Atrás
          </button>
        ) : (
          <div />
        )}

        {step < 5 ? (
          <button type="button" onClick={next} className="btn btn-primary">
            Continuar →
          </button>
        ) : (
          <button type="submit" disabled={submitting} className="btn btn-primary">
            {submitting ? "Enviando..." : "Enviar brief"}
          </button>
        )}
      </div>
    </form>
  );
}
