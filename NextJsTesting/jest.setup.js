import '@testing-library/jest-dom'
import 'whatwg-fetch';
import { server } from "./mocks/server";


beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());
afterAll(() => {
  //close open message ports that React leaves behind
  const openHandles = process._getActiveHandles();
  openHandles.forEach((h) => {
    if (h.constructor?.name === "MessagePort") {
      h.close?.();
    }
  });
});
