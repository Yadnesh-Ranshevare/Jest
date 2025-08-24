import { render, screen, within } from "@testing-library/react";
import Page from "../../src/app/Text/page";

test("finds Banana only inside fruits section", () => {
  render(<Page />);

  // First, get the fruits section
  const fruitsSection = screen.getByRole("region", { name: "fruits" });

  // Now, search only inside that section
  const banana = within(fruitsSection).getByText("Banana");

  expect(banana).toBeInTheDocument();
});
