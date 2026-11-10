import { readFile } from 'node:fs/promises';
import { join } from 'node:path';

import { ImageResponse } from 'next/og';

export const alt = 'SpaceXSI Villahermosa';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

/** Same ratio as the wordmark viewBox (`147 / 19`). */
const WORDMARK_WIDTH = 860;
const WORDMARK_HEIGHT = Math.round((WORDMARK_WIDTH * 19) / 147);
/**
 * The SVG box is wider than its ink. This matches `--wordmark-ink-shift` in
 * `globals.css` so the letters, not the box, sit on the center of the card.
 */
const INK_SHIFT = Math.round(WORDMARK_WIDTH * 0.085);

const displayFont = await readFile(
  join(process.cwd(), 'src/app/fonts/UniversalSansGrokTest-Display-400-Trial.ttf'),
);
const wordmarkSvg = await readFile(
  join(process.cwd(), 'public/brand/spacexsi/spacexsi-wordmark-white-transparent.svg'),
);
const wordmarkSrc = `data:image/svg+xml;base64,${wordmarkSvg.toString('base64')}`;

export default function OpenGraphImage() {
  return new ImageResponse(
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#0a0a0a',
        gap: 32,
      }}
    >
      <img
        alt=""
        src={wordmarkSrc}
        width={WORDMARK_WIDTH}
        height={WORDMARK_HEIGHT}
        style={{ transform: `translateX(${INK_SHIFT}px)` }}
      />
      <div
        style={{
          display: 'flex',
          fontFamily: 'Universal Sans',
          fontSize: 42,
          fontWeight: 400,
          letterSpacing: -1.26,
          color: 'rgba(255, 255, 255, 0.6)',
        }}
      >
        Villahermosa
      </div>
    </div>,
    {
      ...size,
      fonts: [
        {
          name: 'Universal Sans',
          data: displayFont,
          style: 'normal',
          weight: 400,
        },
      ],
    },
  );
}
