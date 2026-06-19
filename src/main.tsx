import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { LangProvider } from "@/context/LangContext";
import { ThemeProvider } from "@/context/ThemeContext";
import { App } from "@/App";
import "@/styles/globals.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <LangProvider>
        <ThemeProvider>
          <App />
        </ThemeProvider>
      </LangProvider>
    </BrowserRouter>
  </StrictMode>
);
