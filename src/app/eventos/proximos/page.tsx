import type { Metadata } from 'next';

import { GROK_BOT_SILHOUETTE_MARKS, GrokBotMark } from '@/components/ui/grok-bot-mark';
import { EventCard, type PastEventCardData } from '@/features/events/event-card';
import { upcomingMeetup } from '@/features/events/upcoming';

export const metadata: Metadata = {
  title: 'Proximos meetups · SpaceXSI Villahermosa',
  description: 'El siguiente meetup de SpaceXSI en Villahermosa.',
};

const EMPTY_COPY =
  'Ups! Por el momento no hay eventos planeados, vuelve aqui despues para ver si hay algo ;)';

const card: PastEventCardData | null = upcomingMeetup
  ? {
      slug: upcomingMeetup.slug,
      title: upcomingMeetup.title,
      date: upcomingMeetup.date,
      city: upcomingMeetup.city,
      venue: upcomingMeetup.venue,
      lumaUrl: upcomingMeetup.lumaUrl,
      cover: upcomingMeetup.cover,
    }
  : null;

export default function UpcomingMeetupsPage() {
  return (
    <div className="mx-auto w-full max-w-6xl px-5 py-12 md:px-6 md:py-16">
      <header>
        <h1 className="page-title text-4xl md:text-5xl">Proximos meetups</h1>
        <p className="mt-3 max-w-xl text-foreground/60">El siguiente meetup de la comunidad.</p>
      </header>
      {card ? (
        <ul className="mt-8">
          <li>
            <EventCard event={card} presentation="feature" hrefBase="/eventos/proximos" preload />
          </li>
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
