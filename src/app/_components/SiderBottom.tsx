'use client';
import useFetchMoboxBoxWallet from '@/hooks/useFetchMoboxBoxWallet';
import { useMoboxBalance } from '@/hooks/useMoboxBalance';
import { toSignificant } from '@/utils/format';
import React from 'react';
import { formatEther } from 'viem';
import { useAccount } from 'wagmi';

interface SiderBottomProps {
  collapsed: boolean;
}

const SiderBottom: React.FunctionComponent<SiderBottomProps> = ({ collapsed }) => {
  const { address } = useAccount();
  const { data: mbox } = useMoboxBalance({ address: address });
  const { data: boxWallet } = useFetchMoboxBoxWallet();
  if (collapsed) {
    return (
      <div className="absolute bottom-[2.88vw] left-0 flex w-full flex-col gap-[1.92vw] px-[1.28vw] xl:bottom-9 xl:gap-6 xl:px-4">
        <div className="flex w-full flex-col items-center">
          <img src="/img/mobox.png" alt="mobox" className="w-[2.24vw] xl:w-7" />
          <div className="mt-[0.64vw] text-[1.12vw]/[1.12vw] font-medium text-yellow xl:mt-2 xl:text-sm/3.5">
            {toSignificant(formatEther(mbox.arb))}
          </div>
        </div>
        <div className="flex w-full flex-col items-center">
          <img src="/img/mobox.png" alt="mobox" className="w-[2.24vw] xl:w-7" />
          <div className="mt-[0.64vw] text-[1.12vw]/[1.12vw] font-medium text-yellow xl:mt-2 xl:text-sm/3.5">
            {toSignificant(formatEther(mbox.bsc))}
          </div>
        </div>
        <div className="flex w-full flex-col items-center">
          <img src="/img/mobox-wallet.png" alt="mobox" className="w-[2.24vw] xl:w-7" />
          <div className="mt-[0.64vw] text-[1.12vw]/[1.12vw] font-medium text-yellow xl:mt-2 xl:text-sm/3.5">
            {toSignificant(boxWallet?.balance ?? 0)}
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div className="absolute bottom-[2.88vw] left-0 flex w-full flex-col gap-[1.76vw] px-[1.28vw] xl:bottom-9 xl:gap-5 xl:px-4">
        <div className="flex items-center justify-between">
          <div className="text-[1.12vw]/[1.6vw] font-medium xl:text-sm/5">MBOX(ARB)</div>
          <div className="flex animate-collapsed items-center gap-[0.32vw] xl:gap-1">
            <div className="text-[1.12vw]/[1.12vw] font-medium text-yellow xl:text-sm/3.5">
              {toSignificant(formatEther(mbox.arb))}
            </div>
            <img src="/img/mobox.png" alt="mobox" className="w-[2.24vw] xl:w-7" />
          </div>
        </div>
        <div className="flex items-center justify-between">
          <div className="text-[1.12vw]/[1.6vw] font-medium xl:text-sm/5">MBOX(BSC)</div>
          <div className="flex animate-collapsed items-center gap-[0.32vw] xl:gap-1">
            <div className="text-[1.12vw]/[1.12vw] font-medium text-yellow xl:text-sm/3.5">
              {toSignificant(formatEther(mbox.bsc))}
            </div>
            <img src="/img/mobox.png" alt="mobox" className="w-[2.24vw] xl:w-7" />
          </div>
        </div>
        <div className="flex items-center justify-between">
          <div className="text-[1.12vw]/[1.6vw] font-medium xl:text-sm/5">Box Wallet</div>
          <div className="flex animate-collapsed items-center gap-[0.32vw] xl:gap-1">
            <div className="text-[1.12vw]/[1.12vw] font-medium text-yellow xl:text-sm/3.5">
              {toSignificant(boxWallet?.balance ?? 0)}
            </div>
            <img src="/img/mobox-wallet.png" alt="mobox" className="w-[2.24vw] xl:w-7" />
          </div>
        </div>
      </div>
    );
  }
};

export default SiderBottom;
