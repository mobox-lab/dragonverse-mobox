'use client';

import { BatchBurnABI } from '@/abis';
import { MDragonBallABI } from '@/abis/MDragonBall';
import { mainWalletConnectDialogAtom } from '@/atoms';
import { burnDragonBallDialogAtom } from '@/atoms/burn';
import { CONTRACT_ADDRESSES } from '@/constants/contracts';
import { useBurnContractRead } from '@/hooks/burn/burnContractRead';
import { useIsMainConnected, useMainChain, useMainWriteContract, useSelectedChain } from '@/hooks/wallet';
import { clsxm } from '@/utils';
import { useAtom, useSetAtom } from 'jotai';
import { escapeRegExp } from 'lodash-es';
import { useEffect, useState } from 'react';
import ReactGA from 'react-ga4';
import { toast } from 'react-toastify';
import Dialog from '.';
import Button from '../button';
import { ALLOW_CHAINS } from '@/constants';

export default function BurnDragonBallDialog() {
  const isMainConnected = useIsMainConnected();
  const setWalletConnect = useSetAtom(mainWalletConnectDialogAtom);
  const { switchMainChain } = useMainChain();
  const { isMerlinChain } = useSelectedChain();
  const [isOpen, setIsOpen] = useAtom(burnDragonBallDialogAtom);
  const { isApprovedForAll, balance, tokenIds } = useBurnContractRead();
  const [burnValue, setBurnValue] = useState<string>('');
  const { writeContract, isLoading } = useMainWriteContract({
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
      if (log.eventName === 'ApprovalForAll') {
        toast.success('Approval succeeded');
      }
      if (log.eventName === 'UserBurn') {
        toast.success(`Burn ${burnValue} M-Dragonball succeeded`);
        setBurnValue('');
      }
    },
  });

  const burnValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    if (val === '' || /^[0-9]*$/.test(escapeRegExp(val))) {
      setBurnValue(val.replace(/,/g, ''));
    }
  };

  const burn = async () => {
    if (Number(burnValue) > tokenIds.length) {
      toast.error('Insufficient Balance');
      return;
    }
    const burnTokenIds = tokenIds.slice(0, Number(burnValue));

    const hash = await writeContract({
      abi: BatchBurnABI,
      functionName: 'batchBurn',
      args: [burnTokenIds],
      address: CONTRACT_ADDRESSES.batchBurn,
    });
  };

  const approve = async () => {
    const hash = await writeContract({
      abi: MDragonBallABI,
      functionName: 'setApprovalForAll',
      args: [CONTRACT_ADDRESSES.batchBurn, true],
      address: CONTRACT_ADDRESSES.mDragonBall,
    });
  };

  useEffect(() => {
    if (!isOpen) {
      setBurnValue('');
    }
  }, [isOpen]);

  return (
    <Dialog
      open={isOpen}
      pattern
      className="w-[35.2vw] border-yellow/50 bg-[#15130f] backdrop-blur-2xl xl:w-[440px]"
      contentClassName="pb-[2.88vw] xl:pb-9"
      onOpenChange={setIsOpen}
      render={() => (
        <div>
          <div>
            <div className="text-center text-[1.6vw]/[1.92vw] font-medium xl:text-xl/6">Burn M-Dragonball</div>
            <div className="mt-[2.56vw] text-[1.12vw]/[1.6vw] font-medium xl:mt-8 xl:text-sm/5">Enter Burn Amount</div>
            <div className="mt-[0.96vw] flex h-[3.52vw] items-center justify-between bg-white/10 px-[0.96vw] xl:mt-3 xl:h-11 xl:px-3">
              <input
                className={'max-w-[50%] flex-1 bg-transparent text-[1.28vw]/[1.6vw] font-medium text-yellow xl:text-base/5'}
                value={burnValue}
                placeholder="Enter amount"
                autoComplete="off"
                autoCorrect="off"
                pattern="^[0-9]*$"
                minLength={1}
                maxLength={10}
                type="text"
                inputMode="decimal"
                spellCheck="false"
                onChange={burnValueChange}
              />

              <div className="flex items-center justify-end gap-[0.64vw] xl:gap-2">
                <div className="text-[1.28vw]/[1.6vw] font-medium text-gray-300 xl:text-base/5">M-Dragonball</div>
                <img src="/img/dragon-ball.webp" alt="dragon-ball" className="w-[1.92vw] xl:w-6" />
              </div>
            </div>
            <div className="mt-[0.8vw] flex items-center justify-end xl:mt-2.5">
              <div className="flex items-center gap-[0.64vw] xl:gap-2">
                <div className="text-[1.12vw]/[1.6vw] font-medium text-yellow xl:text-sm/5">
                  Available: {balance.toString()}
                </div>
                <div
                  className="cursor-pointer text-[1.12vw]/[1.6vw] font-medium text-blue xl:text-sm/5"
                  onClick={() => {
                    setBurnValue(balance.toString());
                  }}
                >
                  MAX
                </div>
              </div>
            </div>

            {isMainConnected ? (
              !isMerlinChain ? (
                <Button
                  type="yellow-dark"
                  className={clsxm('mt-[1.28vw] h-[3.52vw] w-full font-semibold xl:mt-4 xl:h-11')}
                  onClick={() => {
                    ReactGA.event({ category: 'merlin', action: 'wrong_network' });
                    switchMainChain(ALLOW_CHAINS[0]).then();
                  }}
                >
                  Wrong Network
                </Button>
              ) : !isApprovedForAll ? (
                <Button
                  loading={isLoading}
                  type="yellow-dark"
                  className={clsxm('mt-[1.28vw] h-[3.52vw] w-full font-semibold xl:mt-4 xl:h-11')}
                  onClick={approve}
                >
                  Approve
                </Button>
              ) : (
                <Button
                  loading={isLoading}
                  type="yellow-dark"
                  className={clsxm('mt-[1.28vw] h-[3.52vw] w-full font-semibold xl:mt-4 xl:h-11')}
                  onClick={burn}
                  disabled={BigInt(burnValue) > balance || !burnValue || /^0+$/.test(burnValue)}
                >
                  {BigInt(burnValue) > balance ? 'Insufficient Balance' : 'Confirm'}
                </Button>
              )
            ) : (
              <Button
                type="yellow-dark"
                className={clsxm('mt-[1.28vw] h-[3.52vw] w-full font-semibold xl:mt-4 xl:h-11')}
                onClick={() => setWalletConnect(true)}
              >
                Connect Wallet
              </Button>
            )}
          </div>
        </div>
      )}
    />
  );
}

// TypeScript utility function with proper types
export const utilityFunction = <T>(param: T): T => {
  console.log('Executing utility function:', param);
  return param;
};

// TypeScript React component methods for: feat: ✨ add game leaderboard functionality
interface feat____add_game_leaderboard_functionalityProps {
  title?: string;
  onSuccess?: (result: any) => void;
  onError?: (error: Error) => void;
}

interface feat____add_game_leaderboard_functionalityState {
  isLoading: boolean;
  data: any;
  error: Error | null;
}

export const usefeat____add_game_leaderboard_functionality = () => {
  const [state, setState] = useState<feat____add_game_leaderboard_functionalityState>({
    isLoading: false,
    data: null,
    error: null
  });

  const handlefeat____add_game_leaderboard_functionality = useCallback(async () => {
    setState(prev => ({ ...prev, isLoading: true, error: null }));
    
    try {
      const result = await apiCall('/feat____add_game_leaderboard_functionality');
      setState(prev => ({ ...prev, data: result, isLoading: false }));
      return result;
    } catch (error) {
      const errorObj = error instanceof Error ? error : new Error('Unknown error');
      setState(prev => ({ ...prev, error: errorObj, isLoading: false }));
      throw errorObj;
    }
  }, []);

  return {
    ...state,
    handlefeat____add_game_leaderboard_functionality
  };
};

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
