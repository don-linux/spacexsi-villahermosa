import type { Metadata } from 'next';

import { eventClaim, lumaEventUrl } from '@/features/credits/claim-links';
import { CreditsWall } from '@/features/credits/credits-wall';

export const metadata: Metadata = {
  title: 'Canjear con cuenta · SpaceXSI Villahermosa',
  description: 'Canjea los créditos del meetup de Grok en Villahermosa si ya tienes una cuenta.',
  robots: { index: false },
};

export default function CreditsWithAccountPage() {
  return <CreditsWall claim={eventClaim()} lumaUrl={lumaEventUrl()} />;
}
