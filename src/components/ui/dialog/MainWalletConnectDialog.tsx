'use client';

import { useAtom } from 'jotai';
import { useConnect } from 'wagmi';
import Dialog from '@/components/ui/dialog/index';
import { mainWalletConnectDialogAtom } from '@/atoms';
import ConnectButton from '@/components/ui/button/ConnectButton';
import { useConnector } from '@particle-network/btc-connectkit';
import { useConnectEvmWallet } from '@/hooks/wallet/useConnectEvmWallet';
import { useConnectBtcWallet } from '@/hooks/wallet/useConnectBtcWallet';

export default function MainWalletConnectDialog() {
  const [isOpen, setIsOpen] = useAtom(mainWalletConnectDialogAtom);
  const { connectors: evmConnectors } = useConnect();
  const { connectors: btcConnectors } = useConnector();
  const { onEvmConnect } = useConnectEvmWallet();
  const { onBtcConnect } = useConnectBtcWallet();

  return (
    <Dialog
      open={isOpen}
      className="w-[32vw] md:h-auto md:max-h-[80%] md:w-[300px] xl:w-[400px]"
      onOpenChange={(value) => setIsOpen(value)}
      render={() => (
        <div>
          <div className="text-center text-xl/6 font-medium">Connect Wallet</div>
          <h2 className="mt-6 border-b border-white/25 py-2 text-center text-sm/6">BTC wallet</h2>
          <div className="mt-4 grid gap-2">
            {btcConnectors.map((connector) => (
              <ConnectButton key={connector.metadata.id} onClick={() => onBtcConnect(connector.metadata.id)}>
                <img className="h-7.5 w-7.5" src={connector.metadata.icon} alt="icon" />
                {connector.metadata.name}
              </ConnectButton>
            ))}
          </div>
          <p className="mt-3 text-center text-xs">Capable of linking to BTC assets (BRC20, BRC420, etc.)</p>
          <h2 className="mt-6 border-b border-white/25 py-2 text-center text-sm/6">EVM wallet</h2>
          <div className="mt-4 grid gap-2">
            <ConnectButton onClick={() => onEvmConnect(evmConnectors[0])}>
              <img className="h-7.5 w-7.5" src="/svg/metamask.svg" alt="icon" />
              {evmConnectors[0].name}
            </ConnectButton>
            <ConnectButton onClick={() => onEvmConnect(evmConnectors[1])}>
              <img className="h-7.5 w-7.5" src="/img/token-pocket.png" alt="icon" />
              {evmConnectors[1].name}
            </ConnectButton>
            <ConnectButton onClick={() => onEvmConnect(evmConnectors[2])}>
              <img className="h-7.5 w-7.5" src="/svg/walletconnect.svg" alt="icon" />
              {evmConnectors[2].name}
            </ConnectButton>
          </div>
        </div>
      )}
    />
  );
}
