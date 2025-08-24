import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Page from "../../src/app/Text/page";

test("user event library", async () => {
  render(<Page />);
  const button = screen.getByRole("button", { name: /click me/i });

  await userEvent.click(button);

  expect(screen.getByText("updated data")).toBeInTheDocument();
});
