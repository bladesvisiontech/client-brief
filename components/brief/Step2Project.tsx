"use client";

import { UseFormRegister, FieldErrors } from "react-hook-form";
import { Brief, ProjectType } from "@/lib/types";
import { useLang } from "@/lib/LangContext";

interface Props {
  register: UseFormRegister<Brief>;
  errors: FieldErrors<Brief>;
}

export default function Step2Project({ register, errors }: Props) {
  const { tr } = useLang();

  const projectTypes: { value: ProjectType; label: string; desc: string }[] = [
    { value: "website",   label: tr.website,   desc: tr.websiteDesc },
    { value: "ecommerce", label: tr.ecommerce, desc: tr.ecommerceDesc },
    { value: "landing",   label: tr.landing,   desc: tr.landingDesc },
    { value: "app",       label: tr.app,       desc: tr.appDesc },
    { value: "other",     label: tr.other,     desc: tr.otherDesc },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 style={{ fontSize: 20, fontWeight: 600, color: "var(--foreground)", letterSpacing: "-0.02em" }}>{tr.step2Title}</h2>
        <p style={{ fontSize: 14, color: "var(--gray-500)", marginTop: 4 }}>{tr.step2Subtitle}</p>
      </div>

      <div>
        <label className="label">{tr.projectType}</label>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {projectTypes.map((type) => (
            <label key={type.value} className="option-card">
              <input type="radio" value={type.value} {...register("projectType", { required: tr.selectType })} style={{ accentColor: "var(--foreground)", marginTop: 2 }} />
              <div>
                <p style={{ fontSize: 13, fontWeight: 500, color: "var(--foreground)" }}>{type.label}</p>
                <p style={{ fontSize: 12, color: "var(--gray-500)", marginTop: 1 }}>{type.desc}</p>
              </div>
            </label>
          ))}
        </div>
        {errors.projectType && <p className="field-error">{errors.projectType.message}</p>}
      </div>

      <div>
        <label className="label">{tr.projectDesc}</label>
        <textarea
          {...register("description", { required: tr.required, minLength: { value: 20, message: tr.minChars } })}
          rows={4} className="textarea" placeholder={tr.projectDescPlaceholder}
        />
        {errors.description && <p className="field-error">{errors.description.message}</p>}
      </div>

      <div>
        <label className="label">{tr.references} <span style={{ color: "var(--gray-400)", fontWeight: 400 }}>{tr.referencesOptional}</span></label>
        <div className="space-y-2">
          <input {...register("referenceUrls.0")} className="input" placeholder="https://example.com" />
          <input {...register("referenceUrls.1")} className="input" placeholder="https://another-example.com" />
        </div>
      </div>
    </div>
  );
}
