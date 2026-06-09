import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BrowserRouter, MemoryRouter } from 'react-router-dom';
import Breadcrumbs from './Breadcrumbs';

describe('Breadcrumbs', () => {
  it('renders Home link', () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <Breadcrumbs />
      </MemoryRouter>
    );
    expect(screen.getByLabelText('Home')).toBeDefined();
  });

  it('renders paths correctly', () => {
    render(
      <MemoryRouter initialEntries={['/calculate']}>
        <Breadcrumbs />
      </MemoryRouter>
    );
    expect(screen.getByText('Calculator')).toBeDefined();
  });
});
