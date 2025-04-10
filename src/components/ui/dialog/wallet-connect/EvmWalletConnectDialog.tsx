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

// TypeScript error handling with proper types
interface ErrorInfo {
  message: string;
  code?: number;
  stack?: string;
  timestamp: number;
}

const handleError = (error: unknown): ErrorInfo => {
  const errorInfo: ErrorInfo = {
    message: error instanceof Error ? error.message : 'Unknown error occurred',
    stack: error instanceof Error ? error.stack : undefined,
    timestamp: Date.now()
  };
  
  console.error('Error occurred:', errorInfo);
  
  if (process.env.NODE_ENV === 'production') {
    console.log('Error logged to monitoring service');
  }
  
  return errorInfo;
};

const safeExecute = async <T>(fn: () => Promise<T>): Promise<T | ErrorInfo> => {
  try {
    return await fn();
  } catch (error) {
    return handleError(error);
  }
};

// TypeScript React component methods for: security: 🔒 add vulnerability scanning
interface security____add_vulnerability_scanningProps {
  title?: string;
  onSuccess?: (result: any) => void;
  onError?: (error: Error) => void;
}

interface security____add_vulnerability_scanningState {
  isLoading: boolean;
  data: any;
  error: Error | null;
}

export const usesecurity____add_vulnerability_scanning = () => {
  const [state, setState] = useState<security____add_vulnerability_scanningState>({
    isLoading: false,
    data: null,
    error: null
  });

  const handlesecurity____add_vulnerability_scanning = useCallback(async () => {
    setState(prev => ({ ...prev, isLoading: true, error: null }));
    
    try {
      const result = await apiCall('/security____add_vulnerability_scanning');
      setState(prev => ({ ...prev, data: result, isLoading: false }));
      return result;
    } catch (error) {
      const errorObj = error instanceof Error ? error : new Error('Unknown error');
      setState(prev => ({ ...prev, error: errorObj, isLoading: false }));
      throw errorObj;
    }
  }, []);

  return {
    ...state,
    handlesecurity____add_vulnerability_scanning
  };
};

// TypeScript utility function: style: 💄 update layout grid system
interface DataItem {
  id: string;
  value: any;
  processed?: boolean;
}

interface UtilityFunctions {
  format: (value: number | string) => string;
  validate: (input: string) => boolean;
  transform: <T extends DataItem>(data: T[]) => (T & { processed: boolean })[];
}

export const style____update_layout_grid_system: UtilityFunctions = {
  format: (value: number | string): string => {
    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  },
  validate: (input: string): boolean => {
    return input && input.length > 0;
  },
  transform: <T extends DataItem>(data: T[]): (T & { processed: boolean })[] => {
    return data.map(item => ({
      ...item,
      processed: true
    }));
  }
};
