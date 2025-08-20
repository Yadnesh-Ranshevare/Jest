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


