"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { LANGUAGES, TRANSLATIONS } from "./translations";

const STORAGE_KEY = "pooja_lang";

const LanguageContext = createContext(null);

export function LanguageProvider({ children }) {
  const [lang, setLangState] = useState("en");

  useEffect(() => {
    let saved;
    try {
      saved = window.localStorage.getItem(STORAGE_KEY);
    } catch {
      saved = null;
    }
    if (saved && TRANSLATIONS[saved]) setLangState(saved);
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  const value = useMemo(
    () => ({
      lang,
      setLang: (code) => {
        if (!TRANSLATIONS[code]) return;
        setLangState(code);
        try {
          window.localStorage.setItem(STORAGE_KEY, code);
        } catch {
          // localStorage unavailable (private browsing, etc.) - ignore
        }
      },
      t: TRANSLATIONS[lang],
      languages: LANGUAGES,
    }),
    [lang]
  );

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used within a LanguageProvider");
  return ctx;
}
