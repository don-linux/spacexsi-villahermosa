import { cva, type VariantProps } from 'class-variance-authority';
import Link from 'next/link';
import type { ComponentProps, JSX, ReactNode } from 'react';

import { cn } from '@/lib/utils';

const pillVariants = cva('pill', {
  variants: {
    tone: {
      soft: 'pill-soft',
      solid: 'pill-solid',
    },
  },
});

type Tone = NonNullable<VariantProps<typeof pillVariants>['tone']>;

type PillClass = {
  tone: Tone;
  className?: string;
};

export function Pill(props: PillClass & Omit<ComponentProps<'span'>, 'className'>): JSX.Element;
export function Pill(
  props: PillClass & Omit<ComponentProps<'button'>, 'className'> & { as: 'button' },
): JSX.Element;
export function Pill(
  props: PillClass & Omit<ComponentProps<'a'>, 'className'> & { as: 'a' },
): JSX.Element;
export function Pill(
  props: PillClass & Omit<ComponentProps<typeof Link>, 'className'> & { as: typeof Link },
): JSX.Element;
export function Pill({
  as,
  tone,
  className,
  children,
  ...props
}: PillClass & { as?: 'button' | 'a' | typeof Link; children?: ReactNode }) {
  const classes = cn(pillVariants({ tone }), className);

  if (as === Link) {
    return (
      <Link className={classes} {...(props as ComponentProps<typeof Link>)}>
        {children}
      </Link>
    );
  }

  if (as === 'button') {
    return (
      <button className={classes} {...(props as ComponentProps<'button'>)}>
        {children}
      </button>
    );
  }

  if (as === 'a') {
    return (
      <a className={classes} {...(props as ComponentProps<'a'>)}>
        {children}
      </a>
    );
  }

  return (
    <span className={classes} {...(props as ComponentProps<'span'>)}>
      {children}
    </span>
  );
}
