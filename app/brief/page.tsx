import BriefWizard from "@/components/brief/BriefWizard";

export const metadata = {
  title: "Brief del proyecto — Inmotion",
  description: "Cuéntanos sobre tu proyecto y sube tus assets para que podamos empezar a trabajar.",
};

export default function BriefPage() {
  return (
    <main className="min-h-screen bg-gray-50">
      <div className="max-w-2xl mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-10">
          <p className="text-sm font-semibold tracking-widest text-gray-400 uppercase mb-2">Inmotion</p>
          <h1 className="text-3xl font-bold text-gray-900">Brief del proyecto</h1>
          <p className="text-gray-500 mt-2">
            Completa este formulario para darnos toda la información necesaria y empezar tu proyecto.
          </p>
        </div>

        {/* Card */}
        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-6 sm:p-10">
          <BriefWizard />
        </div>

        <p className="text-center text-xs text-gray-400 mt-6">
          ¿Tienes dudas? Escríbenos a{" "}
          <a href="mailto:bladesvisiontech@gmail.com" className="underline">
            bladesvisiontech@gmail.com
          </a>
        </p>
      </div>
    </main>
  );
}
