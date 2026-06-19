import { useState, useCallback, useEffect, type ReactNode } from "react";
import { LangContext, type Lang } from "./langCtx";

function getInitialLang(): Lang {
  const stored = localStorage.getItem("gp-lang");
  if (stored === "en" || stored === "de") return stored;
  return "de";
}

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(getInitialLang);

  const setLang = useCallback((l: Lang) => {
    setLangState(l);
    localStorage.setItem("gp-lang", l);
    document.documentElement.lang = l;
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  return (
    <LangContext.Provider value={{ lang, setLang }}>
      {children}
    </LangContext.Provider>
  );
}
