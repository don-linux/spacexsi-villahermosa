import type { Metadata } from 'next';

import { eventClaim, lumaEventUrl } from '@/features/credits/claim-links';
import { CreditsWall } from '@/features/credits/credits-wall';

export const metadata: Metadata = {
  title: 'Créditos · SpaceXSI Villahermosa',
  description: 'Canjea los créditos del meetup de Grok en Villahermosa.',
};

export default function CreditsPage() {
  return <CreditsWall claim={eventClaim()} lumaUrl={lumaEventUrl()} />;
}
