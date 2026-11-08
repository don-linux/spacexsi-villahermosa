import type { Metadata } from 'next';

import { lumaEventUrl, trialClaim } from '@/features/credits/claim-links';
import { CreditsFlowTransition } from '@/features/credits/credits-flow-transition';
import { CreditsWall } from '@/features/credits/credits-wall';

export const metadata: Metadata = {
  title: 'Canjear sin cuenta · SpaceXSI Villahermosa',
  description: 'Prueba Grok en Villahermosa aunque todavía no tengas una cuenta.',
  robots: { index: false },
};

export default function CreditsWithoutAccountPage() {
  return (
    <CreditsFlowTransition>
      <CreditsWall claim={trialClaim()} lumaUrl={lumaEventUrl()} />
    </CreditsFlowTransition>
  );
}
