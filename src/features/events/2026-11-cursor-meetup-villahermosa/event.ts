import type { UpcomingMeetup } from '../types';
import coverLuma from './promo/cover-luma.jpg';
import flyerVictor from './promo/flyer-victor-leon.jpg';

export const cursorMeetupVillahermosa = {
  slug: 'cursor-meetup-villahermosa-2026-11',
  title: 'Cursor Meetup Villahermosa - November 2026',
  date: 'jueves 12 de noviembre de 2026',
  city: 'Villahermosa',
  venue: 'Café Elementos Laguna Park',
  summary: 'Meetup de Cursor de la comunidad en Café Elementos Laguna Park.',
  lumaUrl: 'https://luma.com/spacexai-j67x',
  cover: {
    src: coverLuma,
    alt: 'Poster de Cursor Villahermosa Meetup sobre el puente peatonal',
  },
  flyers: [
    {
      src: flyerVictor,
      alt: 'Flyer de la charla El arte de hablar con la IA para obtener resultados increíbles (sin saber programar), de Victor Leon',
      title: 'El arte de hablar con la IA para obtener resultados increíbles (sin saber programar)',
      speaker: 'Victor Leon',
    },
  ],
} satisfies UpcomingMeetup;
