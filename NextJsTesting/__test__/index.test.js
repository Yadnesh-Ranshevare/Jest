import { render, screen } from '@testing-library/react'
import Page from '../src/app/page'

test('renders template text', () => {
  render(<Page />)
  expect(screen.getByText(/Get started by editing/i)).toBeInTheDocument()
})
