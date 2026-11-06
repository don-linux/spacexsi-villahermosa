'use client';

import { useState } from 'react';

import { FilterChip } from '@/components/ui/filter-chip';

import { SectionCard, type ToolSectionCardData } from './section-card';

type View = 'grid' | 'list';

export function ToolSectionsBrowser({ sections }: { sections: ToolSectionCardData[] }) {
  const [view, setView] = useState<View>('grid');

  return (
    <section>
      <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
        <header>
          <h1 className="page-title text-4xl md:text-5xl">Herramientas de la comunidad</h1>
          <p className="mt-3 max-w-xl text-foreground/60">
            Herramientas creadas por la comunidad para la comunidad
          </p>
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

      {sections.length === 0 ? (
        <p className="mt-10 text-foreground/60">Aun no hay herramientas.</p>
      ) : (
        <ul
          className={
            view === 'list'
              ? 'mt-8 flex flex-col gap-3'
              : 'mt-8 grid [grid-template-columns:repeat(auto-fill,minmax(16rem,1fr))] gap-4'
          }
        >
          {sections.map((section) => (
            <li key={section.slug} className="min-w-0">
              <SectionCard section={section} presentation={view} />
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
