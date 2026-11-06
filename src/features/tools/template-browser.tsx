'use client';

import Link from 'next/link';
import { useState } from 'react';

import { FilterChip } from '@/components/ui/filter-chip';
import { GrokBotMark } from '@/components/ui/grok-bot-mark';
import type { CommunityTemplate } from '@/features/tools/templates';

import { TemplateCard } from './template-card';

type View = 'grid' | 'list';

export function TemplateBrowser({
  title,
  description,
  templates,
}: {
  title: string;
  description: string;
  templates: CommunityTemplate[];
}) {
  const [view, setView] = useState<View>('grid');

  return (
    <section>
      <Link
        href="/herramientas"
        className="text-sm text-foreground/55 transition-colors hover:text-foreground"
      >
        Herramientas de la comunidad
      </Link>
      <div className="mt-4 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
        <header>
          <div className="flex items-center gap-4">
            <GrokBotMark id="01" className="size-12 md:size-14" />
            <h1 className="page-title min-w-0 text-4xl md:text-5xl">{title}</h1>
          </div>
          <p className="mt-3 max-w-xl text-foreground/60">{description}</p>
        </header>
        <div
          role="group"
          aria-label="Vista del listado"
          className="inline-flex w-fit rounded-full bg-foreground/[0.06] p-1"
        >
          <FilterChip pressed={view === 'grid'} onSelect={() => setView('grid')}>
            Rejilla
          </FilterChip>
          <FilterChip pressed={view === 'list'} onSelect={() => setView('list')}>
            Listado
          </FilterChip>
        </div>
      </div>

      {templates.length === 0 ? (
        <p className="mt-10 text-foreground/60">Aun no hay plantillas.</p>
      ) : (
        <ul
          className={
            view === 'list' ? 'mt-8 flex flex-col gap-3' : 'mt-8 grid gap-4 lg:grid-cols-2'
          }
        >
          {templates.map((template) => (
            <li key={template.slug} className="min-w-0">
              <TemplateCard template={template} presentation={view} />
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
