import Image, { type StaticImageData } from 'next/image';
import Link from 'next/link';

import { cn } from '@/lib/utils';

import { LumaLogo } from './luma-logo';

export type PastEventCardData = {
  slug: string;
  title: string;
  date: string;
  city: string;
  venue: string;
  lumaUrl?: string;
  cover: { src: StaticImageData; alt: string };
};

type Presentation = 'feature' | 'grid' | 'list';

function coverSizes(presentation: Presentation) {
  if (presentation === 'list') return '5rem';
  if (presentation === 'feature') return '(min-width: 768px) 36rem, 100vw';
  return '(min-width: 1024px) 22rem, (min-width: 640px) 50vw, 100vw';
}

function LumaMark({ compact }: { compact: boolean }) {
  return (
    <span
      className={cn(
        'absolute flex items-center rounded-md bg-black/80',
        compact ? 'top-1 right-1 h-4 px-1' : 'top-3 right-3 h-7 px-1.5',
      )}
    >
      <LumaLogo className={compact ? 'h-2.5 w-auto' : 'h-3.5 w-auto'} />
    </span>
  );
}

export function EventCard({
  event,
  presentation,
  hrefBase = '/eventos/pasados',
  preload = false,
}: {
  event: PastEventCardData;
  presentation: Presentation;
  hrefBase?: string;
  preload?: boolean;
}) {
  const href = `${hrefBase}/${event.slug}`;
  const list = presentation === 'list';
  const feature = presentation === 'feature';

  return (
    <Link
      href={href}
      className={cn(
        'border border-foreground/10 transition-colors hover:border-foreground/25',
        list
          ? 'flex flex-row items-center gap-4 rounded-2xl p-3'
          : feature
            ? 'grid overflow-hidden rounded-3xl md:grid-cols-2'
            : 'flex h-full flex-col overflow-hidden rounded-2xl',
      )}
    >
      <span
        className={cn(
          'relative bg-black',
          list ? 'size-20 shrink-0 overflow-hidden rounded-xl' : 'aspect-square',
        )}
      >
        <Image
          src={event.cover.src}
          alt=""
          fill
          sizes={coverSizes(presentation)}
          className="object-contain"
          preload={preload}
        />
        {event.lumaUrl ? <LumaMark compact={list} /> : null}
      </span>
      <span
        className={cn(
          list
            ? 'min-w-0 py-1'
            : feature
              ? 'flex flex-col justify-center gap-2 px-6 py-8 md:px-10 md:py-12'
              : 'flex flex-col gap-1.5 p-4',
        )}
      >
        <h2
          className={cn(
            feature
              ? 'page-title text-3xl md:text-4xl'
              : 'text-[15px] leading-snug font-medium text-balance',
          )}
        >
          {event.title}
        </h2>
        <span
          className={cn('block text-foreground/60', feature ? 'mt-2 text-base' : 'text-[13px]')}
        >
          {event.date}
        </span>
        <span className={cn('block text-foreground/60', feature ? 'text-base' : 'text-[13px]')}>
          {list ? event.city : event.venue}
        </span>
      </span>
    </Link>
  );
}
