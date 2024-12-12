'use client';

import { ClientOnly } from '@/components/common/ClientOnly';
import RewardHistoryDialog from '@/components/ui/dialog/RewardHistoryDialog';
import StakeBuffDialog from '@/components/ui/dialog/stake/StakeBuffDialog';
import BtcWalletConnectDialog from '@/components/ui/dialog/wallet-connect/BtcWalletConnectDialog';
import ExistedAddressBindDialog from '@/components/ui/dialog/wallet-connect/ExistedAddressBindDialog';
import MainWalletConnectDialog from '@/components/ui/dialog/wallet-connect/MainWalletConnectDialog';
import UnbindWalletDialog from '@/components/ui/dialog/wallet-connect/UnbindWalletDialog';
import BurnDragonBallDialog from './BurnDragonBallDialog';
import LBPRewardDialog from './LBPRewardDialog';
import RewardDetailDialog from './RewardDetailDialog';
import FirstStakeGuideDialog from './stake/FirstStakeGuideDialog';
import StakeAndRedeemDialog from './stake/StakeAndRedeemDialog';
import StakeHistoryDialog from './stake/StakeHistoryDialog';
import WithdrawDialog from './WithdrawDialog';

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
      {/* <InviteConfirmDialog /> */}
    </ClientOnly>
  );
}
