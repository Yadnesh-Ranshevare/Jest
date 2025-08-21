import { fireEvent, render, screen } from '@testing-library/react'
import Page from "../../src/app/Text/page"

test('onClick testing', () => {
  render(<Page />)
  let but = screen.getByRole("button")
  fireEvent.click(but)
  expect(screen.getByText("updated data")).toBeInTheDocument()
})
