import type { Metadata } from 'next';

import { GROK_BOT_SILHOUETTE_MARKS, GrokBotMark } from '@/components/ui/grok-bot-mark';
import { EventCard, type PastEventCardData } from '@/features/events/event-card';
import { upcomingEvents } from '@/features/events/upcoming';

export const metadata: Metadata = {
  title: 'Proximos meetups · SpaceXSI Villahermosa',
  description: 'Lo que sigue de SpaceXSI en Villahermosa.',
};

const EMPTY_COPY =
  'Ups! Por el momento no hay eventos planeados, vuelve aqui despues para ver si hay algo ;)';

const cards: PastEventCardData[] = upcomingEvents.map((event) => ({
  slug: event.slug,
  title: event.title,
  date: event.date,
  city: event.city,
  venue: event.venue,
  lumaUrl: event.lumaUrl,
  cover: event.cover,
}));

const presentation = cards.length === 1 ? 'feature' : 'grid';

export default function UpcomingMeetupsPage() {
  return (
    <div className="mx-auto w-full max-w-6xl px-5 py-12 md:px-6 md:py-16">
      <header>
        <h1 className="page-title text-4xl md:text-5xl">Proximos meetups</h1>
        <p className="mt-3 max-w-xl text-foreground/60">
          Lo que sigue de la comunidad en Villahermosa.
        </p>
      </header>
      {cards.length > 0 ? (
        <ul
          className={
            presentation === 'feature'
              ? 'mt-8'
              : 'mt-8 grid [grid-template-columns:repeat(auto-fill,minmax(16rem,1fr))] gap-4'
          }
        >
          {cards.map((event, index) => (
            <li key={event.slug} className="min-w-0">
              <EventCard
                event={event}
                presentation={presentation}
                hrefBase="/eventos/proximos"
                preload={index === 0}
              />
            </li>
          ))}
        </ul>
      ) : (
        <div className="mt-10">
          <div className="flex flex-wrap gap-3" aria-hidden>
            {GROK_BOT_SILHOUETTE_MARKS.map((id) => (
              <GrokBotMark key={id} id={id} className="size-12" />
            ))}
          </div>
          <p className="mt-6 max-w-xl text-foreground/60">{EMPTY_COPY}</p>
        </div>
      )}
    </div>
  );
}
