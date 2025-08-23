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
