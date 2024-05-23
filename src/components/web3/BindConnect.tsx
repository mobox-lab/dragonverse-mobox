'use client';

import { useSetAtom } from 'jotai/index';
import Button from '@/components/ui/button';
import { mainWalletConnectDialogAtom } from '@/atoms';
import { useIsMainConnected, useMainAccount, useMainChain } from '@/hooks/wallet';
import BindEvmWallet from '@/components/web3/BindEvmWallet';
import BindBtcWallet from '@/components/web3/BindBtcWallet';
import { useFetchBuffAddress } from '@/hooks/events/useBuffAddress';
import ReactGA from 'react-ga4';

export default function BindConnect() {
  const isMainConnected = useIsMainConnected();
  const setWalletConnect = useSetAtom(mainWalletConnectDialogAtom);
  const { isSupportedChain, switchMainChain } = useMainChain();
  const { majorAddress } = useMainAccount();
  const { data } = useFetchBuffAddress({ address: majorAddress });

  if (isMainConnected) {
    if (!isSupportedChain) {
      return (
        <Button
          type="pattern"
          className="h-[4.96vw] w-[16vw] border text-[1.28vw]/[1.92vw] font-semibold xl:h-[62px] xl:w-[200px] xl:text-base/6"
          onClick={() => {
            ReactGA.event({ category: 'merlin', action: 'wrong_network' });
            switchMainChain();
          }}
        >
          Wrong Network
        </Button>
      );
    }
    return (
      <div className="flex w-full max-w-[540px] items-center justify-center gap-4 font-semibold">
        <BindEvmWallet />
        {data?.buffAAAddress && (
          <div className="w-7.5">
            <img src="/svg/bind.svg" alt="bind" className="w-full" />
          </div>
        )}
        <BindBtcWallet />
      </div>
    );
  }

  return (
    <Button
      type="pattern"
      className="h-[4.96vw] w-[16vw] border text-[1.28vw]/[1.92vw] font-semibold xl:h-12 xl:w-[200px] xl:text-sm/3.5"
      onClick={() => setWalletConnect(true)}
    >
      CONNECT
    </Button>
  );
}
