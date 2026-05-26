"use client";

import { UseFormRegister, FieldErrors } from "react-hook-form";
import { Brief, WebSection } from "@/lib/types";
import { useLang } from "@/lib/LangContext";

interface Props {
  register: UseFormRegister<Brief>;
  errors: FieldErrors<Brief>;
}

const sectionKeys: { value: WebSection; icon: string }[] = [
  { value: "hero",      icon: "▲" },
  { value: "about",     icon: "◎" },
  { value: "services",  icon: "⊞" },
  { value: "portfolio", icon: "◫" },
  { value: "team",      icon: "⊕" },
  { value: "reviews",   icon: "◈" },
  { value: "gallery",   icon: "▣" },
  { value: "pricing",   icon: "◉" },
  { value: "faq",       icon: "?" },
  { value: "blog",      icon: "≡" },
  { value: "map",       icon: "◎" },
  { value: "contact",   icon: "✉" },
];

export default function Step3Sections({ register, errors }: Props) {
  const { tr } = useLang();

  return (
    <div className="space-y-6">
      <div>
        <h2 style={{ fontSize: 20, fontWeight: 600, color: "var(--foreground)", letterSpacing: "-0.02em" }}>{tr.step3Title}</h2>
        <p style={{ fontSize: 14, color: "var(--gray-500)", marginTop: 4 }}>{tr.step3Subtitle}</p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
        {sectionKeys.map((s) => (
          <label key={s.value} className="option-card" style={{ alignItems: "center" }}>
            <input type="checkbox" value={s.value} {...register("sections", { required: tr.selectSection })}
              style={{ accentColor: "var(--foreground)", flexShrink: 0 }} />
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <span style={{ fontSize: 13, color: "var(--gray-400)", fontFamily: "var(--font-geist-mono)" }}>{s.icon}</span>
              <span style={{ fontSize: 13, fontWeight: 500, color: "var(--foreground)" }}>{tr.sections[s.value]}</span>
            </div>
          </label>
        ))}
      </div>
      {errors.sections && <p className="field-error">{String(errors.sections.message)}</p>}

      <div>
        <label className="label">{tr.sectionNotes} <span style={{ color: "var(--gray-400)", fontWeight: 400 }}>(optional)</span></label>
        <textarea {...register("sectionNotes")} rows={3} className="textarea" placeholder={tr.sectionNotesPlaceholder} />
      </div>
    </div>
  );
}
