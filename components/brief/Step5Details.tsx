"use client";

import { UseFormRegister, FieldErrors } from "react-hook-form";
import { Brief } from "@/lib/types";
import { useLang } from "@/lib/LangContext";

interface Props {
  register: UseFormRegister<Brief>;
  errors: FieldErrors<Brief>;
}

const styleKeys = ["minimalista", "moderno", "elegante", "corporativo", "creativo"] as const;

export default function Step5Details({ register, errors }: Props) {
  const { tr } = useLang();

  return (
    <div className="space-y-6">
      <div>
        <h2 style={{ fontSize: 20, fontWeight: 600, color: "var(--foreground)", letterSpacing: "-0.02em" }}>{tr.step5Title}</h2>
        <p style={{ fontSize: 14, color: "var(--gray-500)", marginTop: 4 }}>{tr.step5Subtitle}</p>
      </div>

      <div>
        <label className="label">{tr.visualStyle}</label>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {styleKeys.map((s) => (
            <label key={s} className="option-card">
              <input type="radio" value={s} {...register("style", { required: tr.selectStyle })} style={{ accentColor: "var(--foreground)", marginTop: 2 }} />
              <div>
                <p style={{ fontSize: 13, fontWeight: 500, color: "var(--foreground)" }}>{tr.styles[s].label}</p>
                <p style={{ fontSize: 12, color: "var(--gray-500)", marginTop: 1 }}>{tr.styles[s].desc}</p>
              </div>
            </label>
          ))}
        </div>
        {errors.style && <p className="field-error">{errors.style.message}</p>}
      </div>

      <div>
        <label className="label">{tr.colors} <span style={{ color: "var(--gray-400)", fontWeight: 400 }}>{tr.colorsOptional}</span></label>
        <input {...register("colors")} className="input" placeholder={tr.colorsPlaceholder} />
      </div>

      <div>
        <label className="label">{tr.deadline} *</label>
        <input {...register("deadline", { required: tr.required })} type="date" className="input" />
        {errors.deadline && <p className="field-error">{errors.deadline.message}</p>}
      </div>

      <div>
        <label className="label">{tr.extraNotes} <span style={{ color: "var(--gray-400)", fontWeight: 400 }}>{tr.extraNotesOptional}</span></label>
        <textarea {...register("extraNotes")} rows={4} className="textarea" placeholder={tr.extraNotesPlaceholder} />
      </div>
    </div>
  );
}
