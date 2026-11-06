import { SiteFooter } from '@/components/layout/site-footer';
import { SiteHeader } from '@/components/layout/site-header';
import { BotCradle } from '@/features/home/bot-cradle';
import { CursorHome } from '@/features/home/cursor-home';
import { GrokModel } from '@/features/home/grok-model';
import { Hero } from '@/features/home/hero';
import { IntroGate } from '@/features/home/intro-gate';
import { XHome } from '@/features/home/x-home';

export default function Home() {
  return (
    <IntroGate>
      <SiteHeader />
      {/* 4rem is the sticky header's height, so the hero alone fills the first screen. */}
      <main className="flex flex-1 flex-col">
        <div className="flex min-h-[calc(100dvh-4rem)] flex-col">
          <Hero />
        </div>
        <BotCradle />
        <CursorHome />
        <GrokModel />
        <XHome />
      </main>
      <SiteFooter />
    </IntroGate>
  );
}
