import { render, screen } from "@testing-library/react";
import { Button } from "./Button";

describe("Button", () => {
  it("renders with gold variant by default", () => {
    render(<Button>Click me</Button>);
    const btn = screen.getByRole("button", { name: "Click me" });
    expect(btn).toBeInTheDocument();
    expect(btn.className).toContain("btn-gold");
  });

  it("renders with outline variant", () => {
    render(<Button variant="outline">Outline</Button>);
    expect(screen.getByRole("button").className).toContain("btn-outline");
  });

  it("renders as link when href provided", () => {
    render(<Button href="#test">Link</Button>);
    const link = screen.getByRole("link", { name: "Link" });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute("href", "#test");
  });

  it("is disabled when loading", () => {
    render(<Button loading={true}>Loading</Button>);
    expect(screen.getByRole("button")).toBeDisabled();
  });

  it("is disabled when disabled prop true", () => {
    render(<Button disabled={true}>Disabled</Button>);
    expect(screen.getByRole("button")).toBeDisabled();
  });

  it("renders leftIcon when provided", () => {
    render(<Button leftIcon={<span data-testid="icon">✉</span>}>With Icon</Button>);
    expect(screen.getByTestId("icon")).toBeInTheDocument();
  });
});
