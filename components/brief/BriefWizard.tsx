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
      <div className="text-center py-16 space-y-4">
        <div className="text-6xl">🎉</div>
        <h2 className="text-2xl font-bold text-gray-900">¡Brief enviado con éxito!</h2>
        <p className="text-gray-500 max-w-md mx-auto">
          Recibimos toda tu información. Nuestro equipo la revisará y te contactará pronto para empezar tu proyecto.
        </p>
        <p className="text-xs text-gray-400">ID de tu brief: <span className="font-mono">{briefId}</span></p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <StepIndicator current={step} />

      <div className="min-h-[420px]">
        {step === 1 && <Step1Business register={register} errors={errors} />}
        {step === 2 && <Step2Project register={register} errors={errors} />}
        {step === 3 && <Step3Sections register={register} errors={errors} />}
        {step === 4 && (
          <Step4Assets
            briefId={briefId}
            assets={assets}
            onAssetsChange={setAssets}
          />
        )}
        {step === 5 && <Step5Details register={register} errors={errors} />}
      </div>

      <div className="flex justify-between items-center mt-8 pt-6 border-t border-gray-100">
        {step > 1 ? (
          <button
            type="button"
            onClick={back}
            className="px-6 py-2.5 text-sm font-medium text-gray-600 hover:text-black transition"
          >
            ← Atrás
          </button>
        ) : (
          <div />
        )}

        {step < 5 ? (
          <button
            type="button"
            onClick={next}
            className="px-8 py-2.5 bg-black text-white text-sm font-medium rounded-xl hover:bg-gray-800 transition"
          >
            Continuar →
          </button>
        ) : (
          <button
            type="submit"
            disabled={submitting}
            className="px-8 py-2.5 bg-black text-white text-sm font-medium rounded-xl hover:bg-gray-800 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {submitting ? "Enviando..." : "Enviar brief ✓"}
          </button>
        )}
      </div>
    </form>
  );
}
