import React from 'react';
import { render, screen } from '@testing-library/react';
import Home from './index';

test('renders People List title', () => {
  render(<Home people={[]} activities={[]} />);
  const linkElement = screen.getByText(/People List/i);
  expect(linkElement).toBeInTheDocument();
});
