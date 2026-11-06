import type { UpcomingMeetup } from '../types';
import coverLuma from './promo/cover-luma.png';
import flyerRaul from './promo/flyer-raul-gallegos.png';
import flyerVictor from './promo/flyer-victor-leon.png';

export const cursorMeetupVillahermosa = {
  slug: 'cursor-meetup-villahermosa-2026-11',
  title: 'Cursor Meetup Villahermosa - November 2026',
  date: 'jueves 12 de noviembre de 2026',
  city: 'Villahermosa',
  venue: 'Café Elementos Laguna Park',
  summary:
    'Dos charlas para desarrolladores y no desarrolladores. Un espacio para conectar con quienes están construyendo con IA en Tabasco.',
  lumaUrl: 'https://luma.com/spacexai-j67x',
  cover: {
    src: coverLuma,
    alt: 'Poster de Cursor Villahermosa Meetup sobre el puente peatonal',
    quality: 90,
  },
  flyers: [
    {
      src: flyerVictor,
      alt: 'Flyer de la charla El arte de hablar con la IA para obtener resultados increíbles (sin saber programar), de Victor Leon',
      title: 'El arte de hablar con la IA para obtener resultados increíbles (sin saber programar)',
      subtitle: 'Para desarrolladores y no desarrolladores',
      speaker: 'Victor Leon, Lead AI and Product Engineer en Weelock',
      quality: 90,
    },
    {
      src: flyerRaul,
      alt: 'Flyer de la charla De autodidacta a emprendedor SaaS, de Raúl Gallegos Hernández',
      title: 'De autodidacta a emprendedor SaaS',
      subtitle: 'Una historia para desarrolladores y no desarrolladores',
      speaker: 'Raúl Gallegos Hernández, CEO & Founder en Plick',
      quality: 90,
    },
  ],
} satisfies UpcomingMeetup;
