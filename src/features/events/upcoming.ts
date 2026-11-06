import { cursorMeetupVillahermosa } from './2026-11-cursor-meetup-villahermosa/event';
import type { UpcomingMeetup } from './types';

/** The single planned meetup. Null until the next one is scheduled. */
export const upcomingMeetup: UpcomingMeetup | null = cursorMeetupVillahermosa;

export function getUpcomingMeetup(slug: string): UpcomingMeetup | undefined {
  if (upcomingMeetup?.slug !== slug) return undefined;
  return upcomingMeetup;
}
