import Link from 'next/link';
import { ViewTransition } from 'react';

import { ChevronRightIcon, HomeIcon } from '@/components/ui/icons';

const OPTIONS = [
  { href: '/creditos/con-cuenta', title: '¿Ya tienes una cuenta con o sin suscripción?' },
  { href: '/creditos/sin-cuenta', title: '¿Todavía no tienes una cuenta?' },
] as const;

/**
 * The menu over the blurred credits page. Only the cards carry a view transition. The veil stays a
 * plain sibling: inside a named element it would blur only what that element holds, because a named
 * element is a backdrop root.
 */
export function CreditsLauncher() {
  return (
    <>
      <div aria-hidden className="fixed inset-0 z-30 bg-background/50 backdrop-blur-xl" />
      <h1 className="sr-only">Canjear créditos del meetup Villahermosa</h1>
      <ViewTransition enter="credits-cards-in" exit="credits-cards-out" default="none">
        <ul className="fixed inset-0 z-30 m-auto grid h-fit max-h-dvh w-[min(calc(100%-1.5rem),47rem)] gap-4 overflow-y-auto p-2 md:grid-cols-2">
          {OPTIONS.map((option) => (
            <li key={option.href}>
              <Link
                href={option.href}
                transitionTypes={['credits-focus-in']}
                className="group flex h-full min-h-36 flex-col justify-between gap-6 rounded-3xl border border-foreground/10 bg-background/85 p-6 transition-colors hover:border-foreground/25 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-foreground/45 md:min-h-48 md:p-8"
              >
                <h2 className="page-title text-2xl md:text-3xl">{option.title}</h2>
                <ChevronRightIcon className="size-5 self-end text-foreground/40 transition-all group-hover:translate-x-0.5 group-hover:text-foreground" />
              </Link>
            </li>
          ))}
        </ul>
      </ViewTransition>
      <Link
        href="/"
        aria-label="Volver al inicio"
        title="Volver al inicio"
        className="fixed top-5 right-6 z-30 flex h-9 min-w-9 items-center justify-center rounded-full px-[0.35rem] text-foreground/50 transition-colors hover:text-foreground focus-visible:text-foreground max-lg:right-4"
      >
        <HomeIcon className="size-5" />
      </Link>
    </>
  );
}
