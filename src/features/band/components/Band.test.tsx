import { screen } from "@testing-library/react";
import { renderWithProviders } from "@/test/utils";
import { Band } from "./Band";

describe("Band", () => {
  it("renders all band items", () => {
    renderWithProviders(<Band />);
    expect(screen.getByText("Leistungsbereiche")).toBeInTheDocument();
    expect(screen.getByText("Bundesweit verfügbar")).toBeInTheDocument();
    expect(screen.getByText("Kundenbewertung")).toBeInTheDocument();
    expect(screen.getByText("Inhabergeführt")).toBeInTheDocument();
  });

  it("renders band section element", () => {
    const { container } = renderWithProviders(<Band />);
    expect(container.querySelector("section")).toBeInTheDocument();
  });
});
