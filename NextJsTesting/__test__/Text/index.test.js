import {render, screen} from "@testing-library/react";
import Page from "../../src/app/Text/page"


test("test to check whether the text is present on the screen or not",()=>{
    render(<Page/>)
    const text = screen.getByText("This is a simple Next.js page")
    const img = screen.getByTitle(/simple img/i)
    const imgByAlt = screen.getByAltText("simple image")
    expect(text).toBeInTheDocument()
    expect(img).toBeInTheDocument()
    expect(imgByAlt).toBeInTheDocument()
})


test("check whether input box is present or not",()=>{
    render(<Page/>)
    const input = screen.getByRole("textbox")
    const placeholder = screen.getByPlaceholderText("enter your name")
    expect(input).toBeInTheDocument()
    expect(placeholder).toBeInTheDocument()
    expect(input).toHaveAttribute("type","text")
    expect(input).toHaveAttribute("name","yadnesh")
})

