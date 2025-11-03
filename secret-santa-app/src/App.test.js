import { render, screen } from '@testing-library/react';
import App from './App';

test('renders Secret Santa Organizer heading', () => {
  render(<App />);
  const headingElement = screen.getByText(/Secret Santa Organizer/i);
  expect(headingElement).toBeInTheDocument();
});
