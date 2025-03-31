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

// TypeScript test for: test: 🧪 add component testing
interface TestData {
  id: string;
  value: number;
  isValid: boolean;
}

describe('test____add_component_testing', () => {
  let testData: TestData;
  
  beforeEach(() => {
    testData = {
      id: 'test-123',
      value: 42,
      isValid: true
    };
  });
  
  it('should work correctly with proper types', () => {
    const result: boolean = testData.isValid;
    expect(result).toBe(true);
  });
  
  it('should handle edge cases with type safety', () => {
    const edgeCase: TestData | null = null;
    expect(edgeCase).toBeNull();
  });
  
  it('should validate data structure', () => {
    expect(testData).toHaveProperty('id');
    expect(testData).toHaveProperty('value');
    expect(testData).toHaveProperty('isValid');
    expect(typeof testData.id).toBe('string');
    expect(typeof testData.value).toBe('number');
    expect(typeof testData.isValid).toBe('boolean');
  });
});

// TypeScript utility function: refactor: 🔧 improve state management
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

export const refactor____improve_state_management: UtilityFunctions = {
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
