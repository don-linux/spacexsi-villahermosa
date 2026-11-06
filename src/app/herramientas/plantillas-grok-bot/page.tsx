import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { getToolSection } from '@/features/tools/sections';
import { TemplateBrowser } from '@/features/tools/template-browser';
import { templatesForSection } from '@/features/tools/templates';

const section = getToolSection('plantillas-grok-bot');

export const metadata: Metadata = {
  title: 'Plantillas de Grok Bot · SpaceXSI Villahermosa',
  description: section?.description ?? 'Plantillas de Grok Bot de la comunidad.',
};

export default function GrokBotTemplatesPage() {
  if (!section) notFound();

  return (
    <div className="mx-auto w-full max-w-6xl px-5 py-12 md:px-6 md:py-16">
      <TemplateBrowser
        title={section.title}
        description={section.description}
        templates={templatesForSection(section.slug)}
      />
    </div>
  );
}
