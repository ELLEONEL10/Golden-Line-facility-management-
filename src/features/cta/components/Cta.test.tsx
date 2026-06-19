import { screen } from "@testing-library/react";
import { renderWithProviders } from "@/test/utils";
import { CtaBand } from "./Cta";

describe("CtaBand", () => {
  it("renders CTA title and subtitle", () => {
    renderWithProviders(<CtaBand />);
    expect(screen.getByText("Bereit für ein sauberes Ergebnis?")).toBeInTheDocument();
    expect(screen.getByText(/Fordern Sie jetzt/)).toBeInTheDocument();
  });

  it("renders both CTA buttons", () => {
    renderWithProviders(<CtaBand />);
    expect(screen.getByText("Jetzt anfragen")).toBeInTheDocument();
    expect(screen.getByText("Direkt anrufen")).toBeInTheDocument();
  });
});
