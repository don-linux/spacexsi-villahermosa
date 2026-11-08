import type { Metadata } from 'next';

import { lumaEventUrl } from '@/features/credits/claim-links';
import { CreditsLauncher } from '@/features/credits/credits-launcher';
import { CreditsWall } from '@/features/credits/credits-wall';

export const metadata: Metadata = {
  title: 'Créditos · SpaceXSI Villahermosa',
  description: 'Canjea los créditos del meetup de Grok en Villahermosa.',
};

// The page behind the menu is the first view of both flows, inert and under a blurred veil.
export default function CreditsPage() {
  return (
    <>
      <div inert>
        <CreditsWall claim={null} lumaUrl={lumaEventUrl()} />
      </div>
      <CreditsLauncher />
    </>
  );
}
