import { useContext } from "react";
import { LangContext, type LangContextValue } from "@/context/langCtx";

export function useLang(): LangContextValue {
  const ctx = useContext(LangContext);
  if (!ctx) throw new Error("useLang must be used within LangProvider");
  return ctx;
}
