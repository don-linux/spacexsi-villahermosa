import Link from 'next/link';

import { GrokBotWordmark } from '@/components/ui/grok-bot-wordmark';
import { cn } from '@/lib/utils';

export type ToolSectionCardData = {
  slug: string;
  title: string;
  description: string;
  countLabel: string;
};

export function SectionCard({
  section,
  presentation,
}: {
  section: ToolSectionCardData;
  presentation: 'grid' | 'list';
}) {
  const list = presentation === 'list';
  const wordmark = section.slug === 'plantillas-grok-bot';

  return (
    <Link
      href={`/herramientas/${section.slug}`}
      className={cn(
        'rounded-2xl border border-foreground/10 transition-colors hover:border-foreground/25',
        list
          ? wordmark
            ? 'flex flex-col gap-3 p-3 sm:flex-row sm:items-center sm:justify-between sm:gap-4'
            : 'flex items-center justify-between gap-4 p-3'
          : 'flex h-full flex-col gap-2 p-4',
      )}
    >
      {wordmark ? (
        <GrokBotWordmark
          aria-hidden
          className={cn(
            'block aspect-[317.7/60.94] w-auto max-w-full self-start',
            list ? 'h-8 sm:h-7' : 'h-9',
          )}
        />
      ) : null}
      <span className={list ? 'min-w-0 flex-1' : 'min-w-0'}>
        <h2 className="text-[15px] leading-snug font-medium text-balance">{section.title}</h2>
        <span className={cn('mt-1 block text-[13px] text-foreground/60', list && 'truncate')}>
          {section.description}
        </span>
      </span>
      <span className={cn('text-[13px] text-foreground/60', list ? 'shrink-0' : 'mt-auto pt-3')}>
        {section.countLabel}
      </span>
    </Link>
  );
}
