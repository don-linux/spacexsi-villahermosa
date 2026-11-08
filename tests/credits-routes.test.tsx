import { cleanup, render, screen } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import WithAccountPage, { metadata as withAccountMetadata } from '@/app/creditos/con-cuenta/page';
import CreditsPage, { metadata as launcherMetadata } from '@/app/creditos/page';
import WithoutAccountPage, {
  metadata as withoutAccountMetadata,
} from '@/app/creditos/sin-cuenta/page';
import { TRIAL_CLAIM_URL } from '@/features/credits/claim-links';

vi.mock('@/components/ui/grok-bot', () => ({ GrokBot: () => null }));

const EVENT_URL = 'https://example.com/canjear?code=EVENTO-1';

beforeEach(() => {
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
  vi.unstubAllEnvs();
});

describe('/creditos/con-cuenta', () => {
  it('redeems the event link from CREDITS_CLAIM_URL', () => {
    vi.stubEnv('CREDITS_CLAIM_URL', EVENT_URL);
    render(<WithAccountPage />);

    expect(screen.getByRole('link', { name: /canjear ahora/i })).toHaveAttribute('href', EVENT_URL);
  });

  it('says there is no event, with no button, while CREDITS_CLAIM_URL is empty', () => {
    vi.stubEnv('CREDITS_CLAIM_URL', '');
    render(<WithAccountPage />);

    expect(screen.queryByRole('link', { name: /canjear ahora/i })).not.toBeInTheDocument();
    expect(screen.getByText(/no hay ningún evento en curso/i)).toBeInTheDocument();
  });

  it('stays out of search results', () => {
    expect(withAccountMetadata.robots).toEqual({ index: false });
  });
});

describe('/creditos/sin-cuenta', () => {
  it('always redeems the fixed referral link, whatever CREDITS_CLAIM_URL says', () => {
    vi.stubEnv('CREDITS_CLAIM_URL', EVENT_URL);
    render(<WithoutAccountPage />);

    expect(screen.getByRole('link', { name: /canjear ahora/i })).toHaveAttribute(
      'href',
      TRIAL_CLAIM_URL,
    );
  });

  it('still shows the button with CREDITS_CLAIM_URL empty', () => {
    vi.stubEnv('CREDITS_CLAIM_URL', '');
    render(<WithoutAccountPage />);

    expect(screen.getByRole('link', { name: /canjear ahora/i })).toHaveAttribute(
      'href',
      TRIAL_CLAIM_URL,
    );
    expect(screen.queryByText(/no hay ningún evento en curso/i)).not.toBeInTheDocument();
  });

  it('stays out of search results', () => {
    expect(withoutAccountMetadata.robots).toEqual({ index: false });
  });
});

describe('/creditos', () => {
  it('puts the menu over an inert copy of the credits page', () => {
    const { container } = render(<CreditsPage />);
    const behind = container.querySelector('[inert]');

    expect(behind).toContainElement(screen.getByRole('button', { name: 'Canjear créditos' }));
    expect(behind).not.toContainElement(
      screen.getByRole('link', { name: '¿Todavía no tienes una cuenta?' }),
    );
  });

  it('is the only credits page that search engines may index', () => {
    expect(launcherMetadata.robots).toBeUndefined();
  });
});
