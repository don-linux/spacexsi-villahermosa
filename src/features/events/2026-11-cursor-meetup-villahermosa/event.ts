import type { PastEvent } from '../types';
import photoTalkRedLaptop from './photos/charla-playera-roja-laptop.jpeg';
import photoTalkRedRoom from './photos/charla-playera-roja-sala.jpeg';
import photoTalkGestures from './photos/charla-polo-gestos.jpeg';
import photoTalkTable from './photos/charla-polo-mesa.jpeg';
import photoTalkPhone from './photos/charla-polo-telefono.jpeg';
import photoRoomRecording from './photos/charla-sala-grabacion.jpeg';
import photoGroup from './photos/grupo-banner.jpeg';
import photoLaptopGrok from './photos/laptop-grok-bot.jpeg';
import photoTableStreamers from './photos/mesa-papel-picado.jpeg';
import photoTableRed from './photos/mesa-playera-roja.jpeg';
import photoSpeakerRedSlide from './photos/orador-playera-roja-diapositiva.jpeg';
import photoSpeakerRed from './photos/orador-playera-roja.jpeg';
import photoSpeakerSlide from './photos/orador-polo-diapositiva.jpeg';
import photoSpeakerGrok from './photos/orador-polo-grok-bot.jpeg';
import photoStanding from './photos/sala-de-pie.jpeg';
import photoService from './photos/servicio-mesa.jpeg';
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
  photos: [
    {
      src: photoGroup,
      alt: 'Foto de grupo con el banner de SpaceXSI Villahermosa Community, alrededor de una mesa',
      quality: 90,
    },
    {
      src: photoTableStreamers,
      alt: 'Personas sentadas alrededor de la mesa, bajo luces y papel picado',
      quality: 90,
    },
    {
      src: photoTableRed,
      alt: 'Mesa del meetup, con una persona de playera roja en primer plano',
      quality: 90,
    },
    {
      src: photoTalkGestures,
      alt: 'Persona de polo blanco hablando de pie frente a la mesa; otra graba con el teléfono',
      quality: 90,
    },
    {
      src: photoTalkPhone,
      alt: 'Persona de polo blanco hablando con un teléfono en la mano, frente a la mesa',
      quality: 90,
    },
    {
      src: photoTalkTable,
      alt: 'Persona de polo blanco hablando, vista desde el otro lado de la mesa',
      quality: 90,
    },
    {
      src: photoSpeakerGrok,
      alt: 'Persona de polo blanco hablando, con una laptop que muestra el código QR de Grok Bot',
      quality: 90,
    },
    {
      src: photoSpeakerSlide,
      alt: 'Victor Leon hablando, con la diapositiva El arte de hablar con la IA para obtener resultados increíbles (sin saber programar)',
      quality: 90,
    },
    {
      src: photoRoomRecording,
      alt: 'Charla en la sala: orador de polo blanco a la izquierda y una persona grabando a la derecha',
      quality: 90,
    },
    {
      src: photoSpeakerRed,
      alt: 'Persona de playera roja de pie junto a la mesa, con un documento en la laptop',
      quality: 90,
    },
    {
      src: photoLaptopGrok,
      alt: 'Persona sentada junto a una laptop con el código QR de Grok Bot, entre tortas y vasos',
      quality: 90,
    },
    {
      src: photoTalkRedRoom,
      alt: 'Persona de playera roja hablando de pie; al fondo, otra de polo blanco',
      quality: 90,
    },
    {
      src: photoService,
      alt: 'Servicio de la mesa en Café Elementos, con una persona de playera roja al fondo',
      quality: 90,
    },
    {
      src: photoSpeakerRedSlide,
      alt: 'Persona de playera roja señalando una laptop con la diapositiva Una idea se valida cuando alguien paga por ella',
      quality: 90,
    },
    {
      src: photoTalkRedLaptop,
      alt: 'Persona de playera roja de pie frente a la mesa, con una laptop de Grok Bot',
      quality: 90,
    },
    {
      src: photoStanding,
      alt: 'Personas de pie y sentadas alrededor de la mesa, con papel picado y luces',
      quality: 90,
    },
  ],
} satisfies PastEvent;
