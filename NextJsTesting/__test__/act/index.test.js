import { render, screen, act } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import React from "react";


function Counter() {
  const [count, setCount] = React.useState(0);
  return (
    <>
      <p>Count: {count}</p>
      <button onClick={() => setCount(c => c + 1)}>Increment</button>
    </>
  );
}


test("increments counter safely", async () => {
  render(<Counter />);
  const button = screen.getByRole("button", { name: /increment/i });

  await act(async () => {
    await userEvent.click(button);
  });

  expect(screen.getByText("Count: 1")).toBeInTheDocument();
});