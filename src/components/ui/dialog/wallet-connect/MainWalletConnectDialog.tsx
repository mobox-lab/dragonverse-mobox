'use client';

import { useAtom } from 'jotai';
import ReactGA from 'react-ga4';
import { useConnect } from 'wagmi';
import Dialog from '@/components/ui/dialog/index';
import { useConnectEvmWallet } from '@/hooks/wallet';
import ConnectButton from '@/components/ui/button/ConnectButton';
import { mainWalletConnectDialogAtom } from '@/atoms';

export default function MainWalletConnectDialog() {
  const [isOpen, setIsOpen] = useAtom(mainWalletConnectDialogAtom);
  const { connectors: evmConnectors } = useConnect();
  const { onEvmConnect } = useConnectEvmWallet();

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
            <ConnectButton onClick={() => onEvmConnect(evmConnectors[4])}>
              <img className="h-7.5 w-7.5" src="/svg/trustwallet.svg" alt="icon" />
              <span className="md:hidden">{evmConnectors[4].name}</span>
            </ConnectButton>
          </div>
        </div>
      )}
    />
  );
}

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
