'use client';

import { useAtom } from 'jotai';
import { useConnect } from 'wagmi';
import Dialog from '@/components/ui/dialog/index';
import { mainWalletConnectDialogAtom } from '@/atoms';
import ConnectButton from '@/components/ui/button/ConnectButton';
import { useConnector, useConnectModal } from '@particle-network/btc-connectkit';

export default function MainWalletConnectDialog() {
  const [isOpen, setIsOpen] = useAtom(mainWalletConnectDialogAtom);
  const { connectors, connect } = useConnector();
  const { connectors: evmConnectors, connect: evmConnect } = useConnect();
  const { disconnect } = useConnectModal();

  const onConnectClick = () => {};

  return (
    <Dialog
      open={isOpen}
      className="w-[32vw] md:h-auto md:max-h-[80%] md:w-[300px] xl:w-[400px]"
      onOpenChange={(value) => setIsOpen(value)}
      render={() => (
        <div>
          <div onClick={() => disconnect()}>disconnect</div>
          <h2 className="text-xl">BTC wallet</h2>
          <div className="mt-4 grid gap-2">
            <ConnectButton onClick={() => connect(connectors[0].metadata.id)}>
              <img className="h-7.5 w-7.5" src={connectors[0].metadata.icon} alt="icon" />
              {connectors[0].metadata.name}
            </ConnectButton>
            <ConnectButton onClick={() => connect(connectors[1].metadata.id)}>
              <img className="h-7.5 w-7.5" src={connectors[1].metadata.icon} alt="icon" />
              {connectors[1].metadata.name}
            </ConnectButton>
            <ConnectButton onClick={() => connect(connectors[2].metadata.id)}>
              <img className="h-7.5 w-7.5" src={connectors[2].metadata.icon} alt="icon" />
              {connectors[2].metadata.name}
            </ConnectButton>
          </div>
          <h2 className="mt-4 text-xl">EVM wallet</h2>
          <div className="mt-4 grid gap-2">
            <ConnectButton onClick={() => evmConnect({ connector: evmConnectors[0] })}>
              <img className="h-7.5 w-7.5" src="/svg/metamask.svg" alt="icon" />
              {evmConnectors[0].name}
            </ConnectButton>
            <ConnectButton onClick={() => evmConnect({ connector: evmConnectors[1] })}>
              <img className="h-7.5 w-7.5" src="/img/token-pocket.png" alt="icon" />
              {evmConnectors[1].name}
            </ConnectButton>
            <ConnectButton onClick={() => evmConnect({ connector: evmConnectors[2] })}>
              <img className="h-7.5 w-7.5" src="/svg/walletconnect.svg" alt="icon" />
              {evmConnectors[2].name}
            </ConnectButton>
          </div>
        </div>
      )}
    />
  );
}
