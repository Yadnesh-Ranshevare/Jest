# Content
1. [Introduction](#introduction)
2. [Basic Testing](#basic-testing)


# Introduction

Jest is a JavaScript testing framework mainly used for testing applications built with React, but it can test any kind of JavaScript code.

It was developed by Facebook (Meta) and is widely used because it’s easy to set up, fast, and comes with many features built-in, like:
- **Test runner** → runs your test cases.

- **Assertions** → checks if your code gives the expected output.

- **Mocking** → lets you simulate functions, modules, or APIs.

- **Snapshot testing** → captures component output and compares it later to ensure nothing breaks.


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