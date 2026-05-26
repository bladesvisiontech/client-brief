"use client";

const steps = ["Tu negocio", "El proyecto", "Secciones", "Assets", "Detalles"];

export default function StepIndicator({ current }: { current: number }) {
  return (
    <div className="mb-8">
      <div className="flex items-center justify-between">
        {steps.map((label, i) => {
          const step = i + 1;
          const done = step < current;
          const active = step === current;
          return (
            <div key={step} className="flex items-center flex-1">
              <div className="flex flex-col items-center gap-1.5">
                <div
                  className="relative flex items-center justify-center"
                  style={{ width: 28, height: 28 }}
                >
                  <div
                    style={{
                      width: 28,
                      height: 28,
                      borderRadius: "50%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: 12,
                      fontWeight: 600,
                      transition: "all 0.2s",
                      background: done || active ? "var(--foreground)" : "var(--gray-100)",
                      color: done || active ? "#fff" : "var(--gray-400)",
                      boxShadow: active ? "0 0 0 4px rgba(0,0,0,0.08)" : "none",
                    }}
                  >
                    {done ? "✓" : step}
                  </div>
                </div>
                <span
                  style={{
                    fontSize: 11,
                    fontWeight: active ? 600 : 400,
                    color: active ? "var(--foreground)" : "var(--gray-400)",
                    whiteSpace: "nowrap",
                  }}
                  className="hidden sm:block"
                >
                  {label}
                </span>
              </div>
              {i < steps.length - 1 && (
                <div
                  style={{
                    flex: 1,
                    height: 1,
                    margin: "0 6px",
                    marginBottom: 20,
                    background: done ? "var(--foreground)" : "var(--gray-200)",
                    transition: "background 0.2s",
                  }}
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
