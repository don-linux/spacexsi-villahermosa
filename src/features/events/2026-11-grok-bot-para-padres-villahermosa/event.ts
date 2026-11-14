import type { UpcomingMeetup } from '../types';
import coverLuma from './promo/cover-luma.png';

export const grokBotParaPadresVillahermosa = {
  slug: 'grok-bot-para-padres-villahermosa-2026-11',
  title: 'Grok Bot Para Padres',
  date: 'viernes 20 de noviembre de 2026',
  city: 'Villahermosa',
  venue: 'Algorithmics Villahermosa Centro',
  summary:
    'Charla para padres, sin tecnicismos, sobre cómo usar Grok Bot para acompañar la curiosidad, la creatividad y el aprendizaje de sus hijos.',
  lumaUrl: 'https://luma.com/spacexsi-bix5',
  cover: {
    src: coverLuma,
    alt: 'Poster de Grok Bot Para Padres, Friday, November 20th',
    quality: 90,
  },
  flyers: [
    {
      src: coverLuma,
      alt: 'Poster de Grok Bot Para Padres, Friday, November 20th',
      title: 'Grok Bot Para Padres',
      speaker: 'Fernando Diaz',
      quality: 90,
    },
  ],
} satisfies UpcomingMeetup;
