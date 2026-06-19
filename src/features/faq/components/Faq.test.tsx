import { screen, fireEvent } from "@testing-library/react";
import { renderWithProviders } from "@/test/utils";
import { Faq } from "./Faq";

describe("Faq", () => {
  it("renders FAQ section with title", () => {
    renderWithProviders(<Faq />);
    expect(screen.getByText("Häufig gestellte")).toBeInTheDocument();
    expect(screen.getByText("Fragen")).toBeInTheDocument();
  });

  it("renders FAQ items", () => {
    renderWithProviders(<Faq />);
    const buttons = screen.getAllByRole("button");
    expect(buttons.length).toBeGreaterThanOrEqual(5);
  });

  it("expands FAQ item on click", () => {
    renderWithProviders(<Faq />);
    const buttons = screen.getAllByRole("button");
    const firstBtn = buttons[0]!;
    expect(firstBtn).toHaveAttribute("aria-expanded", "false");
    fireEvent.click(firstBtn);
    expect(firstBtn).toHaveAttribute("aria-expanded", "true");
  });

  it("collapses FAQ item on second click", () => {
    renderWithProviders(<Faq />);
    const buttons = screen.getAllByRole("button");
    const firstBtn = buttons[0]!;
    fireEvent.click(firstBtn);
    expect(firstBtn).toHaveAttribute("aria-expanded", "true");
    fireEvent.click(firstBtn);
    expect(firstBtn).toHaveAttribute("aria-expanded", "false");
  });

  it("renders call-to-action link", () => {
    renderWithProviders(<Faq />);
    expect(screen.getByText("Jetzt anrufen")).toBeInTheDocument();
  });
});
