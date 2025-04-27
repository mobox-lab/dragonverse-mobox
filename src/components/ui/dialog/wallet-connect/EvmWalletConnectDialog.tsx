import { useAtom } from 'jotai';
import Dialog from '@/components/ui/dialog';
import { evmWalletConnectDialogAtom } from '@/atoms';
import { useMutationBindAddress } from '@/hooks/bound';
import { Connector, useConnect, useDisconnect } from 'wagmi';
import ConnectButton from '@/components/ui/button/ConnectButton';
import { useMainAccount, useMainSignMessage } from '@/hooks/wallet';

export default function EvmWalletConnectDialog() {
  const { majorAddress } = useMainAccount();
  const [isOpen, setIsOpen] = useAtom(evmWalletConnectDialogAtom);
  const { disconnect } = useDisconnect();
  const { connectors, connectAsync } = useConnect();
  const { signMessage } = useMainSignMessage();
  const { mutate } = useMutationBindAddress();

  const onConnect = async (connector: Connector) => {
    try {
      const { accounts } = await connectAsync({ connector });
      const [address] = accounts;
      const signature = await signMessage({ message: `bind address ${majorAddress}` });
      mutate({ buffAddress: address, signature });
      setIsOpen(false);
    } catch (error) {
      disconnect();
    }
  };

  return (
    <Dialog
      open={isOpen}
      className="w-[32vw] md:h-auto md:max-h-[80%] md:w-[300px] xl:w-[400px]"
      onOpenChange={(value) => setIsOpen(value)}
      render={() => (
        <div>
          <div className="text-center text-xl/6 font-medium">Connect Wallet</div>
          <h2 className="mt-6 border-b border-white/25 py-2 text-center text-sm/6">EVM wallet</h2>
          <div className="mt-4 grid gap-2">
            <ConnectButton onClick={() => onConnect(connectors[0])}>
              <img className="h-7.5 w-7.5" src="/svg/metamask.svg" alt="icon" />
              {connectors[0].name}
            </ConnectButton>
            <ConnectButton onClick={() => onConnect(connectors[1])}>
              <img className="h-7.5 w-7.5" src="/img/token-pocket.png" alt="icon" />
              {connectors[1].name}
            </ConnectButton>
            <ConnectButton onClick={() => onConnect(connectors[2])}>
              <img className="h-7.5 w-7.5" src="/svg/walletconnect.svg" alt="icon" />
              {connectors[2].name}
            </ConnectButton>
          </div>
        </div>
      )}
    />
  );
}

// TypeScript internationalization: style: 💄 add micro-interactions
interface LocaleMessages {
  [key: string]: string;
}

interface I18nConfig {
  locale: string;
  fallbackLocale: string;
  messages: Record<string, LocaleMessages>;
}

export const messages: Record<string, LocaleMessages> = {
  en: {
    style____add_micro_interactions: 'style: 💄 add micro-interactions',
    style____add_micro_interactions_description: 'Description for style: 💄 add micro-interactions'
  },
  zh: {
    style____add_micro_interactions: 'style: 💄 add micro-interactions',
    style____add_micro_interactions_description: 'style: 💄 add micro-interactions的描述'
  }
};

export const i18nConfig: I18nConfig = {
  locale: 'en',
  fallbackLocale: 'en',
  messages
};

export const t = (key: string, locale: string = 'en'): string => {
  return messages[locale]?.[key] || messages[i18nConfig.fallbackLocale]?.[key] || key;
};
