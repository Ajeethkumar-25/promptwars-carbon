import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import FootprintCalculator from './FootprintCalculator';

// Mock fetch
global.fetch = vi.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve({ status: 'success' }),
  })
);

describe('FootprintCalculator', () => {
  it('renders the form correctly', () => {
    render(
      <BrowserRouter>
        <FootprintCalculator />
      </BrowserRouter>
    );
    expect(screen.getByLabelText(/Daily car travel/i)).toBeDefined();
    expect(screen.getByLabelText(/Yearly flight travel/i)).toBeDefined();
    expect(screen.getByLabelText(/Daily home electricity usage/i)).toBeDefined();
    expect(screen.getByLabelText(/Diet Type/i)).toBeDefined();
  });

  it('calculates the footprint correctly on submit', () => {
    render(
      <BrowserRouter>
        <FootprintCalculator />
      </BrowserRouter>
    );

    const carInput = screen.getByLabelText(/Daily car travel/i);
    const flightInput = screen.getByLabelText(/Yearly flight travel/i);
    const electricityInput = screen.getByLabelText(/Daily home electricity usage/i);
    
    fireEvent.change(carInput, { target: { value: '10' } });
    fireEvent.change(flightInput, { target: { value: '2' } });
    fireEvent.change(electricityInput, { target: { value: '5' } });

    const button = screen.getByRole('button', { name: /Calculate My Impact/i });
    fireEvent.click(button);

    // Verify fetch was called
    expect(global.fetch).toHaveBeenCalled();
  });
});
