import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Dashboard from './Dashboard';

global.fetch = vi.fn(() =>
  Promise.resolve({
    ok: true,
    json: () => Promise.resolve({ data: { total: 10, transport: 5, energy: 3, food: 2 } }),
  })
);

describe('Dashboard', () => {
  it('renders loading initially', () => {
    render(
      <BrowserRouter>
        <Dashboard username="testuser" />
      </BrowserRouter>
    );
    expect(screen.getByText(/Loading insights/i)).toBeDefined();
  });
});
