import { readFileSync } from 'node:fs';
import path from 'node:path';

import { describe, expect, it } from 'vitest';

import { FOCUS_IN, FOCUS_OUT } from '@/features/credits/transitions';

const root = path.resolve(import.meta.dirname, '..');
const read = (file: string) => readFileSync(path.join(root, file), 'utf8');

const css = read('src/app/globals.css');
const components = [
  'src/features/credits/credits-launcher.tsx',
  'src/features/credits/credits-flow-transition.tsx',
]
  .map(read)
  .join('\n');

// A class name that appears in a ViewTransition prop but not in the CSS fails without an error:
// React assigns the class and the browser has nothing to play.
describe('credits view transitions', () => {
  it('has a rule in globals.css for every class the ViewTransitions name', () => {
    const classes = new Set(
      [...components.matchAll(/'(credits-[a-z-]+)'/g)]
        .map((match) => match[1])
        .filter((name) => name !== FOCUS_IN && name !== FOCUS_OUT),
    );

    expect([...classes].toSorted()).toEqual([
      'credits-backdrop-in',
      'credits-backdrop-out',
      'credits-cards-in',
      'credits-cards-out',
      'credits-wall-in',
      'credits-wall-out',
    ]);
    for (const name of classes) {
      expect(css).toMatch(new RegExp(String.raw`::view-transition-(old|new)\(\.${name}\)`));
    }
  });

  it('animates the two transition types it names', () => {
    for (const type of [FOCUS_IN, FOCUS_OUT]) {
      expect(css).toContain(`@keyframes ${type}`);
    }
  });

  it('keeps the animations off for reduced motion', () => {
    expect(css).toMatch(
      /@media \(prefers-reduced-motion: reduce\) \{\s*::view-transition-old\(\*\),[^}]*animation-duration: 0s !important/,
    );
  });
});
