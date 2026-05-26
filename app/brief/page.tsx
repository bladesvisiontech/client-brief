import { LangProvider } from "@/lib/LangContext";
import BriefPageClient from "@/components/brief/BriefPageClient";

export const metadata = {
  title: "Project Brief — Inmotion",
  description: "Share your project information with the Inmotion team.",
};

export default function BriefPage() {
  return (
    <LangProvider>
      <BriefPageClient />
    </LangProvider>
  );
}
