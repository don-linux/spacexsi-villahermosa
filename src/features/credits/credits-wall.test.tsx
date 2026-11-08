import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import type { ComponentProps } from 'react';
import { Activity } from 'react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import type { Claim } from './claim-links';
import { CreditsWall } from './credits-wall';

vi.mock('@/components/ui/grok-bot', () => ({ GrokBot: () => null }));

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

const claim: Claim = {
  url: 'https://example.com/canjear?code=ABC-123',
  qrSvg: '<svg viewBox="0 0 1 1"></svg>',
};

beforeEach(() => {
  // jsdom has no matchMedia; reduced motion also skips the bot's party timers.
  vi.stubGlobal('matchMedia', (query: string) => ({
    matches: true,
    media: query,
    addEventListener: () => {},
    removeEventListener: () => {},
  }));
});

afterEach(() => {
  cleanup();
  vi.unstubAllGlobals();
});

function claimButton() {
  return screen.getByRole('button', { name: 'Canjear créditos' });
}

describe('CreditsWall with a claim', () => {
  it('shows the redeem button under the QR once the QR view opens', () => {
    render(<CreditsWall claim={claim} lumaUrl={null} />);
    const redeem = screen.getByRole('link', { name: /canjear ahora/i });

    expect(redeem).toHaveAccessibleName('Canjear ahora, se abre en otra ventana');
    expect(redeem).toHaveAttribute('href', claim.url);
    expect(redeem).toHaveAttribute('target', '_blank');
    expect(redeem.getAttribute('rel')).toContain('noopener');
    expect(
      screen.getByRole('img', { name: 'Código QR para canjear créditos' }),
    ).toBeInTheDocument();
    expect(redeem.closest('aside')).toHaveAttribute('inert');

    fireEvent.click(claimButton());

    expect(redeem.closest('aside')).not.toHaveAttribute('inert');
    expect(screen.queryByText(/no hay ningún evento/i)).not.toBeInTheDocument();
  });

  it('swaps Volver: to the launcher on the first view, to the first view on the QR view', () => {
    render(<CreditsWall claim={claim} lumaUrl={null} />);
    const toLauncher = screen.getByRole('link', { name: 'Volver' });
    const toFirstView = screen.getByRole('button', { name: 'Volver' });

    expect(toLauncher).toHaveAttribute('href', '/creditos');
    expect(toLauncher).toHaveAttribute('data-transition-types', 'credits-focus-out');
    expect(toLauncher).not.toHaveAttribute('inert');
    expect(toFirstView).toHaveAttribute('inert');

    fireEvent.click(claimButton());

    expect(toLauncher).toHaveAttribute('inert');
    expect(toFirstView).not.toHaveAttribute('inert');

    fireEvent.click(toFirstView);

    expect(toLauncher).not.toHaveAttribute('inert');
    expect(toFirstView).toHaveAttribute('inert');
  });

  it('closes the QR view with Escape', () => {
    render(<CreditsWall claim={claim} lumaUrl={null} />);

    fireEvent.click(claimButton());
    expect(claimButton()).toHaveAttribute('aria-expanded', 'true');

    fireEvent.keyDown(window, { key: 'Escape' });
    expect(claimButton()).toHaveAttribute('aria-expanded', 'false');
  });

  it('starts on the first view again after the page was hidden on the QR', () => {
    const wall = <CreditsWall claim={claim} lumaUrl={null} />;
    const { rerender } = render(<Activity mode="visible">{wall}</Activity>);
    const button = claimButton();

    fireEvent.click(button);
    expect(button).toHaveAttribute('aria-expanded', 'true');

    rerender(<Activity mode="hidden">{wall}</Activity>);
    rerender(<Activity mode="visible">{wall}</Activity>);

    expect(button).toHaveAttribute('aria-expanded', 'false');
  });
});

describe('CreditsWall without a claim', () => {
  it('shows the notice and no redeem button', () => {
    render(<CreditsWall claim={null} lumaUrl={null} />);

    expect(screen.getByText(/no hay ningún evento en curso/i)).toBeInTheDocument();
    expect(screen.queryByRole('link', { name: /canjear ahora/i })).not.toBeInTheDocument();
    expect(screen.queryByRole('img', { name: /código qr/i })).not.toBeInTheDocument();
  });
});
