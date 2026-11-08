'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import type { CSSProperties } from 'react';

import { LetterSweep } from '@/components/ui/letter-sweep';
import { WORDMARK_SWEEP } from '@/components/ui/letter-sweep-frames';
import { cn } from '@/lib/utils';

/** A short beat of dark before the sweep starts, so the write-on is not lost to the page load. */
const SWEEP_HOLD_MS = 350;
/** How long the finished mark holds still before the full wordmark fades in. */
const SWEEP_LINGER_MS = 300;
/** Must match the `.intro-sweep` opacity transition. */
const CROSSFADE_MS = 700;
/** How long the static wordmark stays on screen before the landing is revealed. */
const WORDMARK_HOLD_MS = 650;
/**
 * Long enough for the `.spacexsi-stage` glide and for the hero headline underneath to finish
 * its reveal, so unmounting the overlay is invisible.
 */
const EXIT_MS = 1200;

type Phase = 'intro' | 'leaving' | 'wordmark' | 'exiting';

export function SpaceXSIIntro({ onReveal, onDone }: { onReveal: () => void; onDone: () => void }) {
  const [phase, setPhase] = useState<Phase>('intro');
  const [isArmed, setIsArmed] = useState(false);
  const [morph, setMorph] = useState<CSSProperties | null>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const hasFinished = useRef(false);
  const lingerTimer = useRef(0);

  const finish = useCallback(() => {
    if (hasFinished.current) return;
    hasFinished.current = true;
    setPhase('leaving');
  }, []);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      // The sweep is drawn white, so light mode goes straight to the wordmark.
      if (document.documentElement.classList.contains('light')) {
        hasFinished.current = true;
        setPhase('wordmark');
      } else {
        setIsArmed(true);
      }
    }, SWEEP_HOLD_MS);
    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (phase === 'intro') return;
    if (phase === 'leaving') {
      const timer = window.setTimeout(() => setPhase('wordmark'), CROSSFADE_MS);
      return () => window.clearTimeout(timer);
    }
    if (phase === 'wordmark') {
      const timer = window.setTimeout(() => {
        setMorph(morphOnto(stageRef.current, document.querySelector('[data-intro-target]')));
        setPhase('exiting');
        onReveal();
      }, WORDMARK_HOLD_MS);
      return () => window.clearTimeout(timer);
    }
    const timer = window.setTimeout(onDone, EXIT_MS);
    return () => window.clearTimeout(timer);
  }, [phase, onReveal, onDone]);

  const showSweep = isArmed && (phase === 'intro' || phase === 'leaving');
  const settle = useCallback(() => {
    lingerTimer.current = window.setTimeout(finish, SWEEP_LINGER_MS);
  }, [finish]);
  useEffect(() => () => window.clearTimeout(lingerTimer.current), []);
  const showWordmark = phase !== 'intro';
  const isExiting = phase === 'exiting';

  return (
    <div className={cn('intro-screen', isExiting && 'intro-screen-exit')} aria-hidden>
      <div
        ref={stageRef}
        className={cn('spacexsi-stage', isExiting && !morph && 'spacexsi-stage-fade')}
        style={morph ?? undefined}
      >
        {showWordmark ? (
          <>
            <img
              className="spacexsi-wordmark theme-dark-only"
              src="/brand/spacexsi/spacexsi-wordmark-white-transparent.svg"
              alt=""
              width={147}
              height={19}
            />
            <img
              className="spacexsi-wordmark theme-light-only"
              src="/brand/spacexsi/spacexsi-wordmark-black-transparent.svg"
              alt=""
              width={147}
              height={19}
            />
          </>
        ) : null}
      </div>
      {showSweep ? (
        <div className="intro-sweep-layer">
          <LetterSweep
            sweep={WORDMARK_SWEEP}
            className={cn('intro-sweep', phase === 'leaving' && 'intro-sweep-leaving')}
            onSettled={settle}
          />
        </div>
      ) : null}
    </div>
  );
}

/** Glides the intro wordmark onto the hero's inline wordmark, which sits at the same aspect ratio. */
function morphOnto(from: Element | null, to: Element | null): CSSProperties | null {
  if (!from || !to) return null;
  const start = from.getBoundingClientRect();
  const end = to.getBoundingClientRect();
  if (!start.width || !end.width) return null;
  return {
    transformOrigin: '0 0',
    transform: `translate(${end.left - start.left}px, ${end.top - start.top}px) scale(${end.width / start.width})`,
  };
}
