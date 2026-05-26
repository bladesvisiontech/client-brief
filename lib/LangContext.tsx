"use client";

import { createContext, useContext, useState } from "react";
import { Lang, t } from "./i18n";

type Translations = typeof t.en | typeof t.es;

interface LangContextType {
  lang: Lang;
  tr: Translations;
  toggleLang: () => void;
}

const LangContext = createContext<LangContextType>({
  lang: "en",
  tr: t.en,
  toggleLang: () => {},
});

export function LangProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLang] = useState<Lang>("en");
  const toggleLang = () => setLang((l) => (l === "en" ? "es" : "en"));
  return (
    <LangContext.Provider value={{ lang, tr: t[lang], toggleLang }}>
      {children}
    </LangContext.Provider>
  );
}

export function useLang() {
  return useContext(LangContext);
}
