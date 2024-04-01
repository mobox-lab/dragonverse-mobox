'use client';

import { ClientOnly } from '@/components/common/ClientOnly';
import DragonBurnDialog from '@/components/ui/dialog/DragonBurnDialog';
import MainWalletConnectDialog from '@/components/ui/dialog/wallet-connect/MainWalletConnectDialog';
import LBPRewardDialog from './LBPRewardDialog';
import StakeHistoryDialog from './StakeHistoryDialog';

export default function DialogComponents() {
  return (
    <ClientOnly>
      <DragonBurnDialog />
      <MainWalletConnectDialog />
      <LBPRewardDialog />
      <StakeHistoryDialog />
    </ClientOnly>
  );
}
