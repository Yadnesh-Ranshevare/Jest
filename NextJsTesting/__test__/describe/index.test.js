import {render, screen} from "@testing-library/react";
import Page from "../../src/app/Text/page"

describe("test group 1",()=>{


    test("test to check whether the text is present on the screen or not",()=>{
        render(<Page/>)
        const text = screen.getByText("This is a simple Next.js page")
        expect(text).toBeInTheDocument()
    })


    test("check whether input box is present or not",()=>{
        render(<Page/>)
        const input = screen.getByRole("textbox")
        const placeholder = screen.getByPlaceholderText("enter your name")
        expect(input).toBeInTheDocument()
        expect(placeholder).toBeInTheDocument()
        expect(input).toHaveAttribute("name","yadnesh")
    })
})