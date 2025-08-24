# Content
1. [Introduction](#introduction)
2. [Basic Testing](#basic-testing)
3. [Jest Set Up For Next.js](#jest-set-up-for-nextjs)
4. [RTL query](#rtl-query)
5. [Assertion method](#assertion-method)
6. [Test To Check whether the text is present on the screen or not](#test-to-check-whether-the-text-is-present-on-the-screen-or-not)
7. [Test to check whether role element is present or not and has all the necessary attribute or not](#test-to-check-whether-role-element-is-present-or-not-and-has-all-the-necessary-attribute-or-not)
8. [describe / only / skip](#describe--only--skip)
9. [onChange Testing](#onchange-testing)
10. [onClick testing](#onclick-testing)
11. [User Event Library](#user-event-library)
12. [act Function](#act-function)
12. [Before and After hooks of Jest](#before-and-after-hooks-of-jest)
13. [Custom Query Using Vanilla DOM APIs](#custom-query-using-vanilla-dom-apis)
14. [Custom Query Using RTL (buildQueries & queryHelpers)](#custom-query-using-rtl-buildqueries--queryhelpers)
15. [within](#within)
16. [Api testing with msw](#api-testing-with-msw)


# Introduction

Jest is a JavaScript testing framework mainly used for testing applications built with React, but it can test any kind of JavaScript code.

It was developed by Facebook (Meta) and is widely used because it’s easy to set up, fast, and comes with many features built-in, like:
- **Test runner** → runs your test cases.

- **Assertions** → checks if your code gives the expected output.

- **Mocking** → lets you simulate functions, modules, or APIs.

- **Snapshot testing** → captures component output and compares it later to ensure nothing breaks.


### Classification of Testing
1. **Manual Testing**
- A human tester runs the app and checks if it works correctly.
- Example: Opening a website, typing in a login form, and verifying if it logs in.
- Pros:
    - Good for exploring new features
    - Finds UI/UX issues that automated tests might miss
- Cons:
    - Slow
    - Repetitive
    - Error-prone

2. **Automated Testing**
- Uses tools or frameworks (like Jest, Selenium, Cypress, Playwright) to run tests automatically.
- Example (Jest test runs automatically when you type npm test):
- Pros:
    - Fast, repeatable, and can run on every code change (CI/CD pipelines)
    - Great for regression testing (making sure old features still work)
- Cons:
    - Initial setup takes time
    - Can’t fully replace human judgment (e.g., design, usability issues)

### Type of Testing

1. **Unit Testing**
    - Tests a small piece of code (like a function or method).
    - Ensures each function works as expected.

2. **Integration Testing**
    - Tests how different modules work together.
    - Example: testing a function that calls a database and formats the result.

3. **System Testing**
    - Tests the whole application as a complete system.
    - Checks if all parts (frontend, backend, DB, APIs) work together.

4. **End-to-End (E2E) Testing**
    - Simulates real user actions in the app.
    - Example: Opening a website, logging in, clicking buttons.
    - Tools: Cypress, Playwright, Selenium.

5. **Regression Testing**
    - Run old test cases again after new code changes.
    - Ensures new updates didn’t break existing features.

6. **Performance Testing**
    - Tests speed, responsiveness, scalability.
    - Example: How many users can the app handle at once?

7. **Acceptance Testing**
    - Done to check if the software meets business requirements.
    - Often done by clients or QA before release.
### Installation
1. Initialize npm (if you don’t already have a package.json):
```bach
npm init -y
```
2. Install Jest:
```bash
npm install --save-dev jest
```
3. Update package.json → add a test script:
```json
{
  "scripts": {
    "test": "jest"
  }
}
```

**Note: By default, Jest expects CommonJS (`require`), not ES module(`import/export`)**

### Setup for Using ES module
1. In `package.json`, add:
```json
{
  "type": "module",
  "scripts": {
    "test": "jest"
  }
}
```
2. Install the needed packages:
```bash
npm install --save-dev jest babel-jest @babel/preset-env
```
3. Create a `babel.config.cjs` (⚠ not `.js`, otherwise Jest thinks it’s ESM):
```js
module.exports = {
  presets: [['@babel/preset-env', { targets: { node: 'current' } }]],
};
```

### Now run the following command to run the test cases
```bash
npm test
```
Note: this will only display the final result of all test cases which look something like this:
```bash
> my-app@0.1.0 test
> jest

PASS  __test__/index.test.js
PASS  __test__/Text/index.test.js

Test Suites: 2 passed, 2 total
Tests:       3 passed, 3 total
Snapshots:   0 total
Time:        0.998 s, estimated 1 s
Ran all test suites.
```

but if you want details result of your test cases then update your script(`package.json`) to:
```json
{
  "scripts": {
    "test": "jest --verbose"
  }
}
```
now when ever you run `npm test` you'll get result that look something like this:
```bash
PASS  __test__/index.test.js
√ renders template text (12 ms)
                                                                                         
PASS  __test__/Text/index.test.js                                                                  
√ test to check whether the text is present on the screen or not (4 ms)
√ check whether input box is present or not (9 ms)   

Test Suites: 2 passed, 2 total                                                                                                                                        
Tests:       3 passed, 3 total
Snapshots:   0 total
Time:        0.991 s, estimated 1 s
Ran all test suites.
```
Here we have complete detail of our test cases
```bash
PASS  __test__/index.test.js
√ renders template text (12 ms)
```
here we see that there is only one test case name `"renders template text"` in file `"__test__/Text/index.test."` which is successfully `PASS` in `12 ms` of time
```bash
PASS  __test__/Text/index.test.js                                                                  
√ test to check whether the text is present on the screen or not (4 ms)
√ check whether input box is present or not (9 ms)  
```
here we have two test cases in file `"__test__/Text/index.test"`
1. `"test to check whether the text is present on the screen or not"` which `PASS` successfully in `4ms`

2. `"check whether input box is present or not"` which `PASS` successfully in `9ms`


### Naming convention
When you write tests with Jest, the test files usually follow a standard naming convention so Jest can automatically detect and run them.

There are three common ways to name test files:
1. `*.test.js/jsx`
2. `*.spec.js/jsx`
3. Anything inside a `__tests__` folder


[Go To Top](#content)

---

# Basic Testing
let say you have a function  that add to numbers
```js
// sum.js
export default function sum(a, b) {
  return a + b;
}
```
Now to test whether this function works properly or not we can use jest to write some test cases

**A test case is simply a single check to verify that a small part of your program works as expected.**

### Example

Imagine you wrote a function `sum(a, b)` → it should return the addition of `a` and `b`.\
A test case would be:
- Input: `sum(2, 3)`

- Expected Output: `5`

If the function gives `5`, ✅ test passes.\
If it gives something else, ❌ test fails.

### In Jest a test case is usually written inside the test() (or it()) function.

Example
```js
import sum from './sum.js';

test('adds 2 + 3 to equal 5', () => {
  expect(sum(2, 3)).toBe(5);
});
```
Here:
- `test('adds 2 + 3 to equal 5', ... )` → defines one test case.
- `expect(sum(2, 3)).toBe(5);` → the actual check (assertion).

### Multiple Test Cases for the Same Function
```js
import sum from './sum.js';

test('adds 2 + 3 to equal 5', () => {
  expect(sum(2, 3)).toBe(5);
});

test('adds -1 + 1 to equal 0', () => {
  expect(sum(-1, 1)).toBe(0);
});

test('adds 10 + 20 to equal 30', () => {
  expect(sum(10, 20)).toBe(30);
});
```

[Go To Top](#content)

---


# Jest Set Up For Next.js 

**Next.js is a React framework, and Jest works well with it — but Next.js uses ESM + JSX + TypeScript (sometimes), so we need a little setup.**

### Setting up Jest in a Next.js Project

1. **Create a Next.js Project (if you don’t have one yet)**

```bash
npx create-next-app my-app
cd my-app
```
2. **Install Jest + Helpers**

```bash
npm install --save-dev jest @testing-library/react @testing-library/jest-dom @testing-library/user-event jest-environment-jsdom
```
3. **Create `jest.setup.js`**
```js
import '@testing-library/jest-dom'
```
4. **Create `jest.config.js`**

Inside your project root, add:
```js
const nextJest = require('next/jest')

const createJestConfig = nextJest({
  dir: './',
})

const customJestConfig = {
  testEnvironment: 'jest-environment-jsdom',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],  
}

module.exports = createJestConfig(customJestConfig)
```
This config makes Jest understand Next.js (like images, CSS imports, etc.).

5. **Add Script in `package.json`**
```json
{
    "scripts": {
        "test": "jest"
    }
}
```
6. **Write a Test**

Example: test the default Home page.

Create `__tests__/index.test.js:`

```js
import { render, screen } from '@testing-library/react'
import Page from '../src/app/page'

test('renders template text', () => {
  render(<Page />)
  expect(screen.getByText(/Get started by editing/i)).toBeInTheDocument()
})
```
7. **Run Tests**
```bash
npm test
```

**Bonus (Optional: TypeScript Support)**

If your Next.js project uses TypeScript:
```bash
npm install --save-dev ts-jest @types/jest
```


[Go To Top](#content)

---

# Assertion method
An assertion method is a tool that helps you verify if your code does what you expect.

If an assertion fails → the test fails.

Jest gives you a global `expect()` function.\
You write `expect(value).matcher()` → where matcher is the assertion method.

### Common Matchers
| **Matcher**           | **What it Checks**             | **Example**                         |
| --------------------- | ------------------------------ | ----------------------------------- |
| `.toBe(value)`        | Exact equality (like `===`)    | `expect(2 + 2).toBe(4)`             |
| `.toEqual(value)`     | Deep equality (objects/arrays) | `expect({a:1}).toEqual({a:1})`      |
| `.toBeTruthy()`       | Value is truthy                | `expect("hello").toBeTruthy()`      |
| `.toBeFalsy()`        | Value is falsy                 | `expect("").toBeFalsy()`            |
| `.toBeNull()`         | Value is `null`                | `expect(null).toBeNull()`           |
| `.toBeUndefined()`    | Value is `undefined`           | `expect(undefined).toBeUndefined()` |
| `.toContain(item)`    | Array/string contains item     | `expect([1,2,3]).toContain(2)`      |
| `.toHaveLength(n)`    | Checks array/string length     | `expect("hello").toHaveLength(5)`   |
| `.toBeGreaterThan(n)` | Value > n                      | `expect(10).toBeGreaterThan(5)`     |
| `.toBeLessThan(n)`    | Value < n                      | `expect(2).toBeLessThan(5)`         |

### Extra Matchers from React Testing Library (`@testing-library/jest-dom`)

RTL adds special DOM-related assertions (via `jest-dom`):

| **Matcher**                    | **What it Checks**        | **Example**                                      |
| ------------------------------ | ------------------------- | ------------------------------------------------ |
| `.toBeInTheDocument()`         | Element exists in DOM     | `expect(button).toBeInTheDocument()`             |
| `.toBeVisible()`               | Element is visible        | `expect(modal).toBeVisible()`                    |
| `.toBeDisabled()`              | Element is disabled       | `expect(button).toBeDisabled()`                  |
| `.toBeEnabled()`               | Element is enabled        | `expect(input).toBeEnabled()`                    |
| `.toHaveTextContent(text)`     | Element contains text     | `expect(heading).toHaveTextContent("Welcome")`   |
| `.toHaveAttribute(attr, val?)` | Element has an attribute  | `expect(img).toHaveAttribute("src", "logo.png")` |
| `.toHaveClass(className)`      | Element has a CSS class   | `expect(div).toHaveClass("active")`              |
| `.toHaveStyle(style)`          | Element has inline style  | `expect(div).toHaveStyle("display: none")`       |
| `.toBeChecked()`               | Checkbox/radio is checked | `expect(checkbox).toBeChecked()`                 |
| `.toHaveValue(value)`          | Input has value           | `expect(input).toHaveValue("John")`              |


### Example
```js
test("math works", () => {
  expect(2 + 2).toBe(4);   // ✅ passes
  expect(2 + 2).toBe(5);   // ❌ fails
});
```
Here:
- `expect(2 + 2)` → what you are testing.
- `.toBe(4)` → the assertion method (the rule you’re checking).

[Go To Top](#content)

---


# RTL query
**RTL = React Testing Library.**

It provides helper functions (called queries) to find elements in the rendered React component.

These queries are used inside Jest tests to check if UI behaves correctly.

### Types of Queries

RTL gives multiple query methods, grouped mainly as:
1. getBy* → Finds an element.
    - If it’s not found → throws an error (test fails).
    - Example: `getByText("Submit")`.
2. queryBy* → Similar, but returns null instead of throwing an error.
    - Useful for checking something should not exist.
    - Example: `queryByText("Error message")`.
3. findBy* → Asynchronous, waits until the element appears (default 1s).
    - Useful when elements load after API calls or async events.
    - Example: `findByText("Data loaded")`.


| **Query Type**       | **What it Does**                                                            | **Example Usage**                                 |
| -------------------- | --------------------------------------------------------------------------- | ------------------------------------------------- |
| **Role**             | Finds elements by their role (button, link, textbox, etc.). ✅ Best practice | `screen.getByRole("button", { name: /submit/i })` |
| **Label Text**       | Finds form fields by their `<label>` text                                   | `screen.getByLabelText("Username")`               |
| **Placeholder Text** | Finds input by its placeholder text                                         | `screen.getByPlaceholderText("Enter email")`      |
| **Text**             | Finds element by the visible text inside it                                 | `screen.getByText("Hello World")`                 |
| **Display Value**    | Finds input by the text/value it currently has                              | `screen.getByDisplayValue("John Doe")`            |
| **Alt Text**         | Finds images by their `alt` attribute                                       | `screen.getByAltText("Profile picture")`          |
| **Title**            | Finds element by its `title` attribute                                      | `screen.getByTitle("close button")`               |
| **Test ID**          | Finds by `data-testid` attribute (⚠️ last option)                           | `screen.getByTestId("login-form")`                |


[Go To Top](#content)

---


# Test To Check whether the text is present on the screen or not

To check whether text is present on the screen or not we need to import two function

1. **render:-** which render function renders a React component into a virtual DOM (not the real browser DOM) so you can test it. It lets you:
    - Access elements inside the component
    - Check if certain text or elements exist
    - Simulate user interactions
2. **screen:-** screen is an object that gives you access to all the elements in the virtual DOM that render created. Think of it as a “window” into the DOM of the component you just rendered.\
Instead of querying from the return value of render, screen lets you directly find elements using methods like:
    - `getByText` → find element by its text
    - `getByRole` → find element by its role (like button, heading, etc.)
    - `getByTestId` → find element by a `data-testid` attribute
```js
import { render, screen } from "@testing-library/react";
```

**Import the component you want to test**

```js
import Page from "../../src/Text/page"
```
Note: since in react component name starts with uppercase letter therefor, make sure to import them as uppercase even if original component starts with lowercase (it will not throw any error even if original component is in lowercase and you are importing it as a uppercase)

**Start with you test case**
```js
import {render, screen} from "@testing-library/react";
import Page from "../../src/Text/page"

test("test to check whether the text is present on the screen or not",()=>{})
```
**Render you page component for testing**
```js
import {render, screen} from "@testing-library/react";
import Page from "../../src/Text/page"

test("test to check whether the text is present on the screen or not",()=>{
    render(<Page/>)
})
```
**check whether for the particular text using screen object**
```js
import {render, screen} from "@testing-library/react";
import Page from "../../src/Text/page"

test("test to check whether the text is present on the screen or not",()=>{
    render(<Page/>)
    const text = screen.getByText("This is a simple Next.js page")
})
```
Here
- `screen` → gives you access to all elements in the virtual DOM rendered by `render(<page />)` function.
- `getByText(...)` → finds an element that contains the exact text you pass in.
    - If it finds the text, it returns that DOM element.
    - If it doesn’t find the text, it throws an error and the test fails immediately.

Therefor,\
In our example:
```js
screen.getByText("This is a simple Next.js page")
```
This looks for an element like:
```html
<p>This is a simple Next.js page</p>
```
**Confirm whether that element actually exist or not**
```js
import {render, screen} from "@testing-library/react";
import Page from "../../src/Text/page"

test("test to check whether the text is present on the screen or not",()=>{
    render(<Page/>)
    const text = screen.getByText("This is a simple Next.js page")
    expect(text).toBeInTheDocument()
})
```
Here:\
`toBeInTheDocument()` is a matcher from Jest + `@testing-library/jest-dom`. It checks if the element actually exists in the virtual DOM.

### Note:
- `screen.getByText` → finds the element with that text.

- `toBeInTheDocument()` → confirms it actually exists.

**The Above test case is a case-sensitive therefor to make this test case-insensitive we use regular expression with the `i` flag**
```js
import {render, screen} from "@testing-library/react";
import Page from "../../src/app/Text/page"

test("test to check whether the text is present on the screen or not",()=>{
    render(<Page/>)
    const text = screen.getByText(/This is a simple Next.js page/i)
    expect(text).toBeInTheDocument()
})
```
Note: this will check whether Page contains `"This is a simple Next.js page"` or not, i.e, this will pass the test case if component has text `"This is a simple Next.js page in app router"` since expected text is present here. This is not happen in case sensitive case

### Another syntax for using `getByText()`

```js
test("using getByTextMethods", ()=>{
    render(<Page/>)
    const  textStart = screen.getByText((content, element) => content.startsWith("This"))
    const textEnd = screen.getByText((content, element) => content.endsWith("page"))
    const textContain = screen.getByText((content, element) => content.includes("simple"))

    expect(textStart).toBeInTheDocument()
    expect(textEnd).toBeInTheDocument()
    expect(textContain).toBeInTheDocument()
})
```
Here:

**Instead of passing a plain string, you passed a function:**
- `(content, element) => content.startsWith("This")`
- `content` → the text inside an element.
- `element` → the actual DOM element.
- This returns the element whose text starts with `"This"`.

**How to use element**

Most of the time, `content` (the text) is enough.\
But sometimes you want to look at the element’s properties (like tag name, attributes, or class) while matching.

**Example:**
```html
<button>Click me</button>
<p>Click me</p>
```
Test:
```js
const buttonOnly = screen.getByText((content, element) => {
  return content === "Click me" && element.tagName.toLowerCase() === "button"
})
```



**Similarly you can use `getByTitle()` or `getByAltText()` for testing images**
```js
import {render, screen} from "@testing-library/react";
import Page from "../../src/app/Text/page"


test("test to check whether the image is present on the screen or not",()=>{
    render(<Page/>)
    const img = screen.getByTitle("simple img")
    const imgByAlt = screen.getByAltText("simple image")

    expect(img).toBeInTheDocument()
    expect(imgByAlt).toBeInTheDocument()
})
```
this is also case-sensitive and has a case-insensitive version with regular expression, but it also suffer from same issue i.e, it check whether the any component contain the expected text or not

[Go To Top](#content)

---
# Test to check whether role element is present or not and has all the necessary attribute or not


1. **use `screen.getByRole()` to check whether any role element/tag is present or not**
```js
test("check whether input box is present or not",()=>{
    render(<Page/>)
    const input = screen.getByRole("textbox")   // for input tag
    expect(input).toBeInTheDocument()
})
```
Other related input roles
| Role         | Element examples                                                           |
| ------------ | -------------------------------------------------------------------------- |
| `button`     | `<button>` or `<input type="button">`                                      |
| `checkbox`   | `<input type="checkbox">`                                                  |
| `radio`      | `<input type="radio">`                                                     |
| `combobox`   | `<select>` or searchable dropdowns                                         |
| `listbox`    | `<select multiple>` or custom list widgets                                 |
| `slider`     | `<input type="range">`                                                     |
| `spinbutton` | `<input type="number">`                                                    |
| `switch`     | toggle switch inputs (custom or `<input type="checkbox">` with ARIA)       |
| `searchbox`  | `<input type="search">` (some browsers treat this as a separate ARIA role) |
| `textbox`    | `<input type="text">`, `<textarea>` (see above)                            |

Some elements, like `<p>` or `<div>`, don’t have a default role, so getByRole won’t find them unless you explicitly set a role.


You can add a role to `<p>` using the role attribute:
```html
<p role="alert">This is an important message</p>
<div role="button">Click me</div>
```

2. **To check for placeholder**
```js
test("check whether input box is present or not",()=>{
    render(<Page/>)
    const placeholder = screen.getByPlaceholderText("enter your name")
    expect(placeholder).toBeInTheDocument()
})
```
3. **Check attribute using `toHaveAttribute()`**
```js
test("check whether input box is present or not",()=>{
    render(<Page/>)
    const input = screen.getByRole("textbox")
    expect(input).toHaveAttribute("type","text")
    expect(input).toHaveAttribute("name","yadnesh")
})
```


[Go To Top](#content)

---
# describe / only / skip

### What is `describe`?

- `describe` is a block in Jest used to group related tests.
- It helps organize test cases logically, making them easier to read.
- Inside a `describe` block, you can write multiple `test` cases.

Example:
```js
describe("Math operations", () => {
  test("addition", () => {
    expect(1 + 2).toBe(3);
  });

  test("subtraction", () => {
    expect(5 - 2).toBe(3);
  });
});
```
Here:

- `"Math operations"` is the group name.
- Two test cases (`addition` and `subtraction`) belong to that group.
- When Jest runs, the output looks nested, showing tests grouped nicely.

### Nesting `describe` blocks
You can put describe inside another describe for better organization:
```js
describe("Math operations", () => {
  describe("Addition", () => {
    test("2 + 3 = 5", () => {
      expect(2 + 3).toBe(5);
    });
  });

  describe("Subtraction", () => {
    test("5 - 2 = 3", () => {
      expect(5 - 2).toBe(3);
    });
  });
});
```

### `describe.only` and `describe.skip`

- `describe.only` → run only that describe block.

- `describe.skip` → skip that block.
```js
describe.only("Addition", () => {
  test("2 + 3 = 5", () => {
    expect(2 + 3).toBe(5);
  });
});

describe.skip("Subtraction", () => {
  test("5 - 2 = 3", () => {
    expect(5 - 2).toBe(3);
  });
});
```

[Go To Top](#content)

---
# onChange Testing


```js
test('onchange testing', () => {
  render(<Page />)
  let input = screen.getByRole("textbox")
  fireEvent.change(input,{target:{value:"yadnesh"}})
  expect(input).toHaveValue("yadnesh")
})
```

here first we are accessing all of the input felid present on the Page component
```js
render(<Page />)
let input = screen.getByRole("textbox")
```
Then we are firing a event that simulates typing into this input field
```js
fireEvent.change(input,{target:{value:"yadnesh"}})
```
Here,
- `fireEvent.change`:
  - It simulates the browser’s change event on a DOM element.
  - In the browser, a change event usually fires when a user types into an `<input>` or `<textarea>` and the value changes.

- `input`:
  - it is a first argument in `fireEvent.change`
  - `input` is a DOM node reference (your textbox).

- `{ target: { value: "yadnesh" } }`:
  - it is a second argument in `fireEvent.change`
  - This is the event payload.
  - In the browser, when a real user types `"yadnesh"` into an input, the input element’s `event.target.value` becomes `"yadnesh"`.
  - So you are mocking that behavior by passing an object with `target.value` = `"yadnesh"`.
- Therefor in short: That line simulates typing into the input box by firing a `change` event and setting `event.target.value` = `"yadnesh"`. It’s how you “fake user input” in a test.


### Note
the above code will will run that test for every input box, as you are passing the reference of every input box
```js
let input = screen.getByRole("textbox")   // reference of all of the input box present
```
so if you want the test run for particular input box then pass the reference of that input box only, to do that you can use following options:
1. `getAllByRole("textbox")[1]` → index based
2. `getByPlaceholderText("...")` → placeholder based
3. `getByLabelText("...")` → label based
4. `getByDisplayValue("")` → value based
5. `getByTestId("...")` → test id based
6. `getByRole("textbox", { name: "..." })` → accessible name based




[Go To Top](#content)

---
# onClick testing
```jsx
export default function page() {
  const [data, setData] = useState("")
  return (
    <div>
      <button onClick={() => setData("updated data")}>click me</button>
      <h1>{data}</h1>
    </div>
  )
}
```
Test:
```js
test('onClick testing', () => {
  render(<Page />)
  let but = screen.getByRole("button")
  fireEvent.click(but)
  expect(screen.getByText("updated data")).toBeInTheDocument()
})
```
**This is the same syntax as that of the [onChange testing](#onchange-testing) we just fire the click event here**


[Go To Top](#content)

---
# User Event Library
this library simulates real user interactions (typing, clicking, tabbing, selecting, etc.) in tests. It’s more realistic than RTL’s built-in fireEvent.

Installation:
```bash
npm install --save-dev @testing-library/user-event
```
You import it alongside `render` and `screen` from RTL:

### Examples

1. **Typing into an Input**
```jsx
function Login() {
  return <input placeholder="Username" />;
}
```
```js
test("user can type a username", async () => {
  render(<Login />);
  const input = screen.getByPlaceholderText("Username");

  await userEvent.type(input, "Alice");

  expect(input).toHaveValue("Alice");
});
```
Here, `userEvent.type` types one character at a time, just like a real user.

2. **Clicking a Button**
```jsx
function Counter() {
  const [count, setCount] = React.useState(0);
  return (
    <>
      <span>Count: {count}</span>
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </>
  );
}
```
```js
test("increments counter", async () => {
  render(<Counter />);
  const button = screen.getByRole("button", { name: /increment/i });

  await userEvent.click(button);
  await userEvent.click(button);

  expect(screen.getByText("Count: 2")).toBeInTheDocument();
});
```

3. **Selecting from a Dropdown**
```jsx
function FruitSelector() {
  return (
    <select>
      <option>Apple</option>
      <option>Banana</option>
    </select>
  );
}
```
```js
test("user selects Banana", async () => {
  render(<FruitSelector />);
  const select = screen.getByRole("combobox");

  await userEvent.selectOptions(select, "Banana");

  expect(screen.getByRole("option", { name: "Banana" }).selected).toBe(true);
});
```

### Why Use `userEvent` Instead of `fireEvent`?

`fireEvent` just triggers the event — not how users actually interact.
```js
fireEvent.change(input, { target: { value: "Alice" } });
```
`userEvent` simulates real typing (character by character, firing keydown/keyup/input events in the right order).
```js
await userEvent.type(input, "Alice");
```
So userEvent tests are more realistic and catch bugs closer to real-world usage.

[Go To Top](#content)

---
# act Function
`act()` is a helper from React Testing Library (actually from React’s test utilities).

It makes sure that all React updates (state, effects, DOM changes) are processed before your test assertions run.

### Why is it Needed?
React updates happen asynchronously (state changes, effects, re-renders).

If you assert too early, you may get warnings like:
```vbnet
Warning: An update to Component inside a test was not wrapped in act(...)
```
This means React was still updating when you tried to check.

### Example Without act

```jsx
function Counter() {
  const [count, setCount] = React.useState(0);
  return (
    <>
      <p>Count: {count}</p>
      <button onClick={() => setCount(c => c + 1)}>Increment</button>
    </>
  );
}
```
```js
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

test("increments counter", async () => {
  render(<Counter />);
  const button = screen.getByRole("button", { name: /increment/i });

  await userEvent.click(button); // triggers state update

  // React may not have finished updating yet ❌
  expect(screen.getByText("Count: 1")).toBeInTheDocument();
});
```
Sometimes this test passes, but React shows a warning about missing act.

### Example With act
```js
import { render, screen, act } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Counter from "./Counter";

test("increments counter safely", async () => {
  render(<Counter />);
  const button = screen.getByRole("button", { name: /increment/i });

  await act(async () => {
    await userEvent.click(button);
  });

  expect(screen.getByText("Count: 1")).toBeInTheDocument();
});
```
Now React is happy ✅ because we wrapped the state-changing interaction in act.



[Go To Top](#content)

---
# Before and After hooks of Jest

In Jest, you often need to set things up before tests run and clean them up after tests finish. That’s where hooks come in.

### Hooks in Jest

Jest provides four main lifecycle hooks:

1. `beforeAll` – runs once before all tests in a file.
2. `afterAll` – runs once after all tests in a file.
4. `beforeEach` – runs before every single test.
5. `afterEach` – runs after every single test.

### Example
```js
let data = [];

beforeAll(() => {
  // Runs once before ALL tests
  console.log("Setting up before all tests");
});

afterAll(() => {
  // Runs once after ALL tests
  console.log("Cleaning up after all tests");
});

beforeEach(() => {
  // Runs before EACH test
  data = [1, 2, 3];
  console.log("Setting up before each test");
});

afterEach(() => {
  // Runs after EACH test
  data = [];
  console.log("Cleaning up after each test");
});

test('first test: array has 3 items', () => {
  expect(data.length).toBe(3);
});

test('second test: first item is 1', () => {
  expect(data[0]).toBe(1);
});
```

### When to Use

- **beforeAll / afterAll**
  - For things that should only run once (e.g., connect to a database, start a server).
- **beforeEach / afterEach**
  - For things that should reset between tests (e.g., reset arrays, clear mocks, reinitialize objects).


[Go To Top](#content)

---
# Snapshot testing
Snapshot testing is used to capture the output of a component or function and save it as a reference (a “snapshot”).

Later, when you run the tests again, Jest compares the current output with the saved snapshot.

- If they match ✅ → test passes.
- If they don’t match ❌ → test fails (something changed).

```js
import {render} from "@testing-library/react";
import Page from "../../src/app/Text/page";

test("snapshot test", () => {
    const container = render(<Page />);
    expect(container).toMatchSnapshot();
});
```
this code will create the new folder with name `__snapshot__` where jest will store the current snapshot of the component


### Updating the snapshot
to update the snapshot just run the following command:
```bash
npm jest -- -u
```
this command will overwrite the current snapshot with the new one


[Go To Top](#content)

---
# custom query using vanilla DOM APIs
you can use the vanilla DOM APIs of js to access the element in test
```js
test('costume query', () => {
  render(
    <div>
      <span id='important'>Important!</span>
    </div>
  );

  const element = document.querySelector('#important')
  expect(element).toBeInTheDocument();
});
``` 
NOte:
this is not really a "custom query" in RTL(React Testing Library) sense — it’s just bypassing RTL and using plain DOM.

In React Testing Library, a custom query means extending RTL’s query system (`getBy…`, `findBy…`, `queryBy…`) so you can reuse it consistently, with RTL’s cleanup/error handling, rather than sprinkling `document.querySelector` all over.


[Go To Top](#content)

---
# Custom query using RTL (`buildQueries` & `queryHelpers`)

Suppose your app marks important items with a `data-important="true"` attribute, and you want a query to find those.

to do that we must write a custom query and to do that:

### Step 1: Import
```js
import { buildQueries, queryHelpers } from '@testing-library/react';
``` 
- `queryHelpers` → contains helpers like `queryAllByAttribute` (search elements by attribute).

- `buildQueries` → automatically generates the family of queries (`getBy`, `getAllBy`, `findBy`, etc.) from one base query.


### Step 2: Define Base Query
```js
const queryAllByImportant = (container) =>
  queryHelpers.queryAllByAttribute('data-important', container, 'true');
```
- This is a function that looks inside `container` (the rendered DOM).

- It finds all elements with the attribute `data-important="true"`.
- **Example:**
```html
<span data-important="true">Important</span>
```
**Some other methods:**

| Helper Method         | Description                                                |
| --------------------- | ---------------------------------------------------------- |
| `queryByAttribute`    | Find a single element by attribute, returns `null` if none |
| `queryAllByAttribute` | Find all matching elements by attribute, returns an array  |
| `getElementError`     | Construct descriptive error messages for query failures    |
| `buildQueries`        | Build a set of RTL-style query methods from a base query   |
| `getNodeText`         | Get an element’s full text content, normalized and trimmed |

### Step 3: Generate All Variants
```js
const [
  queryByImportant,
  getAllByImportant,
  getByImportant,
  findAllByImportant,
  findByImportant,
] = buildQueries(
  queryAllByImportant,
  (c) => `No element with data-important found`,
  (c) => `Multiple elements found with data-important`
);
```
`buildQueries` takes three things:
1. Base query → `queryAllByImportant`

2. Error message for “not found”
```js
(c) => `No element with data-important found`
```
3. Error message for “too many found”
```js
(c) => `Multiple elements found with data-important`
```
It returns an array of functions in this exact order:
1. `queryByImportant` → returns first match, or `null` if none found

2. `getAllByImportant` → throws error if none found

3. `getByImportant` → throws if none found OR more than one found

4. `findAllByImportant` → async version of `getAllByImportant`

5. `findByImportant` → async version of `getByImportant`


### Step 4: Export
```js
export {
  queryByImportant,
  queryAllByImportant,
  getAllByImportant,
  getByImportant,
  findAllByImportant,
  findByImportant,
};
```


### Complete query
```js
import { buildQueries, queryHelpers } from '@testing-library/react';

// Step 1: Define your query function
const queryAllByImportant = (container) =>
  queryHelpers.queryAllByAttribute('data-important', container, 'true');

// Step 2: Build queries (RTL provides getBy, findBy, etc.)
const [
  queryByImportant,
  getAllByImportant,
  getByImportant,
  findAllByImportant,
  findByImportant,
] = buildQueries(queryAllByImportant, (c) => `No element with data-important found`, (c) => `Multiple elements found with data-important`);

// Step 3: Export your custom queries
export {
  queryByImportant,
  queryAllByImportant,
  getAllByImportant,
  getByImportant,
  findAllByImportant,
  findByImportant,
};
```

### Example
```js
import { render } from '@testing-library/react';
import { getByImportant } from './customQueries'; // importing the custom made query

test('finds important element', () => {
  const { container } = render(
    <div>
      <span>Normal</span>
      <span data-important="true">Important!</span>
    </div>
  );

  const importantEl = getByImportant(container);
  expect(importantEl).toHaveTextContent('Important!');
});
```

[Go To Top](#content)

---
# within
Normally, `getBy...` or `queryBy...` in RTL searches the entire document (`screen`).\
But sometimes, you only want to search inside a specific element. That’s where `within` comes in.

### Example Without within
Imagine you have this component:
```jsx
function App() {
  return (
    <div>
      <section aria-label="fruits">
        <ul>
          <li>Apple</li>
          <li>Banana</li>
        </ul>
      </section>

      <section aria-label="animals">
        <ul>
          <li>Dog</li>
          <li>Cat</li>
        </ul>
      </section>
    </div>
  );
}
```
If you do:
```js
import { render, screen } from "@testing-library/react";
import App from "./App";

test("finds Banana", () => {
  render(<App />);
  expect(screen.getByText("Banana")).toBeInTheDocument();
});
```
That works fine. But what if you want Banana only inside the fruits section?\
If another "Banana" existed in `animals`, you’d be stuck.

### Example With within
Here’s how:
```js
import { render, screen, within } from "@testing-library/react";
import App from "./App";

test("finds Banana only inside fruits section", () => {
  render(<App />);

  // First, get the fruits section
  const fruitsSection = screen.getByRole("region", { name: "fruits" });

  // Now, search only inside that section
  const banana = within(fruitsSection).getByText("Banana");

  expect(banana).toBeInTheDocument();
});
```
`within` limits queries to that section only.

### When to Use within

- When you have multiple similar elements (e.g., two tables, two lists, multiple modals).
- When you want scoped queries for clarity and correctness.


[Go To Top](#content)

---
# Api testing with msw
MSW stands for Mock Service Worker.

It’s a library that lets you mock API requests (HTTP, GraphQL, etc.) in both:

Mocking an API Request means:
Instead of calling the real backend, you intercept the request and return a fake (mock) response.

So:

- Your app → thinks it’s calling the API.
- MSW (or Jest mocks, or other tools) → intercepts that request.
- It returns a predefined response (like a dummy JSON).

### To setup MSW
1. **install dependencies**
```bash
npm install msw undici --save-dev 
```
2. **Create Handlers**

Make a `mocks/handlers.js` file to define your mocked endpoints.
```js
// mocks/handlers.js
import { http, HttpResponse } from "msw"

export const handlers = [
  http.get("/api/user", () => {
    return HttpResponse.json({ id: 1, name: "yadnesh (mocked)" }, { status: 200 })
  }),
]
```
Here, `/api/user` could be a Next.js API route (`app/api/user.js`) or an external API.

3. **create mock server**

Make a `mocks/server.js` file:
```js
// mocks/server.js
import { setupServer } from "msw/node";
import { handlers } from "./handlers";

export const server = setupServer(...handlers);
```

4. **Create the `jest.polyfills.js` file**
```js
// jest.polyfills.js
import { TextEncoder, TextDecoder } from 'util';
import { ReadableStream, TransformStream, WritableStream } from 'stream/web';
import { MessageChannel, MessagePort, BroadcastChannel } from 'worker_threads';

// Polyfill TextEncoder/TextDecoder
if (!global.TextEncoder) global.TextEncoder = TextEncoder;
if (!global.TextDecoder) global.TextDecoder = TextDecoder;

// Polyfill Web Streams
if (!global.ReadableStream) global.ReadableStream = ReadableStream;
if (!global.TransformStream) global.TransformStream = TransformStream;
if (!global.WritableStream) global.WritableStream = WritableStream;

// Polyfill Worker APIs
if (!global.MessageChannel) global.MessageChannel = MessageChannel;
if (!global.MessagePort) global.MessagePort = MessagePort;
if (!global.BroadcastChannel) global.BroadcastChannel = BroadcastChannel;
```

5. **update `jest.setup.js`**

add into your `jest.setup.js` file
```js
import '@testing-library/jest-dom'
import 'whatwg-fetch';
import { server } from "./mocks/server";  // import server

beforeAll(() => server.listen()); // start the server before each test
afterEach(() => server.resetHandlers());  // reset the server after each test
afterAll(() => server.close()); // close the server after all test case executes
```
6. **Update the `jest.config.js` file**
```js
const nextJest = require('next/jest')

const createJestConfig = nextJest({
  dir: './',
})

const customJestConfig = {
  testEnvironment: 'jest-environment-jsdom',
  setupFiles: ['<rootDir>/jest.polyfills.js'], // make sure you add this above the jest.setup.js
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],  // jest.setup.js
 
}

module.exports = createJestConfig(customJestConfig)
```

### Test example
```tsx
"use client"

// components/User.js
import { useEffect, useState } from "react";
type User = {
    id: number;
    name: string;
}
export default function User() {
  const [user, setUser] = useState<User>({} as User);

  useEffect( () => {
    const fetchData = async ()=> {
        await fetch("/api/user")
            .then((res) => res.json())    // at the time of testing this will be the mock data, i.e request will not go to actual server
            .then(setUser);
    }
    fetchData()
  }, []);

  if (!user) return <p>Loading...</p>;
  return <p>Hello {user.name}</p>;
}
```
 Test
```js
import Page from "../../src/app/Text/Apicall/page"
import { render, screen } from "@testing-library/react"

test("testing api",async()=>{
    render(<Page/>)
    const text = await screen.findByText("Hello yadnesh (mocked)")    // make sure to use await as fetch asynchronous operation
    expect(text).toBeInTheDocument()
})
```




[Go To Top](#content)

---