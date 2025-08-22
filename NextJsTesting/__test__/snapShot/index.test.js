import {render} from "@testing-library/react";
import Page from "../../src/app/Text/page";

test("snapshot test", () => {
    const container = render(<Page />);
    expect(container).toMatchSnapshot();
});