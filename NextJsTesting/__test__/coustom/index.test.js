import { render } from '@testing-library/react';
import { getByImportant } from './query';

test('costume query', () => {
  const { container } = render(
    <div>
      <span>Normal</span>
      <span data-important="true">Important!</span>
    </div>
  );

  const importantEl = getByImportant(container);
  expect(importantEl).toHaveTextContent('Important!');
});

test('costume query 2', () => {
  render(
    <div>
      <span>Normal</span>
      <span id='important'>Important!</span>
    </div>
  );

  const element = document.querySelector('#important')
  expect(element).toBeInTheDocument();
});
