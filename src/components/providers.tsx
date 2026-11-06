'use client';

import { ThemeProvider as NextThemesProvider, useTheme } from 'next-themes';
import { useEffect, useSyncExternalStore, type ReactNode } from 'react';
import { Toaster as Sonner } from 'sonner';

export type ResolvedTheme = 'dark' | 'light';

const THEME_COLOR: Record<ResolvedTheme, string> = {
  dark: '#0a0a0a',
  light: '#ffffff',
};

function subscribeClass(onStoreChange: () => void) {
  const observer = new MutationObserver(onStoreChange);
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ['class'],
  });
  return () => observer.disconnect();
}

function classTheme(): ResolvedTheme {
  return document.documentElement.classList.contains('light') ? 'light' : 'dark';
}

/** The theme on screen. The server renders dark; next-themes sets the class before paint. */
export function useResolvedTheme(): ResolvedTheme {
  return useSyncExternalStore(subscribeClass, classTheme, () => 'dark');
}

function ThemeColor() {
  const theme = useResolvedTheme();

  useEffect(() => {
    document.querySelector('meta[name="theme-color"]')?.setAttribute('content', THEME_COLOR[theme]);
  }, [theme]);

  return null;
}

function Toaster() {
  const { resolvedTheme } = useTheme();
  const theme = resolvedTheme === 'dark' || resolvedTheme === 'light' ? resolvedTheme : 'system';
  return <Sonner theme={theme} />;
}

export function Providers({ children }: { children: ReactNode }) {
  return (
    <NextThemesProvider attribute="class" defaultTheme="dark" enableSystem storageKey="theme">
      <ThemeColor />
      {children}
      <Toaster />
    </NextThemesProvider>
  );
}
