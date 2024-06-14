'use client';

import { ClientOnly } from '@/components/common/ClientOnly';
import StakeBuffDialog from '@/components/ui/dialog/stake/StakeBuffDialog';
import BtcWalletConnectDialog from '@/components/ui/dialog/wallet-connect/BtcWalletConnectDialog';
import MainWalletConnectDialog from '@/components/ui/dialog/wallet-connect/MainWalletConnectDialog';
import LBPRewardDialog from './LBPRewardDialog';
import RewardDetailDialog from './RewardDetailDialog';
import StakeHistoryDialog from './stake/StakeHistoryDialog';
import StakeAndRedeemDialog from './stake/StakeAndRedeemDialog';
import ExistedAddressBindDialog from '@/components/ui/dialog/wallet-connect/ExistedAddressBindDialog';
import UnbindWalletDialog from '@/components/ui/dialog/wallet-connect/UnbindWalletDialog';
import WithdrawDialog from './WithdrawDialog';
import BurnDragonBallDialog from './BurnDragonBallDialog';
import FirstStakeGuideDialog from './stake/FirstStakeGuideDialog';
import RewardHistoryDialog from '@/components/ui/dialog/RewardHistoryDialog';

export default function DialogComponents() {
  return (
    <ClientOnly>
      <WithdrawDialog />
      <BurnDragonBallDialog />
      <StakeAndRedeemDialog />
      <StakeBuffDialog />
      <FirstStakeGuideDialog />
      <LBPRewardDialog />
      <MainWalletConnectDialog />
      <BtcWalletConnectDialog />
      <StakeHistoryDialog />
      <ExistedAddressBindDialog />
      <UnbindWalletDialog />
      <RewardDetailDialog />
      <RewardHistoryDialog />
    </ClientOnly>
  );
}
