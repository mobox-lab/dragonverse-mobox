'use client';

import React from 'react';
import { useAtom } from 'jotai';
import { shortenAddress } from '@/utils';
import Dialog from '@/components/ui/dialog';
import { useMainAccount } from '@/hooks/wallet';
import { stakeBuffDialogAtom } from '@/atoms/stake';
import PatternWithoutLine from '@/components/pattern/PatternWithoutLine';
import StakeBuff from '@/components/ui/dialog/stake/_components/StakeBuff';
import BtcConnectBtn from '@/components/ui/dialog/stake/_components/BtcConnectBtn';

export default function StakeBuffDialog() {
  const [isOpen, setIsOpen] = useAtom(stakeBuffDialogAtom);
  const { majorAddress } = useMainAccount();

  return (
    <Dialog
      open={isOpen}
      className="xl:w-[600px]"
      onOpenChange={setIsOpen}
      render={() => (
        <div>
          <div className="text-center text-xl/6 font-medium">Stake Buff</div>
          <div className="mt-8 text-center text-sm/6 font-medium">
            Connect wallet and verify assets to obtain $eMDBL boost buff. We currently support providing boosts from Dragon
            Balls and MODragons.
          </div>
          <p className="mt-5 text-center text-sm/6 italic text-yellow">Total $eMDBL = $eMDBL * (1 + Buff)</p>
          <p className="mt-1.5 text-center text-xs/5 text-gray-300">
            Buff will update every 5 seconds based on your assets of address
          </p>
          <div className="mt-9 flex items-center justify-between gap-3.5">
            <div className="flex-center relative h-12 flex-1 gap-1.5 border border-green/50 bg-green/10 text-xs font-medium">
              <div className="h-[1.92vw] w-[1.92vw] rounded-full border bg-white xl:h-6 xl:w-6">
                <img src="/img/merlin-chain.png" className="h-full w-full" alt="merlin" />
              </div>
              <p className="text-[1.12vw]/[1.12vw] xl:text-sm/3.5">{shortenAddress(majorAddress)}</p>
              <PatternWithoutLine className="stroke-green" />
            </div>
            <BtcConnectBtn />
          </div>
          <div className="mt-10">
            <StakeBuff />
          </div>
        </div>
      )}
    />
  );
}
