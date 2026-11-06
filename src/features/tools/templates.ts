import type { ExpressionId } from '@/lib/grok-bot/expressions';
import type { ColorId, ShapeId } from '@/lib/grok-bot/skins';

import type { ToolSectionSlug } from './sections';

export type CommunityTemplate = {
  slug: string;
  section: ToolSectionSlug;
  name: string;
  author: string;
  description: string;
  /** Public share link. Opens the official template and feeds the QR. */
  href: string;
  skills: string[];
  routines: string[];
  plugins: string[];
  look: {
    shape: ShapeId;
    color: ColorId;
    expression: ExpressionId;
  };
};

export const COMMUNITY_TEMPLATES: CommunityTemplate[] = [
  {
    slug: 'epubot',
    section: 'plantillas-grok-bot',
    name: 'EPUBot',
    author: 'Fernando Diaz',
    description:
      'Convierte cualquier texto en un EPUB 3.3 de máxima calidad: XHTML semántico, accesible, imágenes sin recomprimir y validado con EPUBCheck sin errores.',
    href: 'https://x.ai/bot/fBplVa9-bSyCSTBx3qj1p',
    skills: [],
    routines: [],
    plugins: [],
    look: { shape: 'triangle', color: 'orange', expression: 'neutre' },
  },
  {
    slug: 'business-hunter',
    section: 'plantillas-grok-bot',
    name: 'Business Hunter',
    author: 'Fernando Diaz',
    description:
      'Finds local businesses whose websites are broken, expired, or outdated, scores them by sales opportunity, and keeps them in one live lead sheet for you to contact.',
    href: 'https://x.ai/bot/1zkK4dQLZXz5amRw8axD7',
    skills: [],
    routines: [],
    plugins: [],
    look: { shape: 'hexagone', color: 'gris', expression: 'neutre' },
  },
  {
    slug: 'docs-traductor',
    section: 'plantillas-grok-bot',
    name: 'Docs Traductor',
    author: 'Fernando Diaz',
    description:
      'Traductor de documentos PDF: traduce PDFs de diseño conservando layout, fuentes y gráficos, lo más 1:1 posible con el original.',
    href: 'https://x.ai/bot/KdVMNX4vhoiKnlnYMrIZ4',
    skills: [],
    routines: [],
    plugins: [],
    look: { shape: 'hexagone', color: 'vert', expression: 'neutre' },
  },
  {
    slug: 'x-articles-traductor',
    section: 'plantillas-grok-bot',
    name: 'X articles traductor',
    author: 'Fernando Diaz',
    description:
      'Traduce artículos de X: le pasas el artículo en .md y te devuelve el .md traducido, listo para convertirlo en EPUB con EPUBot.',
    href: 'https://x.ai/bot/lLADcxLHZ1-XA009H3hJI',
    skills: [],
    routines: [],
    plugins: [],
    look: { shape: 'galet', color: 'ambre', expression: 'neutre' },
  },
];

export function templatesForSection(section: ToolSectionSlug): CommunityTemplate[] {
  return COMMUNITY_TEMPLATES.filter((template) => template.section === section);
}
