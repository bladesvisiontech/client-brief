"use client";

import { useLang } from "@/lib/LangContext";

export default function StepIndicator({ current }: { current: number }) {
  const { tr } = useLang();
  const steps = tr.steps;

  return (
    <div className="mb-8" style={{ overflowX: "hidden" }}>
      <div className="flex items-center justify-between" style={{ minWidth: 0 }}>
        {steps.map((label, i) => {
          const step = i + 1;
          const done = step < current;
          const active = step === current;
          return (
            <div key={step} className="flex items-center flex-1" style={{ minWidth: 0 }}>
              <div className="flex flex-col items-center gap-1.5">
                <div style={{
                  width: 28, height: 28, borderRadius: "50%",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: 12, fontWeight: 600, transition: "all 0.2s",
                  background: done || active ? "var(--foreground)" : "var(--gray-100)",
                  color: done || active ? "var(--background)" : "var(--gray-400)",
                  boxShadow: active ? "0 0 0 4px rgba(128,128,128,0.15)" : "none",
                }}>
                  {done ? "✓" : step}
                </div>
                <span style={{
                  fontSize: 11, fontWeight: active ? 600 : 400,
                  color: active ? "var(--foreground)" : "var(--gray-400)",
                  whiteSpace: "nowrap",
                }} className="hidden sm:block">
                  {label}
                </span>
              </div>
              {i < steps.length - 1 && (
                <div style={{
                  flex: 1, height: 1, margin: "0 6px", marginBottom: 20,
                  background: done ? "var(--foreground)" : "var(--gray-200)",
                  transition: "background 0.2s",
                }} />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
