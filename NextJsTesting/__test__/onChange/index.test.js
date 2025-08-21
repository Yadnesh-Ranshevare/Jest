import { fireEvent, render, screen } from '@testing-library/react'
import Page from "../../src/app/Text/page"

test('onchange testing', () => {
  render(<Page />)
  let input = screen.getAllByRole("textbox")[1]
  fireEvent.change(input,{target:{value:"yadnesh"}})
  expect(input).toHaveValue("yadnesh")
})
