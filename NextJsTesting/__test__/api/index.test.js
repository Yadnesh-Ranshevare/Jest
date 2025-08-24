
import Page from "../../src/app/Text/Apicall/page"
import { render, screen } from "@testing-library/react"


test("testing api",async()=>{
    render(<Page/>)
    const text = await screen.findByText("Hello yadnesh (mocked)")
    expect(text).toBeInTheDocument()
})