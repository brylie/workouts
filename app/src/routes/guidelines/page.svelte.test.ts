import { render, screen } from "@testing-library/svelte";
import { describe, it, expect } from "vitest";
import GuidelinesPage from "./+page.svelte";

describe("Training Guidelines Page", () => {
  it("renders the training guidelines page with key sections", () => {
    render(GuidelinesPage);

    // Check main heading
    expect(
      screen.getByRole("heading", { name: /training guidelines/i }),
    ).toBeDefined();

    // Check for frequency section
    expect(screen.getByRole("heading", { name: /frequency/i })).toBeDefined();
    expect(
      screen.getByText(/exercise each muscle group twice per week/i),
    ).toBeDefined();

    // Check for bicep development section
    expect(
      screen.getByRole("heading", { name: /bicep development/i }),
    ).toBeDefined();
    expect(
      screen.getByText(/promote bicep growth by exercising all three muscles/i),
    ).toBeDefined();

    // Check that all three bicep muscles are mentioned in headings
    expect(screen.getByRole("heading", { name: /long head/i })).toBeDefined();
    expect(screen.getByRole("heading", { name: /short head/i })).toBeDefined();
    expect(screen.getByRole("heading", { name: /brachialis/i })).toBeDefined();
  });
});
