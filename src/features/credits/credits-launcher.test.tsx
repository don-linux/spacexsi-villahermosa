import { cleanup, render, screen } from '@testing-library/react';
import type { ComponentProps } from 'react';
import { afterEach, describe, expect, it, vi } from 'vitest';

import { CreditsLauncher } from './credits-launcher';

// The real Link keeps `transitionTypes` to itself; surface it so the test can read it.
vi.mock('next/link', () => ({
  default: ({
    transitionTypes,
    children,
    ...props
  }: ComponentProps<'a'> & { transitionTypes?: string[] }) => (
    <a data-transition-types={transitionTypes?.join(' ')} {...props}>
      {children}
    </a>
  ),
}));

afterEach(cleanup);

describe('CreditsLauncher', () => {
  it('links each question to its flow', () => {
    render(<CreditsLauncher />);

    expect(
      screen.getByRole('link', { name: '¿Ya tienes una cuenta con o sin suscripción?' }),
    ).toHaveAttribute('href', '/creditos/con-cuenta');
    expect(screen.getByRole('link', { name: '¿Todavía no tienes una cuenta?' })).toHaveAttribute(
      'href',
      '/creditos/sin-cuenta',
    );
  });

  it('opens both flows with the focus-in transition the CSS listens for', () => {
    render(<CreditsLauncher />);

    for (const name of [
      '¿Ya tienes una cuenta con o sin suscripción?',
      '¿Todavía no tienes una cuenta?',
    ]) {
      expect(screen.getByRole('link', { name })).toHaveAttribute(
        'data-transition-types',
        'credits-focus-in',
      );
    }
  });

  it('names the page and offers the way back home', () => {
    render(<CreditsLauncher />);

    expect(
      screen.getByRole('heading', { level: 1, name: 'Canjear créditos del meetup Villahermosa' }),
    ).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Volver al inicio' })).toHaveAttribute('href', '/');
  });
});
