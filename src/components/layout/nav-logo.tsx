'use client';

import Link from 'next/link';
import { useCallback, useEffect, useState } from 'react';

import { useResolvedTheme } from '@/components/providers';
import { LetterSweep } from '@/components/ui/letter-sweep';
import { MARK_SWEEP } from '@/components/ui/letter-sweep-frames';
import { useLandingRevealed } from '@/features/home/intro-gate';
import { usePrefersReducedMotion } from '@/lib/motion';
import { cn } from '@/lib/utils';

/** Rendered height of the X mark in the navbar, in px. */
const MARK_HEIGHT = 20;
/** `spacexsi-symbol-*-transparent.svg` viewBox is 2176×831. */
const MARK_WIDTH = (MARK_HEIGHT * 2176) / 831;
/** Lets the navbar fade in before the mark starts drawing. */
const START_DELAY_MS = 250;

type Mode = 'waiting' | 'playing' | 'settled' | 'static';

export function NavLogo() {
  const revealed = useLandingRevealed();
  const reduceMotion = usePrefersReducedMotion();
  const theme = useResolvedTheme();
  const [isArmed, setIsArmed] = useState(false);
  const [mode, setMode] = useState<Mode>('waiting');

  useEffect(() => {
    if (!revealed || reduceMotion) return;
    const timer = window.setTimeout(() => {
      setIsArmed(true);
      setMode('playing');
    }, START_DELAY_MS);
    return () => window.clearTimeout(timer);
  }, [revealed, reduceMotion]);

  const handleSettled = useCallback(() => setMode('settled'), []);

  // The sweep is white-only, so light mode keeps the static black symbol.
  const effectiveMode: Mode = reduceMotion || theme === 'light' ? 'static' : mode;
  const showLabel = effectiveMode === 'settled' || effectiveMode === 'static';

  return (
    <Link
      href="/"
      className="flex items-center gap-3 rounded-md outline-offset-4"
      aria-label="SpaceXSI Villahermosa, inicio"
    >
      <span className="relative block shrink-0" style={{ width: MARK_WIDTH, height: MARK_HEIGHT }}>
        {effectiveMode !== 'static' && isArmed ? (
          <span
            className={cn('nav-mark-sweep', effectiveMode === 'settled' && 'nav-mark-sweep-out')}
          >
            <LetterSweep
              sweep={MARK_SWEEP}
              className="absolute inset-0 h-full w-full"
              onSettled={handleSettled}
            />
          </span>
        ) : null}
        {effectiveMode === 'static' || effectiveMode === 'settled' ? (
          <Mark fadeIn={effectiveMode === 'settled'} />
        ) : null}
      </span>
      <span
        className={cn('nav-logo-label flex items-center gap-3', showLabel && 'nav-logo-label-in')}
        aria-hidden
      >
        <span className="h-4 w-px bg-foreground/25" />
        <span className="text-[15px] font-medium tracking-tight text-foreground/90">
          Villahermosa
        </span>
      </span>
    </Link>
  );
}

function Mark({ fadeIn }: { fadeIn: boolean }) {
  return (
    <span className={cn('absolute inset-0', fadeIn && 'nav-mark-in')}>
      <img
        src="/brand/spacexsi/spacexsi-symbol-white-transparent.svg"
        alt=""
        width={2176}
        height={831}
        className="theme-dark-only block h-full w-full"
      />
      <img
        src="/brand/spacexsi/spacexsi-symbol-black-transparent.svg"
        alt=""
        width={2176}
        height={831}
        className="theme-light-only block h-full w-full"
      />
    </span>
  );
}
