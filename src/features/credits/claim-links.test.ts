import { afterEach, describe, expect, it, vi } from 'vitest';

import { eventClaim, lumaEventUrl, toClaim, TRIAL_CLAIM_URL, trialClaim } from './claim-links';

afterEach(() => {
  vi.unstubAllEnvs();
});

describe('toClaim', () => {
  it.each([undefined, '', '   ', 'not a url', 'javascript:alert(1)', 'ftp://example.com/file'])(
    'is null for %j',
    (value) => {
      expect(toClaim(value)).toBeNull();
    },
  );

  it('trims the URL and draws its QR', () => {
    const claim = toClaim('  https://example.com/canjear?code=ABC-123  ');

    expect(claim?.url).toBe('https://example.com/canjear?code=ABC-123');
    expect(claim?.qrSvg).toMatch(/^<svg /);
  });
});

describe('trialClaim', () => {
  it('is always a claim, and the fragment of the referral survives', () => {
    const claim = trialClaim();

    expect(claim?.url).toBe(TRIAL_CLAIM_URL);
    expect(claim?.qrSvg).toMatch(/^<svg /);
    expect(new URL(TRIAL_CLAIM_URL)).toMatchObject({
      origin: 'https://grok.com',
      pathname: '/plans/referral',
      hash: '#subscribe',
    });
  });
});

describe('eventClaim', () => {
  it('is null while CREDITS_CLAIM_URL is empty or not an http(s) URL', () => {
    vi.stubEnv('CREDITS_CLAIM_URL', '');
    expect(eventClaim()).toBeNull();

    vi.stubEnv('CREDITS_CLAIM_URL', 'javascript:alert(1)');
    expect(eventClaim()).toBeNull();
  });

  it('is the claim of CREDITS_CLAIM_URL once it is set', () => {
    vi.stubEnv('CREDITS_CLAIM_URL', 'https://example.com/evento?code=XYZ');

    expect(eventClaim()?.url).toBe('https://example.com/evento?code=XYZ');
  });
});

describe('lumaEventUrl', () => {
  it('only passes a real http(s) URL', () => {
    vi.stubEnv('LUMA_EVENT_URL', 'ftp://example.com');
    expect(lumaEventUrl()).toBeNull();

    vi.stubEnv('LUMA_EVENT_URL', ' https://lu.ma/evento ');
    expect(lumaEventUrl()).toBe('https://lu.ma/evento');
  });
});
