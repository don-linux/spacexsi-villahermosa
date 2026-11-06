import { cva } from 'class-variance-authority';

const filterChipVariants = cva('rounded-full px-3.5 py-1.5 text-sm transition-colors', {
  variants: {
    pressed: {
      true: 'bg-foreground text-background',
      false: 'text-foreground/65 hover:text-foreground',
    },
  },
});

export function FilterChip({
  pressed,
  onSelect,
  children,
}: {
  pressed: boolean;
  onSelect: () => void;
  children: string;
}) {
  return (
    <button
      type="button"
      aria-pressed={pressed}
      onClick={onSelect}
      className={filterChipVariants({ pressed })}
    >
      {children}
    </button>
  );
}
