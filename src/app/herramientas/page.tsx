import type { Metadata } from 'next';

import type { ToolSectionCardData } from '@/features/tools/section-card';
import { templateCountLabel, TOOL_SECTIONS } from '@/features/tools/sections';
import { templatesForSection } from '@/features/tools/templates';
import { ToolSectionsBrowser } from '@/features/tools/tool-sections-browser';

export const metadata: Metadata = {
  title: 'Herramientas de la comunidad · SpaceXAI Villahermosa',
  description: 'Herramientas creadas por la comunidad para la comunidad.',
};

const sections: ToolSectionCardData[] = TOOL_SECTIONS.map((section) => ({
  slug: section.slug,
  title: section.title,
  description: section.description,
  countLabel: templateCountLabel(templatesForSection(section.slug).length),
}));

export default function HerramientasPage() {
  return (
    <div className="mx-auto w-full max-w-6xl px-5 py-12 md:px-6 md:py-16">
      <ToolSectionsBrowser sections={sections} />
    </div>
  );
}
