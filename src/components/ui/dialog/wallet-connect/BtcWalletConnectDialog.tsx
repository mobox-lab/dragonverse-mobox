import { useEffect, useMemo, useState } from 'react';
import { useAtom } from 'jotai';
import Dialog from '@/components/ui/dialog';
import { btcWalletConnectDialogAtom } from '@/atoms';
import { useMutationBindAddress } from '@/hooks/bound';
import ConnectButton from '@/components/ui/button/ConnectButton';
import { useMainAccount, useMainSignMessage } from '@/hooks/wallet';
import { useBTCProvider, useConnectModal, useConnector } from '@particle-network/btc-connectkit';

export default function BtcWalletConnectDialog() {
  const { disconnect } = useConnectModal();
  const { majorAddress } = useMainAccount();
  const { mutate } = useMutationBindAddress();
  const { signMessage } = useMainSignMessage();
  const { connectors, connect } = useConnector();
  const { accounts, getPublicKey } = useBTCProvider();
  const [isConnect, setIsConnect] = useState<number>(0);
  const account = useMemo(() => accounts[0], [accounts]);
  const [isOpen, setIsOpen] = useAtom(btcWalletConnectDialogAtom);

  const onConnect = async (id: string) => {
    try {
      await connect(id);
      setIsConnect((c) => c + 1);
    } catch (error) {
      disconnect();
    }
  };

  const onBindAddress = async (address: string) => {
    try {
      const publicKey = await getPublicKey();
      const signature = await signMessage({ message: `bind address ${majorAddress}` });
      mutate({ buffAddress: address, signature, publicKey });
      setIsOpen(false);
      setIsConnect(0);
    } catch (error) {
      disconnect();
    }
  };

  useEffect(() => {
    if (!isConnect || !account) return;
    onBindAddress(account).then();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [account, isConnect]);

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
            {connectors.map((connector) => (
              <ConnectButton key={connector.metadata.id} onClick={() => onConnect(connector.metadata.id)}>
                <img className="h-7.5 w-7.5" src={connector.metadata.icon} alt="icon" />
                {connector.metadata.name}
              </ConnectButton>
            ))}
          </div>
        </div>
      )}
    />
  );
}
