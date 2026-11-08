'use client';

import { useEffect, useRef, useState } from 'react';

import { cn } from '@/lib/utils';

import { SWEEP_FPS, SWEEP_FRAMES, SWEEP_SETTLE_FRAME } from './letter-sweep-frames';

const FRAME_MS = 1000 / SWEEP_FPS;

/**
 * The letter sweep, drawn as SVG. `full` is the intro artboard.
 * `mark` is the navbar crop, the box the letters settle into.
 */
export function LetterSweep({
  crop = 'full',
  onSettled,
  className,
}: {
  crop?: 'full' | 'mark';
  onSettled?: () => void;
  className?: string;
}) {
  const [frame, setFrame] = useState(0);
  const onSettledRef = useRef(onSettled);

  useEffect(() => {
    onSettledRef.current = onSettled;
  }, [onSettled]);

  useEffect(() => {
    const start = performance.now();
    let raf = 0;
    let settled = false;

    const tick = (now: number) => {
      const next = Math.min(SWEEP_SETTLE_FRAME, Math.floor((now - start) / FRAME_MS));
      setFrame((current) => (current === next ? current : next));
      if (next < SWEEP_SETTLE_FRAME) {
        raf = requestAnimationFrame(tick);
        return;
      }
      if (!settled) {
        settled = true;
        onSettledRef.current?.();
      }
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  const viewBox = crop === 'mark' ? '65 56 386 154' : '0 0 1389 257';

  return (
    <svg viewBox={viewBox} className={cn('block', className)} aria-hidden>
      <g dangerouslySetInnerHTML={{ __html: SWEEP_FRAMES[frame] ?? '' }} />
    </svg>
  );
}
