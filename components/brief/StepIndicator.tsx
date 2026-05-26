"use client";

const steps = ["Tu negocio", "El proyecto", "Secciones", "Assets", "Detalles"];

export default function StepIndicator({ current }: { current: number }) {
  return (
    <div className="flex items-center justify-center gap-2 mb-8">
      {steps.map((label, i) => {
        const step = i + 1;
        const done = step < current;
        const active = step === current;
        return (
          <div key={step} className="flex items-center gap-2">
            <div className="flex flex-col items-center">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold transition-all ${
                  done
                    ? "bg-black text-white"
                    : active
                    ? "bg-black text-white ring-4 ring-black/20"
                    : "bg-gray-100 text-gray-400"
                }`}
              >
                {done ? "✓" : step}
              </div>
              <span
                className={`text-xs mt-1 hidden sm:block ${
                  active ? "text-black font-medium" : "text-gray-400"
                }`}
              >
                {label}
              </span>
            </div>
            {i < steps.length - 1 && (
              <div
                className={`w-8 sm:w-16 h-0.5 mb-4 ${
                  done ? "bg-black" : "bg-gray-200"
                }`}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}
