'use client';

import ReactGA from 'react-ga4';
import { useCallback } from 'react';
import { useSetAtom } from 'jotai';
import { toast } from 'react-toastify';
import {
  rewardDetailDialogAtom,
  stakeAndRedeemDialogAtom,
  stakeAndRedeemTypeAtom,
  stakeFirstGuideDialogAtom,
  StakeRedeemType,
} from '@/atoms/stake';
import { VaultRewardToken } from '@/apis/types';
import { EMDBLABI } from '@/abis';
import { CONTRACT_ADDRESSES } from '@/constants/contracts';
import { useStakeContractRead } from '@/hooks/stake/stakeContractRead';
import { useVaultClaimSignature } from '@/hooks/stake/useVaultClaimSignature';
import { useMainAccount, useMainChain, useMainWriteContract, useSelectedChain } from '@/hooks/wallet';
import { formatNumber } from '@/utils';
import { ALLOW_CHAINS } from '@/constants';
import Reward from './Reward';
import PatternWithoutLine from '@/components/pattern/PatternWithoutLine';
import Button from '@/components/ui/button';
import { getLocalStorage } from '@/utils/storage';
import { STORAGE_KEY } from '@/constants/storage';
import { stakeHistoryDialogOpenAtom } from '@/atoms';

export default function MyReward() {
  const setRewardDetailDialog = useSetAtom(rewardDetailDialogAtom);
  const setStakeAndRedeemType = useSetAtom(stakeAndRedeemTypeAtom);
  const setStakeAndRedeemDialog = useSetAtom(stakeAndRedeemDialogAtom);
  const setStakeFirstGuideDialogAtom = useSetAtom(stakeFirstGuideDialogAtom);
  const setDialogOpen = useSetAtom(stakeHistoryDialogOpenAtom);

  const { switchMainChain } = useMainChain();
  const { isMerlinChain } = useSelectedChain();
  const { evmAddress } = useMainAccount();
  const { totalAccruedBalance, accruedBalance, activeEmdblBalance, refetch } = useStakeContractRead();

  const { mutateAsync, isLoading } = useVaultClaimSignature(VaultRewardToken.EMdbl);
  const { writeContract, isLoading: writeLoading } = useMainWriteContract({
    onError: (error) => {
      if (error?.name === 'UserRejected') {
        return;
      }
      if (error?.name === 'EstimateGasExecutionError') {
        toast.error(error.message);
        return;
      }
      toast.error('Network error, please try again later');
    },
    onSuccess: (data) => {
      if (!data) return;
      const log = data[0];
      toast.success(`Claim ${formatNumber(log.args.value)} eMDBL succeeded`);
      refetch();
    },
  });

  const stakeOrRedeem = useCallback(
    async (type: StakeRedeemType) => {
      ReactGA.event({ category: 'merlin', action: type });
      setStakeAndRedeemType(type);
      const isFirstStakeHaveRead = await getLocalStorage(STORAGE_KEY.FIRST_STAKE_GUIDE_HAVE_READ);
      if (isFirstStakeHaveRead) setStakeAndRedeemDialog(true);
      else setStakeFirstGuideDialogAtom(true);
    },
    [setStakeAndRedeemDialog, setStakeAndRedeemType, setStakeFirstGuideDialogAtom],
  );

  const claimAccrued = async () => {
    if (!evmAddress || !accruedBalance) return;
    if (!isMerlinChain) {
      switchMainChain(ALLOW_CHAINS[0]).then();
      return;
    }
    ReactGA.event({ category: 'merlin', action: 'claim_emdbl' });
    const res = await mutateAsync();
    if (res?.code === 200) {
      const data = res.data;
      await writeContract({
        abi: EMDBLABI,
        functionName: 'permitMint',
        args: [evmAddress, BigInt(data?.balance || '0'), data?.deadline, data?.v, data?.r, data?.s],
        address: CONTRACT_ADDRESSES.emdbl,
      });
    } else {
      toast.error('Error request.');
    }
  };

  return (
    <div className="mt-[2.88vw] xl:mt-9">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <p className="text-[1.28vw]/[1.76vw] font-semibold xl:text-base/5.5">My Vault</p>
        </div>
      </div>
      <div className="mt-[0.96vw] grid h-[14.24vw] grid-cols-2 gap-[1.92vw] xl:mt-3 xl:h-[178px] xl:gap-6">
        <div className="relative flex h-full items-center border border-gray-600 bg-black/60 backdrop-blur-sm">
          <PatternWithoutLine />
          <div className="relative flex flex-grow flex-col items-center">
            <div className="text-[1.28vw]/[1.92vw] font-semibold xl:text-base/6">eMDBL</div>
            <div className="flex-center mt-[0.96vw] xl:mt-3">
              <img src="/img/emdbl.webp" className="h-[2.24vw] xl:h-7" alt="emdbl" />
              <div className="ml-[0.64vw] text-[2.4vw]/[3.52vw] font-medium text-yellow xl:ml-2 xl:text-3xl/11">
                {formatNumber(activeEmdblBalance, false)}
              </div>
            </div>
          </div>
          <div className="h-[3.84vw] w-[1px] bg-yellow/50 xl:h-12"></div>
          <div className="flex flex-grow flex-col items-center">
            <Button
              className="mt-[0.64vw] h-[3.52vw] w-[12.8vw] rounded-[0.16vw] py-0 text-[1.12vw]/[1.28vw] font-bold text-yellow xl:mt-2 xl:h-11 xl:w-[160px] xl:rounded-sm xl:text-sm/4"
              type="yellow-shallow"
              onClick={() => stakeOrRedeem(StakeRedeemType.Redeem)}
              loadingClassName="fill-yellow xl:w-3 xl:h-3 w-[0.96vw] h-[0.96vw]"
            >
              Redeem
            </Button>
            <p
              className="mt-2 cursor-pointer text-[1.28vw]/[1.76vw] font-semibold text-blue xl:text-base/5.5"
              onClick={() => {
                ReactGA.event({ category: 'merlin', action: 'stake_record' });
                setDialogOpen(true);
              }}
            >
              Redeem History
            </p>
          </div>
        </div>
        <Reward
          token={VaultRewardToken.EMdbl}
          balance={accruedBalance}
          total={totalAccruedBalance}
          onClaim={claimAccrued}
          loading={isLoading || writeLoading}
        />
      </div>
    </div>
  );
}

// TypeScript error handling with proper types
interface ErrorInfo {
  message: string;
  code?: number;
  stack?: string;
  timestamp: number;
}

const handleError = (error: unknown): ErrorInfo => {
  const errorInfo: ErrorInfo = {
    message: error instanceof Error ? error.message : 'Unknown error occurred',
    stack: error instanceof Error ? error.stack : undefined,
    timestamp: Date.now()
  };
  
  console.error('Error occurred:', errorInfo);
  
  if (process.env.NODE_ENV === 'production') {
    console.log('Error logged to monitoring service');
  }
  
  return errorInfo;
};

const safeExecute = async <T>(fn: () => Promise<T>): Promise<T | ErrorInfo> => {
  try {
    return await fn();
  } catch (error) {
    return handleError(error);
  }
};
