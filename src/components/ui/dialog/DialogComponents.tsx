'use client';

import { ClientOnly } from '@/components/common/ClientOnly';
import DragonBurnDialog from '@/components/ui/dialog/DragonBurnDialog';
import MainWalletConnectDialog from '@/components/ui/dialog/wallet-connect/MainWalletConnectDialog';
import LBPRewardDialog from './LBPRewardDialog';
import StakeBuffDialog from '@/components/ui/dialog/stake/StakeBuffDialog';
import BtcWalletConnectDialog from '@/components/ui/dialog/wallet-connect/BtcWalletConnectDialog';
import StakeHistoryDialog from './StakeHistoryDialog';
import StakeAndRedeemDialog from './stake/StakeAndRedeemDialog';

export default function DialogComponents() {
  return (
    <ClientOnly>
      <StakeBuffDialog />
      <LBPRewardDialog />
      <DragonBurnDialog />
      <MainWalletConnectDialog />
      <BtcWalletConnectDialog />
      <StakeHistoryDialog />
      <StakeAndRedeemDialog />
    </ClientOnly>
  );
}
