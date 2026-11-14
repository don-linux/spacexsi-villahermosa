import { grokBotParaPadresVillahermosa } from './2026-11-grok-bot-para-padres-villahermosa/event';
import { hackatonNacionalVillahermosa } from './2026-11-hackaton-nacional-villahermosa/event';
import type { UpcomingMeetup } from './types';

/** Planned events, soonest first. Empty until the next one is scheduled. */
export const upcomingEvents: readonly UpcomingMeetup[] = [
  hackatonNacionalVillahermosa,
  grokBotParaPadresVillahermosa,
];

export function getUpcomingMeetup(slug: string): UpcomingMeetup | undefined {
  return upcomingEvents.find((event) => event.slug === slug);
}
