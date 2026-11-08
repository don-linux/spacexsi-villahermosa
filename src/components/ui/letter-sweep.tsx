'use client';

import { useEffect, useRef, useState } from 'react';

import { cn } from '@/lib/utils';

import { SWEEP_FPS, type Sweep } from './letter-sweep-frames';

const FRAME_MS = 1000 / SWEEP_FPS;

/** Plays a sampled sweep once and holds its last frame. */
export function LetterSweep({
  sweep,
  onSettled,
  className,
}: {
  sweep: Sweep;
  onSettled?: () => void;
  className?: string;
}) {
  const [frame, setFrame] = useState(0);
  const onSettledRef = useRef(onSettled);
  const last = sweep.frames.length - 1;

  useEffect(() => {
    onSettledRef.current = onSettled;
  }, [onSettled]);

  useEffect(() => {
    const start = performance.now();
    let raf = 0;

    const tick = (now: number) => {
      const next = Math.min(last, Math.floor((now - start) / FRAME_MS));
      setFrame(next);
      if (next < last) {
        raf = requestAnimationFrame(tick);
        return;
      }
      onSettledRef.current?.();
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [last]);

  return (
    <svg viewBox={sweep.viewBox} className={cn('block', className)} aria-hidden>
      <g dangerouslySetInnerHTML={{ __html: sweep.frames[frame] ?? '' }} />
    </svg>
  );
}
