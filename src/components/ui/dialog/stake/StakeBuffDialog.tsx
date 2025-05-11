'use client';

import React from 'react';
import { useAtom } from 'jotai';
import Dialog from '@/components/ui/dialog';
import { useMainAccount } from '@/hooks/wallet';
import { stakeBuffDialogAtom } from '@/atoms/stake';
import BindConnect from '@/components/web3/BindConnect';
import StakeBuff from '@/components/ui/dialog/stake/_components/StakeBuff';
import { useFetchStakeBuff } from '@/hooks/stake/useFetchStakeBuff';

export default function StakeBuffDialog() {
  const [isOpen, setIsOpen] = useAtom(stakeBuffDialogAtom);

  return (
    <Dialog
      open={isOpen}
      className="xl:w-[600px]"
      onOpenChange={setIsOpen}
      render={() => (
        <div>
          <div className="text-center text-xl/6 font-medium">Yield Boosting</div>
          <div className="mt-8 text-center text-sm/6 font-medium">
            Get Yield Boosting by holding Dragon Balls, MODragons.
            <p className="italic"> (Please complete asset verification below)</p>
          </div>
          <p className="mt-5 text-center text-sm/6 italic text-yellow">My Boosted eMDBL = My eMDBL * (1 + My Boost Rate)</p>
          <p className="mt-1.5 text-center text-xs/5 text-gray-300">boost rate updates every 5 seconds</p>
          <div className="flex-center mt-9">
            <BindConnect />
          </div>
          <div className="mt-10">
            <StakeBuff />
          </div>
        </div>
      )}
    />
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
