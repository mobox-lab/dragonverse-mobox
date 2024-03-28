'use client';

import { useAtom } from 'jotai';
import ReactGA from 'react-ga4';
import { useConnect } from 'wagmi';
import Dialog from '@/components/ui/dialog/index';
import { useConnectEvmWallet } from '@/hooks/wallet';
import ConnectButton from '@/components/ui/button/ConnectButton';
import { mainWalletConnectDialogAtom, termOfUseAcceptedAtom } from '@/atoms';

export default function MainWalletConnectDialog() {
  const [isOpen, setIsOpen] = useAtom(mainWalletConnectDialogAtom);
  const { connectors: evmConnectors } = useConnect();
  const { onEvmConnect } = useConnectEvmWallet();
  const [isAccepted, setIsAccepted] = useAtom(termOfUseAcceptedAtom);

  return (
    <Dialog
      open={isOpen}
      className="w-[32vw] md:w-[300px] xl:w-[420px]"
      onOpenChange={(value) => setIsOpen(value)}
      render={() => (
        <div>
          <div className="text-center text-xl/6 font-medium">Connect Wallet</div>
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
          <div className="mt-6 flex items-start gap-1.5 border border-legendary/60 px-2 py-3 text-xs/5 md:mt-3 md:px-1 md:py-1.5">
            <img className="w-4" src="/svg/warning.svg" alt="warning" />
            <p>
              Here is the tutorial on how to obtain gas (BTC) and M-BTC on Merlin Chain, as well as how to transfer from AA
              (Particle) wallet to EVM wallet -&gt;&nbsp;
              <a
                className="text-link"
                href="https://medium.com/@mbox/obtain-m-btc-on-merlin-chain-a-step-by-step-tutorial-8cc23ac4f546"
                target="_blank"
              >
                Tutorial
              </a>
            </p>
          </div>
          <div className="flex-center mt-6 text-xs/5 md:mt-3">
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
