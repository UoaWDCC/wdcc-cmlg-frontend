import React from 'react';
import { render } from '@testing-library/react';
import SearchPage from './components/SearchPage';

test('renders learn react link', () => {
  const { getByText } = render(<SearchPage />);
  const linkElement = getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
