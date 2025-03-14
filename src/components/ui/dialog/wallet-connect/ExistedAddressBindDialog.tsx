import React from 'react';
import { shortenAddress } from '@/utils';
import Dialog from '@/components/ui/dialog';
import { useAtom, useAtomValue } from 'jotai';
import Button from '@/components/ui/button';
import { useMainAccount } from '@/hooks/wallet';
import { useMutationBindAddress } from '@/hooks/bound';
import { bindWalletDataAtom, isExistedAddressDialogAtom } from '@/atoms';
import PatternWithoutLine from '@/components/pattern/PatternWithoutLine';
import { CHAIN_CONFIG } from '@/constants/chain';
import { useAccount } from 'wagmi';

export default function ExistedAddressBindDialog() {
  const [isOpen, setIsOpen] = useAtom(isExistedAddressDialogAtom);
  const data = useAtomValue(bindWalletDataAtom);
  const { majorAddress } = useMainAccount();
  const { chainId } = useAccount();
  const { mutate } = useMutationBindAddress();

  const onBindClick = () => {
    if (!data) return;
    const { buffAddress, signature, publicKey } = data;
    mutate({ buffAddress, signature, publicKey });
    setIsOpen(false);
  };

  return (
    <Dialog
      open={isOpen}
      onOpenChange={setIsOpen}
      className="w-[37.12vw] xl:w-[464px]"
      render={() => (
        <div>
          <h3 className="text-center text-[1.6vw]/[1.92vw] font-medium xl:text-xl/6">Bind BTC Address</h3>
          <div className="mt-[2.56vw] text-[1.12vw]/[1.92vw] xl:mt-8 xl:text-sm/6">
            The following BTC address has been binded with another EVM address:&nbsp;
            <span className="font-medium text-blue">{shortenAddress(data?.existedAddress)}</span>
          </div>
          <div className="mt-[0.96vw] text-[1.12vw]/[1.92vw] xl:mt-3 xl:text-sm/6">
            Click bind to verify and update your address linkage.
          </div>
          <div className="mt-[1.92vw] grid place-items-center gap-[0.32vw] xl:mt-6 xl:gap-4">
            <div className="flex-center relative h-[3.84vw] w-full max-w-[18.4vw] gap-[0.48vw] border border-gray-600 bg-gray-750 text-sm font-medium  xl:h-12 xl:max-w-[230px] xl:gap-1.5">
              <PatternWithoutLine />
              <div className="h-[1.92vw] w-[1.92vw] rounded-full border bg-white xl:h-6 xl:w-6">
                <img src={chainId ? CHAIN_CONFIG[chainId].icon : ''} className="h-full w-full" alt="merlin" />
              </div>
              {shortenAddress(majorAddress)}
            </div>
            <img className="w-[3.2vw] xl:w-10" src="/svg/bind.svg" alt="bind" />
            <div className="flex-center relative h-[3.84vw] w-full max-w-[18.4vw] gap-[0.48vw] border border-gray-600 bg-gray-750 text-[0.96vw]/[1.28vw] font-medium xl:h-12 xl:max-w-[230px] xl:gap-1.5 xl:text-xs">
              <PatternWithoutLine />
              <div className="h-[1.92vw] w-[1.92vw] rounded-full border bg-white xl:h-6 xl:w-6">
                <img src="/img/btc.webp" className="h-full w-full" alt="merlin" />
              </div>
              {shortenAddress(data?.buffAddress)}({shortenAddress(data?.aaAddress)})
            </div>
          </div>
          <div className="px-[0.64vw] xl:px-2">
            <Button onClick={onBindClick} type="yellow-dark" className="mt-[3.84vw] h-[3.52vw] w-full xl:mt-12 xl:h-11">
              Bind
            </Button>
          </div>
        </div>
      )}
    />
  );
}
