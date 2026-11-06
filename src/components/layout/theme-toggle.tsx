'use client';

import { useTheme } from 'next-themes';
import { useSyncExternalStore } from 'react';

import { MoonIcon, SunIcon } from '@/components/ui/icons';

const STORAGE_KEY = 'theme';

type ThemePreference = 'dark' | 'light' | 'system';

const NEXT: Record<ThemePreference, ThemePreference> = {
  dark: 'system',
  system: 'light',
  light: 'dark',
};

const LABEL: Record<ThemePreference, string> = {
  dark: 'Cambiar a tema oscuro',
  system: 'Usar el tema del sistema',
  light: 'Cambiar a tema claro',
};

function isPreference(value: string | null): value is ThemePreference {
  return value === 'dark' || value === 'light' || value === 'system';
}

function readPreference(): ThemePreference {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return isPreference(stored) ? stored : 'dark';
  } catch {
    return 'dark';
  }
}

const CHANGE_EVENT = 'spacexsi:theme';

function subscribe(onChange: () => void) {
  const onStorage = (event: StorageEvent) => {
    if (event.key === null || event.key === STORAGE_KEY) onChange();
  };
  window.addEventListener('storage', onStorage);
  window.addEventListener(CHANGE_EVENT, onChange);
  return () => {
    window.removeEventListener('storage', onStorage);
    window.removeEventListener(CHANGE_EVENT, onChange);
  };
}

/** Cycles dark, system and light like x.ai; the icon always shows the opposite of the theme on screen. */
export function ThemeToggle() {
  const { setTheme } = useTheme();
  const preference = useSyncExternalStore(subscribe, readPreference, () => 'dark' as const);
  const next = NEXT[preference];

  return (
    <button
      type="button"
      onClick={() => {
        setTheme(next);
        window.dispatchEvent(new Event(CHANGE_EVENT));
      }}
      aria-label={LABEL[next]}
      title={LABEL[next]}
      className="flex size-7 items-center justify-center rounded-full text-foreground/40 transition-colors hover:text-foreground focus-visible:text-foreground"
    >
      <SunIcon className="theme-dark-only size-4" />
      <MoonIcon className="theme-light-only size-4" />
    </button>
  );
}
