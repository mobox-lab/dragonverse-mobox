import { useEffect, useMemo, useState } from 'react';
import { useAtom, useSetAtom } from 'jotai';
import Dialog from '@/components/ui/dialog';
import { useMainAccount } from '@/hooks/wallet';
import { useMutationBindAddress } from '@/hooks/bound';
import ConnectButton from '@/components/ui/button/ConnectButton';
import { useMutationEvmAddress } from '@/hooks/events/useBuffAddress';
import { useBTCProvider, useConnectModal, useConnector, useETHProvider } from '@particle-network/btc-connectkit';
import { bindWalletDataAtom, btcWalletConnectDialogAtom, isExistedAddressDialogAtom } from '@/atoms';

export default function BtcWalletConnectDialog() {
  const { disconnect } = useConnectModal();
  const { majorAddress } = useMainAccount();
  const { mutate } = useMutationBindAddress();
  const { mutateAsync } = useMutationEvmAddress();
  const { connectors, connect } = useConnector();
  const { accounts, getPublicKey, signMessage } = useBTCProvider();
  const { evmAccount } = useETHProvider();
  const [isConnect, setIsConnect] = useState<number>(0);
  const account = useMemo(() => accounts[0], [accounts]);
  const setBindWalletData = useSetAtom(bindWalletDataAtom);
  const [isOpen, setIsOpen] = useAtom(btcWalletConnectDialogAtom);
  const setIsExistedDialog = useSetAtom(isExistedAddressDialogAtom);

  const onConnect = async (id: string) => {
    try {
      await connect(id);
      setIsConnect((c) => c + 1);
    } catch (error) {
      disconnect();
    }
  };

  const onBindAddress = async (address: string, aaAddress: string) => {
    try {
      const data = await mutateAsync({ address });
      const publicKey = await getPublicKey();
      const signature = await signMessage(`bind address ${majorAddress}`);
      const bindParams = { buffAddress: address, signature, publicKey };
      const existedAddress = data.data.address;
      if (existedAddress) {
        setBindWalletData({ existedAddress, aaAddress, ...bindParams });
        setIsExistedDialog(true);
      } else {
        mutate(bindParams);
      }
      setIsOpen(false);
      setIsConnect(0);
      disconnect();
    } catch (error) {
      disconnect();
    }
  };

  useEffect(() => {
    if (!isConnect || !account || !evmAccount) return;
    onBindAddress(account, evmAccount).then();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [account, isConnect, evmAccount]);

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
