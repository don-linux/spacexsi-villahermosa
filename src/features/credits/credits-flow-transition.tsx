import type { ReactNode } from 'react';
import { ViewTransition } from 'react';

import { FOCUS_IN, FOCUS_OUT } from './transitions';

/**
 * Wraps the wall of a flow so it comes into focus when the launcher opens it and loses focus when
 * "Volver" goes back. Any other way in or out (a plain link, the back button) carries no type and
 * swaps instantly, as before.
 */
export function CreditsFlowTransition({ children }: { children: ReactNode }) {
  return (
    <ViewTransition
      enter={{ [FOCUS_IN]: 'credits-wall-in', default: 'none' }}
      exit={{ [FOCUS_OUT]: 'credits-wall-out', default: 'none' }}
      default="none"
    >
      {children}
    </ViewTransition>
  );
}
