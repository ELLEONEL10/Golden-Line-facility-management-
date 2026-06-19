import { screen, fireEvent, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { renderWithProviders } from "@/test/utils";
import { Contact } from "./Contact";

describe("Contact", () => {
  it("renders contact section with title", () => {
    renderWithProviders(<Contact />);
    expect(screen.getByText("Ihr direkter Draht zu uns")).toBeInTheDocument();
  });

  it("renders contact info items", () => {
    renderWithProviders(<Contact />);
    expect(screen.getByText("Telefon")).toBeInTheDocument();
    expect(screen.getByText("E-Mail")).toBeInTheDocument();
  });

  it("renders form fields", () => {
    renderWithProviders(<Contact />);
    expect(screen.getByLabelText(/Vor- und Nachname/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/E-Mail-Adresse/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Telefonnummer/i)).toBeInTheDocument();
  });

  it("shows validation errors on empty submit", async () => {
    renderWithProviders(<Contact />);
    const submitBtn = screen.getByRole("button", { name: /Anfrage absenden/i });
    fireEvent.click(submitBtn);
    await waitFor(() => {
      expect(screen.getByText("Bitte geben Sie Ihren Namen ein.")).toBeInTheDocument();
    });
  });

  it("opens Datenschutzerklärung modal on click", () => {
    renderWithProviders(<Contact />);
    const gdprLink = screen.getByText("Datenschutzerklärung");
    fireEvent.click(gdprLink);
    expect(screen.getByRole("dialog")).toBeInTheDocument();
    expect(screen.getByText(/Verantwortlicher/i)).toBeInTheDocument();
  });

  it("submits form with valid data", async () => {
    const user = userEvent.setup();
    renderWithProviders(<Contact />);

    await user.type(screen.getByLabelText(/Vor- und Nachname/i), "Max Mustermann");
    await user.type(screen.getByLabelText(/E-Mail-Adresse/i), "max@example.com");
    await user.type(screen.getByLabelText(/Telefonnummer/i), "0301234567");

    const select = screen.getByLabelText(/Gewünschte Leistung/i);
    await user.selectOptions(select, "Gebäudereinigung");

    const gdprCheckbox = screen.getByRole("checkbox");
    await user.click(gdprCheckbox);

    const submitBtn = screen.getByRole("button", { name: /Anfrage absenden/i });
    await user.click(submitBtn);

    await waitFor(() => {
      expect(screen.getByText("Vielen Dank!")).toBeInTheDocument();
    }, { timeout: 3000 });
  });
});
