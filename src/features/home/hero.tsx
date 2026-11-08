import Link from 'next/link';
import type { CSSProperties } from 'react';

import { ArrowUpRightIcon } from '@/components/ui/icons';
import { Pill } from '@/components/ui/pill';
import { upcomingEvents } from '@/features/events/upcoming';

const CURSOR_MEETUP_SLUG = 'cursor-meetup-villahermosa-2026-11';
const cursorMeetup = upcomingEvents.find((event) => event.slug === CURSOR_MEETUP_SLUG);
const CURSOR_MEETUP_HREF = cursorMeetup ? `/eventos/proximos/${cursorMeetup.slug}` : '#';

function revealDelay(ms: number) {
  return { '--reveal-delay': `${ms}ms` } as CSSProperties;
}

export function Hero() {
  return (
    <section className="relative flex flex-1 flex-col items-center justify-center px-5 pt-16 pb-28 text-center md:pt-20">
      <div className="hero-glow" aria-hidden />

      <Link
        href={CURSOR_MEETUP_HREF}
        className="reveal group inline-flex items-center gap-2.5 rounded-full border border-foreground/10 bg-foreground/[0.04] py-1 pr-3 pl-1 text-[13px] transition-colors hover:border-foreground/20 hover:bg-foreground/[0.07]"
        style={revealDelay(120)}
      >
        <span className="rounded-full bg-foreground/[0.08] px-2 py-0.5 text-[12px] font-medium text-orange-600 dark:text-orange-400">
          Nuevo
        </span>
        <span className="font-medium text-foreground">Cursor Meetup</span>
        <span className="text-foreground/50">Noviembre 12</span>
        <ArrowUpRightIcon className="size-3.5 text-foreground/50 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
      </Link>

      <div className="reveal hero-wordmark mt-8" data-intro-target style={revealDelay(220)}>
        <img
          className="theme-dark-only"
          src="/brand/spacexsi/spacexsi-wordmark-white-transparent.svg"
          alt="SpaceXSI"
          width={147}
          height={19}
        />
        <img
          className="theme-light-only"
          src="/brand/spacexsi/spacexsi-wordmark-black-transparent.svg"
          alt="SpaceXSI"
          width={147}
          height={19}
        />
      </div>

      <h1
        className="reveal hero-title mt-6 font-normal tracking-[-0.035em] text-foreground"
        style={revealDelay(320)}
      >
        La Super Inteligencia en Villahermosa, está <span className="hero-underline">aquí</span>.
      </h1>

      <p
        className="reveal mt-6 max-w-xl text-base text-pretty text-foreground/60 md:text-lg"
        style={revealDelay(420)}
      >
        Conoce las herramientas de SpaceXSI para construir con Grok en nuestros meetups y eventos en
        Tabasco.
      </p>

      <div
        className="reveal mt-9 flex flex-wrap items-center justify-center gap-3"
        style={revealDelay(520)}
      >
        <Pill as={Link} href="/eventos/proximos" tone="solid" className="h-11 px-5">
          Ver próximos eventos
        </Pill>
        <Pill as={Link} href="/eventos/pasados" tone="soft" className="h-11 px-5">
          Ver eventos pasados
        </Pill>
      </div>
    </section>
  );
}
