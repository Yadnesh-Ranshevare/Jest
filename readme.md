# Content
1. [Introduction](#introduction)
2. [Basic Testing](#basic-testing)
3. [Jest Set Up For Next.js](#jest-set-up-for-nextjs)
4. [Test To Check whether the text is present on the screen or not](#test-to-check-whether-the-text-is-present-on-the-screen-or-not)
5. [Test to check whether role element is present or not and has all the necessary attribute or not](#test-to-check-whether-role-element-is-present-or-not-and-has-all-the-necessary-attribute-or-not)
6. [describe / only / skip](#describe--only--skip)


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
now when ever you run npm test you'll get result that look something like this:
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

**The Above test case is a case sensitive therefor to make this test case insensitive we use regular expression with the `i` flag**
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
this is also case sensitive and has a case insensitive version with regular expression, but it also suffer from same issue i.e, it check whether the any component contain the expected text or not

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