import { isHttpUrl, qrSvg } from '@/lib/claim-qr';

/** A redeem link with its QR already drawn, ready for `CreditsWall`. */
export type Claim = { url: string; qrSvg: string };

/**
 * The referral for people with no Grok account yet. It does not depend on an event, so its page is
 * always on. The code is public: it travels in the QR and in the button, not in a secret.
 */
export const TRIAL_CLAIM_URL =
  'https://grok.com/plans/referral?sku=sku_iFHd43ge7daR&interval=MONTHLY&code=6K0J-W9Z6-P917-3XW2#subscribe';

/** `null` when the URL is not a real http(s) one or its QR cannot be drawn. */
export function toClaim(url: string | undefined): Claim | null {
  if (!isHttpUrl(url)) return null;
  const href = url.trim();
  const svg = qrSvg(href);
  return svg ? { url: href, qrSvg: svg } : null;
}

/**
 * The claim of the event running now, for people who already have an account. Read at build time,
 * like any env var of a static page: changing it needs a redeploy.
 */
export function eventClaim(): Claim | null {
  return toClaim(process.env.CREDITS_CLAIM_URL);
}

export function trialClaim(): Claim | null {
  return toClaim(TRIAL_CLAIM_URL);
}

export function lumaEventUrl(): string | null {
  const url = process.env.LUMA_EVENT_URL;
  return isHttpUrl(url) ? url.trim() : null;
}
