import type { PastEvent } from '../types';
import photoTalkAudience from './photos/charla-audiencia.jpeg';
import photoTalkRegister from './photos/charla-registro.jpeg';
import photoCapInHand from './photos/gorra-en-mano.jpeg';
import photoCapHexagon from './photos/gorra-hexagono.jpeg';
import photoGroup from './photos/grupo-banner.jpeg';
import photoSpeakerLaptop from './photos/orador-laptop.jpeg';
import photoScreen from './photos/pantalla-hackaton.jpeg';
import photoGreenShirt from './photos/playera-verde-laptop.jpeg';
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
    quality: 90,
  },
  flyers: [
    {
      src: programa,
      alt: 'Cartel del Hackatón Nacional, del 14 de noviembre al 12 de diciembre de 2026, en todo México',
      title: 'Cuatro semanas para construir pagos digitales con CoDi y la API de Pey.',
      speaker: 'SpaceXSI, Pey y AI Builders México',
      quality: 90,
    },
  ],
  photos: [
    {
      src: photoGroup,
      alt: 'Foto de grupo con el banner de SpaceXSI Villahermosa Community',
      quality: 90,
    },
    {
      src: photoTalkAudience,
      alt: 'Orador de playera negra frente a la audiencia, con una pantalla que muestra un código QR',
      quality: 90,
    },
    {
      src: photoTalkRegister,
      alt: 'Orador de pie junto a la diapositiva Regístrate ahora; una persona graba con el teléfono',
      quality: 90,
    },
    {
      src: photoSpeakerLaptop,
      alt: 'Persona con lentes sentada frente a una laptop llena de stickers',
      quality: 90,
    },
    {
      src: photoCapHexagon,
      alt: 'Gorra negra con un logo hexagonal, con dos personas sentadas al fondo',
      quality: 90,
    },
    {
      src: photoGreenShirt,
      alt: 'Persona de playera verde sonriendo; otra usa una laptop',
      quality: 90,
    },
    {
      src: photoCapInHand,
      alt: 'Persona de polo azul sostiene una gorra negra',
      quality: 90,
    },
    {
      src: photoScreen,
      alt: 'Pantalla con la diapositiva Hackatón Nacional, 14 nov – 12 dic 2026',
      quality: 90,
    },
  ],
} satisfies PastEvent;
