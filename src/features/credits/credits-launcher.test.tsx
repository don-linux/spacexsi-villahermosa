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

function renderLauncher() {
  return render(
    <CreditsLauncher>
      <button type="button">Canjear créditos</button>
    </CreditsLauncher>,
  );
}

describe('CreditsLauncher', () => {
  it('links each question to its flow', () => {
    renderLauncher();

    expect(
      screen.getByRole('link', { name: '¿Ya tienes una cuenta con o sin suscripción?' }),
    ).toHaveAttribute('href', '/creditos/con-cuenta');
    expect(screen.getByRole('link', { name: '¿Todavía no tienes una cuenta?' })).toHaveAttribute(
      'href',
      '/creditos/sin-cuenta',
    );
  });

  it('opens both flows with the focus-in transition the CSS listens for', () => {
    renderLauncher();

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

  it('keeps the page behind the menu inert, with the way home out of it', () => {
    const { container } = renderLauncher();
    const behind = container.querySelector('[inert]');

    expect(behind).toContainElement(screen.getByRole('button', { name: 'Canjear créditos' }));
    expect(behind).not.toContainElement(screen.getByRole('link', { name: 'Volver al inicio' }));
    expect(behind).not.toContainElement(
      screen.getByRole('link', { name: '¿Todavía no tienes una cuenta?' }),
    );
  });

  it('names the page and offers the way back home', () => {
    renderLauncher();

    expect(
      screen.getByRole('heading', { level: 1, name: 'Canjear créditos del meetup Villahermosa' }),
    ).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Volver al inicio' })).toHaveAttribute('href', '/');
  });
});
