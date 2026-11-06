import type { UpcomingMeetup } from '../types';
import coverLuma from './promo/cover-luma.jpg';
import programa from './promo/programa.jpg';

export const hackatonNacionalVillahermosa = {
  slug: 'hackaton-nacional-villahermosa-2026-11',
  title: 'Hackatón Nacional México: Villahermosa',
  date: 'sábado 14 de noviembre de 2026',
  city: 'Villahermosa',
  venue: 'Algorithmics Villahermosa Centro',
  summary:
    'Kickoff presencial en Villahermosa del Hackatón Nacional. Cuatro semanas, del 14 de noviembre al 12 de diciembre, para construir pagos digitales con CoDi y la API de Pey.',
  lumaUrl: 'https://luma.com/9rbs69t5',
  cover: {
    src: coverLuma,
    alt: 'Poster de Hackatón Nacional México en Villahermosa, sábado 14 de noviembre de 2026',
  },
  flyers: [
    {
      src: programa,
      alt: 'Cartel del Hackatón Nacional, del 14 de noviembre al 12 de diciembre de 2026, en todo México',
      title: 'Cuatro semanas para construir pagos digitales con CoDi y la API de Pey.',
      speaker: 'SpaceXSI, Pey y AI Builders México',
    },
  ],
} satisfies UpcomingMeetup;
