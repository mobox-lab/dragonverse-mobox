'use client';

import { useAtom } from 'jotai';
import { useConnect } from 'wagmi';
import Dialog from '@/components/ui/dialog/index';
import { mainWalletConnectDialogAtom, termOfUseAcceptedAtom } from '@/atoms';
import ConnectButton from '@/components/ui/button/ConnectButton';
import { useConnector } from '@particle-network/btc-connectkit';
import { useConnectEvmWallet, useConnectBtcWallet } from '@/hooks/wallet';
import ReactGA from 'react-ga4';

export default function MainWalletConnectDialog() {
  const [isOpen, setIsOpen] = useAtom(mainWalletConnectDialogAtom);
  const { connectors: evmConnectors } = useConnect();
  const { connectors: btcConnectors } = useConnector();
  const { onEvmConnect } = useConnectEvmWallet();
  const { onBtcConnect } = useConnectBtcWallet();
  const [isAccepted, setIsAccepted] = useAtom(termOfUseAcceptedAtom);

  return (
    <Dialog
      open={isOpen}
      className="w-[32vw] md:w-[300px] xl:w-[420px]"
      onOpenChange={(value) => setIsOpen(value)}
      render={() => (
        <div>
          <div className="text-center text-xl/6 font-medium">Connect Wallet</div>
          <div className="mt-6 flex items-start gap-1.5 border border-legendary/60 px-2 py-3 text-xs/5 md:mt-3 md:px-1 md:py-1.5">
            <img className="w-4" src="/svg/warning.svg" alt="warning" />
            <p>It is recommended to use EVM Wallets (e.g. MetaMask) as BTC (AA) Wallet might cause unexpected errors.</p>
          </div>
          <h2 className="mt-6 border-b border-white/25 py-2 text-center text-sm/6 md:mt-3">EVM wallet</h2>
          <div className="mt-4 grid gap-2 md:mt-2 md:grid-cols-2">
            <ConnectButton onClick={() => onEvmConnect(evmConnectors[0])}>
              <img className="h-7.5 w-7.5" src="/svg/metamask.svg" alt="icon" />
              <span className="md:hidden">{evmConnectors[0].name}</span>
            </ConnectButton>
            <ConnectButton onClick={() => onEvmConnect(evmConnectors[1])}>
              <img className="h-7.5 w-7.5" src="/svg/okx.svg" alt="icon" />
              <span className="md:hidden">{evmConnectors[1].name}</span>
            </ConnectButton>
            <ConnectButton onClick={() => onEvmConnect(evmConnectors[2])}>
              <img className="h-7.5 w-7.5" src="/img/token-pocket.png" alt="icon" />
              <span className="md:hidden">{evmConnectors[2].name}</span>
            </ConnectButton>
            <ConnectButton onClick={() => onEvmConnect(evmConnectors[3])}>
              <img className="h-7.5 w-7.5" src="/svg/walletconnect.svg" alt="icon" />
              <span className="md:hidden">{evmConnectors[3].name}</span>
            </ConnectButton>
          </div>
          <h2 className="mt-6 border-b border-white/25 py-2 text-center text-sm/6 md:mt-3">BTC wallet</h2>
          <div className="mt-4 grid gap-2 md:mt-2 md:grid-cols-3">
            {btcConnectors.map((connector) => (
              <ConnectButton key={connector.metadata.id} onClick={() => onBtcConnect(connector.metadata.id)}>
                <img className="h-7.5 w-7.5" src={connector.metadata.icon} alt="icon" />
                <span className="md:hidden">{connector.metadata.name}</span>
              </ConnectButton>
            ))}
          </div>
          <div className="flex-center mt-3 text-xs/5">
            <input
              type="checkbox"
              id="terms-of-use"
              checked={isAccepted}
              className="size-5 border-white/10 bg-white/10"
              onChange={(event) => {
                ReactGA.event({ category: 'merlin', action: 'agree_tou', label: '' });
                setIsAccepted(event.target.checked);
              }}
            />
            <label htmlFor="terms-of-use">&nbsp;I have read and agree to the&nbsp;</label>
            <a className="text-link" href="./terms-of-use" target="_blank">
              Terms of Use
            </a>
          </div>
        </div>
      )}
    />
  );
}
