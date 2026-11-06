import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Suspense } from 'react';

import { EventGallery } from '@/features/events/event-gallery';
import { LumaTicket } from '@/features/events/luma-ticket';
import type { EventImage } from '@/features/events/types';
import { getUpcomingMeetup, upcomingMeetup } from '@/features/events/upcoming';

const noPhotos: EventImage[] = [];

// Cache Components requires at least one param. With nothing planned, this slug 404s.
const UNSCHEDULED_SLUG = '_';

export function generateStaticParams() {
  return [{ slug: upcomingMeetup?.slug ?? UNSCHEDULED_SLUG }];
}

type EventPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: EventPageProps): Promise<Metadata> {
  const { slug } = await params;
  const event = getUpcomingMeetup(slug);
  if (!event) return { title: 'Proximos meetups · SpaceXAI Villahermosa' };
  return {
    title: `${event.title} · SpaceXAI Villahermosa`,
    description: event.summary,
  };
}

export default function UpcomingMeetupPage({ params }: EventPageProps) {
  return (
    <Suspense fallback={null}>
      <UpcomingMeetupContent params={params} />
    </Suspense>
  );
}

async function UpcomingMeetupContent({ params }: EventPageProps) {
  const { slug } = await params;
  const event = getUpcomingMeetup(slug);
  if (!event) notFound();

  return (
    <div className="mx-auto w-full max-w-6xl px-5 py-12 md:px-6 md:py-16">
      <Link
        href="/eventos/proximos"
        className="text-sm text-foreground/55 transition-colors hover:text-foreground"
      >
        Proximos meetups
      </Link>
      <h1 className="page-title mt-4 text-4xl md:text-5xl">{event.title}</h1>
      <p className="mt-4 text-base text-foreground/70">{event.date}</p>
      <p className="mt-1 text-base text-foreground/70">{event.venue}</p>
      <div className="mt-10">
        <LumaTicket href={event.lumaUrl} image={event.cover} />
      </div>
      <EventGallery flyers={event.flyers} photos={noPhotos} />
    </div>
  );
}
