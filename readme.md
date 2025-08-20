# Content
1. [Introduction](#introduction)
2. [Basic Testing](#basic-testing)
3. [Jest Set Up For Next.js](#jest-set-up-for-nextjs)


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