import React from 'react';
import { useSetAtom } from 'jotai/index';
import { btcWalletConnectDialogAtom } from '@/atoms';
import PatternWithoutLine from '@/components/pattern/PatternWithoutLine';
import ReactGA from 'react-ga4';

export default function BindBtcConnect() {
  const setIsOpen = useSetAtom(btcWalletConnectDialogAtom);

  return (
    <div
      onClick={() => {
        ReactGA.event({ category: 'merlin', action: 'bind_wallet' });
        setIsOpen(true);
      }}
      className="flex-center h-12 max-w-[238px] flex-1 cursor-pointer border border-gray-600 bg-black/60 text-xs font-medium backdrop-blur-sm"
    >
      <PatternWithoutLine />
      Click to connect BTC(AA) wallet
    </div>
  );
}
