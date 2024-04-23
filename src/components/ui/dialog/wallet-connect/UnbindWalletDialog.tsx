import React from 'react';
import { useAtom } from 'jotai';
import { shortenAddress } from '@/utils';
import Dialog from '@/components/ui/dialog';
import Button from '@/components/ui/button';
import { useMainAccount } from '@/hooks/wallet';
import { isUnbindWalletDialogAtom } from '@/atoms';
import PatternWithoutLine from '@/components/pattern/PatternWithoutLine';
import { useFetchBuffAddress, useMutationUnbindAddress } from '@/hooks/events/useBuffAddress';

export default function UnbindWalletDialog() {
  const [isOpen, setIsOpen] = useAtom(isUnbindWalletDialogAtom);
  const { majorAddress } = useMainAccount();
  const { mutate } = useMutationUnbindAddress();
  const { data } = useFetchBuffAddress({ address: majorAddress });

  const onBindClick = () => {
    mutate();
    setIsOpen(false);
  };

  return (
    <Dialog
      open={isOpen}
      onOpenChange={setIsOpen}
      className="w-[37.12vw] xl:w-[464px]"
      render={() => (
        <div>
          <h3 className="text-center text-[1.6vw]/[1.92vw] font-medium xl:text-xl/6">Unbind BTC Address</h3>
          <div className="mt-[2.56vw] text-[1.12vw]/[1.92vw] xl:mt-8 xl:text-sm/6">
            Confirm that you are unbinding the following BTC address from your current EVM address.
          </div>
          <div className="mt-[0.96vw] text-[1.12vw]/[1.92vw] xl:mt-3 xl:text-sm/6">
            Please note that unbinding BTC wallet might affect your Boost Rate.
          </div>
          <div className="mt-[1.92vw] grid place-items-center gap-[1.28vw] xl:mt-6 xl:gap-4">
            <div className="flex-center relative h-[3.84vw] w-full max-w-[230px] gap-[0.48vw] border border-gray-600 bg-gray-750 text-[1.12vw]/[1.6vw] font-medium xl:h-12 xl:gap-1.5 xl:text-sm">
              <PatternWithoutLine />
              <div className="h-[1.92vw] w-[1.92vw] rounded-full border bg-white xl:h-6 xl:w-6">
                <img src="/img/merlin-chain.png" className="h-full w-full" alt="merlin" />
              </div>
              {shortenAddress(majorAddress)}
            </div>
            <img className="w-[3.2vw] xl:w-10" src="/svg/unbind.svg" alt="bind" />
            <div className="flex-center relative h-[3.84vw] w-full max-w-[18.4vw] gap-1.5 border border-gray-600 bg-gray-750 text-[0.96vw]/[1.28vw] font-medium xl:h-12 xl:max-w-[230px] xl:text-xs">
              <PatternWithoutLine />
              <div className="h-[1.92vw] w-[1.92vw] rounded-full border bg-white xl:h-6 xl:w-6">
                <img src="/img/btc.webp" className="h-full w-full" alt="merlin" />
              </div>
              {shortenAddress(data?.buffAddress)}({shortenAddress(data?.buffAAAddress)})
            </div>
          </div>
          <div className="px-[0.64vw] xl:px-2">
            <Button onClick={onBindClick} type="yellow-dark" className="mt-[3.84vw] h-[3.52vw] w-full xl:mt-12 xl:h-11">
              Confirm Unbind
            </Button>
          </div>
        </div>
      )}
    />
  );
}
